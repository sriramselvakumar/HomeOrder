import React from 'react';
import Form from "react-bootstrap/Form";

class AccountMenu extends React.Component {
    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>My Account</Form.Label>
                    <Form.Control as="select">
                        <option>Settings</option>
                        <option>Orders</option>
                        <option>Favorites</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        );
    }
}
export default AccountMenu;