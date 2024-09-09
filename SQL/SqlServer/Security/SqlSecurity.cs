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
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using Utility.General;
using static GoTaskServicePlus.Model.Structure.tblCommens;

namespace SQL.SqlServer.Security
{
    public class SqlSecurity : ISqlModelLogin<tblUser>
    {

        private readonly string ConnectionString = "";

        private readonly IConfiguration _Config;



        public SqlSecurity(IConfiguration _Config)
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
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Usuario creado", Id = Guid.NewGuid() } };
                        return obj;
                    }
                }
                else
                {
                    obj.Log =
                        new ErrorCustom
                        {
                            Msg = "Se intento guardar product null",
                            TypeMsg = ErrorCustom.TypeError.Warnig
                        };


                }
            }
            catch (Exception ex)
            {
                obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };
                obj.Log =
                        new ErrorCustom
                        {
                            Msg = $" save poduct  {ex.Message}",
                            TypeMsg = ErrorCustom.TypeError.Warnig
                        };

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
                if (data != null)
                {

                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Save, data, cmd, "UpdateUser");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Usuario creado", Id = Guid.NewGuid() } };

                        return obj;
                    }
                }
                else
                {
                    obj.Log =
                        new ErrorCustom
                        {
                            Msg = "Se intento guardar Usuario null",
                            TypeMsg = ErrorCustom.TypeError.Warnig
                        };
                }
            }
            catch (Exception ex)
            {
                obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };
                obj.Log = new ErrorCustom
                {
                    Msg = $"save user  {ex.Message}",
                    TypeMsg = ErrorCustom.TypeError.Warnig
                };

              
            }





            return obj;

        }

        public async Task<Response<tblUser>> UpdatePassword(tblUser data)
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
                        sqlCommand = await GetSqlCommand(TypeCommand.GetKeyPasword, data, cmd, "UpdatePassword");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Usuario creado", Id = Guid.NewGuid() } };

                        return obj;
                    }
                }
                else
                {
                    obj.Log =
                        new ErrorCustom
                        {
                            Msg = "Se intento guardar Usuario null",
                            TypeMsg = ErrorCustom.TypeError.Warnig
                        };
                }
            }
            catch (Exception ex)
            {
                obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };
                obj.Log = new ErrorCustom
                {
                    Msg = $"save user  {ex.Message}",
                    TypeMsg = ErrorCustom.TypeError.Warnig
                };

               
            }





            return obj;

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
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblUser() { Id = id }, cmd, "GetProductById");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = await GetUser(read);

                    if (itemRead.first != null)
                    {

                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead.first;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom() { Msg = $"{ex.Message.ToString()}" };
                return null;

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
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblUser() { Id = id }, cmd, "DeleteUserById");
                    cmd.Open();

                    obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                    cmd.Close();
                    obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Producto eliminado " } };

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $"Delete User {ex.Message.ToString()}" };
                return obj;

            }
        }

        private async Task<(List<tblUser> list, tblUser first)> GetUser(SqlDataReader read)
        {
            List<tblUser> productList = new List<tblUser>();
            tblUser first = new tblUser();
            ErrorCustom error = new ErrorCustom();

            while (read.Read())
            {
                try
                {
                    var item = new tblUser()
                    {

                        Id = NotNull.GetNoNull(read[nameof(tblUser.Id)]).guid,
                        ConceptCompany = Null<NameConcept>.Get(read[nameof(tblUser.ConceptCompany)]),
                        ConceptProject = Null<NameConcept>.Get(read[nameof(tblUser.ConceptProject)]),
                        ConceptPrevious = Null<NameConcept>.Get(read[nameof(tblUser.ConceptPrevious)]),
                        Name = Null<string>.GetNull(read[nameof(tblUser.Name)]),
                        Code = Null<string>.GetNull(read[nameof(tblUser.Code)]),
                        CreationDate = Null<string>.GetNull(read[nameof(tblUser.CreationDate)]),
                        Disable = NotNull.GetIntToBool(read[nameof(tblUser.Disable)]).value,
                        InUse = NotNull.GetIntToBool(read[nameof(tblUser.InUse)]).value,
                        EditDate = Null<string>.GetNull(read[nameof(tblUser.EditDate)]),
                        Password = Null<string>.GetNull(read[nameof(tblUser.Password)]),
                        KeyPassword = Null<string>.GetNull(read[nameof(tblUser.KeyPassword)]),
                        Email = Null<string>.GetNull(read[nameof(tblUser.Email)]),
                        MobileNumber = Null<string>.GetNull(read[nameof(tblUser.MobileNumber)]),
                        IdCompany = Null<Guid>.GetNull(read[nameof(tblUser.IdCompany)]),
                        IdProject = Null<Guid>.GetNull(read[nameof(tblUser.IdProject)]),
                        RolUser = Null<List<tblRol>>.Get(read[nameof(tblUser.RolUser)])
                      


                    };

                    productList.Add(item);
                }
                catch (Exception ex)
                {
                    error.Msg = $" *GetProductList {ex.Message} ";
                    throw new Exception();
                    throw;
                }
            }
            first = productList.FirstOrDefault();

            return (productList, first);
        }

        private async Task<SqlCommand> GetSqlCommand(TypeCommand typeCommand, tblUser data, SqlConnection cmd, string ProcedureName, int page = 0)
        {
            SqlCommand sqlCommand = new SqlCommand(ProcedureName, cmd);
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            if (typeCommand == TypeCommand.Save || typeCommand == TypeCommand.Update)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IdCompany)}", data.IdCompany);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IdProject)}", data.IdProject);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Id)}", data.Id);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Code)}", data.Code);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ConceptCompany)}", Null<NameConcept>.Set(data.ConceptCompany));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ConceptProject)}", Null<NameConcept>.Set(data.ConceptProject));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ConceptPrevious)}", Null<NameConcept>.Set(data.ConceptPrevious));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Name)}", data.Name.ToUpper());
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.CreationDate)}", data.GetCreationDate);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.EditDate)}", data.GetEditDate);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.InUse)}", data.InUse);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Disable)}", data.Disable);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.MobileNumber)}", data.MobileNumber);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Email)}", data.Email);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.KeyPassword)}", data.KeyPassword);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Password)}", data.Password);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ImgUrl)}",Null<string>.GetNull(data.ImgUrl));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.StatusRegister)}", data.StatusRegister);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.RolUser)}", NotNull.GetRols(data.RolUser).content);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.RolUserActive)}", NotNull.GetRol(data.RolUserActive).content);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ListFavorites)}", Null<List<ConceptProduct>>.Set(data.ListFavorites));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ListMyLikes)}", Null<List<NameConcept>>.Set(data.ListMyLikes));
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.AddressList)}", Null<List<tblConcepValue>>.Set(data.AddressList));


            }

            if (typeCommand == TypeCommand.Disable || typeCommand == TypeCommand.Delete || typeCommand == TypeCommand.Get)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Id)}", data.Id);
            }

            if (typeCommand == TypeCommand.GetMobileNumber )
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Email)}", data.Email);
            }

            if (typeCommand == TypeCommand.GetAll)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Name)}", data.Name);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.ConceptProject)}", Null<NameConcept>.Set(data.ConceptProject));
                sqlCommand.Parameters.AddWithValue($"@page", page);
            }



            if (typeCommand == TypeCommand.GetName)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Id)}", data.Id);
                sqlCommand.Parameters.AddWithValue($"@page", page);
            }

            if (typeCommand == TypeCommand.GetKeyPasword)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Password)}", data.Password);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.KeyPassword)}", data.KeyPassword);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Id)}", data.Id);
              
            }


            if (typeCommand == TypeCommand.Email)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Email)}", data.Email);

            }


            return sqlCommand;
        }

        public async Task<Response<tblUser>> GetByEmail(string email)
        {
            var obj = new Response<tblUser>();
            SqlDataReader read;
            try
            {
                tblUser rol = new tblUser();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Email, new tblUser() { Email = email }, cmd, "GetUserByEmail");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = await GetUser(read);

                    if (itemRead.first != null)
                    {

                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead.first;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom() { Msg = $"{ex.Message.ToString()}" };
                throw new Exception();

            }
        }


        public async Task<Response<tblUser>> GetByMobileNumber(string email)
        {
            var obj = new Response<tblUser>();
            SqlDataReader read;
            try
            {
                tblUser rol = new tblUser();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetMobileNumber, new tblUser() { Email = email }, cmd, "GetUserByMobile");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = await GetUser(read);

                    if (itemRead.first != null)
                    {

                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead.first;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom() { Msg = $"{ex.Message.ToString()}" };
                throw new Exception();

            }
        }



        public async Task<Response<tblUser>> GetByKey(string keyPasword)
        {
            var obj = new Response<tblUser>();
            SqlDataReader read;
            try
            {
                tblUser rol = new tblUser();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetKeyPasword, new tblUser() { KeyPassword = keyPasword }, cmd, "GetUserByKeyPassword");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = await GetUser(read);

                    if (itemRead.first != null)
                    {

                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead.first;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom() { Msg = $"{ex.Message.ToString()}" };
                throw new Exception();

            }
        }

        public Task<Response<tblUser>> Get(ConceptFilter config, string name)
        {
            throw new NotImplementedException();
        }

        private enum TypeCommand
        {
            Get,
            GetKeyPasword,
            GetMobileNumber,
            Delete,
            Save,
            Update,
            UpdateKeyPassword,
            GetAll,
            GetName,
            Disable, Email

        }

    }
}
