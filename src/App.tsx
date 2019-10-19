import React from 'react';
import { Typography } from 'antd';
import WeeklyPaperTemplate from './containers/WeeklyPaperTemplate';

const { Title } = Typography;

const App: React.FC = () => {
  return (
    <div className="App">
      <Title style={{ textAlign: 'center' }}>Weekly Paper</Title>
      <WeeklyPaperTemplate></WeeklyPaperTemplate>
    </div>
  );
};

export default App;
