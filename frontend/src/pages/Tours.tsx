// React and React Hooks
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";

// Components
import NavBar from '../components/NavBar';
import DestinationCard from '../components/DestinationCard';

// Material UI Components
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import FilterListIcon from '@mui/icons-material/FilterList';

// Utilities
import { getAllTours } from '../utils/apiUtils';

// Types
import { ITour } from '../types/types';
import { FilterButton } from '../styles/ToursStyles';
import SelectDate from '../components/SelectDate';

export default function Tours() {
    const [toursData, setToursData] = useState<ITour[]>([]);
    const [showDatePicker, setShowDatePicker] = useState(false); // State for toggling date picker visibility
    const methods = useForm();
    
    useEffect(() => {
        fetchToursData();
    }, []);

    const fetchToursData = async () => {
        const response = await getAllTours();
        setToursData(response);
    };

    const handleFilterButtonClick = () => {
        setShowDatePicker(!showDatePicker); // Toggle date picker visibility
    };

    return (
        <>
            <NavBar />
            <FormProvider {...methods}>
                <Box sx={{ width: "100vw", paddingLeft: "12%", paddingRight: "12%", mb: 14, paddingTop: 10 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2, position: 'relative' }}>
                        <FilterButton
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            onClick={handleFilterButtonClick}
                        >
                            Filter
                        </FilterButton>
                        {showDatePicker && (
                            <Box sx={{ position: 'absolute', top: '100%', right: 0, mt: 1, zIndex: 10 }}>
                                <SelectDate />
                            </Box>
                        )}
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
            </FormProvider>
        </>
    );
}
