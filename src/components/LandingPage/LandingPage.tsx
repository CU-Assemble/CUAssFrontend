import React from "react";
import { useAppSelector } from "../../app/hooks";
import "./style.min.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { selectIsLoggedIn } from "../../features/user/userSlice";

function LandingPage() {
  const { t, i18n } = useTranslation("translation");
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <div
      className="jumbotron jumbotron-single d-flex align-items-center"
      id="landingPage"
      // style="background-image: url(img/bg.jpg)"
    >
      <div className="container text-center">
        <h1 className="display-2 mb-4">CU Assemble</h1>
        <div>
          <p className="mb-2">{t("looking for a friend")}</p>
          {isLoggedIn ? (
            <Button
              variant="outline-light"
              className="mt-2"
              as={Link as any}
              to="./dashboard"
            >
              {t("find an activity")}
            </Button>
          ) : (
            <Button
              variant="outline-light"
              className="mt-2"
              as={Link as any}
              to="./createprofile"
            >
              {t("join now")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
