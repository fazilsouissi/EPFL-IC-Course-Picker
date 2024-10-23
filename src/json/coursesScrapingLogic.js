import rawCourses from "./rawCourses.json";

// PASTED IT THIS ON THE BROWSER CONSOLE TO GET THE courses.json object in this 
// website : https://edu.epfl.ch/studyplan/en/bachelor/computer-science/


const courses = {};
let courseIndex = 0;
let booleanArray = [];

Array.from(document.querySelectorAll("#main > div > div > div > div.line")).map(
  (courseAnchor) => {
    Array.from(courseAnchor.children).forEach((e, index) => {
      switch (index) {
        case 0:
          courses[e.innerText.split("\n")[0]] = {
            language: "",
            season: "",
            credits: "",
            ba: "",
          };
          break;
        case 1:
          {
            // console.log(courses[rawCourses[courseIndex++]]);
            courses[rawCourses[courseIndex]].language = e.innerText;
          }
          break;
        case 2:
        case 3:
        case 4:
        case 5:
          {
            if (e.innerText == "-\n-\n-") {
              booleanArray.push(false);
            } else {
              booleanArray.push(true);
            }
            if (index == 5) {
              console.log(booleanArray);
              courses[rawCourses[courseIndex]].ba =
                Number(booleanArray.findIndex((e) => e == true)) + 3;
              booleanArray = [];
            }
          }
          break;
        case 6:
          courses[rawCourses[courseIndex]].season =
            e.innerText.split(" ")[0] == "Summer" ? "Spring" : "Fall";
          break;
        case 7:
          courses[rawCourses[courseIndex]].credits = e.innerText;
          break;
        case 8:
          courseIndex += 1;
          break;
      }
    });
  }
);
console.log(courses);
