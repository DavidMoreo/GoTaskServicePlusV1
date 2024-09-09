using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces.Admin;
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
using System.Xml.Linq;
using Utility.General;

namespace SQL.SqlServer.Admin
{
    public class SqlCRUDRolUser : ISqlModelRolUser<tblRol>
    {

        private readonly string ConnectionString = "";


        private readonly IConfiguration _Config;
        public SqlCRUDRolUser(IConfiguration _Config)
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


        public async Task<Response<tblRol>> Save(tblRol data)
        {
            var obj = new Response<tblRol>();

            try
            {
                if (data != null)
                {
                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Save, data, cmd, "SaveRol");

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

        public async Task<Response<tblRol>> Update(tblRol data)
        {
            var obj = new Response<tblRol>();

            try
            {

                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    cmd.Open();
                    sqlCommand = await GetSqlCommand(TypeCommand.Update, data, cmd, "UpdateRol");
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

        public async Task<Response<tblRol>> Delete(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblRol>();

            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Delete, new tblRol() { Id = id }, cmd, "DeleteRolById");
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

        public async Task<Response<tblRol>> Get(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblRol>();
            SqlDataReader read;
            try
            {
                tblRol rol = new tblRol();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblRol() { Id = id }, cmd, "GetRolById");
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

        public async Task<Response<List<tblRol>>> GetByRol(ConceptFilter config)
        {
            var obj = new Response<List<tblRol>>();
            SqlDataReader read;
            try
            {
                tblRol rol = new tblRol();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetRolByRol, new tblRol() {  IsAdmin =config.IsAdmin ,IsCustomer = config.IsCustomer, IsMaker = config.IsMaker , IsVendor = config.IsVendor }, cmd, "GetByRol");
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

        public async Task<Response<tblRol>> Get(ConceptFilter config, string name)
        {
            var obj = new Response<tblRol>();
            SqlDataReader read;
            try
            {
                tblRol rol = new tblRol();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblRol() { Name = name }, cmd, "GetUserByName");
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

    
        public async Task<Response<List<tblRol>>> GetAllByProject(ConceptFilter config,  int page, string filter)
        {
            var obj = new Response<List<tblRol>>();
            SqlDataReader read;
            try
            {
                tblRol rol = new tblRol();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetAllByIdProyect, new tblRol() { Name = filter }, cmd, "GetRolByProject");
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

        public async Task<Response<List<tblRol>>> GetAllByCompany(ConceptFilter config, string filter, int page)
        {
            var obj = new Response<List<tblRol>>();
            SqlDataReader read;
            try
            {
                tblRol rol = new tblRol();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblRol() { Name = filter }, cmd, "GetUserByName");
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


        private async Task<SqlCommand> GetSqlCommand(TypeCommand typeCommand, tblRol data, SqlConnection cmd, string ProcedureName, int page = 0)
        {
            SqlCommand sqlCommand = new SqlCommand(ProcedureName, cmd);
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            if (typeCommand == TypeCommand.Save || typeCommand == TypeCommand.Update)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Id)}", data.Id);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IdCompany)}", data.IdCompany);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IdProject)}", data.IdProject);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Code)}", Null<string>.GetNull(data.Code));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ConceptCompany)}", Null<NameConcept>.Set(data.ConceptCompany));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ConceptProject)}", Null<NameConcept>.Set(data.ConceptProject));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ConceptPrevious)}", Null<NameConcept>.Set(data.ConceptPrevious));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Name)}", Null<string>.GetNull(data.Name.ToUpper()));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.CreationDate)}", Null<string>.GetNull(data.GetCreationDate));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.EditDate)}", Null<DateTime>.GetNull(data.GetEditDate));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.InUse)}", Null<bool>.GetNull(data.InUse));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Disable)}", Null<bool>.GetNull(data.Disable));               
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.isPublic)}", Null<bool>.GetNull(data.isPublic));               
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.PermissionByRoll)}", Null<Permission>.Set(data.PermissionByRoll));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IsCustomer)}", Null<bool>.GetNull(data.IsCustomer));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IsVendor)}", Null<bool>.GetNull(data.IsVendor));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IsMaker)}", Null<bool>.GetNull(data.IsMaker));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IsAdmin)}", Null<bool>.GetNull(data.IsAdmin));


            }

            if (typeCommand == TypeCommand.Delete || typeCommand == TypeCommand.Get)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Id)}", data.Id.ToString().ToUpper());
            }

            if (typeCommand == TypeCommand.GetAllByIdProyect)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IdProject)}", data.IdProject);
            }

            if (typeCommand == TypeCommand.GetRolByRol)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IsCustomer)}", data.IsCustomer.ToString());
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IsMaker)}", data.IsMaker.ToString());
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IsVendor)}", data.IsVendor.ToString());
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IsAdmin)}", data.IsAdmin.ToString());

            }




            return sqlCommand;
        }



        private List<tblRol> GetList(SqlDataReader read)
        {
            List<tblRol> productList = new List<tblRol>();

            while (read.Read())
            {
                try
                {

                    productList.Add(new tblRol()
                    {

                        Id = Null<Guid>.GetNull(read[nameof(tblRol.Id)]),
                        ConceptCompany = Null<NameConcept>.Get(read[nameof(tblRol.ConceptCompany)]),
                        ConceptProject = Null<NameConcept>.Get(read[nameof(tblRol.ConceptProject)]),
                        ConceptPrevious = Null<NameConcept>.Get(read[nameof(tblRol.ConceptPrevious)]),
                        Name = Null<string>.GetNull(read[nameof(tblRol.Name)]),
                        CreationDate = Null<string>.GetNull(read[nameof(tblRol.CreationDate)]),
                        Disable = Null<bool>.GetNull(read[nameof(tblRol.Disable)]),
                        InUse = Null<bool>.GetNull(read[nameof(tblRol.InUse)]),
                        EditDate = Null<string>.GetNull(read[nameof(tblRol.EditDate)]),
                   
                        Code = Null<string>.GetNull(read[nameof(tblRol.Code)]),
                      
                        IdCompany = Null<Guid>.GetNull(read[nameof(tblRol.IdCompany)]),
                        IdProject = Null<Guid>.GetNull(read[nameof(tblRol.IdProject)]),
                        isPublic = Null<bool>.GetNull(read[nameof(tblRol.isPublic)]),
                        IsCustomer = Null<bool>.GetNull(read[nameof(tblRol.IsCustomer)]),
                        IsVendor = Null<bool>.GetNull(read[nameof(tblRol.IsVendor)]),
                        IsMaker = Null<bool>.GetNull(read[nameof(tblRol.IsMaker)]),
                        IsAdmin = Null<bool>.GetNull(read[nameof(tblRol.IsAdmin)]),
                        PermissionByRoll = Null<Permission>.Get(read[nameof(tblRol.PermissionByRoll)])
                        
                      
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
            GetRolByRol,
            GetAllByIdProyect,
            GetAllByIdCompany


        }
    }


}
