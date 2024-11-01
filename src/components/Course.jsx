import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import "./Course.css";

/**
 * Course component to display courses for a given season and search value.
 *
 * @param {Object} props - The component props.
 * @param {string} props.season - The season to filter courses by.
 * @param {string} props.searchValue - The search value to filter courses by.
 * @returns {JSX.Element} The rendered Course component.
 */
const Course = ({season, searchValue, setBAFirstCourse, setBASecondCourse, sharedCourses, setSharedCourses}) => {
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Filter courses by season and search value when either changes
  useEffect(() => {

    const seasonFilteredCourses = Object.entries(sharedCourses).filter(
        ([, courseInfos]) => courseInfos.season === season
    );


    // Further filter by searchValue (case-insensitive)
    const searchRegex = new RegExp(searchValue, "i");
    setFilteredCourses(
        seasonFilteredCourses.filter(([courseName]) => searchRegex.test(courseName))
    );
  }, [searchValue, season, sharedCourses]);

  /**
   * Adjusts the font size of the course names to fit inside the container.
   */
  useEffect(() => {
    function adjustFontSizeToFit() {
      const textElements = document.querySelectorAll(".span-course"); // Correct class selector
      if (textElements.length === 0) return; // Ensure elements are available

      textElements.forEach((node) => {
        const container = node.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        let fontSize = 20;

        if (node.classList.contains("span-cr")) {
          node.style.fontSize = 13 + "px";
        } else {
          while (
              node.scrollWidth > containerWidth ||
              node.scrollHeight + fontSize + 2 > containerHeight
              ) {
            fontSize--;
            node.style.fontSize = fontSize + "px";
          }
        }
      });
    }

    // Call the function after the component has mounted and the DOM is ready
    adjustFontSizeToFit();

    // Add window resize event listener
    window.addEventListener("resize", adjustFontSizeToFit);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", adjustFontSizeToFit);
    };
  }, [filteredCourses]);

  // Handle adding a course and removing it from the DOM
  const addCourseOnClick = (courseInfos, courseName) => (e) => {
    e.preventDefault();
    setSharedCourses((prevCourses) => {
        if (Object.keys(prevCourses).some((name) => name === courseName)) {
        // Remove the course
        const newCourses = {...prevCourses};
        delete newCourses[courseName];
        return newCourses;
        }
    });

    console.log(`Course ${courseName} clicked and removed added to its respective BA${courseInfos.ba} courses`);
  };

  return (
      <div className="course">
        <h3 className="season-title">
          {season.toLowerCase() === "fall" ? "Fall" : "Spring"} Courses
        </h3>
        <div className="left-right-course-div">
          {/* Render all filtered courses */}
          {filteredCourses.map(([courseName, courseInfos], index) => (
              <div
                  key={`${courseName}-${index}`}
                  className="individual-course-label"
                  id={`course-${courseName.replace(/\s+/g, '-')}`}
                  draggable
                  onClick={addCourseOnClick(courseInfos, courseName)}
              >
                <div className="course-name-container common-color">
                  <span className="span-course">{courseName}</span>
                </div>
                <div className="cr-container common-color">
                  <p className="span-course span-cr">{courseInfos.credits} Cr</p>
                </div>
                <div className="info-icon">
                  <img src="/path/to/info-icon.svg" className="info-bubble" alt="info"/>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

Course.propTypes = {
  setBAFirstCourse: PropTypes.func.isRequired,
  setBASecondCourse: PropTypes.func.isRequired,
  season: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
};

export default Course;
