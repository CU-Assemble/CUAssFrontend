import React from 'react'

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Activity } from '../models/activityTypes';
import ActivityCard from './ActivityCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setActivities } from '../features/activityPost/activitySlice';
// import { JsxElement } from 'typescript';


let date: Date = new Date();

//slice array to array of subarray
const getArraySlice = (arr: Activity[], l: number): Activity[][] => {
    let tmp: Activity[][] = [];
    for (var i: number = 0; i < arr.length; i += l) {
        tmp.push(arr.slice(i, i + l))
    }
    return tmp
}

const mockUpAct : Activity = {
    name: "mockupAct",
    date: Date.now(),
    desc: "mockupDESC"
}

export default function Dashboard() {

    const activities = useSelector((state: RootState) => state.activityReducer.activities);

    const dispatch = useDispatch();

    const handleChangeActivities = (activityList : Activity []) => {
        dispatch(setActivities(activityList));
    };

    console.log(activities)

    return (
        <div>
            <h1>Dashboard</h1>
            <Container className='dashboardContainer'>
                {getArraySlice(activities, 3).map(x => {
                    return (
                        <div>
                            <Row xs={1} md={3} className="g-4"> 
                                {/* md = 3 => 3 rows */}
                                {x.map(y => {
                                    return (
                                        <Col>
                                            <ActivityCard name={y.name} date={y.date} desc={y.desc} />
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    )
                })
                }
                <button onClick={()=>{handleChangeActivities([mockUpAct])}}>Mockup</button>
            </Container>
        </div>
    )
}
