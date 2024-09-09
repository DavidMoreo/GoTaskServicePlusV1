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
    public class ConceptService : IConcept
    {

        ISqlModelConcept<tblConcepValue> _service;

        public ConceptService(ISqlModelConcept<tblConcepValue> service)
        {

            this._service = service;

        }

        public List<ConceptProduct> ListFilter { get; set; }


        public Task<Response<tblConcepValue>> Delete(ConceptFilter config, Guid id)
        {

            return _service.Delete(config, id);

        }
        public Task<Response<tblConcepValue>> Get(ConceptFilter config, Guid id)
        {
            return _service.Get(config, id);

        }


        public Task<Response<tblConcepValue>> GetByName(ConceptFilter config, string name)
        {
            return _service.Get(config, name);
        }


        public Task<Response<List<tblConcepValue>>> GetAllConceptValue(ConceptFilter config, string typeConcept, int page, string filter = "all")
        {
            return _service.GetAllConceptValue(config, typeConcept, filter);
        }
        public Task<Response<List<tblConcepValue>>> GetAllConceptByIdCompany(ConceptFilter config, string typeConcept, int page, string filter = "all")
        {
            return _service.GetAllConceptByIdCompany(config, typeConcept, filter);
        }

        public async Task<Response<List<tblConcepValue>>> GetAllConceptByCountry(ConceptFilter config, string typeConcept, string countryId)
        {
            var list = await _service.GetAllConceptsByType(typeConcept);
            var lisGuid = new List<Guid>();
            if (list.Data!=null)
             lisGuid = (from d in list.Data select d.Id).ToList();

            return await _service.GeConceptListById(lisGuid);
        }







        public Task<Response<tblConcepValue>> Save(tblConcepValue data)
        {
            _service.ListFilter = new List<tblConcepValue>();
            return _service.Save(data);

        }

        public Task<Response<tblConcepValue>> Update(tblConcepValue data)
        {
            return _service.Update(data);
        }
    }
}


