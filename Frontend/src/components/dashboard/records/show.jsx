import React, { useEffect, useState } from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DashboardContainer from '../common/DashboardContainer'
import ApiService from '../../../services/web/ApiService'
import Loader from '../common/Loader';
import {useHistory} from 'react-router-dom';
const ShowRecord = ({ ...props }) => {

    const id = props.match.params.id;
    const [loading, setLoading] = useState(true);
    const [record, setRecord] = useState();
    const [edit, setEdit] = useState(false);
    const [diseaseNameField, setDiseaseNameField] = useState();
    const [descriptionField, setDescriptionField] = useState();
    const [patientIdSelect,setPateintIdSelect] = useState();
    const [timeOfEntryField, setTimeOfEntryField ]= useState();
    const [billField, setBillField]  = useState();
    const [patientList,setPatientList] =  useState();
    const history = useHistory();

    useEffect(() => {
        ApiService.get(`patient`)
        .then(res =>{
            setPatientList(res.data);
        }).then(()=>{
            if (id) {
                ApiService.get(`record/` + id)
                    .then(res => {
                        setRecord(res.data)
                        setEdit(true)
                        setPateintIdSelect(res.data.patient.patientId)
                        setDiseaseNameField(res.data.diseaseName)
                        setDescriptionField(res.data.description)
                        let isoStr = new Date(res.data.timeOfEntry).toISOString();
                        setTimeOfEntryField(isoStr.substring(0,isoStr.length-1))
                        setBillField(res.data.bill)
    
                    })
                    .finally(() => { setLoading(false) })
    
            } else {
                setEdit(false);
                let isoStr = new Date().toISOString();
                setTimeOfEntryField(isoStr.substring(0,isoStr.length-1));
                setLoading(false);
            }
        })
        

    }, [])

    const save =() =>{
        let data = {}
       
        data.patientId = patientIdSelect;
        data.diseaseName = diseaseNameField;
        data.description = descriptionField;
        data.timeOfEntry = new Date(timeOfEntryField).toISOString();
        data.bill = billField;
        if(edit){
            data.recordId = id;
            ApiService.put('record/'+id,data)
            .finally(()=>{
                history.push("/records");
            })
        }else{
            ApiService.post('record',data)
            .finally(()=>{
                history.push("/records");
            })
        }
    }
    return (
        <DashboardContainer>
            {loading ? (
                <Loader text="Loading Record info." />
            ) : (
                    <>
                        <div className="col-12">
                            <div className="form-group">
                                <label>Patient</label>
                                <select className="form-control" value={patientIdSelect} onChange={(e)=> setPateintIdSelect(e.target.value)}>
                                    {
                                        patientList.map((item,i)=>{
                                           return (<option key={i} value={item.patientId} >{item.name}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Disease Name</label>
                                <input type="text" className="form-control" placeholder="Disease Name" value={diseaseNameField} onChange={(e) => { setDiseaseNameField(e.target.value) }} />
                            </div>

                            <div className="form-group">
                                <label>Disease Description</label>
                                <input type="text" className="form-control" placeholder="Disease Description" value={descriptionField} onChange={(e) => { setDescriptionField(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <label>Time of Entry</label>
                                <input type="datetime-local" className="form-control"  value={timeOfEntryField} onChange={(e) => { setTimeOfEntryField(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <label>Bill</label>
                                <input type="number" setp="0.01" className="form-control"  value={billField} onChange={(e) => { setBillField(e.target.value) }} />
                            </div>
                            <button type="button" className="btn btn-primary btn-block" onClick={() => save()}>Save</button>

                        </div>
                    </>
                )}
        </DashboardContainer>
    );
}

export default ShowRecord;