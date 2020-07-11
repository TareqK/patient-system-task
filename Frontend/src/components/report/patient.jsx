import React, { useEffect, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DashboardContainer from '../dashboard/common/DashboardContainer'
import ApiService from '../../services/web/ApiService'
import Loader from '../dashboard/common/Loader';
import { Link } from "react-router-dom";

const ShowPatientReport = ({ ...props }) => {

    const id = props.match.params.id;
    const [loading, setLoading] = useState(true);
    const [patientReport, setPatientReport] = useState();
    useEffect(() => {
        console.log(id);
        ApiService.get(`patient/` + id + `/report`)
            .then(res => {
                setPatientReport(res.data)
            })
            .finally(() => { setLoading(false) })
    }, [])

    return (
        <DashboardContainer>
            {loading ? (
                <Loader text="Loading Patient Report." />
            ) : (
                    <>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-2">
                                    Name
                            </div>
                                <div className="col-2">
                                    Age
                            </div>
                                <div className="col-2">
                                    Bill Average
                            </div>
                                <div className="col-2">
                                    Normalized Average
                            </div>
                                <div className="col-2">
                                    Fifth Record
                            </div>
                                <div className="col-2">
                                    Month with Highest Vistis
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-2">
                                    {patientReport.name}
                            </div>
                                <div className="col-2">
                                    {patientReport.age}
                            </div>
                                <div className="col-2">
                                   {patientReport.billAverage}
                            </div>
                                <div className="col-2">
                                    {patientReport.normalizedBillAverage}
                            </div>
                                <div className="col-2">
                                    {patientReport.fifthRecord ?
                                        (
                                            <Link to={{ pathname: `/record/${patientReport.fifthRecord.recordId}` }}>
                                                        Fifth Record
                                            </Link>
                                        ):(<div>---</div>)
                                    }
                            </div>
                                <div className="col-2">
                                   {patientReport.monthWithHighestVisits}
                            </div>
                            </div>
                        </div>
                        <div className="col-12">
                                <h3 className="mt-2">Similar Patients</h3>
                            
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patientReport.similarPatients.map((item, i) => {
                                        return (
                                            <tr key={i}> 
                                                <th scope="row">
                                                    <Link to={{ pathname: `/patient/${item.patientId}` }}>
                                                        {item.patientId}
                                                    </Link>
                                                </th>
                                                <td>{item.name}</td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table >
                        </div>
                    </>
                )}
        </DashboardContainer>
    );
}

export default ShowPatientReport;