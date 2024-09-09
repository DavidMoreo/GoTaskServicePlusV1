
using GoTaskServicePlus.Model.SubApp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Diagnostics;
using YoutubeExplode.Common;
using GoTaskServicePlus.Model.Structure;
using Utility;





namespace ControllerExtraDriver
{


    public class SpeechToSpeechController : ControllerBase
    {


        private HttpClient http { get; set; }

        private string Rootpath { get; set; }
        private readonly IConfiguration _Config;
        private readonly IHostingEnvironment _env;

        //private readonly ISql _Sql;

        public SpeechToSpeechController(IConfiguration _Config, IHostingEnvironment _env)
        {
            this._Config = _Config;
            this._env = _env;
            this.Rootpath = _env.WebRootPath;
            LodObj();

        }


        private void LodObj()
        {

        }



        [HttpGet("[action]")]
        public async Task<IActionResult> AddLanguageSpeech(LanguageSpeech language)
        {
            SpeechLanguageModel obj = new SpeechLanguageModel();

            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();
            language.Id = Guid.NewGuid();

            var response = new ResponseHttp();

            string name = $"FILE_{language.LanguageModeFrom}_{language.LanguageModeFor}.txt";

            try
            {

                var result = await FileEditAction<SpeechLanguageModel>.ReadFile("Languages", name);
                if (result.status)
                {
                    stopwatch.Start();                   
                    obj = result.obj;
                    if (obj.ListLanguageText == null)
                    {
                        obj.ListLanguageText = new List<LanguageSpeech>();
                    }
                    else
                    {

                    }

                    if (language != null)
                    {
                        int index = obj.ListLanguageText.Count();                       
                        obj.ListLanguageText.Add(language);
                    }
                   


                }
                else
                {
                    if (language != null)
                    {
                        obj.CurrentLevel = "0";
                        obj.Id = Guid.NewGuid();
                        obj.LanguageFrom = language.LanguageFrom;
                        obj.LanguageFor = language.LanguageFor;
                        obj.ListLanguageText = new List<LanguageSpeech> { language };

                    }
                }


                stopwatch.Start();
                var status = await FileEditAction<SpeechLanguageModel>.WriteFile(obj, "Languages", name);
                response.Status = status.status;


                if (response.Status)
                {
                    response.Json = System.Text.Json.JsonSerializer.Serialize(obj);
                    return Ok(response);
                }


            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Json = "";
                response.Error = "Error";
                return Ok(response);
            }

            response.Status = false;
            response.Json = "";
            response.Error = "Error al descargar";
            return Ok(response);

        }



        [HttpGet("[action]")]
        public async Task<IActionResult> GetListLanguageSpeech(string Language)
        {
            SpeechLanguageModel obj = new SpeechLanguageModel();

            Stopwatch stopwatch = new Stopwatch();


            string directoryPathFile = "";
            var response = new ResponseHttp();


            string fileName = $"FILE_{Language}.txt";

            directoryPathFile = Path.Combine("Languages", fileName);


            try
            {

                stopwatch.Start();

                var result = await FileEditAction<SpeechLanguageModel>.ReadFile(directoryPathFile, fileName);
                obj = result.obj;

                response.Status = true;
                response.Json = System.Text.Json.JsonSerializer.Serialize(obj);
                return Ok(response);


            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Json = "";
                response.Error = "Error";
                return Ok(response);
            }



        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetListGroupSpeech(string Language)
        {
            SpeechLanguageModel obj = new SpeechLanguageModel();

            Stopwatch stopwatch = new Stopwatch();


            string directoryPathFile = "";
            var response = new ResponseHttp();


            string fileName = $"FILE_{Language}.txt";

            directoryPathFile = Path.Combine("Languages", fileName);


            try
            {

                stopwatch.Start();

                var result = await FileEditAction<SpeechLanguageModel>.ReadFile(directoryPathFile, fileName);
                obj = result.obj;

                var listGroup = (from l in result.obj.ListLanguageText group l by l.TypeOfSentence).ToList();

                var group = new List<string>();

                if (listGroup != null)
                {
                    foreach (var l in listGroup)
                    {
                        group.Add(l.Key);
                    }
                }

                response.Status = true;
                response.Json = System.Text.Json.JsonSerializer.Serialize(group);
                return Ok(response);




            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Json = "";
                response.Error = "Error";
                return Ok(response);
            }

            response.Status = false;
            response.Json = "";
            response.Error = "Error al descargar";
            return Ok(response);

        }



        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteItemLanguageSpeechById(string Language, Guid id)
        {
            SpeechLanguageModel obj = new SpeechLanguageModel();

            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();


            var response = new ResponseHttp();

            string name = $"FILE_{Language}.txt";



            try
            {

                var result = await FileEditAction<SpeechLanguageModel>.ReadFile("Languages", name);
                if (result.status)
                {
                    stopwatch.Start();

                    obj = result.obj;
                    if (obj.ListLanguageText == null) obj.ListLanguageText = new List<LanguageSpeech>();
                    var item = obj.ListLanguageText.FirstOrDefault(s => s.Id == id);
                    if (item != null) obj.ListLanguageText.Remove(item);

                }


                var status = await FileEditAction<SpeechLanguageModel>.WriteFile(obj, "Languages", name);
                response.Status = status.status;


                if (response.Status)
                {
                    response.Json = System.Text.Json.JsonSerializer.Serialize(obj);
                    return Ok(response);
                }


            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Json = "";
                response.Error = "Error";
                return Ok(response);
            }

            response.Status = false;
            response.Json = "";
            response.Error = "Error al descargar";
            return Ok(response);

        }


        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteLanguageSpeechById(string Language)
        {
            SpeechLanguageModel obj = new SpeechLanguageModel();

            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();


            var response = new ResponseHttp();

            string name = $"FILE_{Language}.txt";



            try
            {

                var result = await FileEditAction<SpeechLanguageModel>.ReadFile("Languages", name);
                if (result.status)
                {
                    response.Status = FileEditAction<SpeechLanguageModel>.DeleteFile("Languages", name).status;
                }



                response.Json = "";

                return Ok(response);



            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Json = "";
                response.Error = "Error";
                return Ok(response);
            }

            response.Status = false;
            response.Json = "";
            response.Error = "Error al descargar";
            return Ok(response);

        }



    }
}
