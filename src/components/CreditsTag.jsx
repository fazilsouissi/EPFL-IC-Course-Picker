import PropTypes from "prop-types";
import {useState} from "react";

import "./CreditsTag.css";

const CreditsTag = ({ tagName, selectTag, selected }) => {
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
            selected: { backgroundColor: "#FF9999" },  // Darker Pink
            hover: { backgroundColor: "#FFC1C1" }      // Pastel Pink
        },
        "6 Credits": {
            selected: { backgroundColor: "#A3D1A3" },  // Darker Green
            hover: { backgroundColor: "#C1E1C1" }      // Pastel Green
        },
        "5 Credits": {
            selected: { backgroundColor: "#FFCC99" },  // Darker Apricot
            hover: { backgroundColor: "#FFE5B4" }      // Pastel Apricot
        },
        "4 Credits": {
            selected: { backgroundColor: "#85AFCB" },  // Darker Blue
            hover: { backgroundColor: "#A7C7E7" }      // Pastel Blue
        },
        "SHS - 2 Credits": {
            selected: { backgroundColor: "#FFEB99" },  // Darker Yellow
            hover: { backgroundColor: "#FFFACD" }      // Pastel Yellow
        },
        default: {
            selected: { backgroundColor: "#f9f9f9" },  // Default grayish background
            hover: { backgroundColor: "#f0f0f0" }      // Lighter gray hover
        }
    };

    return (
        <button
            type='button'
            className='tag'
            style={
                isHovered
                    ? (selected ? tagStyle[tagName].selected : tagStyle[tagName].hover)
                    : (selected ? tagStyle[tagName].selected : tagStyle.default.selected)
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => selectTag(tagName)}
        >
            {tagName}
        </button>
    );
};
CreditsTag.propTypes = {
    tagName: PropTypes.string.isRequired,
    selectTag: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
};

export default CreditsTag;
