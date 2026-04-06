const Footer = () => {
  return (
    <footer className="footer p-4 bg-base-100/90 backdrop-blur-lg shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] border-t border-base-200 flex justify-between items-center text-base-content">
      <div className="">
        <p>
          © {new Date().getFullYear()} CivicReport. All rights reserved.
        </p>
      </div>
      <div className="flex justify-between items-center">
        <a href="#" className="link link-hover">
          About
        </a>
        <a href="#" className="link link-hover">
          Privacy
        </a>
        <a href="#" className="link link-hover">
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;

