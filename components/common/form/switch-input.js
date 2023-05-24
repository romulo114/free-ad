import React from 'react'
import { Field } from 'formik'
import styles from './switch-input.module.css'
import { ToggleSwitch } from './toggle-switch'

const timeStamps = ['20min', '1h', '2h']
const priceOptions = [15, 25, 50, 100, 125, 150]
const SwitchInput = ({ id, label, name, error, options, item, toggle, idx, ...props }) => {
    const onChangeDurationTime = (value) => {
        const origin = item.rate
        item.rate = {
            ...origin,
            duration: value,
        }
        // setValues(...item)
    }

    const onChangePriceForTime = (value) => {
        const origin = item.rate
        item.rate = {
            ...origin,
            price: Number(value),
        }
        // setValues(...item)
    }
    return (
        <div className={styles.container} {...props}>
            <fieldset className={styles.fieldset}>
                <legend
                    style={{
                        marginLeft: '4px',
                        fontSize: '0.96rem',
                        textTransform: 'initial',
                        fontWeight: 'initial',
                    }}
                    className={styles.optionSelectLegend}
                >
                    {label}
                </legend>
                <div
                    className={styles.inputHolder}
                    style={!item.availability ? { color: 'var(--color-grey)' } : {}}
                >
                    <span>Available</span>
                    <ToggleSwitch
                        id={id}
                        name={name}
                        on={item.availability}
                        onClick={(e) => toggle(e, idx)}
                    />
                </div>
            </fieldset>
            {item.availability && (
                <div className={styles.availabilityPrice}>
                    <div className={styles.availabilityPriceDuration}>
                        <label>Duration</label>
                        <Field
                            id={id}
                            name={name}
                            as="select"
                            className={styles.fromInput}
                            value={item.duration}
                            onChange={(e) => onChangeDurationTime(e.target.value)}
                        >
                            {timeStamps.map((opt) => {
                                return (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                )
                            })}
                        </Field>
                    </div>
                    <div className={styles.availabilityPriceSelect}>
                        <label>Price</label>
                        <Field
                            id={id}
                            name={name}
                            as="select"
                            className={styles.fromInput}
                            value={item.price}
                            onChange={(e) => onChangePriceForTime(e.target.value)}
                        >
                            {priceOptions.map((opt) => {
                                return (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                )
                            })}
                        </Field>
                    </div>
                </div>
            )}
        </div>
    )
}
export default SwitchInput
