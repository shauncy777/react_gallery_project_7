import React, {Component} from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
import Loading from './Loading';

class PhotoContainer extends Component { 

  // Prevents NotFound component from being rendered before results are returned
  state = {
    isMounted: false
  }

  // Sets is mounted to true to render Loading component if results are still being fetched
  componentDidMount(){
    this.setState({isMounted: true
    })
  }
 /* Maps over photo array to display results */
  render () {
    const results = this.props.data;
    let photos;
    if (results.length > 0 ) {
        photos = results.map(photo => {
        return  <Photo  url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`} key={photo.id} title={photo.title}/>
        });

      } else if (results.length < 1 && this.state.isMounted === true ){
        return <Loading />
    


      } else {
        /* Renders message to user if no results from search */
        return <NotFound />
          }
    
      return(
        <div className="photo-container">
          <h2>Search Results {this.props.title}</h2>
          <ul>
            {photos} 
          </ul> 
        </div>
      );
    }      
} 
  
  


export default PhotoContainer;