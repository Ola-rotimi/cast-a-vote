/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Card = ({ candidate }) => {
  const { image, name, brief, party } = candidate;

  return (
    <div className="col-md-4 m-5">
      <div className="card align-items-center bg-secondary text-light">
        <img
          className="rounded-circle mt-3 cropped-image"
          width="200"
          height="200"
          src={image}
          alt={name}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{party}</p>
          <p className="card-text">{brief}</p>
          <Link to="/cast-vote" className="btn btn-primary">
            Vote Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
