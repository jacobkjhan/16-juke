import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Link, IndexRoute, IndexRedirect } from 'react-router';
import axios from 'axios';

class App extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <div>
        <h1>PUPPIES AND KITTIES AND CUTENESS OH MY</h1>
        <Link to="/puppies">Puppies</Link>
        <br />
        <Link to="/kitties">Kitties</Link>
        { this.props.children }
      </div>
    );
  }
}

class PuppiesList extends Component {
  constructor () {
    super();
    this.state = {
      puppies: []
    };
  }

  componentDidMount () {
    axios.get('/api/puppies')
    .then(res => res.data)
    .then(puppies => {
      this.setState({ puppies })
    });
  }

  render () {
    return (
      <div>
        <h2>Puppies!!!!!1</h2>
        <ul>
        { this.state.puppies.map(puppy =>
          <li key={ puppy.id }><Link to={`/puppies/${puppy.id}`}>{puppy.name}</Link></li>
        ) }
        </ul>
        { this.props.children }
      </div>
    );
  }
}

// function SinglePuppy ({ name, image }) {
//   // const { name, image } = props;
//   do something with name
//   do something with image
// }

class SinglePuppy extends Component {
  constructor () {
    super();
    this.state = {
      puppy: {}
    };
  }

  componentDidMount () {
    axios.get(`/api/puppies/${this.props.params.id}`)
    .then(res => res.data)
    .then(puppy => {
      this.setState({ puppy });
    });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      axios.get(`/api/puppies/${nextProps.params.id}`)
      .then(res => res.data)
      .then(puppy => {
        this.setState({ puppy });
      });
    }
  }

  render () {
    const { puppy } = this.state;
    return (
      <div>
        <h3>{ puppy.name }</h3>
        <img src={ puppy.image } />
      </div>
    );
  }
}

function Home () {
  return <h2>Click above for pups and kitties what are you waiting for</h2>;
}

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component={ App } >
      <Route path="home" component={ Home } />
      <Route path="puppies" component={ PuppiesList } />
      <Route path="puppies/:id" component={ SinglePuppy } />
    </Route>
  </Router>,
  document.getElementById('app')
);
