import React from "react";

export function Row({  children }) {
    return <div className="row">{children}</div>;
  }

// function Row() {
//   // let genres = props.activeRecord.genres.map(function (item) {return <span>{item}</span>} );
  
//   return (
//     <div className="row">

//     </div>
//   );
// }

export default Row;