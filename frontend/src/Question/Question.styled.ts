import styled from "styled-components";

import { calculateResponsiveSize } from "./../helpers";

export const StyledQuestion = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledAnswer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 5%;

  h2 {
    width: 50%;
    padding: 2%;
    font-family: "Gloria Hallelujah", cursive;
  }

  .teacher {
    text-align: left;
  }

  .student {
    text-align: right;
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

export const StyledIcons = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-around;

  .teacher {
    width: ${calculateResponsiveSize(150, 400)};
  }
  .student {
    width: ${calculateResponsiveSize(110, 320)};
  }
`;
