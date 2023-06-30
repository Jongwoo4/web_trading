import React from 'react';
import GoogleMapReact from 'google-map-react';
import './../css/maps.css';
import MapPin from './MapPin.js';

const Map = ({ location, zoomLevel }) => (
    <div className="map">

        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBCb-byhZWwoBF92ptqaTQ5-GfNdmSpxlA' }}
                center={location}
                defaultZoom={zoomLevel}
            >
                <MapPin
                    lat={location.lat}
                    lng={location.lng}
                    //text={location.address}
                />
            </GoogleMapReact>
        </div>
    </div>
)

export default Map;