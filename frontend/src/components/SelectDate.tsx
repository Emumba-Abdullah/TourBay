import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'





export default function SelectDate() {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ])

    const handleSelect = (ranges) => {
        setState([ranges.selection])
    }

    const { control } = useFormContext()

    return (
         <Controller
            name="date"
            control={control}
            render={({ field }) => (
                <DateRangePicker
                    ranges={state}
                    onChange={(ranges) => {
                        handleSelect(ranges);
                        field.onChange(ranges);
                    }}
                    showSelectionPreview={true}
                    autoFocus={false}
                    color={'red'}
                />
            )}
        />
    )
}
