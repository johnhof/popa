import React from 'react';
import MediaQuery from 'react-responsive';

import Colors from '../../../static/styles/colors'
import Fonts from '../../../static/styles/fonts'
import Margins from '../../../static/styles/margins';

import SizeEmitter from '../../../lib/SizeEmitter';

export default class Hero extends React.Component {
  constructor (props) {
    super(props);
    this.sizeEmitter = new SizeEmitter();
    this.styles = {
      container: {},
      hero: {
        backgroundColor: Colors.yellow,
        height: '100%',
        fontSize: Fonts.large,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        borderBottom: '10px solid ' + Colors.lightGray,
        color: Colors.darkGray,
        fontWeight: 600
      }
    };

    let applySize = (size) => {
      let margin = size === 'small' ? 'none' : size;
      this.styles.container.paddingTop = Margins[margin];
      this.styles.container.paddingBottom = Margins[margin];
      this.styles.container.height = `100%`;
      this.setState({ size });
    };
    this.sizeEmitter.on('small', () => {
      this.styles.text.fontSize = Fonts.custom(8);
      applySize('small');
    });
    this.sizeEmitter.on('medium', () => {
      this.styles.text.fontSize = Fonts.custom(15);
      applySize('medium');
    });
    this.sizeEmitter.on('large', () => {
      this.styles.text.fontSize = Fonts.custom(18);
      applySize('large');
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
      <section id="hero" style={this.styles.container}>
        <a style={this.styles.hero} href="https://linkedin.com/in/johnhofrichter">
          <h1 style={this.styles.text}>
            <span style={{marginRight: '15px'}}>H</span>
            <span style={{marginLeft: '15px', marginRight: '15px'}}>O</span>
            <span style={{marginLeft: '15px'}}>F</span>
          </h1>
        </a>
      </section>
    )
  }
}
