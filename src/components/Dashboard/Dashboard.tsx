import React, { useEffect } from 'react'

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Activity } from '../../models/activityTypes';
import ActivityCard from './ActivityCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchActivities, setActivities } from '../../features/activityPost/activitySlice';

import mockUpAct from '../mockUpActivity';
import { useAppDispatch } from '../../app/hooks';
import { Button } from 'react-bootstrap';
// import { JsxElement } from 'typescript';


let date: Date = new Date();

//slice array to array of subarray
export const getArraySlice = (arr: any[], l: number): any[][] => {
    let tmp: any[][] = [];
    for (var i: number = 0; i < arr.length; i += l) {
        tmp.push(arr.slice(i, i + l))
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
                                            <ActivityCard activityDetail={y}/>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    )
                })
                }
                <Button
                    variant="primary"
                    className="join-activity-button"
                    onClick={()=>{dispatch(fetchActivities())}}
                > Refresh
                </Button>
            </Container>
        </div>
    )
}
