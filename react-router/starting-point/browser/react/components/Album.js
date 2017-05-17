import React, {Component} from 'react';
import Songs from '../components/Songs';

export default class Album extends Component {

  constructor(props){
    super(props)
    this.state = {album : {}};

  }

  componentDidMount(){
    const albumId = this.props.routeParams.albumId;
    const selectAlbum = this.props.selectAlbum;

    selectAlbum(albumId);

    // axios.get('/api/albums/' + this.props.params.albumId)
    // .then(res => res.data)
    // .then(singleAlbum => this.setState({album : singleAlbum}))
  }


  render(){
    return (
      !this.props.album ? null : 
      <div className="album">
    
        <div>
       
          <h3>{ this.props.album.name }</h3>
          <img src={ this.props.album.imageUrl } className="img-thumbnail" />
        
        </div>
        <Songs
          songs={ this.props.album.songs }
          currentSong={ this.props.currentSong }
          isPlaying={ this.props.isPlaying }
          toggleOne={ this.props.toggleOne } />
        
      </div>
    );
  }
}
