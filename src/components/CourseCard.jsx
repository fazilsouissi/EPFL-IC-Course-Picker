import PropTypes from "prop-types";

import "./CourseCard.css.css";
import CreditsTag from "./CreditsTag.jsx";
import deleteIcon from "../assets/delete.png";

/**
 * Component responsible for the course card present in the course column
 *
 * @param title
 * @param tags
 * @param handleDelete
 * @param index
 * @param setActiveCard
 * @returns {JSX.Element}
 * @constructor
 */
const CourseCard = ({ title, tags, handleDelete, index, setActiveCard }) => {
  return (
    <article
      className="course_card"
      draggable
      onDragStart={() => {
        setActiveCard(index);
      }}
      onDragEnd={() => {
        setActiveCard(null);
      }}
    >
      <p className="course_text">{title}</p>

      <div className="course_card_bottom_line">
        <div className="course_card_tags">
          {tags.map((tag, index) => (
            <CreditsTag key={index} tagName={tag} selected />
          ))}
        </div>
        <div className="course_delete" onClick={() => handleDelete(index)}>
          <img src={deleteIcon} className="delete_icon" alt="" />
        </div>
      </div>
    </article>
  );
};

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  setActiveCard: PropTypes.func.isRequired,
};

export default CourseCard;
