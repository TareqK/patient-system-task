using System;

namespace Backend.Models
{
    public class Record
    {
        public long RecordId{get;set;}
        public string DiseaseName{get;set;}
        public DateTime TimeOfEntry{get;set;}
        public string Description{get;set;}
        public decimal Bill{get;set;}
        
        public Patient Patient{get;set;}
        public long PatientId{get;set;}

    }
}