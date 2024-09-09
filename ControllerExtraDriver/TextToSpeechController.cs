using GoTaskServicePlus.Model.Structure;
using iText.Kernel.Pdf.Canvas.Parser.Listener;
using iText.Kernel.Pdf.Canvas.Parser;
using iText.Kernel.Pdf;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using GoTaskServicePlus.Interfaces.ExtraDriver;
using System.Text.Json;

namespace GoTaskServicePlus.GoTaskServiceplus.Server.UtilController
{

    [ApiController]
    [Route("[controller]")]
    public class TextToSpeechController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private readonly IExtraDriverInterface _ExtraService;
       // private readonly ISqlSub _Sql;

        public TextToSpeechController(IConfiguration _Config, IExtraDriverInterface _ExtraService)
        {
            this._Config = _Config;
            this._ExtraService = _ExtraService;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> ReadFile(IFormFile file)
        {
            string value = "";
            using (var pdfReader = new PdfReader(file.OpenReadStream()))
            using (var pdfDocument = new PdfDocument(pdfReader))
            {
                for (int pageNum = 1; pageNum <= pdfDocument.GetNumberOfPages(); pageNum++)
                {
                  
                    var page = pdfDocument.GetPage(pageNum);
                    var strategy = new SimpleTextExtractionStrategy();
                    var pageText = PdfTextExtractor.GetTextFromPage(page);

                    value += pageText;//_ExtraService.ClanText(pageText);
                }
            }
            var response = new ResponseHttp();
            var data = value;



            response.Json =  data;
            return Ok(response);
        }


    }

}
