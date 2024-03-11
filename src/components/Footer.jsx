const Footer = () => {
  return (
    <footer className="py-4 mt-4 border-top bg-dark footer">
      <span className="mb-3 mb-md-0  text-white">© 2024 CryptoMania, Inc</span>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex me-4">
        <li className="ms-3">
          <a className="text-white" href="#">
            Twitter
          </a>
        </li>
        <li className="ms-3">
          <a className="text-white" href="#">
            Instagram
          </a>
        </li>
        <li className="ms-3">
          <a className="text-white" href="#">
            Facebook
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
