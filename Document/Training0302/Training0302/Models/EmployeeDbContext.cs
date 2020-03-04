namespace Training0302.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext()
            : base("name=EmployeeDbContext")
        {
        }

        public virtual DbSet<EMPLOYEE> EMPLOYEEs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
