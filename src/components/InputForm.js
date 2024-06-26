import Autocomplete from 'react-google-autocomplete';
import { gMapKey } from "../config";
import { Box, Grid, InputLabel } from "@mui/material";

export default function InputForm({ handleSetPlace }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap:{xs:'15px',md:'30px'} }}>
            <Box>
                <InputLabel>Origin</InputLabel>
                <Autocomplete
                    apiKey={gMapKey}
                    onPlaceSelected={(place) => handleSetPlace(place.formatted_address, 'origin')}
                    types={['(regions)']}
                    placeholder="Origin"
                />
            </Box>
            <Box>
                <InputLabel>Stop</InputLabel>
                <Autocomplete
                    apiKey={gMapKey}
                    onPlaceSelected={(place) => handleSetPlace(place.formatted_address, 'stop')}
                    types={['(regions)']}
                    placeholder="Stop"
                />
            </Box>
            <Box>
                <InputLabel>Destination</InputLabel>
                <Autocomplete
                    apiKey={gMapKey}
                    onPlaceSelected={(place) => handleSetPlace(place.formatted_address, 'dest')}
                    types={['(regions)']}
                    placeholder="Destination"
                />
            </Box>
        </Box>

    )
}