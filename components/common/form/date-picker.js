import React from 'react'
import styles from './date-picker.module.css'

const DatePicker = ({
    label,
    border,
    id,
    error,
    background,
    handleError,
    onChange,
    onBlur,
    disabled,
    values,
    name,
    ...props
}) => {
    let wrapperStyle = { border: border },
        labelStyle

    if (!!error) {
        wrapperStyle = {
            border: '1px solid var(--color-red)',
        }
        labelStyle = {
            color: 'var(--color-red)',
        }
    } else {
        if (values[name]) {
            wrapperStyle = {
                border: '1px solid var(--color-green)',
            }
            labelStyle = {
                color: 'var(--color-green)',
            }
        }
    }

    let labelDisableStyle = null
    if (disabled) {
        labelDisableStyle = {
            ...labelStyle,
            backgroundColor: 'transparent',
            opacity: 0,
        }
    } else {
        labelDisableStyle = labelStyle
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper} style={wrapperStyle}>
                <input
                    className={styles.datePicker}
                    onChange={onChange}
                    onBlur={onBlur}
                    id={id}
                    style={{ color: props.inputColor ? props.inputColor : null }}
                    disabled={disabled}
                    {...props}
                    type="date"
                />
                <label
                    className={styles.datePickerLabel}
                    background={background}
                    error={error}
                    htmlFor={id}
                    style={labelDisableStyle}
                >
                    {label}
                </label>
            </div>
            <p className={styles.error} lh="1.4" align="left" color="red-1">
                {error}
            </p>
        </div>
    )
}

export default DatePicker
