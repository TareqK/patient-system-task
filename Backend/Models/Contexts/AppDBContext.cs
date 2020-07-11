using Backend.DTOs;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models.Contexts
{
    public class AppDBContext : IdentityDbContext<IdentityUser>{
        public AppDBContext(DbContextOptions options) : base(options)
        {
        }

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Ignore<IntDTO>();
            modelBuilder.Entity<IntDTO>().HasNoKey();
            modelBuilder.Ignore<MetadataRepetitionDTO>();
            modelBuilder.Entity<MetadataRepetitionDTO>().HasNoKey();

        }

        public DbSet<MetadataItem> MetadataItems { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Record> Records { get; set; }

        public DbSet<IntDTO> Int{get;set;}
        
        public DbSet<MetadataRepetitionDTO> Text{get;set;}

    }
}