using System;
using System.Collections.Generic;
using Backend.DTO;
using Backend.DTOs;
using System.Linq;
using System.Globalization;

namespace Backend.Models
{
    public class PatientReport
    {
        public PatientReport(Patient patient, List<Patient> similarPatients)
        {
            Name = patient.Name;
            Age = DateTime.Now.Year - patient.DateOfBirth.Year;
            if (patient.Records != null && patient.Records.Count() > 0)
            {
                BillAverage = patient.Records.ConvertAll(record => record.Bill).Average();
                var stddev = Math.Sqrt((double)patient.Records.ConvertAll(record => record.Bill).Average(z => z * z) - Math.Pow((double)patient.Records.ConvertAll(record => record.Bill).Average(), 2));
                var range = 2 * stddev;
                var recordsInrange = patient.Records.FindAll(record => Math.Abs((double)record.Bill - (double)BillAverage) <= range);
                if(recordsInrange!=null && recordsInrange.Count()>0)
                {
                 NormalizedBillAverage = recordsInrange.ConvertAll(record => record.Bill).Average();
                }
                if(patient.Records.Count()>4){
                    FifthRecord = new RecordDTO(patient.Records.Skip(4).Take(1).First());
                }
                int monthNumber = patient.Records.GroupBy(Record => Record.TimeOfEntry.Month)
                .OrderByDescending(month => month.Count())
                .Take(1)
                .First()
                .Select(g => g.TimeOfEntry.Month)
                .First();
                MonthWithHighestVisits = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(monthNumber);
            }
            SimilarPatients = similarPatients.ConvertAll(patient => new PatientBriefDTO(patient)).ToList();

        }

        public string Name { get; set; }
        public long Age { get; set; }
        public decimal BillAverage { get; set; }
        public decimal NormalizedBillAverage { get; set; }
        public RecordDTO FifthRecord { get; set; }
        public List<PatientBriefDTO> SimilarPatients { get; set; }
        public string MonthWithHighestVisits { get; set; }
    }
}