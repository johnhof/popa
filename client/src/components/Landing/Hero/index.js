import React from 'react';
import MediaQuery from 'react-responsive';

import Colors from '../../../assets/styles/colors'
import Fonts from '../../../assets/styles/fonts'
import Margins from '../../../assets/styles/margins';

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
      this.styles.container.marginTop = Margins[size];
      this.styles.container.marginBottom = Margins[size];
      this.styles.container.height = `calc(100vh - ${Margins.int(size) * 2}px)`;
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
        <div style={this.styles.hero}>
          <h1 style={this.styles.text}>
            <span style={{marginRight: '15px'}}>H</span>
            <span style={{marginLeft: '15px', marginRight: '15px'}}>O</span>
            <span style={{marginLeft: '15px'}}>F</span>
          </h1>
        </div>
      </section>
    )
  }
}
