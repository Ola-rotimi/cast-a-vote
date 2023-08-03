import Card from "./card.components";
import Bami from "../../assets/images/Bami.png";
import Bart from "../../assets/images/Bart.png";

const CandidateData = () => {
  const candidate = [
    {
      id: 1,
      name: "Bami Peterson",
      image: Bami,
      party: "Conservative Party",
      brief:
        "I am running for Prime Minister of United Kingdom to unite our country and to create a better future for all British. I believe that we are stronger and can overcome any challenge if we work together.",
    },
    {
      id: 2,
      name: "Bart Kernel",
      image: Bart,
      party: "Labour Party",
      brief:
        "I am running for Prime Minister of the United Kingdom to ensure that all Citizens have the opportunity to succeed. I believe that we are all created equal and that we all deserve the same chances in life.",
    },
  ];

  return (
    <div className="d-flex justify-content-center">
      {candidate.map((candidate) => (
        <Card key={candidate.id} candidate={candidate} />
      ))}
    </div>
  );
};

export default CandidateData;
