import {useEffect, useState} from "react";

import "./App.css";
import CourseForm from "./components/CourseForm.jsx";
import CourseColumn from "./components/CourseColumn.jsx";
import Header from "./components/Header";
import Course from "./components/Course";
import coursesJson from "./json/courses.json";


// import todoIcon from "./assets/direct-hit.png";
// import doingIcon from "./assets/glowing-star.png";
// import doneIcon from "./assets/check-mark-button.png";

const oldCourses = localStorage.getItem("courses");

const App = () => {
  const [courses, setCourses] = useState(JSON.parse(oldCourses) || []);

  // const [sharedCourses, setSharedCourses] = useState(
  //     {
  //       "BA3": Object.entries(coursesJson).filter(
  //           ([, courseInfos]) => courseInfos.ba === 3
  //       ),
  //       "BA4": Object.entries(coursesJson).filter(
  //           ([, courseInfos]) => courseInfos.ba === 4
  //       ),
  //       "BA5": Object.entries(coursesJson).filter(
  //           ([, courseInfos]) => courseInfos.ba === 5
  //       ),
  //       "BA6": Object.entries(coursesJson).filter(
  //           ([, courseInfos]) => courseInfos.ba === 6
  //       ),
  //     },
  // );

  const [sharedCourses, setSharedCourses] = useState(coursesJson)
  const [complementarySharedCourses, setComplementarySharedCourses] = useState([]);

  useEffect(() => {
    // Calculate complementary courses
    const sharedCourseNames = new Set(Object.keys(sharedCourses));
    const complementaryCourses = Object.keys(coursesJson)
        .filter(courseName => !sharedCourseNames.has(courseName))
        .reduce((acc, courseName) => {
          acc[courseName] = coursesJson[courseName];
          return acc;
        }, {});

    console.log("Reupdated complementary courses", complementaryCourses);
    setComplementarySharedCourses(complementaryCourses);
  }, [sharedCourses]);

  const [BA3Courses, setBA3Courses] = useState([]);
  const [BA4Courses, setBA4Courses] = useState([]);
  const [BA5Courses, setBA5Courses] = useState([]);
  const [BA6Courses, setBA6Courses] = useState([]);

  const [activeCard, setActiveCard] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // useEffect(() => {
  //   const ba3Courses = Object.entries(courses).filter(
  //       ([, courseInfos]) => courseInfos.ba === 3
  //   );
  //   const ba4Courses = Object.entries(courses).filter(
  //       ([, courseInfos]) => courseInfos.ba === 4
  //   );
  //   const ba5Courses = Object.entries(courses).filter(
  //       ([, courseInfos]) => courseInfos.ba === 5
  //   );
  //   const ba6Courses = Object.entries(courses).filter(
  //       ([, courseInfos]) => courseInfos.ba === 6
  //   );
  //
  //   setBA3Courses(ba3Courses);
  //   setBA4Courses(ba4Courses);
  //   setBA5Courses(ba5Courses);
  //   setBA6Courses(ba6Courses);
  // }, []);

  // todo vérifier les Fall Courses (BA3, BA5) et Spring Courses (BA4, BA6) qui
  //  sont présents dans les respective ba_courses et les ajouter dans les courses forms (si présent dans un,
  //    pas présent dans l'autre)

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const handleDelete = (courseIndex) => {
    const newCourses = courses.filter((course, index) => index !== courseIndex);
    setCourses(newCourses);
  };

  const onDrop = (status, position) => {
    console.log(`${activeCard} is now ${status} at index ${position}`);

    if (activeCard == null) return;
    const courseToMove = courses[activeCard];
    const updatedCourse = courses.filter((course, index) => index !== activeCard);

    updatedCourse.splice(position, 0, {
      ...courseToMove,
      status: status,
    });

    setCourses(updatedCourse);
  };


  return (
      <>
        <Header/>
        <div className="app">
          <div>
            <CourseForm setCourses={setCourses} setSearchValue={setSearchValue}/>
            <Course season="Fall" searchValue={searchValue} setBAFirstCourse={setBA3Courses}
                    setBASecondCourse={setBA5Courses} sharedCourses={sharedCourses}
                    setSharedCourses={setSharedCourses}/>
            <Course season="Spring" searchValue={searchValue} setBAFirstCourse={setBA4Courses}
                    setBASecondCourse={setBA6Courses} sharedCourses={sharedCourses}
                    setSharedCourses={setSharedCourses}/>
          </div>
          <main className="app_main">
            <CourseColumn
                title="BA3"
                baCourses={BA3Courses}
                // icon={todoIcon}
                courses={courses}
                ba="BA3"
                handleDelete={handleDelete}
                // setActiveCard={setActiveCard}
                setBACourse={setBA3Courses}
                sharedCourses={sharedCourses}
                setSharedCourses={setSharedCourses}
                complementarySharedCourses={complementarySharedCourses}
                onDrop={onDrop}
            />
            <CourseColumn
                title="BA4"
                baCourses={BA4Courses}
                // icon={doingIcon}
                courses={courses}
                ba="BA4"
                handleDelete={handleDelete}
                // setActiveCard={setActiveCard}
                setBACourse={setBA4Courses}
                sharedCourses={sharedCourses}
                setSharedCourses={setSharedCourses}
                complementarySharedCourses={complementarySharedCourses}
                onDrop={onDrop}
            />
            <CourseColumn
                title="BA5"
                baCourses={BA5Courses}
                // icon={doneIcon}
                courses={courses}
                ba="BA5"
                handleDelete={handleDelete}
                // setActiveCard={setActiveCard}
                setBACourse={setBA5Courses}
                sharedCourses={sharedCourses}
                setSharedCourses={setSharedCourses}
                complementarySharedCourses={complementarySharedCourses}
                onDrop={onDrop}
            />
            <CourseColumn
                title="BA6"
                baCourses={BA6Courses}
                // icon={doneIcon}
                courses={courses}
                ba="BA6"
                handleDelete={handleDelete}
                // setActiveCard={setActiveCard}
                setBACourse={setBA6Courses}
                sharedCourses={sharedCourses}
                setSharedCourses={setSharedCourses}
                complementarySharedCourses={complementarySharedCourses}
                onDrop={onDrop}
            />
          </main>
        </div>
      </>
  );
};

export default App;
