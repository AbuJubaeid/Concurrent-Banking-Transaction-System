const AccountCard = ({ account }) => {
  return (
    <div className="bg-white shadow rounded p-4 border">
      <h2 className="font-bold text-lg">{account.holderName}</h2>
      <p>ID: {account._id}</p>
      <p>Balance: ${account.balance}</p>
    </div>
  );
};

export default AccountCard;