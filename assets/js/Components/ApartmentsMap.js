import React from 'react'
const { compose, withProps, withStateHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} = require("react-google-maps");

class ApartmentsMap extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    onToggleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                <Marker
                    position={{ lat: -34.397, lng: 150.644 }}
                    onClick={() => this.onToggleOpen()}
                >
                    {this.state.isOpen && <InfoWindow onCloseClick={() => this.onToggleOpen()}>
                        <div>"hello there"</div>
                    </InfoWindow>}
                </Marker>
            </GoogleMap>
        );
    };
}

export default compose(withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAhHR36eR_47VlxsoUHkCuy8fjvqUPuN1U&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
}), withScriptjs, withGoogleMap)(ApartmentsMap);