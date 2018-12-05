import React from 'react';
import { withApollo } from 'react-apollo';
import { Accounts } from 'meteor/std:accounts-ui';

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
});

const LoginForm = props => (
  <Accounts.ui.LoginForm
    onSignedInHook={() => props.client.resetStore()}
    onSignedOutHook={() => props.client.resetStore()}
    onPostSignUpHook={() => props.client.resetStore()}
  />
);

export default withApollo(LoginForm);
