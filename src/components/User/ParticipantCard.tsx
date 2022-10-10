import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'


export default function ParticipantCard(props : {pid:string}) {

    //call getuserbyid
    const user = {
        name: "Zarya",
        faculty: "Engineering",
        year: "4",
        url: "https://www.1999.co.jp/itbig54/10542740a2_m.jpg"
        // url: "https://images-platform.99static.com//ywu0w6BbzK51tna45IRBAnghaoU=/0x0:2000x2000/fit-in/500x500/99designs-contests-attachments/89/89391/attachment_89391104"
    }
      
    return (
    <div>
        <Card style={{"maxWidth":"500px"}}>
            <Row xs={1} md={2} className="g-4">
                <Col sm={5} md={5}>
                    <Card.Img 
                        style={{"objectFit": "cover"}}
                        variant="center"
                        src={user.url}/>
                </Col>
                <Col sm={7} md={7}>
                <Card.Body>
                    <Card.Text style={{textAlign:"left"}}>
                        <p>Name : {user.name}</p>
                        <p>Faculty : {user.faculty}</p>
                        <p>Year : {user.year}</p>
                    </Card.Text>
                </Card.Body>
                </Col>
            </Row>
        </Card>
    </div>
    )
}
