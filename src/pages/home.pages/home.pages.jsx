import Carousel from "../../components/carousel.components/carousel.components";
import VoteText from "../../components/vote-text.components/vote-text.components";
import CandidateData from "../../components/card.components/candidate-data";
import Footer from "../../components/footer.components/footer.components";

const Home = () => {
  return (
    <div>
      <Carousel />
      <VoteText />
      <CandidateData />
      <Footer />
    </div>
  );
};

export default Home;
