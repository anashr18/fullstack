const Book = (props) => {
    const { img, title, author, id, getBook, number } = props;
    return (
      <article className='book'>
        <img src={img} alt={title} />
        <h2>{title}</h2>
        <button onClick={()=>getBook(id)}>Display Title</button>
        <h4>{author} </h4>
        <span className='number'>{`# ${number+1}`}</span>
      </article>
    );
  };

  export default Book;