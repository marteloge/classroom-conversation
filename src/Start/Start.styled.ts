import styled from "styled-components";

import { calculateResponsiveSize } from "./../helpers";

const StyledStart = styled.div`
  min-height: 100vh;
  max-width: 700px;

  margin: 0 auto;
  padding: 0 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  .actions {
    display: flex;
    flex-direction: row;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    padding: 5%;
    max-width: 900px;

    * {
      margin: 15px 0;
    }
  }

  img {
    width: ${calculateResponsiveSize(150, 300)};
  }

  button {
    margin: 0 10px;
  }
`;

export default StyledStart;
