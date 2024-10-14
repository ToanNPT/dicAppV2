// MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import "../../assets/common.css"

export type TopicDto = {
    id: number,
    topicName: string,
    thumbnail: string,
    isHidden: boolean
    viewCount: number,
    updateTime: string
}

export type TopicCardProps = {
    data: TopicDto
    onClick: () => void
}

const TopicCard = (prop: TopicCardProps) => {
    return (
        <Card onClick={prop.onClick} className="hover-card">
            <CardMedia image={prop.data.thumbnail} className='bs-[200px]'/>
            <CardContent>
                <Typography variant='h5' className='mbe-2'>
                    {prop.data.topicName}
                </Typography>
                <Typography>
                    Lượt xem: {prop.data.viewCount}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default TopicCard
