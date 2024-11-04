import {useState} from "react";
import PropTypes from "prop-types";
import "./CourseForm.css";
import CreditsTag from "./CreditsTag.jsx";

const CourseForm = ({setCourses, setSearchValue, selectedTags, setSelectedTags}) => {
  const [courseData, setCourseData] = useState({
    course: "", status: "BA3", tags: [],
  });


  // useEffect(() => { // The effect hook
  // The code that runs when the component mounts
  // optional cleanup/return function
  // }, [searchValue]); /// The dependencies array

  // const [courses] = useState([
  //   "IC Course 1",
  //   "IC Course 2",
  //   "IC Course 3",
  //   "IC Course 4",
  //   "IC Course ",
  //   "IC Course 6",
  //   "IC Course 7",
  //   "IC Course 8",
  //   // Add more courses here
  // ]);

  // const [filteredCourses, setFilteredCourses] = useState([]);

  // // Filter courses as the user types in the course input field
  // useEffect(() => {
  //   if (courseData.course) {
  //     const filtered = courses.filter((course) =>
  //       course.toLowerCase().includes(courseData.course.toLowerCase())
  //     );
  //     setFilteredCourses(filtered);
  //   } else {
  //     setFilteredCourses([]);
  //   }
  // }, [courseData.course, courses]);

  // const checkTag = (tag) => {
  //   return courseData.tags.some((item) => item === tag);
  // };
  const checkTag = (tag) => {
    return selectedTags.some((item) => item === tag);
  };

  // const selectTag = (tag) => {
  //   setSelectedTags((prev) => {
  //       return [...prev, tag];
  //   });
  //   // if (courseData.tags.some((item) => item === tag)) {
  //   //   const filterTags = courseData.tags.filter((item) => item !== tag);
  //   //   setCourseData((prev) => {
  //   //     return {...prev, tags: filterTags};
  //   //   });
  //   // } else {
  //   //   setCourseData((prev) => {
  //   //     return {...prev, tags: [...prev.tags, tag]};
  //   //   });
  //   // }
  // };
  const selectTag = (tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        // If tag is already selected, remove it
        return prev.filter((item) => item !== tag);
      } else {
        // If tag is not selected, add it
        return [...prev, tag];
      }
    });
  };


  const handleChange = (e) => {
    const {name, value} = e.target;

    setCourseData((prev) => {
      return {...prev, [name]: value};
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(courseData);
    setCourses((prev) => {
      return [...prev, courseData];
    });
    setCourseData({
      course: "", ba: "BA3", // Default ba to submit a course
      tags: [],
    });
  };

  // const handleCourseSelect = (course) => {
  //   setCourseData((prev) => ({ ...prev, course: course }));
  //   setFilteredCourses([]); // Clear the search results after selecting a course
  // };

  return (<header className="app_header">
    <form onSubmit={handleSubmit}>
      <div className="search-bar-container">
        <input
            type="text"
            name="course"
            value={courseData.course}
            className="course_input"
            placeholder="Search for IC Course"
            onChange={(e) => {
              setSearchValue(e.target.value)
              handleChange(e);
            }}
        />
        {/*<select*/}
        {/*    name="status"*/}
        {/*    value={courseData.status}*/}
        {/*    className="course_status"*/}
        {/*    onChange={handleChange}*/}
        {/*>*/}
        {/*  <option value="BA3">BA3</option>*/}
        {/*  <option value="BA4">BA4</option>*/}
        {/*  <option value="BA5">BA5</option>*/}
        {/*  <option value="BA6">BA6</option>*/}
        {/*</select>*/}
        {/*<button type="submit" className="course_submit">*/}
        {/*  + Add Course*/}
        {/*</button>*/}
      </div>

      {/* Display filtered courses in a dropdown-like manner */}
      {/* {filteredCourses.length > 0 && (
          <ul className="course-list">
            {filteredCourses.map((course, index) => (
              <li key={index} onClick={() => handleCourseSelect(course)}>
                {course}
              </li>
            ))}
          </ul>
        )} */}

      <div className="course_form_bottom_line">
        <CreditsTag
            tagName="8 Credits"
            selectTag={selectTag}
            selected={checkTag("8 Credits")}
        />
        <CreditsTag
            tagName="6 Credits"
            selectTag={selectTag}
            selected={checkTag("6 Credits")}
        />
        <CreditsTag
            tagName="5 Credits"
            selectTag={selectTag}
            selected={checkTag("5 Credits")}
        />
        <CreditsTag
            tagName="4 Credits"
            selectTag={selectTag}
            selected={checkTag("4 Credits")}
        />
        <CreditsTag
            tagName="3 Credits"
            selectTag={selectTag}
            selected={checkTag("3 Credits")}
        />
        <CreditsTag
            tagName="SHS - 2 Credits"
            selectTag={selectTag}
            selected={checkTag("SHS - 2 Credits")}
        />
      </div>
    </form>
  </header>);
};

CourseForm.propTypes = {
  setCourses: PropTypes.func.isRequired, setSearchValue: PropTypes.func.isRequired,
  selectedTags: PropTypes.array.isRequired, setSelectedTags: PropTypes.func.isRequired,
};

export default CourseForm;
