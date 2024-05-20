import { useEffect, useState } from 'react';
import { getAllTours } from '../utils/apiUtils';
import DestinationCard from '../components/DestinationCard';
import NavBar from '../components/NavBar';

import { Box} from '@mui/material';
import Grid from '@mui/material/Grid';
interface ITour {
    _id: string;
    name: string;
    city: string;
    description: string;
    price: string;
    duration: string;
    startDate: string;
    endDate: string;
    facilities: string[];
    images: string[];
}

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
            <Box sx={{width:"100vw", paddingLeft:"12%",paddingRight:"12%", mb:14 , paddingTop:10}}>
                <Box sx={{width:"100%"}}>
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
