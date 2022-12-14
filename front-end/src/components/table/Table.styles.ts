import styled from "styled-components";

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableScrollWrapper = styled.div`
  overflow-x: auto;
`;

export const TableInnerWrapper = styled.div`
  display: inline-block;
  padding: 0.5rem 0;
  min-width: 100%;
`;

export const TableShadowWrapper = styled.div`
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  overflow: hidden;
  @media (min-width: 640px) {
    border-radius: 0.5rem;
  }
`;

export const StyledTable = styled.table`
  min-width: 100%;
  thead {
    background-color: rgb(249 250 251);
    @media (prefers-color-scheme: dark) {
      background-color: rgb(55 6581);
    }
    th {
      padding: 0.75rem 1.5rem;
      font-size: 0.75rem;
      font-weight: medium;
      letter-spacing: 0.05em;
      color: rgb(55 65 81);
      text-transform: uppercase;
      text-align: left;
      @media (prefers-color-scheme: dark) {
        background-color: rgb(156 163 175);
      }
    }
  }
  tbody {
    tr {
      background-color: white;
      border-bottom: 1px;
      @media (prefers-color-scheme: dark) {
        background-color: rgb(31 41 55);
        border-color: rgb(55 65 81);
      }
    }
    td {
      padding: 1rem 1.5rem;
      font-size: 0.75rem;
      font-weight: medium;
      letter-spacing: 0.05em;
      color: rgb(17 24 39);
      text-align: left;
      white-space: nowrap;
      @media (prefers-color-scheme: dark) {
        color: white;
      }
    }
  }
`;
