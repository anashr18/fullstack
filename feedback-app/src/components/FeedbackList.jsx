import React from "react";
import PropTypes from "prop-types";
import FeedbackItem from "./FeedbackItem";
import { motion, AnimatePresence } from "framer-motion";
function FeedbackList({ feedback, handleDelete }) {
  console.log(feedback);
  if (!feedback || feedback.length === 0) {
    return <p>No feedback</p>;
  }
  return (
    // <div className="feedback-list">
    //   {feedback.map((item) => (
    //     <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
    //   ))}
    // </div>
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem
              key={item.id}
              item={item}
              handleDelete={handleDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

FeedbackItem.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};
export default FeedbackList;
