import React from 'react';

import Hero from './Hero/';
import About from './About/';

export default class Landing extends React.Component {
  render() {
    return (
      <div id="landing" style={{ height: '100%' }}>
        <Hero />
        <About />
      </div>
    )
  }
}
