import { useState } from 'react';
import TimerRecord from './timerRecord.jsx';

function Board() {
    const [isTestOngoing, setIsTestOngoing] = useState(false);
    const toggleTest = () => {
        setIsTestOngoing(!isTestOngoing);
    };
    const [isTestFinished, setIsTestFinished] = useState(false);
    const toggleFinish = () => {
        setIsTestFinished(!isTestFinished);
    };

    return (
        <>
            <div className="full-screen">
                <input type="text" className="full-width-text-box" placeholder="Test Title/Animal #" />
                <table className="full-screen-table">
                    <tbody>
                        <tr>
                            <td className="table-cell"> <TimerRecord title={"Pouncing"} isDisabled={isTestOngoing} /></td>
                            <td className="table-cell"><TimerRecord title={"Pinning"} isDisabled={isTestOngoing} /></td>
                        </tr>
                        <tr>
                            <td className="table-cell"><TimerRecord title={"Chasing"} isDisabled={isTestOngoing} /></td>
                            <td className="table-cell"><TimerRecord title={"Boxing"} isDisabled={isTestOngoing} /></td>
                        </tr>
                        <tr>
                            <td className="table-cell"><TimerRecord title={"AGI"} isDisabled={isTestOngoing} /></td>
                            <td className="table-cell"><TimerRecord title={"Novel Exploration"} isDisabled={isTestOngoing} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button disabled={isTestFinished} onClick={toggleTest}>
                {isTestOngoing ? "Stop Test" : "Start Test"}
            </button>
            <button disabled={isTestOngoing} onClick={toggleFinish}>
                {isTestFinished ? "Restart Test" : "Finish Test"}
            </button>
        </>
    );
}

export default Board;