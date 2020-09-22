import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
const ShopButton = () => {
    return (
        <Link to="/login">
            <Button color="primary" className="mr-1" variant="outline-primary">
                Shop Products
            </Button>
        </Link>
    );
};

export default ShopButton;
