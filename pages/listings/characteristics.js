import Input from '../../components/common/form/input'
import characteristicsStyles from './characteristics.module.css'
import Select from '../../components/common/form/select'
import SingleSelect from '../../components/common/form/single-select'
import GroupSelect from '../../components/common/form/group-select'

const CharacteristicsForm = ({ touched, errors, handleChange, values }) => {
    const nationalities = ['Hungarian', 'Hispanic', 'Asian']
    const languages = ['Hungarian', 'English']
    const orientations = ['Hetereosexual', 'Bisexual', 'Homosexual']
    const imeets = ['Males', 'Females', 'Transgender', 'Couples']
    const availabilities = ['Incall', 'Outcall Hotel', 'Outcall Residence']
    const heights = new Array(111).fill().map((item, index) => 140 + index)
    const weights = new Array(161).fill().map((item, index) => 40 + index)
    const cupSizes = ['A', 'B', 'C', 'D', 'DD', 'E+']
    const bTypes = ['Natural', 'Silicon']
    const pLengths = new Array(18).fill().map((item, index) => 11 + index)
    const pGirths = new Array(13).fill().map((item, index) => 8 + index)
    const hColors = ['Black', 'Blonde', 'Brown', 'Red', 'Other']
    const eColors = ['Amber', 'Blue', 'Brown', 'Green', 'Grey']
    const iHairs = ['Shaved', 'Trimmed', 'Natural']
    const bodyArts = ['Piercing', 'Tattoo']
    const smokings = ['Yes', 'Occasionally', 'No']
    const drinkings = ['Yes', 'Occasionally', 'No']
    const parties = ['Yes', 'No']

    return (
        <>
            <div className={characteristicsStyles.info_1}>
                <Select
                    id="nationality"
                    label="Nationality"
                    name="nationality"
                    options={nationalities}
                    defaultValue="Hungarian"
                    error={errors?.nationality}
                    values={values}
                />
                <Select
                    id="i_speak"
                    label="I Speak"
                    name="i_speak"
                    options={languages}
                    defaultValue="English"
                    error={errors?.i_speak}
                    values={values}
                />
                <SingleSelect
                    id="orientation"
                    label="Orientation"
                    name="orientation"
                    options={orientations}
                    error={errors.orientation}
                    values={values}
                    touched={touched}
                />
                <GroupSelect
                    id="i_meet"
                    name="i_meet"
                    label="I Meet"
                    options={imeets}
                    error={errors.i_meet}
                    values={values}
                />
                <GroupSelect
                    id="available_for"
                    label="Available For"
                    name="available_for"
                    options={availabilities}
                    error={errors.available_for}
                    values={values}
                />
            </div>
            <div className={characteristicsStyles.info_2}>
                <Select
                    id="height"
                    label="Height (cm)"
                    name="height"
                    error={errors.height}
                    defaultValue={170}
                    options={heights}
                    values={values}
                />
                <Select
                    id="weight"
                    label="Weight"
                    name="weight"
                    error={errors.weight}
                    defaultValue={55}
                    options={weights}
                    values={values}
                />
                {values.gender !== 'Male' && (
                    <>
                        <SingleSelect
                            id="cup_size"
                            label="Cup Size"
                            name="cup_size"
                            error={errors.cup_size}
                            options={cupSizes}
                            values={values}
                            touched={touched}
                        />
                        <SingleSelect
                            id="b_type"
                            label="Breast Type"
                            name="b_type"
                            error={errors.b_type}
                            options={bTypes}
                            values={values}
                            touched={touched}
                        />
                    </>
                )}
                {values.gender !== 'Female' && (
                    <>
                        <Select
                            id="p_length"
                            label="Penis Length (cm)"
                            name="p_length"
                            error={errors.p_length}
                            defaultValue={20}
                            options={pLengths}
                            values={values}
                        />
                        <Select
                            id="p_girth"
                            label="Penis Girth (cm)"
                            name="p_girth"
                            error={errors.p_girth}
                            defaultValue={14}
                            options={pGirths}
                            values={values}
                        />
                    </>
                )}
            </div>
            <div className={characteristicsStyles.info_3}>
                <SingleSelect
                    id="hair_color"
                    label="Hair Color"
                    name="hair_color"
                    error={errors.hair_color}
                    options={hColors}
                    values={values}
                    touched={touched}
                />
                <SingleSelect
                    id="eye_color"
                    label="Eye Color"
                    name="eye_color"
                    error={errors.eye_color}
                    options={eColors}
                    values={values}
                    touched={touched}
                />
                <SingleSelect
                    id="intimate_hair"
                    label="Weight"
                    name="intimate_hair"
                    error={errors.intimate_hair}
                    options={iHairs}
                    values={values}
                    touched={touched}
                />
                <GroupSelect
                    id="bodyart"
                    label="Bodyart"
                    name="bodyart"
                    error={errors.bodyart}
                    options={bodyArts}
                    values={values}
                />
            </div>
            <div className={characteristicsStyles.info_4}>
                <SingleSelect
                    id="smoking"
                    label="Smoking"
                    name="smoking"
                    error={errors.smoking}
                    options={smokings}
                    values={values}
                    touched={touched}
                />
                <SingleSelect
                    id="drinking"
                    label="Drinking"
                    name="drinking"
                    error={errors.drinking}
                    options={drinkings}
                    values={values}
                    touched={touched}
                />
                <SingleSelect
                    id="party_play"
                    label="Party & Play"
                    name="party_play"
                    error={errors.party_play}
                    options={parties}
                    values={values}
                    touched={touched}
                />
            </div>
        </>
    )
}

export default CharacteristicsForm
