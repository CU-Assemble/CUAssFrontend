import React from "react";
import "./style.min.css"
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div
      className="jumbotron jumbotron-single d-flex align-items-center"
      id="landingPage"
      // style="background-image: url(img/bg.jpg)"
    >
      <div className="container text-center">
        <h1 className="display-2 mb-4">CU Assemble</h1>
        <div>
          <p className="mb-2">
            Looking for a friend? We are here to help.
          </p>
          <Button variant="outline-light" className="mt-2" as={Link as any} to="./createprofile">
            Join Now!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
