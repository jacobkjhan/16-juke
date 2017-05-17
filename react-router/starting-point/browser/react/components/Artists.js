import React, {Component} from 'react'
import initialState from '../initialState'
import axios from 'axios'
import {Link} from 'react-router'

export default class Artists extends Component {
	constructor(props) {
		super(props)
		this.state = initialState
	}

	componentDidMount(){
		axios.get('/api/artists')
		.then(res => res.data)
		.then(artists => {
			this.setState({artists: artists})
		})
		.catch(err => console.log(err))
	}

	render() {
		console.log(this.state)
		return(
			<div>
			  <h3>Artists</h3>
			    <div className="list-group">
			    {
			      this.state.artists.map(artist => {
			        return (
			          <div className="list-group-item" key={artist.id}>
			            {/* determine where to actually Link to later! */}
			            <Link to={`/artists/${artist.id}`}>{ artist.name }</Link>   
			          </div>
			        )    
			      })
			    }
			  </div>
			</div>
	)
	}
}