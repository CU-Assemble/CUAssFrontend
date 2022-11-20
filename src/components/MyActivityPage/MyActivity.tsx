import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Button, CardGroup, Col, Row } from 'react-bootstrap'
import { getArraySlice } from '../Dashboard/Dashboard';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Activity, MyActivityResponseType } from '../../models/activityTypes';
import { fetchActivities, fetchMyActivities, resetStatusState, selectCardsPerRow, selectMyActivities, selectMyActivitiesWithInfo, setActivities } from '../../features/activityPost/activitySlice';
import { selectIsLoggedIn, selectUser } from '../../features/user/userSlice';
import ActivityCard from '../Dashboard/ActivityCard';
import FetchActivityButton from '../Layout/FetchActivityButton';

export default function MyActivity() {
    const { t } = useTranslation('translation');

    const navigate = useNavigate();
    const activities = useSelector(selectMyActivities);
    const myActivitiesWithInfo = useSelector(selectMyActivitiesWithInfo);
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    // const isLoggedIn = true
    const currentUser = useAppSelector(selectUser);

    const [activityMatchingMap, setActivityMatchingMap] = useState(new Map<string, MyActivityResponseType>());

    const handleChangeActivities = (activityList : Activity []) => {
        dispatch(setActivities(activityList));
    };

    useEffect(() => {
        // console.log(currentUser)
        if (currentUser.studentId !== undefined){
            dispatch(resetStatusState());
            dispatch(fetchMyActivities(currentUser.studentId))
        } else {
            navigate("/")
        }
    }, []);

    useEffect(() => {
        if (myActivitiesWithInfo.length > 0) {
            let tmp = new Map<string, MyActivityResponseType>()
            for (let i=0; i<myActivitiesWithInfo.length; i++) {
                tmp.set(myActivitiesWithInfo[i].Activity.ActivityId, myActivitiesWithInfo[i])
            }
            setActivityMatchingMap(tmp)
        }
    }, [myActivitiesWithInfo]);
    
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
                    <CardGroup key={`myactivity_div_${idx}`} style={{"marginTop":"1%", "marginBottom":"1%"}}>
                    <div>
                        {/* <Row xs={1} md={3} className="g-4">  */}
                        <Row>
                            {/* md = 3 => 3 rows */}
                            {x.map((y, idx2) => {
                                console.log(y.id)
                                console.log(activityMatchingMap.get(y.id))
                                return (
                                    <Col key={`myactivity_col_${idx}_${idx2}`}>
                                        <ActivityCard activityDetail={y} activityInfo={activityMatchingMap.get(y.id)}/>
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
