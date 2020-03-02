namespace Training0302.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Employee")]
    public partial class Employee
    {
        [StringLength(10)]
        public string Id { get; set; }

        [StringLength(250)]
        public string Name { get; set; }

        public DateTime? Birthday { get; set; }

        public bool? Gender { get; set; }

        [StringLength(250)]
        public string Address { get; set; }

        [StringLength(250)]
        public string Email { get; set; }

        [StringLength(15)]
        public string Phone { get; set; }

        public bool? Status { get; set; }
    }
}
