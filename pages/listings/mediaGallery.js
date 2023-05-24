import mediaGalleryStyle from './mediaGallery.module.css'
import ImageUploading from 'react-images-uploading'
import { useState } from 'react'
import { useEffect } from 'react'
import Image from 'next/image'

const MediaGalleryForm = ({ values, setFieldValue, errors }) => {
    const [imgGallery, setImgGallery] = useState('')
    const [thumbnails, setThumbnails] = useState([])
    const onChangeImg = (imageList, addUpdateIndex) => {
        // data for submit
        setThumbnails(imageList)
        setFieldValue(`thumbnails[${addUpdateIndex}]`, imageList[addUpdateIndex])
    }
    useEffect(() => {
        setImgGallery(values.listingPicture ? values.listingPicture : '')
    }, [values.listingPicture])
    const handleThumbnailClick = (src) => {
        setImgGallery(src)
        setFieldValue('listingPicture', src)
    }
    console.log(errors)
    return (
        <>
            <div className={mediaGalleryStyle.info_1}>
                <div className={mediaGalleryStyle.info_1_1}>
                    <Image src={imgGallery.data_url} alt="" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={mediaGalleryStyle.info_1_2}>
                    <div className={mediaGalleryStyle.thumbnailsContainer}>
                        <fieldset
                            className={mediaGalleryStyle.fieldset}
                            style={{ height: '120px', width: '90px' }}
                        >
                            <legend
                                style={{
                                    marginLeft: '4px',
                                    color: 'var(--color-grey)',
                                    fontSize: '0.96rem',
                                    textTransform: 'initial',
                                    fontWeight: 'initial',
                                    backgroundColor: 'transparent',
                                    zIndex: 100,
                                    position: 'relative',
                                }}
                            >
                                Upload
                            </legend>
                            <ImageUploading
                                multiple
                                value={thumbnails}
                                onChange={onChangeImg}
                                dataURLKey="data_url"
                                maxNumber={3}
                                acceptType={['jpg', 'png', 'jpeg']}
                            >
                                {({ imageList, onImageUpload, isDragging, dragProps }) => (
                                    <div
                                        className={mediaGalleryStyle.uploadImageWrapper}
                                        style={isDragging ? { color: 'red' } : null}
                                        {...dragProps}
                                    >
                                        <div className={mediaGalleryStyle.thumbnails}>
                                            {imageList.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className={mediaGalleryStyle.thumbnailsItem}
                                                >
                                                    <Image
                                                        src={image['data_url']}
                                                        alt=""
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className={mediaGalleryStyle.thumbnails}>
                                            {new Array(3).fill().map((item, index) => {
                                                return (
                                                    <div
                                                        className={mediaGalleryStyle.thumbnailsItem}
                                                        key={index}
                                                        onClick={() =>
                                                            handleThumbnailClick(imageList[index])
                                                        }
                                                    ></div>
                                                )
                                            })}
                                        </div>

                                        <div
                                            className={mediaGalleryStyle.circle}
                                            onClick={onImageUpload}
                                        />
                                    </div>
                                )}
                            </ImageUploading>
                        </fieldset>
                    </div>
                </div>
            </div>
            <div className={mediaGalleryStyle.info_1}>
                <div className={mediaGalleryStyle.info_1_1}>
                    <Image src={imgGallery.data_url} alt="" fill />
                </div>
                <div className={mediaGalleryStyle.info_1_2}>
                    <div className={mediaGalleryStyle.thumbnailsContainer}>
                        <fieldset
                            className={mediaGalleryStyle.fieldset}
                            style={{ height: '120px', width: '90px' }}
                        >
                            <legend
                                style={{
                                    marginLeft: '4px',
                                    color: 'var(--color-grey)',
                                    fontSize: '0.96rem',
                                    textTransform: 'initial',
                                    fontWeight: 'initial',
                                    backgroundColor: 'transparent',
                                    zIndex: 100,
                                    position: 'relative',
                                }}
                            >
                                Upload
                            </legend>
                            <ImageUploading
                                multiple
                                value={thumbnails}
                                onChange={onChangeImg}
                                dataURLKey="data_url"
                                maxNumber={3}
                                acceptType={['jpg', 'png', 'jpeg']}
                            >
                                {({ imageList, onImageUpload, isDragging, dragProps }) => (
                                    <div
                                        className={mediaGalleryStyle.uploadImageWrapper}
                                        style={isDragging ? { color: 'red' } : null}
                                        {...dragProps}
                                    >
                                        <div className={mediaGalleryStyle.thumbnails}>
                                            {imageList.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className={mediaGalleryStyle.thumbnailsItem}
                                                >
                                                    <Image src={image['data_url']} alt="" fill />
                                                </div>
                                            ))}
                                        </div>
                                        <div className={mediaGalleryStyle.thumbnails}>
                                            {new Array(3).fill().map((item, index) => {
                                                return (
                                                    <div
                                                        className={mediaGalleryStyle.thumbnailsItem}
                                                        key={index}
                                                        onClick={() =>
                                                            handleThumbnailClick(imageList[index])
                                                        }
                                                    ></div>
                                                )
                                            })}
                                        </div>

                                        <div
                                            className={mediaGalleryStyle.circle}
                                            onClick={onImageUpload}
                                        />
                                    </div>
                                )}
                            </ImageUploading>
                        </fieldset>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MediaGalleryForm
