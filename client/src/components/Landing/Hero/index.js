import React from 'react';
import MediaQuery from 'react-responsive';

import Colors from '../../../assets/styles/colors'
import Fonts from '../../../assets/styles/fonts'

export default class Hero extends React.Component {
  constructor (props) {
    super(props);
    this.styles = {
      hero: {
        backgroundColor: Colors.blue,
        height: '100%',
        fontSize: Fonts.large,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        margin:'0',
        borderBottom: '10px solid ' + Colors.lightGray,
        color: Colors.darkGray,
        fontSize: Fonts.custom(18),
        letterSpacing: '30px',
        fontWeight: 600
      }
    };
  }

  render() {
    return (
      <section id="hero" style={this.styles.hero}>
        <div>
          <h1 style={this.styles.text}>HOF</h1>
        </div>
      </section>
    )
  }
}
