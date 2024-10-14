// MUI Imports
import Button from '@mui/material/Button'
import classnames from 'classnames'
import styles from './styles.module.css'

export  type InnerButtonProps = {
    title: string,
    onClick: () => void
}

const InnerButton = (props: InnerButtonProps) => {
  return (
    <div className={classnames(styles.wrapper, 'mui-fixed')}>
        <Button
            className={styles.button}
            role='button'
            onClick={() => props.onClick()}
        >
            {props.title}
            <span className={styles.buttonInner} />
        </Button>
    </div>
  )
}

export default InnerButton
