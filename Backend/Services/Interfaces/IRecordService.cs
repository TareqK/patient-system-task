using System.Collections.Generic;
using Backend.Models;

namespace Backend.Services.Interfaces
{
    public interface IRecordService
    {
         bool AddRecord(Record record);
         
         List<Record> GetRecordList();

         Record GetRecordById(long id);

         bool UpdateRecord(long id, Record record);

         
    }
}