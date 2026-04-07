import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import AccountCard from "../../components/AccountCard";
import BalanceCard from "../../components/BalanceCard";
import Loader from "../../components/Loader";
import TransactionTable from "../../components/TransactionTable";
import axiosInstance from "../../hooks/useAxios";
import { useSocket } from "../../hooks/useSocket";

const Home = () => {
  const socket = useSocket();
  const queryClient = useQueryClient();

  const {
    data: accounts = [],
    isLoading: accountsLoading,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/accounts");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: transactions = [],
    isLoading: transactionsLoading,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/transactions?limit=5");
      return res.data.slice(0, 5);
    },
    refetchOnWindowFocus: false,
  });

  const loading = accountsLoading || transactionsLoading;


  useEffect(() => {
    if (!socket) return;

    const handleBalanceUpdate = (updatedAccount) => {
      queryClient.setQueryData(["accounts"], (oldAccounts = []) =>
        oldAccounts.map((acc) =>
          acc._id === updatedAccount._id ? updatedAccount : acc
        )
      );
    };

    const handleNewTransaction = (transaction) => {
      queryClient.setQueryData(["transactions"], (oldTx = []) => [
        transaction,
        ...oldTx.slice(0, 4),
      ]);
    };

    socket.on("balance:updated", handleBalanceUpdate);
    socket.on("transaction:created", handleNewTransaction);

    return () => {
      socket.off("balance:updated", handleBalanceUpdate);
      socket.off("transaction:created", handleNewTransaction);
    };
  }, [socket, queryClient]);

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