const Card = ({ children, title }) => {
  return (
    <div className="container mb-5 mt-3">
      <div className="row">
        <div className="col-12 col-md-10 col-lg-8 mx-auto">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-light fw-bold">
              {title}
            </div>
            <div className="card-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
