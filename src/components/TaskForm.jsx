import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./styles/TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "BA3",
    tags: [],
  });

  const [courses] = useState([
    "IC Course 1",
    "IC Course 2",
    "IC Course 3",
    "IC Course 4",
    "IC Course ",
    "IC Course 6",
    "IC Course 7",
    "IC Course 8",
    // Add more courses here
  ]);

  const [filteredCourses, setFilteredCourses] = useState([]);

  // Filter courses as the user types in the task input field
  useEffect(() => {
    if (taskData.task) {
      const filtered = courses.filter(course =>
        course.toLowerCase().includes(taskData.task.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
    }
  }, [taskData.task, courses]);

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskData);
    setTasks((prev) => {
      return [...prev, taskData];
    });
    setTaskData({
      task: "",
      status: "BA3",
      tags: [],
    });
  };

  const handleCourseSelect = (course) => {
    setTaskData((prev) => ({ ...prev, task: course }));
    setFilteredCourses([]); // Clear the search results after selecting a course
  };

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskData.task}
          className="task_input"
          placeholder="Search for IC Course"
          onChange={handleChange}
        />
        
        {/* Display filtered courses in a dropdown-like manner */}
        {filteredCourses.length > 0 && (
          <ul className="course-list">
            {filteredCourses.map((course, index) => (
              <li key={index} onClick={() => handleCourseSelect(course)}>
                {course}
              </li>
            ))}
          </ul>
        )}

        <div className="task_form_bottom_line">
          <div>
            <Tag
              tagName="8 Credits" 
              selectTag={selectTag}
              selected={checkTag("8 Credits")}
            />
            <Tag
              tagName="6 Credits"
              selectTag={selectTag}
              selected={checkTag("6 Credits")}
            />
            <Tag
              tagName="5 Credits"
              selectTag={selectTag}
              selected={checkTag("5 Credits")}
            />
            <Tag
              tagName="4 Credits"
              selectTag={selectTag}
              selected={checkTag("4 Credits")}
            />
            <Tag
              tagName="SHS - 2 Credits"
              selectTag={selectTag}
              selected={checkTag("SHS - 2 Credits")}
            />
          </div>

          <div>
            <select
              name="status"
              value={taskData.status}
              className="task_status"
              onChange={handleChange}
            >
              <option value="BA3">BA3</option>
              <option value="BA4">BA4</option>
              <option value="BA5">BA5</option>
              <option value="BA6">BA6</option>
            </select>
            <button type="submit" className="task_submit">
              + Add Course
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

TaskForm.propTypes = {
  setTasks: PropTypes.func.isRequired,
};

export default TaskForm;
