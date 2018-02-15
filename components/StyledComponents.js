import styled from 'styled-components';
const ButtonStyle = `
  width: 200px;
  height: 60px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  border: 2px solid
`;
export const TransparentButton = styled.TouchableOpacity`
  ${ButtonStyle};
`;
export const BlackButton = styled.TouchableOpacity`
  ${ButtonStyle};
  background-color: black;
`;
export const RedButton = styled.TouchableOpacity`
  ${ButtonStyle} background-color: red;
`;
export const GreenButton = styled.TouchableOpacity`
  ${ButtonStyle} background-color: green;
`;
export const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
