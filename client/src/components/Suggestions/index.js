import React from 'react'

const Suggestions = (props) => {
  const options = props.results.map(res => (
    // console.log(res)
    <li 
      key={res.id}>
      {res.title}
      {/* {res.year} */}
    </li>
  ))
  return <ul>{options}</ul>
}

export default Suggestions