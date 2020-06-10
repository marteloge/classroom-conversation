import React from "react";
import { useHistory } from "react-router-dom";

import { StyledNotfound } from "./Notfound.styled";

const Notfound = () => {
  const history = useHistory();

  return (
    <StyledNotfound>
      <h1>Denne samtalen finnes ikke.</h1>
      <p>Er du sikker på at du har riktig link?</p>

      <button onClick={() => history.push("/browse")}>Se alle samtaler</button>
    </StyledNotfound>
  );
};

export default Notfound;
