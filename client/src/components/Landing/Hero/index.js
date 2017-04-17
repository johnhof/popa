import React from 'react';

import Colors from '../../../styles/colors.js'
import Fonts from '../../../styles/fonts.js'

export default class Landing extends React.Component {
  render() {
    let hero = {
      backgroundColor: Colors.yellow,
      height: '100%',
      width: '100%',
      color: Colors.white,
      fontSize: Fonts.large,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return (
      <section id="hero" style={hero}>
        <div>
          <h1 style={{
            margin:'0',
            fontSize: Fonts.custom(30),
            fontSpacing: '30px',
            fontWeight: 400
          }}>HOF.</h1>
        </div>
      </section>
    )
  }
}
