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

export default function Category() {
    const [status, setStatus] = useState('idle')
    const [records, setRecords] = useState(null)
    const [loading, setLoading] = useState(false)

    const addCategory = async ({ category }) => {
        setStatus('pending')
        try {
            const res = await fetchJson(API_ENDPOINTS.CATEGORY, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category }),
            })
            toast(res.message)
            getRecords()
        } catch (err) {
            console.log(err)
            toast('Internal Server Err')
        } finally {
            setStatus('resolve')
        }
    }

    const getRecords = async () => {
        setLoading(true)
        try {
            const res = await fetchJson(API_ENDPOINTS.CATEGORY, {
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

    const deleteCategory = async (id) => {
        try {
            const res = await fetchJson(API_ENDPOINTS.CATEGORY, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            })
            toast(res.message)
            getRecords()
        } catch (err) {
            console.log(err)
            toast(err.message)
        }
    }

    const editCategory = async ({ name }, recordId) => {
        try {
            const res = await fetchJson(API_ENDPOINTS.CATEGORY, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, recordId }),
            })
            toast(res.message)
            getRecords()
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
                    initialValues={{ category: '' }}
                    validationSchema={validationSchema.categorySchema}
                    onSubmit={addCategory}
                >
                    {({ touched, errors, handleBlur, handleChange, values }) => {
                        return (
                            <Form className={Tabstyles.form}>
                                <Input
                                    id="category"
                                    label="category"
                                    name="category"
                                    type="text"
                                    background="white"
                                    placeholder="Add Category"
                                    autoComplete="off"
                                    error={touched.category && errors?.category}
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
                    handleDelete={deleteCategory}
                    handleEdit={editCategory}
                    title="Change Category"
                />
            )}
        </div>
    )
}
