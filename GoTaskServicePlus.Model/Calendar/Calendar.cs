using GoTaskServiceplus.Client.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Calendar
{
    public class AppointmentCalendar : Info
    {
        public string IdCustomer { get; set; }
        public string Date { get; set; }
        public string Typediary { get; set; }
        public bool Active { get; set; }
    }

    class TypediaryMode
    {
        public string Appointment { get { return "Agenda"; } } 
    }







}
