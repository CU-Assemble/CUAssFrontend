import React, { useEffect, useState } from "react";
import { Accordion, Button, CardGroup, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { 
    fetchActivityById, 
    selectActivity,
    selectFetchActivityByIdError,
    selectFetchActivityByIdLoading,
    selectFetchActivityByIdMessage } from "../../features/activityPost/activitySlice";
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

    const {id} = useParams()
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const n_cols = 3;
    
    const activity = useAppSelector(selectActivity)
    
    const [showAllParticipant, setShowAllParticipant] = useState(false)
    const [activityDetail, setActivityDetail]  = useState(activity)

    const fetchMessage =  useAppSelector(selectFetchActivityByIdMessage)

    const [max_rows, setMaxRows] = useState(1);

    // async function loadContent(id : string) {
    //     await dispatch(fetchActivityById(id));
    // }
    
    useEffect(() => {
        if (id) {
            dispatch(fetchActivityById(id)); // request api
        } else {
            navigate("/")
        }
    }, []);

    useEffect(() => {
        if (fetchMessage == "success") {
            console.log("load success")
            setActivityDetail(activity)
        } else {
            console.log("error")
            console.log(activity)
        }
    }, [fetchMessage]);

    const getParticipantCard = (n_rows : number): JSX.Element => {
        if (activityDetail.participants !== undefined) {
            // const tmp = (showAllParticipant)? activityDetail.participants : activityDetail.participants.slice(0, 3)  
            const tmp = getArraySlice(activityDetail.participants, n_cols, n_rows)
            return (
                <div style={{"marginTop":"2%", "marginBottom":"2%"}}>
                {/* <CardGroup style={{"marginTop":"2%", "marginBottom":"2%"}}> */}
                    {tmp.map((p : string[], idx_0:number)=>{
                        //get participantbyid
                            return (
                            <div key={`row_${idx_0}`}>
                                <Row style={{"marginTop":"1%", "marginBottom":"1%"}}> 
                                    {/* md = 3 => 3 rows */}
                                    {p.map((y, idx_1) => {
                                        return (
                                            <Col
                                                key={`card_${idx_1}`} 
                                                md={{span: 4}}>
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
            console.log("oh no")
            console.log(activityDetail)
            return <div></div>
        }
    }

    const [participantCards, setParticipantCards] = useState(getParticipantCard(max_rows));
    
    useEffect(()=>{
        if (max_rows && activity.participants) {
            setParticipantCards(getParticipantCard(max_rows));
        }    
    },[activity, max_rows]);

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
                        style={{"height":"400px", "margin":"2%", "objectFit": "contain"}}
                        alt="Activity Image"
                        src={activityDetail.url}>
                        {/* src={"https://wallpaperaccess.com/full/12313.jpg"}> */}
                    </Image>
                    <div style={{"marginTop":"2%", "marginBottom":"2%", "marginLeft":"5%", "marginRight":"5%"}}>
                        <Row><h2>{activityDetail.name}</h2></Row>
                        {getAccordion()}
                        {participantCards}
                        <Button
                            // style={{"marginTop":"5px", "marginBottom":"5px"}}
                            variant="danger"
                            className="load-more-btn load-more-activity-button"
                            onClick={()=>{setMaxRows(max_rows + 1)}}
                            disabled={
                                (activityDetail.participants === undefined) 
                                || ( 
                                    (activityDetail.participants != undefined)
                                    && (max_rows >= Math.ceil(activityDetail.participants?.length / n_cols)
                                    ))
                            }
                            >Load More
                        </Button>
                    </div>
                </Container>
            </div>
        );
    } else {
        return (<Navigate to="/"/>)
    }

}