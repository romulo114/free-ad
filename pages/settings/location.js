import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ActionTab } from '../../components/tab'
import fetchJson from '../../lib/fetchJson'
import Tabstyles from '../../styles/Tabs.module.css'
import { API_ENDPOINTS } from '../../utils/api-endpoints'
import { validationSchema } from '../../utils/schema'
import { TableRecord } from '../../components/table'
import Spinner from '../../components/common/spinner'

export default function Location() {
    const [toggleState, setToggleState] = useState(1)
    const toggleTab = (id) => {
        setToggleState(id)
    }
    const [status, setStatus] = useState('idle')
    const [records, setRecords] = useState(null)
    const [loading, setLoading] = useState(false)
    const getRecords = async (toggleState) => {
        setLoading(true)
        let apiEndpoint
        switch (toggleState) {
            case 1:
                apiEndpoint = API_ENDPOINTS.COUNTRY
                break
            case 2:
                apiEndpoint = API_ENDPOINTS.CITY
                break
            case 3:
                apiEndpoint = API_ENDPOINTS.AREA
                break
            case 4:
                apiEndpoint = API_ENDPOINTS.STREET
                break
            default:
                break
        }
        try {
            const res = await fetchJson(apiEndpoint, {
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

    const addCountry = async ({ country }) => {
        setStatus('pending')
        try {
            const res = await fetchJson(API_ENDPOINTS.COUNTRY, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country }),
            })
            toast(res.message)
            getRecords(1)
        } catch (err) {
            console.log(err)
            toast(err.message)
        } finally {
            setStatus('resolve')
        }
    }
    const addCity = async ({ city }) => {
        setStatus('pending')
        try {
            const res = await fetchJson(API_ENDPOINTS.CITY, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ city }),
            })
            toast(res.message)
            getRecords(2)
        } catch (err) {
            console.log(err)
            toast(err.message)
        } finally {
            setStatus('resolve')
        }
    }
    const addArea = async ({ area }) => {
        setStatus('pending')
        try {
            const res = await fetchJson(API_ENDPOINTS.AREA, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ area }),
            })
            toast(res.message)
            getRecords(3)
        } catch (err) {
            console.log(err)
            toast(err.message)
        } finally {
            setStatus('resolve')
        }
    }
    const addStreet = async ({ street }) => {
        setStatus('pending')
        try {
            const res = await fetchJson(API_ENDPOINTS.STREET, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ street }),
            })
            toast(res.message)
            getRecords(4)
        } catch (err) {
            console.log(err)
            toast(err.message)
        } finally {
            setStatus('resolve')
        }
    }

    const handleDelete = async (id) => {
        let apiEndpoint
        switch (toggleState) {
            case 1:
                apiEndpoint = API_ENDPOINTS.COUNTRY
                break
            case 2:
                apiEndpoint = API_ENDPOINTS.CITY
                break
            case 3:
                apiEndpoint = API_ENDPOINTS.AREA
                break
            case 4:
                apiEndpoint = API_ENDPOINTS.STREET
                break
            default:
                break
        }
        try {
            const res = await fetchJson(apiEndpoint, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            })
            toast(res.message)
            getRecords(toggleState)
        } catch (err) {
            console.log(err)
            toast(err.message)
        }
    }

    const handleEdit = async ({ name }, recordId) => {
        let apiEndpoint
        switch (toggleState) {
            case 1:
                apiEndpoint = API_ENDPOINTS.COUNTRY
                break
            case 2:
                apiEndpoint = API_ENDPOINTS.CITY
                break
            case 3:
                apiEndpoint = API_ENDPOINTS.AREA
                break
            case 4:
                apiEndpoint = API_ENDPOINTS.STREET
                break
            default:
                break
        }
        try {
            const res = await fetchJson(apiEndpoint, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, recordId }),
            })
            toast(res.message)
            getRecords(toggleState)
        } catch (err) {
            console.log(err)
            toast(err.message)
        }
    }

    useEffect(() => {
        getRecords(toggleState)
    }, [toggleState])

    return (
        <div className={Tabstyles.location}>
            <div className={Tabstyles.TabsBlock}>
                <button
                    className={
                        toggleState === 1
                            ? `${Tabstyles.Tabs} ${Tabstyles.ActiveTabs}`
                            : Tabstyles.Tabs
                    }
                    onClick={() => {
                        toggleTab(1)
                    }}
                >
                    country
                </button>
                <button
                    className={
                        toggleState === 2
                            ? `${Tabstyles.Tabs} ${Tabstyles.ActiveTabs}`
                            : Tabstyles.Tabs
                    }
                    onClick={() => {
                        toggleTab(2)
                    }}
                >
                    city
                </button>
                <button
                    className={
                        toggleState === 3
                            ? `${Tabstyles.Tabs} ${Tabstyles.ActiveTabs}`
                            : Tabstyles.Tabs
                    }
                    onClick={() => {
                        toggleTab(3)
                    }}
                >
                    area
                </button>
                <button
                    className={
                        toggleState === 4
                            ? `${Tabstyles.Tabs} ${Tabstyles.ActiveTabs}`
                            : Tabstyles.Tabs
                    }
                    onClick={() => {
                        toggleTab(4)
                    }}
                >
                    street
                </button>
            </div>
            {toggleState === 1 && (
                <ActionTab
                    initialValues={{ country: '' }}
                    validationSchema={validationSchema.countrySchema}
                    onSubmit={addCountry}
                    name="country"
                    label="country"
                    status={status}
                />
            )}
            {toggleState === 2 && (
                <ActionTab
                    initialValues={{ city: '' }}
                    validationSchema={validationSchema.citySchema}
                    onSubmit={addCity}
                    name="city"
                    label="City"
                    status={status}
                />
            )}
            {toggleState === 3 && (
                <ActionTab
                    initialValues={{ area: '' }}
                    validationSchema={validationSchema.areaSchema}
                    onSubmit={addArea}
                    name="area"
                    label="Area"
                    status={status}
                />
            )}
            {toggleState === 4 && (
                <ActionTab
                    initialValues={{ street: '' }}
                    validationSchema={validationSchema.streetSchema}
                    onSubmit={addStreet}
                    name="street"
                    label="Street"
                    status={status}
                />
            )}
            {loading ? (
                <Spinner />
            ) : (
                <TableRecord
                    records={records}
                    toggleState={toggleState}
                    getRecords={getRecords}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    title="Change location"
                />
            )}
        </div>
    )
}
