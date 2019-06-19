import React from "react";

const Image = (props) => {

    return props.albums.map( rec => {
        if (!rec.images || rec.images.length === 0 || !rec.images[0].uri){
            return <img src="https://i.ebayimg.com/images/a/(KGrHqVHJFYFDRE--t6nBQ6iBORH,w~~/s-l300.jpg" alt={rec.title} id={rec._id} key={rec._id} onClick={() => props.func(rec._id)}/>
        }
        else{
            return <img src={rec.images[0].uri} alt={rec.title} key={rec._id} onClick={() => props.func(rec._id)}/>
        }
    })
}

export default Image;