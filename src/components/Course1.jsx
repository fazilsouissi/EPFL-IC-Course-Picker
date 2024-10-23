import PropTypes from "prop-types";
import courses from "../json/courses.json"; // todo scrape the courses for each BA and filter them by season
import "./styles/Course.css";

const Course2 = ({ season }) => {
  let coursesArray = Object.entries(courses).filter(
    ([courseName, courseInfos]) => courseInfos.season === season
  );

  // Determine halfCourses based on filtered array length
  let halfCourses = Math.ceil(coursesArray.length / 2);

  // Split into first and second half
  let firstHalfCourses = coursesArray.slice(0, halfCourses);
  let secondHalfCourses = coursesArray.slice(halfCourses);

  // Debugging purposes
  firstHalfCourses.forEach(e => console.log('First Half:', e[1]));

  // If no courses match, return a message
  if (coursesArray.length === 0) {
    return <div>No courses available for this season</div>;
  }

  switch (season.toLowerCase()) {
    case "fall":
      return (
        <>
        <div className="course">
          <h3>Fall Courses</h3>
          <div className="course-list">
            {firstHalfCourses.map(([courseName, courseInfos], index) => {
              console.log('Course Name:', courseName, 'Course Infos:', courseInfos.credits);
              
              // Return the JSX for each course
              return (
                <div key={index} className="course-label">
                  <span className="course-name">{courseName}</span>
                  <span className="course-credits">{courseInfos.credits} Cr</span>
                </div>
              );
            })}
          </div>
        </div>
        </>

      );
    default:
      return <div>Season not found</div>;
  }
};

Course2.propTypes = {
  season: PropTypes.string.isRequired,
};
export default Course2;