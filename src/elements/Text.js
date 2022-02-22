import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children, margin, border, minHeight } = props;

  const styles = {bold: bold, color: color, size: size, margin, border, minHeight};
  return (
      <P {...styles}>
          {children}
      </P>
  )
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: "10px",
  border: "0",
  minHeight: "0",
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold? "600" : "400")};
  ${(props) => (props.margin? `margin: ${props.margin};` : '')};
  border : ${(props) => props.border}px solid black;
  height : 100%;
  min-height: ${(props) => props.minHeight}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Text;
