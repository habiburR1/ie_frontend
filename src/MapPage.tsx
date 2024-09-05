import React, { useEffect, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapPage.css';  // Import the CSS for styling
// @ts-ignore
import Header from "./Header.tsx";
// @ts-ignore
import Footer from "./Footer.tsx";

mapboxgl.accessToken = 'pk.eyJ1IjoiYWJiaXNoZWsiLCJhIjoiY2x6Y2trYzY5MGNucTJqcHFnMzVhNnhvcyJ9.ruwp1n7aBJwok0LXQyyRNQ';

const MapPage: React.FC = () => {
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [centres, setCentres] = useState([]);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]); // Store markers
    const [selectedWasteType, setSelectedWasteType] = useState<string>('');  // Track selected waste type
    const [selectedPostcode, setSelectedPostcode] = useState<string>(''); // Track selected postcode

    useEffect(() => {
        // Initialize the map
        const mapInstance = new mapboxgl.Map({
            container: 'map',  // The ID of the div where the map will be rendered
            style: 'mapbox://styles/mapbox/streets-v11',  // Mapbox style URL
            center: [144.9631, -37.8136],  // Melbourne's default center (Longitude, Latitude)
            zoom: 12,  // Initial zoom level
        });

        mapInstance.addControl(new mapboxgl.NavigationControl()); // Optional: Adds zoom and rotation controls

        mapInstance.on('load', () => {
            setMap(mapInstance);
        });

        return () => mapInstance.remove();  // Cleanup on component unmount
    }, []);

    useEffect(() => {
        // Fetch centres data when the component mounts
        const fetchCentres = async () => {
            try {
                const url = `http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}/api/maps/centres/`;
                const response = await axios.get(url);
                setCentres(response.data);
                if (map) {
                    updateMapMarkers(response.data, map);  // Initialize markers with all centres
                }
            } catch (error) {
                console.error('Error fetching centres:', error);
            }
        };

        if (map) {
            fetchCentres();
        }
    }, [map]);

    useEffect(() => {
        if (map) {
            const filteredCentres = centres.filter((centre) => {
                const matchesWasteType = selectedWasteType ? centre.waste.waste_type === selectedWasteType : true;
                const matchesPostcode = selectedPostcode ? isWithin3Km(selectedPostcode, centre) : true;
                return matchesWasteType && matchesPostcode;
            });

            updateMapMarkers(filteredCentres, map);
            updateMapCenter(map);
        }
    }, [selectedWasteType, selectedPostcode, centres, map]);

    const updateMapMarkers = (centres: any[], mapInstance: mapboxgl.Map) => {
        // Remove existing markers from the map
        markers.forEach(marker => marker.remove());
        setMarkers([]); // Clear the state holding markers

        // Add new markers based on filtered centres
        const newMarkers = centres.map((centre) => {
            const latitude = parseFloat(centre.latitude);
            const longitude = parseFloat(centre.longitude);

            if (!isNaN(latitude) && !isNaN(longitude)) {
                const marker = new mapboxgl.Marker()
                    .setLngLat([longitude, latitude])
                    .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`${centre.name} (${centre.waste.waste_type})`))
                    .addTo(mapInstance);
                return marker;
            } else {
                console.error(`Invalid coordinates for centre ${centre.name}`);
                return null;
            }
        }).filter(marker => marker !== null) as mapboxgl.Marker[];

        setMarkers(newMarkers); // Update state with new markers
    };

    const updateMapCenter = (mapInstance: mapboxgl.Map) => {
        if (!selectedPostcode) return;

        const selectedOption = document.querySelector(`#postcode option[value="${selectedPostcode}"]`) as HTMLOptionElement;
        const lat = parseFloat(selectedOption.getAttribute('data-lat') || '0');
        const lng = parseFloat(selectedOption.getAttribute('data-lng') || '0');

        if (lat && lng) {
            mapInstance.flyTo({
                center: [lng, lat],
                zoom: 14,  // You can adjust this value based on your preference
            });
        }
    };

    const isWithin3Km = (postcode: string, centre: any) => {
        const selectedOption = document.querySelector(`#postcode option[value="${postcode}"]`) as HTMLOptionElement;
        const lat1 = parseFloat(selectedOption.getAttribute('data-lat') || '0');
        const lng1 = parseFloat(selectedOption.getAttribute('data-lng') || '0');
        const lat2 = parseFloat(centre.latitude);
        const lng2 = parseFloat(centre.longitude);

        return calculateDistance(lat1, lng1, lat2, lng2) <= 3;
    };

    const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLng = (lng2 - lng1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
    };

    return (
        <>
            <Header />

            <div className="page-container">
                {/* Filter container */}
                <div className="filter-container">
                    <div>
                        <label htmlFor="waste_type">Filter by Waste Type:</label>
                        <select
                            name="waste_type"
                            id="waste_type"
                            value={selectedWasteType}
                            onChange={(e) => setSelectedWasteType(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="Batteries">Batteries</option>
                            <option value="Electrical Appliances">Electrical Appliances</option>
                            <option value="Mattresses">Mattresses</option>
                            <option value="Plastic Bottles and Containers">Plastic Bottles and Containers</option>
                            <option value="Soft Plastic">Soft Plastic</option>
                            <option value="Clothing and Textile">Clothing and Textile</option>
                            <option value="Paint">Paint</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="postcode">Filter by Postcode:</label>
                        <select
                            name="postcode"
                            id="postcode"
                            value={selectedPostcode}
                            onChange={(e) => setSelectedPostcode(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="3000" data-lat="-37.8136" data-lng="144.9631">3000 - Melbourne CBD</option>
                            <option value="3002" data-lat="-37.8124" data-lng="144.9750">3002 - East Melbourne</option>
                            <option value="3003" data-lat="-37.8083" data-lng="144.9475">3003 - West Melbourne</option>
                            <option value="3004" data-lat="-37.8141" data-lng="144.9715">3004 - Melbourne (St Kilda Road area)</option>
                            <option value="3006" data-lat="-37.8234" data-lng="144.9552">3006 - Southbank</option>
                            <option value="3008" data-lat="-37.8171" data-lng="144.9535">3008 - Docklands</option>
                            <option value="3031" data-lat="-37.7885" data-lng="144.9443">3031 - Kensington, Flemington</option>
                            <option value="3051" data-lat="-37.8060" data-lng="144.9382">3051 - North Melbourne</option>
                            <option value="3052" data-lat="-37.8015" data-lng="144.9568">3052 - Parkville</option>
                            <option value="3053" data-lat="-37.8056" data-lng="144.9635">3053 - Carlton</option>
                            <option value="3054" data-lat="-37.8046" data-lng="144.9688">3054 - Carlton North</option>
                            <option value="3056" data-lat="-37.7671" data-lng="144.9637">3056 - Brunswick</option>
                            <option value="3057" data-lat="-37.7701" data-lng="144.9700">3057 - Brunswick East</option>
                            <option value="3065" data-lat="-37.8028" data-lng="144.9730">3065 - Fitzroy</option>
                            <option value="3066" data-lat="-37.8001" data-lng="144.9815">3066 - Collingwood</option>
                            <option value="3067" data-lat="-37.8074" data-lng="144.9895">3067 - Abbotsford</option>
                            <option value="3068" data-lat="-37.7872" data-lng="144.9807">3068 - Clifton Hill, Fitzroy North</option>
                            <option value="3070" data-lat="-37.7615" data-lng="144.9978">3070 - Northcote</option>
                            <option value="3121" data-lat="-37.8180" data-lng="144.9780">3121 - Richmond</option>
                            <option value="3141" data-lat="-37.8320" data-lng="144.9850">3141 - South Yarra</option>
                            <option value="3205" data-lat="-37.8302" data-lng="144.9670">3205 - South Melbourne</option>
                            <option value="3206" data-lat="-37.8200" data-lng="144.9556">3206 - Albert Park</option>
                        </select>
                    </div>
                </div>

                {/* Map container */}
                <div className="map-container">
                    <div id='map' className="map"></div>
                </div>

                {/* Scrollable table container */}
                <div className="scrollable-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Centre Name</th>
                                <th>Address</th>
                                <th>Waste Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {centres
                                .filter((centre) => {
                                    const matchesWasteType = selectedWasteType ? centre.waste.waste_type === selectedWasteType : true;
                                    const matchesPostcode = selectedPostcode ? isWithin3Km(selectedPostcode, centre) : true;
                                    return matchesWasteType && matchesPostcode;
                                })
                                .map((centre) => (
                                    <tr key={centre.centre_id}>
                                        <td>{centre.name}</td>
                                        <td>{centre.address}</td>
                                        <td>{centre.waste.waste_type}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default MapPage;
