import React from 'react';

class CheckList extends React.Component {
  checkInputKeyPress(evt) {
    if(evt.key === 'Enter') {
      this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
      evt.target.value = '';
    }
  }
  render() {
    const tasks = this.props.tasks.map((task, taskIndex) => (
      <li key={task.id} className="checklist-task">
        <input type="checkbox" defaultChecked={task.done} onChange={this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)} />
        {task.name}
        <a href="#" className="checklist-task-remove" onClick={this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)} />
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
  taskCallbacks: React.PropTypes.object,
}

export default CheckList;
