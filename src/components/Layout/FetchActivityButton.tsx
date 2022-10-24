import React from 'react'
import { Button } from 'react-bootstrap'
import { useAppDispatch } from '../../app/hooks';
import { fetchActivities } from '../../features/activityPost/activitySlice';

export default function FetchActivityButton(props: {txt : string}) {

    const dispatch = useAppDispatch();

    return (
        <Button
            variant="primary"
            className="fetch-activity-button"
            onClick={()=>{dispatch(fetchActivities())}}
        > {props.txt}
        </Button>
    )
}