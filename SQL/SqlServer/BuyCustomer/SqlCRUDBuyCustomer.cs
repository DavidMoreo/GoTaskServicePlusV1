using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;
using static GoTaskServicePlus.Model.Structure.tblCommens;

namespace SQL.SqlServer.Admin
{
    public class SqlCRUDBuyCustomer : ISqlModelBuyCutomer<tblBuyerCustomer>
    {

        private readonly string ConnectionString = "";

        private readonly IConfiguration _Config;

        public List<tblCompany> ListFilter { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public SqlCRUDBuyCustomer(IConfiguration _Config)
        {
            try
            {
                this._Config = _Config;

                ConnectionString = this._Config.GetSection(Config.ConnectionSqlName).Value.ToString();

            }
            catch (Exception)
            {

                throw;
            }

        }

        private async Task<SqlCommand> GetSqlCommand(TypeCommand typeCommand, tblBuyerCustomer buy, SqlConnection cmd, string ProcedureName, int page = 0)
        {
            SqlCommand sqlCommand = new SqlCommand(ProcedureName, cmd);
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            if (typeCommand == TypeCommand.Get  || typeCommand == TypeCommand.Update )
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.Id)}", buy.Id);
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.IdProject)}", buy.IdProject);
            }

            if (typeCommand == TypeCommand.GetAllByProject )
            {
         
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.IdProject)}", buy.IdProject);
            }

            if (typeCommand == TypeCommand.Delete || typeCommand == TypeCommand.Save)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.Id)}", buy.Id);
     
            }

            if (typeCommand == TypeCommand.UpdateTypeBuy)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.Id)}", buy.Id);
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.StatusMovementItem)}", buy.StatusMovementItem);
            }

            if (typeCommand == TypeCommand.UpdateCustomerTypeBuy)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.Id)}", buy.Id);
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.StatusMovementItem)}", buy.StatusMovementItem);
            }

            if (typeCommand == TypeCommand.GetAllByCustomer)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.UserId)}", buy.UserId);
                //sqlCommand.Parameters.AddWithValue($"@{nameof(buy.StatusMovementItem)}", Null<string>.GetNull(buy.StatusMovementItem));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.MovementConceptTypeItem)}", Null<string>.GetNull(buy.MovementConceptTypeItem));
            }

            if (typeCommand == TypeCommand.GetAllByStatus)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.StatusMovementItem)}", buy.StatusMovementItem);
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.IdProject)}", buy.IdProject);
            }


            if (typeCommand == TypeCommand.Save || typeCommand == TypeCommand.Update)
            {

                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.Code)}", buy.Code);
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.InUse)}", Null<string>.GetNull(buy.InUse));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.IdProduct)}", Null<string>.GetNull(buy.IdProduct));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.Name)}", Null<string>.GetNull(buy.Name));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.CreationDate)}", Null<string>.GetNull(buy.GetCreationDate));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.EditDate)}", Null<string>.GetNull(buy.GetEditDate));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.Disable)}", Null<string>.GetNull(buy.Disable));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.UserId)}", Null<string>.GetNull(buy.UserId));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.StatusMovementItem)}", Null<string>.GetNull(buy.StatusMovementItem));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.MovementConceptTypeItem)}", Null<string>.GetNull(buy.MovementConceptTypeItem));
                
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.Quantity)}", Null<int>.GetNull(buy.Quantity));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.PurchasePrice)}", Null<decimal>.GetNull(buy.PurchasePrice));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.SalePrice)}", Null<decimal>.GetNull(buy.SalePrice));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.IdCompany)}", Null<Guid>.GetNull(buy.IdCompany));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.IdProject)}", Null<Guid>.GetNull(buy.IdProject));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.PurchareId)}", Null<Guid>.GetNull(buy.PurchareId));
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.Ico)}", Null<string>.GetNull(buy.Ico)); 
                sqlCommand.Parameters.AddWithValue($"@{nameof(buy.NumberPurchase)}", Null<string>.GetNull(buy.NumberPurchase)); 

            }




            return sqlCommand;
        }

        private List<tblBuyerCustomer> GetList(SqlDataReader read)
        {
            List<tblBuyerCustomer> productList = new List<tblBuyerCustomer>();

            while (read.Read())
            {
                try
                {


                   

                    var buyItem = new tblBuyerCustomer();

                    buyItem.Id = Null<Guid>.GetNull(read[nameof(tblBuyerCustomer.Id)]);
                    buyItem.IdProduct = Null<Guid>.GetNull(read[nameof(tblBuyerCustomer.IdProduct)]);
                    buyItem.IdCompany = Null<Guid>.GetNull(read[nameof(tblBuyerCustomer.IdCompany)]);
                    buyItem.IdProject = Null<Guid>.GetNull(read[nameof(tblBuyerCustomer.IdProject)]);                   
                    //buyItem.ConceptCompany = Null<NameConcept>.Get(read[nameof(tblBuyerCustomer.ConceptCompany)]);
                    //buyItem.ConceptProject = Null<NameConcept>.Get(read[nameof(tblBuyerCustomer.ConceptProject)]);
                    //buyItem.ConceptPrevious = Null<NameConcept>.Get(read[nameof(tblBuyerCustomer.ConceptPrevious)]);
                    buyItem.Name = Null<string>.GetNull(read[nameof(tblBuyerCustomer.Name)]);
                    buyItem.CreationDate = Null<string>.GetNull(read[nameof(tblBuyerCustomer.CreationDate)]);
                    buyItem.Disable = Null<bool>.GetNull(read[nameof(tblBuyerCustomer.Disable)]);
                    buyItem.InUse = Null<bool>.GetNull(read[nameof(tblBuyerCustomer.InUse)]);
                    buyItem.EditDate = Null<string>.GetNull(read[nameof(tblBuyerCustomer.EditDate)]);
                    buyItem.Code = Null<string>.GetNull(read[nameof(tblBuyerCustomer.Code)]);
                    buyItem.SalePrice = Null<decimal>.GetNull(read[nameof(tblBuyerCustomer.SalePrice)]);
                    buyItem.PurchasePrice = Null<decimal>.GetNull(read[nameof(tblBuyerCustomer.PurchasePrice)]);
                    buyItem.UserId = Null<Guid>.GetNull(read[nameof(tblBuyerCustomer.UserId)]);
                    buyItem.MovementConceptTypeItem = Null<string>.GetNull(read[nameof(tblBuyerCustomer.MovementConceptTypeItem)]);
                    buyItem.StatusMovementItem = Null<string>.GetNull(read[nameof(tblBuyerCustomer.StatusMovementItem)]);
                    buyItem.Quantity = Null<int>.GetNull(read[nameof(tblBuyerCustomer.Quantity)]);
                    buyItem.Ico = Null<string>.GetNull(read[nameof(tblBuyerCustomer.Ico)]);
                    buyItem.PurchareId = Null<Guid>.GetNull(read[nameof(tblBuyerCustomer.PurchareId)]);
                    buyItem.NumberPurchase = Null<string>.GetNull(read[nameof(tblBuyerCustomer.NumberPurchase)]);
                    buyItem.User = new ConceptUser();
                    buyItem.User.Name = Null<string>.GetNull(read["NameUser"]);
                    buyItem.User.MobileNumber = Null<string>.GetNull(read["MobilUser"]);
                    
                    buyItem.Project = new ConceptProject
                    {
                        Gps = Null<string>.GetNull(read["Gps"]),
                        ConceptCity = Null<NameConcept>.Get(read["City"]),
                        MobilNumber = Null<string>.GetNull(read["MobilProject"]),
                        Name = Null<string>.GetNull(read["NameProject"])
                    };
                    
                    productList.Add(buyItem);



                }
                catch (Exception ex)
                {

                    throw;
                }
            }
            return productList;
        }

        private CountBuyerCustomer GetCounByStatus(SqlDataReader read)
        {
            var obj = new CountBuyerCustomer();   

            while (read.Read())
            {
                try
                {                  
                    obj.QuantityGenerate = Null<int>.GetNull(read[nameof(CountBuyerCustomer.QuantityGenerate)]);
                    obj.QuantityProcess = Null<int>.GetNull(read[nameof(CountBuyerCustomer.QuantityProcess)]);
                    obj.QuantityDelivery = Null<int>.GetNull(read[nameof(CountBuyerCustomer.QuantityDelivery)]);
                    obj.QuantityCancelByCustomer = Null<int>.GetNull(read[nameof(CountBuyerCustomer.QuantityCancelByCustomer)]);
                    obj.QuantityCancelByVendor = Null<int>.GetNull(read[nameof(CountBuyerCustomer.QuantityCancelByVendor)]);
                    obj.QuantityCancelByAdmin = Null<int>.GetNull(read[nameof(CountBuyerCustomer.QuantityCancelByAdmin)]);
                    obj.QuantityCompleted = Null<int>.GetNull(read[nameof(CountBuyerCustomer.QuantityCompleted)]);

                }
                catch (Exception ex)
                {

                    throw;
                }
            }
            return obj;
        }

        public async Task<Response<List<tblBuyerCustomer>>> GetAllByProject(ConceptFilter config, string filter)
        {
            var obj = new Response<List<tblBuyerCustomer>>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblBuyerCustomer() { IdCompany = config.IdProject, Name = filter }, cmd, "GetBuyCustomerByProject");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = GetList(read);

                    if (itemRead != null && itemRead.Count() > 0)
                    {

                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }

        public async Task<Response<List<tblBuyerCustomer>>> GetAllByCompany(ConceptFilter config, string filter)
        {
            var obj = new Response<List<tblBuyerCustomer>>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblBuyerCustomer() { IdCompany = config.IdCompany, Name = filter }, cmd, "GetBuyCustomerByCompany");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = GetList(read);

                    if (itemRead != null && itemRead.Count() > 0)
                    {

                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }

        public async Task<Response<CountBuyerCustomer>> GetCountByStatusAdmin(ConceptFilter config)
        {
            var obj = new Response<CountBuyerCustomer>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetAllByProject, new tblBuyerCustomer() { IdProject = config.IdProject }, cmd, "GetCountBuyStatus");
                    cmd.Open();

                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = GetCounByStatus(read);

                    if (itemRead != null )
                    {

                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }


        public async Task<Response<tblBuyerCustomer>> Get(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblBuyerCustomer>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblBuyerCustomer() { IdProject = config.IdProject, Id = id }, cmd, "GetBuyCustomerById");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = GetList(read);

                    if (itemRead != null && itemRead.Count() > 0)
                    {

                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead.FirstOrDefault();

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }

        public async Task<Response<tblBuyerCustomer>> Get(ConceptFilter config, string filter)
        {
            var obj = new Response<tblBuyerCustomer>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblBuyerCustomer() { IdProject = config.IdProject, Name = filter }, cmd, "GetBuyCustomerByName");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = GetList(read);

                    if (itemRead != null && itemRead.Count() > 0)
                    {

                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead.FirstOrDefault();

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }

        public async Task<Response<tblBuyerCustomer>> Delete(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblBuyerCustomer>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Delete, new tblBuyerCustomer() { Id = id }, cmd, "DeleteBuyIdItem");
                    cmd.Open();

                    obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;

                    obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }

        public async Task<Response<tblBuyerCustomer>> Update(tblBuyerCustomer data)
        {
            var obj = new Response<tblBuyerCustomer>();

            try
            {
                if (data != null)
                {

                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Save, data, cmd, "UpdateBuyCompany");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "producto creado", Id = Guid.NewGuid() } };
                        if (obj.Status) obj.Data = data;
                        return obj;
                    }
                }
                else { obj.Log = new ErrorCustom { Msg = "Save buy null", TypeMsg = ErrorCustom.TypeError.Warnig }; }
            }
            catch (Exception ex)
            {
                obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };
                obj.Log = new ErrorCustom { Msg = $" save buy  {ex.Message}", TypeMsg = ErrorCustom.TypeError.Warnig };

                return obj;

            }

            obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };

            return obj;
        }

        public async Task<Response<tblBuyerCustomer>> Save(tblBuyerCustomer data)
        {
            var obj = new Response<tblBuyerCustomer>();

            try
            {
                if (data != null)
                {

                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Save, data, cmd, "SaveBuyCustomer");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "compra creada", Id = Guid.NewGuid() } };
                        if (obj.Status) obj.Data = data;
                        return obj;
                    }
                }
                else { obj.Log = new ErrorCustom { Msg = "Save buy null", TypeMsg = ErrorCustom.TypeError.Warnig }; }
            }
            catch (Exception ex)
            {
                obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };
                obj.Log = new ErrorCustom { Msg = $" save buy  {ex.Message}", TypeMsg = ErrorCustom.TypeError.Warnig };

                return obj;

            }

            obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };

            return obj;
        }

        public async Task<Response<List<tblBuyerCustomer>>> GetAllByCustomer(ConceptFilter concept)
        {
            var obj = new Response<List<tblBuyerCustomer>>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetAllByCustomer, new tblBuyerCustomer() { UserId = concept.IdUser, MovementConceptTypeItem = MovementConceptType.Purchase} , cmd, "GetAllBuyCustomer");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = GetList(read);

                    if (itemRead != null && itemRead.Count() > 0)
                    {

                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }

        public async Task<Response<List<tblBuyerCustomer>>> GetAllByStatus(ConceptFilter config, string movementTypeItem)
        {

            var obj = new Response<List<tblBuyerCustomer>>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetAllByStatus, new tblBuyerCustomer() { StatusMovementItem = movementTypeItem, IdProject = config.IdProject }, cmd, "GetBuyMovementTypeItem");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = GetList(read);


                    if (itemRead != null && itemRead.Count() > 0)
                    {

                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }

        public async Task<Response<tblBuyerCustomer>> UpdateBuyMovementTypeItem(ConceptFilter config, string movementTypeItem, Guid id)
        {
            var obj = new Response<tblBuyerCustomer>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.UpdateCustomerTypeBuy, new tblBuyerCustomer() { Id = id, StatusMovementItem = movementTypeItem }, cmd, "UpdateBuyMovementTypeItem");
                    cmd.Open();


                    obj.Status = sqlCommand.ExecuteNonQuery() > 0;


                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }

        public async Task<Response<tblBuyerCustomer>> UpdateAdminBuyMovementTypeItem(ConceptFilter config, string statusMovementItem, Guid id)
        {
            var obj = new Response<tblBuyerCustomer>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.UpdateTypeBuy, new tblBuyerCustomer() {  Id = id, StatusMovementItem = statusMovementItem }, cmd, "UpdateAdminBuyMovementTypeItem");
                    cmd.Open();


                    obj.Status = sqlCommand.ExecuteNonQuery() > 0;


                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }

        enum TypeCommand
        {
            Save,
            Update,
            Delete,
            Get,
            GetAllByProject,
            GetAllByCustomer,
            UpdateCustomerTypeBuy,
            GetAllByStatus,
            UpdateTypeBuy,
            Defaul

        }

    }
}
