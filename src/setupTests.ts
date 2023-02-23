// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
require('jest-localstorage-mock');
import '@testing-library/jest-dom';
import { configure } from '@testing-library/dom';

process.env.REACT_APP_API_ENDPOINT = 'https://survey-api.nimblehq.co/api/v1';
process.env.REACT_APP_API_CLIENT_ID = 'client_id';
process.env.REACT_APP_API_CLIENT_SECRET = 'client_secret';

configure({
  testIdAttribute: 'data-test-id',
});
