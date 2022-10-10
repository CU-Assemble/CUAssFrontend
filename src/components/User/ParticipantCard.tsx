import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'


interface UserInfo {
    StudentId: string,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string,
    Name: string,
    Nickname: string,
    Faculty: string,
    Tel: string,
    Email: string,
    Password: string
}

const currentUser = {
    StudentId: "",
    CreatedAt: "",
    UpdatedAt: "",
    DeletedAt: "",
    Name: "",
    Nickname: "",
    Faculty: "",
    Tel: "",
    Email: "",
    Password: ""
}
export default function ParticipantCard(props : {pid:string}) {

    //call getuserbyid

    // const mockuser : UserInfo = {
    //     name: "Okabe",
    //     faculty: "Engineering",
    //     year: "4",
    //     url: "https://www.1999.co.jp/itbig54/10542740a2_m.jpg"
    //     // url: "https://images-platform.99static.com//ywu0w6BbzK51tna45IRBAnghaoU=/0x0:2000x2000/fit-in/500x500/99designs-contests-attachments/89/89391/attachment_89391104"
    // }

    const [user, setUser] = useState(currentUser)
    // useEffect
    useEffect(()=>{
        axios({
            method: 'get',
            url: `https://6343af8fb9ab4243cad57d7d.mockapi.io/users/${props.pid}`, //url
            timeout: 2000
        })
        .then((res)=>{
            console.log(res.data)
            setUser(res.data)
        })
        .catch(error => {
            // console.log("error!!")
            // console.log(error)
        })
      },[]);

    if (!user) {
        return(<div></div>);
    } 
    else {
    return (
        <div>
            <Card style={{"maxWidth":"500px"}}>
                <Row xs={1} md={2} className="g-4">
                    <Col sm={5} md={5}>
                        <Card.Img 
                            style={{"objectFit": "cover", "margin":"1px"}}
                            variant="center"
                            src={"https://www.1999.co.jp/itbig54/10542740a2_m.jpg"}/>
                    </Col>
                    <Col sm={7} md={7}>
                    <Card.Body>
                        <Card.Text style={{textAlign:"left"}}>
                            <p>Name : {user.Name}</p>
                            <p>Faculty : {user.Faculty}</p>
                            <p>Year : {"4"}</p>
                        </Card.Text>
                    </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
    )}
}
