// src/pages/shared/Footer/Footer.jsx

const Footer = () => {
  return (
    <footer className="footer p-6 bg-base-200 text-base-content mt-12">
      <div className="items-center grid-flow-col">
        <p>
          © {new Date().getFullYear()} CivicReport. All rights reserved.
        </p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
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