import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import Joker from './components/Joker';
import fetchJokes from './api/chucknorris.io';

it('renders the Joker component, using chucknorris.io to populate the data', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.contains(<Joker getJoke={fetchJokes} />)).toBe(true);
});
