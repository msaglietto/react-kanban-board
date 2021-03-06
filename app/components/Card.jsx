import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import marked from 'marked';
import {DragSource, DropTarget} from 'react-dnd';
import {Link} from 'react-router';

import CheckList from './CheckList.jsx';
import constants from '../constants';
import CardActionCreators from '../actions/CardActionCreators';

class Card extends Component {
  toggleDetails() {
    CardActionCreators.toggleCardDetails(this.props.id);
  }
  render() {
    const {connectDragSource, connectDropTarget} = this.props;
    let cardDetails,
      cadtTitleCss = 'card-title',
      sideColor = {
        position: 'absolute',
        zIndex: -1,
        top: 0,
        bottom: 0,
        left: 0,
        width: 7,
        backgroundColor: this.props.color,
      };

    if(this.props.showDetails !== false) {
      cardDetails = (
        <div className="card-details">
          <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
          <CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks} />
        </div>
      );
      cadtTitleCss += ' card-title-is-open';
    }

    return connectDropTarget(connectDragSource(
      <div className="card">
        <div style={sideColor} />
        <div className="card-edit">
          <Link to={'/edit/' + this.props.id}>&#9998;</Link>
        </div>
        <div className={cadtTitleCss} onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
        <ReactCSSTransitionGroup
          transitionName="toggle"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
        >
          {cardDetails}
        </ReactCSSTransitionGroup>
      </div>
    ));
  }
}

const titlePropType = (props, propName, componentName) => {
  const maxCharacters = 80;
  if(props[propName]){
    let value = props[propName];
    if(typeof value !== 'string' || value.length > maxCharacters){
      return new Error(`${propName} in ${componentName} is longer than ${maxCharacters} characters`);
    }
  }
};
const cardDragSpec = {
  beginDrag(props){
    return {
      id: props.id,
      status: props.status,
    };
  },
  endDrag(props){
    CardActionCreators.persistCardDrag(props);
  },
};
let collectDrag = (connect) => {
  return {
    connectDragSource: connect.dragSource(),
  };
}
const cardDropSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    if(props.id !== draggedId) {
      CardActionCreators.updateCardPosition(draggedId, props.id);
    }
  },
};
let collectDrop = (connect) => {
  return {
    connectDropTarget: connect.dropTarget(),
  }
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: titlePropType,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
  showDetails: PropTypes.bool,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

export default dragDropHighOrderCard;
