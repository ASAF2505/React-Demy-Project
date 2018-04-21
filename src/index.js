import Lodash from 'lodash';   // you can do : import _ from 'lodash';
import React ,{ Component } from 'react';
import ReactDom from 'react-dom';
import YTSearce from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAYbIR9KaV0e1UzdFS0mv27y0BvewjM3c0';



 //  (1) Create new component. this component make HTML.

class App extends Component {
    
    constructor(props){
       super(props);

       this.state = { 
       	              videos: [],
                      selectedVideo:null
       	            };

        this.videoSearch('motorcycle');	            

    }


    videoSearch(term){
         YTSearce( { key: API_KEY, term: term } , (videos) => {
           this.setState( { 
           	                videos: videos,
                            selectedVideo: videos[0]
           	              } );
         } );
    }



	render(){
       const videoSearch = Lodash.debounce( (term) => { this.videoSearch(term) } , 300 );


       return (
			  <div>
		         <SearchBar onSearchTermChange={ videoSearch } />
		         <VideoDetail video={this.state.selectedVideo} />
		         <VideoList
		          onVideoSelect={ selectedVideo => this.setState( { selectedVideo} ) }
		          videos={this.state.videos}
		         />
			  </div>
	       );

	}



}


/// (2) take this component and put it into the page.

ReactDom.render( <App />,document.querySelector('.container') );