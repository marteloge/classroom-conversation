import React from "react";
import { useHistory } from "react-router-dom";

import { StyledBrowse, StyledLinks } from "./Browse.styled";

import { useFetch } from "../hooks";
import Loading from "../Loading/Loading";
import { Conversation } from "../types";

import Globe from "./../static/globe.png";

const Browse = () => {
  const history = useHistory();

  const [data, loading] = useFetch<Array<Conversation>>("/api/document");

  if (!data || loading) {
    return <Loading />;
  }

  return (
    <StyledBrowse>
      <h1>Alle samtaler</h1>

      <img src={Globe} />

      <StyledLinks>
        {data.map((conversation: Conversation) => (
          <div>
            <h2
              onClick={() =>
                history.push(`/conversation/${conversation.uuid}/start`)
              }
            >
              {conversation.name}
            </h2>
            <p>{conversation.description}</p>
          </div>
        ))}
      </StyledLinks>
    </StyledBrowse>
  );
};

export default Browse;
