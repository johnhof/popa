import React from 'react';

import Colors from '../../../assets/styles/colors'
import Fonts from '../../../assets/styles/fonts'

export default class Hero extends React.Component {
  render() {
    const hero = {
      backgroundColor: Colors.yellow,
      minHeight: '75%',
      width: '60%',
      margin: 'auto',
      fontSize: Fonts.large,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const text = {
      margin:'0',
      borderBottom: '10px solid ' + Colors.lightBlue,
      color: Colors.lightGray,
      fontSize: Fonts.custom(20),
      letterSpacing: '30px',
      fontWeight: 600
    };

    return (
      <section id="hero" style={hero}>
        <div>
          <h1 style={text}>HOF.</h1>
        </div>
      </section>
    )
  }
}
