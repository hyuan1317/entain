import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components/native';
import store from './src/store';
import HomeScreen from './src/screens/Home';

const AppWrapper = styled.SafeAreaView`
  flex: 1;
`;

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <HomeScreen />
      </AppWrapper>
    </Provider>
  );
};

export default App;
