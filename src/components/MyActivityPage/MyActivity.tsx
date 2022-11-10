import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Button, CardGroup, Col, Row } from 'react-bootstrap'
import { getArraySlice } from '../Dashboard/Dashboard';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Activity } from '../../models/activityTypes';
import { fetchActivities, fetchMyActivities, selectCardsPerRow, selectMyActivities, setActivities } from '../../features/activityPost/activitySlice';
import { selectIsLoggedIn, selectUser } from '../../features/user/userSlice';
import ActivityCard from '../Dashboard/ActivityCard';
import FetchActivityButton from '../Layout/FetchActivityButton';


export default function MyActivity() {
    const { t } = useTranslation('translation');

    const navigate = useNavigate();
    const activities = useSelector(selectMyActivities);
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    // const isLoggedIn = true
    const currentUser = useAppSelector(selectUser);

    const handleChangeActivities = (activityList : Activity []) => {
        dispatch(setActivities(activityList));
    };

    useEffect(() => {
        console.log(currentUser)
        if(currentUser.studentId != undefined){
            dispatch(fetchMyActivities(currentUser.studentId))
        } else {
            navigate("/")
        }
    }, []);
    
    // useEffect(() => {
    //     dispatch(fetchActivities())
    // }, []);

    const [max_rows, setMaxRows] = useState(-1);
    // const [cards_per_row, setCardPerRows] = useState(4)
    const cards_per_row = useAppSelector(selectCardsPerRow)

    return (
    <div style={{"marginLeft":"5%", "marginRight":"5%", "marginTop": "2%"}}>
        <h1>{t("My Activities")}</h1>
        <Button
            variant="success"
            className="create-activity-button"
            onClick={()=>{navigate("/createactivity")}}
            style={{"marginTop":"1%"}}
        > {t("Create New Activity")}
        </Button>
        {getArraySlice(activities, cards_per_row, max_rows).map((x, idx) => {
                return (
                    <CardGroup style={{"marginTop":"1%", "marginBottom":"1%"}}>
                    <div key={`dashboard_div_${idx}`}>
                        {/* <Row xs={1} md={3} className="g-4">  */}
                        <Row>
                            {/* md = 3 => 3 rows */}
                            {x.map(y => {
                                return (
                                    <Col>
                                        <ActivityCard activityDetail={y}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                    </CardGroup>
                )
            })}
        <FetchActivityButton txt={t("Refresh")}/>

    </div>
  )
}
