const BalanceCard = ({ title, value, color = "blue" }) => {
  const bgColor =
    color === "blue"
      ? "bg-blue-500"
      : color === "green"
      ? "bg-green-500"
      : "bg-gray-500";

  return (
    <div className={`${bgColor} text-white p-4 rounded shadow`}>
      <h2 className="font-semibold">{title}</h2>
      <p className="text-2xl mt-2">{value}</p>
    </div>
  );
};

export default BalanceCard;