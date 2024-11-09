import PropTypes from "prop-types";
import {useState} from "react";

import "./CreditsTag.css";

const SortTag = ({tagName, selectTag, selected}) => {
  const [isHovered, setIsHovered] = useState(false);
  // const tagStyle = {
  //     "8 Credits": { backgroundColor: "#fda821" },
  //     "6 Credits": { backgroundColor: "#15d4c8" },
  //     "5 Credits": { backgroundColor: "#ffd12c" },
  //     "4 Credits": { backgroundColor: "#4cdafc" },
  //     "SHS - 2 Credits": { backgroundColor: "yellow" },
  //     default: { backgroundColor: "#f9f9f9" },
  // };
  // const tagStyle = {
  //     "8 Credits": { backgroundColor: "#FFDAB9" },  // Light Peach
  //     "6 Credits": { backgroundColor: "#B3E5B2" },  // Light Mint
  //     "5 Credits": { backgroundColor: "#F5DEB3" },  // Light Beige
  //     "4 Credits": { backgroundColor: "#B2E1FF" },  // Light Sky Blue
  //     "SHS - 2 Credits": { backgroundColor: "#FFFFCC" },  // Light Lemon
  //     default: { backgroundColor: "#f9f9f9" },  // Default grayish background
  // };
  const tagStyle = {
    "8 Credits": {
      selected: {backgroundColor: "var(--color-8-credits-selected)"},
      hover: {backgroundColor: "var(--color-8-credits-hover)"}
    },
    "6 Credits": {
      selected: {backgroundColor: "var(--color-6-credits-selected)"},
      hover: {backgroundColor: "var(--color-6-credits-hover)"}
    },
    "5 Credits": {
      selected: {backgroundColor: "var(--color-5-credits-selected)"},
      hover: {backgroundColor: "var(--color-5-credits-hover)"}
    },
    "4 Credits": {
      selected: {backgroundColor: "var(--color-4-credits-selected)"},
      hover: {backgroundColor: "var(--color-4-credits-hover)"}
    },
    "SHS - 2 Credits": {
      selected: {backgroundColor: "var(--color-shs-2-credits-selected)"},
      hover: {backgroundColor: "var(--color-shs-2-credits-hover)"}
    },
    "3 Credits": {
      selected: {backgroundColor: "var(--color-3-credits-selected)"},
      hover: {backgroundColor: "var(--color-3-credits-hover)"}
    },
    "Sort by Credits": {
      selected: {backgroundColor: "var(--color-sort-by-credits-selected)"},
      hover: {backgroundColor: "var(--color-sort-by-credits-hover)"}
    },
    "Sort by Blocks": {
      selected: {backgroundColor: "var(--color-sort-by-blocks-selected)"},
      hover: {backgroundColor: "var(--color-sort-by-blocks-hover)"}
    },
    default: {
      selected: {backgroundColor: "var(--color-default-selected)"},
      hover: {backgroundColor: "var(--color-default-hover)"}
    }
  };


  return (
      <button
          type='button'
          className='tag'
          style={{
            color: selected && tagName.includes("Sort") ? "white" : "inherit",  
            ...(
                isHovered
                    ? (selected ? tagStyle[tagName].selected : tagStyle[tagName].hover)
                    : (selected ? tagStyle[tagName].selected : tagStyle.default.selected)
            )
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => selectTag(tagName)}
      >
        {tagName}
      </button>
  );
};
SortTag.propTypes = {
  tagName: PropTypes.string.isRequired,
  selectTag: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default SortTag;
