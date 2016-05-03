import React, {Component, PropTypes} from 'react';
import {Container} from 'flux/utils';

import CardForm from './CardForm.jsx';
import CardActionCreators from '../actions/CardActionCreators';

import DraftStore from '../stores/DraftStore';

class NewCard extends Component {
  componentDidMount() {
    setTimeout(() => CardActionCreators.createDraft(), 0);
  }
  handleChange(field, value) {
    CardActionCreators.updateDraft(field, value);
  }
  handleSubmit(e) {
    e.preventDefault();
    CardActionCreators.addCard(this.state.draft);
    this.context.router.push('/');
  }
  handleClose() {
    this.context.router.push('/');
  }
  render() {
    return (
      <CardForm
        draftCard={this.state.draft}
        buttonLabel="Create Card"
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleClose={this.handleClose.bind(this)}
      />
    );
  }
}

NewCard.propTypes = {
  router: PropTypes.object,
}

NewCard.contextTypes = {
  router: PropTypes.object.isRequired,
};

NewCard.getStores = () => ([DraftStore]);
NewCard.calculateState = () => ({
  draft: DraftStore.getState(),
});

export default Container.create(NewCard);
