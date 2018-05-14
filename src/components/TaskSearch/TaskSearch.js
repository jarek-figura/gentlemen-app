import React, {Component} from 'react';
import './TaskSearch.css'
import {withTasks} from "../contexts/Tasks";

class TaskSearch extends Component {

  handleChange = event => this.props.updateSearchPhrase(event.target.value);

  render(){
    return(
      <div className='search-div'>
        <input className='search-input'
          placeholder='wyszukaj zadania'
          value={this.props.searchPhrase}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default withTasks(TaskSearch);