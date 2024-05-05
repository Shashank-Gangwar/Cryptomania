const Loader = () => {
  return (
    <div className="d-flex justify-content-center flex-column align-items-center fs-4">
      <div className="spinner-border text-primary " role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="mt-2 ">Loading...</div>
    </div>
  );
};

export default Loader;
