import React from 'react';

import Margins from '../../../assets/styles/margins';
import Colors from '../../../assets/styles/colors';
import Fonts from '../../../assets/styles/fonts';

import SizeEmitter from '../../../lib/SizeEmitter';

import MyImg from '../../../assets/images/me_outline.png';

export default class Timeline extends React.Component {
  constructor (props) {
    super(props);
    this.sizeEmitter = new SizeEmitter();
    this.styles = {
      container: {
        maxHeight: '100vh',
        marginTop: '96px',
        overflowY: 'hidden',
        marginBottom: Margins.medium,
      },
      header: {
        padding: '12px',
        margin: 'auto',
        width: '30%',
        minWidth: '300px',
        fontSize: Fonts.custom(3),
        textAlign: 'center',
        color: Colors.blue
      },
      entry: {
        padding: '24px',
        fontSize: Fonts.normalLarge,
        display: 'flex',
        textAlign: 'center'
      },
      titleLeft: {
        flex: 1,
        fontSize: Fonts.large,
        textAlign: 'right',
      },
      subtitleRight: {
        color: Fonts.gray,
        textAlign: 'left'
      },
      titleRight: {
        flex: 1,
        fontSize: Fonts.large,
        textAlign: 'left',
      },
      subtitleLeft: {
        color: Fonts.gray,
        textAlign: 'right'
      },
      sectionLeft: {
        flex: 1,
        padding: '24px',
        borderRight: '2px solid ' + Colors.blue,
      },
      sectionRight: {
        flex: 1,
        padding: '24px',
        borderLeft: '2px solid ' + Colors.blue,
      }
    };

    this.sizeEmitter.on('small', () => {
    });
    this.sizeEmitter.on('medium', () => {
    });
    this.sizeEmitter.on('large', () => {
    });
    this.sizeEmitter.refresh();
  }

  componentDidMount () {
    window.addEventListener('resize', () => this.sizeEmitter.refresh(), false);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', () => this.sizeEmitter.refresh());
  }

  render() {
    return (
      <section id="timeline" style={this.styles.container}>
        <div style={this.styles.header}>
          Experience
        </div>
        <div style={this.styles.entry}>
          <div style={this.styles.sectionLeft}>
            <p style={this.styles.titleLeft}>
              Hart Inc.
            </p>
            <p style={this.styles.subtitleLeft}>
              2015 - Current
            </p>
          </div>
          <div style={this.styles.sectionRight}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.
          </div>
        </div>
        <div style={this.styles.entry}>
          <div style={this.styles.sectionLeft}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.
          </div>
          <div style={this.styles.sectionRight}>
            <p style={this.styles.titleRight}>
              Branding Brand Inc.
            </p>
            <p style={this.styles.subtitleRight}>
            2013 - 2015
            </p>
          </div>
        </div>
        <div style={this.styles.entry}>
          <div style={this.styles.sectionLeft}>
            <p style={this.styles.titleLeft}>
              Department of Defence
            </p>
            <p style={this.styles.subtitleLeft}>
              2012
            </p>
          </div>
          <div style={this.styles.sectionRight}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.
          </div>
        </div>
        <div style={this.styles.entry}>
          <div style={this.styles.sectionLeft}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.
          </div>
          <div style={this.styles.sectionRight}>
            <p style={this.styles.titleRight}>
              Ansys Inc.
            </p>
            <p style={this.styles.subtitleRight}>
            2010 - 2012
            </p>
          </div>
        </div>
      </section>
    )
  }
}
