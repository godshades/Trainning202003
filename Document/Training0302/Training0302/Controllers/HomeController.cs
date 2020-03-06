using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Training0302.Dao;
using Training0302.Models;

namespace Training0302.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {


            return View();
        }
        public ActionResult _GetList(string empName, string startDate, string endDate, string empGender, string empAddress, string empAge)
        {
            var dao = new EmployeeDao();

            var model = dao.ListAll();
            if (!string.IsNullOrEmpty(empName))
            {
                model = dao.ListByName(empName);
            }
            if (!string.IsNullOrEmpty(startDate) && !string.IsNullOrEmpty(endDate))
            {
                model = dao.ListByBirthday(startDate, endDate);
            }
            if (!string.IsNullOrEmpty(empGender))
            {
                model = dao.ListByGender(empGender);
            }
            if (!string.IsNullOrEmpty(empAddress))
            {
                model = dao.ListByAddress(empAddress);
            }
            if (!string.IsNullOrEmpty(empAge))
            {
                model = dao.ListByAge(empAge);
            }


            return PartialView("_GetList", model);
        }
        [HttpPost]
        public ActionResult AddEmployee(EMPLOYEE data, string gender)
        {
            if (gender == "true")
            {
                data.GENDER = true;
            }
            else data.GENDER = false;
            bool result = new EmployeeDao().AddEmployee(data);
            if (result)
            {
             //   
            }
            
            return PartialView("_GetList", new EmployeeDao().ListAll());
        }
        [HttpPost]
        public ActionResult EditEmployee(EMPLOYEE data, string gender)
        {
            if (gender == "true")
            {
                data.GENDER = true;
            }
            else data.GENDER = false;
            bool result = new EmployeeDao().EditEmployee(data);
            if (result)
            {
                //   
            }
            return PartialView("_GetList", new EmployeeDao().ListAll());
        }
        public ActionResult DeleteEmployee(string deleteId)
        {
            if (!string.IsNullOrEmpty(deleteId))
            {
               bool result = new EmployeeDao().DeleteEmployee(deleteId);
                if (result)
                {
                    //
                }
            }
            
            return View("Index");
        }

    }
}