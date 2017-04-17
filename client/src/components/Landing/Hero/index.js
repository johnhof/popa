import React from 'react';

import Colors from '../../../assets/styles/colors'
import Fonts from '../../../assets/styles/fonts'

export default class Hero extends React.Component {
  render() {
    const hero = {
      backgroundColor: Colors.yellow,
      minHeight: '100%',
      width: '100%',
      color: Colors.white,
      fontSize: Fonts.large,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const text = {
      margin:'0',
      borderBottom: '10px solid ' + Colors.mediumGray,
      fontSize: Fonts.custom(25),
      letterSpacing: '30px',
      fontWeight: 600
    };

    return (
      <section id="hero" style={hero}>
        <div>
          <h1 style={text}>HOF</h1>
        </div>
      </section>
    )
  }
}
