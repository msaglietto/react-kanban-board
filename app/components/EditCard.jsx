import React, {Component, PropTypes} from 'react';
import {Container} from 'flux/utils';

import CardForm from './CardForm.jsx';
import CardStore from '../stores/CardStore';
import CardActionCreators from '../actions/CardActionCreators';

import DraftStore from '../stores/DraftStore';

class EditCard extends Component {
  componentDidMount() {
    setTimeout(() => {
      CardActionCreators.createDraft(CardStore.getCard(this.props.params.cardId));
    }, 0);
  }
  handleChange(field, value) {
    CardActionCreators.updateDraft(field, value);
  }
  handleSubmit(e){
    e.preventDefault();
    CardActionCreators.updateCard(CardStore.getCard(parseInt(this.props.params.cardId, 10)), this.state.draft);
    this.context.router.push('/');
  }
  handleClose() {
    this.context.router.push('/');
  }
  render() {
    return (
      <CardForm
        draftCard= {this.state.draft}
        buttonLabel="Edit Card"
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleClose={this.handleClose.bind(this)}
      />
    );
  }
}

EditCard.propTypes = {
  cards: PropTypes.array,
  params: PropTypes.object,
};

EditCard.contextTypes = {
  router: PropTypes.object.isRequired,
};

EditCard.getStores = () => ([DraftStore]);

EditCard.calculateState = () => ({
  daft: DraftStore.getState(),
});

export default Container.create(EditCard);
