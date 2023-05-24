import listingStyles from './listings.module.css'
import { Button } from '../../components/common/button'
import Spinner from '../../components/common/spinner'

const SubmitField = ({ status, disabled, handleCreateList }) => {
    return (
        <div className={listingStyles.actionBtn}>
            <Button
                style={{
                    marginRight: '10px',
                    backgroundColor: 'transparent',
                    color: 'black',
                    border: '1px solid black',
                }}
                onClick={handleCreateList}
                disabled={disabled}
                type="button"
            >
                {status === 'pending' ? <Spinner /> : 'create/publish'}
            </Button>
            {status === 'pending' ? <Spinner /> : <Button type="submit">Next</Button>}
        </div>
    )
}

export default SubmitField
