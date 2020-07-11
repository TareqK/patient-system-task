using System.Collections.Generic;
using Backend.Models;

namespace Backend.Services.Interfaces
{
    public interface IPatientService
    {
        List<Patient> GetPatientList();

        List<Patient> GetSimilarPatients(long patientId);
        public bool CreatePatient(Patient patient);
        Patient GetPatientById(long patientId);
        bool UpdatePatient(long patientId, Patient patient);
        bool DeletePatient(long patientId);

    }
}