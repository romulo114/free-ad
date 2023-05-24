import styles from '../../styles/Layout.module.css'
import Image from 'next/image'
import Link from 'next/link'
import profilePic from '../../public/tfs.svg'
import logoutIco from '../../public/logout.svg'
import fetchJson from '../../lib/fetchJson'
import { API_ENDPOINTS } from '../../utils/api-endpoints'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useAnnouncement } from '../../contexts/announcement'
import Spinner from '../common/spinner'

const Header = () => {
    const router = useRouter()
    const { mutate: mutateUser } = useSWR('/api/user')
    const { announcement, isLoading } = useAnnouncement()
    const handleLogout = async () => {
        try {
            mutateUser(
                await fetchJson(API_ENDPOINTS.LOGOUT, {
                    method: 'POST',
                }),
                false,
            )
            await router.push('/')
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className={styles.HeaderSection}>
                <div className={styles.Container}>
                    <div className={styles.HeaderGrid}>
                        <div className={styles.HeaderLogo}>
                            <Image
                                src={profilePic}
                                alt="Picture of the author"
                                width={80}
                                // blurDataURL="data:..." automatically provided
                                // placeholder="blur" // Optional blur-up while loading
                            />
                        </div>
                        <div className={styles.HeaderTitle}>
                            <h1>
                                lus <span>sagittis</span> lorem eu massa
                            </h1>
                        </div>
                        <div className={styles.HeaderNav}>
                            <Link className={styles.HeaderButton} href="/">
                                Home
                            </Link>
                            <Link className={styles.HeaderButtonActive} href="/">
                                Admin
                            </Link>
                            <div className={styles.HeaderLogoutIco} onClick={handleLogout}>
                                <Image
                                    src={logoutIco}
                                    alt="Picture of the author"
                                    width={30}
                                    // blurDataURL="data:..." automatically provided
                                    // placeholder="blur" // Optional blur-up while loading
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.HeaderSubSection}>
                <div className={styles.Container}>
                    <div className={styles.SubHeaderGrid}>
                        {isLoading ? <Spinner /> : announcement}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
