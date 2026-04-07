const BalanceCard = ({ title, value, color = "blue" }) => {
  const bgColor =
    color === "blue"
      ? "bg-blue-300"
      : color === "green"
      ? "bg-green-300"
      : "bg-gray-300";

  return (
    <div className={`${bgColor} text-black p-4 rounded shadow`}>
      <h2 className="font-semibold">{title}</h2>
      <p className="text-2xl mt-2">{value}</p>
    </div>
  );
};

export default BalanceCard;