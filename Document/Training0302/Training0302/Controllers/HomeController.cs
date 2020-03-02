using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Training0302.Dao;

namespace Training0302.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
           

            return View();
        }
        public ActionResult _GetList(string empName)
        {
            var dao = new EmployeeDao();

            var model = dao.ListAll();
            if(empName != null)
            {
                model = dao.ListByName(empName);
            }
            
            
            return PartialView("_GetList",model);
        }



    }
}