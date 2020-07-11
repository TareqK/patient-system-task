import React, { useEffect, useState } from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DashboardContainer from '../common/DashboardContainer'
import ApiService from '../../../services/web/ApiService'
import Loader from '../common/Loader';
import { Link } from "react-router-dom";
import { MetadataItem } from "../../metadata/metadataItem.jsx";
const ShowPatient = ({ ...props }) => {
    const [patientId, setPatientId] = useState(props.match.params.id)
    const [loading, setLoading] = useState(true);
    const [metadataItemList, setMetadataItemList] = useState();
    const [nameField, setNameField] = useState();
    const [officialIdNumberField, setOfficialIdNumberField] = useState();
    const [dateOfBirthField, setDateOfBirthField] = useState();
    const [emailField, setEmailField] = useState();

    useEffect(() => {
        if (patientId) {
            ApiService.get(`patient/` + patientId)
                .then(res => {
                    setMetadataItemList(res.data.metadataItems)
                    setNameField(res.data.name)
                    setOfficialIdNumberField(res.data.officialIdNumber)
                    setDateOfBirthField(new Date(res.data.dateOfBirth).toISOString().substr(0, 10))
                    setEmailField(res.data.emailField)
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setMetadataItemList([])
        }
    }, [])


    const addMetadataItem  = (item) =>{
        let l = [...metadataItemList];
        l.push(item)
        setMetadataItemList(l);
    }

    const save =()=>{
        if(officialIdNumberField.length>0 &&nameField.length>0 ){
        let data = {}
        data.name = nameField;
        data.officialIdNumber = officialIdNumberField;
        data.dateOfBirth = new Date(dateOfBirthField).toISOString();
        data.email = data.emailField;
        if(patientId){
            data.patientId = patientId;
            ApiService.put("patient/"+patientId,data);
        }else{
            ApiService.post("patient",data)
            .then(res=>{
                setPatientId(res.data.patientId);
            })
        }
    }
    }

    return (
        <DashboardContainer>
            {loading ? (
                <Loader text="Loading Patient info." />
            ) : (
                    <div>
                        <div className="row">
                            <div className="col-4">
                            <h3>Patient Profle {patientId? (<># {patientId}</>) :(<> </>)}</h3>
                            </div>
                            <div className="col-1 offset-7">
                            <button type="button" className="btn btn-primary btn-block form-control" onClick={() => save()}>Save</button>
                                <Link disabled={patientId? false:true} to={{ pathname: `/patient/${patientId}/report` }}>
                                    Report
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Name" value={nameField} onChange={(e) => { setNameField(e.target.value) }} />
                                </div>
                                <div className="form-group">
                                    <label>Official Id</label>
                                    <input type="text" className="form-control" placeholder="Name" value={officialIdNumberField} onChange={(e) => { setOfficialIdNumberField(e.target.value) }} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Date of Birth</label>
                                    <input type="date" className="form-control" placeholder="Name" value={dateOfBirthField} onChange={(e) => { setDateOfBirthField(e.target.value) }} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Name" value={emailField} onChange={(e) => { setEmailField(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <h3>Metadata</h3>    
                            </div>
                            {
                            metadataItemList.map((item, i) => {
                                return (<MetadataItem key={i} item={item} patientId={patientId}></MetadataItem>)
                            })
                            
                            }
                            <MetadataItem patientId={patientId} saveCallback={addMetadataItem}></MetadataItem>
                        </div>
                    </div>
                )}
        </DashboardContainer>
    );
}

export default ShowPatient;