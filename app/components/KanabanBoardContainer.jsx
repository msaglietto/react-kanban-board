import React, {Component} from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import _ from 'lodash';

import KanabanBoard from './KanbanBoard.jsx';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'qwefsdfserqw',
};

class KanabanBoardContainer extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    }
    this.updateCardStatus = _.throttle(this.updateCardStatus.bind(this), 500);
    this.updateCardPosition = _.throttle(this.updateCardPosition.bind(this), 500);
  }
  componentDidMount() {
    axios.get(API_URL + '/cards', {headers: API_HEADERS})
      .then((response) => {
        this.setState({
          cards: response.data,
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing Data', error);
      });
  }
  addTask(cardId, taskName){
    let prevState = this.state;
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    let newTask = {
      id: Date.now(),
      name: taskName,
      done: false,
    };
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$push: [newTask]},
      },
    });
    this.setState({cards: nextState});
    axios(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      data: JSON.stringify(newTask),
    })
    .then((response) => {
        newTask.id = response.data.id;
        this.setState({card: nextState});
    })
    .catch(() => {
      this.setState(prevState);
    });
  }
  deleteTask(cardId, taskId, taskIndex){
    let prevState = this.state;
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          $splice: [[taskIndex, 1]],
        },
      },
    });
    this.setState({cards:nextState});
    axios(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS,
    })
    .catch(() => {
      this.setState(prevState);
    });
  }
  toggleTask(cardId, taskId, taskIndex){
    let prevState = this.state;
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    let newDoneValue;
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: {
              $apply: (done) => {
                newDoneValue = !done;
                return newDoneValue;
              },
            },
          },
        },
      },
    });
    this.setState({cards: nextState});
    axios(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'put',
      headers: API_HEADERS,
      data: JSON.stringify({done: newDoneValue}),
    })
    .catch(() => {
      this.setState(prevState);
    });
  }
  updateCardStatus(cardId, listId){
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    let card = this.state.cards[cardIndex];
    if(card.status !== listId){
      this.setState(update(this.state, {
        cards: {
          [cardIndex]: {
            status: {$set: listId},
          },
        },
      }));
    }
  }
  updateCardPosition(cardId, afterId) {
    if(cardId !== afterId) {
      let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
      let card = this.state.cards[cardIndex];
      let afterIndex = this.state.cards.findIndex((card) => card.id === afterId);
      this.setState(update(this.state, {
        cards: {
          $splice: [[cardIndex, 1], [afterIndex, 0, card]],
        },
      }));
    }
  }
  persistCardDrag(cardId, status){
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    let card = this.state.cards[cardIndex];

    axios(`${API_URL}/cards/${cardId}`, {
      method: 'put',
      headers: API_HEADERS,
      data:JSON.stringify({status: card.status, row_order_position: cardIndex}),
    }).
    catch(() => {
      this.setState(
        update(this.state, {
          cards: {
            [cardIndex]: {
              status: {$set: status},
            },
          },
        }));
    });
  }
  render() {
    return (<KanabanBoard
      cards={this.state.cards}
      taskCallbacks={{
        toggle: this.toggleTask.bind(this),
        delete: this.deleteTask.bind(this),
        add: this.addTask.bind(this),
      }}
      cardCallbacks={{
        updateStatus: this.updateCardStatus,
        updatePosition: this.updateCardPosition,
        persistCardDrag: this.persistCardDrag.bind(this)
      }}
    />);
  }
}

export default KanabanBoardContainer;
