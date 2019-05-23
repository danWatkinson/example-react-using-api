import React from 'react';
import { mount } from 'enzyme';
import Joker from './Joker';

const mocks = {
  waitForJoke: () => {
    return () => new Promise(()=>{
      // this doesnt resolve, so we can use it to test our state before the api call resolves...
    });
  },
  fetchJokeSuccessfully: (jokes) => {
    const stub = jest.fn();

    jokes.forEach( (joke) => {
      stub.mockReturnValueOnce(Promise.resolve(joke))
    })

    return stub;
  },
  failToFetchJoke: (jokeFetchingError) => {
    return () => Promise.reject(jokeFetchingError);
  }
};

describe( 'Joker', () => {

  it('renders "Loading" while it fetches the joke', async() => {
      const mounted = mount(<Joker getJoke={mocks.waitForJoke()} />);

      await mounted.update();
      expect(mounted.text()).toContain("Loading");
  });


  it('renders the joke', async() => {
      const mounted = mount(<Joker getJoke={mocks.fetchJokeSuccessfully([{value:'my mother in law'}])} />);

      await mounted.update();
      expect(mounted.text()).toContain("my mother in law");
  });

  it('renders any errors that happen', async() => {
      const mounted = mount(<Joker
          getJoke={mocks.failToFetchJoke("Oops I did it again")}
        />);

      await mounted.update();
      expect(mounted.text()).toContain("Oops I did it again");
  });

  it('renders another joke when you click "load another"', async() => {
    const jokeSupplier = mocks.fetchJokeSuccessfully([
      {value:'my mother in law'},
      {value: 'an englishman, an irishman and a scotsman'}
    ]);

    const mounted = await mount(<Joker getJoke={jokeSupplier} />);
    await mounted.update();

    expect(mounted.text()).toContain("my mother in law");

    await mounted.find('button').simulate('click');
    expect(mounted.text()).toContain("an englishman, an irishman and a scotsman");
  });

});
