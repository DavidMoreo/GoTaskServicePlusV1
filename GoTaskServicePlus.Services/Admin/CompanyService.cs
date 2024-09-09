using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using GoTaskServicePlus.Services.Admin.UtilCompany;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GoTaskServicePlus.Services.Company
{
    public class CompanyService : ICompany
    {
        public ISqlModelCompany<tblCompany> _service;

        public CompanyService(ISqlModelCompany<tblCompany> _service)
        {
            this._service = _service;
        }

        public Task<Response<tblCompany>> Delete(ConceptFilter config, Guid id)
        {
            return _service.Delete(config, id);
        }


        public async Task<Response<tblCompany>> Get(ConceptFilter config, string Name)
        {
            return await _service.Get(config, Name);
        }

        public async Task<Response<tblCompany>> Get(ConceptFilter config, Guid id)
        {
            return await _service.Get(config, id);
        }

        public async Task<Response<List<tblCompany>>> GetAll(ConceptFilter config, string filter, int page)
        {
            return await _service.GetAll(config, filter, page);
        }

        public async Task<Response<List<tblCompany>>> GetAllAdmin(ConceptFilter config, string filter, int page)
        {
            return await _service.GetAllAdmin(config, filter, page);
        }

        public async Task<Response<tblCompany>> Save(tblCompany data)
        {
            var result = await UtilSaveCompany.ValidateCompany(data);
            if (result.Status)
            {
                return await _service.Save(result.Data);
            }
            else
            {
                return result;
            }
        }

        public async Task<Response<tblCompany>> Update(tblCompany data)
        {
            var result = await UtilSaveCompany.ValidateCompany(data);
            if (result.Status)
            {
                return await _service.Update(result.Data);
            }
            else
            {
                return result;
            }
        }
    }
}
