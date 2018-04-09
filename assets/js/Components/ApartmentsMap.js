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

    componentWillMount() {
        let apartments = this.props.apartments?this.props.apartments:[];
        apartments.map((item) => {
            item.isOpen = false;
        });
        this.setState({
            apartments: apartments,
        });
    }

    componentDidUpdate(nextProps) {
        if (nextProps.apartments === this.state.apartments) return;

        let apartments = this.props.apartments?this.props.apartments:[];
        this.setState({
            apartments: apartments,
        })
    }

    onToggleOpen(key) {
        let apartments = this.props.apartments;
        apartments.map((item) => {
            if (item.id === key) {
                item.isOpen = !item.isOpen;
            }
        });
        this.setState({
            apartments: apartments,
        });
    }

    renderMarkers() {
        let markers = this.state.apartments.map((item) => {
            return (
                <Marker key={item.id}
                        position={{ lat: parseFloat(item.gpsLatitude), lng: parseFloat(item.gpsLongitude) }}
                        onClick={() => this.onToggleOpen(item.id)}
                >
                    {item.isOpen && <InfoWindow onCloseClick={() => {
                        this.onToggleOpen(item.id)
                    }}>
                        <div>{item.roomCount} rooms({item.area}m), for {item.pricePerMonth}$/month</div>
                    </InfoWindow>}
                </Marker>
            )
        });
        return (
            <div>{markers}</div>
        )
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={9}
                defaultCenter={{ lat: 40.712775, lng: -74.005973 }}
            >
                {this.renderMarkers()}
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