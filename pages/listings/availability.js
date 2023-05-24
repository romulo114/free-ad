import { Field } from 'formik'
import SwitchInput from '../../components/common/form/switch-input'
import availabilityStyle from './availability.module.css'

const timeOptions = [
    '17.00',
    '17:30',
    '18.00',
    '18:30',
    '19.00',
    '19:30',
    '20.00',
    '20:30',
    '21.00',
    '21:30',
    '22.00',
    '22:30',
    '23.00',
    '23:30',
    '24:00',
]

const AvailabilityForm = ({ setValues, values, errors }) => {
    const onChangeActive = (checked, idx) => {
        const origin = values.workingHours[idx]
        values.workingHours[idx] = {
            ...origin,
            active: checked,
        }
        setValues(values)
    }

    const onChangeFromTime = (value, idx) => {
        const origin = values.workingHours[idx]
        values.workingHours[idx] = {
            ...origin,
            from: value,
        }
        setValues(values)
    }

    const onChangeToTime = (value, idx) => {
        const origin = values.workingHours[idx]
        values.workingHours[idx] = {
            ...origin,
            to: value,
        }
        setValues(values)
    }

    const handleToggle = (value, idx) => {
        const origin = values.call[idx]
        values.call[idx] = {
            ...origin,
            availability: value,
        }
        setValues(values)
    }

    return (
        <>
            <div className={availabilityStyle.info}>
                <div className={availabilityStyle.info1_1}>
                    <div className={availabilityStyle.labels}>
                        <div className={availabilityStyle.activeLabel}>Acitve</div>
                        <div className={availabilityStyle.timeStampLabel}>
                            <div className={availabilityStyle.fromLabel}>From</div>
                            <div className={availabilityStyle.toLabel}>To</div>
                        </div>
                    </div>
                    {values.workingHours.map((item, idx) => {
                        return (
                            <div key={idx} className={availabilityStyle.workingHours}>
                                <div className={availabilityStyle.when}>
                                    <Field
                                        id={item.when}
                                        name={item.when}
                                        type="checkbox"
                                        className={availabilityStyle.checkboxInput}
                                        checked={item.active}
                                        value={item.when}
                                        onChange={(e) =>
                                            onChangeActive(e.currentTarget.checked, idx)
                                        }
                                    />
                                    <label>{item.when}</label>
                                </div>
                                <div className={availabilityStyle.timeStamp}>
                                    {item.active && (
                                        <Field
                                            id={`${item.when}_from`}
                                            name={`${item.when}_from`}
                                            as="select"
                                            className={availabilityStyle.fromInput}
                                            value={item.from}
                                            onChange={(e) => onChangeFromTime(e.target.value, idx)}
                                        >
                                            {timeOptions.map((opt) => {
                                                return (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                )
                                            })}
                                        </Field>
                                    )}
                                    {item.active && (
                                        <Field
                                            id={`${item.when}_to`}
                                            name={`${item.when}_to`}
                                            as="select"
                                            className={availabilityStyle.fromInput}
                                            value={item.to}
                                            onChange={(e) => onChangeToTime(e.target.value, idx)}
                                        >
                                            {timeOptions.map((opt) => {
                                                return (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                )
                                            })}
                                        </Field>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={availabilityStyle.info1_2}>
                    {values.call.map((item, idx) => {
                        return (
                            <SwitchInput
                                id={item.title}
                                name={item.title}
                                label={item.title}
                                item={item}
                                key={idx}
                                idx={idx}
                                toggle={(e) => {
                                    handleToggle(e.target.checked, idx)
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default AvailabilityForm
