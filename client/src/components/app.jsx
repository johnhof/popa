import React from 'react';

import Landing from './Landing/'

import Colors from '../assets/styles/colors';
import Fonts from '../assets/styles/fonts';

import FontWoff from '../assets/fonts/main.woff';
import FontWoff2 from '../assets/fonts/main.woff2';
import FontTtf from '../assets/fonts/main.ttf';
import FontEot from '../assets/fonts/main.eot';

export default class App extends React.Component {
  render() {
    const style = {
      fontFamily: "'nowayregular', helvetica",
      // src: url('~assets/fonts/main.ttf');
      // src: `url('${FontEot}?#iefix') format('embedded-opentype'),
      //      url('${FontWoff2}') format('woff2'),
      //      url('${FontWoff}') format('woff'),
      //      url('${FontTtf}') format('truetype')`,
      fontSize: Fonts.base,
      fontWeight: 'normal',
      fontStyle: 'normal',
      width: '100%',
      height: '100%',
      backgroundColor: Colors.lightGray,
      margin: 0,
      padding: 0,
    }
    console.log(style)
    return (
      <div style={style}>
        <Landing / >
      </div>
    );
  }
}
