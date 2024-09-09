using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Entities;
using GoTaskServicePlus.Entities.Company;
using GoTaskServicePlus.Entities.UtilNameConcepts;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Chats;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.IA;
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

namespace SQL.SqlServer.Chat
{
    public class SqlCRUDChat : ISqlModelChat<tblChatBotMsg>
    {

        private readonly string ConnectionString = "";

        private readonly IConfiguration _Config;


        public SqlCRUDChat(IConfiguration _Config)
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

        public List<tblUser> ListFilter { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public async Task<Response<tblChatBotMsg>> Delete(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblChatBotMsg>();

            try
            {

                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Delete, new tblChatBotMsg() { Id = id }, cmd, "DeleteChatBotMsgById");
                    cmd.Open();

                    obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                    cmd.Close();
                    obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "ChatBotMsg eliminado " } };

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }

        public async Task<Response<tblChatBotMsg>> Get(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblChatBotMsg>();
            SqlDataReader read;
            try
            {
                tblProduct rol = new tblProduct();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblChatBotMsg() { Id = id }, cmd, "GetChatBotById");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = await GetChatsModel(read);

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

        public async Task<Response<tblChatBotMsg>> Get(ConceptFilter config, string name)
        {
            var obj = new Response<tblChatBotMsg>();
            SqlDataReader read;
            try
            {
                tblProduct rol = new tblProduct();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetByQuestion, new tblChatBotMsg() { Name = name }, cmd, "GetChatConfigByQuestion");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = await GetChatsModel(read);

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

        public Task<Response<List<tblChatBotMsg>>> GetChatByUser(ConceptFilter config, Guid id, DateTime dateStart, DateTime dateEnd, int page)
        {
            throw new NotImplementedException();
        }

        public Task<Response<List<tblChatBotMsg>>> GetFilterMsg(ConceptFilter config, string filter, DateTime dateStart, DateTime dateEnd, int page)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<tblChatBotMsg>> Save(tblChatBotMsg data)
        {


            var obj = new Response<tblChatBotMsg>();

            try
            {
                if (data != null)
                {

                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Save, data, cmd, "SaveChatBot");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "chat creado", Id = Guid.NewGuid() } };
                        if (obj.Status) obj.Data = data;
                        return obj;
                    }
                }
                else { obj.Log = new ErrorCustom { Msg = "Save chat null", TypeMsg = ErrorCustom.TypeError.Warnig }; }
            }
            catch (Exception ex)
            {
                obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el chat" } };
                obj.Log = new ErrorCustom { Msg = $" save chat  {ex.Message}", TypeMsg = ErrorCustom.TypeError.Warnig };

                return obj;

            }


            obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };


            return obj;


        }

        public async Task<Response<tblChatBotMsg>> Update(tblChatBotMsg data)
        {

            var obj = new Response<tblChatBotMsg>();

            try
            {
                if (data != null)
                {

                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Update, data, cmd, "UpdateChatBotMsg");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "chat creado", Id = Guid.NewGuid() } };
                        if (obj.Status) obj.Data = data;
                        return obj;
                    }
                }
                else { obj.Log = new ErrorCustom { Msg = "Save chat null", TypeMsg = ErrorCustom.TypeError.Warnig }; }
            }
            catch (Exception ex)
            {
                obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el chat" } };
                obj.Log = new ErrorCustom { Msg = $" save chat  {ex.Message}", TypeMsg = ErrorCustom.TypeError.Warnig };

                return obj;

            }


            obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };


            return obj;
        }


        public async Task<Response<List<ChatBot>>> GetChatGotask(ConceptFilter config)
        {
            var obj = new Response<List<ChatBot>>();
            SqlDataReader read;
            try
            {
                tblProduct rol = new tblProduct();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetAllGoTask, new tblChatBotMsg() { IdCompany = config.IdCompany }, cmd, "GetChatGotask");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = await GetChatsBot(read);

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


        public async Task<Response<List<tblChatBotMsg>>> GetAllChatIaConfigByType(ConceptFilter config)
        {
            var obj = new Response<List<tblChatBotMsg>>();
            SqlDataReader read;
            try
            {
                tblProduct rol = new tblProduct();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetAllGoTask, new tblChatBotMsg() { IdCompany = config.IdCompany }, cmd, "GetChatGotask");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = await GetChatsModel(read);

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





        private enum TypeCommand
        {
            Save,
            Update,
            Delete,
            Get,
            GetAllGoTask,
            GetByQuestion,
            Disable

        }





        private async Task<SqlCommand> GetSqlCommand(TypeCommand typeCommand, tblChatBotMsg product, SqlConnection cmd, string ProcedureName, int page = 0)
        {
            SqlCommand sqlCommand = new SqlCommand(ProcedureName, cmd);
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            if (typeCommand == TypeCommand.Save || typeCommand == TypeCommand.Update)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.IdCompany)}",product.IdCompany);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.IdProject)}", product.IdProject);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Id)}", product.Id);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Code)}", product.Code);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Name)}", Null<string>.GetNull(product.Name).ToUpper());               
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.CreationDate)}", product.GetCreationDate);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.EditDate)}", product.GetEditDate);               
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.QuestionA)}", product.QuestionA);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.QuestionB)}", product.QuestionB);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Answer)}", product.Answer);              
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Intent)}", product.Intent);              
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.ConfirmData)}", product.ConfirmData);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Disable)}", product.Disable);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.InUse)}", product.InUse);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.TypeModelIa)}", product.TypeModelIa);

            }

            if (typeCommand == TypeCommand.GetAllGoTask)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.IdCompany)}", product.IdCompany);
            }
            if (typeCommand == TypeCommand.GetByQuestion)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Name)}", product.Name);
            }
            if (typeCommand == TypeCommand.Delete)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Id)}", product.Id);
            }
            if (typeCommand == TypeCommand.Get)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Id)}", product.Id);
            }

            return sqlCommand;
        }


        private async Task<List<tblChatBotMsg>> GetChatsModel(SqlDataReader read)
        {
            List<tblChatBotMsg> productList = new List<tblChatBotMsg>();

            while (read.Read())
            {
                try
                {


                    var chat = new tblChatBotMsg();
                    chat.Id = Null<Guid>.GetNull(read[nameof(chat.Id)]);
                   
                    chat.Name = Null<string>.GetNull(read[nameof(chat.Name)]);

                    chat.Code = Null<string>.GetNull(read[nameof(chat.Code)]);

                    chat.CreationDate = Null<string>.GetNull(read[nameof(chat.CreationDate)]);

                    chat.Disable = Null<bool>.GetNull(read[nameof(chat.Disable)]);
                    chat.InUse = Null<bool>.GetNull(read[nameof(chat.InUse)]);                  

                    chat.EditDate = Null<string>.GetNull(read[nameof(chat.EditDate)]);
                    chat.IdCompany = Null<Guid>.GetNull(read[nameof(chat.IdCompany)]);
                    chat.IdProject = Null<Guid>.GetNull(read[nameof(chat.IdProject)]);
                   
                    chat.QuestionB = Null<string>.GetNull(read[nameof(chat.QuestionB)]);
                    chat.QuestionA = Null<string>.GetNull(read[nameof(chat.QuestionA)]);
                    chat.Answer = Null<string>.GetNull(read[nameof(chat.Answer)]);
                    chat.TypeModelIa = Null<string>.GetNull(read[nameof(chat.TypeModelIa)]);
                    chat.ConfirmData = Null<bool>.GetNull(read[nameof(chat.ConfirmData)]);
                    chat.Intent = Null<string>.GetNull(read[nameof(chat.Intent)]);
                    chat.TypeModelIa = Null<string>.GetNull(read[nameof(chat.TypeModelIa)]);

                    productList.Add(chat);



                }
                catch (Exception ex)
                {

                    throw;
                }
            }
            return productList;
        }


        private async Task<List<ChatBot>> GetChatsBot(SqlDataReader read)
        {
            List<ChatBot> productList = new List<ChatBot>();

            while (read.Read())
            {
                try
                {


                    var chat = new tblChatBotMsg();
                    chat.Id = Null<Guid>.GetNull(read[nameof(chat.Id)]);
                    chat.ConceptCompany = Null<NameConcept>.Get(read[nameof(chat.ConceptProject)]);
                    chat.ConceptProject = Null<NameConcept>.Get(read[nameof(chat.ConceptProject)]);
                    chat.ConceptPrevious = Null<NameConcept>.Get(read[nameof(chat.ConceptPrevious)]);
                    chat.Name = Null<string>.GetNull(read[nameof(chat.Name)]);
                    chat.Code = Null<string>.GetNull(read[nameof(chat.Code)]);
                    chat.CreationDate = Null<string>.GetNull(read[nameof(chat.CreationDate)]);
                    chat.Disable = Null<bool>.GetNull(read[nameof(chat.Disable)]);
                    chat.InUse = Null<bool>.GetNull(read[nameof(chat.InUse)]);
                    chat.EditDate = Null<string>.GetNull(read[nameof(chat.EditDate)]);
                    chat.IdCompany = Null<Guid>.GetNull(read[nameof(chat.IdCompany)]);
                    chat.IdProject = Null<Guid>.GetNull(read[nameof(chat.IdProject)]);
                    chat.Answer = Null<string>.GetNull(read[nameof(chat.Answer)]);
                    chat.QuestionB = Null<string>.GetNull(read[nameof(chat.QuestionB)]);
                  
                    chat.TypeModelIa = Null<string>.GetNull(read[nameof(chat.TypeModelIa)]);

                    //var chat1 = new ChatBot()
                    //{
                    //    Name = chat.Question,
                    //    Value = chat.Response,
                    //    Id = Config.NewGuid,
                    //    IdCompany = chat.IdCompany,
                    //    IdProject = chat.IdProject,
                    //    Type = chat.TypeQuestion
                    //};
                    //productList.Add(chat1);



                }
                catch (Exception ex)
                {

                    throw;
                }
            }
            return productList;
        }



    }
}
