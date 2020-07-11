namespace Backend.Models
{
    public class MetadataItem
    {
        public long MetadataItemId{get;set;}
        public string Name{get;set;}
        public string Value{get;set;}

        public Patient Patient{get;set;}
        public long PatientId{get;set;}

    
    }
}