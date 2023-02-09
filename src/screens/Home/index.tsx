import React from 'react';

import logo from 'assets/images/logo.svg';

const HomeScreen = (): JSX.Element => {
  return (
    <div className="app">
      <header>
        <img src={logo} alt="logo" />
        <p data-test-id="app-main-heading">React Survey Application</p>
      </header>
    </div>
  );
};

export default HomeScreen;
