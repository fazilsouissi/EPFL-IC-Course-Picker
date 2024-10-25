import { Fragment } from "react";
import PropTypes from "prop-types";

import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";

// interface TaskColumnProps {
//   title: string;
//   icon: string;
//   tasks: {
//     task: string;
//     tags: string[];
//     status: string;
//   }[];
//   status: string;
//   handleDelete: (index: number) => void;
//   setActiveCard: (index: number) => void;
//   onDrop: (status: string, position: number) => void;
// }

const TaskColumn = ({
  title,
  // icon,
  tasks,
  status,
  handleDelete,
  setActiveCard,
  onDrop,
}) => {
  return (
    <section className="task_column">
      <h2 className="task_column_heading">
        {/* <img className="task_column_icon" src={icon} alt="" />  */}
        {title}
      </h2>
      <DropArea onDrop={() => onDrop(status, 0)} />

      {tasks.map(
        (task, index) =>
          task.status === status && (
            <Fragment key={index}>
              <TaskCard
                title={task.task}
                tags={task.tags}
                handleDelete={handleDelete}
                index={index}
                setActiveCard={setActiveCard}
              />
              <DropArea onDrop={() => onDrop(status, index + 1)} />
            </Fragment>
          )
      )}
    </section>
  );
};
TaskColumn.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      task: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  status: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  setActiveCard: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

export default TaskColumn;
