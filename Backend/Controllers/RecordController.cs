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
    public class RecordController : ControllerBase
    {
        private readonly IRecordService _service;

        public RecordController(IRecordService service)
        {
            _service = service;
        }

        // GET: api/Record
        [HttpGet]
        public async Task<ActionResult> GetRecords()
        {
            return Ok(_service.GetRecordList().ConvertAll( new Converter<Record, RecordBriefDTO>(RecordBriefDTO.fromRecord)));
        }

        // GET: api/Record/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetRecord(long id)
        {
            var record = _service.GetRecordById(id);

            if (record == null)
            {
                return NotFound();
            }

            return Ok(record);
        }

        // PUT: api/Record/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult> PutRecord(long id, Record record)
        {
            if (id != record.RecordId)
            {
                return BadRequest();
            }

            bool result = _service.UpdateRecord(id,record);
            if(result == false){
                return NotFound();
            }
            return Ok();
        }

        // POST: api/Record
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Record>> PostRecord(Record record)
        {
            _service.AddRecord(record);
            return CreatedAtAction("GetRecord", new { id = record.RecordId }, record);
        }

        // DELETE: api/Record/5
      
    }
}
