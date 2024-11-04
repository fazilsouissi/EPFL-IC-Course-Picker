import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import "./Course.css";
import "./CustomFont.scss"


import IndividualCourse from "./IndividualCourse";


// Handle adding a course and removing it from the DOM
export const addCourseToColumn = (courseInfos, courseName, ba, setSharedCourses) => (e) => {
  ba = ba !== undefined ? ba : courseInfos.ba;
  e.preventDefault();
  setSharedCourses((prevCourses) => {
    //   if (!Object.keys(prevCourses).some((name) => name === courseName)) {
    //     // Add the course
    //     const newCourses = {...prevCourses};
    //     const {credits, season} = courseInfos; // Decompose courseInfos
    //     newCourses[courseName] = {ba, credits, season}; // adds courseName value to the sharedCourses with selected courseInfos
    //     console.log(`Course ${courseName} clicked and removed added to its respective BA${ba} courses`);
    //     return newCourses;
    //   } else {
    //     // Remove the course
    //     const newCourses = {...prevCourses};
    //     delete newCourses[courseName];
    //     const newCourses2 = {...newCourses};
    //     const {credits, season} = courseInfos;
    //     newCourses2[courseName] = {ba, credits, season};
    //     console.log(`Course ${courseName} clicked and removed added to its respective BA${ba} courses`);
    //     return newCourses2;
    //   } // And then the complementarySharedCourses should be updated (remove the course)

    // Initialize newCourses with a copy of prevCourses
    let newCourses = {...prevCourses};

    // Check if the course exists in prevCourses
    if (Object.keys(newCourses).some((name) => name === courseName)) {
      // Remove the course if it exists
      delete newCourses[courseName];
      console.log(`Course ${courseName} clicked and removed from its respective BA${ba} courses`);
    }

    // Otherwise, add the course to newCourses
    const {credits, season} = courseInfos;
    newCourses[courseName] = {ba, credits, season};

    // Return the updated courses object
    return newCourses;
  });

};


/**
 * Course component to display courses for a given season and search value.
 *
 * @param {Object} props - The component props.
 * @param {string} props.season - The season to filter courses by.
 * @param {string} props.searchValue - The search value to filter courses by.
 * @returns {JSX.Element} The rendered Course component.
 */

const Course = ({
                  season,
                  searchValue,
                  complementarySharedCourses,
                  setComplementarySharedCourses,
                  setSharedCourses,
                  sharedCourses,
                  selectedTags
                }) => {
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Filter courses by season and search value when either changes
  useEffect(() => {
    // todo add the tag filter here to filter the courses EVEN IF IT'S empty (to show all courses)

    const seasonFilteredCourses = Object.entries(complementarySharedCourses).filter(
        ([, courseInfos]) => courseInfos.season === season
    );

    let selectedTagsAsCredits = selectedTags.map(tag => {
      if (tag) {
        return tag.replace(/\D/g, '');
      }
    })

    // Further filter by searchValue (case-insensitive)
    const searchRegex = new RegExp(searchValue, "i");
    setFilteredCourses(
        seasonFilteredCourses.filter(([courseName]) => searchRegex.test(courseName)
            && (selectedTagsAsCredits.length === 0 || selectedTagsAsCredits.some(tag => complementarySharedCourses[courseName].credits === tag))
        )
    );
  }, [searchValue, season, complementarySharedCourses, selectedTags]);

  /**
   * Adjusts the font size of the course names to fit inside the container.
   */
//   useEffect(() => {
//     const fontToStringLength = {};
//
//     const stringLength = {}
//
//     function adjustFontSizeToFit() {
//       const textElements = document.querySelectorAll(".span-course"); // Correct class selector
//       if (textElements.length === 0) return; // Ensure elements are available
//
//       textElements.forEach((node) => {
//         const container = node.parentElement;
//         const containerWidth = container.clientWidth;
//         const containerHeight = container.clientHeight;
//
//         let fontSize = 15;
//
//         if (node.classList.contains("span-cr")) {
//           node.style.fontSize = 13 + "px";
//         } else {
//           while (
//               node.scrollWidth > containerWidth ||
//               node.scrollHeight + fontSize + 2 > containerHeight
//               ) {
//             fontSize--;
//             node.style.fontSize = fontSize + "px";
//           }
//         }
//       });
//
//       // logic to scrape the font size depending on the length of the string
//       textElements.forEach((node) => {
//         stringLength[node.innerText.length] = 1 + (stringLength[node.innerText.length] || 0);
//         if (fontToStringLength[node.style.fontSize])
//           fontToStringLength[node.style.fontSize] = {
//             ...fontToStringLength[node.style.fontSize],
//             "length": [...fontToStringLength[node.style.fontSize].length, node.innerText.length],
//             "count": fontToStringLength[node.style.fontSize].count + 1,
//             "innerText": [...fontToStringLength[node.style.fontSize].innerText, node.innerText]
//           };
//         else
//           fontToStringLength[node.style.fontSize] = {
//             "length": [node.innerText.length],
//             "count": 1,
//             "innerText": [node.innerText]
//           };
//         // if (node.innerText.length === 24) {
//         //   console.log(node.innerText, node.innerText.length);
//         // }
//         // if (node.innerText.length === 35) {
//         //   console.log(node.innerText, node.innerText.length);
//         // }
//       });
//
//       Object.keys(fontToStringLength).forEach((fontSize) => {
//   const lengths = fontToStringLength[fontSize].length;
//   const minLength = Math.min(...lengths);
//   const maxLength = Math.max(...lengths);
//   fontToStringLength[fontSize].minLength = minLength;
//   fontToStringLength[fontSize].maxLength = maxLength;
// });
//
//       console.table(fontToStringLength);
//
//     }
//
//     // Call the function after the component has mounted and the DOM is ready
//     adjustFontSizeToFit();
//
//     // Add window resize event listener
//     window.addEventListener("resize", adjustFontSizeToFit);
//
//     // Clean up the event listener on unmount
//     return () => {
//       window.removeEventListener("resize", adjustFontSizeToFit);
//     };
//   }, [filteredCourses]);


  return (
      <div className="course">
        <h3 className="season-title">
          {season.toLowerCase() === "fall" ? "Fall" : "Spring"} Courses
        </h3>
        <div className="left-right-course-div">
          {/* Render all filtered courses */}
          {filteredCourses.map(([courseName, courseInfos], index) => (
              <IndividualCourse key={`${courseName}-${index}`} courseName={courseName}
                                onClick={addCourseToColumn(courseInfos, courseName, undefined, setSharedCourses)}
                                courseInfos={courseInfos}/>
          ))}
        </div>
      </div>
  );
};

Course.propTypes = {
  season: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
};

export default Course;
