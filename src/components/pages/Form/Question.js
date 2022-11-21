import React from "react";
import { motion } from "framer-motion";

import { Inputs } from "./Inputs";
import { Action } from "./Action";
import { Dropdown } from "./Dropdown";
import { GlobalState } from "../../../config/contextAPI";

export const QuestionContext = React.createContext();

export default function Question({ id }) {
  const { state } = React.useContext(GlobalState);
  return (
    <QuestionContext.Provider value={id}>
      <motion.div
        initial={{ y: 150 }}
        animate={{ y: 0 }}
        exit={{
          y: 150,
          transition: { ease: "easeIn", type: "tween", duration: 0.2 },
        }}
        className={`
          ${state.isDropdown && "z-10"}
          ${
            state.isDark
              ? "light-shadow bg-gray-100 text-gray-700"
              : "shadow bg-white"
          }
           px-8 border-t rounded-lg relative 
        `}
      >
        <Inputs />
        <Action />
        <Dropdown />
      </motion.div>
    </QuestionContext.Provider>
  );
}
