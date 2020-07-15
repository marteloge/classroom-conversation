import styled from "styled-components";

const StyledLandingPage = styled.div`
  width: 100%;
  min-height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .credits {
    position: fixed;
    bottom: 5%;
    display: flex;
    align-self: center;
    color: darkgray;
    cursor: pointer;
  }
`;

export default StyledLandingPage;
