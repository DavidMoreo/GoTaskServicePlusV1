using GoTaskServiceplus.Client.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;

namespace GoTaskServicePlus.Entities
{
    public class UtilImgItem
    {
        public ImgItem Empty {

            get { 
            
            var imgItem = new ImgItem();
                imgItem.IdCompany = Config.GuidEmpty;
                imgItem. IdProject = Config.GuidEmpty;
                imgItem.ConceptCompany = new NameConcept();
                imgItem.ConceptProject = new NameConcept();
                imgItem.ConceptPrevious = new NameConcept();

                return imgItem;
            }
        
        }

        public ImgItem Img { get; set; }
        

        public UtilImgItem(ImgItem img)
        {
           
        }

        public UtilImgItem(Guid? idCompany, Guid? idProject)
        {
            Img = Empty;
            Img.IdProject = GetId(idProject);
            Img.IdCompany = GetId(idCompany);           
        }

        internal void  SetImgEmpty()
        {

        }

        internal Guid GetId(Guid? _id)
        {
            if (_id != null && _id != Config.GuidEmpty)
            {
                return _id.Value;
            }
            else
            {
                throw new NotImplementedException();
            }     
        }

    }
}
