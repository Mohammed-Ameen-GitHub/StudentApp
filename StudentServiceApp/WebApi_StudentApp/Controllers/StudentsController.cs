using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity.Migrations;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;
using StudentService.Models;


namespace StudentService.Controllers
{
    [System.Web.Http.RoutePrefix("Api/Students")]

    public class StudentsController : ApiController
    {
       
        StudentDBEntities db = new StudentDBEntities();

        [System.Web.Http.Route("Get")]
        [System.Web.Http.HttpGet]
        public IHttpActionResult Get()
        {
            IList<Student> student = null;
            using (db)
            { 
              student = db.Students.ToList();
            }
            if (student.Count == 0)
                return NotFound();
            return Ok(student);
        }

        [System.Web.Http.Route("Get/{id}")]
        [System.Web.Http.HttpGet]
        public IHttpActionResult Get(int id)
        {
           
            using (db)
            {
                var result = db.Students.FirstOrDefault(s => s.Id == id);
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound(); 
                }
             
            }
  
           
        }
        [System.Web.Http.Route("Post")]
        [System.Web.Http.HttpPost]
        public IHttpActionResult Post(Student student)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data. Please recheck!");
            using (db)
            {
                if (student.Id == 0)
                {
                    db.Students
                              .Add(new Student()
                              {
                                  FirstName = student.FirstName,
                                  LastName = student.LastName,
                                  Address = student.Address,
                                  Gender = student.Gender
                              });
                    db.SaveChanges();
                }
                else
                    return NotFound();
            }
            return Ok();
        }

        [System.Web.Http.Route("Put/{id}")]
        [System.Web.Http.HttpPut]
        public IHttpActionResult Put(int id,Student student)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data. Please recheck!");
            using (db)
            {
                if (student.Id == 0)
                {
                    Student sm = new Student();
                    sm.FirstName = student.FirstName;
                    sm.LastName = student.LastName;
                    sm.Address = student.Address;
                    sm.Gender = student.Gender;
                    db.Students.Add(sm);
                    db.SaveChanges();

                }
                else
                {
                    var check = db.Students.Where(c => c.Id == id).ToList().FirstOrDefault();
                    if (check != null)
                    {
                        check.FirstName = student.FirstName;
                        check.LastName = student.LastName;
                        check.Address = student.Address;
                        check.Gender = student.Gender;

                        db.SaveChanges();

                    }
                    else
                        return NotFound();
                }
            }
            return Ok();
        }

        [System.Web.Http.Route("Delete/{id}")]
        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            if (id<=0)
                return BadRequest("Please enter valid customer Id");
            using (db)
            {
                var student = db.Students.Where(c => c.Id == id).FirstOrDefault();
                if(student==null)
                    return NotFound();
                else
                {
                    db.Entry(student).State = System.Data.Entity.EntityState.Deleted;
                   
                    db.SaveChanges();
                }
            }
            return Ok();
        }


        
  }
}