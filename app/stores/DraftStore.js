import {ReduceStore} from 'flux/utils';
import update from 'react-addons-update';

import AppDispatcher from '../AppDispatcher';
import constants from '../constants';

let defaultDraft = () => {
  return {
    id: Date.now(),
    title: '',
    description: '',
    status: 'todo',
    color: '#fafafa',
    tasks: [],
  };
};

class DrafStore extends ReduceStore {
  getInitialState() {
    return {};
  }
  reduce(state, action) {
    switch (action.type) {
      case constants.CREATE_DRAFT:
        if(action.payload.card) {
          return update(this.getState(), {
            $set: action.payload.card,
          });
        } else {
          return defaultDraft();
        }
      case constants.UPDATE_DRAFT:
        return update(this.getState(), {
          [action.payload.field] : {
            $set: action.payload.value,
          },
        });
      default:
        return state;
    }
  }
}

export default new DrafStore(AppDispatcher);
