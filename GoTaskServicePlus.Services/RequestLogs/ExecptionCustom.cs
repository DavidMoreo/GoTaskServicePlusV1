using GoTaskServicePlus.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Services.RequestLog
{
    public class ExecptionCustom : Exception
    {
        public ExecptionCustom() { }    
        public ExecptionCustom(string message):base(message) { }
        public ExecptionCustom(ErrorCustom message) {
        
          throw new ExecptionCustom(message.Msg);       
        
        }
      
    }
}
