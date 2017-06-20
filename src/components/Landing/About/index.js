import React from 'react';

import Margins from '../../../static/styles/margins';
import Colors from '../../../static/styles/colors';
import Fonts from '../../../static/styles/fonts';

import SizeEmitter from '../../../lib/SizeEmitter';

import MyImg from '../../../static/images/me_outline.png';

export default class About extends React.Component {
  constructor (props) {
    super(props);
    this.sizeEmitter = new SizeEmitter();
    this.styles = {
      container: {
        maxHeight: '100vh',
        overflowY: 'hidden',
        marginBottom: Margins.medium,
        display: 'flex',
        flexDirection: 'row'
      },
      textCell: {
        flex: 2,
        padding: '24px',
        fontSize: Fonts.normalLarge,
        lineHeight: '1.5',
        paddingTop: '10%',
        textAlign: 'center'
      },
      imageCell: {
        // backgroundColor: Colors.darkGray,
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
        // filter: 'invert(100%)',
      }
    };

    this.sizeEmitter.on('small', () => {
      this.styles.container.marginBottom = Margins.none;
      this.styles.container.display = 'block';
      this.styles.image.width = '100%';
    });
    this.sizeEmitter.on('medium', () => {
      this.styles.container.marginBottom = Margins.medium;
      this.styles.container.display = 'flex';
      this.styles.image.width = '50%';
    });
    this.sizeEmitter.on('large', () => {
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
        <div style={this.styles.textCell}>
          <p style={{fontSize: Fonts.large, fontWeight: '600'}}>
            Hi, I'm <span style={this.styles.name}>John Hofrichter</span>.
          </p>
          <p style={{maxWidth: '700px', margin: 'auto'}}>
            I'm a Software Engineer who loves working on
            projects which make a positive impact on peoples lives.
            I find all facets of software development fascinating, whether it be
            implementing long lasting scaleable code bases, hardening existing projects,
            or hacking together a solution for a demo.
          </p>
        </div>
        <div style={this.styles.imageCell}>
          <div style={this.styles.image}>
            <img src={MyImg} style={{width: '100%'}}></img>
          </div>
        </div>
      </section>
    )
  }
}
