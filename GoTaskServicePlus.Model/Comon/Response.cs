using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Comon
{
    public class Response<T>
    {
        public bool Status { get; set; } = false;
        public string Json   { get; set; }
        public string KeyRefresh { get; set; }
        public ErrorCustom Log   { get; set; } = new();
        public string ErrorPublic   { get; set; }
        public List<MsgResponse> Msg { get; set; } = new();
        public int Pages { get; set; } = new();
        public T Data { get; set; } 
        public List<tblRol> rols { get; set; } 
      

    }

    public class ErrorCustom
    {
        public string Msg { get; set; }
        [Required]
        public TypeError TypeMsg { get; set; }
        public enum TypeError
        {
            Warnig,
            Ecxecption
        }
    }

   



  public  class MsgResponse 
    {
        public Guid Id { get; set; }
        public string  Msg { get; set; } 
        public string ErrorPublic { get; set; }
        public string ErrorPrivate { get; set; }

    } 
}
