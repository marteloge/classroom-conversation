import React from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

import { Graph, Answer, Answers, Questions } from "../types";
import { getSelectedAvatar, getSelectedStudent } from "../helpers";

import teacherWoman from "./../static/teacher_woman.png";
import teacherMan from "./../static/teacher_man.png";
import studentGirl from "./../static/student_girl.png";
import studentBoy from "./../static/student_boy.png";

import {
  StyledQuestion,
  StyledAlternatives,
  StyledAnswer,
  StyledIcons,
} from "./Question.styled";

type Props = {
  graph: Graph;
  uuid: string;
  id: string;
};

const QuestionComponent = ({ graph, uuid, id }: Props) => {
  const history = useHistory();
  const questions: Questions = graph.questions;
  const answers: Answers = graph.answers;
  const question = questions[id];
  const randomAnswer: Answer = answers[question.selectedAnswer];
  const alternatives: Array<string> = randomAnswer.alternatives;

  const student = getSelectedStudent(uuid);
  const avatar = getSelectedAvatar();

  return (
    <StyledQuestion>
      <StyledAnswer>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={"teacher" + id}
          className="teacher"
        >
          {question.label}
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1 }}
          key={"student_" + id}
          className="student"
        >
          {answers[randomAnswer.id].label || ""}
        </motion.h2>
      </StyledAnswer>

      <StyledAlternatives>
        <StyledIcons>
          {avatar === 1 && (
            <img className="teacher" src={teacherWoman} alt="Female avatar" />
          )}
          {avatar === 2 && (
            <img className="teacher" src={teacherMan} alt="Male avatar" />
          )}
          {student === 1 && (
            <img className="student" alt="student avatar" src={studentGirl} />
          )}
          {student === 2 && (
            <img className="student" alt="student avatar" src={studentBoy} />
          )}
        </StyledIcons>

        <div className="alternatives">
          {alternatives.length > 0 && (
            <>
              {alternatives.map((id: string, key: number) => (
                <motion.button
                  className="dark"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 2 + 0.5 * key }}
                  key={"alternative_" + key}
                  onClick={() =>
                    history.push("/conversation/" + uuid + "/question/" + id)
                  }
                >
                  <p>{questions[id].label}</p>
                </motion.button>
              ))}
            </>
          )}
        </div>
      </StyledAlternatives>
    </StyledQuestion>
  );
};

export default QuestionComponent;
