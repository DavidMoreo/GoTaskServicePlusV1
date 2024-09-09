using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Structure
{
    public class ResponseHttp
    {
        public string? Token { get; set; } = null;
        public string? RefreeschToken { get; set; } = null;
        public string Error { get; set; } = "";
        public bool Status { get; set; } = false;
        public string Json { get; set; } = "";
        public string Msg { get; set; } = "";
    }
}
