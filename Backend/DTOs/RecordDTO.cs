using System;
using Backend.Models;

namespace Backend.DTO
{
    public class RecordDTO
    {
        public RecordDTO(Record Record){
            this.RecordId = Record.RecordId;
            this.DiseaseName = Record.DiseaseName;
            this.TimeOfEntry = Record.TimeOfEntry;
            this.Description = Record.Description;
            this.Bill = Record.Bill;
            this.PatientId = Record.PatientId;
        }

        public long RecordId{get;set;}
        public string DiseaseName{get;set;}
        public DateTime TimeOfEntry{get;set;}
        public string Description{get;set;}
        public decimal Bill{get;set;}
    
        public long PatientId{get;set;}
    }
}