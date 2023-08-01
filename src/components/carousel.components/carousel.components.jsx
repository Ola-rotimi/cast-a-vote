import { Link } from "react-router-dom";

import Image1 from "../../assets/images/landingpage1.png";
import Image2 from "../../assets/images/landingpage2.jpg";

const Carousel = () => {
  return (
    <div>
      <div
        id="carouselExampleInterval"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="5000">
            <img
              src={Image1}
              className="d-block w-100 carousel-img img-t"
              height="600px"
              alt="..."
            />
            <div className="carousel-caption d-none d-sm-block">
              <h5 className="text-dark">Cast Your Vote</h5>
              <button type="button" className="btn btn-dark">
                <Link className="text-decoration-none text-light" to="/cast-vote">Cast Your Vote</Link>
              </button>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img
              src={Image2}
              className="d-block w-100 carousel-img img-t"
              height="600px"
              alt="..."
            />
            <div className="carousel-caption d-none d-sm-block">
              <h5 className="text-light">Your Vote, Your Power, Your Right</h5>
              <button type="button" className="btn btn-dark">
                <Link className="text-decoration-none text-light" to="/Register">Regiter</Link>
              </button>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
