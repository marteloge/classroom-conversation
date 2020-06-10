import React from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

import { PauseProps } from "./../types";
import { getSelectedAvatar } from "./../helpers";

import teacherWoman from "./../static/teacher_woman.png";
import teacherMan from "./../static/teacher_man.png";

import { StyledPause, StyledAlternatives } from "./Pause.styled";

const Pause = ({ uuid, id, next, current }: PauseProps) => {
  const history = useHistory();
  const avatar = getSelectedAvatar();

  return (
    <StyledPause>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={"student_" + id}
        className="student"
      >
        {current.label}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 1 }}
        key="student"
        className="student"
      >
        La oss fortsette til neste spørsmål!
      </motion.h2>

      <StyledAlternatives>
        {avatar === 1 && <img src={teacherWoman} alt="Female avatar" />}
        {avatar === 2 && <img src={teacherMan} alt="Male avatar" />}

        <div className="alternatives">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2 }}
            key="alternatives"
            onClick={() =>
              history.push("/conversation/" + uuid + "/question/" + id)
            }
          >
            {next.label}
          </motion.button>
        </div>
      </StyledAlternatives>
    </StyledPause>
  );
};

export default Pause;
