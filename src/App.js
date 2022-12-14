import { useEffect, useState } from "react";

function App() {

  const [start, setStart] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [step, setStep] = useState(0);
  const [remaining, setRemaining] = useState(5000);
  const [showRemaining, setShowRemaining] = useState(remaining);
  const [startShowRemaining, setStartShowRemaining] = useState(false);

  const startGame = e => {
    e.preventDefault();
    setStart(true);
    setCompleted(false);
    setStartShowRemaining(true);
    e.target.reset();

    setStep(step + 1);
  }

  useEffect(() => {
    if (step === 1 || step === 2) {
      setRemaining(5000);
    }
    else if (step === 3 || step === 4) {
      setRemaining(4000);
    }
    else if (step === 5 || step === 6) {
      setRemaining(3000);
    }
    else if (step === 7 || step === 8) {
      setRemaining(2000);
    }
    else if (step === 9 || step === 10) {
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
          setStep(step + 1);
        }
        else if (step === 10) {
          setStart(false);
          setRemaining(5000);
          setStartShowRemaining(false);
          setStep(0);
          setCompleted(true);
        }
      }, remaining);
    }
  }, [remaining, step, startShowRemaining])

  return (
    <div className="w-screen h-screen overflow-x-hidden font-mono relative">
      <div className="absolute top-0 bottom-0 left-0 right-0 m-auto flex flex-col items-center max-w-xl my-12">

        {/* =========== Part 1 ============ */}
        <form onSubmit={startGame} className="w-full">
          <div className="form-control w-full">
            <div className="input-group w-full">
              <input type="text" placeholder="Enter player name" className="input input-bordered w-full" required />
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
                    <h5 className="text-[100px] font-bold">0 + 0</h5>
                    <form onSubmit={startGame}>
                      <div className="form-control">
                        <div className="input-group">
                          <input type="text" placeholder="Your answer" className="input input-bordered" required />
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
    </div>
  );
}

export default App;
