import React, { useEffect, useState } from 'react'

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Activity } from '../../models/activityTypes';
import ActivityCard from './ActivityCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchActivities, selectCardsPerRow, setActivities } from '../../features/activityPost/activitySlice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, CardGroup } from 'react-bootstrap';
import FetchActivityButton from '../Layout/FetchActivityButton';
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

    const activities = useSelector((state: RootState) => state.activityReducer.activities);

    const dispatch = useAppDispatch();

    const handleChangeActivities = (activityList : Activity []) => {
        dispatch(setActivities(activityList));
    };


    useEffect(() => {
        dispatch(fetchActivities())
    }, []);

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
            <h1>Dashboard</h1>
            {/* <CardGroup style={{"marginTop":"2%", "marginBottom":"2%"}}> */}
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
            })
            }
            {/* </CardGroup> */}
            <FetchActivityButton txt={"Refresh"}/>
            {/* </Container> */}
        </div>
    )
}
