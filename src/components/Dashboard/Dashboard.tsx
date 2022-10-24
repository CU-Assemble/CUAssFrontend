import React, { useEffect, useState } from 'react'

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Activity } from '../../models/activityTypes';
import ActivityCard from './ActivityCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchActivities, setActivities } from '../../features/activityPost/activitySlice';

import { useAppDispatch } from '../../app/hooks';
import { Button, CardGroup } from 'react-bootstrap';
import FetchActivityButton from '../Layout/FetchActivityButton';
// import { JsxElement } from 'typescript';


let date: Date = new Date();

//slice array to array of subarray
export const getArraySlice = (arr: any[], l: number, max_rows: number = 1): any[][] => {
    console.log(max_rows)
    if (max_rows === -1) {
        max_rows = Math.ceil(arr.length / l)
    }
    let tmp: any[][] = [];
    for (var i: number = 0; i < arr.length; i += l) {
        tmp.push(arr.slice(i, i + l))
        if (((i+l)/l) >= max_rows) break
    }
    console.log(arr)
    console.log(max_rows)
    console.log(tmp)

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

    return (
        <div 
        style={
            {"marginLeft":"5%", "marginRight":"5%", "marginTop": "2%"}
        }
        >
            {/* <Container className='dashboardContainer'> */}
            <h1>Dashboard</h1>
            <CardGroup style={{"marginTop":"2%", "marginBottom":"2%"}}>
                {getArraySlice(activities, 3, max_rows).map(x => {
                    return (
                        <div>
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
                    )
                })
            }
            </CardGroup>
            <FetchActivityButton txt={"Refresh"}/>
            {/* </Container> */}
        </div>
    )
}
