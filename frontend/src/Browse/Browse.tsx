import React from "react";
import { useHistory } from "react-router-dom";

import { StyledBrowse, StyledLinks } from "./Browse.styled";

import { useFetch } from "../hooks";
import Loading from "../Loading/Loading";
import Notfound from "../Notfound/Notfound";
import { Conversation } from "../types";

const Browse = () => {
  const history = useHistory();

  const [data, loading] = useFetch<Array<Conversation>>("/api/document");

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <Notfound />;
  }

  return (
    <StyledBrowse>
      <h1>Alle samtaler</h1>

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
