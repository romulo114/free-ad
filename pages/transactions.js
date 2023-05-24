import { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { AnnouncementProvider } from '../contexts/announcement'
import styles from '../styles/Layout.module.css'
import { API_ENDPOINTS } from '../utils/api-endpoints'
import fetchJson from '../lib/fetchJson'
export default function Transactions() {
    const [records, setRecords] = useState(null)
    const getRecords = async () => {
        
        try {
            const res = await fetchJson(API_ENDPOINTS.LISTING, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            if (res.success) {
                setRecords(res.data)
            } else {
                return []
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getRecords()
    }, [])

    console.log(records)

    return (
        <div className={styles.PageContainer}>
            <div className={styles.PageGrid}>
                
            </div>
        </div>
    )
}

Transactions.getLayout = function getLayout(page) {
    return (
        <AnnouncementProvider>
            <Layout>{page}</Layout>
        </AnnouncementProvider>
    )
}
