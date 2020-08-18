import React, { Component } from 'react';
import CardList from '../components/CardList';
import {robots} from '../robots';
import SearchBox from '../components/SearchBox'; 
import './App.css';
import Scroll from '../components/Scroll';
//import ErrorBoundery from '../components/ErrorBoundery'; 
class App extends Component {
  constructor(){
    super()
    this.state={
      robots: [],
      searchfield: ''
    }
  }
  componentDidMount() {
    // what if fetch is really slow or took 5 seconds and we had
    // a hole ton of users =>> well in that case we can use if statment
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(Response => Response.json())
    .then(users => this.setState({ robots:users}))
    /* this.setState({ robots: robots});*/
  }
  onSearchChange = (event) => {
   this.setState({searchfield: event.target.value})
  }
  render(){
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    }) 
    // like this >>  
    // robots.length === 0
    return !robots.length ?
     <h1 className='f1 tc'>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            
              <CardList robots ={filteredRobots}/>
            
          </Scroll>
      </div> 
    );      
  } 
}
export default App;