import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useFetchAndStoreConversation } from "../hooks";
import {
  removeRecordedConversation,
  hasDialogRecorded,
  getLastQuestion,
  getSelectedAvatar,
} from "./../helpers";
import { StartNode, UrlParams, Conversation } from "./../types";

import Loading from "./../Loading/Loading";
import Notfound from "./../Notfound/Notfound";

import StyledStart from "./Start.styled";

import teacherWoman from "./../static/teacher_woman.png";
import teacherMan from "./../static/teacher_man.png";

const selectAvatar = (id: number, setAvatar: Function) => {
  window.localStorage.setItem("avatar", "" + id);
  setAvatar(id);
};

const Start = () => {
  const history = useHistory();
  const { uuid } = useParams<UrlParams>();
  const [selectedAvatar, setAvatar] = useState<number>(getSelectedAvatar());

  const [data, loading] = useFetchAndStoreConversation<Conversation>(
    `/api/document/${uuid}`,
    uuid
  );

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <Notfound />;
  }

  const startNode: StartNode = data.json.start;
  const hasDialog: boolean = hasDialogRecorded(uuid);

  return (
    <StyledStart>
      <div>
        <h1>{data.name}</h1>
        <p>{startNode.label}</p>

        <div className="avatars">
          <img
            className={selectedAvatar === 1 ? "selected" : ""}
            src={teacherWoman}
            onClick={() => selectAvatar(1, setAvatar)}
            alt="Female teacher avatar "
          />
          <img
            className={selectedAvatar === 2 ? "selected" : ""}
            src={teacherMan}
            onClick={() => selectAvatar(2, setAvatar)}
            alt="Male teacher avatar "
          />
        </div>

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
