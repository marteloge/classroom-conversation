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
        <button onClick={() => history.push("/browse")}>Alle samtaler</button>
      </div>
      <p className="credits" onClick={() => history.push("/credits")}>
        (Krediteringer)
      </p>
    </StyledLandingpage>
  );
};

export default Landingpage;
