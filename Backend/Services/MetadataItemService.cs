using System;
using System.Collections.Generic;
using System.Linq;
using Backend.DTOs;
using Backend.Models;
using Backend.Models.Contexts;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class MetadataItemService : IMetadataItemService
    {
        private readonly AppDBContext _context; 
        public MetadataItemService(AppDBContext context){
            _context = context;
        }
        public bool CreateMetadataItem(MetadataItem item)
        {
            var patient = _context.Patients.Find(item.PatientId);
            if(patient == null){
                return false;
            }
            item.Patient = patient;
            patient.AddMetadataItem(item);
            _context.Entry(patient).State = EntityState.Modified;
            _context.MetadataItems.Add(item);
            
            try{
                _context.SaveChanges();
            }catch(DbUpdateException){
                return false;
            }
            return true;
        }

        public bool DeleteMetadataItem(long id)
        {
           var foundItem =  _context.MetadataItems.Find(id);
           _context.MetadataItems.Remove(foundItem);
            try{
                _context.SaveChanges();
            }catch(DbUpdateException){
                return false;
            }
            return true;
        }

        public long GetAverageMetadataItemsPerPatient()
        {
            var stat = _context.Int.FromSqlRaw("SELECT AVG(total) as Value FROM (SELECT COUNT(MetadataItemId) as total FROM MetadataItems  GROUP BY PatientId) as average").First();
            return (long)stat.Value; 
     
      }

        public long GetHighestMetadataItemsPerPatient()
        {
           var stat = _context.Int.FromSqlRaw("SELECT TOP 1 COUNT(MetadataItemId) as Value FROM MetadataItems  GROUP BY PatientId ORDER BY Value DESC").First();
           return (long)stat.Value; 
        }

        public List<KeyValuePair<String, int>> GetMostCommonMetadataKeys(int ammount)
        {
            var sqlString = "SELECT TOP "+ammount+" Name as Value, COUNT(*) as Repetition FROM MetadataItems  GROUP BY Name ORDER BY Repetition DESC";
            var stat = _context.Text.FromSqlRaw(sqlString).ToList();
            return stat.ConvertAll(text=>new KeyValuePair<string, int>(text.Value,text.Repetition));
       }

        public bool UpdateMetadataItem(long id, MetadataItem item)
        {
            item.MetadataItemId = id;
            _context.Entry(item).State = EntityState.Modified;
            try{
                _context.SaveChanges();
            }catch(DbUpdateException){
                return false;
            }
            return true;
        }
    }
}