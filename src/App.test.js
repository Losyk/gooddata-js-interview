// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('should display error message (alert) when month input is invalid', () => {
  const div = document.createElement('div');
  const output = ReactDOM.render(<App />, div);

  window.alert = jest.fn();

  output.changeMonth({ value: 'Bar' });
  expect(window.alert).toHaveBeenCalledWith('Invalid month option.');
}
);

it('should not display error message (alert) when month is valid', () => {
  const div = document.createElement('div');
  const output = ReactDOM.render(<App />, div);

  window.alert = jest.fn();

  output.changeMonth({ value: 'June' });
  expect(window.alert).not.toHaveBeenCalledWith;

  output.setState.toHaveBeenCalled;
});

// TODO: More unit tests. I have only added two tests as a demonstration.
//       All possible menu options for month and year dropdowns should be checked.
//       And also some invalid combination (like in second test).
//
//	 Another methods returning some configuration (getViewBy, getMonthFilter, ...)
//	 should be also checked.
