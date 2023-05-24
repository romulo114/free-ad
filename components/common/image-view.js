import Image from 'next/image'
import ImageViewStyle from './image-view.module.css'

export const ImageView = ({ src, alt = '', isLarge = false, label, ...props }) => {
    return (
        <div className={ImageViewStyle.imageViewStyle} {...props}>
            <Image
                src={src.data_url}
                alt=""
                layout="fill"
                objectFit="cover"
                className={ImageViewStyle.img}
            />
        </div>
    )
}
