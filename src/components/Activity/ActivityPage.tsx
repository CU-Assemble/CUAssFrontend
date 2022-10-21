import React, { useEffect, useState } from "react";
import { Accordion, CardGroup, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchActivityById } from "../../features/activityPost/activitySlice";
import { Activity } from "../../models/activityTypes";
import ActivityServices from "../../services/activityServices";
import ParticipantCard from "../User/ParticipantCard";

import Figure from 'react-bootstrap/Figure';
import Image from 'react-bootstrap/Image'
import { getArraySlice } from "../Dashboard/Dashboard";

//This JSX tag's 'children' prop expects single child of type 'Element', but multiple children were provided
//dont forget to wrap with div


export default function ActivityPage() { 
    //passing obj as item in props requires defining the type in props


    const [showAllParticipant, setShowAllParticipant] = useState(false)

    // const [participants, setParticipants] = useState([])

    const {id} = useParams()

    const activity = useAppSelector((state : RootState) => {
        return state.activityReducer.activity
    })

    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    
    useEffect(() => {
        if (id) {
            dispatch(fetchActivityById(id))
        } else {
            navigate("/")
        }
    }, []);

    const activityDetail = activity


    const getParticipantCard = () => {
        if (activityDetail.participants !== undefined) {
            // const tmp = (showAllParticipant)? activityDetail.participants : activityDetail.participants.slice(0, 3)  
            const tmp = getArraySlice(activityDetail.participants, 3)
            return (
                <div style={{"marginTop":"2%", "marginBottom":"2%"}}>
                {/* <CardGroup style={{"marginTop":"2%", "marginBottom":"2%"}}> */}
                    {tmp.map((p : string[])=>{
                        //get participantbyid
                            return (
                            <div>
                                <Row style={{"marginTop":"1%", "marginBottom":"1%"}}> 
                                    {/* md = 3 => 3 rows */}
                                    {p.map(y => {
                                        return (
                                            <Col md={{span: 4}}>
                                                <ParticipantCard pid={y}/>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </div>
                            )
                    })}
                {/* </CardGroup> */}
                </div>
            )
        }
        else {
            return <div></div>
        }
    }

    const getAccordion = () => {
        return (
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Date</Accordion.Header>
                    <Accordion.Body>
                        {activityDetail.date}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Location</Accordion.Header>
                    <Accordion.Body>
                        {activityDetail.location}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Description</Accordion.Header>
                    <Accordion.Body>
                        {activityDetail.desc}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Number of Participant</Accordion.Header>
                    <Accordion.Body>
                        {activityDetail.participants? activityDetail.participants.length : 0}/{activityDetail.maxParticipant}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
        )
    }

    // <Row><p>Location : {activityDetail.location}</p></Row>
    // <Row><p>Desciption : {activityDetail.desc}</p></Row>
    // <Row><p>Location : {activityDetail.location}</p></Row>
    // <Row><p>Number of Participant : {activityDetail.participants? activityDetail.participants.length : 0}/{activityDetail.maxParticipant} </p></Row>

    const participantCards = getParticipantCard();

    if (id) {
        return (
            <div style={{"marginLeft":"5%", "marginRight":"5%"}}>
                <Container className="activity-page-container">
                    {/* <Figure>
                        <Figure.Image
                            className="im"
                            style={{"objectFit":"contain", "height":"50px"}}
                            alt="Activity Image"
                            // src={activityDetail.url}
                            src="https://wallpaperaccess.com/full/12313.jpg"
                        ></Figure.Image>
                    </Figure> */}
                    <Image
                        className="img img-thumbnail rounded mx-auto d-block"
                        style={{"maxHeight":"400px", "margin":"2%", "objectFit": "contain"}}
                        alt="Activity Image"
                        // src={activityDetail.url}
                        src="https://wallpaperaccess.com/full/12313.jpg">
                    </Image>
                    <div style={{"marginTop":"2%", "marginBottom":"2%", "marginLeft":"5%", "marginRight":"5%"}}>
                        <Row><h2>{activityDetail.name}</h2></Row>
                        {getAccordion()}
                        {participantCards}
                    </div>
                    {/* <Row><p>Location : {activityDetail.location}</p></Row>
                    <Row><p>Desciption : {activityDetail.desc}</p></Row>
                    <Row><p>Location : {activityDetail.location}</p></Row>
                    <Row><p>Number of Participant : {activityDetail.participants? activityDetail.participants.length : 0}/{activityDetail.maxParticipant} </p></Row> */}
                    {/* {activityDetail.participants && getParticipantCard(activityDetail.participants)} */}
                </Container>
            </div>
        );
    } else {
        return (<Navigate to="/"/>)
    }

}