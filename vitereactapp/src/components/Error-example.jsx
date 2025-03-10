const ErrorExample = () => {
  let count = 0

  const handleClick = () => {
    count = count + 1
    console.log(count)
  }
  return (
    <div>
      <h2>This is error example</h2>
      <button type="button" className="btn" onClick={() => handleClick()}>
        Increment
      </button>
    </div>
  )
}
export default ErrorExample
