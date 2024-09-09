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
    public class SqlCRUDCompany : ISqlModelCompany<tblCompany>
    {

        private readonly string ConnectionString = "";

        private readonly IConfiguration _Config;

        public List<tblCompany> ListFilter { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public SqlCRUDCompany(IConfiguration _Config)
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



        public async Task<Response<tblCompany>> Save(tblCompany data)
        {
            var obj = new Response<tblCompany>();

            try
            {
                if (data != null)
                {

                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Save, data, cmd, "SaveCompany");

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

        public async Task<Response<tblCompany>> Update(tblCompany data)
        {
            var obj = new Response<tblCompany>();

            try
            {

                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    cmd.Open();
                    sqlCommand = await GetSqlCommand(TypeCommand.Update, data, cmd, "UpdateCompany");

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


        public async Task<Response<tblCompany>> Get(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblCompany>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblCompany() { Id = id }, cmd, "GetCompanyById");
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

        public async Task<Response<tblCompany>> Get(ConceptFilter config, string name) { 
      
            var obj = new Response<tblCompany>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetName, new tblCompany() { Name = name }, cmd, "GetCompanyByName");
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


        public async Task<Response<List<tblCompany>>> GetFilter()
        {

            var obj = new Response<List<tblCompany>>();
            SqlDataReader read;
            try
            {
                tblCompany company = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    string query = "select id, name, conceptCompany, conceptProject from tblCompany";
                    SqlCommand sqlCommand = new SqlCommand(query, cmd);

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

        public async Task<Response<List<tblCompany>>> GetAll(ConceptFilter config, string filter, int page)
        {
            var obj = new Response<List<tblCompany>>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetAll, new tblCompany() { IdCompany = config.IdCompany ,Name = filter }, cmd, "GetCompanyAll");
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


        public async Task<Response<List<tblCompany>>> GetAllAdmin(ConceptFilter config, string filter, int page)
        {
            var obj = new Response<List<tblCompany>>();
            SqlDataReader read;
            try
            {
                tblCompany rol = new tblCompany();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetAllAdmin, new tblCompany() { IdCompany = config.IdCompany, Name = filter }, cmd, "GetCompanyAllAdmin");
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

        public async Task<Response<tblCompany>> Delete(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblCompany>();

            try
            {

                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Delete, new tblCompany() { Id = id }, cmd, "DeleteCompanyById");
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


        private async Task<SqlCommand> GetSqlCommand(TypeCommand typeCommand, tblCompany company, SqlConnection cmd, string ProcedureName, int page = 0)
        {
            SqlCommand sqlCommand = new SqlCommand(ProcedureName, cmd);
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            if (typeCommand == TypeCommand.Get || typeCommand == TypeCommand.Save || typeCommand == TypeCommand.Update || typeCommand == TypeCommand.Delete)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Id)}", company.Id);
            }

            if (typeCommand == TypeCommand.GetName)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Name)}", company.Name);
            }

            if (typeCommand == TypeCommand.Save || typeCommand == TypeCommand.Update)
            {

                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Code)}", company.Code);
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.ConceptCompany)}", Null<NameConcept>.Set(company.ConceptCompany));
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.ConceptProject)}", Null<NameConcept>.Set(company.ConceptProject));
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.ConceptPrevious)}", Null<NameConcept>.Set(company.ConceptPrevious));
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Name)}", company.Name.ToUpper());
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.CreationDate)}", company.GetCreationDate);
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.EditDate)}", company.GetEditDate);
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Description)}", company.Description);
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Nit)}", company.Nit);
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.TypeCompanyMode)}", company.TypeCompanyMode);

                sqlCommand.Parameters.AddWithValue($"@{nameof(company.Disable)}", company.Disable);

                sqlCommand.Parameters.AddWithValue($"@{nameof(company.InUse)}", company.InUse);


            }

            if (typeCommand == TypeCommand.GetAll)
            {
                sqlCommand.Parameters.AddWithValue($"@filter", company.Name.ToUpper());
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.IdCompany)}", company.IdCompany);
            }

            if (typeCommand == TypeCommand.GetAllAdmin)
            {
                sqlCommand.Parameters.AddWithValue($"@filter", company.Name.ToUpper());
                sqlCommand.Parameters.AddWithValue($"@{nameof(company.IdCompany)}", company.IdCompany);

            }


            return sqlCommand;
        }


        private List<tblCompany> GetList(SqlDataReader read)
        {
            List<tblCompany> productList = new List<tblCompany>();

            while (read.Read())
            {
                try
                {


                    productList.Add(new tblCompany()
                    {

                        Id = NotNull.GetNoNull(read[nameof(tblCompany.Id)]).guid,
                        ConceptCompany = Null<NameConcept>.Get(read[nameof(tblCompany.ConceptCompany)]),
                        ConceptProject = Null<NameConcept>.Get(read[nameof(tblCompany.ConceptProject)]),
                        ConceptPrevious = Null<NameConcept>.Get(read[nameof(tblCompany.ConceptPrevious)]),
                        Nit = Null<string>.GetNull(read[nameof(tblCompany.Nit)]),
                        Name = Null<string>.GetNull(read[nameof(tblCompany.Name)]),
                        CreationDate = Null<string>.GetNull(read[nameof(tblCompany.CreationDate)]),
                        Disable = Null<bool>.GetNull(read[nameof(tblCompany.Disable)]),
                        InUse = NotNull.GetIntToBool(read[nameof(tblCompany.InUse)]).value,
                        EditDate = Null<string>.GetNull(read[nameof(tblCompany.EditDate)]),
                        Code = Null<string>.GetNull(read[nameof(tblCompany.Code)]),
                        Description = Null<string>.GetNull(read[nameof(tblCompany.Description)]),
                        TypeCompanyMode = Null<string>.GetNull(read[nameof(tblCompany.TypeCompanyMode)]),

                    });
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
            GetAllAdmin

        }

    }
}
