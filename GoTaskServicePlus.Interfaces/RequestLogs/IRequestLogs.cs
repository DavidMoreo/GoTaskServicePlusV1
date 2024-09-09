using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.RequestLogs
{
    public interface RequestLogsInterface
    {
        public Task Save(string logstring);
        public Task Save(Response<object> log);
        public Task Save(tblRequestLog log);
        public Task Save(List<tblRequestLog> logs);
        public Task GetByIdCompany(Guid idCompany,int page);
        public Task GetByIdProject(Guid idProject,int page);
        public Task GetByDateTime(DateTime dateStart, DateTime dateEnd,int page);
        public Task GetByValueFilter(string filter ,int page);
    }
}
