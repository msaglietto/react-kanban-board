import _ from 'lodash';

import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import KanbanAPI from '../api/KanbanApi';

import CardStore from '../stores/CardStore';

let CardActionCreators = {
  fetchCards() {
    AppDispatcher.dispatchAsync(KanbanAPI.fetchCards(), {
      request: constants.FETCH_CARDS,
      success: constants.FETCH_CARDS_SUCCESS,
      error: constants.FETCH_CARDS_ERROR,
    });
  },
  addCard(card) {
    AppDispatcher.dispatchAsync(KanbanAPI.addCard(card), {
      request: constants.CREATE_CARD,
      success: constants.CREATE_CARD_SUCCESS,
      error: constants.CREATE_CARD_ERROR,
    }, {card});
  },
  updateCard(card, draftCard) {
    AppDispatcher.dispatchAsync(KanbanAPI.updateCard(card, draftCard), {
      request: constants.UPDATE_CARD,
      success: constants.UPDATE_CARD_SUCCESS,
      error: constants.UPDATE_CARD_ERROR,
    }, {card, draftCard});
  },
  updateCardStatus: _.throttle((cardId, listId) => {
    AppDispatcher.dispatch({
      type: constants.UPDATE_CARD_STATUS,
      payload: {cardId, listId},
    });
  }, 500),
  updateCardPosition: _.throttle((cardId, afterId) => {
    AppDispatcher.dispatch({
      type: constants.UPDATE_CARD_POSITION,
      payload: {cardId, afterId},
    });
  }, 500),
  persistCardDrag(cardProps) {
    let card = CardStore.getCard(cardProps.id);
    let cardIndex = CardStore.getCardIndex(cardProps.id);
    AppDispatcher.dispatchAsync(KanbanAPI.persistCardDrag(card.id, card.status, cardIndex), {
      request: constants.PERSIST_CARD_DRAG,
      success: constants.PERSIST_CARD_DRAG_SUCCESS,
      error: constants.PERSIST_CARD_DRAG_ERROR,
    }, {cardProps});
  },
  toggleCardDetails(cardId) {
    AppDispatcher.dispatch({
      type: constants.TOGGLE_CARD_DETAILS,
      payload: {cardId},
    });
  },
  createDraft(card) {
    AppDispatcher.dispatch({
      type: constants.CREATE_DRAFT,
      payload: {card},
    });
  },
  updateDraft(field, value) {
    AppDispatcher.dispatch({
      type: constants.UPDATE_DRAFT,
      payload: {field, value},
    });
  },
};

export default CardActionCreators;
