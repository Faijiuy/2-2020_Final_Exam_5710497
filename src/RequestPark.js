import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form"

import { format } from 'date-fns'
import { BsTrash } from "react-icons/bs";

//firebase
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore';

if (firebase.apps.length === 0) {
    firebase.initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseUrl: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID
    })
}

const firestore = firebase.firestore()

export default function RequestPark() {

    const { register, handleSubmit } = useForm()
    const [requests, setRequests] = useState([])

    const parkingRef = firestore.collection('request_park');
    const query = parkingRef.orderBy('createdAt', 'asc').limitToLast(10);
    const [data] = useCollectionData(query, { idField: 'id' });

    console.log("REACT_APP_PROJECT_ID", process.env.REACT_APP_PROJECT_ID)

    const onSubmit = async (data) => {
        let prepareddata = {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            name: data.name,
            phoneNumber: data.phoneNumber,
            arrivalTime: data.arrivalTime,
            departureTime: data.departureTime,
            reason: data.reason,
        }
        console.log("onSubmit", prepareddata)

        await parkingRef
            .add(prepareddata)
            .then(() => {
                console.log("New Request has been added.")
                alert("Request has been added.")
            })
            .catch((error) => {
                console.error("Error", error)
                alert(error)
            })
    }

    // const addNewRequest = () => {
    //     let date_data = date
    // }
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Request Parking Lot</h1>
                </Col>
            </Row>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="hidden"
                    placeholder="ID"
                    name="id"
                    id="id"
                    ref={register({ require: true })}
                // defaultValue={tempData.id}
                />
                <Row>
                    <Col xs={2}>
                        <label htmlFor="name">Name:</label>
                    </Col>
                    <Col>
                        <input
                            type="text"
                            placeholder="Name of Customer"
                            name="name"
                            id="name"
                            ref={register({ require: true })}
                        // defaultValue={tempData.id}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={2}>
                        <label htmlFor="phoneNumber">Phone Number:</label>
                    </Col>
                    <Col>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            id="phoneNumber"
                            ref={register({ require: true })}
                        // defaultValue={tempData.id}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={2}>
                        <label htmlFor="arrivalTime">Arrival Time:</label>
                    </Col>
                    <Col>
                        <input
                            type="text"
                            placeholder="Car Arrival Time"
                            name="arrivalTime"
                            id="arrivalTime"
                            ref={register({ require: true })}
                        // defaultValue={tempData.id}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={2}>
                        <label htmlFor="departureTime">Departure Time:</label>
                    </Col>
                    <Col>
                        <input
                            type="text"
                            placeholder="Car Departure Time"
                            name="departureTime"
                            id="departureTime"
                            ref={register({ require: true })}
                        // defaultValue={tempData.id}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={2}>
                        <label htmlFor="reason">Reason:</label>
                    </Col>
                    <Col>
                        <input
                            type="text"
                            placeholder="Reason to park here"
                            name="reason"
                            id="reason"
                            ref={register({ require: true })}
                        // defaultValue={tempData.id}
                        />
                    </Col>
                </Row>
                {/*<Button variant="primary" type="submit" onClick={addNewRequest}>
                    Add Request
    </Button>*/}
                <Button variant="primary" type="submit">
                    Add Request
                </Button>

            </form>
        </Container>
    )
}
