import React from 'react'
import { connect } from 'react-redux'
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
    }

    componentDidMount() {
        let apartments = this.props.apartments?this.props.apartments:[];
        apartments.map((item) => {
            item.isOpen = false;
        });
        this.props = {
            apartments: apartments,
        };
    }

    componentDidUpdate(nextProps) {
        console.log('in upd');
        console.log(nextProps);
        if (nextProps.apartments === this.props.apartments) return;

        let apartments = this.props.apartments?this.props.apartments:[];
        this.props = {
            apartments: apartments,
        }
    }

    onToggleOpen(key) {
        console.log('in event');
        console.log(key);
        let apartments = this.props.apartments;
        apartments.map((item) => {
            if (item.id === key) {
                item.isOpen = !item.isOpen;
            }
        });
        this.props = {
            apartments: apartments,
        }
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={9}
                defaultCenter={{ lat: 40.712775, lng: -74.005973 }}
            >
                {this.props.apartments.map((item) => {
                    return (
                        <Marker key={item.id}
                            position={{ lat: parseFloat(item.gpsLatitude), lng: parseFloat(item.gpsLongitude) }}
                            onClick={() => this.onToggleOpen(item.id)}
                        >
                            {item.isOpen && <InfoWindow onCloseClick={(item) => {
                                console.log('debug');
                                console.log(item);
                                this.onToggleOpen(item.id)
                            }}>
                                <div>"hello there"</div>
                            </InfoWindow>}
                        </Marker>
                    )
                })}
            </GoogleMap>
        );
    };
}

export default connect()(compose(withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAhHR36eR_47VlxsoUHkCuy8fjvqUPuN1U&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
}), withScriptjs, withGoogleMap)(ApartmentsMap));