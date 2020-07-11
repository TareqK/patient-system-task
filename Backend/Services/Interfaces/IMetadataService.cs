using System;
using System.Collections.Generic;
using Backend.Models;

namespace Backend.Services.Interfaces
{
    public interface IMetadataItemService
    {
         bool CreateMetadataItem(MetadataItem item);
         bool UpdateMetadataItem(long id, MetadataItem item);
         bool DeleteMetadataItem(long id);
         long GetAverageMetadataItemsPerPatient();
         long GetHighestMetadataItemsPerPatient();

         List<KeyValuePair<String, int>> GetMostCommonMetadataKeys(int ammount);

    }
}