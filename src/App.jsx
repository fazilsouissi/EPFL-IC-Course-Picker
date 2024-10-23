import { useState, useEffect } from "react";

import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import Header from "./components/Header";
import Course from "./components/Course";
// import todoIcon from "./assets/direct-hit.png";
// import doingIcon from "./assets/glowing-star.png";
// import doneIcon from "./assets/check-mark-button.png";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const onDrop = (status, position) => {
    console.log(`${activeCard} is now ${status} at index ${position}`);

    if (activeCard == null || activeCard === undefined) return;
    const taskToMove = tasks[activeCard];
    const updatedTask = tasks.filter((task, index) => index !== activeCard);

    updatedTask.splice(position, 0, {
      ...taskToMove,
      status: status,
    });

    setTasks(updatedTask);
  };

  useEffect(() => {
    function adjustFontSizeToFit() {
      const textElements = document.querySelectorAll('.span-course'); // Correct class selector
      console.log(textElements); // Check if elements are selected
    
      textElements.forEach((node) => {
        const container = node.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
    
        let fontSize = 20;
        
        if (node.classList.contains('span-cr')) {
          console.log('span-cr');
          node.style.fontSize = 13 + "px";
        }
        else {
          while (node.scrollWidth > containerWidth || node.scrollHeight + fontSize + 2 > containerHeight) {
            fontSize--;
            node.style.fontSize = fontSize + 'px';
          }
        }
        // Decrease font size until the text fits within the container's width and height
      });
    }
  
    // Call the function once on mount
    adjustFontSizeToFit();
  
    // Add window resize event listener
    window.addEventListener('resize', adjustFontSizeToFit);
  
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', adjustFontSizeToFit);
    };
  }, []); // Empty dependency array to run effect on mount
  

  return (
    <>
      <Header />
    <div className="app">
      <div>
        <TaskForm setTasks={setTasks} />
        <Course season="Fall"/>
        <Course season="Spring"/>
      </div>
      <main className="app_main">
        <TaskColumn
          title="BA3"
          // icon={todoIcon}
          tasks={tasks}
          status="BA3"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          />
        <TaskColumn
          title="BA4"
          // icon={doingIcon}
          tasks={tasks}
          status="BA4"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          />
        <TaskColumn
          title="BA5"
          // icon={doneIcon}
          tasks={tasks}
          status="BA5"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          />
        <TaskColumn
          title="BA6"
          // icon={doneIcon}
          tasks={tasks}
          status="BA6"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          />
      </main>
    </div>
          </>
  );
};

export default App;
