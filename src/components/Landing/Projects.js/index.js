import React from 'react';

import Colors from '../../../static/styles/colors';

import BackgroundImg from '../../../static/images/background.png';

export default class About extends React.Component {
  constructor (props) {
    super(props);
    this.styles = {
      about: {
        backgroundColor: Colors.lightGray,
        minHeight: '100%',
        width: '100%',
        color: Colors.darkGray,
        background: `url(${BackgroundImg}) top left`,
        display: 'flex',
        justifyContent: 'center',
      }
    };
  }

  render() {
    return (
      <section id="about" style={this.styles.about}>
        <div>
          <h1 style={{margin: "0"}}>About Ipsum</h1>
        </div>
      </section>
    )
  }
}
