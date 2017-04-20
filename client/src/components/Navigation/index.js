import React from 'react';

import Colors from '../../assets/styles/colors';

export default class Navigation extends React.Component {
  render() {
    let nav = {
      backgroundColor: Colors.lightGray,
      height: '50px',
      width: '100%',
      position: 'fixed',
      // borderBottom: '1px solid ' + Colors.mediumGray
    };

    return (
      <section id="navigation" style={nav}>
      </section>
    )
  }
}
