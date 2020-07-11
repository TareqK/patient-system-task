using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public class Patient
    {
         public long PatientId { get; set; }
        public string Name {get;set;}
        public string OfficialIdNumber {get;set;}
        public DateTime DateOfBirth{get;set;}
        public string Email {get;set;}
        public List<MetadataItem> MetadataItems{get;set;}
        public List<Record> Records{get;set;}

        public void AddRecord(Record record)
        {
            if(Records == null){
                Records = new List<Record>();
            }
            Records.Add(record);
        }

        internal void AddMetadataItem(MetadataItem item)
        {
            if(MetadataItems == null){
                MetadataItems = new List<MetadataItem>();
            }
            MetadataItems.Add(item);
        }

        public List<string> findDiseaseNames(){
            if(Records!=null){
                 return Records.ConvertAll(record=>record.DiseaseName);
            }
            return new List<string>();
        }
    }
}