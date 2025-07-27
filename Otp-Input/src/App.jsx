import { useState, useRef, useEffect } from 'react';
import './App.css';

const OTP_INPUT_SIZE = 5;

function App() {
  const [otp, setOtp] = useState(new Array(OTP_INPUT_SIZE).fill(''));
  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;

    const newVal = value.trim();
    const newArr = [...otp];
    newArr[index] = newVal.slice(-1);
    setOtp(newArr);

    // Auto-focus to next
    if (newVal !== '') {
      refArr.current[index + 1]?.focus();
    }
  };

  const handleOnKeyDown = (e, index) => {
    if (!e.target.value && e.key === 'Backspace') {
      refArr.current[index - 1]?.focus(); // Move to previous
    }
  };

  return (
    <>
      <div>OTP INPUT</div>
      <h2>Enter your OTP</h2>
      {otp.map((value, index) => (
        <input
          className="otp-input"
          key={index}
          maxLength="1"
          type="text"
          value={value}
          ref={(input) => (refArr.current[index] = input)}
          onChange={(e) => handleOnChange(e.target.value, index)}
          onKeyDown={(e) => handleOnKeyDown(e, index)}
        />
      ))}
      <button className="button">Verify Button</button>
    </>
  );
}

export default App;
