import React, { useState } from "react";

function FeedbackItem() {
    const [rating, setRating] = useState(8)
    const [text, setText] = useState('First feedback Item')

    const handleClick = () => {
        setRating((prev) => {
            return prev + 1
    })
}
  return (
    <div className="card">
        <div className="num-display">{rating}</div>
        <div className="text-display">{text}</div>
        <button onClick={handleClick}>Click me</button>
    </div>
  )
}

export default FeedbackItem