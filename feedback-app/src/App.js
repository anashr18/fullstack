import React, { useState } from "react";
import Header from './components/Header'
// import FeedbackItem from './components/FeedbackItem'
import FeedbackList from "./components/FeedbackList";
// @ts-ignore
import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import { v4 as uuidv4 } from "uuid";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AboutPage from "./components/pages/AboutPage";
function App() {
  const [feedback, setFeedback] = useState(FeedbackData) 
  const deleteFeedback = (id) =>{
    console.log(id)
    if (window.confirm('Deletion operation is irreversible. Are you sure?')) {
      setFeedback(feedback.filter((item) => item.id!==id
      ))    
      }
  }
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    console.log(newFeedback)
    setFeedback([newFeedback,...feedback])
  }
  return (
    <Router>
    <Header bgColor='yellow' color='red'></Header>
    <div className="container">
      <FeedbackForm handleAddFeedback={(newFeedback) => addFeedback(newFeedback)}></FeedbackForm>
      <FeedbackStats feedback={feedback}/>
      <h1> <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/> </h1>
      <Routes>
      <Route path="/about">This is the file about Route</Route>
      </Routes>
    </div>
    </Router>
  )
}
export default App;


