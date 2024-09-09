using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.BD.SqlServer;
using GoTaskServicePlus.Model.Chats;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.IA;
using GoTaskServicePlus.Model.Structure;

namespace GoTaskServicePlus.Interfaces.BD.SqlServer
{
    public interface ISqlModelProduct<T> : ISqlModel<tblProduct>
    {
        public Task<Response<List<tblProduct>>> GetFilterByName(ConceptFilter concept, tblProduct product, int page, int pageSize);
        public Task<Response<ImgItem>> SelectedImg(List<Guid> listImg, ConceptFilter config, Guid idrefer);
        public Task<Response<ImgItem>> SaveImg(List<ImgItem> img);
        public  Task<Response<ImgItem>> GetImgByUrl(ConceptFilter config, string url);
        public Task<Response<ImgItem>> UpdateImgByName(ConceptFilter config, ImgItem image);
        public Task<Response<List<ImgItem>>> GeImagesByCompanyId(ConceptFilter config, string filter);
    }

    public interface ISqlModelConcept<T> : ISqlModel<tblConcepValue>
    {
        public Task<Response<List<tblConcepValue>>> GetAllConceptValue(ConceptFilter config, string typeConceptValue, string filter);
        public Task<Response<List<tblConcepValue>>> GetAllConceptByIdCompany(ConceptFilter config, string typeConceptValue, string filter);
        //public Task<Response<List<tblConcepValue>>> GetAllConceptByCountry(ConceptFilter config, string typeConceptValue, List<string> listId);

        public Task<Response<List<T>>> GetAllConceptsByType(string type);
        public Task<Response<List<T>>> GetListIAData();
        public Task<Response<List<T>>> GeConceptListById(List<Guid> IdProducts);
        public List<T> ListFilter { get; set; }

    }


    public interface ISqlTblReferProduct<T> : ISqlModel<tblReferProduct>
    {   
        public Task<Response<List<T>>> GetByName(ConceptFilter config, string filter,int page);
        public Task<Response<List<tblReferProduct>>> GetAllConceptByCompany(ConceptFilter config);
       

    }


    public interface ISqlModelLogin<T> : ISqlModel<tblUser>
    {
        public Task<Response<T>> GetByEmail(string email);
        public Task<Response<T>> GetByMobileNumber(string number);
        public Task<Response<T>> GetByKey(string keyPasword);
        public Task<Response<tblUser>> UpdatePassword(tblUser user);

    }

    public interface ISqlModelCompany<T> : ISqlModel<tblCompany>
    {
        public Task<Response<List<T>>> GetAll(ConceptFilter config, string filter, int page);
        public Task<Response<List<T>>> GetAllAdmin(ConceptFilter config, string filter, int page);
        public Task<Response<T>> Get(ConceptFilter config, string filter);

        public Task<Response<List<T>>> GetFilter();
        public List<T> ListFilter { get; set; }
    }

    public interface ISqlModelProject<T> : ISqlModel<tblProject>
    {
        public Task<Response<List<tblProject>>> GetAll(ConceptFilter config, string filter, int page);
        public Task<Response<tblConcepValue>> GetAddressProject(Guid idProject);
        public Task<Response<List<tblProject>>> GetAllAdmin(ConceptFilter config, string filter, int page);
        public Task<Response<List<tblProject>>> GetAllByCompany(ConceptFilter config, int page);
    }

    public interface ISqlModelUser<T> : ISqlModel<tblUser>
    {
        public Task<Response<List<tblUser>>> GetUserListById(List<Guid> id, int page);
        public Task<Response<List<tblUser>>> GetAllByIDCompany(ConceptFilter config, int page);
        public Task<Response<List<tblUser>>> GetFilter();
        public List<tblUser> ListFilter { get; set; }
    }


    public interface ISqlModelRolUser<T> : ISqlModel<tblRol>
    {
        public Task<Response<List<tblRol>>> GetAllByProject(ConceptFilter config, int page, string filter);
        public Task<Response<List<tblRol>>> GetByRol(ConceptFilter config);
        public Task<Response<List<tblRol>>> GetAllByCompany(ConceptFilter config, string filter, int page);

    }


    public interface ISqlModelChat<T> : ISqlModel<tblChatBotMsg>
    {
        public Task<Response<List<tblChatBotMsg>>> GetAllChatIaConfigByType(ConceptFilter config);
        public Task<Response<List<ChatBot>>> GetChatGotask(ConceptFilter config);
        public Task<Response<List<tblChatBotMsg>>> GetChatByUser(ConceptFilter config, Guid id, DateTime dateStart, DateTime dateEnd, int page);
        public Task<Response<List<tblChatBotMsg>>> GetFilterMsg(ConceptFilter config, string filter, DateTime dateStart, DateTime dateEnd, int page);

        public List<tblUser> ListFilter { get; set; }
    }


    public interface ISqlModelBuyCutomer<T> : ISqlModel<tblBuyerCustomer>
    {
        public Task<Response<List<tblBuyerCustomer>>> GetAllByProject(ConceptFilter config, string filter);
        public Task<Response<tblBuyerCustomer>> UpdateBuyMovementTypeItem(ConceptFilter config, string movementTypeItem, Guid id);
        public Task<Response<tblBuyerCustomer>> UpdateAdminBuyMovementTypeItem(ConceptFilter config, string movementTypeItem, Guid id);
        public Task<Response<List<tblBuyerCustomer>>> GetAllByCustomer(ConceptFilter concept);
        public Task<Response<List<tblBuyerCustomer>>> GetAllByStatus(ConceptFilter config, string movementTypeItem);
        public Task<Response<CountBuyerCustomer>> GetCountByStatusAdmin(ConceptFilter config);
        public Task<Response<List<tblBuyerCustomer>>> GetAllByCompany(ConceptFilter config, string filter);

    }


    public interface ISqlModelCarCutomer<T> : ISqlModel<tblBuyerCustomer>
    {
       
        public Task<Response<List<tblBuyerCustomer>>> GetAllByUserCarCustomer(ConceptFilter concept, string statusMovementItem);

    }

    public interface ISqlModelFavoriteCutomer<T> : ISqlModel<tblBuyerCustomer>
    {
        public Task<Response<List<tblBuyerCustomer>>> GetAllByUserFavoriteCustomer(ConceptFilter concept, string statusMovementItem);

    }







}
