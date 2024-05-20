import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'

export default function SelectPrice() {
    const { control, formState: { errors } } = useFormContext(); // Access form errors

    return (
        <Controller
            name="priceRange"
            control={control}
            rules={{ required: 'Price range is required' }} // Add required validation rule
            render={({ field }) => (
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Prices}
                    getOptionLabel={(option) => option.label || '!!!'}
                    onChange={(event, newValue) => {
                        field.onChange(newValue?.label || '')
                    }}
                    value={Prices.find((option) => option.label === field.value) || null}
                    sx={{
                        '.MuiOutlinedInput-notchedOutline': {
                            borderStyle: 'none',
                        },
                    }}
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="Select Price Range"
                            error={Boolean(errors.priceRange)} // Pass error state to TextField
                            helperText={errors.priceRange?.message} // Display error message
                        />
                    )}
                />
            )}
        />
    )
}

const Prices = [
    { label: '$100-$250' },
    { label: '$250-$500' },
    { label: '$500-$750' },
    { label: '$750-$1000' },
    { label: '$1000-$2000' },
]
