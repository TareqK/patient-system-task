import React, { useEffect, useState } from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DashboardContainer from '../common/DashboardContainer'
import { Link } from "react-router-dom";
import ApiService from '../../../services/web/ApiService'
import Loader from '../common/Loader';

const Records = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        ApiService.get(`record`)
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
                <div className="col-3">
                    <h3>Records on the system</h3>
                </div>
                <div className="col-2 offset-7">
                    <Link to={{ pathname: `/create-record` }}>
                        New Record
                 </Link>
                </div>
            </div>
            {loading ? (
                <Loader text="Loading Records ." />
            ) : (
                    <>
                        {data.length === 0 && (
                            <h4>Sorry, no data.</h4>
                        )}
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Disease</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => {
                                    return (<tr key={i}>
                                        <th scope="row">
                                            <Link to={{ pathname: `record/${item.recordId}` }}>
                                                {item.recordId}
                                            </Link>
                                        </th>
                                        <td>{item.patientName}</td>
                                        <td>{new Date(item.timeOfEntry).toLocaleDateString()}</td>
                                        <td>{item.diseaseName}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </>
                )}
        </DashboardContainer>
    );
}

export default Records;