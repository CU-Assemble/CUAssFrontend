import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Activity } from "../models/activityTypes";
import ActivityServices from "../services/activityServices";
import mockUpAct from "./mockUpActivity";

const activityServices = new ActivityServices()

const getActivityByID =async (id:string) => {
    return await activityServices.get(id)
}


export default function ActivityPage() { 
    //passing obj as item in props requires defining the type in props

    const {id} = useParams()
    
    const activityDetail = mockUpAct

    if (id) {
        getActivityByID(id)
        return (
            <Container>
                <h1>{activityDetail.name}</h1>
            </Container>
        );
    } else {
        console.log(id)
        return (<Navigate to="/"/>)
    }

}
