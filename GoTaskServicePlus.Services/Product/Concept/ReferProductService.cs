using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.Products.Concept;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GoTaskServicePlus.Services.Product.Concept
{
    public class ReferProductService : ITblReferProduct
    {
        ISqlTblReferProduct<tblReferProduct> _service;

        public ReferProductService(ISqlTblReferProduct<tblReferProduct> service)
        {
            this._service = service;
        }

        public Task<Response<tblReferProduct>> Delete(ConceptFilter config, Guid id)
        {
            return _service.Delete(config, id);
        }

        public Task<Response<tblReferProduct>> Get(ConceptFilter config, Guid id)
        {
           return _service.Get(config, id);
        }

        public  Task<Response<List<tblReferProduct>>> GetByName(ConceptFilter config, string name, int page)
        {
            return  _service.GetByName(config, name, page);
        }

        public Task<Response<List<tblReferProduct>>> GetAllConceptByCompany(ConceptFilter config)
        {
            return _service.GetAllConceptByCompany(config);
        }


        public Task<Response<tblReferProduct>> Save(tblReferProduct data)
        {
            return _service.Save(data);   
        }

        public Task<Response<tblReferProduct>> Update(tblReferProduct data)
        {
            return _service.Update(data);
        }

      
    }
}


