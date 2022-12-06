import React from 'react';
import './App.css';
import { MainPage } from './components/MainPage.page';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: left;
  padding: 30px;
  box-sizing: border-box;
  overflow: hidden;
`;

function App() {
  return (
    <Wrapper>
      <MainPage />
    </Wrapper>
  );
}

export default App;
