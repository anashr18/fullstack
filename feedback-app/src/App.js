import React from "react";
import Header from './components/Header'
import FeedbackItem from './components/FeedbackItem'
function App() {
  
  return (
    <>
    <Header bgColor='yellow' color='red'></Header>
    <div className="container">
      {/* <h1>My App</h1> */}
      <h1> <FeedbackItem /> </h1>
    </div>
    </>
  )
}
export default App;


