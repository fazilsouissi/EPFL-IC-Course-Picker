import {useState, useEffect} from "react";

import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import Header from "./components/Header";
import Course from "./components/Course1";
// import todoIcon from "./assets/direct-hit.png";
// import doingIcon from "./assets/glowing-star.png";
// import doneIcon from "./assets/check-mark-button.png";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
    const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
    const [activeCard, setActiveCard] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleDelete = (taskIndex) => {
        const newTasks = tasks.filter((task, index) => index !== taskIndex);
        setTasks(newTasks);
    };

    const onDrop = (status, position) => {
        console.log(`${activeCard} is now ${status} at index ${position}`);

        if (activeCard == null) return;
        const taskToMove = tasks[activeCard];
        const updatedTask = tasks.filter((task, index) => index !== activeCard);

        updatedTask.splice(position, 0, {
            ...taskToMove,
            status: status,
        });

        setTasks(updatedTask);
    };


    return (
        <>
            <Header/>
            <div className="app">
                <div>
                    <TaskForm setTasks={setTasks} setSearchValue={setSearchValue}/>
                    <Course season="Fall" searchValue={searchValue}/>
                    <Course season="Spring" searchValue={searchValue}/>
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
