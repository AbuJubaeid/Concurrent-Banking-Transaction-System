import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar sticky top-0 z-50 bg-base-100/90 backdrop-blur-lg shadow-lg px-8 py-2 border-b border-base-200">
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-blue-600 hover:text-blue-700 transition duration-200"
        >
          CBTS
        </Link>
      </div>

      <div className="flex-none gap-2">
        <Link
          to="/"
          className="btn btn-ghost rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
          Home
        </Link>

        <Link
          to="/accounts"
          className="btn btn-ghost rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
          Accounts
        </Link>

        <Link
          to="/deposit"
          className="btn btn-ghost rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
          Deposit
        </Link>

        <Link
          to="/withdraw"
          className="btn btn-ghost rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
          Withdraw
        </Link>

        <Link
          to="/transfer"
          className="btn btn-ghost rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
          Transfer
        </Link>

        <Link
          to="/transactions"
          className="btn btn-ghost rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200"
        >
          Transactions
        </Link>
      </div>
    </div>
  );
};

export default Navbar;