import React from 'react';
import {DropTarget} from 'react-dnd';

import Card from './Card.jsx';
import constants from '../constants';
import CardActionCreators from '../actions/CardActionCreators';

const List = (props) => {
  const {connectDropTarget} = props;
  const cards = props.cards.map((card) => {
    return (<Card key={card.id} {...card} />);
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
    CardActionCreators.updateCardStatus(draggedId, props.id);
  },
};
function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

List.prototype.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  cards: React.PropTypes.arrayOf(React.PropTypes.object),
  connectDropTarget: React.PropTypes.func.isRequired,
}

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
