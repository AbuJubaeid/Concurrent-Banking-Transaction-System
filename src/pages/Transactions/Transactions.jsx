import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import TransactionTable from "../../components/TransactionTable";
import axiosInstance from "../../hooks/UseAxios";
import { useSocket } from "../../hooks/UseSocket";

const Transactions = () => {
  const socket = useSocket();
  const queryClient = useQueryClient();

  const {
    data: transactions = [], isLoading: loading,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/transactions");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });


  useEffect(() => {
    if (!socket) return;

    const handleNewTransaction = (transaction) => {
      queryClient.setQueryData(["transactions"], (oldTx = []) => [
        transaction,
        ...oldTx,
      ]);
    };

    socket.on("transaction:created", handleNewTransaction);
    return () => socket.off("transaction:created", handleNewTransaction);
  }, [socket, queryClient]);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Transactions;
