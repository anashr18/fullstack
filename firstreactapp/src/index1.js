import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// const Greetings = ()=>{
//     return <div>
//     <Person/>
//     <Message/>
//     </div>
// };
// const Person = () => <h1>This is person</h1>;
// const Message = () => {return <p>This is message</p>;};

// const Booklist = () => {
//     return (
//         <section className='booklist'>
//         <Book/>
//         <Book/>
//         <Book/>
//         <Book/>
//         </section>
//     );
// };
// const Book = ()=> {
//     return (<article className='book'>
//         <Image/>
//         <Title/>
//         <Author/>
//     </article>
//     );
// };
// const Image = ()=> (
//     <img
//     src='https://images-na.ssl-images-amazon.com/images/I/71m+Qtq+HrL._AC_UL900_SR900,600_.jpg'
//     alt='Interesting Facts For Curious Minds'
//   />
// );
// const Title = ()=> <h2>Interesting facts for curious mind</h2>;
// const Author = ()=> <h4>Yugi Saul</h4>;
// root.render(<Greetings/>);
// function BookList() {
//     return (
//         <section className='booklist'>
//             {/* First Book without title and number, but with a job */}
//             <Book job='Developer' author='Anonymous' img='https://via.placeholder.com/150' />

//             {/* Second Book with title, number, and author */}
//             <Book title='Random Title' number={22} author='John Doe' img='https://via.placeholder.com/150' />
//         </section>
//     );
// }
const books = [
    {
      author: 'Jordan Moore',
      title: 'Interesting Facts For Curious Minds',
      img:'https://images-na.ssl-images-amazon.com/images/I/71m+Qtq+HrL._AC_UL900_SR900,600_.jpg',
      id: 1,
    },
    {
      author: 'James Clear',
      title: 'Atomic Habits',
      img: 'https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL._AC_UL900_SR900,600_.jpg',
      id: 2,
    },
  ];


function BookList() {
    return (
      <section className='booklist'>
        <EventExample/>
        {books.map((book) => {
          return <Book {...book} key={book.id} />;
        })}
      </section>
    );
  }
  
  const Book = (props) => {
    const { img, title, author } = props;
    return (
      <article className='book'>
        <img src={img} alt={title} />
        <h2>{title}</h2>
        <h4>{author} </h4>
      </article>
    );
  };
  const EventExample = () => {
    const HandleButtonClick = ()=>{
        console.log("Button clicked");
    };
    const HandleFormInputs = (e)=>{
        console.log("Handle Form input");
        console.log(e);
        console.log(`Input name: ${e.target.name}`);
        console.log(`Input value: ${e.target.value}`);
    };
    const HandleFormSubmission = (e)=>{
        e.preventDefault();
        console.log("Form submission... ");
    };
    return (
        <section>
            <form type='submit' onClick={HandleFormSubmission}>
                <h2>
                    <input type="text"
                    name='example'
                    onChange={HandleFormInputs} 
                    style={{margin:'1rem 0'}}/>
                </h2>
            </form>
            <button onClick={HandleButtonClick}>click me</button>
        </section>
    )
  };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BookList />);


