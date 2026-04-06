import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import axiosInstance from "../../hooks/useAxios";
import { useSocket } from "../../hooks/useSocket";

const Deposit = () => {
  const socket = useSocket();

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
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

  const handleDeposit = async (e) => {
    e.preventDefault();

    if (!selectedAccount || !amount || Number(amount) <= 0) {
      Swal.fire("Error", "Please select an account and enter a valid amount", "error");
      return;
    }

    try {
      await axiosInstance.post("/api/transactions", {
        type: "deposit",
        toAccountId: selectedAccount,
        amount: Number(amount),
      });

      socket?.emit("transaction:created");

      Swal.fire("Success", "Deposit successful", "success");

      setAmount("");
      setSelectedAccount("");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Deposit failed",
        "error"
      );
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Deposit</h1>

      <form onSubmit={handleDeposit} className="space-y-4">

        <div>
          <label className="block mb-1 font-semibold">Select Account</label>

          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select Account --</option>

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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Deposit
        </button>

      </form>
    </div>
  );
};

export default Deposit;
