import React from 'react';

import Margins from '../../../assets/styles/margins';
import Colors from '../../../assets/styles/colors';
import Fonts from '../../../assets/styles/fonts';

import SizeEmitter from '../../../lib/SizeEmitter';

import MyImg from '../../../assets/images/me_outline.png';

export default class About extends React.Component {
  constructor (props) {
    super(props);
    this.sizeEmitter = new SizeEmitter();
    this.styles = {
      container: {
        maxHeight: '100vh',
        overflowY: 'hidden',
        marginBottom: Margins.medium
      },
      header: {
        width: '60%',
        color: Colors.lightGray,
        padding: '24px',
        fontSize: Fonts.xLarge,
        backgroundColor: Colors.blue,
      },
      body: {
        display: 'flex',
       flexDirection: 'row'
      },
      textCell: {
        flex: 2,
        padding: '24px',
        fontSize: Fonts.normalLarge
      },
      imageCell: {
        backgroundColor: Colors.darkGray,
        height: '100%',
        maxHeight: '600px',
        minHeight: '400px',
        flex: 2,
        top: 0,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      },
      image: {
        width: '50%',
        maxHeight: '600px',
        filter: 'invert(100%)',
      }
    };

    this.sizeEmitter.on('small', () => {
      this.styles.container.marginBottom = Margins.none;
      this.styles.image.width = '100%';
      this.styles.header.width = '100%';
      this.styles.body.display = 'block';
    });
    this.sizeEmitter.on('medium', () => {
      this.styles.container.marginBottom = Margins.medium;
      this.styles.image.width = '50%';
      this.styles.header.width = '60%';
      this.styles.body.display = 'flex';
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
        <div style={{display: 'flex'}}>
          <div style={this.styles.header}>
            About me
          </div>

          <div>
          </div>
        </div>
        <div style={this.styles.body}>
          <div style={this.styles.textCell}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div style={this.styles.imageCell}>
            <div style={this.styles.image}>
              <img src={MyImg} style={{width: '100%'}}></img>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
