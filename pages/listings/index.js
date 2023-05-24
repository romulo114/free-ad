// libs
import { useState } from 'react'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import Layout from '../../components/layout/Layout'
import { AnnouncementProvider } from '../../contexts/announcement'

// multipart forms
import BasicDetailsForm from './basicDetails'
import CharacteristicsForm from './characteristics'
import MediaGalleryForm from './mediaGallery'
import ServicesForm from './services'
import AvailabilityForm from './availability'
import SubmitField from './submitField'
// styles
import styles from '../../styles/Layout.module.css'
import Tabstyles from '../../styles/Tabs.module.css'
import listingStyles from './listings.module.css'
// utils
import { listingSchema } from '../../utils/schema'
import { API_ENDPOINTS } from '../../utils/api-endpoints'
import fetchJson from '../../lib/fetchJson'

const steps = [
    'basic details',
    'characteristics',
    'media gallery',
    'services',
    'availability & rates',
]
export default function Listings() {
    const [status, setStatus] = useState('idle')
    const [activeStep, setActiveStep] = useState(0)
    const [listingId, setListingId] = useState('')
    const isLastStep = activeStep === steps.length - 1 || activeStep === 0

    const createListingBasicDetails = async ({
        listingName,
        age,
        gender,
        code,
        listingPicture,
        aboutMe,
        contactMethods,
        locationCountry,
        locationCity,
    }) => {
        setStatus('pending')
        try {
            const res = await fetchJson(API_ENDPOINTS.BASICDETAILS, {
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: JSON.stringify({
                    listingName,
                    age,
                    gender,
                    code,
                    listingPicture,
                    aboutMe,
                    contactMethods,
                    locationCountry,
                    locationCity,
                }),
            })
            setStatus('resolve')
            return res
        } catch (err) {
            console.log(err)
            toast(err.message)
        }
    }

    const createCharacteristics = async ({
        nationality,
        i_speak,
        orientation,
        i_meet,
        available_for,
        height,
        weight,
        cup_size,
        b_type,
        p_length,
        p_girth,
        hair_color,
        eye_color,
        intimate_hair,
        bodyart,
        smoking,
        drinking,
        party_play,
    }) => {
        setStatus('pending')
        try {
            const res = await fetchJson(API_ENDPOINTS.CHARACTERISTICS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nationality,
                    i_speak,
                    orientation,
                    i_meet,
                    available_for,
                    height,
                    weight,
                    cup_size,
                    b_type,
                    p_length,
                    p_girth,
                    hair_color,
                    eye_color,
                    intimate_hair,
                    bodyart,
                    smoking,
                    drinking,
                    party_play,
                    listingId,
                }),
            })
            setStatus('resolve')
            return res
        } catch (err) {
            console.log(err)
            toast(err.message)
        }
    }

    const createMediaGallery = async ({ listingPicture, thumbnails }) => {
        setStatus('pending')
        try {
            const res = await fetchJson(API_ENDPOINTS.MEDIAGALLERY, {
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: JSON.stringify({
                    listingPicture,
                    thumbnails,
                    listingId,
                }),
            })
            setStatus('resolve')
            return res
        } catch (err) {
            console.log(err)
            toast(err.message)
        }
    }

    const createServices = async (services) => {
        setStatus('pending')
        try {
            const res = await fetchJson(API_ENDPOINTS.SERVICES, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    services,
                    listingId,
                }),
            })
            setStatus('resolve')
            return res
        } catch (err) {
            console.log(err)
            toast(err.message)
        }
    }

    const createAvailability = async (availability) => {
        setStatus('pending')
        try {
            const res = await fetchJson(API_ENDPOINTS.AVAILABILITY, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    availability,
                    listingId,
                }),
            })
            setStatus('resolve')
            return res
        } catch (err) {
            console.log(err)
            toast(err.message)
        }
    }

    const handleCreateList = async (values) => {
        try {
            const res = await createListingBasicDetails(values)
            if (res.success) {
                setListingId(res.data)
                toast(res.message)
            } else {
                console.log('failed step 1')
            }
        } catch (err) {
            console.log('err', err)
        }

        setActiveStep(0)
    }

    const handleNextForm = async (values) => {
        switch (activeStep) {
            case 0:
                try {
                    const res = await createListingBasicDetails(values)
                    if (res.success) {
                        setListingId(res.data)
                        toast(res.message)
                        setActiveStep(1)
                    } else {
                        console.log('failed step 1')
                    }
                } catch (err) {
                    console.log('err', err)
                }
                break
            case 1:
                try {
                    const res = await createCharacteristics(values, listingId)
                    if (res.success) {
                        toast(res.message)
                        setActiveStep(2)
                    } else {
                        console.log('failed step 2')
                    }
                } catch (err) {
                    console.log('err', err)
                }
                break
            case 2:
                try {
                    const res = await createMediaGallery(values, listingId)
                    if (res.success) {
                        if (res.message) {
                            toast(res.message)
                        }
                        setActiveStep(3)
                    } else {
                        console.log('failed step 3')
                    }
                } catch (err) {
                    console.log('err', err)
                }
                break
            case 3:
                try {
                    const res = await createServices(values.services, listingId)
                    if (res.success) {
                        toast(res.message)
                        setActiveStep(4)
                    } else {
                        console.log('failed step 4')
                    }
                } catch (err) {
                    console.log('err', err)
                }
                break
            case 4:
                try {
                    const res = await createAvailability(values.availability, listingId)
                    if (res.success) {
                        toast(res.message)
                        setActiveStep(0)
                    } else {
                        console.log('failed step 5')
                    }
                } catch (err) {
                    console.log('err', err)
                }
                break
            default:
                break
        }
    }

    function _renderStepContent({
        step,
        touched,
        errors,
        handleBlur,
        handleChange,
        setFieldValue,
        values,
    }) {
        switch (step) {
            case 0:
                return (
                    <BasicDetailsForm
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        touched={touched}
                        values={values}
                    />
                )
            case 1:
                return (
                    <CharacteristicsForm
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        values={values}
                    />
                )
            case 2:
                return (
                    <MediaGalleryForm
                        errors={errors}
                        setFieldValue={setFieldValue}
                        values={values}
                    />
                )
            case 3:
                return (
                    <ServicesForm
                        errors={errors}
                        setValues={(values) => setFieldValue('services', values)}
                        values={values.services}
                    />
                )
            case 4:
                return (
                    <AvailabilityForm
                        setValues={(values) => setFieldValue('availability', values)}
                        values={values.availability}
                        errors={errors}
                    />
                )
            default:
                return null
        }
    }

    return (
        <div className={styles.PageContainer}>
            <div className={styles.fullPageGrid}>
                <fieldset className={styles.fieldsetBox}>
                    <legend>Listings</legend>
                    <div className={listingStyles.tabsBlock}>
                        {steps.map((step, idx) => {
                            return (
                                <button
                                    key={idx}
                                    className={
                                        activeStep === idx
                                            ? `${Tabstyles.Tabs} ${Tabstyles.ActiveTabs}`
                                            : Tabstyles.Tabs
                                    }
                                >
                                    {idx + 1} {step}
                                </button>
                            )
                        })}
                    </div>
                    <Formik
                        initialValues={{
                            listingName: '',
                            age: 21,
                            gender: '',
                            listingPicture: null,
                            contactMethods: [],
                            locationCountry: 'Cyprus',
                            locationCity: 'Limassol',
                            thumbnails: null,
                            nationality: 'Hungarian',
                            i_speak: 'English',
                            height: 170,
                            weight: 55,
                            p_length: 20,
                            p_girth: 14,
                            cupsize: '',
                            services: [
                                { title: '69', serviceType: null, price: 15 },
                                { title: 'Anal Sex', serviceType: null, price: 15 },
                                { title: 'Body Cumshot', serviceType: null, price: 15 },
                                { title: 'Classic Massage', serviceType: null, price: 15 },
                                { title: 'Erotic Massage', serviceType: null, price: 15 },
                                { title: 'Nuru Massage', serviceType: null, price: 15 },
                                { title: 'BDSM', serviceType: null, price: 15 },
                                { title: 'Bondage', serviceType: null, price: 15 },
                                { title: 'Dominance', serviceType: null, price: 15 },
                                { title: 'Companion for Lunch', serviceType: null, price: 15 },
                                { title: 'Companion for Vacations', serviceType: null, price: 15 },
                                { title: 'Overnight (12h)', serviceType: null, price: 15 },
                            ],
                            availability: {
                                workingHours: [
                                    { when: 'Monday', active: false, from: '17:00', to: '21:30' },
                                    { when: 'Tuesday', active: false, from: '17:00', to: '21:30' },
                                    {
                                        when: 'Wednesday',
                                        active: false,
                                        from: '17:00',
                                        to: '21:30',
                                    },
                                    { when: 'Thursday', active: false, from: '17:00', to: '21:30' },
                                    { when: 'Friday', active: false, from: '17:00', to: '21:30' },
                                    { when: 'Saturday', active: false, from: '17:00', to: '21:30' },
                                    { when: 'Sunday', active: false, from: '17:00', to: '21:30' },
                                ],
                                call: [
                                    {
                                        title: 'InCall',
                                        availability: false,
                                        rate: { duration: '20min', price: 50 },
                                    },
                                    {
                                        title: 'outCall',
                                        availability: false,
                                        rate: { duration: '20min', price: 50 },
                                    },
                                ],
                            },
                        }}
                        validationSchema={listingSchema[activeStep]}
                        onSubmit={handleNextForm}
                    >
                        {({ touched, errors, handleBlur, handleChange, setFieldValue, values }) => {
                            return (
                                <Form className={listingStyles.flexForm}>
                                    {_renderStepContent({
                                        step: activeStep,
                                        touched,
                                        errors,
                                        handleBlur,
                                        handleChange,
                                        setFieldValue,
                                        values,
                                    })}
                                    <SubmitField
                                        status={status}
                                        disabled={!isLastStep}
                                        handleCreateList={handleCreateList}
                                    />
                                </Form>
                            )
                        }}
                    </Formik>
                </fieldset>
            </div>
        </div>
    )
}

Listings.getLayout = function getLayout(page) {
    return (
        <AnnouncementProvider>
            <Layout>{page}</Layout>
        </AnnouncementProvider>
    )
}
