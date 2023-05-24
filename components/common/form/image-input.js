import Image from 'next/image'
import React, { useState } from 'react'
import ImageUploading from 'react-images-uploading'
import styles from './image-input.module.css'
import { TbTrash, TbPencil } from 'react-icons/tb'
const ImageInput = ({
    label,
    border,
    id,
    name,
    error,
    background,
    handleError,
    setFieldValue,
    values,
    height,
    restrictions,
    width,
    src,
    ...props
}) => {
    let fieldSetStyle, legendStyle

    if (!!error) {
        fieldSetStyle = {
            border: '1px solid var(--color-red)',
        }
        legendStyle = {
            color: 'var(--color-red)',
        }
    } else {
        if (values[name]) {
            fieldSetStyle = {
                border: '1px solid var(--color-green)',
            }
            legendStyle = {
                color: 'var(--color-green)',
            }
        }
    }

    const [images, setImages] = useState([])
    const onChangeImg = (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList)
        setFieldValue(name, imageList[0])
    }
    return (
        <div className={styles.container}>
            <fieldset
                className={styles.fieldset}
                style={{ ...fieldSetStyle, height: height, width: width }}
                {...props}
            >
                <legend
                    className={styles.imageInputLegend}
                    style={{
                        marginLeft: '4px',
                        color: 'var(--color-grey)',
                        fontSize: '0.96rem',
                        textTransform: 'initial',
                        fontWeight: 'initial',
                        backgroundColor: 'transparent',
                        zIndex: 100,
                        position: 'relative',
                        ...legendStyle,
                    }}
                >
                    {label}
                </legend>
                <ImageUploading
                    value={images}
                    onChange={onChangeImg}
                    dataURLKey="data_url"
                    acceptType={['jpg', 'png', 'jpeg']}
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        <div
                            className={styles.uploadImageWrapper}
                            style={isDragging ? { color: 'red' } : null}
                            {...dragProps}
                        >
                            <div className={styles.circle} onClick={onImageUpload} />
                            <ul className={styles.imageCover}>
                                {restrictions?.map((item, index) => {
                                    return <li key={index}>{item}</li>
                                })}
                            </ul>
                            {imageList.map((image, idx) => (
                                <div key={idx} className={styles.imageItem}>
                                    <Image
                                        src={image.data_url}
                                        alt=""
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className={styles.imageItemBtnWrapper}>
                                        <button onClick={() => onImageRemove(idx)}>
                                            <TbTrash />
                                        </button>
                                        <button onClick={() => onImageUpdate(idx)}>
                                            <TbPencil />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </fieldset>
            <p className={styles.error} lh="1.4" align="left" color="red-1">
                {error}
            </p>
            {error && <div className={styles.styledError} onClick={handleError} />}
        </div>
    )
}

export default ImageInput
