import React, {Component, PropTypes} from 'react';

import CardForm from './CardForm.jsx';

class EditCard extends Component {
  componentWillMount() {
    let card = this.props.cards.find((card) => card.id == this.props.params.cardId);
    this.setState(Object.assign({}, card));
  }
  handleChange(field, value) {
    this.setState({
      [field]: value,
    });
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.cardCallbacks.updateCard(this.state);
    this.context.router.push('/');
  }
  handleClose() {
    this.context.router.push('/');
  }
  render() {
    return (
      <CardForm
        draftCard= {this.state}
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
  cardCallbacks: PropTypes.object,
  params: PropTypes.object,
};

EditCard.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default EditCard;
