using System.Collections.Generic;

namespace Backend.DTOs
{
    public class MetadataReportDTO
    {
        public MetadataReportDTO(long average, long highest, List<KeyValuePair<string,int>> commonKeys){
            AverageMetadataItemsPerPatient = average;
            HighestNumberOfMetadataItemsPerPatient = highest;
            MostCommonKeys = commonKeys;
        }
        public long AverageMetadataItemsPerPatient {get;set;}
        public long HighestNumberOfMetadataItemsPerPatient {get;set;}
        public List<KeyValuePair<string,int>>  MostCommonKeys {get;set;}


    }
}