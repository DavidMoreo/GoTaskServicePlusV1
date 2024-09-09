using GoTaskServiceplus.Client.Model.Comon;
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

namespace SQL.SqlServer.Admin
{
    public class SqlCRUDProject : ISqlModelProject<tblProject>
    {

        private readonly string ConnectionString = "";

        private readonly IConfiguration _Config;
        public SqlCRUDProject(IConfiguration _Config)
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


        public async Task<Response<tblProject>> Delete(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblProject>();

            try
            {

                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Delete, new tblProject() { Id = id }, cmd, "DeleteProjectById");
                    cmd.Open();

                    obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                    cmd.Close();
                    obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " Eliminado " } };

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }



        public async Task<Response<List<tblProject>>> GetAll(ConceptFilter config, string filter, int page)
        {
            var obj = new Response<List<tblProject>>();
            SqlDataReader read;
            try
            {
                tblProject rol = new tblProject();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetAll, new tblProject() { IdCompany = config.IdCompany ,Name = filter }, cmd, "GetProjectAll");
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
        public async Task<Response<List<tblProject>>> GetAllAdmin(ConceptFilter config, string filter, int page)
        {
            var obj = new Response<List<tblProject>>();
            SqlDataReader read;
            try
            {
                tblProject rol = new tblProject();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetAllAdmin, new tblProject() { IdCompany = config.IdCompany, Name = filter }, cmd, "GetProjectAllAdmin");
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


        public async Task<Response<List<tblProject>>> GetAllByCompany(ConceptFilter config, int page)
        {
            var obj = new Response<List<tblProject>>();
            SqlDataReader read;
            try
            {
                tblProject rol = new tblProject();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetAllByCompany, new tblProject() { IdCompany = config.IdCompany }, cmd, "GetProjectAllByCompany");
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



        public async Task<Response<tblProject>> Get(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblProject>();
            SqlDataReader read;
            try
            {
                tblProject rol = new tblProject();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblProject() { Id = id }, cmd, "GetProjectById");
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


        public async Task<Response<tblConcepValue>> GetAddressProject(Guid idProject)
        {
            var obj = new Response<tblConcepValue>();
            SqlDataReader read;
            try
            {
               
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblProject() { Id = idProject }, cmd, "GetAddressByProjectId");
                    cmd.Open();

                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = GetAddressList(read);

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

        public async Task<Response<tblProject>> Get(ConceptFilter config, string name)
        {
            var obj = new Response<tblProject>();
            SqlDataReader read;
            try
            {
                tblProject rol = new tblProject();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetName, new tblProject() { Name = name.ToUpper() }, cmd, "GetProjectByName");
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

        public async Task<Response<tblProject>> Save(tblProject data)
        {
            var obj = new Response<tblProject>();

            try
            {
                if (data != null)
                {

                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Save, data, cmd, "SaveProject");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "producto creado", Id = Guid.NewGuid() } };
                        if (obj.Status) obj.Data = data;

                        return obj;
                    }
                }
                else { obj.Log = new ErrorCustom { Msg = "Save product null", TypeMsg = ErrorCustom.TypeError.Warnig }; }
            }
            catch (Exception ex)
            {
                obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };
                obj.Log = new ErrorCustom { Msg = $" save poduct  {ex.Message}", TypeMsg = ErrorCustom.TypeError.Warnig };

                return obj;

            }


            obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };


            return obj;

        }

        public async Task<Response<tblProject>> Update(tblProject data)
        {
            var obj = new Response<tblProject>();

            try
            {

                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    cmd.Open();
                    sqlCommand = await GetSqlCommand(TypeCommand.Update, data, cmd, "UpdateProject");

                    obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                    cmd.Close();
                    if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Actualizado creado" } };
                    if (obj.Status) obj.Data = data;
                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }

        private async Task<SqlCommand> GetSqlCommand(TypeCommand typeCommand, tblProject company, SqlConnection cmd, string ProcedureName, int page = 0)
        {
            SqlCommand sqlCommand = new SqlCommand(ProcedureName, cmd);
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            if (typeCommand == TypeCommand.Delete || typeCommand == TypeCommand.Get)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Id)}", company.Id);
            }

            if (typeCommand == TypeCommand.GetName)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Name)}", company.Name);
            }

            if (typeCommand == TypeCommand.GetAllByCompany)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.IdCompany)}", company.IdCompany);
            }

            if (typeCommand == TypeCommand.GetAll)
            {
                sqlCommand.Parameters.AddWithValue($"@filter", company.Name);
                sqlCommand.Parameters.AddWithValue(nameof(company.IdCompany),company.IdCompany);
            }

            //if (typeCommand == TypeCommand.GetAll)
            //{
                
            //    sqlCommand.Parameters.AddWithValue(nameof(company.Name), company.Name);
            //}

            if (typeCommand == TypeCommand.GetAllAdmin)
            {
                sqlCommand.Parameters.AddWithValue($"@filter", company.Name);
                sqlCommand.Parameters.AddWithValue(nameof(company.IdCompany), company.IdCompany);

            }


            if (typeCommand == TypeCommand.Save || typeCommand == TypeCommand.Update)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Id)}", company.Id);
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Code)}", company.Code);
                
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Name)}", company.Name.ToUpper());
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.CreationDate)}", company.GetCreationDate);
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.EditDate)}", company.GetEditDate);
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Description)}", company.Description);
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.MobileNumber)}", company.MobileNumber);
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.PhoneNumber)}", company.PhoneNumber);
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.AddressItemId)}", Null<Guid>.GetNull(company.AddressItemId));
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.TypeCompanyMode)}", company.TypeCompanyMode);


                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Disable)}", company.Disable);               

                sqlCommand.Parameters.AddWithValue($"@{nameof(company.StoreOpeningTime)}", Null<string>.Set(company.StoreOpeningTime));
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.StoreClosingTime)}",  Null<string>.Set(company.StoreClosingTime));

                sqlCommand.Parameters.AddWithValue($"@{nameof(company.InUse)}", company.InUse.ToString());
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.IsWhatsApp)}", company.IsWhatsApp);
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.IdCompany)}", company.IdCompany);
                //sqlCommand.Parameters.AddWithValue($"@{nameof(company.IdProject)}", company.IdProject);
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.RegistrationCode)}", Null<string>.Set(company.RegistrationCode));


            }


            return sqlCommand;
        }


        private List<tblProject> GetList(SqlDataReader read)
        {
            List<tblProject> productList = new List<tblProject>();

            while (read.Read())
            {
                try
                {                    
                    var project = new tblProject();
                    project.Id = NotNull.GetNoNull(read[nameof(tblProject.Id)]).guid;                    
                    project.Name = Null<string>.GetNull(read[nameof(tblProject.Name)]);
                    project.CreationDate = Null<string>.GetNull(read[nameof(tblProject.CreationDate)]);
                    project.Disable = Null<bool>.GetNull(read[nameof(tblProject.Disable)]);
                    project.InUse = Null<bool>.GetNull(read[nameof(tblProject.InUse)]);
                    project.EditDate = Null<string>.GetNull(read[nameof(tblProject.EditDate)]);
                    project.Code = Null<string>.GetNull(read[nameof(tblProject.Code)]);
                    project.Description = Null<string>.GetNull(read[nameof(tblProject.Description)]);
                    project.AddressItemId = Null<Guid>.GetNull(read[nameof(tblProject.AddressItemId)]);
                    project.IsWhatsApp = Null<bool>.GetNull(read[nameof(tblProject.IsWhatsApp)]);
                    project.MobileNumber = Null<string>.GetNull(read[nameof(tblProject.MobileNumber)]);
                    project.PhoneNumber = Null<string>.GetNull(read[nameof(tblProject.PhoneNumber)]);
                    project.TypeCompanyMode = Null<string>.GetNull(read[nameof(tblProject.TypeCompanyMode)]);                    
                    project.IdCompany = Null<Guid>.GetNull(read[nameof(tblProject.IdCompany)]);
                    project.IdProject = Null<Guid>.GetNull(read[nameof(tblProject.Id)]);
                    project.ConceptCompany = new NameConcept
                    {
                        Name = Null<string>.GetNull(read["NameCompany"])
                };

                    productList.Add(project);

                }
                catch (Exception ex)
                {

                    throw;
                }
            }
            return productList;
        }

        private List<tblConcepValue> GetAddressList(SqlDataReader read)
        {
            List<tblConcepValue> productList = new List<tblConcepValue>();

            while (read.Read())
            {
                try
                {


                    var address = new tblConcepValue();

                    address.Id = NotNull.GetNoNull(read[nameof(address.Id)]).guid;
                    address.ConceptCompany = Null<NameConcept>.Get(read[nameof(address.ConceptCompany)]);
                    address.ConceptProject = Null<NameConcept>.Get(read[nameof(address.ConceptProject)]);
                    address.ConceptPrevious = Null<NameConcept>.Get(read[nameof(address.ConceptPrevious)]);
                    address.Name = Null<string>.GetNull(read[nameof(address.Name)]);
                    address.CreationDate = Null<string>.GetNull(read[nameof(address.CreationDate)]);
                    address.Disable = Null<bool>.GetNull(read[nameof(address.Disable)]);
                    address.InUse = Null<bool>.GetNull(read[nameof(address.InUse)]);
                    address.EditDate = Null<string>.GetNull(read[nameof(address.EditDate)]);
                    address.Code = Null<string>.GetNull(read[nameof(address.Code)]);
                    address.Value = Null<string>.GetNull(read[nameof(address.Value)]);
                  

                    productList.Add(address);

                }
                catch (Exception ex)
                {

                    throw;
                }
            }
            return productList;
        }



        enum TypeCommand
        {
            Save,
            Update,
            Delete,
            Get,
            GetName,
            GetAll,
            GetAllAdmin,
            GetAllByCompany
        }
    }


}
