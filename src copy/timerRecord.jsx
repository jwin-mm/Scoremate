import { useState, useEffect } from 'react';

function TimerRecord({ title, isDisabled }) {
  const [time, setTime] = useState({ secs: 0, centisecs: 0 });
  const [isCounting, setIsCounting] = useState(0);

  useEffect(() => {
    let interval;

    if (isCounting === 1) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newCentisecs = prevTime.centisecs + 1;
          if (newCentisecs >= 100) {
            return { secs: prevTime.secs + 1, centisecs: 0 };
          }
          return { ...prevTime, centisecs: newCentisecs };
        });
      }, 10); // Update every 10 milliseconds (1 centisecond)
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCounting]); // Re-run effect when `isCounting` changes

  return (
    <>
      <div>
        <table>
          <tr>
            <td>
              {time.secs}.{time.centisecs.toString().padStart(2, '0')}
            </td>
          </tr>
          <tr>
            <td>
              <button disabled={isDisabled} onClick={() => setIsCounting(1-isCounting)}>{title}</button>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default TimerRecord;