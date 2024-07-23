import React, { useState } from "react";
import Header from './components/Header'
// import FeedbackItem from './components/FeedbackItem'
import FeedbackList from "./components/FeedbackList";
// @ts-ignore
import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
function App() {
  const [feedback, setFeedback] = useState(FeedbackData) 
  const deleteFeedback = (id) =>{
    console.log(id)
    if (window.confirm('Deletion operation is irreversible. Are you sure?')) {
      setFeedback(feedback.filter((item) => item.id!==id
      ))    
      }
  }
  return (
    <>
    <Header bgColor='yellow' color='red'></Header>
    <div className="container">
      <FeedbackForm></FeedbackForm>
      <FeedbackStats feedback={feedback}/>
      <h1> <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/> </h1>
    </div>
    </>
  )
}
export default App;


