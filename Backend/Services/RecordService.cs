using System.Collections.Generic;
using System.Linq;
using Backend.Models;
using Backend.Models.Contexts;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class RecordService : IRecordService
    {
        public readonly AppDBContext _context;

        public RecordService(AppDBContext context){
            _context = context;
        }
        public bool AddRecord(Record record)
        {
            var patient = _context.Patients.Find(record.PatientId);
            if(patient == null){
                return false;
            }
            record.Patient = patient;
            patient.AddRecord(record);
            _context.Records.Add(record);
            _context.Entry(record).State = EntityState.Added;
            _context.Entry(patient).State = EntityState.Modified;
           
            try{
                _context.SaveChanges();
            }catch(DbUpdateException){
                return false;
            }
            return true;
        }

        public Record GetRecordById(long id)
        {
            return _context.Records
            .Include(record => record.Patient)
            .Where(record => record.RecordId == id)
            .First();
        }

        public List<Record> GetRecordList()
        {
            return _context.Records
            .Include(record => record.Patient)
            .ToList();
        }

        public bool UpdateRecord(long id, Record record)
        {
            record.RecordId = id;
            record.Patient = _context.Patients.Find(record.PatientId);
           _context.Entry(record).State = EntityState.Modified;
           try{
               _context.SaveChanges();
           }catch(DbUpdateException){
               return false;
           }
           return true;

        }
    }
}