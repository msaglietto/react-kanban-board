import React from 'react';
import {DropTarget} from 'react-dnd';

import Card from './Card.jsx';
import constants from '../constants';

const List = (props) => {
  const {connectDropTarget} = props;
  const cards = props.cards.map((card) => {
    return (
      <Card key={card.id}
        {...card}
        taskCallbacks={props.taskCallbacks}
        cardCallbacks={props.cardCallbacks}
      />
    );
  });

  return connectDropTarget(
    <div className="list">
      <h1>{props.title}</h1>
      {cards}
    </div>
  );
};

const listTargetSpec = {
  hover(props, monitor){
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateStatus(draggedId, props.id);
  },
};
function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

List.prototype.propTypes = {
  title: React.PropTypes.string.isRequired,
  cards: React.PropTypes.arrayOf(React.PropTypes.object),
  taskCallbacks: React.PropTypes.object,
  cardCallbacks: React.PropTypes.object,
  connectDropTarget: React.PropTypes.func.isRequired,
}

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
