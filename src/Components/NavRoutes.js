
   
import axios from 'axios'
import API_ACCESS_KEY from '../config'

/* MainNav default search topics */
let surf={}
let snow={}
let rain={}

/* Fetch data for MainNav default topics. */
axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_ACCESS_KEY}&tags="surf"&per_page=24&format=json&nojsoncallback=1`)
.then (res =>{
    surf = res.data.photos.photo
})

axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_ACCESS_KEY}&tags="snow"&per_page=24&format=json&nojsoncallback=1`)
.then (res =>{
    snow = res.data.photos.photo
})

axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_ACCESS_KEY}&tags="rain"&per_page=24&format=json&nojsoncallback=1`)
.then (res =>{
    rain = res.data.photos.photo
})

export {surf, snow, rain}