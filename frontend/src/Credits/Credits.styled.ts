import styled from "styled-components";

export const StyledCreditPage = styled.div`
  min-height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledCredits = styled.div`
  max-width: 800px;
  padding: 5%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledCredit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    max-width: 80px;
    margin: 10px 0;
  }

  a {
    border: none;
    padding: 0;
    text-decoration: underline;
  }

  margin: 10px;
`;
