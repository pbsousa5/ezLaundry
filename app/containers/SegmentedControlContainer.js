'use strict';

import React, {Component} from 'react';
import {
  SegmentedControlIOS,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
} from 'react-native';

import SegmentedControl from '../components/SegmentedControl';
import UTL from '../utilities';

export default class SegmentedControlContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: ['Washing', 'Dryer'],
      selectedTab: 'Washing',
      bottomTab: this.props.bottomTab,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 }),
    }
  };

  componentDidMount() {
    console.log("SegmentedControlContainer didmount");
    UTL.fetchData(this.props.username, this.props.selectedTab).done((res) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res),
      });
      // Fetch data every 5 sec
      var timer = setInterval(() => UTL.fetchData(this.props.username, this.props.selectedTab), 5000);
      if (this.state.bottomTab === "Settings") {
        clearInterval(timer);
      }
    });
  };

  render() {
    console.log("SegmentedControlContainer", this.props);
    console.log("SegmentedControlContainer", this.state.dataSource);
    if (!this.state.dataSource) {
      return (
        <View><Text>Loading</Text></View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.scContainer}>
            <SegmentedControlIOS
              style={styles.segmentedControl}
              tintColor='#B0FFFE'
              values={this.state.values}
              selectedIndex={0}
              onValueChange={(val)=> {
                this.setState({
                  selectedTab: val
                })
              }}/>
          </View>
          <ScrollView style={styles.listContainer}>
            <SegmentedControl {...this.props} {...this.state} />
          </ScrollView>
        </View>
      );
    }
  };
}

  var styles = StyleSheet.create({
    container: {
      flex: 1
    },

    scContainer: {
      backgroundColor: '#4AC3C0'
    },

    listContainer: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#fff'
    },

    segmentedControl: {
      margin: 10,
      marginLeft: 30,
      marginRight: 30
    },

    text: {
      color: '#929292',
      fontSize: 15
    },
    thumb: {
      width: 60,
      height: 60
    },
    separator: {
      height: 1,
      backgroundColor: '#dddddd'
    },
    rowContainer: {
      flex: 1,
      flexDirection: 'row',
      padding: 15
    },
    centerContainer: {
      justifyContent: 'center'
    },
    machine_id: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 20
    },
    textContainer: {
      flex: 1,
      alignItems: 'flex-end'
    },
    remainTime: {
      fontSize: 30
    },
    end_time: {
      fontSize: 15,
      fontWeight: 'bold'
    },
    available: {
      fontSize: 25,
      fontWeight: 'bold',
      justifyContent: 'center'
    },
    wrapper: {
      backgroundColor: '#CCFFFF',
    }
  });
