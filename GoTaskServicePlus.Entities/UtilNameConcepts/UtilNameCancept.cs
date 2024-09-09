using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using Utility.General;

namespace GoTaskServicePlus.Entities.UtilNameConcepts
{
    public class UtilNameCancept : NameConcept
    {
        public NameConcept Concept { get; set; }
        public UtilNameCancept()
        {
            Concept = new NameConcept()
            {
                Name = "",
                Value = "",
                Id = Config.GuidEmpty
            };

        }

        public UtilNameCancept(string name, Guid id, string value = "")
        {
            Concept = new NameConcept()
            {
                Name = name,
                Value = value,
                Id = id
            };

        }

      
        public UtilNameCancept(NameConcept nameConcept)
        {
            GetId(nameConcept.Id);
        }

        public bool IsEmptyId(Guid? _id)
        {
            if (_id != null && _id.Value != Config.GuidEmpty)
            {
                return false;
            }
            else
            {
                return true;
            }

        }

        internal Guid GetId(Guid? _id)
        {
            if (_id != null)
            {
                this.Id = _id.Value;
            }
            else
            {
                throw new NotImplementedException();
            }
            return Config.GuidEmpty;
        }

        internal void GetId(Guid _id)
        {
            if (_id != Config.GuidEmpty)
            {
                this.Id = _id;
            }
            else
            {
                throw new NotImplementedException();
            }

        }



    }
}
