import React from 'react'
import { Field } from 'formik'

const RadioButton = (props) => {
    const { label, name, options, ...rest } = props
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name} {...rest}>
                {({ field }) => {
                    return options.map((option) => {
                        return (
                            <React.Fragment key={option.key}>
                                <input
                                    type="radio"
                                    id={option.id}
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                />
                                <label htmlFor={option.id}>{option.key}</label>
                            </React.Fragment>
                        )
                    })
                }}
            </Field>
        </div>
    )
}

export default RadioButton
