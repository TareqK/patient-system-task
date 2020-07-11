using System.Collections.Generic;
using System.Linq;
using Backend.Models;
using Backend.Models.Contexts;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class PatientService : IPatientService
    {
        public readonly AppDBContext _context;

        public PatientService(AppDBContext context)
        {
            _context = context;

        }

        public bool CreatePatient(Patient patient)
        {
            try
            {
                _context.Add(patient);
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return false;
            }
            return true;
        }

        public bool DeletePatient(long patientId)
        {
            var patient = _context.Patients.Find(patientId);
            if (patient == null)
            {
                return false;
            }
            try
            {
                _context.Patients.Remove(patient);
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return false;
            }
            return true;
        }

        public Patient GetPatientById(long patientId)
        {
            return _context.Patients
            .Include(patient => patient.Records)
            .Include(patient => patient.MetadataItems)
            .Where(patient=> patient.PatientId == patientId)
            .First();
        }

        public List<Patient> GetPatientList()
        {
            return _context.Patients
            .Include(patient => patient.Records)
            .Include(patient => patient.MetadataItems)
            .ToList();
        }

        public List<Patient> GetSimilarPatients(long patientId)
        {
            var patient = GetPatientById(patientId);
            var repetition = 1;
            var diseases = patient.findDiseaseNames();
            var patients = _context.Patients.FromSqlInterpolated($"Select * FROM Patients p  WHERE p.PatientId  IN (SELECT a.PatientId  FROM (SELECT PatientId , COUNT(*) as Repetition FROM Records r WHERE r.DiseaseName IN(SELECT DiseaseName  from Records r2  WHERE PatientId={patientId})  AND r.PatientId !={patientId} GROUP BY PatientId) a WHERE a.Repetition >{repetition})").ToList();
            return patients;
        }

        public bool UpdatePatient(long patientId, Patient patient)
        {
            patient.PatientId = patientId;
            _context.Entry(patient).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return false;
            }
            return true;
        }
    }
}