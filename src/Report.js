import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
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

// const data = require('./sampleData.json')

export default function Report() {

    const [requests, setRequests] = useState([])

    const parkingRef = firestore.collection('request_park');
    const query = parkingRef.orderBy('createdAt', 'asc').limitToLast(10);
    const [data] = useCollectionData(query, { idField: 'id' });

    console.log("REACT_APP_PROJECT_ID", process.env.REACT_APP_PROJECT_ID)

    useEffect(() => {
        if (data) {
            let r = data.map((d, i) => {
                return (
                    <ParkingRow
                        data={d}
                        i={i}
                        onDeleteClick={handleDeleteClick}
                    />
                )
            })
            setRequests(r)
        }
    }, [data])

    const handleDeleteClick = (id) => {
        console.log('handleDeleteClick in Report', id)
        if (window.confirm("Are you sure to delete this record?"))
          parkingRef.doc(id).delete()
      }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Report SMV Parking Request</h1>
                </Col>
            </Row>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Arrival Time</th>
                        <th>Departure Time</th>
                        <th>Reason</th>
                        <th>created At</th>
                    </tr>
                </thead>
                <tbody>
                    {requests}
                </tbody>
            </Table>
        </Container>
    )
}

function ParkingRow(props) {
    let d = props.data
    let i = props.i
    console.log("data is showing")

    console.log("ParkingRow", d)
    console.log("ParkingRow", i)
    return (
        <tr key={d.id}>
            <td>
                <BsTrash onClick={() => props.onDeleteClick(d.id)} />
            </td>
            <td>{d.name}</td>
            <td>{d.phoneNumber}</td>
            <td>{d.arrivalTime}</td>
            <td>{d.departureTime}</td>
            <td>{d.reason}</td>
            <td>{format(d.createdAt.toDate(), "yyyy-MM-dd")}</td>
        </tr>
    )
}