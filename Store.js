// STORES KEEPS TRACK OF APPLICATION AND WHAT TO RENDER

import React from 'react'
import house from "./houseData";
import { Environment, asset } from "react-360"

const State = {
    room: house.House.roomName,
    info: house.House.info,
    adjacentRooms: house.House.adjacentRooms
}

const listeners = new Set();

function updateComponents() {
    for (const cb of listeners.values()) {
        cb();
    }
}
///THIS FUNCTION IS TRIGGERED WHEN THE BUTTON IS CLICKED
// CHANGE ROOM CHANGES THE DATA THAT WILL BE PASSED TO SET STATE
export function changeRoom(roomSelection) {
    let roomName = roomSelection;
    State.room = roomName
    State.info = house[`${roomName}`].info
    State.adjacentRooms = house[`${roomName}`].adjacentRooms
    Environment.setBackgroundImage(asset(`./360_${house[`${roomName}`].img}`));

    updateComponents();

}

// THIS RETURNS THE GIVEN COMPONENTS WITH PROPS
export function connect(Component) {
    return class Wrapper extends React.Component {
        state = {
            room: State.room,
            info: State.info,
            adjacentRooms: State.adjacentRooms
        }

        // LISTENERS SETS STATE
        _listener = () => {
            this.setState({
                room: State.room,
                info: State.info,
                adjacentRooms: State.adjacentRooms
            })
        }

        // LISTENERS CALLED HERE
        componentDidMount() {
            listeners.add(this._listener);
        }

        render() {
            return (
                <Component
                    {...this.props}
                    room={this.state.room}
                    info={this.state.info}
                    adjacentRooms={this.state.adjacentRooms}
                />
            )
        }
    }
}