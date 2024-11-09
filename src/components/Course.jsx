import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import "./Course.css";
import "./CustomFont.scss"


import IndividualCourse from "./IndividualCourse";
import courseJson from "../json/courses.json";


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
                  selectedTags,
                  sortBy
                }) => {
  const [filteredCourses, setFilteredCourses] = useState([]);

  const blockOrder = {
    "Bloc A": 1,
    "Bloc B": 2,
    "Bloc C": 3,
    "Bloc transversal SHS": 4,
    'Groupe "Cours à option"': 5,
    'Groupe "Physique/Bio"': 6,
    'Groupe I "projet"': 7
  };

  // let sortedCourses = filteredCourses;

  // Filter courses by season and search value when either changes
  useEffect(() => {
    // Filter courses by season
    const seasonFilteredCourses = Object.entries(complementarySharedCourses).filter(
        ([, courseInfos]) => season === "All" || courseInfos.season === season
    );

    // Map tags to credits if tags are present
    const selectedTagsAsCredits = selectedTags.map(tag => tag.replace(/\D/g, ''));

    // Further filter by searchValue (case-insensitive) and selected tags
    const searchRegex = new RegExp(searchValue, "i");
    const filtered = seasonFilteredCourses.filter(([courseName, courseInfos]) =>
        searchRegex.test(courseName) &&
        (selectedTagsAsCredits.length === 0 || selectedTagsAsCredits.includes(courseInfos.credits))
    );

    // Sort based on `sortBy` value
    const sorted = filtered.sort((a, b) => {
      if (String(sortBy) === "Sort by Credits") {
        return Number(b[1].credits) - Number(a[1].credits);
      } else if (String(sortBy) === "Sort by Blocks") {
        return blockOrder[a[1].block] - blockOrder[b[1].block];
      }
      return 0; // Default case if no sorting
    });

    setFilteredCourses(sorted); // Update the state with sorted courses

  }, [season, searchValue, complementarySharedCourses, selectedTags, sortBy]);
  ;

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

  const handleDrop = (event) => {
    event.preventDefault();
    const courseName = event.dataTransfer.getData("courseName");
    const courseInfos = courseJson[courseName];

    removeCourseFromColumn(courseName, setSharedCourses)(event)
  };

  return (
      <div className="course"
           onDrop={
             handleDrop
           }
           onDragOver={(event) => {
             event.preventDefault();
           }}
      >
        {String(sortBy) === "Sort by Credits" &&
            <>
              <h3 className="season-title">
                {season.toLowerCase() === "fall" ? "Fall" : "Spring"} Courses
              </h3>
              <div className="left-right-course-div">
                {/* Render all filtered courses */}
                {filteredCourses.map(([courseName, courseInfos], index) => (
                    <IndividualCourse key={`${courseName}-${index}`} courseName={courseName}
                                      onClick={addCourseToColumn(courseInfos, courseName,
                                          undefined, setSharedCourses)}
                                      courseInfos={courseInfos}/>
                ))}
              </div>

            </>

        }
        {/*{String(sortBy) === "Sort by Blocks" && (*/}
        {/*    <>*/}
        {/*      <h3 className="season-title">*/}
        {/*        {season.toLowerCase() === "fall" ? "Fall" : "Spring"} Courses*/}
        {/*      </h3>*/}
        {/*      <div className="left-right-course-div">*/}
        {/*        /!* Group courses by block *!/*/}
        {/*        {Object.entries(*/}
        {/*            filteredCourses.reduce((acc, [courseName, courseInfos]) => {*/}
        {/*              const blockName = courseInfos.block;*/}
        {/*              if (!acc[blockName]) acc[blockName] = [];*/}
        {/*              acc[blockName].push([courseName, courseInfos]);*/}
        {/*              return acc;*/}
        {/*            }, {})*/}
        {/*        ).map(([blockName, courses]) => (*/}
        {/*            <div key={blockName} className="block-group">*/}
        {/*              /!* Block title *!/*/}
        {/*              <h5 className="block-title">{blockName}</h5>*/}

        {/*              /!* Render all courses for this block *!/*/}
        {/*              {courses.map(([courseName, courseInfos], index) => (*/}
        {/*                  <IndividualCourse*/}
        {/*                      key={`${courseName}-${index}`}*/}
        {/*                      courseName={courseName}*/}
        {/*                      onClick={addCourseToColumn(courseInfos, courseName, undefined, setSharedCourses)}*/}
        {/*                      courseInfos={courseInfos}*/}
        {/*                  />*/}
        {/*              ))}*/}
        {/*            </div>*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*    </>*/}
        {/*)*/}
        {/*}*/}
        {String(sortBy) === "Sort by Blocks" && (
            <>
              <h3 className="season-title">
                {season.toLowerCase() === "fall" ? "Fall" : "Spring"} Courses
              </h3>
              <div className="left-right-course-div">
                {Object.entries(
                    filteredCourses.reduce((acc, [courseName, courseInfos]) => {
                      const blockName = courseInfos.block;
                      if (!acc[blockName]) acc[blockName] = [];
                      acc[blockName].push([courseName, courseInfos]);
                      return acc;
                    }, {})
                ).flatMap(([blockName, courses]) => [
                  <h5 key={`${blockName}-title`} className="block-title">{blockName}</h5>,
                  ...courses.map(([courseName, courseInfos], index) => (
                      <IndividualCourse
                          key={`${courseName}-${index}`}
                          courseName={courseName}
                          onClick={addCourseToColumn(courseInfos, courseName, undefined, setSharedCourses)}
                          courseInfos={courseInfos}
                      />
                  ))
                ])}
              </div>
            </>
        )}


      </div>
  )
      ;
};

Course.propTypes = {
  season: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
};

export default Course;


// Handle adding a course and removing it from the DOM
export const addCourseToColumn = (courseInfos, courseName, ba, setSharedCourses) => (e) => {
  ba = ba !== undefined ? ba : courseInfos.ba;
  e.preventDefault();
  setSharedCourses((prevCourses) => {
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

export const removeCourseFromColumn = (courseName, setSharedCourses) => {
  return (e) => {
    e.preventDefault();
    setSharedCourses((prevCourses) => {
      if (Object.keys(prevCourses).some((name) => name === courseName)) {
        // remove the course
        const newCourses = {...prevCourses};
        delete newCourses[courseName];
        console.log(`Course ${courseName} ${e.type === "click" ? "clicked" : "dropped"} 
        and removed from its respective BA courses`);
        return newCourses;
      }
      return prevCourses; // Return the same state if the course is already present
    });
  };
}

