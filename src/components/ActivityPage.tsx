import React from "react";
import { Container } from "react-bootstrap";
import { Activity } from "../models/activityTypes";
import AxiosModule from "../services/axiosModule";


export default function ActivityPage({ ...props }: Activity) {
    console.log(props)
    
    return (
        <Container>
            <h1>{props.name}</h1>
        </Container>
    );
}
