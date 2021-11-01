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
import { surf } from './Components/NavRoutes';




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
  axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_ACCESS_KEY}&tags="moon"&per_page=24&format=json&nojsoncallback=1`)
  .then(response => {
      this.setState({  
        initialPhotos: response.data.photos.photo,
        loading: false
      })
    })
  axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_ACCESS_KEY}&tags="surf"&per_page=24&format=json&nojsoncallback=1`)
  .then(response => {
      this.setState({  
        surfPhotos: response.data.photos.photo,
        loading: false
      })
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_ACCESS_KEY}&tags="snow"&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
        this.setState({  
          snowPhotos: response.data.photos.photo,
          loading: false
        })
      })
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_ACCESS_KEY}&tags="rain"&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
          this.setState({  
            rainPhotos: response.data.photos.photo,
            loading: false
          })
        })
  .catch(error =>  {
    console.log('Error fetching and parsing data', error);
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
      this.setState({  
        photos: response.data.photos.photo,
        title: query,
        loading: false
      })
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
                <Route exact path="/" render={() => <PhotoContainer data={this.state.initialPhotos} />}/>
                <Route path="/surf" render={() => <PhotoContainer data={this.state.surfPhotos} title={'surf'}/>}/>
                <Route path="/snow" render={() => <PhotoContainer data={this.state.snowPhotos} title={'snow'}/>}/>
                <Route path="/rain" render={() => <PhotoContainer data={this.state.rainPhotos} title={'rain'}/>}/>
                <Route path="/search/:query" render={({match}) => <PhotoContainer data={this.state.photos} title={this.state.title} loading={this.state.loading} />} />
                <Route render={() => <Error />} />
              </Switch>
            }
       
        </div>
      </BrowserRouter>
    )
   
    }  
}

export default withRouter (App);
