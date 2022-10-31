import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline, MuiThemeProvider} from '@material-ui/core';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client'
import theme from './theme'

ReactDOM.render(
    <ApolloProvider client = {client}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
      <App />
      </CssBaseline>
    </MuiThemeProvider>
    </ApolloProvider>,
  document.getElementById('root')
);

