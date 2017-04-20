import React from 'react';

import Colors from '../../../assets/styles/colors';

import BackgroundImg from '../../../assets/images/background.png';

export default class About extends React.Component {
  render() {
    let about = {
      backgroundColor: Colors.lightGray,
      minHeight: '100%',
      width: '100%',
      color: Colors.darkGray,
      background: `url(${BackgroundImg}) top left`,
      display: 'flex',
      justifyContent: 'center',
    };

    return (
      <section id="about" style={about}>
        <div>
          <h1 style={{margin: "0"}}>About Ipsum</h1>
        </div>
      </section>
    )
  }
}
