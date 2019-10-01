import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton
} from 'react-360';
import { connect, changeRoom } from './Store';




// BUTTON WAS SEPARATED INTO ITS OWN COMPONENT TO BE ABLE TO SET HOVER PROPERTY
class Button extends React.Component {
  state = {
    hover: false
  }
  clickHandler(roomSelection) {
    changeRoom(roomSelection)
  }

  render() {
    return (
      <VrButton style={this.state.hover ? styles.hover : styles.button}
        onEnter={() => this.setState({ hover: true })}
        onExit={() => this.setState({ hover: false })}
        onClick={() => this.clickHandler(this.props.room)}
      >
        <Text style={{ textAlign: 'center' }}>{this.props.room.split('_').join(' ')}</Text>
      </VrButton>
    );
  }
};


// BUTTONINFOPANEL CONTAINS ALL THE BUTTONS
export default class ButtonInfoPanel extends React.Component {

  createRoomButtons(adjacentRooms) {
    let rooms = adjacentRooms;
    let buttons = [];

    rooms.map(room => (
      buttons.push(<Button key={`${room}` + '-button'} room={room} />)
    ))

    return buttons;
  }
  render() {
    return (
      <View>
        <View style={styles.buttonPanel}>
          <Text style={styles.header}>Room Selection</Text>
          {this.createRoomButtons(this.props.adjacentRooms)}
        </View>
      </View>
    );
  }
};


// INFOPANEL DISPLAYS THE INFO ON THE RIGHT HAND SIDE 
export class InfoPanel extends React.Component {


  render() {
    return (
      <View>
        <View style={styles.infoPanel}>
          <Text style={styles.header} > Room Info </Text>
          <Text> {this.props.info} </Text>
        </View>
      </View>
    );
  }
};



// THIS IS CALLED FROM STORE.JS AND PASSES THE PROPS TO THE COMPONENTS
const ConnectedButtons = connect(ButtonInfoPanel)
const ConnectedHouseInfo = connect(InfoPanel)





// THIS ARE THE STYLES.
const styles = StyleSheet.create({
  infoPanel: {
    width: 400,
    height: 400,
    opacity: 0.8,
    backgroundColor: 'rgb(255, 200, 50)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
    borderRadius: 20
  },
  buttonPanel: {
    width: 400,
    height: 400,
    opacity: 0.8,
    backgroundColor: 'rgb(255, 200, 50)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    width: 200,
    backgroundColor: 'rgb(0, 0, 0)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
  },
  hover: {
    width: 200,
    backgroundColor: 'rgb(0, 45, 72)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});



AppRegistry.registerComponent('ConnectedButtons', () => ConnectedButtons);
AppRegistry.registerComponent('ConnectedHouseInfo', () => ConnectedHouseInfo);
