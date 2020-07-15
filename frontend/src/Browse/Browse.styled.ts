import styled from "styled-components";

export const StyledBrowse = styled.div`
  width: 100%;
  position: fixed;

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  max-width: 600px;
  margin: 0 auto;
  text-align: left;

  padding: 10% 5%;

  h2 {
    cursor: pointer;
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
