
using GoTaskServicePlus.Model.SubApp;
using GoTaskServicePlus.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Diagnostics;
using System.IO;
using System;
using System.Security.AccessControl;
using System.Text;
using YoutubeExplode;
using YoutubeExplode.Common;
using YoutubeExplode.Videos.Streams;
using System.IO.Compression;
using System.Security;
using System.Linq;
using GoTaskServicePlus.Interfaces.ExtraDriver;
using GoTaskServicePlus.Model.Structure;
using System.Text.Json;
using System.Net;
using Microsoft.AspNetCore.Http;
using GoTaskServiceplus.Client.Model.Comon;
using AngleSharp.Io;




namespace ControllerExtraDriver
{



    public class ControllerExtra : ControllerBase
    {
       
        public List<string> ListNames { get; set; }
        public string Host { get; set; } = "https://localhost:7192/";
        private HttpClient http { get; set; }
        private YoutubeClient _YoutubeClient { get; set; }
        private string Rootpath { get; set; }
        private readonly IConfiguration _Config;
        private readonly IDowLoaderVideoInterface _IDowLoaderVideoInterface;
        private readonly IHostingEnvironment _env;



        public ControllerExtra(IConfiguration _Config, IDowLoaderVideoInterface _IDowLoaderVideoInterface, IHostingEnvironment _env)
        {
            this._Config = _Config;
            this._IDowLoaderVideoInterface = _IDowLoaderVideoInterface;
            this._env = _env;
            this.Rootpath = _env.WebRootPath;
            LodObj();


        }


        private void LodObj()
        {
            if (_YoutubeClient == null) _YoutubeClient = new YoutubeClient();
            if (ListNames == null) ListNames = new List<string>();

        }




        [HttpGet("[action]")]
        public async Task<IActionResult> DowLoaderVideoPartial(string url, string mode)
        {
            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();
            string directoryPathFile = "";
            var response = new ResponseHttp();

            try
            {


                //byte[] list = Convert.FromBase64String(url);
                //var videoUrl = System.Text.Encoding.UTF8.GetString(list);
                var streamManifest = await _YoutubeClient.Videos.Streams.GetManifestAsync(url);
                //"Audio-only 

                var streamAudio = streamManifest.GetAudioOnlyStreams().FirstOrDefault();



                var streamInfoList = streamManifest.GetMuxedStreams().Where(s => s.VideoQuality.MaxHeight > 144).ToList();
                var streamInfo1 = streamInfoList.FirstOrDefault(o => o.VideoQuality.MaxHeight == 360);
                if (streamInfo1 == null) streamInfo1 = streamInfoList.FirstOrDefault();



                Stream stream = null;

                if (mode == "mp3") stream = await _YoutubeClient.Videos.Streams.GetAsync(streamAudio);
                if (mode == "mp4") stream = await _YoutubeClient.Videos.Streams.GetAsync(streamInfo1);

                Guid id = Guid.NewGuid();

                string name = $"GotaskService_{Guid.NewGuid().ToString().Replace("-", "")}";
                var fileName = $"{name}.{(mode == "mp3" ? streamAudio.Container : streamInfo1.Container)}";

                var mimeType = "video/mp4";
                stopwatch.Stop();
                return File(stream, mimeType, fileName);

            }
            catch (Exception ex)
            {

                return NotFound(null);
            }

            


        }




        [HttpGet("[action]")]
        public async Task<IActionResult> DowLoaderVideo(string url)
        {
            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();
            string directoryPathFile = "";
            try
            {

                var videoUrl = url;
                var streamManifest = await _YoutubeClient.Videos.Streams.GetManifestAsync(videoUrl);

                var streamInfoList = streamManifest.GetMuxedStreams().Where(s => s.VideoQuality.MaxHeight > 144).ToList();
                var streamInfo1 = streamInfoList.FirstOrDefault(o => o.VideoQuality.MaxHeight == 360);
                if (streamInfo1 == null) streamInfo1 = streamInfoList.FirstOrDefault();

                //var streamInfo3 = streamManifest
                //    .GetVideoOnlyStreams()
                //    .Where(s => s.Container == Container.Mp4).OrderBy(o=>o.VideoQuality)
                //    .FirstOrDefault();




                var stream = await _YoutubeClient.Videos.Streams.GetAsync(streamInfo1);

                Guid id = Guid.NewGuid();
                var fileName = $"{url.Split("=")[1].Replace("?", "").Replace("*", "").Replace(" ", "")}.{streamInfo1.Container}";


                string directoryPathFolder = Path.Combine("wwwroot", "Files", "FreeDownload");
                string directoryPath = Path.Combine("wwwroot", "Files", "FreeDownload", DateTime.Today.ToString("dd-MM-yyyy"));

                directoryPathFile = Path.Combine(directoryPath, fileName);

                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

            
               
               


               
                    var mimeType = "application/octet-stream";
                    stopwatch.Stop();
                    return File(stream, mimeType, fileName);
                






            }
            catch (Exception ex)
            {
                return NotFound(null);
                throw;
            }


            return NotFound(null);


        }


        [HttpGet("[action]")]
        public async Task<IActionResult> DowLoaderVideoUrl(string url, string mode)
        {

            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();
            string directoryPathFile = "";
            var response = new ResponseHttp();

            try
            {


                byte[] list = Convert.FromBase64String(url);


                var videoUrl = System.Text.Encoding.UTF8.GetString(list);
                var streamManifest = await _YoutubeClient.Videos.Streams.GetManifestAsync(videoUrl);
                //"Audio-only 

                var streamAudio = streamManifest.GetAudioOnlyStreams().FirstOrDefault();



                var streamInfoList = streamManifest.GetMuxedStreams().Where(s => s.VideoQuality.MaxHeight > 144).ToList();
                var streamInfo1 = streamInfoList.FirstOrDefault(o => o.VideoQuality.MaxHeight == 360);
                if (streamInfo1 == null) streamInfo1 = streamInfoList.FirstOrDefault();



                Stream stream = null;

                if (mode == "mp3") stream = await _YoutubeClient.Videos.Streams.GetAsync(streamAudio);
                if (mode == "mp4") stream = await _YoutubeClient.Videos.Streams.GetAsync(streamInfo1);

                Guid id = Guid.NewGuid();

                string name = $"GotaskService_{Guid.NewGuid().ToString().Replace("-", "")}";
                var fileName = $"{name}.{(mode == "mp3" ? streamAudio.Container : streamInfo1.Container)}";
                var pruba = Path.Combine(Rootpath, fileName);

                string directoryPath = Path.Combine("wwwroot", "Files", "FreeDownload", DateTime.Today.ToString("dd-MM-yyyy"));

                directoryPathFile = Path.Combine(directoryPath, fileName);

                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                List<byte> byteArray = new List<byte>();
                var t = System.IO.File.Exists(directoryPathFile);



                //if (!System.IO.File.Exists(directoryPathFile))
                //{
                //    stopwatch.Start();

                //    using (FileStream writeStream = new(directoryPathFile, FileMode.Create))
                //    {

                //        if (stream != null)
                //        {
                //            int count = 0;
                //            using var readStream = stream;

                //            var bytesRead = 0;
                //            var buffer = new byte[1024 * 1024];

                //            //while ((bytesRead = await readStream.ReadAsync(buffer)) != 0)
                //            //{
                //            //    await writeStream.WriteAsync(buffer, 0, bytesRead);

                //            //    var po = ((decimal)readStream.Position / (decimal)readStream.Length) * 100;
                //            //    count++;
                //            //}
                //        }
                //        else
                //        {

                //        }



                //        stopwatch.Stop();
                //    }

                //}

                if (System.IO.File.Exists(directoryPathFile) || true)
                {

                    response.Status = true;
                    response.Json = JsonSerializer.Serialize(directoryPathFile.Replace("wwwroot", "").Replace("\\", "/"));
                    return Ok(response);
                }


            }
            catch (Exception ex)
            {

                response.Status = false;
                response.Json = "";
                response.Error = ex.Message;
                return Ok(response);
            }

            response.Status = false;
            response.Json = "";
            response.Error = "Error al descargar";
            return Ok(response);

        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetInfoVideo(string url)
        {

            var video = await _YoutubeClient.Videos.GetAsync(url);

            var title = video.Title.Trim();
            var author = video.Author.ChannelTitle;
            var duration = video.Duration;

            var item = new { Title = title, Author = author, Duration = duration };
            var response = new ResponseHttp();
            response.Status = true;
            response.Json = JsonSerializer.Serialize(item);
            return Ok(response);
        }



        [HttpGet("[action]")]
        public async Task<IActionResult> GetStreamAsList(string id, bool restart = false)
        {

            var data = _IDowLoaderVideoInterface.ListStreamVideo.Where(s => s.Id == Guid.Parse(id)).FirstOrDefault();

            var response = new ResponseHttp();
          int rangue    = 100000;

            try
            {

                if (data != null)
                {
                    if (restart)
                    {
                        data.RangeStart = 0;
                        data.RangeEnd = 1;

                    }
              

                    if (data.RangeStart< data.StreamDataByteList.Count)
                    {
                        var dataRange = data.StreamDataByteList.ElementAt(data.RangeStart);
                        data.RangeStart = data.RangeStart + 1;
                      
                                              

                        response.Status = true;
                        response.Json = JsonSerializer.Serialize(new { RangeData = Convert.ToBase64String( dataRange.ToArray()), Error = "", Start = data.RangeStart, End = data.StreamDataByteList.Count });
                        return Ok(response);
                        //new { RangeData = dataRange, Error = "", start = data.RangeStart, End = data.StreamDataByteList.Count };


                    }
                }


            }
            catch (Exception ex)
            {

                response.Status = false;
                response.Error = ex.Message;
                response.Json = JsonSerializer.Serialize(new { RangeData = new byte[0], Error = "", Start = 0, End = data.StreamDataByteList.Count }); ;
                return Ok(response);
                throw;
            }
            response.Status = false;
            
            return Ok(response);

        }

   
             


    }
}
