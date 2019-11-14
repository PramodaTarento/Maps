import React, { Component } from 'react';
import './App.css';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Constants from './Constants/Constants';
import * as markJson from './JSON/markers.json';
import Details from './Components/Details';
// import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

// function Map() {
//   return (
//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={{ lat: 12.971599, lng: 77.594566 }}
//     >
//       <Marker position={{ lat: 12.971599, lng: 77.594566 }} />
//     </GoogleMap>)
// }

// const MapWrapped = withScriptjs(withGoogleMap(Map));

// function App() {
//   return (
//     <div className="App">
//       <MapWrapped
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`}
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `100%` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     </div>
//   );
// }

// export default App;
// //API Key - AIzaSyC9wFIHmP6Wj7ACnRs0HTjL8sZFhcOx40g

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        latitude: Constants.latitude,
        longitude: Constants.longitude,
        zoom: 10,
        width: '50vw',
        height: '100vh',
        markerState: false,
        vehicleCount: 0,
        battery: 0
      },
      vehicle: []
    }
  }

  async componentDidMount() {
    await this.setState({
      ...this.state.data,
      vehicle: markJson
    })
    console.log(this.state.vehicle);
  }

  onChangeViewport = (view) => {
    this.setState({
      data : view
    })
  }

  onMarkerClick = (point, e) => {
    e.preventDefault();
    this.setState({
      markerState: true,
      latitude: point.latitude,
      longitude: point.longitude,
      vehicleCount: point.vehicleCount,
      battery: point.battery
    })
  }

  render() {
    return (
      <div className="wrapper">
        <ReactMapGL {...this.state.data}
          mapboxApiAccessToken={Constants.AccessToken}
          mapStyle={Constants.mapStyle}
          onViewportChange={(view) => this.onChangeViewport(view)}
        >
          {
            markJson.markers.map((mark) => {
              return (
                <Marker
                  latitude={mark.latitude}
                  longitude={mark.longitude}
                >
                  <img src="\cycle.png" onClick={(e) => this.onMarkerClick(mark, e)} alt="Cycle" width="25px" height="40px" />
                </Marker>
              )
            })
          }

          {
            markJson.points.map((point) => {
              return (
                <Marker
                  latitude={point.latitude}
                  longitude={point.longitude}
                >
                  <img src="\Cycle-station.png" onClick={(e) => this.onMarkerClick(point, e)} alt="Parking" width="35px" height="50px" />
                </Marker>
              )
            })
          }

          {/* <Marker
        latitude = {12.971599}
        longitude = {77.594566}
        >
          <img src="\mapMarker.png" className="marker-btn"  onClick={(e) => this.onMarkerClick(e)} alt="MapMarker" width="20px" height="30px" /> 
        </Marker> */}

          {this.state.markerState &&
            <Popup
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              onClose={(e) => this.setState({ markerState: false })}
            >
              <div>
                <p>{Constants.Battery} : {this.state.battery}</p>
                {this.state.vehicleCount &&
                  <p>{Constants.VehicleCount} : {this.state.vehicleCount}</p>
                }
              </div>
            </Popup>
          }
        </ReactMapGL>

        <Details vehicle={markJson.points} />
      </div>
    )
  }
}

export default App;
