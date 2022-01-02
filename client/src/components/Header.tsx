import styled from "styled-components";
const StyledHeader = styled.h1`
  text-align: center;
`;
const StyledP = styled.p`
  text-align: center;
`;
const Header = () => {
  return (
    <div>
      <StyledHeader>NFT Tic Tac Toe</StyledHeader>
      <StyledP>
        Every game there is a 100% unique genuine NFT up for grabs.. Winner
        takes all. If there is a tie the NFT is cut in half and donated.
      </StyledP>
    </div>
  );
};

export default Header;
