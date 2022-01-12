import Box from "./Box";
import styled from "styled-components";
import { motion } from "framer-motion";

interface BoardRowType {
  rowId: number;
}

const StyledBoardRow = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

const BoardRow = ({ rowId }: BoardRowType) => {
  return (
    <StyledBoardRow>
      <Box rowId={rowId} columnId={0} />
      <Box rowId={rowId} columnId={1} />
      <Box rowId={rowId} columnId={2} />
    </StyledBoardRow>
  );
};

export default BoardRow;
