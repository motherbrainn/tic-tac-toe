import Box from "./Box";
import styled from "styled-components";

const StyledBoardRow = styled.div`
  display: flex;
  justify-content: center;
`;

const BoardRow = ({ rowId }) => {
  return (
    <StyledBoardRow>
      <Box rowId={rowId} columnId={0} />
      <Box rowId={rowId} columnId={1} />
      <Box rowId={rowId} columnId={2} />
    </StyledBoardRow>
  );
};

export default BoardRow;
