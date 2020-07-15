import styled from "styled-components";

export const StyledFinish = styled.div`
  min-height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    padding: 5%;
  }

  img {
    max-width: 150px;
    padding: 5%;
  }

  .sample-enter {
    opacity: 0;
  }

  .sample-enter-active {
    opacity: 0.5;
    transition: opacity 2000ms;
  }
  .sample-enter-done {
    opacity: 1;
  }

  .sample-exit {
    opacity: 1;
  }
  .download {
    color: white;
  }

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  button,
  a {
    margin: 5px 10px;
  }
`;
