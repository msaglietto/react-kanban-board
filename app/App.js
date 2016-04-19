import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import KanbanBoardContainer from './components/KanbanBoardContainer.jsx';
import KanbanBoard from './components/KanbanBoard.jsx';
import EditCard from './components/EditCard.jsx';
import NewCard from './components/NewCard.jsx';

ReactDom.render((<Router history={browserHistory}>
  <Route component={KanbanBoardContainer}>
    <Route path="/" component={KanbanBoard}>
      <Route path="new" component={NewCard} />
      <Route path="edit/:cardId" component={EditCard} />
    </Route>
  </Route>
</Router>), document.getElementById('root'));
