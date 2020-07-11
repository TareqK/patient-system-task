using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Models.Contexts;
using Backend.Services.Interfaces;
using Backend.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _service;

        public PatientController(IPatientService service)
        {
            _service = service;
        }

        // GET: api/Patient
        [HttpGet]
        public async Task<ActionResult> GetPatients()
        {
            return  Ok(_service.GetPatientList().ConvertAll( new Converter<Patient, PatientBriefDTO>(PatientBriefDTO.fromPatient)));
        }

        // GET: api/Patient/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetPatient(long id)
        {
            var patient = _service.GetPatientById(id);

            if (patient == null)
            {
                return NotFound();
            }

            return Ok(patient);
        }

        // PUT: api/Patient/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(long id, Patient patient)
        {
            if (id != patient.PatientId)
            {
                return BadRequest();
            }
            bool result = _service.UpdatePatient(id,patient);
            if(result == false){
                return NotFound();
            }
            return NoContent();
        }

        // POST: api/Patient
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult> PostPatient(Patient patient)
        {
            _service.CreatePatient(patient);
            return CreatedAtAction("GetPatient", new { id = patient.PatientId }, patient);
        }

        // DELETE: api/Patient/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePatient(long id)
        {
            bool result = _service.DeletePatient(id);
            if(result == false){
                return NotFound();
            }
            return Ok();
        }
        
        
        [HttpGet("{patientId}/report")]
        public async Task<ActionResult> GetPatientReport(long patientId){
            var patient =  _service.GetPatientById(patientId);
            if(patient == null){
                return NotFound();
            }
            var patientReport  = new PatientReport(patient,_service.GetSimilarPatients(patientId));
            return Ok(patientReport);
        }

        public override bool Equals(object obj)
        {
            return obj is PatientController controller &&
                   EqualityComparer<IPatientService>.Default.Equals(_service, controller._service);
        }
    }
}
