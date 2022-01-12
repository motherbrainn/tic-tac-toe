import styled from "styled-components";
const StyledHeader = styled.h1`
  text-align: center;
`;
const StyledP = styled.p`
  text-align: center;
  max-width: 450px;
  margin: 20px auto;
`;
const Header = () => {
  return (
    <div>
      <StyledHeader>Tic Tac Toe</StyledHeader>
      <StyledP>Play against live opponents from anywhere in the world</StyledP>
    </div>
  );
};

export default Header;
