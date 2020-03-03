namespace Training0302.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("EMPLOYEE")]
    public partial class EMPLOYEE
    {
        [StringLength(10)]
        public string ID { get; set; }

        [Required]
        [StringLength(250)]
        public string NAME { get; set; }

        [Column(TypeName = "date")]
        public DateTime BIRTHDAY { get; set; }

        public bool GENDER { get; set; }

        [Required]
        [StringLength(250)]
        public string ADDRESS { get; set; }

        [StringLength(250)]
        public string EMAIL { get; set; }

        [StringLength(15)]
        public string PHONE { get; set; }

        public bool? STATUS { get; set; }
    }
}
