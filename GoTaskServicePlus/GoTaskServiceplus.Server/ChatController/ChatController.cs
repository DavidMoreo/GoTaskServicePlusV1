
using GoTaskServicePlus.Entities.Company;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.Chat;
using GoTaskServicePlus.Interfaces.IA;
using GoTaskServicePlus.Interfaces.Mail;
using GoTaskServicePlus.Interfaces.Product;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.Chats;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.IA;
using GoTaskServicePlus.Model.Security;
using Microsoft.AspNetCore.Mvc;
using Utility.General;

namespace GoTaskServiceplus.Server.CompanyController
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private IJWTAutentication _jwt;
        private IUser _User;
        //private IChatIA _ChatIA;
        private IChat _Chat;
        private IMail _Mail;
        private IClaims _IClaims;
        private IChatUtil _IChatUtil;
        private IChatMsgBotIA _IChatMsgBotIA;
        private readonly IWebHostEnvironment _env;

        private readonly IProducSearch _searchProduct;

        public ChatController(IConfiguration _Config, IWebHostEnvironment env, IChatMsgBotIA _IChatMsgBotIA, IJWTAutentication jwt, IUser _User, IChat Chat, IProducSearch searchProduct, IMail _Mail, IClaims _IClaims, IChatUtil _IChatUtil)
        {
            _env = env;

            this._Config = _Config;
            this._jwt = jwt;
            this._User = _User;
            this._Chat = Chat;
            this._Mail = _Mail;
            this._searchProduct = searchProduct;
            this._IClaims = _IClaims;
            this._IChatUtil = _IChatUtil;
            this._IChatMsgBotIA = _IChatMsgBotIA;


        }

        //Config IA Intent

        [HttpPost("[action]")]
        public async Task<IActionResult> ConfigIaIntentAdd(IntentChat intent)
        {
            var response = new Response<IntentChat>();
            var data = new tblChatBotMsg();
            var newData = new UtilChatBotMsg(intent);
            var key = Autorization();
            try
            {
                if (key != null)
                {
                    var responseChat = await _Chat.Save(newData.chat);
                    var responseData = new UtilChatIntent(responseChat.Data);
                    response.Data = responseData.intent;
                    response.Status = responseChat.Status;
                    response.Msg = responseChat.Msg;
                    response.Pages = responseChat.Pages;
                    response.ErrorPublic = responseChat.ErrorPublic;

                    return Ok(response);

                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor");
            }


        }


        [HttpPost("[action]")]
        public async Task<IActionResult> ConfigIaIntentUpdate(IntentChat intent)
        {
            var response = new Response<IntentChat>();
            var data = new tblChatBotMsg();
            var newData = new UtilChatBotMsg(intent);
            var key = Autorization();
            try
            {
                if (key != null)
                {
                    var responseChat = await _Chat.Update(newData.chat);
                    var responseData = new UtilChatIntent(responseChat.Data);
                    response.Data = responseData.intent;
                    response.Status = responseChat.Status;
                    response.Msg = responseChat.Msg;
                    response.Pages = responseChat.Pages;
                    response.ErrorPublic = responseChat.ErrorPublic;
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }
        }


        [HttpDelete("[action]")]
        public async Task<IActionResult> ConfigIaIntentDelete(Guid id)
        {
            var key = Autorization();
            try
            {
                if (key != null)
                {

                    ConceptFilter config = new ConceptFilter();

                    var response = await _Chat.Delete(config, id);
                    if (response.Status) _Chat.ClearListBdTemp("DeleteChat");
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }

        }



        [HttpGet("[action]")]
        public async Task<IActionResult> GetIaIntentById(Guid id)
        {

            var key = Autorization();
            try
            {
                if (key != null)
                {
                    Response<IntentChat> response = new Response<IntentChat>();
                    try
                    {
                        var config = new ConceptFilter();
                        var responseChat = await _Chat.Get(config, id);
                        var responseData = new UtilChatIntent(responseChat.Data);
                        response.Data = responseData.intent;
                        response.Status = responseChat.Status;
                        response.Msg = responseChat.Msg;
                        response.Pages = responseChat.Pages;
                        response.ErrorPublic = responseChat.ErrorPublic;
                        return Ok(response);
                    }
                    catch (Exception ex)
                    {
                        //RequestLogService<tblProduct>.Save(response);
                        return NotFound();
                    }
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> ConfigIaIntentDisable(CancellationToken cancel, bool disable, Guid id)
        {
            var key = Autorization();
            try
            {
                if (key.Bearer != null)
                {
                    ConceptFilter config = new ConceptFilter();

                    var response = await _Chat.DisableChat(config, false, id);
                    if (response.Status) _Chat.ClearListBdTemp("UpdateChat");
                    if (response.Status)
                        return Ok(response);
                    else return Ok("NO eliminado");
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> ConfigGetAllIntent(int page)
        {
            var response = new Response<List<IntentChat>>();
            var config = new ConceptFilter();
            var key = Autorization();
            try
            {
                if (key != null)
                {
                    var responseChat = await _Chat.GetAllChatIaConfigByType(config);
                    var responseData = new UtilChatIntent(responseChat.Data);
                    response.Data = responseData.intents;
                    response.Status = responseChat.Status;
                    response.Msg = responseChat.Msg;
                    response.Pages = responseChat.Pages;
                    response.ErrorPublic = responseChat.ErrorPublic;
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor");
            }


        }

        // Config IA by Name

        [HttpPost("[action]")]
        public async Task<IActionResult> ConfigIaByNameProductAdd(tblChatBotMsg chat)
        {
            var data = new tblChatBotMsg();
            var newData = new UtilChatBotMsg(chat);
            var key = Autorization();
            try
            {
                if (key != null)
                {
                    var response = await _Chat.Save(newData.chat);
                    if (response.Status) _Chat.ClearListBdTemp("AddChat");
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor");
            }


        }


        [HttpPost("[action]")]
        public async Task<IActionResult> ConfigIaByNameProductUpdate(tblChatBotMsg byName)
        {
            var data = new tblChatBotMsg();
            var newData = new UtilChatBotMsg(byName);
            var key = Autorization();
            try
            {
                if (key != null)
                {
                    var response = await _Chat.Update(newData.chat);
                    if (response.Status) _Chat.ClearListBdTemp("UpdateChat");
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }
        }


        [HttpDelete("[action]")]
        public async Task<IActionResult> ConfigIaByNameProductDelete(Guid id)
        {
            var key = Autorization();
            try
            {
                if (key != null)
                {

                    ConceptFilter config = new ConceptFilter();

                    var response = await _Chat.Delete(config, id);
                    if (response.Status) _Chat.ClearListBdTemp("DeleteChat");
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }

        }


        [HttpPost("[action]")]
        public async Task<IActionResult> ConfigIaByNameProductDisable(CancellationToken cancel, bool disable, Guid id)
        {
            var key = Autorization();
            try
            {
                if (key.Bearer != null)
                {
                    ConceptFilter config = new ConceptFilter();

                    var response = await _Chat.DisableChat(config, false, id);
                    if (response.Status) _Chat.ClearListBdTemp("UpdateChat");
                    if (response.Status)
                        return Ok(response);
                    else return Ok("NO eliminado");
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }
        }


        // Config IA Assistan

        [HttpPost("[action]")]
        public async Task<IActionResult> ConfigIaAssistantAdd(tblChatBotMsg assistan)
        {
            var data = new tblChatBotMsg();
            var newData = new UtilChatBotMsg(assistan);
            var key = Autorization();
            try
            {
                if (key != null)
                {
                    var response = await _Chat.Save(newData.chat);
                    if (response.Status) _Chat.ClearListBdTemp("AddChat");
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor");
            }


        }


        [HttpPost("[action]")]
        public async Task<IActionResult> ConfigIaAssistantUpdate(tblChatBotMsg assistan)
        {
            var data = new tblChatBotMsg();
            var newData = new UtilChatBotMsg(assistan);
            var key = Autorization();
            try
            {
                if (key != null)
                {
                    var response = await _Chat.Update(newData.chat);
                    if (response.Status) _Chat.ClearListBdTemp("UpdateChat");
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }
        }


        [HttpDelete("[action]")]
        public async Task<IActionResult> ConfigIaAssistantDelete(Guid id)
        {
            var key = Autorization();
            try
            {
                if (key != null)
                {

                    ConceptFilter config = new ConceptFilter();

                    var response = await _Chat.Delete(config, id);
                    if (response.Status) _Chat.ClearListBdTemp("DeleteChat");
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }

        }


        [HttpPost("[action]")]
        public async Task<IActionResult> ConfigIaAssistantDisable(CancellationToken cancel, bool disable, Guid id)
        {
            var key = Autorization();
            try
            {
                if (key.Bearer != null)
                {
                    ConceptFilter config = new ConceptFilter();

                    var response = await _Chat.DisableChat(config, false, id);
                    if (response.Status) _Chat.ClearListBdTemp("UpdateChat");
                    if (response.Status)
                        return Ok(response);
                    else return Ok("NO eliminado");
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }
        }







        //Action IA


        [HttpPost("[action]")]
        public async Task<IActionResult> BotQuestion(CancellationToken cancel, ChatBotContext responses)
        {
            ConceptFilter config = new ConceptFilter();
            Response<List<ChatBot>> response = new Response<List<ChatBot>>();
            string responseMsg = "";

            response = await _IChatMsgBotIA.BotQuestion(cancel, responses);

            return Ok(response);

        }







        [HttpGet("[action]")]
        public async Task<IActionResult> GetChatById(Guid id)
        {

            var key = Autorization();
            try
            {
                if (key != null)
                {
                    Response<tblChatBotMsg> response = new Response<tblChatBotMsg>();
                    try
                    {
                        var config = new ConceptFilter();
                        response = await _Chat.Get(config, id);
                        return Ok(response);
                    }
                    catch (Exception ex)
                    {
                        //RequestLogService<tblProduct>.Save(response);
                        return NotFound();
                    }
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllChatByProject(ConceptFilter config, int page = 0)
        {

            Response<List<tblChatBotMsg>> response = new Response<List<tblChatBotMsg>>();

            var key = Autorization();
            try
            {
                if (key.Bearer != null)
                {

                    if (key.IdProject != null)
                    {
                        Guid idProject = Null<Guid>.GetNull(key.IdProject);
                        return Ok(response);

                    }
                    else
                    {
                        return NotFound(response);
                    }


                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception ex)
            {
                //RequestLogService<tblProduct>.Save(response);
                return NotFound();

            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetChatGotask(int page = 0)
        {
            ConceptFilter config = new ConceptFilter();
            Response<List<tblChatBotMsg>> response = new Response<List<tblChatBotMsg>>();


            var autorization = Autorization();

            try
            {
                if (autorization.Bearer != null)
                {
                    //response = await _Chat.GetChatGoTask(config);
                    //response.Data = response.Data.OrderBy(s => s.TypeModelIa).ToList();

                    return Ok("");
                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception ex)
            {
                //RequestLogService<tblProduct>.Save(response);
                return NotFound();

            }
        }


        private AutorizationUser Autorization()
        {
            var autorizationUser = new AutorizationUser();
            var token = HttpContext.Request.Headers.Authorization;
            var dateExpires = Config.GetDateTimeToday().AddMinutes(Config.ExpiresTokenMinute);
            var autorization = _jwt.ValidateExpireJwt(token, dateExpires);
            autorizationUser.IpCutomer = Request.Headers["X-Client-IP"].FirstOrDefault();


            if (autorization.claim != null && autorization.bearer != null)
            {
                var response = _IClaims.GetAutorizationUser(autorization.claim);
                autorizationUser = response;


                autorizationUser.Bearer = autorization.bearer;

            }

            return autorizationUser;
        }


    }




}
