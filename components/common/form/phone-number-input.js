import styles from './phone-number-input.module.css'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const PhoneNumberInput = ({
    label,
    border,
    id,
    error,
    name,
    background,
    handleError,
    onChange,
    onBlur,
    setFieldValue,
    values,
    ...props
}) => {
    let fieldSetStyle, legendStyle

    if (!!error) {
        fieldSetStyle = {
            border: '1px solid var(--color-red)',
        }
        legendStyle = {
            color: 'var(--color-red)',
        }
    } else {
        if (values[name]) {
            fieldSetStyle = {
                border: '1px solid var(--color-green)',
            }
            legendStyle = {
                color: 'var(--color-green)',
            }
        }
    }

    const onValueChange = (code) => {
        if (!code) return
        setFieldValue(name, code)

        if (onChange !== null) {
            onChange(code)
        }
    }

    return (
        <div className={styles.container}>
            <fieldset className={styles.fieldset} style={fieldSetStyle}>
                <legend
                    className={styles.phoneInputLegend}
                    style={{
                        marginLeft: '4px',
                        color: 'var(--color-grey)',
                        fontSize: '0.96rem',
                        textTransform: 'initial',
                        fontWeight: 'initial',
                        ...legendStyle,
                    }}
                >
                    Phone number
                </legend>
                <PhoneInput
                    onBlur={onBlur}
                    id={id}
                    defaultCountry="US"
                    onChange={onValueChange}
                    {...props}
                />
            </fieldset>
            <p className={styles.error} lh="1.4" align="left" color="red-1">
                {error}
            </p>
            {error && <div className={styles.styledError} onClick={handleError} />}
        </div>
    )
}

export default PhoneNumberInput
