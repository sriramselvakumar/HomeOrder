import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const Sort = (props) => {
    return (
        <DropdownButton
            onSelect={props.changeSort}
            onChange={props.onChange}
            title="Sort By: "
        >
            <Dropdown.Item onClick={() => props.changeSort("price")} eventKey="price">Price</Dropdown.Item>
            <Dropdown.Item onClick={() => props.changeSort("popularity")} eventKey="popularity">Popularity</Dropdown.Item>
        </DropdownButton>
    );
};

export default Sort;
