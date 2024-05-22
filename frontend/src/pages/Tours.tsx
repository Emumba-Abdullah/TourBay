// React and React Hooks
import { useEffect, useState } from 'react';

// Components
import NavBar from '../components/NavBar';
import DestinationCard from '../components/DestinationCard';

// Material UI Components
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import FilterListIcon from '@mui/icons-material/FilterList';

// Utilities
import { getAllTours } from '../utils/apiUtils';

// Types
import { ITour } from '../types/types';
import { FilterButton } from '../styles/ToursStyles';

export default function Tours() {
    const [toursData, setToursData] = useState<ITour[]>([]);
    
    useEffect(() => {
        fetchToursData();
    }, []);

    const fetchToursData = async () => {
        const response = await getAllTours();
        setToursData(response);
    };

    return (
        <>
            <NavBar />
            <Box sx={{ width: "100vw", paddingLeft: "12%", paddingRight: "12%", mb: 14, paddingTop: 10 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <FilterButton
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                    >
                        Filter
                    </FilterButton>
                </Box>
                <Box sx={{ width: "100%" }}>
                    {toursData.length > 0 && (
                        <Grid container spacing={4}>
                            {toursData.map((tour) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={tour._id}>
                                    <DestinationCard tourData={tour} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </Box>
        </>
    );
}
