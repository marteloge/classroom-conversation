import React from "react";
import { useHistory } from "react-router-dom";

import { PauseProps } from "./../types";

import { StyledPause, StyledAlternatives } from "./Pause.styled";

import teacher from "./../static/teacher.png";

import { motion } from "framer-motion";

const Pause = ({ uuid, id, next, current }: PauseProps) => {
  const history = useHistory();

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
        <img src={teacher} alt="teacher icon" />
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
