import styled from "styled-components";

export const ModalOverlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(p) => (p.open ? "grid" : "none")};
  place-items: center;
  z-index: 1;
`;

export const ModalBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  width: 90%;
  max-width: 500px;
  padding: 16px;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: #e9ecef 1px solid;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.h5`
  font-size: 20px;
  font-weight: 500;
  flex: 1 0 auto;
`;

export const ModalCLoseButton = styled.div`
  cursor: pointer;
`;
