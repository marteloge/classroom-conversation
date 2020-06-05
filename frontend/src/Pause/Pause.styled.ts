import styled from "styled-components";

import { calculateResponsiveSize } from "./../helpers";

export const StyledPause = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5%;

  h1 {
    text-align: center;
  }
`;

export const StyledAlternatives = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 0;

  img {
    width: ${calculateResponsiveSize(150, 400)};
  }

  .alternatives {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0;
    padding: 10px;
    min-height: 150px;

    @media screen and (max-width: 600px) {
      flex-direction: column;
      justify-content: space-around;
    }
  }

  button {
    margin: 0 10px;
  }
`;
