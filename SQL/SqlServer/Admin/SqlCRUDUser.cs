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
using Utility.General;

namespace SQL.SqlServer.Admin
{
    public class SqlCRUDUser : ISqlModelUser<tblUser>
    {

        private readonly string ConnectionString = "";
        public List<tblUser> ListFilter { get; set; }

        private readonly IConfiguration _Config;
        public SqlCRUDUser(IConfiguration _Config)
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


        public async Task<Response<tblUser>> Delete(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblUser>();

            try
            {

                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Delete, new tblUser() { Id = id }, cmd, "DeleteUserById");
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


        public async Task<Response<tblUser>> Get(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblUser>();
            SqlDataReader read;
            try
            {
                tblUser rol = new tblUser();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblUser() { Id = id }, cmd, "GetUserById");
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

        public async Task<Response<List<tblUser>>> GetFilter()
        {
            var obj = new Response<List<tblUser>>();
            SqlDataReader read;
            try
            {
                tblUser rol = new tblUser();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    string query = "select id, name, idCompany, idProject from tblUser";
                    SqlCommand sqlCommand = new SqlCommand(query, cmd);

                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = GetFilterValues(read);

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



        public async Task<Response<List<tblUser>>> GetUserListById(List<Guid> IdProject, int page)
        {
            var obj = new Response<List<tblUser>>();
            SqlDataReader read;
            try
            {
                tblUser rol = new tblUser();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetAllByIdProyect, new tblUser() { ConceptProject = new NameConcept { Name = string.Join(",", IdProject) } }, cmd, "GetUserListById");
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




        public async Task<Response<tblUser>> Save(tblUser data)
        {
            var obj = new Response<tblUser>();

            try
            {
                if (data != null)
                {

                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Save, data, cmd, "SaveUser");

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

        public async Task<Response<tblUser>> Update(tblUser data)
        {
            var obj = new Response<tblUser>();

            try
            {

                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    cmd.Open();
                    sqlCommand = await GetSqlCommand(TypeCommand.Update, data, cmd, "UpdateUser");

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



        private async Task<SqlCommand> GetSqlCommand(TypeCommand typeCommand, tblUser data, SqlConnection cmd, string ProcedureName, int page = 0)
        {
            SqlCommand sqlCommand = new SqlCommand(ProcedureName, cmd);
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            if (typeCommand == TypeCommand.Save || typeCommand == TypeCommand.Update)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Id)}", data.Id);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Code)}", Null<string>.GetNull(data.Code));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ConceptCompany)}", Null<NameConcept>.Set(data.ConceptCompany));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ConceptProject)}", Null<NameConcept>.Set(data.ConceptProject));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ConceptPrevious)}", Null<NameConcept>.Set(data.ConceptPrevious));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Name)}", Null<string>.GetNull(data.Name.ToUpper()));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.CreationDate)}", Null<string>.GetNull(data.GetCreationDate));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.EditDate)}", Null<DateTime>.GetNull(data.GetEditDate));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.InUse)}", Null<bool>.GetNull(data.InUse));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Disable)}", Null<bool>.GetNull(data.Disable));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.MobileNumber)}", Null<string>.GetNull(data.MobileNumber));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Email)}", Null<string>.GetNull(data.Email));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.KeyPassword)}", Null<string>.GetNull(data.KeyPassword));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Password)}", Null<string>.GetNull(data.Password));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ImgUrl)}", Null<string>.GetNull(data.ImgUrl));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.StatusRegister)}", Null<int>.GetNull(data.StatusRegister));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.RolUser)}", NotNull.GetRols(data.RolUser).content);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.RolUserActive)}", Null<tblRol>.Set(data.RolUserActive));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ListFavorites)}", Null<List<ConceptProduct>>.Set(data.ListFavorites));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ListMyLikes)}", Null<List<NameConcept>>.Set(data.ListMyLikes));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.AddressList)}", Null<List<tblConcepValue>>.Set(data.AddressList));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IdCompany)}", Null<string>.GetNull(data.IdCompany));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IdProject)}", Null<string>.GetNull(data.IdProject));


            }

            if (typeCommand == TypeCommand.Delete || typeCommand == TypeCommand.Get)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Id)}", data.Id.ToString().ToUpper());
            }

            if (typeCommand == TypeCommand.GetAllByIdProyect)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Name)}", data.ConceptProject.Name);
            }




            return sqlCommand;
        }



        private List<tblUser> GetList(SqlDataReader read)
        {
            List<tblUser> productList = new List<tblUser>();

            while (read.Read())
            {
                try
                {

                    productList.Add(new tblUser()
                    {

                        Id = Null<Guid>.GetNull(read[nameof(tblUser.Id)]),
                        ConceptCompany = Null<NameConcept>.Get(read[nameof(tblUser.ConceptCompany)]),
                        ConceptProject = Null<NameConcept>.Get(read[nameof(tblUser.ConceptProject)]),
                        ConceptPrevious = Null<NameConcept>.Get(read[nameof(tblUser.ConceptPrevious)]),
                        Name = Null<string>.GetNull(read[nameof(tblUser.Name)]),
                        CreationDate = Null<string>.GetNull(read[nameof(tblUser.CreationDate)]),
                        Disable = Null<bool>.GetNull(read[nameof(tblUser.Disable)]),
                        InUse = Null<bool>.GetNull(read[nameof(tblUser.InUse)]),
                        EditDate = Null<string>.GetNull(read[nameof(tblUser.EditDate)]),
                        Email = Null<string>.GetNull(read[nameof(tblUser.Email)]),
                        AddressList = Null<List<tblConcepValue>>.Get(read[nameof(tblUser.AddressList)]),
                        ListFavorites = Null<List<ConceptProduct>>.Get(read[nameof(tblUser.AddressList)]),
                        Password = Null<string>.GetNull(read[nameof(tblUser.Password)]),
                        StatusRegister = Null<tblUser.TypeStatusRegister>.Get(read[nameof(tblUser.StatusRegister)]),
                        Code = Null<string>.GetNull(read[nameof(tblUser.Code)]),
                        KeyPassword = Null<string>.GetNull(read[nameof(tblUser.KeyPassword)]),
                        ListMyLikes = Null<List<NameConcept>>.Get(read[nameof(tblUser.ListMyLikes)]),
                        IdCompany = Null<Guid>.GetNull(read[nameof(tblUser.IdCompany)]),
                        IdProject = Null<Guid>.GetNull(read[nameof(tblUser.IdProject)]),
                        ImgUrl = Null<string>.GetNull(read[nameof(tblUser.ImgUrl)]),
                        MobileNumber = Null<string>.GetNull(read[nameof(tblUser.MobileNumber)]),
                        RolUser = Null<List<tblRol>>.Get(read[nameof(tblUser.RolUser)]),
                        RolUserActive = Null<tblRol>.Get(read[nameof(tblUser.RolUserActive)])
                    });
                }
                catch (Exception ex)
                {

                    throw;
                }
            }
            return productList;
        }

        private List<tblUser> GetFilterValues(SqlDataReader read)
        {
            List<tblUser> productList = new List<tblUser>();

            while (read.Read())
            {
                try
                {

                    productList.Add(new tblUser()
                    {
                        Id = Null<Guid>.GetNull(read[nameof(tblUser.Id)]),
                        IdCompany = Null<Guid>.GetNull(read[nameof(tblUser.IdCompany)]),
                        IdProject = Null<Guid>.GetNull(read[nameof(tblUser.IdProject)]),
                        Name = Null<string>.GetNull(read[nameof(tblUser.Name)]),

                    });
                }
                catch (Exception ex)
                {

                    throw;
                }
            }
            return productList;
        }

        public Task<Response<tblUser>> Get(ConceptFilter config, string name)
        {
            throw new NotImplementedException();
        }

        public Task<Response<List<tblUser>>> GetAllByIDCompany(ConceptFilter config, int page)
        {
            throw new NotImplementedException();
        }

        enum TypeCommand
        {
            Save,
            Update,
            Delete,
            Get,
            GetAllByIdProyect,
            GetAllByIdCompany


        }
    }


}
