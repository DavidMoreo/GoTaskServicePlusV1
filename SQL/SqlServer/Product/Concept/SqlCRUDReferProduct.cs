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
    public class SqlCRUDReferProduct : ISqlTblReferProduct<tblReferProduct>
    {

        private readonly string ConnectionString = "";
        Response<tblProduct> obj = new Response<tblProduct>();
        private readonly IConfiguration _Config;
        public List<tblConcepValue> ListFilter { get; set; }

        public SqlCRUDReferProduct(IConfiguration _Config)
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


        public async Task<Response<tblReferProduct>> Get(ConceptFilter config, Guid id)
        {

            var obj = new Response<tblReferProduct>();
            obj.Data = new tblReferProduct();

            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    cmd.Open();
                    SqlCommand sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblReferProduct() { IdProject = config.IdProject, Id = id }, cmd, "GetReferById", 0);
                    sqlCommand.CommandType = CommandType.StoredProcedure;


                    SqlDataReader read;
                    read = await sqlCommand.ExecuteReaderAsync();
                    Guid GuidValue;
                    var resul = ReaderData(read);
                    if (resul != null)
                    {
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

        public Task<Response<tblReferProduct>> Get(ConceptFilter config, string filter)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<List<tblReferProduct>>> GetByName(ConceptFilter config, string filter, int page)
        {

            var obj = new Response<List<tblReferProduct>>();
            obj.Data = new List<tblReferProduct>();

            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    cmd.Open();
                    SqlCommand sqlCommand = await GetSqlCommand(TypeCommand.GetAllByIdProject, new tblReferProduct() { Name = filter, IdProject = config.IdProject }, cmd, "GetAllReferByProjectId", page);

                    SqlDataReader read;
                    read = await sqlCommand.ExecuteReaderAsync();
                    Guid GuidValue;

                    if (read.HasRows)
                    {
                        var item = ReaderData(read);
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

        public async Task<Response<List<tblReferProduct>>> GetAllConceptByCompany(ConceptFilter config)
        {

            var obj = new Response<List<tblReferProduct>>();
            obj.Data = new List<tblReferProduct>();

            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    cmd.Open();
                    SqlCommand sqlCommand = await GetSqlCommand(TypeCommand.GetAllByCompany, new tblReferProduct() { IdCompany = config.IdCompany }, cmd, "GetAllConceptByCompany", 0);

                    SqlDataReader read;
                    read = await sqlCommand.ExecuteReaderAsync();
                    Guid GuidValue;

                    if (read.HasRows)
                    {
                        var item = ReaderData(read);
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


        public async Task<Response<tblReferProduct>> Delete(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblReferProduct>();

            try
            {
                if (id != Guid.Empty)
                {

                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {

                        cmd.Open();

                        SqlCommand sqlCommand = new SqlCommand("DeleteReferById", cmd);
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

        public async Task<Response<tblReferProduct>> Save(tblReferProduct data)
        {
            var obj = new Response<tblReferProduct>();

            try
            {
                if (data != null)
                {
                    data.Id = Guid.NewGuid();
                    data.CreationDate = ConfigData.DateConfig.GetDateString();
                    data.EditDate = ConfigData.DateConfig.GetDateString();
                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Save, data, cmd, "SaveReferProduct");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        obj.Data = data;
                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "refeencia creada", Id = Guid.NewGuid() } };
                        return obj;
                    }
                }
                else { obj.Log = new ErrorCustom { Msg = $"Save concept null", TypeMsg = ErrorCustom.TypeError.Ecxecption }; }
            }
            catch (Exception ex)
            {
                obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo la referencia" } };
                obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };

                return obj;

            }

            obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo" } };

            return obj;

        }
        public async Task<Response<tblReferProduct>> Update(tblReferProduct data)
        {
            var obj = new Response<tblReferProduct>();
            try
            {
                if (data != null)
                {

                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Update, data, cmd, "UpdateReferProduct");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        obj.Data = data;
                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Actualizado", Id = Guid.NewGuid() } };
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

        private async Task<SqlCommand> GetSqlCommand(TypeCommand mode, tblReferProduct data, SqlConnection cmd, string ProcedureName, int page = 0)
        {
            SqlCommand sqlCommand = new SqlCommand(ProcedureName, cmd);
            sqlCommand.CommandType = CommandType.StoredProcedure;

            if (mode == TypeCommand.Save || mode == TypeCommand.Update)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Id)}", data.Id);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IdCompany)}", data.IdCompany);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IdProject)}", data.IdProject);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Name)}", data.Name);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.CreationDate)}", data.CreationDate);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.EditDate)}", data.EditDate);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Code)}", data.Code);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Disable)}", data.Disable);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.InUse)}", data.InUse);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Refer)}", data.Refer);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Quantity)}", data.Quantity);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Price)}", data.Price);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Prices)}", Null<List<Prices>>.Set(data.Prices));
            }


            if (mode == TypeCommand.GetAllByIdProject)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IdProject)}", data.IdProject);
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Name)}", data.Name);
                sqlCommand.Parameters.AddWithValue($"@page", page);
                sqlCommand.Parameters.AddWithValue($"@pageSize", 10);
            }

            if (mode == TypeCommand.Get || mode == TypeCommand.Delete)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.Id)}", data.Id);
            }
            if (mode == TypeCommand.GetAllByCompany)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(data.IdCompany)}", data.IdCompany);
            }

            return sqlCommand;
        }

        private List<tblReferProduct> ReaderData(SqlDataReader read)
        {
            var list = new List<tblReferProduct>();
            try
            {
                while (read.Read())
                {
                    var item = new tblReferProduct();

                    item.Id = NotNull.GetNoNull(read[nameof(item.Id)]).guid;
                    item.Name = Null<string>.GetNull(read[nameof(item.Name)]);
                    item.InUse = Null<bool>.GetNull((read[nameof(item.InUse)]));
                    item.Disable = Null<bool>.GetNull(read[nameof(item.Disable)]);
                    item.Code = Null<string>.GetNull(read[nameof(item.Code)]);
                    item.CreationDate = Null<string>.GetNull(read[nameof(item.CreationDate)]);
                    item.EditDate = Null<string>.GetNull(read[nameof(item.EditDate)]);
                    item.Quantity = Null<int>.GetNull(read[nameof(item.Quantity)]);
                    item.Refer = Null<string>.GetNull(read[nameof(item.Refer)]);
                    item.Prices = Null<List<Prices>>.Get(read[nameof(item.Prices)]);
                    item.Price = Null<decimal>.GetNull(read[nameof(item.Price)]);
                    list.Add(item);
                }
                return list;
            }
            catch (Exception ex)
            {

                throw;
            }

        }



        private enum TypeCommand
        {
            Get,
            Delete,
            Save,
            Update,
            GetAllByIdProject,
            GetAllByCompany,
            Disable
        }


    }
}
