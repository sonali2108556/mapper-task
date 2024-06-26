import { Box, Button, Container, Grid, Typography } from "@mui/material";
import InputForm from "./InputForm";
import { useState } from "react";
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 28.7041,
    lng: 77.1025,
};

export default function Main() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [waypoints, setWaypoints] = useState([]);
    const [response, setResponse] = useState(null);
    const [distance, setDistance] = useState(0);

    const calculateRoute = () => {
        if (origin === '' || destination === '') {
            return;
        }

        const waypts = waypoints.map((waypoint) => ({
            location: waypoint,
            stopover: true,
        }));

        const directionsServiceOptions = {
            origin: origin,
            destination: destination,
            waypoints: waypts,
            travelMode: 'DRIVING',
        };

        setResponse(directionsServiceOptions);
    };

    const addWaypoint = (place) => {
        const newWaypoint = place //destinationRef.current.value;
        if (newWaypoint && !waypoints.includes(newWaypoint)) {
            setWaypoints([...waypoints, newWaypoint]);
        }
    };

    const handleSetPlace = (place, type) => {
        switch (type) {
            case 'origin':
                setOrigin(place);
                break;
            case 'stop':
                addWaypoint(place);
                break;
            case 'dest':
                setDestination(place);
                break;
        }
    }
    const processResult = (result) => {
        let dist = 0;
        if (result?.routes[0]) {
            let route = result.routes[0];
            route.legs.forEach(item => {
                dist += parseInt(item.distance.value);
            });
            setDistance(parseInt(dist/1000));
        }
    }
    return (
        <Container maxWidth="lg">
            <Typography sx={{ fontSize: '20px', color: '#1B31A8', textAlign: 'center', py: { xs: 1, md: 2.5 } }}>Let's calculate <strong>distance</strong> from Google maps</Typography>
            <Grid container columnSpacing={"60px"}>
                <Grid item xs={12} md={6} alignSelf={"center"} px={3} order={{ xs: 2, md: 1 }}>
                    <Grid container spacing={2} justifyContent={"space-between"}>
                        <Grid item xs={12} md={7}>
                            <InputForm handleSetPlace={handleSetPlace} />
                        </Grid>
                        <Grid item alignSelf={"center"} xs={12} md={5}>
                            <Button variant="standard" sx={{ backgroundColor: '#1B31A8', borderRadius: '32px', color: 'white', textTransform: 'capitalize', ':hover': { color: 'white', backgroundColor: '#1B31A8aa' } }} fullWidth onClick={calculateRoute}>Calculate</Button>

                        </Grid>
                    </Grid>
                    {response ? (<Box>
                        <Box sx={{ borderRadius: '8px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2.3, py: 1.3, my: '30px' }}>
                            <Typography sx={{ fontWeight: '700', fontSize: '20px', color: '#1E2A32' }}>Distance</Typography>
                            <Typography sx={{ fontWeight: '700', color: '#0079FF', fontSize: '30px' }}>{distance} kms</Typography>
                        </Box>
                        <Typography>The distance between <strong>{origin}</strong> and <strong>{destination}</strong> via the seleted route is {distance} kms.</Typography>
                    </Box>) : null}
                </Grid>
                <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>

                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                        {response && (
                            <DirectionsService
                                options={response}
                                callback={(result, status) => {
                                    if (status === 'OK') {
                                        setResponse(result);
                                        processResult(result);
                                    }
                                }}
                            />
                        )}
                        {response && (
                            <DirectionsRenderer
                                options={{
                                    directions: response,
                                }}
                            />
                        )}
                    </GoogleMap>
                </Grid>
            </Grid>
        </Container>
    )
}