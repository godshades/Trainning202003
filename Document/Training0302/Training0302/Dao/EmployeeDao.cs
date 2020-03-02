using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Training0302.Models;

namespace Training0302.Dao
{
    public class EmployeeDao
    {
        EmployeeDbContext db = new EmployeeDbContext();
        public List<Employee> ListAll()
        {
            return db.Employees.Where(x => x.Status == true).OrderBy(x => x.Id).ToList();
        }
        public List<Employee> ListByName(string empName)
        {
            return db.Employees.Where(x => x.Status == true && x.Name.ToUpper().Contains(empName.ToUpper())).OrderBy(x => x.Id).ToList();
        }

    }
}