import PropTypes from "prop-types";
import "./Course.css";
import "./CustomFont.scss"
import "./IndividualCourse.scss";

const IndividualCourse = ({courseName, courseInfos, onClick}) => {
  {/*Todo add the id as the key*/}
  return <div
      className={`individual-course-label tag-${courseInfos.credits}-credits`}
      id={`course-${courseName.replace(/\s+/g, "-")}`}
      draggable
      onClick={onClick}
      onDragStart={(event) => {
        // console.log("Drag started", event);
        event.dataTransfer.setData("courseName", courseName)
      }}
  >
    <div className={`course-name-container common-color border-${courseInfos.credits}`}>
      <span className={`span-course font-size-${courseName.length}`}>{courseName}</span>
    </div>
    <div className={`cr-container common-color border-${courseInfos.credits}`}>
      <p className="span-course span-cr">{courseInfos.credits} Cr</p>
    </div>
    <div className="info-icon">
      <img src="/path/to/info-icon.svg" className="info-bubble" alt="info"/>
    </div>
  </div>;
}

IndividualCourse.propTypes = {
  courseName: PropTypes.any,
  onClick: PropTypes.func,
  courseInfos: PropTypes.any
};

export default IndividualCourse;