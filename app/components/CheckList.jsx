import React from 'react';

import TaskActionCreators from '../actions/TaskActionCreators'

class CheckList extends React.Component {
  checkInputKeyPress(evt) {
    if(evt.key === 'Enter') {
      let newTask = {id: Date.now(), name: evt.target.value, done:false};
      TaskActionCreators.addTask(this.props.cardId, newTask);
      evt.target.value = '';
    }
  }
  render() {
    const tasks = this.props.tasks.map((task, taskIndex) => (
      <li key={task.id} className="checklist-task">
        <input type="checkbox" defaultChecked={task.done} onChange={TaskActionCreators.toggleTask.bind(null, this.props.cardId, task, taskIndex)} />
        {task.name}
        <a href="#" className="checklist-task-remove" onClick={TaskActionCreators.deleteTask.bind(null, this.props.cardId, task, taskIndex)} />
      </li>
    ));
    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input type="text"
          className="checklist-add-task"
          placeholder="Type then hit Enter to add a task"
          onKeyPress={this.checkInputKeyPress.bind(this)}
        />
      </div>
    );
  }
}

CheckList.propTypes = {
  cardId: React.PropTypes.number,
  tasks: React.PropTypes.arrayOf(React.PropTypes.object),
}

export default CheckList;
