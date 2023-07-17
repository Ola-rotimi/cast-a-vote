import Carousel from "../../components/carousel.components/carousel.components";
import VoteText from "../../components/vote-text.components/vote-text.components";
import CandidateData from "../../components/card.components/candidate-data";

const Home = () => {
    return (
        <div>
            <Carousel />
            <VoteText />
            <CandidateData />
        </div>
    )
}

export default Home