const LoadingSpinner = () => {
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-12 d-flex flex-column align-items-center text-primary">
          <div className="spinner-border">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="fs-4 fw-bold">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
