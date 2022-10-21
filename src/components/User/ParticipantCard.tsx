import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'


interface UserInfo {
    StudentId: string,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string,
    Name: string,
    Nickname: string,
    Faculty: string,
    Tel: string,
    Email: string,
    Password: string
}

const currentUser = {
    StudentId: "",
    CreatedAt: "",
    UpdatedAt: "",
    DeletedAt: "",
    Name: "",
    Nickname: "",
    Faculty: "",
    Tel: "",
    Email: "",
    Password: ""
}
export default function ParticipantCard(props : {pid:string}) {

    //call getuserbyid

    // const mockuser : UserInfo = {
    //     name: "Okabe",
    //     faculty: "Engineering",
    //     year: "4",
    //     url: "https://www.1999.co.jp/itbig54/10542740a2_m.jpg"
    //     // url: "https://images-platform.99static.com//ywu0w6BbzK51tna45IRBAnghaoU=/0x0:2000x2000/fit-in/500x500/99designs-contests-attachments/89/89391/attachment_89391104"
    // }

    const [user, setUser] = useState(currentUser)
    // useEffect
    useEffect(()=>{
        axios({
            method: 'get',
            url: `https://6343af8fb9ab4243cad57d7d.mockapi.io/users/${props.pid}`, //url
            timeout: 2000
        })
        .then((res)=>{
            console.log(res.data)
            setUser(res.data)
        })
        .catch(error => {
            // console.log("error!!")
            // console.log(error)
        })
      },[]);

    if (!user) {
        return(<div></div>);
    } 
    else {
    return (
        <div>
            <Card style={{"maxWidth":"500px"}}>
                <Row xs={1} md={2} className="g-4">
                    <Col sm={5} md={5}>
                        <Card.Img 
                            style={{"objectFit": "cover", "margin":"1px"}}
                            variant="center"
                            src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="}/>
                    </Col>
                    <Col sm={7} md={7}>
                    <Card.Body>
                        <Card.Text style={{textAlign:"left"}}>
                            <p>Name : {user.Name}</p>
                            <p>Faculty : {user.Faculty}</p>
                            <p>Year : {"4"}</p>
                        </Card.Text>
                    </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
    )}
}
