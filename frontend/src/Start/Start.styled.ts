import styled from "styled-components";

import { calculateResponsiveSize } from "./../helpers";

const StyledStart = styled.div`
  min-height: 100vh;
  max-width: 700px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  .actions,
  .avatars {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .actions {
    align-items: stretch;
  }
  .actions button {
    margin: 0 10px;
  }

  .avatars {
    margin: 20px 0;
  }

  .avatars img {
    max-width: ${calculateResponsiveSize(100, 230)};
    margin: 0 10px;
    cursor: pointer;

    border: 1px white;
    padding: 20px;
    border-style: hidden;
  }

  .avatars img.selected {
    border-style: solid none solid none;
  }

  .avatars img:hover {
    border-style: solid none solid none;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 5%;
    max-width: 900px;
  }

  img {
    width: ${calculateResponsiveSize(150, 300)};
  }
`;

export default StyledStart;
