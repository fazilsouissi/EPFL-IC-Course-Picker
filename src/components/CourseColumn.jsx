import "./CourseColumn.css";
import DropArea from "./DropArea";
import PropTypes from "prop-types";
import courseJson from "../json/courses.json";

import "./Course.css"
import {useEffect} from "react";

const CourseColumn = ({
                        title,
                        baCourses,
                        // icon,
                        courses,
                        ba,
                        handleDelete,
                        setActiveCard,
                        setBACourse,
                        onDrop,
                        sharedCourses,
                        setSharedCourses,
                        complementarySharedCourses
                      }) => {
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
  }, [sharedCourses]);


  return (
      <section className="course_column">
        <h2 className="course_column_heading">
          {title}
        </h2>

        <DropArea onDrop={() => onDrop(ba, 0)}/>


        {/*{courses.map(*/}
        {/*    (course, index) =>*/}
        {/*        course.ba === ba && (*/}
        {/*            <Fragment key={index}>*/}
        {/*              <CourseCard*/}
        {/*                  title={course.course}*/}
        {/*                  tags={course.tags}*/}
        {/*                  handleDelete={handleDelete}*/}
        {/*                  index={index}*/}
        {/*                  // setActiveCard={setActiveCard}*/}
        {/*              />*/}
        {/*              <DropArea onDrop={() => onDrop(ba, index + 1)}/>*/}
        {/*            </Fragment>*/}
        {/*        )*/}
        {/*)}*/}


        <div className="course-column">
          {
            Object.entries(complementarySharedCourses).map(([courseName, courseInfos], index) => (
                    courseInfos.ba === Number(ba.at(2)) && (
                        <div key={index} className="individual-course-label"
                             id={`course-${courseName.replace(/\s+/g, '-')}`}
                             draggable
                             onClick={(e) => {
                               e.preventDefault();
                               setSharedCourses((prevCourses) => {
                                 if (!Object.keys(prevCourses).some((name) => name === courseName)) {
                                   // Add the course
                                   const newCourses = {...prevCourses};
                                   newCourses[courseName] = courseJson[courseName]; // Add course data from courseJson
                                   return newCourses;
                                 }
                                 return prevCourses; // Return the same state if the course is already present
                               });
                               console.log(`Course ${courseName} clicked`);
                               console.log(sharedCourses)
                             }}
                        >
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
                          </div>
                        </div>)

                )
            )
          }</div>

      </section>
  );
};
CourseColumn.propTypes = {
  title: PropTypes.string.isRequired,
  courses: PropTypes.arrayOf(
      PropTypes.shape({
        course: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        status: PropTypes.string.isRequired,
      })
  ).isRequired,
  ba: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  setBACourse: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  baCourses: PropTypes.array.isRequired,
  sharedCourses: PropTypes.array.isRequired,
  setSharedCourses: PropTypes.func.isRequired,
};

export default CourseColumn;
