import { Field } from 'formik'
import React from 'react'
import styles from './single-select.module.css'

const SingleSelect = ({ label, id, error, options, values, name, touched, ...props }) => {
    let fieldSetStyle, legendStyle, badgeStyle

    if (!!error) {
        fieldSetStyle = {
            border: '1px solid var(--color-red)',
        }
        legendStyle = {
            color: 'var(--color-red)',
        }
        badgeStyle = {
            border: '1px solid var(--color-red)',
            color: 'var(--color-red)',
        }
    } else {
        if (values[name]?.length) {
            fieldSetStyle = {
                border: '1px solid var(--color-green)',
            }
            legendStyle = {
                color: 'var(--color-green)',
            }
        }
    }

    return (
        <div className={styles.container}>
            <fieldset className={styles.fieldset} style={fieldSetStyle} {...props}>
                <legend
                    style={{
                        marginLeft: '4px',
                        color: 'var(--color-grey)',
                        fontSize: '0.96rem',
                        textTransform: 'initial',
                        fontWeight: 'initial',
                        ...legendStyle,
                    }}
                    className={styles.singleSelectLegend}
                >
                    {label}
                </legend>
                <div className={styles.selectGroups} role="group" aria-labelledby="radio-group">
                    {options.map((tag) => (
                        <label key={tag} className={styles.badge}>
                            <Field
                                name={name}
                                touched={touched}
                                type="radio"
                                value={tag}
                                className={styles.inputSelect}
                            />
                            <span style={badgeStyle}>{tag}</span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <p className={styles.error} lh="1.4" align="left" color="red-1">
                {error}
            </p>
        </div>
    )
}

export default SingleSelect
