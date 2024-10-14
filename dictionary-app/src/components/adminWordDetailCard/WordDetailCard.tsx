// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import React, {SyntheticEvent, useRef, useState} from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import '../../assets/common.css';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

export type WordDetailDto = {
    id: number,
    keyWork: string,
    topicId: string,
    topicName: string,
    isHidden: boolean,
    voiceUrl: string,
    updateTime: string,
    wordType: string,
    descriptions: WordDescriptionDto[]
}

export type WordDescriptionDto = {
    id: number,
    wordId: number,
    wordType: string,
    description: string,
    sec: number,
    isHidden: boolean
}

export type WordDetailCardProp = {
    data: WordDetailDto
}

const AdminWordDetailCard = (prop: WordDetailCardProp) => {
    const audioRef = useRef(null); // Create a ref to control the audio element
    const [tabIndex, setTabIndex] = useState<string>('1')

    const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
        setTabIndex(newValue)
    }

    const handlePlayAudio = () => {
        if (audioRef.current) {
            audioRef.current.play(); // Play the audio when the button is clicked
        }
    };

    return (
        <section>
          <form>
              <Card sx={{my: 2}}>
                  <CardContent>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Box>

                              <Typography variant="h3">{prop.data.keyWork}</Typography>
                              <Typography variant="h5" style={{fontStyle: 'italic', fontWeight: '300'}}>
                                  {prop.data.wordType}
                              </Typography>
                              <Typography variant="body1"  className="topic_name_info_box">
                                  {`Chủ điểm: ${prop.data.topicName}`}
                              </Typography>
                          </Box>

                          <IconButton aria-label="play voice" onClick={handlePlayAudio}>
                              <i className="ri-volume-up-line" style={{fontSize: '2rem'}}></i>
                              <audio ref={audioRef} style={{display: 'none'}}
                                     src={prop.data.voiceUrl}/>
                          </IconButton>
                      </Box>
                  </CardContent>
              </Card>
              <Card>
                  <TabContext value={tabIndex} >
                      <TabList onChange={handleChangeTab} aria-label='card navigation examples'>
                          {
                              prop.data.descriptions.map((desc, index) => {
                                  return <Tab key={index + 1} value={index +1} label={desc.wordType}/>
                              })
                          }
                      </TabList>
                      <CardContent sx={{minHeight: "500px"}}>
                          {
                              prop.data.descriptions.map((desc, index) => {
                                  return (
                                      <TabPanel key={index + 1} value={index + 1}>
                                          <Typography className='mbe-6'>
                                              {desc.description}
                                          </Typography>
                                      </TabPanel>
                                  )
                              })
                          }
                      </CardContent>
                  </TabContext>
              </Card>
          </form>
        </section>
    )
}

export default AdminWordDetailCard
