using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.UtilInterfaces;
using GoTaskServicePlus.Model.BD.SqlServer;
using GoTaskServicePlus.Model.Structure;
using iText.Layout.Element;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;

namespace GoTaskServiceplus.Server.CompanyController
{
    [ApiController]
    [Route("[controller]")]
    public class UtilyContoller : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
       
        private readonly IQuestionIA _Question;
       

        public UtilyContoller(IConfiguration _Config, IQuestionIA _Question)
        {
            this._Config = _Config;
           
            this._Question = _Question;
         
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> QuestionIa( string question, string TextContext)
        {

            _Question.GetQuestion(question, TextContext);
            return Ok("IA");
        }




    }
}
