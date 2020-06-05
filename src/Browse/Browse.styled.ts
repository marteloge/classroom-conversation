import styled from "styled-components";

import { calculateResponsiveSize } from "./../helpers";

export const StyledBrowse = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 6%;

  max-width: 600px;
  margin: 0 auto;

  text-align: left;

  h2 {
    cursor: pointer;
  }
  img {
    max-width: ${calculateResponsiveSize(150, 250)};
    position: absolute;
    right: 5%;
    top: 5%;

    @media screen and (max-width: 650px) {
      display: none;
    }
  }

  p,
  h1,
  h2 {
    position: relative;
  }
`;

export const StyledLinks = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: red;
  }
  div {
    padding: 15px 0;
  }
`;
