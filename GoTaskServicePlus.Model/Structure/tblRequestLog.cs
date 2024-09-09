using GoTaskServiceplus.Client.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Structure
{
    public class tblRequestLog : Info
    {
        public string Error {  get; set; }  
        public string Ip {  get; set; }  
        public string Url {  get; set; }  
        public int Count {  get; set; }  
    }
}
