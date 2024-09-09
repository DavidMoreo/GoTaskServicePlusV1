using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using GoTaskServicePlus.Services.Admin.UtilCompany;
using GoTaskServicePlus.Services.Admin.UtilProject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Services.Company
{
    public class ProjectService : IProject
    {

        private ISqlModelProject<tblProject> sqlService;

        public ProjectService(ISqlModelProject<tblProject> sqlService)
        {
            this.sqlService = sqlService;
        }

        public Task<Response<tblProject>> Delete(ConceptFilter config, Guid id)
        {
            return sqlService.Delete(config, id);
        }

        public Task<Response<tblProject>> Get(ConceptFilter config, Guid idProject)
        {
            return sqlService.Get(config, idProject);
        }

        public Task<Response<tblConcepValue>> GetAddressProject(Guid idProject)
        {
            return sqlService.GetAddressProject(idProject);
        }

        public Task<Response<tblProject>> Get(ConceptFilter config, string name)
        {
            return sqlService.Get(config, name);
        }

        public Task<Response<List<tblProject>>> GetAll(ConceptFilter config, string filter, int page)
        {
            return sqlService.GetAll(config, filter, page);
        }

        public Task<Response<List<tblProject>>> GetAllAdmin(ConceptFilter config, string filter, int page)
        {
            return sqlService.GetAllAdmin(config, filter, page);
        }

        public Task<Response<List<tblProject>>> GetAllByCompany(ConceptFilter config, int page)
        {
            return sqlService.GetAllByCompany(config, page);
        }

        public async Task<Response<tblProject>> Save(tblProject data)
        {
            var result = await UtilSaveProject.ValidateProject(data);
            if (result.Status)
            {
                return await sqlService.Save(data);
            }
            else
            {
                return result;
            }
        }

        public async Task<Response<tblProject>> Update(tblProject data)
        {
            var result = await UtilSaveProject.ValidateProject(data);
            if (result.Status)
            {
                return await sqlService.Update(data);
            }
            else
            {
                return result;
            }

        }


    }
}
