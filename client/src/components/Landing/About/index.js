import React from 'react';

import Colors from '../../../assets/styles/colors';

import SizeEmitter from '../../../lib/SizeEmitter';

import MyImg from '../../../assets/images/me_outline.png';

export default class About extends React.Component {
  constructor (props) {
    super(props);
    this.sizeEmitter = new SizeEmitter();
    this.styles = {
      container: {
        maxHeight: '100vh',
        overflowY: 'hidden'
      },
      split: {
        height: '100%',
        width: '50%',
        display: 'inline-block'
      },
      image: {
        float: 'right',
        margin: 'auto',
        width: '75%'
      }
    };

    this.sizeEmitter.on('small', () => {
      this.styles.image.width = '100%';
      this.styles.split.width = '100%';
    });
    this.sizeEmitter.on('medium', () => {
      this.styles.image.width = '75%';
      this.styles.split.width = '50%';
    });
    this.sizeEmitter.refresh();
  }

  componentDidMount () {
    window.addEventListener('resize', () => this.sizeEmitter.refresh(), false);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', () => this.sizeEmitter.refresh());
  }

  render() {
    return (
      <section id="about" style={this.styles.container}>
        <div style={this.styles.split}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div style={this.styles.split}>
          <img src={MyImg} style={this.styles.image}></img>
        </div>
      </section>
    )
  }
}
