import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {Link} from 'react-router';

import List from './List.jsx';

const KanbanBoard = (props) => {
  let cardModal = props.children && React.cloneElement(props.children, {
    cards: props.cards,
    cardCallbacks: props.cardCallbacks,
  });
  return (
    <div className="app">
      <Link to="/new" className="float-button">+</Link>
      <List id="todo" title="To Do"
        cards={props.cards.filter((card) => card.status === 'todo')}
        taskCallbacks={props.taskCallbacks}
        cardCallbacks={props.cardCallbacks}
      />
      <List id="in-progress" title="In Progress"
        cards={props.cards.filter((card) => card.status === 'in-progress')}
        taskCallbacks={props.taskCallbacks}
        cardCallbacks={props.cardCallbacks}
      />
      <List id="done" title="Done"
        cards={props.cards.filter((card) => card.status === 'done')}
        taskCallbacks={props.taskCallbacks}
        cardCallbacks={props.cardCallbacks}
      />
      {cardModal}
    </div>
  );
};

KanbanBoard.prototype.propTypes = {
  cards: React.PropTypes.arrayOf(React.PropTypes.object),
  taskCallbacks: React.PropTypes.object,
  cardCallbacks: React.PropTypes.object,
  children: React.PropTypes.object,
};

export default DragDropContext(HTML5Backend)(KanbanBoard);
