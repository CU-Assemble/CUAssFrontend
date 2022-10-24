import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, CardGroup, Col, Row } from 'react-bootstrap'
import { getArraySlice } from '../Dashboard/Dashboard';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Activity } from '../../models/activityTypes';
import { fetchActivities, fetchMyActivities, setActivities } from '../../features/activityPost/activitySlice';
import { selectIsLoggedIn, selectUser } from '../../features/user/userSlice';
import ActivityCard from '../Dashboard/ActivityCard';


export default function MyActivity() {

    const navigate = useNavigate();
    const activities = useSelector((state: RootState) => state.activityReducer.activities);
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    // const isLoggedIn = true
    const currentUser = useAppSelector(selectUser);

    const handleChangeActivities = (activityList : Activity []) => {
        dispatch(setActivities(activityList));
    };

    // useEffect(() => {
    //     dispatch(fetchMyActivities(id))
    // }, []);
    useEffect(() => {
        dispatch(fetchActivities())
    }, []);

    return (
    <div style={{"marginLeft":"5%", "marginRight":"5%", "marginTop": "2%"}}>
        <h1>My Activities</h1>
        <Button
            variant="success"
            className="create-activity-button"
            onClick={()=>{navigate("/createactivity")}}
        > Create New Activity
        </Button>
        <CardGroup style={{"marginTop":"2%", "marginBottom":"2%"}}>
            {getArraySlice(activities, 3).map(x => {
                return (
                    <div>
                        <Row>
                            {x.map(y => {
                                return (
                                    <Col>
                                        <ActivityCard activityDetail={y}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                )
            })}
        </CardGroup>

    </div>
  )
}