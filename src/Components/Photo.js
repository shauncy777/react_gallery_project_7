import React from 'react';

const Photo = ({server, id , secret, title}) => {
  let url = `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;
  return (
  <li>
    <img src={url} alt={title}/>
  </li>
  );
}

export default Photo;