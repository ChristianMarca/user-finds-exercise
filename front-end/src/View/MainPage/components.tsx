import styled from "styled-components";

export const StyledContentUser = styled.div.attrs({
  className: "flex justify-between"
})``

export const StyledButtonAdd = styled.button.attrs({
  className: "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
})``

export const StyledContainerFloatCard = styled.div`
position: fixed;
bottom: 40px;
right: 40px;
height: 177px;
width: 190px;
overflow: scroll;
background: #e2e2e2;
border-radius: 10px;
`