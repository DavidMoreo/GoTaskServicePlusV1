using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Notification
{
    public class NotificationModel
    {
        public Guid Id { get; set; }
        public string IP { get; set; }
        public string Msg { get; set; }
        public List<AditionalText> Aditional { get; set; } = new List<AditionalText>();
        public string PhoneNumber { get; set; }
        public string Page { get; set; }
        public List<string> Link { get; set; }        
        public bool Status { get; set; }
        public int Count { get; set; }
    }

   


    public class AditionalText
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }




}
