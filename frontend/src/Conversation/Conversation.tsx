import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndStoreConversation } from "../hooks";
import { addQuestionToConversation } from "./../helpers";
import {
  Conversation,
  Graph,
  UrlParams,
  Question,
  Questions,
  Answers,
  StartNode,
} from "../types";

import QuestionComponent from "./../Question/Question";
import Finish from "./../Finish/Finish";
import Pause from "./../Pause/Pause";
import Loading from "./../Loading/Loading";
import Notfound from "../Notfound/Notfound";

const nodeShape = {
  ROUND_RECTANGLE: "roundrectangle",
  DIAMOND: "diamond",
};

const isConversationFinished = (
  id: string,
  questions: Questions,
  end: string
): boolean => {
  if (id === end) {
    return true;
  }
  const question: Question = questions[id];

  return (
    question &&
    question.answers.length === 1 &&
    (id === end || question.answers[0].id === end)
  );
};

const isNextQuestion = (question: Question): boolean =>
  question.answers.length === 1 &&
  question.answers[0].shape === nodeShape.ROUND_RECTANGLE;

const ConversationComponent = () => {
  const { uuid, id } = useParams<UrlParams>();
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

  addQuestionToConversation(id, uuid);

  const graph: Graph = data.json;
  const answers: Answers = graph.answers;
  const questions: Questions = graph.questions;
  const startNode: StartNode = data.json.start;

  if (isConversationFinished(id, questions, graph.end)) {
    return (
      <Finish
        name={data.name}
        intro={startNode.label}
        questions={questions}
        answers={answers}
      />
    );
  }

  const question: Question = questions[id];

  if (isNextQuestion(question)) {
    const nextQuestion: Question = questions[question.answers[0].id];
    return (
      <Pause
        uuid={uuid}
        id={nextQuestion.id}
        current={question}
        next={nextQuestion}
      />
    );
  }
  return <QuestionComponent graph={graph} uuid={uuid} id={id} />;
};

export default ConversationComponent;
