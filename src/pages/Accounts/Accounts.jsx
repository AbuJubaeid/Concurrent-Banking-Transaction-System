import { useEffect, useState } from "react";
import AccountCard from "../../components/AccountCard";
import Loader from "../../components/Loader";
import axiosInstance from "../../hooks/useAxios";
import { useSocket } from "../../hooks/useSocket";

const Accounts = () => {
  const socket = useSocket();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axiosInstance.get("/api/accounts");
        setAccounts(res.data);
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (updatedAccount) => {
      setAccounts((prev) =>
        prev.map((acc) =>
          acc._id === updatedAccount._id ? updatedAccount : acc
        )
      );
    };

    socket.on("balance:updated", handleUpdate);
    return () => socket.off("balance:updated", handleUpdate);
  }, [socket]);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Accounts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <AccountCard key={acc._id} account={acc} />
        ))}
      </div>
    </div>
  );
};

export default Accounts;
