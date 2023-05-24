import servicesStyle from './services.module.css'
import RadioSelect from '../../components/common/form/radio-select'

const ServicesForm = ({ setValues, values }) => {
    const onChange = (value, idx) => {
        values[idx] = value
        setValues([...values])
    }
    return (
        <>
            <div className={servicesStyle.info_1}>
                <div className={servicesStyle.info_1_1}>
                    <div className={servicesStyle.services}>
                        {values.map((value, idx) => {
                            return (
                                <div key={idx} className={servicesStyle.serviceItem}>
                                    <RadioSelect
                                        idx={idx}
                                        id={values[idx]}
                                        length={values.length}
                                        setValue={(value) => onChange(value, idx)}
                                        {...{
                                            value,
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServicesForm
