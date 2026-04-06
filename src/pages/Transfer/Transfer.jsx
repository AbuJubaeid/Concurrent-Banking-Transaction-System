import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import axiosInstance from "../../hooks/useAxios";
import { useSocket } from "../../hooks/useSocket";

const Transfer = () => {
  const socket = useSocket();
  const [accounts, setAccounts] = useState([]);
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
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

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (!fromAccount || !toAccount || !amount || Number(amount) <= 0) {
      Swal.fire("Error", "Please select valid accounts and enter a positive amount", "error");
      return;
    }

    if (fromAccount === toAccount) {
      Swal.fire("Error", "From and To accounts cannot be the same", "error");
      return;
    }

    try {
      await axiosInstance.post("/api/transactions", {
        type: "transfer",
        fromAccountId: fromAccount,
        toAccountId: toAccount,
        amount: Number(amount),
      });

      socket?.emit("transaction:created");

      Swal.fire("Success", "Transfer successful", "success");
      setAmount("");
      setFromAccount("");
      setToAccount("");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Transfer failed",
        "error"
      );
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Transfer</h1>

      <form onSubmit={handleTransfer} className="space-y-4">

        <div>
          <label className="block mb-1 font-semibold">From Account</label>
          <select
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select --</option>
            {accounts.map((acc) => (
              <option key={acc._id} value={acc._id}>
                {acc.holderName} (${acc.balance})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">To Account</label>
          <select
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select --</option>
            {accounts.map((acc) => (
              <option key={acc._id} value={acc._id}>
                {acc.holderName} (${acc.balance})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter amount"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 w-full"
        >
          Transfer
        </button>

      </form>
    </div>
  );
};

export default Transfer;
