import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import List from './List.jsx';

const KanabanBoard = (props) => {
  return (
    <div className="app">
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
    </div>
  );
};

KanabanBoard.prototype.propTypes = {
  cards: React.PropTypes.arrayOf(React.PropTypes.object),
  taskCallbacks: React.PropTypes.object,
  cardCallbacks: React.PropTypes.object,
};

export default DragDropContext(HTML5Backend)(KanabanBoard);
