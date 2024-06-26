import Autocomplete from 'react-google-autocomplete';
import { gMapKey } from "../config";
import { Box, InputLabel } from "@mui/material";
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';

export default function InputForm({ handleSetPlace }) {
    return (
        <Box mt={{ xs: 4, md: 2 }}>
            <InputLabel className='my-input-label'>Origin</InputLabel>
            <Box className="my-input-container">
                <TripOriginIcon className='my-input-icon' />
                <Autocomplete
                    apiKey={gMapKey}
                    onPlaceSelected={(place) => handleSetPlace(place.formatted_address, 'origin')}
                    types={['(regions)']}
                    placeholder="Origin"
                />
            </Box>
            <InputLabel className='my-input-label'>Stop</InputLabel>
            <Box className="my-input-container">
                <AddLocationIcon className='my-input-icon' />
                <Autocomplete
                    apiKey={gMapKey}
                    onPlaceSelected={(place) => handleSetPlace(place.formatted_address, 'stop')}
                    types={['(regions)']}
                    placeholder="Stop"
                />
            </Box>
            <InputLabel className='my-input-label'>Destination</InputLabel>
            <Box className="my-input-container">
                <ModeStandbyIcon className='my-input-icon' />
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
