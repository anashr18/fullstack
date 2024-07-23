import React from "react";
import Card from "./shared/Card";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
function FeedbackItem({ item, handleDelete }) {
  // const HandleClick = (item) => {
  //   console.log(item.id);
  // };

  return (
    <Card reverse={item.rating % 2 === 0 ? false : true}>
      <div className="num-display">{item.rating}</div>
      <button onClick={() => handleDelete(item.id)} className="close">
        <FaTimes color="purple"></FaTimes>
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};
export default FeedbackItem;
