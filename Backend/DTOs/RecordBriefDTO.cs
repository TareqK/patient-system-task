using System;
using Backend.Models;

namespace Backend.DTOs
{
    public class RecordBriefDTO
    {
        public RecordBriefDTO(Record record){
            RecordId = record.RecordId;
            PatientName = record.Patient.Name;
            DiseaseName = record.DiseaseName;
            TimeOfEntry = record.TimeOfEntry;
        }

        public long RecordId{get;set;}
        public string PatientName{get;set;}
        public string DiseaseName{get;set;}

        public DateTime TimeOfEntry{get;set;}

        public static RecordBriefDTO fromRecord(Record record){
            return new RecordBriefDTO(record);
        }
    }
}