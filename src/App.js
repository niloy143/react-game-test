import { useState } from "react";

function App() {

  const [start, setStart] = useState(false);
  const [completed, setCompleted] = useState(false);

  const startGame = e => {
    e.preventDefault();
    setStart(true);
    setCompleted(false);
    e.target.reset();

    setInterval(() => {
      setCompleted(true);
      setStart(false);
    }, 1000);
  }

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center font-mono">
      <div className="flex flex-col items-center">

        {/* =========== Part 1 ============ */}
        <form onSubmit={startGame} className="w-full">
          <div className="form-control w-full">
            <div className="input-group w-full">
              <input type="text" placeholder="Enter your name" className="input input-bordered w-full" required />
              <button className="btn" disabled={start}>Start</button>
            </div>
          </div>
        </form>

        {/* =========== Part 2 ============ */}
        <div className="flex flex-col gap-5 pt-5">
          <div className="h-[300px] flex justify-center items-center border border-gray-500/50 rounded-xl p-8">
            {
              !start && !completed ?
                <p>Enter your name to start the game</p>
                : !completed ?
                  <div className="flex flex-col items-center">
                    <h5>Remaining time for this step: 00:000 ms</h5>
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
            <li className="step">step 1</li>
            <li className="step">step 2</li>
            <li className="step">step 3</li>
            <li className="step">step 4</li>
            <li className="step">step 5</li>
            <li className="step">step 6</li>
            <li className="step">step 7</li>
            <li className="step">step 8</li>
            <li className="step">step 9</li>
            <li className="step">step 10</li>
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
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
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
