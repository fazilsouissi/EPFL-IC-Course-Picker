import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchMenu = ({ searchQuery, courses, onSelectCourse }) => {
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = courses.filter((course) =>
                course.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCourses(filtered);
        } else {
            setFilteredCourses([]);
        }
    }, [searchQuery, courses]);

    return (
        <ul className="search-menu">
            {filteredCourses.map((course, index) => (
                <li key={index} onClick={() => onSelectCourse(course)}>
                    {course}
                </li>
            ))}
        </ul>
    );
};

SearchMenu.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    courses: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelectCourse: PropTypes.func.isRequired,
};


export default SearchMenu;
