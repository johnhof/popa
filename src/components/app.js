import React from 'react';

import Navigation from './Navigation/'
import Landing from './Landing/'

import Colors from '../static/styles/colors';
import Fonts from '../static/styles/fonts';
import Margins from '../static/styles/margins';

import FontWoff from '../static/fonts/main.woff';
import FontWoff2 from '../static/fonts/main.woff2';
import FontTtf from '../static/fonts/main.ttf';
import FontEot from '../static/fonts/main.eot';

import SizeEmitter from '../lib/SizeEmitter';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state={size:false};
    this.sizeEmitter = new SizeEmitter();
    this.styles = {
      main: {
        height: '100%',
      },
      container: {
        height: '100%',
      }
    };

    this.sizeEmitter.on('small', () => {
      this.styles.container.marginRight = Margins.none
      this.styles.container.marginLeft = Margins.none;
      this.setState({ size: 'small' });
    });
    this.sizeEmitter.on('medium', () => {
      this.styles.container.marginRight = Margins.medium;
      this.styles.container.marginLeft = Margins.medium;
      this.setState({ size: 'medium' });
    });
    this.sizeEmitter.on('large', () => {
      this.styles.container.marginRight = Margins.large;
      this.styles.container.marginLeft = Margins.large;
      this.setState({ size: 'large' });
    });
    this.sizeEmitter.refresh();
  }

  componentDidMount () {
    window && window.addEventListener('resize', () => this.sizeEmitter.refresh(), false);
  }

  componentWillUnmount () {
    window && window.removeEventListener('resize', () => this.sizeEmitter.refresh());
  }

  render() {
    return (
      <main style={this.styles.main}>
        <div id='container' key={this.sizeEmitter} style={this.styles.container}>
          <Landing / >
        </div>
      </main>
    );
  }
}
