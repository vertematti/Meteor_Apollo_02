import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Header from './Header';
import Loading from './Loading';
import LoginForm from './LoginForm';

const App = ({ currentUser, refetch, userLoading }) => (
  <div className="App">

    <Header />

    <div className="App-block">
      {userLoading
        ? <Loading />
        : <div className="App-content">
            <LoginForm />
            {currentUser
              ? <div>
                  <pre>{JSON.stringify(currentUser, null, 2)}</pre>
                  <button onClick={() => refetch()}>Refetch Processo ID</button>
                </div>
              : 'Please log in!'}
          </div>}
    </div>

  </div>
);

App.propTypes = {
  currentUser: PropTypes.object,
  hasErrors: PropTypes.bool,
  refetch: PropTypes.func,
  userLoading: PropTypes.bool,
};

const GET_USER_DATA = gql`
  query getCurrentUser {
    user {
      emails {
        address
        verified
      }
      randomString
      _id
    }
  }
`;

const withData = graphql(GET_USER_DATA, {
  props: ({ data: { error, loading, user, refetch } }) => {
    if (loading) return { userLoading: true };
    if (error) return { hasErrors: true };

    return {
      currentUser: user,
      refetch,
    };
  },
});

export default withData(App);
