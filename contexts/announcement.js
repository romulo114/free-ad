import * as React from 'react'
import { API_ENDPOINTS } from '../utils/api-endpoints'
import fetchJson from '../lib/fetchJson'
import { toast } from 'react-toastify'
const AnnouncementContext = React.createContext()

function AnnouncementProvider(props) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [announcement, setAnnouncement] = React.useState('Hello there.')

    const getAnnouncement = React.useCallback(async () => {
        setIsLoading(true)
        try {
            const res = await fetchJson(API_ENDPOINTS.ANNOUNCEMENT, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            if (res.success) {
                const resData = res.data
                const activeAnnouncement = resData.find((item) => item.active)
                setAnnouncement(activeAnnouncement.name)
            } else {
                toast(res.message)
                setAnnouncement('Hello there.')
                return []
            }
        } catch (err) {
            toast('Something went wrong on the server.')
            return []
        } finally {
            setIsLoading(false)
        }
    }, [])

    const value = React.useMemo(
        () => ({ announcement, setAnnouncement, getAnnouncement, isLoading }),
        [announcement, setAnnouncement, getAnnouncement, isLoading],
    )

    React.useEffect(() => {
        getAnnouncement()
    }, [])
    return (
        <AnnouncementContext.Provider value={value} {...props}>
            {props.children}
        </AnnouncementContext.Provider>
    )
}

function useAnnouncement() {
    const context = React.useContext(AnnouncementContext)
    if (context === undefined) {
        throw new Error(`useAnnouncement must be used within a AnnouncementProvider`)
    }
    return context
}

export { useAnnouncement, AnnouncementProvider }
