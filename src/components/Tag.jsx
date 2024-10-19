import PropTypes from "prop-types";

import "./styles/Tag.css";

const Tag = ({ tagName, selectTag, selected }) => {
    const tagStyle = {
        "8 Credits": { backgroundColor: "#fda821" },
        "6 Credits": { backgroundColor: "#15d4c8" },
        "5 Credits": { backgroundColor: "#ffd12c" },
        "4 Credits": { backgroundColor: "#4cdafc" },
        // SHS_2_Credits: { backgroundColor: "#4cdafc" },
        "SHS - 2 Credits": { backgroundColor: "yellow" },
        default: { backgroundColor: "#f9f9f9" },
    };
    return (
        <button
            type='button'
            className='tag'
            style={selected ? tagStyle[tagName] : tagStyle.default}
            onClick={() => selectTag(tagName)}>
            {tagName}
        </button>
    );
};
Tag.propTypes = {
    tagName: PropTypes.string.isRequired,
    selectTag: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
};

export default Tag;
