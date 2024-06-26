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
            setDistance(parseInt(dist / 1000));
        }
    }
    return (
        <Container maxWidth="lg">
            <Typography sx={{ fontSize: '20px', color: '#1B31A8', textAlign: 'center', py: { xs: 1, md: 2.5 } }}>Let's calculate <strong>distance</strong> from Google maps</Typography>
            <Grid container>
                <Grid item xs={12} md={6} alignSelf={"center"} order={{ xs: 2, md: 1 }} pr={{xs:0, md:8}}>
                    <Grid container spacing={2} justifyContent={"space-between"}>
                        <Grid item xs={12} md={7}>
                            <InputForm handleSetPlace={handleSetPlace} />
                        </Grid>
                        <Grid item alignSelf={"center"} textAlign={{ xs: 'center', md: 'end' }} xs={12} md={5}>
                            <Button variant="standard" sx={{ backgroundColor: '#1B31A8', borderRadius: '32px', color: 'white', textTransform: 'capitalize', ':hover': { color: 'white', backgroundColor: '#1B31A8aa' }, py: 1.5, px: 4 }} onClick={calculateRoute}>Calculate</Button>

                        </Grid>
                    </Grid>
                    {response ? (<Box sx={{ borderRadius: '8px', my: '30px', border:'1px solid #c4c4c450' }}>
                        <Box sx={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2.3, py: 1.3, }}>
                            <Typography sx={{ fontWeight: '700', fontSize: '20px', color: '#1E2A32' }}>Distance</Typography>
                            <Typography sx={{ fontWeight: '700', color: '#0079FF', fontSize: '30px' }}>{distance} kms</Typography>
                        </Box>
                        <Box sx={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', backgroundColor: '#F4F8FA', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2.3, py: 1.3, }}>
                            <Typography>The distance between <strong>{origin}</strong> and <strong>{destination}</strong> via the seleted route is {distance} kms.</Typography>
                        </Box>
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
        </Container >
    )
}