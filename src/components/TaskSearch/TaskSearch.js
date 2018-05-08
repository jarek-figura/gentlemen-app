import React, {Component} from 'react';

class TaskSearch extends Component {

  handleChange = event => this.props.updateSearchPhrase(event.target.value)


  render(){
    return(
      <div>
        <input value={this.props.searchPhrase} onChange={this.handleChange}/>
      </div>
    );
  }
}



export default TaskSearch