import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { findPlace } from '../utils/apiUtils'



export default function SelectPlace() {
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false);
    const { control } = useFormContext();

    const fetchData = async (queryOptions: string) => {
        try {
            setLoading(true);
            if (queryOptions) {
                const response = await findPlace(queryOptions)
                setSearchResults(response)
                console.log(response);
            }
        } catch (error) {
            console.log("Error fetching places:", error);
        } finally {
            setLoading(false);
        }
    }

    const debounced = useDebouncedCallback((value) => fetchData(value), 1000)

    const handleInputChange = (event, value: string): void => {
        debounced(value)
    }

    return (
        <Controller
            name="location"
            control={control}
            rules={{ required: 'Location is required' }} 
            render={({ field }) => (
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={searchResults}
                    loading={loading}
                    getOptionLabel={(option) => option.name || '!!!'}
                    onChange={(event, newValue) => {
                        field.onChange(newValue?.name || '')
                    }}
                    value={searchResults.find((option) => option.name === field.value) || null}
                    onInputChange={handleInputChange}
                    sx={{
                        '.MuiOutlinedInput-notchedOutline': {
                            borderStyle: 'none',
                        },
                    }}
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="Where do you want to go?" 
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? 'Loading...' : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                            error={Boolean(field.error)} 
                            helperText={field.error?.message}
                        />
                    )}
                />
            )}
        />
    )
}
