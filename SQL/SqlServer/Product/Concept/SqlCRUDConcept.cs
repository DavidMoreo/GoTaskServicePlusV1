using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;

using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;
using static GoTaskServicePlus.Model.Structure.tblCommens;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SQL.SqlServer.Product.Concept
{
    public class SqlCRUDConcept : ISqlModelConcept<tblConcepValue>
    {

        private readonly string ConnectionString = "";
        Response<tblProduct> obj = new Response<tblProduct>();
        private readonly IConfiguration _Config;


        public List<tblConcepValue> ListFilter { get; set; }

        public SqlCRUDConcept(IConfiguration _Config)
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



        public async Task<Response<tblConcepValue>> Delete(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblConcepValue>();


            try
            {
                if (id != Guid.Empty)
                {

                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {

                        cmd.Open();

                        SqlCommand sqlCommand = new SqlCommand("DeleteConcept", cmd);
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue($"@{nameof(id)}", id);


                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Elimi", Id = Guid.NewGuid() } };
                        return obj;
                    }
                }
                else { obj.Log = new ErrorCustom { Msg = "concep null", TypeMsg = ErrorCustom.TypeError.Ecxecption }; }
            }
            catch (Exception ex)
            {


                obj.Msg.Add(System.Text.Json.JsonSerializer.Deserialize<MsgResponse>(ex.Message));
                obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption }; ;

                return obj;

            }


            return obj;

        }

        public async Task<Response<tblConcepValue>> Get(ConceptFilter config, Guid id)
        {

            var obj = new Response<tblConcepValue>();
            obj.Data = new tblConcepValue();

            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    cmd.Open();
                    SqlCommand sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblConcepValue() { IdProject = config.IdProject, Id = id }, cmd, "GetConceptById", 0);
                    sqlCommand.CommandType = CommandType.StoredProcedure;


                    SqlDataReader read;
                    read = await sqlCommand.ExecuteReaderAsync();
                    Guid GuidValue;
                    var resul = GetConcept(read);
                    if(resul != null){
                        obj.Status = true;
                        obj.Data = resul.FirstOrDefault();
                    }
                    return obj;
                }

            }
            catch (Exception ex)
            {


                obj.Msg.Add(System.Text.Json.JsonSerializer.Deserialize<MsgResponse>(ex.Message));
                obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };

                return obj;

            }
        }



        public async Task<Response<tblConcepValue>> Get(ConceptFilter config, string name)
        {

            var obj = new Response<tblConcepValue>();
            obj.Data = new tblConcepValue();


            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    cmd.Open();
                    SqlCommand sqlCommand = await GetSqlCommand(TypeCommand.GetName, new tblConcepValue() { Name = name }, cmd, "GetConceptByName", 0);
                    sqlCommand.CommandType = CommandType.StoredProcedure;


                    SqlDataReader read;
                    read = await sqlCommand.ExecuteReaderAsync();
                    Guid GuidValue;

                    var resul = GetConcept(read);

                    if (resul != null && resul.Count>0)
                    {
                        obj.Data = resul.FirstOrDefault();
                        obj.Status = true;
                    }
                    return obj;
                }

            }
            catch (Exception ex)
            {


                obj.Msg.Add(System.Text.Json.JsonSerializer.Deserialize<MsgResponse>(ex.Message));
                obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };

                return obj;

            }
        }


        public async Task<Response<List<tblConcepValue>>> GetFilter(string filter, Guid type, int page)
        {
            var item = new tblConcepValue();

            var obj = new Response<List<tblConcepValue>>();
            obj.Data = new List<tblConcepValue>();


            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    cmd.Open();

                    SqlCommand sqlCommand = new SqlCommand("GetConceptValueByName", cmd);
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue($"@Filter", filter.ToUpper());
                    sqlCommand.Parameters.AddWithValue($"@{nameof(tblConcepValue.Type)}", type);

                    SqlDataReader read;
                    read = await sqlCommand.ExecuteReaderAsync();
                    Guid GuidValue;
                    try
                    {
                        while (read.Read())
                        {
                            item = new tblConcepValue();

                            item.Id = NotNull.GetNoNull(read[nameof(item.Id)]).guid;
                            item.ConceptCompany = Null<NameConcept>.Get(read[nameof(item.ConceptCompany)]);
                            item.ConceptProject = Null<NameConcept>.Get(read[nameof(item.ConceptProject)]);
                            item.ConceptPrevious = Null<NameConcept>.Get(read[nameof(item.ConceptPrevious)]);



                            item.Name = read.GetString(nameof(item.Name));
                            item.InUse = NotNull.GetIntToBool(read[nameof(item.InUse)]).value;
                            item.Disable = NotNull.GetIntToBool(read[nameof(item.Disable)]).value;
                            item.Type = Null<string>.GetNull(read[nameof(item.Type)]);
                            item.Code = Null<string>.GetNull(read[nameof(item.Code)]);
                            item.Value = Null<string>.GetNull(read[nameof(item.Value)]);
                            item.Concept = NotNull.GetNoNullNameConcept(read[nameof(item.Concept)]).nameConcept;
                            item.CreationDate = Null<string>.GetNull(read[nameof(item.Concept)]);
                            item.EditDate = Null<string>.GetNull(read[nameof(item.Concept)]);


                            obj.Data.Add(item);
                            obj.Status = true;
                        }
                    }
                    catch (Exception ex)
                    {

                        throw;
                    }

                    cmd.Close();
                    if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "producto creado", Id = Guid.NewGuid() } };
                    return obj;
                }

            }
            catch (Exception ex)
            {


                obj.Msg.Add(System.Text.Json.JsonSerializer.Deserialize<MsgResponse>(ex.Message));
                obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };

                return obj;

            }
        }


        public async Task<Response<tblConcepValue>> Save(tblConcepValue data)
        {
            var obj = new Response<tblConcepValue>();


            try
            {
                if (data != null)
                {
                    data.Id = Guid.NewGuid();
                    data.ConceptCompany = new NameConcept { Id = Config.GuidEmpty };
                    data.ConceptProject = new NameConcept { Id = Config.GuidEmpty };
                    data.ConceptPrevious = new NameConcept { Id = Config.GuidEmpty };
                    data.CreationDate = ConfigData.DateConfig.GetDateString();
                    data.EditDate = ConfigData.DateConfig.GetDateString();
                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Save, data, cmd, "SaveConcept");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        obj.Data = data;
                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "producto creado", Id = Guid.NewGuid() } };
                        return obj;
                    }
                }
                else { obj.Log = new ErrorCustom { Msg = $"Save concept null", TypeMsg = ErrorCustom.TypeError.Ecxecption }; }
            }
            catch (Exception ex)
            {
                obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };
                obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };

                return obj;

            }


            obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };

            return obj;

        }

        public async Task<Response<tblConcepValue>> Update(tblConcepValue data)
        {
            var obj = new Response<tblConcepValue>();


            try
            {
                if (data != null)
                {
                  
                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Update, data, cmd, "UpdateConcept");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        obj.Data = data;
                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "concepto  actualizado", Id = Guid.NewGuid() } };
                        return obj;
                    }
                }
                else { obj.Log = new ErrorCustom { Msg = $"Save concept null", TypeMsg = ErrorCustom.TypeError.Ecxecption }; }
            }
            catch (Exception ex)
            {
                obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };
                obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };

                return obj;

            }


            obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };

            return obj;

        }
        private async Task<SqlCommand> GetSqlCommand(TypeCommand mode, tblConcepValue data, SqlConnection cmd, string ProcedureName, int page = 0)
        {
            SqlCommand sqlCommand = new SqlCommand(ProcedureName, cmd);
            sqlCommand.CommandType = CommandType.StoredProcedure;

            if (mode == TypeCommand.Save || mode == TypeCommand.Update)
            {
                
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.Id)}", data.Id);
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.IdCompany)}", data.IdCompany);
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.IdProject)}", data.IdProject);
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.ConceptCompany)}", Null<NameConcept>.Set(data.ConceptCompany));
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.ConceptPrevious)}", Null<NameConcept>.Set(data.ConceptPrevious));
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.ConceptProject)}", Null<NameConcept>.Set(data.ConceptProject));
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.Concept)}", Null<NameConcept>.Set(data.Concept));
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.Name)}", data.Name);
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.CreationDate)}", data.CreationDate);
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.EditDate)}", data.EditDate);
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.Code)}", data.Code);
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.Disable)}", data.Disable);
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.InUse)}", data.InUse);
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.Value)}", data.Value);
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.Type)}", data.Type);
                    sqlCommand.Parameters.AddWithValue($"@{nameof(data.isPublic)}", data.isPublic.ToString().ToLower());                
            }

            if (mode == TypeCommand.Filter || mode == TypeCommand.GetName)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Name)}", data.Name);
            }

            if (mode == TypeCommand.GetAllById)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(tblConcepValue.Name)}", string.Join(",", data.Name));

            }


            if (mode == TypeCommand.GetAllByType)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(tblConcepValue.Type)}", string.Join(",", data.Type));

            }


            if (mode == TypeCommand.Get)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(tblConcepValue.Id)}", data.Id);

            }

          


            if (mode == TypeCommand.GetAllByProject)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(tblConcepValue.IdProject)}", data.IdProject);
                sqlCommand.Parameters.AddWithValue($"@{nameof(tblConcepValue.Name)}", data.Name);
                sqlCommand.Parameters.AddWithValue($"@{nameof(tblConcepValue.Type)}", data.Type);

            }
             if (mode == TypeCommand.GetAllByCompany)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(tblConcepValue.IdCompany)}", data.IdCompany);
                sqlCommand.Parameters.AddWithValue($"@{nameof(tblConcepValue.Name)}", data.Name);
                sqlCommand.Parameters.AddWithValue($"@{nameof(tblConcepValue.Type)}", data.Type);                

            }


            return sqlCommand;
        }


        public async Task<Response<List<tblConcepValue>>> GeConceptListById(List<Guid> idList)
        {


            var obj = new Response<List<tblConcepValue>>();
            obj.Data = new List<tblConcepValue>();


            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    cmd.Open();
                    var idFilter = string.Join(",", idList);
                    SqlCommand sqlCommand = await GetSqlCommand(TypeCommand.GetAllById, new tblConcepValue() { Name = idFilter }, cmd, "GetConceptByIdList", 0);
                    sqlCommand.CommandType = CommandType.StoredProcedure;


                    SqlDataReader read;
                    read = await sqlCommand.ExecuteReaderAsync();
                    Guid GuidValue;

                    if (read.HasRows)
                    {
                        var item = GetConcept(read);
                        obj.Data.AddRange(item);
                        obj.Status = true;

                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = $"Conceptos encontrados{item.Count}", Id = Guid.NewGuid() } };
                        return obj;
                    }
                    return obj;
                }

            }
            catch (Exception ex)
            {


                obj.Msg.Add(System.Text.Json.JsonSerializer.Deserialize<MsgResponse>(ex.Message));
                obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };

                return obj;

            }
        }

        private List<tblConcepValue> GetConcept(SqlDataReader read)
        {
            var list = new List<tblConcepValue>();
            try
            {

                while (read.Read())
                {
                    var item = new tblConcepValue();

                    item.Id = NotNull.GetNoNull(read[nameof(item.Id)]).guid;
                    item.ConceptCompany = Null<NameConcept>.Get(read[nameof(item.ConceptCompany)]);
                    item.ConceptProject = Null<NameConcept>.Get(read[nameof(item.ConceptProject)]);
                    item.ConceptPrevious = Null<NameConcept>.Get(read[nameof(item.ConceptProject)]);



                    item.Name = Null<string>.GetNull(read[nameof(item.Name)]);
                    item.InUse = Null<bool>.GetNull((read[nameof(item.InUse)]));
                    item.Disable = Null<bool>.GetNull(read[nameof(item.Disable)]);
                    item.Type = Null<string>.GetNull(read[nameof(item.Type)]);
                    item.Code = Null<string>.GetNull(read[nameof(item.Code)]);
                    item.Value = Null<string>.GetNull(read[nameof(item.Value)]);
                    item.Concept = Null<NameConcept>.Get(read[nameof(item.Concept)]);
                    item.CreationDate = Null<string>.GetNull(read[nameof(item.CreationDate)]);
                    item.EditDate = Null<string>.GetNull(read[nameof(item.EditDate)]);
                    item.isPublic = Null<bool>.GetNull(read[nameof(item.isPublic)]);
                    list.Add(item);



                }
                return list;
            }
            catch (Exception ex)
            {

                throw;
            }

        }

        private List<tblConcepValue> GetConceptFilter(SqlDataReader read)
        {
            var list = new List<tblConcepValue>();
            try
            {
                while (read.Read())
                {
                    var item = new tblConcepValue();

                    item.Id = NotNull.GetNoNull(read[nameof(item.Id)]).guid;
                    item.Name = Null<string>.GetNull(read.GetString(nameof(item.Name)));
                    item.Type = Null<string>.GetNull(read[nameof(item.Type)]);
                    list.Add(item);



                }
                return list;
            }
            catch (Exception ex)
            {

                throw;
            }

        }
        public async Task<Response<List<tblConcepValue>>> GetConceptNameIA()
        {
            var obj = new Response<List<tblConcepValue>>();
            SqlDataReader read;
            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Disable, new tblConcepValue(), cmd, "GetConceptListFilter");
                    cmd.Open();
                    read = await sqlCommand.ExecuteReaderAsync();

                    var itemRead = GetConceptFilter(read);

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



        public Task<Response<List<tblConcepValue>>> GetListIAData()
        {
            throw new NotImplementedException();
        }

        public async Task<Response<List<tblConcepValue>>> GetAllConceptsByType(string type)
        {
            var obj = new Response<List<tblConcepValue>>();
            SqlDataReader read;
            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetAllByType, new tblConcepValue() { Type = type }, cmd, "GetConceptListFilter");
                    cmd.Open();
                    read = await sqlCommand.ExecuteReaderAsync();

                    var itemRead = GetConceptFilter(read);

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

        public async Task<Response<List<tblConcepValue>>> GetAllConceptValue(ConceptFilter config, string typeConceptValue, string filter)
        {

            var obj = new Response<List<tblConcepValue>>();
            obj.Data = new List<tblConcepValue>();

            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    cmd.Open();
                    SqlCommand sqlCommand = await GetSqlCommand(TypeCommand.GetAllByProject, new tblConcepValue() { Name = filter, IdProject = config.IdProject, Type = typeConceptValue }, cmd, "GetConceptByIdProject", 0);



                    SqlDataReader read;
                    read = await sqlCommand.ExecuteReaderAsync();
                    Guid GuidValue;

                    if (read.HasRows)
                    {
                        var item = GetConcept(read);
                        if (item != null)
                        {
                            obj.Data = item;
                            obj.Status = true;
                            if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = $"Conceptos encontrado", Id = Guid.NewGuid() } };
                        }
                        cmd.Close();

                        return obj;
                    }
                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Msg.Add(System.Text.Json.JsonSerializer.Deserialize<MsgResponse>(ex.Message));
                obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;
            }
        }

      public async Task<Response<List<tblConcepValue>>> GetAllConceptByIdCompany(ConceptFilter config, string typeConceptValue, string filter)
        {

            var obj = new Response<List<tblConcepValue>>();
            obj.Data = new List<tblConcepValue>();

            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    cmd.Open();
                    SqlCommand sqlCommand = await GetSqlCommand(TypeCommand.GetAllByCompany, new tblConcepValue() { Name = filter, IdCompany = config.IdCompany, Type = typeConceptValue }, cmd, "GetAllConceptByIdCompany", 0);



                    SqlDataReader read;
                    read = await sqlCommand.ExecuteReaderAsync();
                    Guid GuidValue;

                    if (read.HasRows)
                    {
                        var item = GetConcept(read);
                        if (item != null)
                        {
                            obj.Data = item;
                            obj.Status = true;
                            if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = $"Conceptos encontrado", Id = Guid.NewGuid() } };
                        }
                        cmd.Close();

                        return obj;
                    }
                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Msg.Add(System.Text.Json.JsonSerializer.Deserialize<MsgResponse>(ex.Message));
                obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;
            }
        }

     
        private enum TypeCommand
        {
            Get,
            Delete,
            Save,
            Update,
            GetAll,
            GetAllByProject,
            GetAllByCompany,
            GetAllByType,
            GetAllById,
            GetName,
            Filter,
            Disable

        }


    }
}
