// src/pages/shared/Navbar/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-blue-600">
          CBTS
        </Link>
      </div>
      <div className="flex-none gap-4">
        <Link to="/" className="btn btn-ghost">
          Home
        </Link>
        <Link to="/accounts" className="btn btn-ghost">
          Accounts
        </Link>
        <Link to="/deposit" className="btn btn-ghost">
          Deposit
        </Link>
        <Link to="/withdraw" className="btn btn-ghost">
          Withdraw
        </Link>
        <Link to="/transfer" className="btn btn-ghost">
          Transfer
        </Link>
        <Link to="/transactions" className="btn btn-ghost">
          Transactions
        </Link>
      </div>
    </div>
  );
};

export default Navbar;