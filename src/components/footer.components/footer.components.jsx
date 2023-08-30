const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <div className="container text-bg-dark" style={{ minWidth: "100%", margin: "0" }}>
      <p className="text-center">&#169; CastAVote {date}</p>
    </div>
  );
};

export default Footer;
