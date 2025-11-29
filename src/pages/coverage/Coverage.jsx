import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [23.6850, 90.3563]
    const serviceCenters = useLoaderData();
    const mapRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value;
        console.log(location);
        const district = serviceCenters.find(single => single.district.toLowerCase().includes(location.toLowerCase()));
        if(district){
            const coordinate = [district.latitude,district.longitude];
            console.log(coordinate);
            mapRef.current.flyTo(coordinate,13)
        }
    }
    // console.log(serviceCenters)
    return (
        <div className='bg-white rounded-xl mt-5 mb-15 p-5 md:p-12'>
            <h1 className='text-4xl font-semibold'>We are available in 64 districts</h1>
            {/* search */}
            <div className='my-8'>
                <form onSubmit={handleSearch}>
                    <label className="input rounded-2xl">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                            >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" name='location' className="grow " placeholder="Search here" />
                    </label>
                </form>
            </div>
            <hr className='border border-gray-100'/>
            {/* map */}
            <div className='w-full h-[900px]'>
                <h2 className='my-10 text-xl font-semibold'>We deliver almost all over Bangladesh</h2>
                <MapContainer center={position} zoom={8} scrollWheelZoom={false} className='w-full h-[800px]' ref={mapRef}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        serviceCenters.map((center,index) => 
                            <Marker key={index} position={[center.latitude,center.longitude]}>
                                <Popup>
                                    <strong>{center.district}</strong> <br /> 
                                    Servive Area: {center.covered_area.join(', ')}
                                </Popup>
                            </Marker>
                        )
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;