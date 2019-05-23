import React from 'react';
import { mount } from 'enzyme';
import Joker from './Joker';

const mocks = {
  waitForJoke: () => {
    return () => new Promise(()=>{
      // this doesnt resolve, so we can use it to test our state before the api call resolves...
    });
  },
  fetchJokeSuccessfully: (jokeData) => {
    return () => Promise.resolve(jokeData);
  },
  failToFetchJoke: (jokeFetchingError) => {
    return () => Promise.reject(jokeFetchingError);
  }
};

describe( 'Joker', () => {

  it('renders "Loading" while it fetches the joke', async() => {
      const mounted = mount(<Joker
          getJoke={mocks.waitForJoke()}
        />);

       return Promise
         .resolve(mounted)
         .then(mounted.update())
         .then(() => {
           expect(mounted.text()).toContain("Loading");
         });
  });


  it('renders the Joker component', async() => {
      const mounted = mount(<Joker
          getJoke={mocks.fetchJokeSuccessfully({value:'my mother in law'})}
        />);

       return Promise
         .resolve(mounted)
         .then(mounted.update())
         .then(() => {
           expect(mounted.text()).toContain("my mother in law");
         });
  });

  it('renders any errors that happen', async() => {
      const mounted = mount(<Joker
          getJoke={mocks.failToFetchJoke("Oops I did it again")}
        />);

       return Promise
         .resolve(mounted)
         .then(mounted.update())
         .then(() => {
           expect(mounted.text()).toContain("Oops I did it again");
         });
  });
});
