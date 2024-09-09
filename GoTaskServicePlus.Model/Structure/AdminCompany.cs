using GoTaskServiceplus.Client.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Structure
{
    public class PlanOperation : Info
    {
        public List<PermissionPlan> ListPermission { get; set; }

        public List<PermissionPlan> GetListPermission(string value)
        {
            try
            {
                return JsonSerializer.Deserialize<List<PermissionPlan>>(value);

            }
            catch (Exception)
            {
                return new List<PermissionPlan>();
                throw;
            }
        }

    }

    public class PermissionPlan : Info
    {
        public bool Read { get; set; }
        public bool Write { get; set; }
        public bool Delete { get; set; }
        public string FuntionMode { get; set; }

    }
}
