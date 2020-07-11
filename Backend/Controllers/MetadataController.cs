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
    public class MetadataController : ControllerBase
    {
        private readonly IMetadataItemService _service;

        public MetadataController(IMetadataItemService service)
        {
            _service = service;
        }

        // PUT: api/Metadata/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMetadataItem(long id, MetadataItem metadataItem)
        {
           bool result = _service.UpdateMetadataItem(id,metadataItem);
           if(result == false){
               return NotFound();
           }
            return NoContent();
        }

        // POST: api/Metadata
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult> PostMetadataItem(MetadataItem metadataItem)
        {
            bool result = _service.CreateMetadataItem(metadataItem);
            return Ok(metadataItem);
        }

        // DELETE: api/Metadata/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MetadataItem>> DeleteMetadataItem(long id)
        {
             bool result = _service.DeleteMetadataItem(id);
           if(result == false){
               return NotFound();
           }
            return NoContent();
            
        }

        [HttpGet("report")]
        public async Task<ActionResult> GetMetadataReport(){
            var dto =  new MetadataReportDTO(_service.GetAverageMetadataItemsPerPatient() , _service.GetHighestMetadataItemsPerPatient(),_service.GetMostCommonMetadataKeys(3));
            return Ok(dto);
        }
    }
}
