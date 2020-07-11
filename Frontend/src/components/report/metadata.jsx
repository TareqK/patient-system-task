import React, { useEffect, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DashboardContainer from '../dashboard/common/DashboardContainer'
import ApiService from '../../services/web/ApiService'
import Loader from '../dashboard/common/Loader';

const ShowMetadataReport = () => {

    const [loading, setLoading] = useState(true);
    const [metadataReport, setMetadataReport] = useState();
    useEffect(() => {
        ApiService.get('/metadata/report')
            .then(res => {
                setMetadataReport(res.data)
            })
            .finally(() => { setLoading(false) })
    }, [])

    return (
        <DashboardContainer>
            {loading ? (
                <Loader text="Loading Metadata Report." />
            ) : (

                    <div className="container">
                        <div className="row justify-content-between">
                            <div classname="col-6 text-center">
                                <h3>Average Items/Patient</h3>
                            </div>
                            <div classname="col-6 text-center">
                                <h3>Highest Number of Items/Patient</h3>
                            </div>
                        </div>
                        <div className="row justify-content-between">
                            <div classname="col-6 d-flex justify-content-center">
                                <h3>{metadataReport.averageMetadataItemsPerPatient}</h3>
                            </div>
                            <div classname="col-6  d-flex justify-content-center">
                                <h3>{metadataReport.highestNumberOfMetadataItemsPerPatient}</h3>
                            </div>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Key</th>
                                    <th scope="col">Repetition</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metadataReport.mostCommonKeys.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <th scope="row">{item.key}</th>
                                            <td>{item.value}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table >
                    </div>
                )}
        </DashboardContainer>
    );
}

export default ShowMetadataReport;