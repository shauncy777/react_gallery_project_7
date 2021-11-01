import React, {Component} from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

class PhotoContainer extends Component { 
 /* Maps over photo array to display results */
  render () {
    const results = this.props.data;
    let photos;
    if (results.length > 0 ) {
        photos = results.map(photo => (
          <Photo  id={photo.id}
                  server={photo.server}
                  secret={photo.secret}
                  title={photo.title}  
                  key={photo.id}/>
        ));
    
      
      return(
        <div className="photo-container">
          <h2>Search Results {this.props.title}</h2>
          <ul>
            {photos}
          </ul> 
        </div>
      );

    } else {
      /* Renders message to user if no results from search */
      return (<NotFound />)
        }
      }
    } 
  


export default PhotoContainer;