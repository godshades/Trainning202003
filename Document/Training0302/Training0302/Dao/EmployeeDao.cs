using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using Training0302.Models;

namespace Training0302.Dao
{
    public class EmployeeDao
    {
        EmployeeDbContext db = new EmployeeDbContext();
        public List<EMPLOYEE> ListAll()
        {
            return db.EMPLOYEEs.Where(x => x.STATUS == true).OrderBy(x => x.ID).ToList();
        }
        public List<EMPLOYEE> ListByName(string empName)
        {
            return db.EMPLOYEEs.Where(x => x.STATUS == true && x.NAME.ToUpper().Contains(empName.ToUpper())).OrderBy(x => x.ID).ToList();
        }
        public List<EMPLOYEE> ListByBirthday(string startDate, string endDate)
        {
            
            DateTime startdate =  DateTime.ParseExact(startDate,"dd/MM/yyyy", CultureInfo.InvariantCulture);
            DateTime enddate = DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            return db.EMPLOYEEs.Where(x => x.BIRTHDAY  > startdate && x.BIRTHDAY < enddate).OrderBy(x => x.ID).ToList();

        }
        public List<EMPLOYEE> ListByGender(string empGender)
        {

            if (empGender == "true")
            {
                return db.EMPLOYEEs.Where(x => x.STATUS == true && x.GENDER == true).OrderBy(x => x.ID).ToList();

            }
            else return db.EMPLOYEEs.Where(x => x.STATUS == true && x.GENDER == false).OrderBy(x => x.ID).ToList();

        }
        public List<EMPLOYEE> ListByAddress(string empAddress)
        {
            return db.EMPLOYEEs.Where(x => x.STATUS == true && x.ADDRESS.ToUpper().Contains(empAddress.ToUpper())).OrderBy(x => x.ID).ToList();
        }
        public List<EMPLOYEE> ListByAge(string empAge)
        {
            int empage = int.Parse(empAge);
            return db.EMPLOYEEs.Where(x =>(DateTime.Now.Year - x.BIRTHDAY.Year) == empage).OrderBy(x => x.ID).ToList();

        }


    }
}