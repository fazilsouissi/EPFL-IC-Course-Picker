import "./CourseColumn.css";
import DropArea from "./DropArea";
import courseJson from "../json/courses.json";

import "./Course.css"
import IndividualCourse from "./IndividualCourse.jsx";

const CourseColumn = ({
                        title,
                        ba,
                        sharedCourses,
                        setSharedCourses,
                        complementarySharedCourses,
                        setComplementarySharedCourses
                      }) => {
  const removeCourseFromColumn = (courseName) => {
    return (e) => {
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
      // console.log(`Course ${courseName} clicked`);
      // console.log(sharedCourses)
    };
  }

  const getCreditsForBa = () => {
    return (Object.values(complementarySharedCourses).filter(courseInfos => {
      // Assuming ba is a number or contains a valid number at index 2
      const baValue = Number(ba.at(2)); // or Number(ba.at(2)) if ba is a string/array
      return courseInfos.ba === baValue;
    })).reduce((acc, course) => acc + Number(course.credits), 0)
  }


  const addCourseToColumn = (courseName, event) => {
    // setSharedCourses((prevCourses) => {
    //   if (Object.keys(prevCourses).some((name) => name === courseName)) {
    //     // Remove the course
    //     // console.log(ba)
    //     // console.log(courseName)
    //     if (courseJson[courseName].ba === Number(ba.at(2))) {
    //       const newCourses = {...prevCourses};
    //       delete newCourses[courseName];
    //       return newCourses;
    //     }
    //   }
    //   return prevCourses;
    // });
    setComplementarySharedCourses((prevCourses) => {
        if (Object.keys(prevCourses).some((name) => name === courseName)) {
        return prevCourses;
        }
        else {
            const newCourses = {...prevCourses};
            newCourses[courseName] = courseJson[courseName]; // Add course data from courseJson
            return newCourses;
        }
    }
    );

    // console.log(`Course ${courseName} clicked and removed added to its respective BA${event.target} courses`);
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const courseName = event.dataTransfer.getData("courseName");
    if (courseName) addCourseToColumn(courseName, event);
    // console.log(`Course ${courseName} dropped`);
  }

  return (
      <section className="course_column"
               id={`section-${ba}`}
               onDrop={handleDrop}
               onDragOver={(event) => {
                 event.preventDefault();
               }}>
        <h2 className="course_column_heading">
          {title} {getCreditsForBa()} Cr
        </h2>

        <DropArea onDrop={() => {
        }}/>

        <div className="course-column">
          {
            Object.entries(complementarySharedCourses).map(([courseName, courseInfos], index) => (
                courseInfos.ba === Number(ba.at(2)) && (
                    <IndividualCourse key={`${courseName}-${index}`} courseName={courseName} courseInfos={courseInfos}
                                      onClick={removeCourseFromColumn(courseName)}/>
                )

            ))
          }
        </div>
        {/* Make sure that this DropArea is visible if the complementarySharedCourse length > 0 for the specific column*/}
        {/*{Object.keys(complementarySharedCourses).length > 0 && <DropArea onDrop={() => {*/}
        {/*}}/>}*/}

      </section>
  );
};

export default CourseColumn;
