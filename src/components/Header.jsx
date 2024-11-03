import "./Header.css";

const Header = ({sumOfCredits}) => {
  return (
    <h1 className="h1_title">
        <a href="https://edu.epfl.ch/studyplan/en/bachelor/computer-science/" className="epfl-link">
      <span className="epfl-color">
          EPFL
      </span>{" "}
        </a>
      <a href="https://github.com/fazilsouissi" className="credit-link">Computer Science Course Picker</a>
      {" "} {sumOfCredits} Credits
    </h1>
  );
};

export default Header;
