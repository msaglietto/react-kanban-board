import React, {Component} from 'react';
import {Container} from 'flux/utils';

import CardActionCreators from '../actions/CardActionCreators';
import CardStore from '../stores/CardStore';


class KanbanBoardContainer extends Component {
  componentDidMount() {
    CardActionCreators.fetchCards();
  }
  render() {
    let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
      cards: this.state.cards,
    });
    return kanbanBoard;
  }
}

KanbanBoardContainer.propTypes = {
  children: React.PropTypes.object,
}

KanbanBoardContainer.getStores = () => ([CardStore]);
KanbanBoardContainer.calculateState = () => ({
  cards: CardStore.getState(),
});

export default Container.create(KanbanBoardContainer);
