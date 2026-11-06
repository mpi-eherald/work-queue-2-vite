import { useEffect, useState } from 'react';
import { parseWorkQueueToCSV } from './utils/parseWorkQueueToCSV';

/* JB2 Work Queue output
----
priority
job number
customer
part number
step number
operation
qty to make
qty left
actual hrs
hrs left
work center
estim hrs
job late
docs
inspection
job req
1st shift employee
2nd shift employee
scheduled begin
scheduled end
department
status
pct comp
pct eff
due date
has subs
is sub
*/

function App() {
  const [selectedWC, setSelectedWC] = useState('no selection');

  const workCenters = [
    "PLAS PREP",
    "SHEET FAB",
    "SPEC OPS",
    "TUBE CUT",
    "WELDING"
  ]

  const handleSelectWorkCenter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWC(e.target.value)
  }

  const handleFetchAndParseQueue = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:8080/order-routings?query=${selectedWC}`)
    const orderRoutings = await response.json()
    const workQueue = orderRoutings.order_routings
    parseWorkQueueToCSV(workQueue, selectedWC)
  }

  useEffect(() => {
    console.log("state updated to:", selectedWC)
  }, [selectedWC])

  return (
    <div className="p-4">
      <h1 className="text-2xl uppercase mb-2">Work Queue</h1>
      <form>
        <p>Select department</p>
        
        {
          workCenters.map((workCenter) => (
            <label
              key={workCenter}
              className='
                text-gray-600 
                has-[:hover]:font-bold 
                has-[:hover]:cursor-pointer 
                has-checked:text-black 
                has-checked:font-bold 
                has-checked:text-shadow-lg 
                block 
                w-fit
              '
            >
              <input
                type='radio'
                name='dept-radio'
                value={workCenter}
                checked={selectedWC === workCenter}
                onChange={handleSelectWorkCenter}
                className='appearance-none' />
              {workCenter}
            </label>
          ))
        }

        <button
          type="submit"
          onClick={handleFetchAndParseQueue}
          className="border rounded-xl p-2 hover:cursor-pointer hover:bg-blue-50 mt-4"
        >
          Download
        </button>
      </form>
    </div>
  );
}

export default App;
