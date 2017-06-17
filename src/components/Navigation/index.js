import React from 'react';

import Colors from '../../assets/styles/colors';

export default class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.state={isHidden:true};
    this.hideBar = this.hideBar.bind(this);
    this.style = {
      nav: {
        backgroundColor: Colors.lightGray,
        width: '100%',
        position: 'fixed',
        zIndex: 1,
        top: 0,
        transition: 'height 200ms ease-in'
      }
    }
  }

  render() {
    if (this.state.isHidden) {
      this.style.nav.height = 0;
      this.style.nav.overflow = 'hidden';
    } else {
      this.style.nav.height = '50px';
    }

    return (
      <section id="navigation" style={this.style.nav}>
      </section>
    )
  }

  hideBar(){
    let { isHidden } = this.state;
    if (window.scrollY <= 10 && !isHidden) this.setState({ isHidden: true });
    else if (window.scrollY > 10 && isHidden) this.setState({ isHidden: false });
    this.prev = window.scrollY;
  }

  componentDidMount(){
    window.addEventListener('scroll',this.hideBar);
  }

  componentWillUnmount(){
     window.removeEventListener('scroll',this.hideBar);
  }
}
