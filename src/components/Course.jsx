import PropTypes from "prop-types";
import courses from "../json/courses.json"; // todo scrape the courses for each BA and filter them by season
import "./styles/Course.css";

const Course = ({ season }) => {
  let coursesArray = Object.entries(courses).filter(
    ([courseName, courseInfos]) => courseInfos.season === season
  );

  // Determine halfCourses based on filtered array length
  let halfCourses = Math.ceil(coursesArray.length / 2);

  // Split into first and second half
  let firstHalfCourses = coursesArray.slice(0, halfCourses);
  let secondHalfCourses = coursesArray.slice(halfCourses);

  return (
    <>
      <div className="course">
        <h3 className="season-title">{season.toLowerCase() == "fall" ? "Fall" : "Spring"} Courses</h3>
        <div className="left-right-course-div">
          {firstHalfCourses.map(([courseName, courseInfos], index) => {
            // Return the JSX for each course
            return (
              <div key={index} className="individual-course-label">
                <div className="course-name-container common-color"><span className="span-course">{courseName}</span></div>
                <div className="cr-container common-color">
                  <p className="span-course span-cr">
                    {courseInfos.credits} Cr
                  </p>
                </div>
              </div>
            );
          })}
          {secondHalfCourses.map(([courseName, courseInfos], index) => {
            // Return the JSX for each course
            return (
              <div key={index} className="individual-course-label">
                <div className="course-name-container common-color"><span className="span-course">{courseName}</span></div>
                <div className="cr-container common-color">
                  <p className="span-course span-cr">
                    {courseInfos.credits} Cr
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};



Course.propTypes = {
  season: PropTypes.string.isRequired,
};
export default Course;
