import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

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

  //axios.get('').then(funcSuccess, funcFail)
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(response => {
      this.setState({posts: response.data});
      }, 
      response => {
        window.alert("Error receiving comment history. Response from service: \n" + response);
      }
    )
  }

  //updates this states "posts" array - changing the text of the state's post using the ID and the TEXT of the provided parameter post object. 
  updatePost(text, id) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text: text}).then(
      response => {
        this.setState({posts: response.data});
      }, 
      response => {
        window.alert("Error updating comment. Response from service: \n" + response);
      });
  }

  deletePost(id) {
    console.log(id);
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=5130`).then(
      response => {
        this.setState({posts: response.data});
      },
      response => {
        window.alert("Error deleting comment. Response from service: \n" + response);
      });
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text: text}).then(
      response => {
        this.setState({posts: response.data});
      },
      response => {
        window.alert("Error adding comment. Response from service: \n" + response);
      }
    )
  }


  //Example of a post object that is stored in the post array: 
  //{id: 5074, text: "Hi, ↵it is me", date: "07 Mar 2021"}
  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost}/>
          {this.state.posts.map( post => {
            return (<Post 
              key={ post.id } 
              text={ post.text } 
              date={ post.date } 
              updatePostFn={ this.updatePost } 
              id={ post.id } 
              deletePostFn={ this.deletePost }/>)
          })}
        </section>
      </div>
    );
  }
}

export default App;
