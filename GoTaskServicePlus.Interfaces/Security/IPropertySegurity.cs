using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Security
{
    public class PropertySegurity
    {
        public static List<Claim> SegurityClaim { get; set; }
        public static Boolean IsLogin { get; set; }
        public static Boolean IsVendor { get; set; }
        public static Boolean IsMaker { get; set; }
        public static Boolean IsAdmin { get; set; }

    }
}
