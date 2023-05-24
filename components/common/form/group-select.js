import { Field } from 'formik'
import React from 'react'
import styles from './group-select.module.css'

const GroupSelect = ({ label, id, error, options, values, name, ...props }) => {
    let fieldSetStyle, legendStyle, badgeErrStyle

    if (!!error) {
        fieldSetStyle = {
            border: '1px solid var(--color-red)',
        }
        legendStyle = {
            color: 'var(--color-red)',
        }
        badgeErrStyle = {
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
                    className={styles.groupSelectLegend}
                >
                    {label}
                </legend>
                <div className={styles.selectGroups} role="group" aria-labelledby="checkbox-group">
                    {options.map((tag) => (
                        <label key={tag} className={styles.badge}>
                            <Field
                                name={name}
                                type="checkbox"
                                value={tag}
                                className={styles.inputSelect}
                            />
                            <span style={badgeErrStyle}>{tag}</span>
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

export default GroupSelect
