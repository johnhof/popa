import React from 'react';

import Navigation from './Navigation/'
import Landing from './Landing/'

import Colors from '../assets/styles/colors';
import Fonts from '../assets/styles/fonts';

import FontWoff from '../assets/fonts/main.woff';
import FontWoff2 from '../assets/fonts/main.woff2';
import FontTtf from '../assets/fonts/main.ttf';
import FontEot from '../assets/fonts/main.eot';

import MediaQuery from '../lib/MediaQuery';

require('./app.css');

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state={size:false};
    this.mediaQuery = new MediaQuery();
    this.styles = {
      main: {
        src: `url("${FontWoff}")`,
        // src: `url('${FontEot}?#iefix') format('embedded-opentype'),
        //      url('${FontWoff2}') format('woff2'),
        //      url('${FontWoff}') format('woff'),
        //      url('${FontTtf}') format('truetype')`,
      },
      container: {
        height: 'auto',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    };

    this.mediaQuery.on('small', () => {
      this.styles.container.margin = '0px';
      this.setState({ size: 'small' });
    });
    this.mediaQuery.on('medium', () => {
      this.styles.container.margin = '24px';
      this.setState({ size: 'medium' });
    });
    this.mediaQuery.on('large', () => {
      this.styles.container.margin = '48px';
      this.setState({ size: 'large' });
    });
    this.mediaQuery.refresh();
  }

  componentDidMount () {
    window && window.addEventListener('resize', () => this.mediaQuery.refresh(), false);
  }

  componentWillUnmount () {
    window && window.removeEventListener('resize', () => this.mediaQuery.refresh());
  }

  render() {
    return (
      <main style={this.styles.main}>
        <Navigation / >
        <div id='container' key={this.mediaQuery} style={this.styles.container}>
          <Landing / >
        </div>
      </main>
    );
  }
}
