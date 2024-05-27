// React and React Hooks
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

// Date Range Picker
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker, RangeKeyDict } from 'react-date-range'



interface IselectDateProps{
    handleDateSelect: (arg1:Date,arg2:Date) => void;
}


export default function SelectDate({handleDateSelect}:IselectDateProps) {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ])

    const handleSelect = (ranges:RangeKeyDict) => {
        setState([ranges.selection])
        handleDateSelect(ranges.selection.startDate,ranges.selection.endDate)
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
                />
            )}
        />
    )
}
