import React from 'react';

import Colors from '../../../assets/styles/colors';

import BackgroundImg from '../../../assets/images/background.png';

export default class About extends React.Component {
  constructor (props) {
    super(props);
    this.styles = {
      about: {
        backgroundColor: Colors.lightGray,
        minHeight: '100%',
        color: Colors.darkGray,
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
