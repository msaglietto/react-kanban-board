import axios from 'axios';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'qwefsdfserqw',
};


let KanbanAPI = {
  fetchCards() {
    return axios(`${API_URL}/cards`, {headers: API_HEADERS})
      .then(response => response.data);
  },
  addCard(card) {
    return axios(`${API_URL}/cards`, {
      method:'post',
      headers: API_HEADERS,
      data: card,
    }).then(response => response.data);
  },
  updateCard(card, draftCard) {
    return axios(`${API_URL}/cards/${card.id}`, {
      method:'put',
      headers: API_HEADERS,
      data: draftCard,
    }).then(response => response.data);
  },
  persistCardDrag(cardId, status, index) {
    return axios(`${API_URL}/cards/${cardId}`, {
      method:'put',
      headers: API_HEADERS,
      data: {status, row_order_position: index},
    }).then(response => response.data);
  },
  addTask(cardId, task) {
    return axios(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      data: task,
    }).then(response => response.data)
  },
  deleteTask(cardId, task) {
    return axios(`${API_URL}/cards/${cardId}/tasks/${task.id}`, {
      method: 'delete',
      headers: API_HEADERS,
    });
  },
  toggleTask(cardId, task) {
    return axios(`${API_URL}/cards/${cardId}/tasks/${task.id}`, {
      method: 'put',
      headers: API_HEADERS,
      data: {done: !task.done},
    });
  },
};

export default KanbanAPI;
