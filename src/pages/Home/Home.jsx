import { useEffect, useState } from "react";
import AccountCard from "../../components/AccountCard";
import BalanceCard from "../../components/BalanceCard";
import Loader from "../../components/Loader";
import TransactionTable from "../../components/TransactionTable";
import axiosInstance from "../../hooks/useAxios";
import { useSocket } from "../../hooks/useSocket";

const Home = () => {
  const socket = useSocket();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accRes, txRes] = await Promise.all([
          axiosInstance.get("/api/accounts"),
          axiosInstance.get("/api/transactions?limit=5"),
        ]);
        setAccounts(accRes.data);
        setTransactions(txRes.data.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    if (!socket) return;

    const handleBalanceUpdate = (updatedAccount) => {
      setAccounts((prev) =>
        prev.map((acc) => (acc._id === updatedAccount._id ? updatedAccount : acc))
      );
    };

    const handleNewTransaction = (transaction) => {
      setTransactions((prev) => [transaction, ...prev].slice(0, 5));
    };

    socket.on("balance:updated", handleBalanceUpdate);
    socket.on("transaction:created", handleNewTransaction);

    return () => {
      socket.off("balance:updated", handleBalanceUpdate);
      socket.off("transaction:created", handleNewTransaction);
    };
  }, [socket]);

  if (loading) return <Loader />;

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <BalanceCard title="Total Balance" value={`$${totalBalance}`} color="blue" />
        <BalanceCard title="Total Accounts" value={accounts.length} color="green" />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accounts.map((acc) => (
            <AccountCard key={acc._id} account={acc} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Latest Transactions</h2>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};

export default Home;
