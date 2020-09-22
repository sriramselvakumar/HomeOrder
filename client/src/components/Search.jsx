import React from "react";
import Form from "react-bootstrap/Form";

const Search = (props) => {
  return (
    <Form style={{ width: "100%" }}>
      <Form.Control
        type="text"
        placeholder="Search for products"
        onChange={props.onChange}
      />
    </Form>
  );
};

export default Search;
