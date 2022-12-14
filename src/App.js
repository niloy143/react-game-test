import { useEffect, useReducer, useState } from "react";

const genNum = () => parseInt(Math.random() * 100);

function App() {

  const reducer = (state, action) => {
    switch (action.type) {
      default: return { ...state };
      case 'ANSWER': return { ...state, [action.step]: { ...(state[action.step]), answer: action.answer } };
      case 'RIGHTANSWER': return { ...state, [action.step]: { ...(state[action.step]), rightAnswer: action.rightAnswer } };
      case 'RESET': return {};
    }
  }

  const [start, setStart] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [step, setStep] = useState(0);
  const [remaining, setRemaining] = useState(5000);
  const [showRemaining, setShowRemaining] = useState(remaining);
  const [startShowRemaining, setStartShowRemaining] = useState(false);
  const [math, setMath] = useState(null);
  const [state, dispatch] = useReducer(reducer, {});
  const [calculateResult, setCalculateResult] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (Object.keys(state).length) {

      for (const step in state) {
        if (state[step].answer) {
          if (state[step].answer === state[step].rightAnswer) {
            switch (step) {
              default: ; break;
              case 'step-1':
                state[step] = { ...state[step], point: 10 };
                break;
              case 'step-2':
                state[step] = { ...state[step], point: 10 };
                break;
              case 'step-3':
                state[step] = { ...state[step], point: 20 };
                break;
              case 'step-4':
                state[step] = { ...state[step], point: 20 };
                break;
              case 'step-5':
                state[step] = { ...state[step], point: 30 };
                break;
              case 'step-6':
                state[step] = { ...state[step], point: 30 };
                break;
              case 'step-7':
                state[step] = { ...state[step], point: 40 };
                break;
              case 'step-8':
                state[step] = { ...state[step], point: 40 };
                break;
              case 'step-9':
                state[step] = { ...state[step], point: 50 };
                break;
              case 'step-10':
                state[step] = { ...state[step], point: 50 };
                break;
            }
          }
          else {
            state[step] = { ...state[step], point: -5 };
          }
        }
        else {
          state[step] = { ...state[step], point: 0 };
        }
      }

      const information = {
        player,
        score: Object.keys(state).map(step => state[step].point).reduce((a, b) => a + b, 0),
        stats: state
      }
      console.log(information);
      setCalculateResult(false);
      setPlayer(null);
      dispatch({ type: 'RESET' });
    }
  }, [calculateResult])

  const startGame = e => {
    e.preventDefault();
    setStart(true);
    setCompleted(false);
    setStartShowRemaining(true);
    setMath(`${genNum()} + ${genNum()}`);
    setPlayer(e.target.player.value);
    setStep(step + 1);
    e.target.reset();
  }

  useEffect(() => {
    if (step === 0 || step === 1) {
      setRemaining(5000);
    }
    else if (step === 2 || step === 3) {
      setRemaining(4000);
    }
    else if (step === 4 || step === 5) {
      setRemaining(3000);
    }
    else if (step === 6 || step === 7) {
      setRemaining(2000);
    }
    else if (step === 8 || step === 9) {
      setRemaining(1000);
    }

    if (startShowRemaining) {
      let count = remaining;
      const startShow = setInterval(() => {
        count -= 100;
        setShowRemaining(count)
      }, 100);
      setTimeout(() => {
        clearInterval(startShow);
        if (step < 10) {

          const nums = math.split(' + ');
          const sum = Number(nums[0]) + Number(nums[1]);
          dispatch({ type: 'RIGHTANSWER', step: `step-${step}`, rightAnswer: sum });

          setMath(`${genNum()} + ${genNum()}`);
          setStep(step + 1);
        }
        else if (step === 10) {
          const nums = math.split(' + ');
          const sum = Number(nums[0]) + Number(nums[1]);
          dispatch({ type: 'RIGHTANSWER', step: `step-${step}`, rightAnswer: sum });
          setCalculateResult(true);
          setStart(false);
          setRemaining(5000);
          setStartShowRemaining(false);
          setStep(0);
          setCompleted(true);
        }
      }, remaining);
    }
  }, [step, startShowRemaining, math])

  return (
    <div className="w-screen h-screen overflow-x-hidden font-mono relative">
      <div className="absolute top-0 bottom-0 left-0 right-0 m-auto flex flex-col items-center max-w-xl my-12">

        {/* =========== Part 1 ============ */}
        <form onSubmit={startGame} className="w-full">
          <div className="form-control w-full">
            <div className="input-group w-full">
              <input type="text" placeholder="Enter player name" name="player" className="input input-bordered w-full" required />
              <button className="btn" disabled={start}>Start</button>
            </div>
          </div>
        </form>

        {/* =========== Part 2 ============ */}
        <div className="flex flex-col gap-5 pt-5">
          <div className="h-[300px] flex justify-center items-center border border-gray-500/50 rounded-xl p-8">
            {
              !start && !completed ?
                <p>Enter player name to start the game</p>
                : !completed ?
                  <div className="flex flex-col items-center">
                    <h5>Remaining time for this step: {(showRemaining / 1000).toFixed(2)}</h5>
                    <h5 className="text-[100px] font-bold">{math}</h5>
                    <form onSubmit={e => {
                      e.preventDefault();
                      dispatch({ type: 'ANSWER', step: `step-${step}`, answer: Number(e.target.answer.value) });
                      e.target.reset();
                    }}>
                      <div className="form-control">
                        <div className="input-group">
                          <input type="number" placeholder="Your answer" name="answer" className="input input-bordered" required />
                          <button className="btn">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div> :
                  <div className="text-center">
                    <h5>Your Score</h5>
                    <h3 className="text-7xl"> 0</h3>
                  </div>
            }
          </div>
          <ul className="steps">
            <li className={`step ${step >= 1 && 'step-primary'}`}>step 1</li>
            <li className={`step ${step >= 2 && 'step-primary'}`}>step 2</li>
            <li className={`step ${step >= 3 && 'step-primary'}`}>step 3</li>
            <li className={`step ${step >= 4 && 'step-primary'}`}>step 4</li>
            <li className={`step ${step >= 5 && 'step-primary'}`}>step 5</li>
            <li className={`step ${step >= 6 && 'step-primary'}`}>step 6</li>
            <li className={`step ${step >= 7 && 'step-primary'}`}>step 7</li>
            <li className={`step ${step >= 8 && 'step-primary'}`}>step 8</li>
            <li className={`step ${step >= 9 && 'step-primary'}`}>step 9</li>
            <li className={`step ${step >= 10 && 'step-primary'}`}>step 10</li>
          </ul>
        </div>

        {/* =========== Part 3 ============ */}
        <div className="w-full py-6">
          <h3 className="text-3xl text-center mb-3">Game Stats</h3>
          <div className="overflow-x-auto w-full border rounded-xl border-gray-500/50">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Player</th>
                  <th>Score</th>
                  <th>Completion Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                <tr className="active">
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div >
  );
}

export default App;
