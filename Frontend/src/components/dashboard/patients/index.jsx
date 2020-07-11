import React, { useEffect, useState } from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DashboardContainer from '../common/DashboardContainer'
import { Link } from "react-router-dom";
import ApiService from '../../../services/web/ApiService'
import Loader from '../common/Loader';

const Patients = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        ApiService.get(`patient`)
            .then(res => {
                setData(res.data);
            })
            .finally((response) => {
                setLoading(false);
            });
    }, [])

    return (
        <DashboardContainer>
            <div className="row">
                <div className="col-5">
                    <h3>Patient Records on the system</h3>
                </div>
                <div className="col-2 offset-5">
                    <Link to={{ pathname: `/create-patient` }}>
                        New Record
                 </Link>
                </div>
            </div>
            {loading ? (
                <Loader text="Loading Patients records." />
            ) : (
                    <>
                        {data.length === 0 && (
                            <h4>Sorry, no data.</h4>
                        )}
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">DoB</th>
                                    <th scope="col">Last entry</th>
                                    <th scope="col">Metadata</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => {
                                    return (<tr key={i}>
                                        <th scope="row">{i}</th>
                                        <td>
                                            <Link to={{ pathname: `patient/${item.patientId}` }}>
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td>{new Date(item.dateOfBirth).toLocaleDateString()}</td>
                                        <td>
                                            {item.lastEntry ? (
                                                <Link to={{ pathname: `record/${item.lastEntry.recordId}` }}>
                                                    {item.lastEntry.diseaseName}
                                                </Link>
                                            ):('No Visit')}
                                        </td>
                                        <td>{item.metaDataCount}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </>
                )}
        </DashboardContainer>
    );
}

export default Patients;