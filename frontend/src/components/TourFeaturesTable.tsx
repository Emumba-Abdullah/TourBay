// Material UI Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

// Material UI Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Types
import { ITour } from '../types/types';

//library imports
import dayjs from 'dayjs';


export default function TourFeaturesTable({ tourData }: ITour) {
    console.log(tourData);
    const rows = [
        { label: 'Destination', value: tourData.city },
        { label: 'Departure Location', value: `${tourData.city} airport on ${dayjs(tourData.startDate).format("YYYY-MM-DD")}` },
        { label: 'Return', value: `${dayjs(tourData.endDate).format("YYYY-MM-DD")} on 7pm` }
    ];

    const styles = {
        firstColumn: {
            fontWeight: 'bold',
            fontFamily: 'Poppins',
            color: 'black',
        },
        secondColumn: {
            fontWeight: 'normal',
            fontFamily: 'Poppins',
        },
        tickIcon: {
            color: '#F16B51',
            marginRight: '8px',
        },
        facilityItem: {
            display: 'flex',
            alignItems: 'center',
        },
    };

    return (
        <TableContainer >
            <Table sx={{ minWidth: 650 }}>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell sx={styles.firstColumn}>{row.label}</TableCell>
                            <TableCell sx={styles.secondColumn}>{row.value}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell sx={styles.firstColumn}>Facilities</TableCell>
                        <TableCell sx={styles.secondColumn}>
                            <ul>
                                {tourData.facilities.map((facility:string, index) => (
                                    <li key={index} style={{ listStyle: 'none' }}>
                                        <Box sx={styles.facilityItem}>
                                            <CheckCircleIcon sx={styles.tickIcon} />
                                            <Typography variant="body2">{facility}</Typography>
                                        </Box>
                                    </li>
                                ))}
                            </ul>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
