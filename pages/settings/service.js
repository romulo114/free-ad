import { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import Input from '../../components/common/form/input'
import Spinner from '../../components/common/spinner'
import fetchJson from '../../lib/fetchJson'
import Tabstyles from '../../styles/Tabs.module.css'
import { API_ENDPOINTS } from '../../utils/api-endpoints'
import { validationSchema } from '../../utils/schema'
import { TableRecord } from '../../components/table'

export default function Service() {
    const [status, setStatus] = useState('idle')
    const [records, setRecords] = useState(null)
    const [loading, setLoading] = useState(false)

    const addService = async ({ service }) => {
        setStatus('pending')
        try {
            const res = await fetchJson(API_ENDPOINTS.SERVICE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ service }),
            })
            toast(res.message)
            getRecords()
        } catch (err) {
            console.log(err)
            toast(err.message)
        } finally {
            setStatus('resolve')
        }
    }

    const getRecords = async () => {
        setLoading(true)
        try {
            const res = await fetchJson(API_ENDPOINTS.SERVICE, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            if (res.success) {
                setRecords(res.data)
            } else {
                toast(res.message)
                return []
            }
        } catch (err) {
            console.log(err)
            toast(err.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteService = async (id) => {
        try {
            const res = await fetchJson(API_ENDPOINTS.SERVICE, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            })
            toast(res.message)
            getRecords()
            return
        } catch (err) {
            console.log(err)
            toast(err.message)
        }
    }

    const editService = async ({ name }, recordId) => {
        try {
            const res = await fetchJson(API_ENDPOINTS.SERVICE, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, recordId }),
            })
            toast(res.message)
            getRecords()
            return
        } catch (err) {
            console.log(err)
            toast(err.message)
        }
    }

    useEffect(() => {
        getRecords()
    }, [])

    return (
        <div className={Tabstyles.location}>
            <div className={Tabstyles.TabsBlock}>
                <Formik
                    initialValues={{ service: '' }}
                    validationSchema={validationSchema.serviceSchema}
                    onSubmit={addService}
                >
                    {({ touched, errors, handleBlur, handleChange, values }) => {
                        return (
                            <Form className={Tabstyles.form}>
                                <Input
                                    id="service"
                                    label="service"
                                    name="service"
                                    type="text"
                                    background="white"
                                    placeholder="Add Service"
                                    autoComplete="off"
                                    error={touched.service && errors?.service}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    values={values}
                                    required
                                />
                                <div className={Tabstyles.crFormCta}>
                                    {status === 'pending' ? (
                                        <Spinner />
                                    ) : (
                                        <input
                                            type="submit"
                                            value="ADD"
                                            className={Tabstyles.defaultButton}
                                        />
                                    )}
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <TableRecord
                    records={records}
                    getRecords={getRecords}
                    handleDelete={deleteService}
                    handleEdit={editService}
                    title="Change Service"
                />
            )}
        </div>
    )
}
