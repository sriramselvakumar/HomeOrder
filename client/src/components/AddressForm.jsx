import React, { useState, useEffect } from "react";
import { Jumbotron, Form, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const AddressForm = (props) => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [code, setCode] = useState("");
  const [statesList, setStateList] = useState();

  const renderStates = () => {
    const stateAbbreviations = [
      "AL",
      "AK",
      "AS",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "DC",
      "FM",
      "FL",
      "GA",
      "GU",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MH",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "MP",
      "OH",
      "OK",
      "OR",
      "PW",
      "PA",
      "PR",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VI",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ];
    const list = stateAbbreviations.map((state) => {
      return (
        <option key={state} onClick={() => setState(state)}>
          {state}
        </option>
      );
    });
    setStateList(list);
  };

  useEffect(() => {
    renderStates();
  }, []);

  return (
    <Card
      className="mx-auto"
      style={{ backgroundColor: "#faf5f2", width: "100%" }}
    >
      <h5 className="text-center">Address Form</h5>
      <Card.Body>
        <Form className="mx-auto">
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              onChange={(event) => setStreet(event.target.value)}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control onChange={(event) => setCity(event.target.value)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={(event) => setState(event.target.value)}
              >
                {statesList}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control onChange={(event) => setCode(event.target.value)} />
            </Form.Group>
          </Form.Row>
          <div className="text-center">
            <Link to="/">
              <Button
                onClick={() =>
                  props.submit({
                    street,
                    city,
                    state,
                    code,
                  })
                }
                variant="primary"
              >
                Submit
              </Button>
            </Link>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddressForm;
