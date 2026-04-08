import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide text-blue-600 hover:text-blue-700 transition duration-200"
          >
            CBTS
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-2">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          >
            {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md rounded-b-lg mt-1">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/accounts"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
          >
            Accounts
          </Link>
          <Link
            to="/deposit"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
          >
            Deposit
          </Link>
          <Link
            to="/withdraw"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
          >
            Withdraw
          </Link>
          <Link
            to="/transfer"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
          >
            Transfer
          </Link>
          <Link
            to="/transactions"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
          >
            Transactions
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;