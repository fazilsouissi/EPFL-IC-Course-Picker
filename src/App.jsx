import {useEffect, useState} from "react";

import "./App.css";
import CourseForm from "./components/CourseForm.jsx";
import CourseColumn from "./components/CourseColumn.jsx";
import Header from "./components/Header";
import Course from "./components/Course";
import coursesJson from "./json/courses.json";

const oldCourses = localStorage.getItem("courses");

const App = () => {


  const [courses, setCourses] = useState(JSON.parse(oldCourses) || []);


  const [sharedCourses, setSharedCourses] = useState(coursesJson)
  const [complementarySharedCourses, setComplementarySharedCourses] = useState([]);


  // Update complementary courses when shared courses change
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

  const [searchValue, setSearchValue] = useState("");
  

  // todo vérifier les Fall Courses (BA3, BA5) et Spring Courses (BA4, BA6) qui
  //  sont présents dans les respective ba_courses et les ajouter dans les courses forms (si présent dans un,
  //    pas présent dans l'autre)

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);


  return (
      <>
        <Header sumOfCredits={Object.values(complementarySharedCourses).reduce((acc, curr) => {
            return acc + Number(curr.credits);
        },0)}/>
        <div className="app">
          <div>
            <CourseForm setCourses={setCourses} setSearchValue={setSearchValue}/>
            <Course season="Fall" searchValue={searchValue} sharedCourses={sharedCourses}
                    setSharedCourses={setSharedCourses}/>
            <Course season="Spring" searchValue={searchValue} sharedCourses={sharedCourses}
                    setSharedCourses={setSharedCourses}/>
          </div>
          <main className="app_main">
            <CourseColumn
                title="BA3"
                ba="BA3"
                sharedCourses={sharedCourses}
                setSharedCourses={setSharedCourses}
                complementarySharedCourses={complementarySharedCourses}
            />
            <CourseColumn
                title="BA4"
                ba="BA4"
                sharedCourses={sharedCourses}
                setSharedCourses={setSharedCourses}
                complementarySharedCourses={complementarySharedCourses}
            />
            <CourseColumn
                title="BA5"
                ba="BA5"
                sharedCourses={sharedCourses}
                setSharedCourses={setSharedCourses}
                complementarySharedCourses={complementarySharedCourses}
            />
            <CourseColumn
                title="BA6"
                ba="BA6"
                sharedCourses={sharedCourses}
                setSharedCourses={setSharedCourses}
                complementarySharedCourses={complementarySharedCourses}
            />
          </main>
        </div>
      </>
  );
};

export default App;
