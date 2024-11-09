import "./Header.css";
import CreditsTag from "./CreditsTag.jsx";

const Header = ({sumOfCredits, sortBy, setSortBy}) => {
  const checkTag = (tag) => {
    return sortBy.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    setSortBy((prev) => {
      // if (prev.includes(tag)) {
      //   // If tag is already selected, remove it
      //   return prev.filter((item) => item !== tag);
      // } else {
      //   // If tag is not selected, add it
      // add to local storage
      localStorage.setItem("sortBy", JSON.stringify(tag));
      return [tag];
      // }
    });
  };

  return (
      <div className="header-container">
        <h1 className="h1_title">
          <a href="https://edu.epfl.ch/studyplan/en/bachelor/computer-science/" className="epfl-link">
          <span className="epfl-color">
              EPFL
          </span>{" "}
          </a>
          <a href="https://github.com/fazilsouissi" className="credit-link">Computer Science Course Picker</a>
          {" "}
        </h1>

        <div className="sortby-container">
          <p className={"sum-of-credits"}>Total : {sumOfCredits} Credits</p>
          <CreditsTag tagName={"Sort by Credits"} selectTag={selectTag} selected={checkTag("Sort by Credits")}/>
          <CreditsTag tagName={"Sort by Blocks"} selectTag={selectTag} selected={checkTag("Sort by Blocks")}/>
        </div>
      </div>

  );
};

export default Header;
