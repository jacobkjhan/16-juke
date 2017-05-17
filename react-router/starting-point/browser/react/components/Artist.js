import React, {Component} from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import Songs from '../components/Songs'

export default class Artist extends Component {
	constructor(props){
		super(props)
		this.state = {
			artist: {},
			albums: [],
			songs: []
		}
		// this.selectedArtist = this.props.selectedArtist;
		// this.children = this.props.children;
		// this.propsToPassToChildren = {
		// 	albums: [],
		// 	songs: []
		// }
	}

	componentDidMount(){
		axios.get(`/api/artists/${this.props.params.artistId}`)
		.then(res => res.data)
		.then(artist => {
			this.setState({
				artist: artist
			})
		})

		axios.get(`/api/artists/${this.props.params.artistId}/albums`)
		.then(res => res.data)
		.then(albums => {
			this.setState({
				albums: albums
			})
		})

		axios.get(`/api/artists/${this.props.params.artistId}/songs`)
		.then(res => res.data)
		.then(songs => {
			this.setState({
				songs: songs
			})
		})
	}

	render() {
		console.log(this.state.albums)
		return(
			<div>
			  <h3>{ this.state.artist.name }</h3>
			  <ul className="nav nav-tabs">
			    <li>
			    	<Link to={`/artists/${this.state.artist.id}/albums`}>Albums
			    	<img src={`/api/albums/${this.state.albums.id}/image`} className="img-thumbnail" />
			    	</Link>
			    </li>
			  </ul>
			  { this.props.children && React.cloneElement(this.props.children, this.state) }
			</div>

			// {<div>
			//   <h3>{this.state.artist.name}</h3>
			//   <h3>Albums</h3>
			//   {
			//   	this.state.albums.map(album => {
			//   		return (
			//   			<div className="album">
			// 		        <div>
			// 		          <h3>{album.name }</h3>
			// 		          <Link to = {`/albums/${album.id}`}>
			// 		          <img src={`/api/albums/${album.id}/image`} className="img-thumbnail" />
			// 		          </Link>
			// 		        </div>
			// 		      </div>)
			// 	})
			//   }
			//   <h4>Songs</h4>
	  // 			<Songs
		 //          songs={ this.state.songs }
		 //          currentSong={ this.props.currentSong }
		 //          isPlaying={ this.props.isPlaying }
		 //          toggleOne={ this.props.toggleOne } />
				
			// </div>}
		)
		
	}
}