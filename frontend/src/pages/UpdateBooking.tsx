import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import { useLocation } from 'react-router-dom';
import { getBookingByIdApiCall ,updateBookingApiCall} from '../utils/apiUtils';
import NavBar from '../components/NavBar';
import { useNavigate } from "react-router-dom";
import { IBooking } from '../types/types';
import { FormContainer, StyledBox, StyledImage } from '../styles/commonFormStyles';



export default function UpdateBooking() {
    const location = useLocation();
    const { bookingId } = location.state;
    const [initialData, setInitialData] = useState<IBooking|undefined>();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchBookingData = async () => {
            const data = await getBookingByIdApiCall(bookingId);
            setInitialData(data);
            setValue('name', data.name);
            setValue('email', data.email);
            setValue('phoneNo', data.phoneNo);
            setValue('numOfAdults', data.numOfAdults);
            setValue('numOfChilds', data.numOfChilds);
            setValue('paymentMethod', data.paymentMethod);
        };
        fetchBookingData();
    }, [bookingId, setValue]);

    const onSubmit = async (data:IBooking) => {
        data.tours = initialData?.tours;
        console.log(data);
        await updateBookingApiCall(bookingId, data);
        navigate('/myTours');

    };

    if (!initialData) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <NavBar />
            <FormContainer >
                <StyledBox>
                    <Typography component="h1" variant="h4" sx={{ fontFamily: "poppins", fontWeight: 500 }}>
                        Update Your Booking
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <TextField
                            {...register('name', { required: true })}
                            margin="normal"
                            fullWidth
                            required
                            id="name"
                            label="Name"
                            autoFocus
                        />
                        <TextField
                            {...register('email', { required: true })}
                            margin="normal"
                            fullWidth
                            required
                            id="email"
                            label="Email"
                            autoFocus
                            type="email"
                        />
                        <TextField
                            {...register('phoneNo', { required: true })}
                            margin="normal"
                            required
                            id="phoneNo"
                            fullWidth
                            label="Phone Number"
                            type="tel"
                            autoFocus
                        />
                        <Box sx={{ display: "flex", flexDirection: 'row' }}>
                            <TextField
                                {...register('numOfAdults', { required: true })}
                                margin="normal"
                                required
                                id="numOfAdults"
                                fullWidth
                                label="Number of Adults"
                                type="number"
                                autoFocus
                            />
                            <TextField
                                {...register('numOfChilds', { required: true })}
                                margin="normal"
                                required
                                id="numOfChilds"
                                fullWidth
                                label="Number of Children"
                                type="number"
                                autoFocus
                                sx={{ ml: 3 }}
                            />
                        </Box>
                        <TextField
                            {...register('paymentMethod', { required: true })}
                            margin="normal"
                            fullWidth
                            id="paymentMethod"
                            label="Payment Method"
                            autoFocus
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: "#F16B51" }}
                        >
                            Update Now
                        </Button>
                    </Box>
                </StyledBox>
                <StyledImage
                    src="https://source.unsplash.com/random"
                />
            </FormContainer>
        </Box>
    );
}
