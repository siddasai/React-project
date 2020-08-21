import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { browserHistory } from 'react-router';
import AppRouter from './AppRoute.jsx';
import { Logger } from 'react-logger-lib';
import { store } from '../store/store.js';
class ViewClaim extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            claims: [],
            userName:''
        }
    }

    componentDidMount() {
        let userName = localStorage.getItem('username');
        this.setState({userName});
        axios.get(`http://localhost:7000/claims`)
            .then(res => {
                const claims = res.data;
                // this.setState({ claims });
                store.dispatch({
                    type: 'claimList',
                    payload: claims
                })
            })
            store.subscribe(() =>
                console.log("first claim",store.getState()[0])
            );
            store.subscribe(()=>{
                this.setState(
                    {claims : store.getState()}
                )
            });
    }

    updatePage(claim) {
        window.event.preventDefault();
        Logger.of('App.ViewClaim.updatePage').info('claim data', claim);
        browserHistory.push("updateClaim/"+claim.id);
    }
    render() {
        let myStyle = {
            marginTop: "5rem",
            marginBottom: "5rem",
            marginLeft: "2rem"
        }
        return (
            
            <div>
                <AppRouter username = {this.state.userName}></AppRouter>
                <Container>
                    <Row>
                        <Table bordered responsive="md" style={myStyle}>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Employee Id</th>
                                    <th scope="col">Employee Name</th>
                                    <th scope="col">Claim Number</th>
                                    <th scope="col">Claim Type</th>
                                    <th scope="col">Claim Program</th>
                                    <th scope="col">Claim Start Date</th>
                                    <th scope="col">Claim End Date</th>
                                    <th scope="col">Update Claim</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.claims.map((claim, index) =>
                                    <tr key={index}>
                                        <th scope="row">{claim.id}</th>
                                        <td>{claim.Employee_Name}</td>
                                        <td>{claim.Claim_Number}</td>
                                        <td>{claim.Claim_Type}</td>
                                        <td>{claim.Claim_Program}</td>
                                        <td>{claim.Claim_Start_Date}</td>
                                        <td>{claim.Claim_End_Date}</td>
                                        <td>
                                          <button> <a href="" onClick={()=> this.updatePage(claim)}>update</a></button> 
                                        </td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default ViewClaim;