import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import axios from 'axios';

// Import components
import API_ACCESS_KEY from './config';
import MainNav from './Components/MainNav';
import PhotoContainer from './Components/PhotoContainer';
import SearchForm from './Components/SearchForm';
import Loading from './Components/Loading';
import Error from './Components/Error';





class App extends Component {

  state = {
    initialPhotos: [],
    surfPhotos: [],
    snowPhotos: [],
    rainPhotos: [],
    photos: [],
    query: '',
    loading: true,
    title: ''
  }


/* Set search on initial page load */
componentDidMount () {
this.performSearch('moon');
this.performSearch('surf');
this.performSearch('snow');
this.performSearch('rain');
this.setState({
  loading: true
});
}

  


/* Handles search history nav */
componentDidUpdate( prevProps) {
  if( this.props.location.pathname !== prevProps.location.pathname ) {
    this.performSearch(this.props.location.pathname.replace('/search/', ''))
  }
}


/* Handles search capability */
performSearch = (query) => {
  this.setState({loading: true})
  axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_ACCESS_KEY}&tags="${query}"&per_page=24&format=json&nojsoncallback=1`)
  .then(response => {
    if (query === 'surf')
      this.setState({  
        surfPhotos: response.data.photos.photo,
        loading: false
      })
    else if (query === 'snow')
      this.setState({  
        snowPhotos: response.data.photos.photo,
        loading: false
      })
    else if (query === 'rain')
      this.setState({  
        rainPhotos: response.data.photos.photo,
        loading: false
      })
    else if (query === 'moon')
      this.setState({  
        initialPhotos: response.data.photos.photo,
        loading: false
      })
    else{
      this.setState({  
        photos: response.data.photos.photo,
        title: query,
        loading: false
      })
      }
    })
  .catch(error =>  {
    console.log('Error fetching and parsing data', error);
  });  
}


  /* Renders all photo components */
  render (){
    console.log(this.state.photos)
    return (
      <BrowserRouter>
        <div className="container">
            <SearchForm onSearch={this.performSearch}/>
            <MainNav />

            {/* Provides message to user if delay in retreiving request */}
            {
              (this.state.loading)
              ? <Loading />
              :
              <Switch>
                <Route exact path="/" render={() => <PhotoContainer data={this.state.initialPhotos} loading={this.state.loading} />}/>
                <Route exact path="/surf" render={() => <PhotoContainer data={this.state.surfPhotos} title={'surf'} loading={this.state.loading}/>}/>
                <Route exact path="/snow" render={() => <PhotoContainer data={this.state.snowPhotos} title={'snow'} loading={this.state.loading}/>}/>
                <Route exact path="/rain" render={() => <PhotoContainer data={this.state.rainPhotos} title={'rain'} loading={this.state.loading}/>}/>
                <Route  path="/search/:query" render={() => <PhotoContainer data={this.state.photos} title={this.state.title} loading={this.state.loading} />} />
                <Route render={() => <Error />} />
              </Switch>
            }
       
        </div>
      </BrowserRouter>
    )
   
    }  
}

export default withRouter (App);
