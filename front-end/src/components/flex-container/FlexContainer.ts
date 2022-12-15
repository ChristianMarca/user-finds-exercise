import styled from "styled-components";

interface FlexContainerProps {
  direction?: "column" | "row";
  justify?: "space-between" | "space-around" | "flex-end" | "flex-start";
  align?: "space-between" | "space-around" | "flex-end" | "flex-start";
  fullWidth?: true;
  fullHeight?: true;
}

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  justify-content: ${(p) => (p.justify ? p.justify : "flex-start")};
  align-items: ${(p) => (p.align ? p.align : "flex-start")};
  flex-direction: ${(p) => (p.direction ? p.direction : "row")};
  width: ${(p) => (p.fullWidth ? "100%" : "unset")};
  height: ${(p) => (p.fullHeight ? "100%" : "unset")};
`;
