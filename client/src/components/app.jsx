import React from 'react';

import Navigation from './Navigation/'
import Landing from './Landing/'

import Colors from '../assets/styles/colors';
import Fonts from '../assets/styles/fonts';

import FontWoff from '../assets/fonts/main.woff';
import FontWoff2 from '../assets/fonts/main.woff2';
import FontTtf from '../assets/fonts/main.ttf';
import FontEot from '../assets/fonts/main.eot';

require('./app.css');

export default class App extends React.Component {
  render() {
    const style = {
      src: `url("${FontWoff}")`,
      // src: `url('${FontEot}?#iefix') format('embedded-opentype'),
      //      url('${FontWoff2}') format('woff2'),
      //      url('${FontWoff}') format('woff'),
      //      url('${FontTtf}') format('truetype')`,
    }

    const container = {
      height: 'auto',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };

    return (
      <main>
        <Navigation / >
        <div id='container' style={container}>
          <Landing / >
        </div>
      </main>
    );
  }
}
