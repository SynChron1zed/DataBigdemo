import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login';
import Layout from './components/Layout';
import User from './routes/User';
import Model from './routes/Model';
import Indata from './routes/Indata';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/login" component={Login} />
      <Route path="/layout" component={Layout} />
      <Route path="/user" component={User}/>
      <Route path="/model" component={Model}/>
      <Route path="/indata" component={Indata}/>
    </Router>
  );
}

export default RouterConfig;
