import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './index.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appWrap}>
          <Header />
          <Grid>
            {this.props.children}
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
