using System;
using System.Linq;
using Backend.DTO;
using Backend.Models;

namespace Backend.DTOs
{
    public class PatientBriefDTO
    {

        public PatientBriefDTO()
        {

        }

        public PatientBriefDTO(Patient patient)
        {
            this.Name = patient.Name;
            this.PatientId = patient.PatientId;
            this.DateOfBirth = patient.DateOfBirth;
            if (patient.MetadataItems != null)
            {
                this.MetaDataCount = patient.MetadataItems.Count;
            }
            if (patient.Records != null && patient.Records.Count>0)
            {
                    var lastEntry =patient.Records.Last();
                    this.LastEntry = new RecordDTO(lastEntry);
            }


        }
        public string Name { get; set; }
        public long PatientId { get; set; }
        public DateTime DateOfBirth { get; set; }

        public long MetaDataCount { get; set; }
        public RecordDTO LastEntry { get; set; }

        public static PatientBriefDTO fromPatient(Patient patient)
        {
            return new PatientBriefDTO(patient);
        }
    }
}