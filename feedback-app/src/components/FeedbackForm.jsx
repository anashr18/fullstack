import React from "react";
import Card from "./shared/Card";
import { useState } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
function FeedbackForm() {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");
  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setMessage("Text must be at least 10 character");
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }
    setText(e.target.value);
  };
  return (
    <Card>
      <form action=""></form>
      <h2>How would you rate?</h2>
      <RatingSelect></RatingSelect>
      <div className="input-group">
        <input
          onChange={handleTextChange}
          type="text"
          placeholder="Write a Review"
          value={text}
        />
        <Button type="submit" isDisabled={btnDisabled}>
          Send
        </Button>
      </div>
      {message && <div className="message">{message}</div>}
    </Card>
  );
}

export default FeedbackForm;
