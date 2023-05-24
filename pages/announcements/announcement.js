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
import { useAnnouncement } from '../../contexts/announcement'

export default function Announcement() {
    const [status, setStatus] = useState('idle')
    const [records, setRecords] = useState(null)
    const [loading, setLoading] = useState(false)
    const { setAnnouncement } = useAnnouncement()
    const addAnnouncement = async ({ announcement }) => {
        setStatus('pending')
        try {
            const res = await fetchJson(API_ENDPOINTS.ANNOUNCEMENT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ announcement }),
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
            const res = await fetchJson(API_ENDPOINTS.ANNOUNCEMENT, {
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

    const deleteAnnouncement = async (id) => {
        try {
            const res = await fetchJson(API_ENDPOINTS.ANNOUNCEMENT, {
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

    const editAnnouncement = async ({ name }, recordId) => {
        try {
            const res = await fetchJson(API_ENDPOINTS.ANNOUNCEMENT, {
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
                    initialValues={{ announcement: '' }}
                    validationSchema={validationSchema.announcementSchema}
                    onSubmit={addAnnouncement}
                >
                    {({ touched, errors, handleBlur, handleChange, values }) => {
                        return (
                            <Form className={Tabstyles.form}>
                                <Input
                                    id="announcement"
                                    label="announcement"
                                    name="announcement"
                                    type="text"
                                    background="white"
                                    placeholder="Add Announcement"
                                    autoComplete="off"
                                    error={touched.announcement && errors?.announcement}
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
                    handleDelete={deleteAnnouncement}
                    handleEdit={editAnnouncement}
                    title="Change Announcement"
                    addBtn="Activate"
                    addedAction={setAnnouncement}
                />
            )}
        </div>
    )
}
