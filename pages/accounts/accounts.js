import { useState } from 'react'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import Input from '../../components/common/form/input'
import Spinner from '../../components/common/spinner'
import fetchJson from '../../lib/fetchJson'
import Tabstyles from '../../styles/Tabs.module.css'
import { API_ENDPOINTS } from '../../utils/api-endpoints'
import { validationSchema } from '../../utils/schema'
import Select from '../../components/common/form/select'
import DatePicker from '../../components/common/form/date-picker'

export default function Accounts() {
    const [status, setStatus] = useState('idle')
    const roles = ['Individual', 'Agency']
    const accountStates = ['active', 'inActive']

    const addAccount = async ({
        email,
        password,
        role,
        name,
        surname,
        limit,
        consent,
        accountStatus,
        birthday,
    }) => {
        setStatus('pending')
        try {
            const res = await fetchJson(API_ENDPOINTS.ACCOUNT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    role,
                    name,
                    surname,
                    limit,
                    consent,
                    accountStatus,
                    birthday,
                }),
            })
            toast(res.message)
        } catch (err) {
            console.log(err)
            toast(err.message)
        } finally {
            setStatus('resolve')
        }
    }

    return (
        <div className={Tabstyles.location}>
            <div className={Tabstyles.TabsBlock}>
                <Formik
                    initialValues={{ limit: 1, accountStatus: 'active', role: 'individual' }}
                    validationSchema={validationSchema.accountSchema}
                    onSubmit={addAccount}
                >
                    {({ touched, errors, handleBlur, handleChange, values }) => {
                        return (
                            <Form className={Tabstyles.account_form}>
                                <div className={Tabstyles.input_field}>
                                    <Input
                                        id="email"
                                        label="email"
                                        name="email"
                                        type="email"
                                        background="white"
                                        placeholder="Add User Email"
                                        autoComplete="off"
                                        error={touched.email && errors?.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values}
                                        required
                                    />
                                    <Input
                                        id="password"
                                        label="password"
                                        name="password"
                                        type="password"
                                        background="white"
                                        placeholder="Add User Password"
                                        autoComplete="off"
                                        error={touched.password && errors?.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values}
                                        required
                                    />
                                    <Select
                                        name="role"
                                        id="role"
                                        label="Select Role"
                                        error={touched.role && errors?.role}
                                        onChange={handleChange}
                                        options={roles}
                                        values={values}
                                        required
                                    />
                                </div>
                                <div className={Tabstyles.input_field}>
                                    <Input
                                        id="name"
                                        label="name"
                                        name="name"
                                        background="white"
                                        placeholder="Add User Name"
                                        autoComplete="off"
                                        error={touched.name && errors?.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values}
                                        required
                                    />
                                    <Input
                                        id="surname"
                                        label="surname"
                                        name="surname"
                                        background="white"
                                        placeholder="Add User Surname"
                                        autoComplete="off"
                                        error={touched.surname && errors?.surname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values}
                                        required
                                    />
                                    <Input
                                        id="limit"
                                        label="limit"
                                        name="limit"
                                        defaultValue={1}
                                        type="number"
                                        background="white"
                                        placeholder="Add Limit"
                                        autoComplete="off"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values}
                                        required
                                    />
                                </div>
                                <div className={Tabstyles.input_field}>
                                    <Input
                                        id="consent"
                                        label="consent"
                                        name="consent"
                                        background="white"
                                        placeholder="Add Consent"
                                        autoComplete="off"
                                        error={touched.consent && errors?.consent}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values}
                                        required
                                    />
                                    <Select
                                        name="accountStatus"
                                        id="accountStatus"
                                        label="Select Status"
                                        error={touched.accountStatus && errors?.accountStatus}
                                        onChange={handleChange}
                                        options={accountStates}
                                        values={values}
                                        required
                                    />
                                    <DatePicker
                                        id="birthday"
                                        label="birthday"
                                        name="birthday"
                                        type="date"
                                        background="white"
                                        autoComplete="off"
                                        error={
                                            values?.role === 'agency'
                                                ? null
                                                : touched.birthday && errors?.birthday
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values}
                                        disabled={values?.role === 'agency'}
                                        required={values?.role === 'agency' ? true : false}
                                    />
                                </div>
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
        </div>
    )
}
