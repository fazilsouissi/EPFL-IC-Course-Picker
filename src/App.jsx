import {useEffect, useState} from "react";

import "./App.css";
import CourseForm from "./components/CourseForm.jsx";
import CourseColumn from "./components/CourseColumn.jsx";
import Header from "./components/Header";
import Course from "./components/Course";
import coursesJson from "./json/courses.json";

// Get shared courses from local storage
const localSavedCourses = JSON.parse(localStorage.getItem("sharedCourses"));
// Get sort by from local storage
const localSortBy = JSON.parse(localStorage.getItem("sortBy"));

const App = () => {

  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState([localSortBy] || ["Sort by Credits"]);
  const [isDragging, setIsDragging] = useState(false);


  const [sharedCourses, setSharedCourses] = useState(localSavedCourses || []);
  const [complementarySharedCourses, setComplementarySharedCourses] = useState([]);


  // // Update complementary courses when shared courses change
  useEffect(() => {

    // Save the sharedCourses in the local storage
    localStorage.setItem("sharedCourses", JSON.stringify(sharedCourses));

    const sharedCourseNames = new Set(Object.keys(sharedCourses));
    let complementaryCourses = Object.keys(coursesJson)
        .filter(courseName => !sharedCourseNames.has(courseName))
        .reduce((acc, courseName) => {
          acc[courseName] = coursesJson[courseName];
          return acc;
        }, {});


    // Sort complementary courses by credits
    Object.entries(complementaryCourses).sort((a, b) => {
      return b[1].credits - a[1].credits;
    }).forEach(([key, value]) => {
      // remove the course from the complementary courses
      delete complementaryCourses[key];
      complementaryCourses[key] = value;
    })


    console.log("Reupdated complementary courses", complementaryCourses);
    setComplementarySharedCourses(complementaryCourses);

  }, [sharedCourses]);

  const [searchValue, setSearchValue] = useState("");

  return (
      <div style={{minHeight: "1300px"}}>
        <Header sumOfCredits={Object.values(sharedCourses).reduce((acc, curr) => {
          return acc + Number(curr.credits);
        }, 0)}
                sortBy={sortBy} setSortBy={setSortBy}
        />
        <div className="app">
          <div className={"course-menu"}>
            <CourseForm setSearchValue={setSearchValue} setSelectedTags={setSelectedTags}
                        selectedTags={selectedTags}/>
            {String(sortBy) === "Sort by Credits" && (
                <>
                  <Course season="Fall" searchValue={searchValue}
                          complementarySharedCourses={complementarySharedCourses}
                          setComplementarySharedCourses={setComplementarySharedCourses}
                          sharedCourses={sharedCourses}
                          setSharedCourses={setSharedCourses} selectedTags={selectedTags}
                          sortBy={sortBy}
                  />
                  <Course season="Spring" searchValue={searchValue}
                          complementarySharedCourses={complementarySharedCourses}
                          setComplementarySharedCourses={setComplementarySharedCourses} sharedCourses={sharedCourses}
                          setSharedCourses={setSharedCourses} selectedTags={selectedTags}
                          sortBy={sortBy}
                  />
                </>
            )}
            {String(sortBy) === "Sort by Blocks" && (
                <>
                  <Course season="Fall" searchValue={searchValue}
                          complementarySharedCourses={complementarySharedCourses}
                          setComplementarySharedCourses={setComplementarySharedCourses}
                          sharedCourses={sharedCourses}
                          setSharedCourses={setSharedCourses} selectedTags={selectedTags}
                          sortBy={sortBy}
                  />
                  <Course season="Spring" searchValue={searchValue}
                          complementarySharedCourses={complementarySharedCourses}
                          setComplementarySharedCourses={setComplementarySharedCourses} sharedCourses={sharedCourses}
                          setSharedCourses={setSharedCourses} selectedTags={selectedTags}
                          sortBy={sortBy}
                  />
                </>            )}
          </div>
          <main className="app_main">
            <CourseColumn
                title="BA3"
                ba="BA3"
                sharedCourses={sharedCourses}
                setSharedCourses={setSharedCourses}
                complementarySharedCourses={complementarySharedCourses}
                setComplementarySharedCourses={setComplementarySharedCourses}
            />
            <CourseColumn
                title="BA4"
                ba="BA4"
                sharedCourses={sharedCourses}
                setSharedCourses={setSharedCourses}
                complementarySharedCourses={complementarySharedCourses}
                setComplementarySharedCourses={setComplementarySharedCourses}
            />
            <CourseColumn
                title="BA5"
                ba="BA5"
                sharedCourses={sharedCourses}
                setSharedCourses={setSharedCourses}
                complementarySharedCourses={complementarySharedCourses}
                setComplementarySharedCourses={setComplementarySharedCourses}
            />
            <CourseColumn
                title="BA6"
                ba="BA6"
                sharedCourses={sharedCourses}
                setSharedCourses={setSharedCourses}
                complementarySharedCourses={complementarySharedCourses}
                setComplementarySharedCourses={setComplementarySharedCourses}
            />
          </main>
        </div>
        <div style={
          {maxWidth: "30%", margin: "auto", marginTop: "20px"}


        }>
          <Course season="All" searchValue={searchValue}
                  complementarySharedCourses={complementarySharedCourses}
                  setComplementarySharedCourses={setComplementarySharedCourses}
                  sharedCourses={sharedCourses}
                  setSharedCourses={setSharedCourses} selectedTags={selectedTags}
                  sortBy={sortBy}
          />
        </div>
      </div>
  );
};

export default App;
