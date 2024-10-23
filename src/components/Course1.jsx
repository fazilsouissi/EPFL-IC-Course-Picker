import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import courses from "../json/courses.json";
import "./styles/Course1.css";

const Course1 = ({ season, searchValue }) => {
  const [filteredCourses, setFilteredCourses] = useState({
    firstHalf: [],
    secondHalf: [],
  });

  // TODO faire avec les différents tag aussi (8, 6, 4, 2 Credits) pour filtrer, (utiliser un or si plusieurs tags sélectionnés)

  // TODO revoir le fonctionnement des deux useEffects
  useEffect(() => {
    // Filter courses by the given season
    let coursesArray = Object.entries(courses).filter(
      ([, courseInfos]) => courseInfos.season === season
    );

    // Split courses into two halves
    let halfCourses = Math.ceil(coursesArray.length / 2);
    let firstHalfCourses = coursesArray.slice(0, halfCourses);
    let secondHalfCourses = coursesArray.slice(halfCourses);

    // Filter courses by search value (case-insensitive)
    const filteredFirstHalf = firstHalfCourses.filter(([courseName]) =>
      new RegExp(searchValue, "i").test(courseName)
    );
    const filteredSecondHalf = secondHalfCourses.filter(([courseName]) =>
      new RegExp(searchValue, "i").test(courseName)
    );

    // Set the filtered courses
    setFilteredCourses({
      firstHalf: filteredFirstHalf,
      secondHalf: filteredSecondHalf,
    });

    // Re-run filtering when searchValue or season changes
  }, [searchValue, season]);

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
  }, [filteredCourses]); // Trigger the effect after filteredCourses are updated
  // Empty dependency array to run effect on mount

  // // Dynamic font size adjustment logic
  // useEffect(() => {
  //   const adjustFontSizeToFit = () => {
  //     const textElements = document.querySelectorAll(".span-course");
  //     textElements.forEach((node) => {
  //       const container = node.parentElement;
  //       const containerWidth = container.clientWidth;
  //       const containerHeight = container.clientHeight;

  //       let fontSize = node.classList.contains("span-cr") ? 40 : 20;

  //       // Adjust font size to fit inside the container
  //       while (node.scrollWidth > containerWidth || node.scrollHeight > containerHeight) {
  //         fontSize--;
  //         node.style.fontSize = `${fontSize}px`;
  //       }
  //     });
  //   };

  //   adjustFontSizeToFit();

  //   window.addEventListener("resize", adjustFontSizeToFit);
  //   return () => window.removeEventListener("resize", adjustFontSizeToFit);
  // }, [searchValue]);

  return (
    <div className="course">
      <h3 className="season-title">
        {season.toLowerCase() === "fall" ? "Fall" : "Spring"} Courses
      </h3>
      <div className="left-right-course-div">
        {/* Render filtered first half courses */}
        {filteredCourses.firstHalf.map(([courseName, courseInfos], index) => (
          <div key={index} className="individual-course-label">
            <div className="course-name-container common-color">
              <span className="span-course">{courseName}</span>
            </div>
            <div className="cr-container common-color">
              <p className="span-course span-cr">{courseInfos.credits} Cr</p>
            </div>
            <div className="info-icon">
              <img
                src="/path/to/info-icon.svg"
                className="info-bubble"
              />
              {/* <div className="tooltip">
                Additional course information goes here
              </div> */}
            </div>
          </div>
        ))}

        {/* Render filtered second half courses */}
        {filteredCourses.secondHalf.map(([courseName, courseInfos], index) => (
          <div key={index} className="individual-course-label">
            <div className="course-name-container common-color">
              <span className="span-course">{courseName}</span>
            </div>
            <div className="cr-container common-color">
              <p className="span-course span-cr">{courseInfos.credits} Cr</p>
            </div>
            <div className="info-icon">
              <img
                src="/path/to/info-icon.svg"
                className="info-bubble"
              />
              {/* <div className="tooltip">
                Additional course information goes here
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Course1.propTypes = {
  season: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired, // Expect searchValue as prop
};

export default Course1;
