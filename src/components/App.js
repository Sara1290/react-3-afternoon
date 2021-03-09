import React, { Component } from 'react';
import axios from 'axios'
import Compose from './Compose/Compose';
import Header from './Header/Header';
import Post from './Post/Post';
import './App.css';


// base url: https://practiceapi.devmountain.com/api

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then( results => { this.setState({ posts: results.data })
  })
  .catch(error => console.log(error))
}

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts${id}, ${text}`)
    .then( results => {this.setState({ posts: results.data })
  })
  .catch(error => console.log(error))
  }

  deletePost( id ) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts${id}`)
    .then( results => {this.setState({ posts: results.data })
  })
  .catch(error => console.log(error))
  }

                        //this one instead of paramaters we used the body way to get something from an API//
  createPost( text ) {
    axios.delete('https://practiceapi.devmountain.com/api/posts', {text})
    .then( results => {this.setState({ posts: results.data })
  })
  .catch(error => console.log(error))
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost } />

          {
            posts.map( post => (
            <Post key={ post.id } 
                  text={ post.text}
                  date={ post.date }
                  id={ post.id }
                  updatePostFn={ this.updatePost }
                  deletePostFn={ this.deletePost }/>
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
