import { useCounter } from "../hooks/useCounter";

export const MyCounterApp = () => {
  const {counter, handleAdd, handleSubtract, handleReset} = useCounter();
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'20px'}}>
        <h1>counter: {counter}</h1>
        <div style={{display:'flex', gap:'20px'}}>
            <button onClick={handleAdd}>+1</button>
            <button onClick={handleSubtract}>-1</button>
            <button onClick={handleReset}>Reset</button>
        </div> 
    </div>
  )
}
