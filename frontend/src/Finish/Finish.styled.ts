import styled from "styled-components";

export const StyledFinish = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    max-width: 150px;
    padding: 20px;
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

  button,
  a {
    margin: 20px 10px;
  }
`;
