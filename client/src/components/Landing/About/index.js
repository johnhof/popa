import React from 'react';

import Colors from '../../../assets/styles/colors';

import BackgroundImg from '../../../assets/images/background.png';

import MyImg from '../../../assets/images/me_outline.png';

export default class About extends React.Component {
  constructor (props) {
    super(props);
    this.styles = {
      about: {
        backgroundColor: Colors.lightGray,
        maxHeight: '100vh',
        color: Colors.darkGray,
      },
      container: {
        display: 'block',
        height: 'auto',
        width: '100%'
      },
      textContainer: {
        height: '100%',
        width: '50%',
        display: 'inline-block'
      },
      imageContainer: {
        height: '100%',
        width: '50%',
        overflowY: 'hidden',
        display: 'inline-block'
      }
    };
  }
  render() {
    return (
      <section id="about" style={this.styles.about}>
        <div style={this.styles.container}>
          <div style={this.styles.textContainer}>
          </div>
          <div style={this.styles.imageContainer}>
            <img src={MyImg} style={{width: '100%'}}></img>
          </div>
        </div>
      </section>
    )
  }
}
