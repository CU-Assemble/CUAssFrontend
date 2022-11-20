import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Activity, MyActivityResponseType } from '../../models/activityTypes';
import ActivityCard from './ActivityCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchActivities, fetchMyActivities, resetStatusState, selectCardsPerRow, selectMyActivities, selectMyActivitiesWithInfo, setActivities } from '../../features/activityPost/activitySlice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, CardGroup } from 'react-bootstrap';
import FetchActivityButton from '../Layout/FetchActivityButton';
import { fetchMatchingByIds } from '../../features/matching/matchingSlice';
import { selectIsLoggedIn, selectUser } from '../../features/user/userSlice';
// import { JsxElement } from 'typescript';


let date: Date = new Date();

//slice array to array of subarray
export const getArraySlice = (arr: any[], l: number, max_rows: number = 1): any[][] => {
    if (max_rows === -1) {
        max_rows = Math.ceil(arr.length / l)
    }
    let tmp: any[][] = [];
    for (var i: number = 0; i < arr.length; i += l) {
        tmp.push(arr.slice(i, i + l))
        if (((i+l)/l) >= max_rows) break
    }
    return tmp
}

export default function Dashboard() {
    const { t } = useTranslation('translation');

    const activities = useSelector((state: RootState) => state.activityReducer.activities);

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const currentUser = useAppSelector(selectUser);

    const myActivities = useAppSelector(selectMyActivities);

    const myActivitiesWithInfo = useSelector(selectMyActivitiesWithInfo);
    const [activityMatchingMap, setActivityMatchingMap] = useState(new Map<string, MyActivityResponseType>());

    useEffect(() => {
        if (currentUser.studentId != null) {
            dispatch(resetStatusState());
            dispatch(fetchMyActivities(currentUser.studentId))
            // for (let i = 0; i<myActivities.length; i++) {
            //     myActivitiesToMatchingID.set(myActivities[i].id, myActivities[i].)
            // }
        }
        dispatch(fetchActivities())
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

    const dispatch = useAppDispatch();

    const handleChangeActivities = (activityList : Activity []) => {
        dispatch(setActivities(activityList));
    };

    const [max_rows, setMaxRows] = useState(-1)
    // const [cards_per_row, setCardPerRows] = useState(4)
    const cards_per_row = useAppSelector(selectCardsPerRow)

    return (
        <div 
        style={
            {"marginLeft":"5%", "marginRight":"5%", "marginTop": "2%"}
        }
        >
            {/* <Container className='dashboardContainer'> */}
            <h1>{t("Dashboard")}</h1>
            {/* <CardGroup style={{"marginTop":"2%", "marginBottom":"2%"}}> */}
            {getArraySlice(activities, cards_per_row, max_rows).map((x, idx) => {
                return (
                    <CardGroup key={`dashboard_div_${idx}`} style={{"marginTop":"1%", "marginBottom":"1%"}}>
                    
                        {/* <Row xs={1} md={3} className="g-4">  */}
                        <Row>
                            {/* md = 3 => 3 rows */}
                            {x.map((y,idx2) => {
                                return (
                                    <Col key={`dashboard_col_${idx}_${idx2}`}>
                                        {/* <ActivityCard activityDetail={y} matchingId={}/> */}
                                        <ActivityCard activityDetail={y} activityInfo={activityMatchingMap.get(y.id)}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    
                    </CardGroup>
                )
            })
            }
            {/* </CardGroup> */}
            <FetchActivityButton txt={"Refresh"}/>
            {/* </Container> */}
        </div>
    )
}
