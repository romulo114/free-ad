import React from 'react'
import { Field } from 'formik'
import styles from './select.module.css'

const Select = ({ id, label, name, error, options, values, ...props }) => {
    let fieldSetStyle, legendStyle

    if (!!error) {
        fieldSetStyle = {
            border: '1px solid var(--color-red)',
        }
        legendStyle = {
            color: 'var(--color-red)',
        }
    } else {
        if (values) {
            if (values[name]) {
                fieldSetStyle = {
                    border: '1px solid var(--color-green)',
                }
                legendStyle = {
                    color: 'var(--color-green)',
                }
            }
        }
    }

    return (
        <div className={styles.container} {...props}>
            <fieldset className={styles.fieldset} style={fieldSetStyle}>
                <legend
                    style={{
                        marginLeft: '4px',
                        color: 'var(--color-grey)',
                        fontSize: '0.96rem',
                        textTransform: 'initial',
                        fontWeight: 'initial',
                        ...legendStyle,
                    }}
                    className={styles.optionSelectLegend}
                >
                    {label}
                </legend>
                <div>
                    <Field name={name} as="select" className={styles.optionSelect}>
                        {options?.map((opt) => {
                            return (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            )
                        })}
                    </Field>
                </div>
            </fieldset>
        </div>
    )
}
export default Select
