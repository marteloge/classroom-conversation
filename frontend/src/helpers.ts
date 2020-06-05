import { Questions } from "./types";

export const next = () => {};

export const isFinishNode = (id: string, endNode: string) => id === endNode;

export const calculateResponsiveSize = (min: number, max: number) =>
  `calc(${min}px + (${max} - ${min}) * ((100vw - 300px) / (1600 - 300)))`;

const nonUniformRandomAnswer = (
  answers: Array<{
    id: string;
    probability?: number;
  }>
): string => {
  const random = Math.random();
  let aggregated_probability = 0;

  const aggrgatedProb = answers.map((answer) => {
    aggregated_probability += answer.probability || 0;
    return { id: answer.id, propability: aggregated_probability };
  });

  return (
    aggrgatedProb.find((answer) => answer.propability >= random)?.id ||
    answers[0].id
  );
};

export const uniformRandomAnswer = (
  answers: Array<{
    id: string;
  }>
) => {
  return answers[Math.floor(Math.random() * answers.length)].id;
};

export const selectRandomAnswers = (questions: Questions, uniform: boolean) => {
  for (let id in questions) {
    if (uniform) {
      questions[id].selectedAnswer = uniformRandomAnswer(questions[id].answers);
    } else {
      questions[id].selectedAnswer = nonUniformRandomAnswer(
        questions[id].answers
      );
    }
  }
  return questions;
};

export const addQuestionToConversation = (id: string, uuid: string): void => {
  const conversation: string[] = getRecordedConversation(uuid);

  if (conversation.indexOf(id) >= 0) {
    window.localStorage.setItem(
      `conversation_${uuid}`,
      JSON.stringify(conversation.slice(0, conversation.indexOf(id) + 1))
    );
  } else {
    conversation.push(id);
    window.localStorage.setItem(
      `conversation_${uuid}`,
      JSON.stringify(conversation)
    );
  }
};

export const getRecordedConversation = (uuid: string): string[] => {
  const localValue = window.localStorage.getItem(`conversation_${uuid}`);
  return localValue ? JSON.parse(localValue) : [];
};

export const removeRecordedConversation = () => {
  window.localStorage.removeItem("conversation");
};

export const removeConversation = (uuid: string) => {
  window.localStorage.removeItem(uuid);
};

export const hasDialogRecorded = (uuid: string) => {
  const dialog: string[] = getRecordedConversation(uuid);
  return dialog.length >= 2;
};

export const getLastQuestion = (uuid: string) => {
  const dialog: string[] = getRecordedConversation(uuid);
  return dialog[dialog.length - 1];
};
