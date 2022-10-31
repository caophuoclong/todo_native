import {View, Text} from 'react-native';
import React from 'react';
import useAppContext from '~/hooks/useAppContext';
import Todo from './Todo';
import Welcome from './Welcome';

const Home = () => {
  const {state, dispatch} = useAppContext();

  if (state.user.name) {
    return <Todo />;
  } else {
    return <Welcome />;
  }
};

export default Home;
