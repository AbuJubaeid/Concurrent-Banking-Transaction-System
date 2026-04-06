import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import TransactionTable from "../../components/TransactionTable";
import axiosInstance from "../../hooks/useAxios";
import { useSocket } from "../../hooks/useSocket";

const Transactions = () => {
  const socket = useSocket();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axiosInstance.get("/api/transactions");
        setTransactions(res.data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  
  useEffect(() => {
    if (!socket) return;

    const handleNewTransaction = (transaction) => {
      setTransactions((prev) => [transaction, ...prev]);
    };

    socket.on("transaction:created", handleNewTransaction);
    return () => socket.off("transaction:created", handleNewTransaction);
  }, [socket]);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Transactions;
