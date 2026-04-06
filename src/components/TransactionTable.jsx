const TransactionTable = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Account</th>
            <th className="px-4 py-2 border">To Account</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.transactionId} className="text-center">
              <td className="px-4 py-2 border">{tx.transactionId}</td>
              <td className="px-4 py-2 border">{tx.type}</td>
              <td className="px-4 py-2 border">{tx.accountId}</td>
              <td className="px-4 py-2 border">{tx.toAccountId || "-"}</td>
              <td className="px-4 py-2 border">${tx.amount}</td>
              <td className="px-4 py-2 border">
                {new Date(tx.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
