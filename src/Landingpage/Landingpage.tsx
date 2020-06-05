import React from "react";
import { useHistory } from "react-router-dom";

import StyledLandingpage from "./Landingpage.styled";

const Landingpage = () => {
  const history = useHistory();

  return (
    <StyledLandingpage>
      <div>
        <h1>Digitalt klasserom</h1>
        <p>En introduksjon til hva som skjer på siden</p>

        <p>Er du her for å øve? Ta en titt på alle tilgjengelige samtaler!</p>
        <br></br>
        <br></br>
        <a onClick={() => history.push("/browse")}>Alle samtaler</a>
      </div>
    </StyledLandingpage>
  );
};

export default Landingpage;
