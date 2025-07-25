import { useState, useEffect } from 'react';
import './App.css';

const ProgressBar = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="outer">
      <div
        className="inner"
        style={{
          width: `${animatedProgress}%`,
          color: progress <= 5 ? 'black' : 'white',
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

function App() {
  const bars = [5, 20, 35, 70, 90, 100];

  return (
    <div className="App">
      <h2>Progress Bar</h2>
      {bars.map((value) => (
        <ProgressBar key={value} progress={value} />
      ))}
    </div>
  );
}

export default App;
