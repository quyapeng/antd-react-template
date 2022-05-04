import React from 'react';
import { Card } from 'antd';

function Home() {
  return (
    <Card className="oneLevelCard" bordered={false}>
      Home
    </Card>
  );
}
Home.title = '首页';
export default Home;
