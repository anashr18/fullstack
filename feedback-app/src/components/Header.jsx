
import React from 'react'
import PropTypes from 'prop-types'
function Header({text, bgColor, color}) {
   const headerStyles = {backgroundColor:bgColor, color:color}
  return (
    <header style={headerStyles}>
       <div className="container">
        <h2>{text}</h2>
       </div>
    </header>
 )
}

Header.defaultProps = {
   text:'Default header' 
}
Header.propTypes = {
   text:PropTypes.string
}
export default Header