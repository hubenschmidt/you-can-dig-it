import React from "react";

const Image = (props) => {

    return props.albums.map( rec => {
        if (!rec.image){
            return <img src="https://i.ebayimg.com/images/a/(KGrHqVHJFYFDRE--t6nBQ6iBORH,w~~/s-l300.jpg" alt={rec.title} id={rec._id} key={rec._id} onClick={() => props.func(rec._id)}/>
        }
        else{
            return <img src={rec.image} alt={rec.title} key={rec._id} onClick={() => props.func(rec._id)}/>
        }
    })
}

export default Image;