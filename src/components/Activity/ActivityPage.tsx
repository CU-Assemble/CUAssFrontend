import React, { useEffect, useState } from "react";
import { CardGroup, Col, Container, Row } from "react-bootstrap";
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
            return <CardGroup>
                {tmp.map((p : string[])=>{
                    //get participantbyid
                        return (
                        <div>
                            <Row xs={1} md={3} className="g-4"> 
                                {/* md = 3 => 3 rows */}
                                {p.map(y => {
                                    return (
                                        <Col>
                                            <ParticipantCard pid={y}/>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                        )
                })}
            </CardGroup>
        }
        else {
            return <div></div>
        }
    }

    const participantCards = getParticipantCard();

    if (id) {
        return (
            <div>
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
                        className="img-fluid"
                        style={{}}
                        alt="Activity Image"
                        // src={activityDetail.url}
                        src="https://wallpaperaccess.com/full/12313.jpg">
                    </Image>
                    <Row><h2>{activityDetail.name}</h2></Row>
                    <Row><p>Location : {activityDetail.location}</p></Row>
                    <Row><p>Desciption : {activityDetail.desc}</p></Row>
                    <Row><p>Location : {activityDetail.location}</p></Row>
                    <Row><p>Number of Participant : {activityDetail.participants? activityDetail.participants.length : 0}/{activityDetail.maxParticipant} </p></Row>
                    {/* {activityDetail.participants && getParticipantCard(activityDetail.participants)} */}
                    {participantCards}
                </Container>
            </div>
        );
    } else {
        return (<Navigate to="/"/>)
    }

}