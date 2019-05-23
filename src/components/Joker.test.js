import React from 'react';
import { mount } from 'enzyme';
import Joker from './Joker';

const waitForJoke = () => {
  return () => new Promise(()=>{
    // no way of resolving this, it will just hang around as a promise...
  });
}

const fetchJokeSuccessfully = (jokeData) => {
  return () => Promise.resolve(jokeData);
}

const failToFetchJoke = (jokeFetchingError) => {
  return () => Promise.reject(jokeFetchingError);
}

it('renders "Loading" while it fetches the joke', async() => {
    const mounted = mount(<Joker
        getJoke={waitForJoke()}
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
        getJoke={fetchJokeSuccessfully({value:'my mother in law'})}
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
        getJoke={failToFetchJoke("Error")}
      />);

     return Promise
       .resolve(mounted)
       .then(mounted.update())
       .then(() => {
         expect(mounted.text()).toContain("Error");
       });
});
