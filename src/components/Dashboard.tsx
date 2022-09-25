import React from 'react'

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Activity } from '../models/activityTypes';
import ActivityCard from './ActivityCard';
// import { JsxElement } from 'typescript';


let date: Date = new Date();

const sampleCardData: Activity[] = [
    {
        name: "Badminton",
        date: Date.now(),
        desc: "Badminton_desc",
    },
    {
        name: "Basketball",
        date: Date.now(),
        desc: "Basketball_desc",
    },
    {
        name: "Basketball",
        date: Date.now(),
        desc: "Basketball_desc",
    },
    {
        name: "Basketball",
        date: Date.now(),
        desc: "Basketball_desc",
    },
    {
        name: "Basketball",
        date: Date.now(),
        desc: "Basketball_desc",
    },
];

//slice array to array of subarray
const getArraySlice = (arr: Activity[], l: number): Activity[][] => {
    let tmp: Activity[][] = [];
    for (var i: number = 0; i < arr.length; i += l) {
        tmp.push(arr.slice(i, i + l))
    }
    return tmp
}

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Container className='dashboardContainer'>
                {getArraySlice(sampleCardData, 4).map(x => {
                    return (
                        <Row xs={1} md={2} className="g-4">
                            {x.map(y => {
                                return (
                                    <Col>
                                        <ActivityCard name={y.name} date={y.date} desc={y.desc} />
                                    </Col>
                                )
                            })}
                        </Row>
                    )
                })
                }
            </Container>
        </div>
    )
}
