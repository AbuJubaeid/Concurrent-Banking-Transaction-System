import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import axiosInstance from "../../hooks/useAxios";
import { useSocket } from "../../hooks/useSocket";

const Withdraw = () => {
  const socket = useSocket();

  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");

  const { data: accounts = [], isLoading: loading } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/accounts");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (!selectedAccount || !amount || Number(amount) <= 0) {
      Swal.fire("Error", "Please select account and enter valid amount", "error");
      return;
    }

    try {
      await axiosInstance.post("/api/transactions", {
        type: "withdraw",
        fromAccountId: selectedAccount,
        amount: Number(amount),
      });

      socket?.emit("transaction:created");

      Swal.fire("Success", "Withdrawal successful", "success");

      setAmount("");
      setSelectedAccount("");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Withdrawal failed",
        "error"
      );
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Withdraw</h1>

      <form onSubmit={handleWithdraw} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Select Account</label>
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="w-full border rounded p-2 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
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
            className="w-full border rounded p-2 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
            placeholder="Enter amount"
          />
        </div>

        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full transition-colors duration-200"
        >
          Withdraw
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
