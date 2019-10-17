import React from 'react';
import { Typography } from 'antd';
import WeeklyPaperTemplate from './containers/WeeklyPaperTemplate';

import './App.css';
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <div className="App">
      <Title>Weekly Paper</Title>
      <WeeklyPaperTemplate></WeeklyPaperTemplate>
    </div>
  );
};

export default App;
