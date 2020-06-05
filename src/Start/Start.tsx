import React from "react";
import { useParams, useHistory } from "react-router-dom";

import { useFetchAndStoreConversation } from "../hooks";
import {
  removeRecordedConversation,
  hasDialogRecorded,
  getLastQuestion,
} from "./../helpers";
import { StartNode, UrlParams, Conversation } from "./../types";

import Loading from "./../Loading/Loading";
import alarm from "./../static/alarm.png";

import StyledStart from "./Start.styled";

const Start = () => {
  const history = useHistory();
  const { uuid } = useParams<UrlParams>();

  const [data, loading] = useFetchAndStoreConversation<Conversation>(
    `/api/document/${uuid}`,
    uuid
  );

  if (loading || !data) {
    return <Loading />;
  }

  const startNode: StartNode = data.json.start;
  const hasDialog: boolean = hasDialogRecorded(uuid);

  return (
    <StyledStart>
      <div>
        <h1>{data.name}</h1>
        <p>{startNode.label}</p>
        <img src={alarm} alt="alarm icon" />
        <div className="actions">
          <button
            onClick={() => {
              removeRecordedConversation();
              history.push(
                "/conversation/" + uuid + "/question/" + startNode.firstQuestion
              );
            }}
          >
            {hasDialog ? "Start samtalen på ny" : "Start matteundervisningen"}
          </button>
          {hasDialog && (
            <button
              onClick={() =>
                history.push(
                  "/conversation/" + uuid + "/question/" + getLastQuestion(uuid)
                )
              }
            >
              Fortsett der du slapp
            </button>
          )}
        </div>
      </div>
    </StyledStart>
  );
};

export default Start;
