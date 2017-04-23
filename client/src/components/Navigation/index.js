import React from 'react';

import Colors from '../../assets/styles/colors';

export default class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.state={isHidden:false};
    this.hideBar = this.hideBar.bind(this)
  }

  render() {
    let nav = {
      backgroundColor: Colors.lightGray,
      height: '50px',
      width: '100%',
      position: 'fixed',
      zIndex: 9999,
      // borderBottom: '1px solid ' + Colors.mediumGray
    };

    if (this.state.isHidden) nav.display = 'none';
    else nav.display = 'block';

    return (
      <section id="navigation" style={nav}>
      </section>
    )
  }

  hideBar(){
    let { isHidden } = this.state;
    if (window.scrollY <= 5 && !isHidden) this.setState({ isHidden: true });
    else if (window.scrollY > 5 && isHidden) this.setState({ isHidden: false })
    this.prev = window.scrollY;
  }

  componentDidMount(){
    window.addEventListener('scroll',this.hideBar);
  }

  componentWillUnmount(){
     window.removeEventListener('scroll',this.hideBar);
  }
}
