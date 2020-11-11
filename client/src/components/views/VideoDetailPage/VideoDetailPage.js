import React, {useEffect} from 'react'
import {Row, Col, List} from 'antd'
import Axios from 'axios'

function VideoDetailPage() {


    const videoId = this.props.match.params.videoId
    const variable = {videoId: videoId}

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
        .then(response => {
            if(response.data.success) {

            } else {
                alert("비디오 데이터를 가져오는데 실패")
            }
        })
    }, [])


    return (
        <div>
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>

                    <div style={{width: '100%', padding:'3rem 4rem'}}>
                        <vido style={{width: '100%' }} src controls />

                        <List.Item actions >

                            <List.Item.Meta 
                            avatar
                            title
                            description
                            />
                            
                        </List.Item>

                        {/* {Comments} */}

                    </div>

                </Col>
                <Col lg={6} xs={24}>
                    Side Video
                </Col>
            </Row>
            
        </div>
    )
}

export default VideoDetailPage
