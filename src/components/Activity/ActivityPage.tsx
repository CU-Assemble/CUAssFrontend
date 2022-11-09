import React, { useEffect, useState } from "react";
import { Accordion, Button, CardGroup, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams, Navigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { 
    fetchActivityById, 
    resetStatusState,
    joinActivityAsync, 
    selectJoinActivityMessage, 
    leaveActivityAsync, 
    selectLeaveActivityMessage, 
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
import { deleteMatchingAsync, fetchMatchingByActivityId, fetchMatchingById, selectDeleteMatchingAsyncMessage, selectfetchMatchingByActivityIdError, selectfetchMatchingByActivityIdMessage, selectMatching, selectParticipantsFromMatching, setMatching } from "../../features/matching/matchingSlice";
import { User } from "../../models/userTypes";
import { selectIsLoggedIn, selectUser } from "../../features/user/userSlice";

//This JSX tag's 'children' prop expects single child of type 'Element', but multiple children were provided
//dont forget to wrap with div

interface ActivityWtParticipants {
    activity : Activity,
    participants : string []
}

const checkStudentIdInParticipantList = (participants : User[], sid: string) => {
    for (let i=0; i< participants.length; i++) {
        if (participants[i].studentId == sid) return true
    }
    return false
}

export default function ActivityPage() { 
    //passing obj as item in props requires defining the type in props

    const {id} = useParams()
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const n_cols = 3;

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const currentUser = useAppSelector(selectUser);
    
    const activity = useAppSelector(selectActivity)
    const fetchActivityMessage = useAppSelector(selectFetchActivityByIdMessage)
    const fetchMatchingByActivityIdMessage = useAppSelector(selectfetchMatchingByActivityIdMessage)

    const joinActivityMessage = useAppSelector(selectJoinActivityMessage)
    const leaveActivityMessage = useAppSelector(selectLeaveActivityMessage)
    const deleteMatchingAsyncMessage = useAppSelector(selectDeleteMatchingAsyncMessage)
    
    const matching = useAppSelector(selectMatching)
    const participants = useAppSelector(selectParticipantsFromMatching)
    
    // const [activityDetail, setActivityDetail]  = useState(activity)
    // const [participants, setParticipants] = useState<User[]>([])

    const isParticipant = ((participants !== undefined) && (currentUser.studentId !== undefined) && checkStudentIdInParticipantList(participants, currentUser.studentId))
    const isOwner = (activity.ownerID === currentUser.studentId)
    
    const [showAllParticipant, setShowAllParticipant] = useState(false)
    const [max_rows, setMaxRows] = useState(1);

    // async function loadContent(id : string) {
    //     await dispatch(fetchActivityById(id));
    // }

    const requestAttendActivity = (e:React.FormEvent, aid:string) => {
        // alert("clicked join");
        e.preventDefault()
        if (currentUser.studentId != undefined) {
            dispatch(joinActivityAsync({
                aid: aid, 
                sid: currentUser.studentId}
            ));
        } else {
            console.log("request attend no userid")
        }
    }

    const requestLeaveActivity = (e:React.FormEvent, aid: string) => {
        // alert("clicked leave");
        e.preventDefault()
        if (currentUser.studentId != undefined) {
            dispatch(leaveActivityAsync({
                aid: aid, 
                sid: currentUser.studentId}
            ));
        } else {
            console.log("request leave no userid")
        }
    }

    // const requestEditActivity = () => {
    //   alert("clicked edit");
    // }

    const requestDeleteActivity = (e:React.FormEvent, mid: string) => {
        // alert("clicked delete");
        e.preventDefault()
        dispatch(deleteMatchingAsync(mid));
    }
    
    useEffect(() => {
        if (id) {
            dispatch(fetchActivityById(id)); // request api
            dispatch(fetchMatchingByActivityId(id)); // request api
        } else {
            navigate("/")
        }
    }, []);

    // useEffect(() => {
    //     if (fetchActivityMessage === "success") {
    //         console.log("load success")
    //         setActivityDetail(activity)
    //     } else {
    //         console.log("error")
    //         console.log(activity)
    //     }
    // }, [fetchActivityMessage]);

    // useEffect(() => {
    //     if (fetchMatchingByActivityIdMessage === "success") {
    //         console.log("load success")

    //         console.log(matching)
    //         setMatching(matching)
    //         setParticipants(matching.participants)
    //         console.log(participants)

    //     } else {
    //         console.log("error")
    //         console.log(matching)
    //     }
    // }, [fetchMatchingByActivityIdMessage]);

    // useEffect(() => {
    //     if (fetchActivityMessage === "success") {
    //         console.log("load success")
    //         setActivityDetail(activity)
    //     } else {
    //         console.log("error")
    //         console.log(activity)
    //     }
    // }, [fetchActivityMessage]);

    // console.log(joinActivityMessage, leaveActivityMessage, deleteMatchingAsyncMessage)
    useEffect(() => {
        console.log(joinActivityMessage, leaveActivityMessage, deleteMatchingAsyncMessage)
        if ((joinActivityMessage === "success") || (leaveActivityMessage === "success") || (deleteMatchingAsyncMessage === "success")) {
            navigate("/myactivities")
            console.log("something success!!!")
            dispatch(resetStatusState());
        }
    }, [joinActivityMessage, leaveActivityMessage, deleteMatchingAsyncMessage]);

    const getParticipantCard = (n_rows : number): JSX.Element => {
        if (participants !== undefined) {
            // const tmp = (showAllParticipant)? participants : participants.slice(0, 3)  
            const tmp = getArraySlice(participants, n_cols, n_rows)
            console.log(tmp)
            return (
                <div style={{"marginTop":"2%", "marginBottom":"2%"}}>
                {/* <CardGroup style={{"marginTop":"2%", "marginBottom":"2%"}}> */}
                    {tmp.map((p : User[], idx_0:number)=>{
                        //get participantbyid
                            console.log(p)
                            return (
                            <div key={`row_${idx_0}`}>
                                <Row style={{"marginTop":"1%", "marginBottom":"1%"}}> 
                                    {/* md = 3 => 3 rows */}
                                    {p.map((y, idx_1) => {
                                        return (
                                            <Col
                                                key={`card_${idx_1}`} 
                                                md={{span: 4}}>
                                                <ParticipantCard user={y}/>
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
            console.log(activity)
            console.log(matching)
            console.log(participants)
            return <div></div>
        }
    }

    const [participantCards, setParticipantCards] = useState(getParticipantCard(max_rows));
    
    useEffect(()=>{
        console.log(activity)
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
                        {activity.date}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Location</Accordion.Header>
                    <Accordion.Body>
                        {activity.location}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Description</Accordion.Header>
                    <Accordion.Body>
                        {activity.desc}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Number of Participant</Accordion.Header>
                    <Accordion.Body>
                        {participants? participants.length : 0}/{activity.maxParticipant}
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
                        src={activity.url}>
                        {/* src={"https://wallpaperaccess.com/full/12313.jpg"}> */}
                    </Image>
                    <div style={{"marginTop":"2%", "marginBottom":"2%", "marginLeft":"5%", "marginRight":"5%"}}>
                        <Row><h2>{activity.name}</h2></Row>
                        {getAccordion()}
                        {getParticipantCard(max_rows)}
                        {!isOwner? <Button
                            variant="success"
                            className="activity-card-btn join-activity-button"
                            onClick={(e : React.FormEvent)=>{requestAttendActivity(e,activity.id)}}
                            disabled={!(isLoggedIn && !isParticipant)}
                            > {isParticipant? "Joined" : "Join"}
                        </Button> : null}

                        {(!isOwner 
                        && activity.ownerID !== currentUser.studentId 
                        && isParticipant)? <Button
                            variant="danger"
                            className="activity-card-btn leave-activity-button"
                            onClick={(e : React.FormEvent)=>{requestLeaveActivity(e,activity.id)}}
                            disabled={!(isLoggedIn && isParticipant)}
                            > Leave
                        </Button> : null}

                        {isOwner? <Button
                            variant="outline-info"
                            className="activity-card-btn edit-activity-button"
                            //onClick={requestEditActivity}
                            as={Link as any}
                            to={`/myactivities/${activity.id}`}
                            disabled={!isLoggedIn}
                            > Edit
                        </Button> : null}

                        {isOwner? <Button
                            variant="danger"
                            className="activity-card-btn delete-activity-button"
                            onClick={(e : React.FormEvent)=>{requestAttendActivity(e,matching.matchingId)}}
                            disabled={!isLoggedIn}
                            > Delete
                        </Button> : null}
                    </div>
                </Container>
            </div>
        );
    } else {
        return (<Navigate to="/"/>)
    }

}