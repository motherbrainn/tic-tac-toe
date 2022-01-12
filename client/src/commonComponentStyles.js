import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledButton = styled(motion.button)`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border: 2px solid black;
  padding: 15px 32px;
  font-size: 20px;
  border-radius: 8px;
  color: black;
  cursor: pointer;
  font-family: "Source Code Pro", monospace;
`;
