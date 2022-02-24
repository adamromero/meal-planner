import styled from "styled-components";

const Button = styled.button`
   max-width: 143px;
   width: 100%;
   height: 35px;
   border: 0;
   cursor: pointer;
`;

const PrimaryButton = styled(Button)`
   background: #1c5b78;
   color: #fff;
`;

export const SecondaryButton = styled(Button)`
   background: #fff;
   border: 1px solid #000;
`;

export const TertiaryButton = styled(Button)`
   background: #4a4b53;
   color: #fff;
`;

export default PrimaryButton;
