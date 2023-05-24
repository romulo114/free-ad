import React from 'react'
import styles from './text-area.module.css'

const TextArea = ({
    label,
    border,
    id,
    error,
    background,
    handleError,
    onChange,
    onBlur,
    name,
    values,
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

    return (
        <div className={styles.container}>
            <div className={styles.wrapper} style={wrapperStyle}>
                <textarea
                    className={styles.textArea}
                    onChange={onChange}
                    onBlur={onBlur}
                    id={id}
                    style={{ color: props.inputColor ? props.inputColor : null }}
                    {...props}
                />
                <label
                    className={styles.textAreaLabel}
                    background={background}
                    error={error}
                    htmlFor={id}
                    style={labelStyle}
                >
                    {label}
                </label>
            </div>
            <p className={styles.error} lh="1.4" align="left" color="red-1">
                {error}
            </p>
            {error && <div className={styles.styledError} onClick={handleError} />}
        </div>
    )
}

export default TextArea
