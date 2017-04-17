import React from 'react';

import Colors from '../../../assets/styles/colors'
import Fonts from '../../../assets/styles/fonts'

export default class Hero extends React.Component {
  render() {
    let hero = {
      backgroundColor: Colors.yellow,
      minHeight: '100%',
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
            letterSpacing: '30px',
            fontWeight: 600
          }}>HOF</h1>
        </div>
      </section>
    )
  }
}
