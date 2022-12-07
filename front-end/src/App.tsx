import React from 'react';
import { withAppState } from './context';
import MainPage from './View/MainPage';

function Root() {
  return (
    <div className="App pt-4 pl-4 pr-4">
      <MainPage />
    </div>
  );
}

const App = withAppState(Root)

export default App;
