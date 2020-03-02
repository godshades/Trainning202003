using Model.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Dao
{
    public class EmployeeDao
    {
        EmloyeeDbContext db = new EmloyeeDbContext();
        public List<Employee> ListAll()
        {
            return db.Employees.Where(x => x.Status == true).OrderBy(x => x.Name).ToList();
        }
    }
}
