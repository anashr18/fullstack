import React from "react";

function Basic() {
  const title = 'Blog Post'
  const body = 'This is my blog post'
  const comments = [
    {id:1, text:'comment one'},
    {id:2, text:'comment two'},
    {id:3, text:'comment three'},
    {id:4, text:'comment four'},
  ]
  const loading = false
  if (loading) return <h1>Loading .......</h1>
  const showComments = true
  const commentsSection = (<div>

    <h2>Comments::{comments.length}</h2>
    <ul>
      {comments.map((comment, index) => (
        <li key={index}>
          {comment.text}
        </li>
      )
    )}
    </ul>
    </div>
    )
  return (
    <div className="container">

      <h1>{title}</h1>
      <p>{body}</p>
      {showComments && (commentsSection)}
    </div>
  //   React.createElement('div', { className: 'container' },
  //     React.createElement('h1', {}, 'My APP'))
  // )
  )
}
export default Basic;


