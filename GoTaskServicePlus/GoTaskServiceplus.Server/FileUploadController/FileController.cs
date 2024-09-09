using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Interfaces.Product;
using GoTaskServicePlus.Interfaces.Products;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using Microsoft.AspNetCore.Mvc;
using Utility.General;
using System.Drawing;
using System.IO;
using static System.Net.WebRequestMethods;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;
using System.Drawing.Imaging;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Interfaces.Admin;
using JWT;

using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Webp;
using System.IO.Pipes;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Model.Security;
using GoTaskServicePlus.Interfaces.File;
using System.ComponentModel.Design;
using SendGrid;
using System.IO;
using EllipticCurve.Utils;
using CloudinaryDotNet.Actions;

namespace GoTaskServicePlus.GoTaskServiceplus.Server.FileUpload
{
    public class FileController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private readonly IHostingEnvironment hosting;
        private readonly IProductService _CrudService;
        private readonly IJWTAutentication _jwt;
        private readonly IClaims _IClaims;
        private readonly IFileProductUpload _File;
        public FileController(IHostingEnvironment hosting, IProductService _CrudService, IJWTAutentication _jwt, IClaims _IClaims, IFileProductUpload _File)
        {
            this.hosting = hosting;
            this._CrudService = _CrudService;
            this._jwt = _jwt;
            this._IClaims = _IClaims;
            this._File = _File;
        }




        [Route("UploadFileWebp")]
        [HttpPost]
        public async Task<IActionResult> UploadFileWebp([FromForm] IFormFile file, FilesInfo info)
        {
            var response = new Response<ImgItem>();
            var imgName = new ImgItem();
            string rootpath = hosting.WebRootPath;




            var token = HttpContext.Request.Headers.Authorization;
            var dateExpires = Config.GetDateTimeToday().AddMinutes(Config.ExpiresTokenMinute);
            var autorization = _jwt.ValidateExpireJwt(token, dateExpires);

            var projectId = autorization.claim.FirstOrDefault(s => s.Type == "IdProject");
            var comoanyId = autorization.claim.FirstOrDefault(s => s.Type == "IdCompany");
            Guid idProject = Guid.Empty;
            Guid idCompany = Guid.Empty;
            if (projectId != null)
            {
                idProject = Null<Guid>.GetNull(projectId.Value);
                idCompany = Null<Guid>.GetNull(comoanyId.Value);

            }






            string fileTemp = Path.GetTempFileName();
            string extemsion = Path.GetExtension(file.FileName);
            Guid id1 = Config.NewGuid;
            string idName1 = id1.ToString().Replace("-", "");
            Guid id2 = Config.NewGuid;


            var IMG = new ImgItem()
            {
                ConceptProject = new NameConcept(),
                ConceptCompany = new NameConcept(),
                ConceptPrevious = new NameConcept(),
                IdProject = idProject,
                IdCompany = idCompany,
                InUse = false,
                Disable = false,
                Code = "",
                CreationDate = Config.GetDateTodayString(),
                EditDate = Config.GetDateTodayString(),
                NameVisible = info.NameFilePC,
                TypeImgDb = info.TypeImgDb
            };

            var PC = ClonJson<ImgItem>.Clon(IMG);
            PC.url = $"{info.NameFilePC.ToString().Trim().Replace(" ", "-").Replace("  ", " ").Replace("   ", " ").ToUpper()}_PC_{idName1}.webp";
            PC.Id = id1;
            PC.NameVisible = info.NameFilePC;
            PC.Name = info.NameFilePC;

            var PHONE = ClonJson<ImgItem>.Clon(IMG);
            PHONE.url = $"{info.NameFilePC.ToString().Trim().Replace(" ", "-").Replace("  ", " ").Replace("   ", " ").ToUpper()}_PHONE_{idName1}.webp";
            PHONE.Id = id2;
            PHONE.NameVisible = info.NameFilePC;
            PHONE.Name = info.NameFilePC;


            //Api Interna
            await WriteImgAsync(rootpath, file, idCompany, PC, PHONE);

            //api EXTERNA
            //var result =  await _File.UploadProductFile(file, PC.url ,PHONE.url, comoanyId.Value);




            response.Status = true;
            response.Data = PC;

            return Ok(response);
        }


        [Route("DeleteFile")]
        [HttpDelete]
        public async Task<IActionResult> DeleteFile([FromBody] List<string> names)
        {
            var response = new ResponseHttp();
            string rootpath = hosting.WebRootPath;


            string folderSelectedTo = "product";

            string folder = Path.Combine(rootpath, "Files");

            string folderRouteTo = Path.Combine(folder, folderSelectedTo);

            //Api Externa
            //var result = await _File.DeleteFile(names);


            if (!Directory.Exists(folder))
            {
                return Ok("No existe");
            }

            if (!Directory.Exists(folderRouteTo))
            {
                return Ok("No existe");
            }


            try
            {

                string[] archivos = Directory.GetFiles(folderRouteTo, "*", SearchOption.AllDirectories);

                foreach (string archivo in archivos)
                {
                    System.IO.File.Delete(rootpath + archivo);
                }


            }
            catch (Exception ex)
            {
                response.Error = "Error al eliminar archivo";
                return Ok(response);
                throw;
            }

            return Ok("ok");
        }


        [Route("DeleteFileByUrl")]
        [HttpDelete]
        public async Task<IActionResult> DeleteFileByUrl(string url, string idProduct)
        {
            var response = new ResponseHttp();
            response.Status = true;
            string rootpath = hosting.WebRootPath;

            var token = HttpContext.Request.Headers.Authorization;
            var dateExpires = Config.GetDateTimeToday().AddMinutes(Config.ExpiresTokenMinute);
            var autorization = _jwt.ValidateExpireJwt(token, dateExpires);

            var projectId = autorization.claim.FirstOrDefault(s => s.Type == "IdProject");
            var comoanyId = autorization.claim.FirstOrDefault(s => s.Type == "IdCompany");
            Guid idProject = Guid.Empty;
            Guid idCompany = Guid.Empty;
            if (projectId != null)
            {
                idProject = Null<Guid>.GetNull(projectId.Value);
                idCompany = Null<Guid>.GetNull(comoanyId.Value);

            }


            string folderSelectedTo = "product";

            string folder = Path.Combine(rootpath, "Files");

            string folderRouteTo = Path.Combine(folder, folderSelectedTo);


            if (!Directory.Exists(folder))
            {
                return Ok(response);
            }

            if (!Directory.Exists(folderRouteTo))
            {
                return Ok(response);
            }


            try
            {

                ConceptFilter config = new ConceptFilter();
                var deleteImage = false;

                var image = await _CrudService.GetImgByUrl(config, url);

                if (image.Data != null && image.Data.ReferUse != null)
                {

                    var exist = image.Data.ReferUse.FirstOrDefault(s => s.ToLower().Trim() == idProduct.ToLower());
                    if (exist != null)
                    {
                        image.Data.ReferUse.Remove(exist);
                        var statusUpate = await _CrudService.UpdateByUrl(config, image.Data);
                        response.Status = statusUpate.Status;
                    }
                }

                if (image.Data != null && response.Status && (image.Data.ReferUse == null || image.Data.ReferUse.Count <= 0))
                {
                    deleteImage = true;
                }




                if (deleteImage && (folderRouteTo != null))
                {
                    string[] archivos = Directory.GetFiles(folderRouteTo, "*", SearchOption.AllDirectories);
                    foreach (string archivo in archivos)
                    {
                        string file = Path.Combine(folderRouteTo, url);

                        if (file == archivo)
                        {

                            if (System.IO.File.Exists(archivo))
                            {

                                System.IO.File.Delete(archivo);
                                if (archivo.Contains("PC"))
                                    System.IO.File.Delete(archivo.Replace("PC", "PHONE"));
                                if (archivo.Contains("PHONE"))
                                    System.IO.File.Delete(archivo.Replace("PHONE", "PC"));
                            }

                            if (System.IO.File.Exists(archivo))
                            {
                                response.Status = false;
                            }

                        }
                    }

                }




            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Error = "Error al eliminar archivo";
                return Ok(response);

            }

            //Api Externa
            // var result = await _File.DeleteFile(url);
            //response.Status = result;
            return Ok(response);
        }



        [Route("GetFileBase64")]
        [HttpGet]
        public async Task<IActionResult> GetFileBase64(string name)
        {
            var response = new Response<string>();
            //var result =     await _File.GetFileBase64(name);
            var result = GetBase64Local(name);
            response.Data = result;
            return Ok(response);
        }


        #region ImgLocal

        private async Task<Response<ImgItem>> WriteImgAsync(string rootpath, IFormFile file, Guid idCompany, ImgItem PC, ImgItem PHONE)
        {
            var response = new Response<ImgItem>();

            #region Writeimgae

            string folderSelected = "";
            folderSelected = "Product";


            string Files = Path.Combine(rootpath, "Files");
            string folderProduct = Path.Combine(Files, "Product");
            string folderRouteCompany = Path.Combine(Files, folderProduct);
            string folderRoute = Path.Combine(folderProduct, idCompany.ToString().Replace("-", ""));


            if (!Directory.Exists(Files))
            {
                var mode = Directory.CreateDirectory(Files);
            }

            if (!Directory.Exists(folderRouteCompany))
            {
                var mode = Directory.CreateDirectory(folderRouteCompany);
            }

            if (!Directory.Exists(folderRoute))
            {
                var mode = Directory.CreateDirectory(folderRoute);
            }

            string filePC = Path.Combine(folderRoute, PC.url);
            string filePHONE = Path.Combine(folderRoute, PHONE.url);


            try
            {
                if (folderSelected != string.Empty)
                {
                    // Crear una instancia de ImageSharp para cargar la imagen
                    using (var image = SixLabors.ImageSharp.Image.Load(file.OpenReadStream()))
                    {
                        // Convertir la imagen a formato WebP
                        using (var outputStream = new MemoryStream())
                        {
                            image.SaveAsWebp(outputStream);


                            var encoder = new WebpEncoder()
                            {
                                Quality = 80

                            };
                            image.Mutate(x => x.Resize(new SixLabors.ImageSharp.Size(355, 325)));

                            // Guardar la imagen modificada

                            var exist = System.IO.File.Exists(filePC);
                            if (!exist) image.Save(filePC, encoder);
                            //image.Save(filePHONE);
                        }
                    }

                    // Crear una instancia de ImageSharp para cargar la imagen
                    using (var image = SixLabors.ImageSharp.Image.Load(file.OpenReadStream()))
                    {
                        // Convertir la imagen a formato WebP
                        using (var outputStream = new MemoryStream())
                        {
                            image.SaveAsWebp(outputStream);

                            var encoder = new WebpEncoder()
                            {
                                Quality = 100

                            };
                            image.Mutate(x => x.Resize(new SixLabors.ImageSharp.Size(145, 145)));

                            var exist = System.IO.File.Exists(filePHONE);
                            if (!exist) image.Save(filePHONE, encoder);
                        }
                    }

                }
                var list = new List<ImgItem>();
                //list.Add(PHONE);
                list.Add(PC);
                await _CrudService.SaveNameImg(list);

            }
            catch (Exception ex)
            {
                //response.Error = "Error al subir archivo";    
            }

            return response;
            #endregion Write imagen
        }

        public string GetBase64Local(string filter)
        {
            var response = new Response<string>();

            string urlName = "";

            response.Data = "";
            string rootpath = hosting.WebRootPath;

            string folderSelectedTo = "product";

            string folder = Path.Combine(rootpath, "Files");

            string folderRouteTo = Path.Combine(folder, folderSelectedTo);


            if (!Directory.Exists(folder))
            {
                return "";
            }

            if (!Directory.Exists(folderRouteTo))
            {
                return "";
            }


            try
            {

                string[] archivos = Directory.GetFiles(folderRouteTo, "*", SearchOption.AllDirectories);

                foreach (string archivo in archivos)
                {

                    string url = GetRou(archivo).url;
                    string name = GetRou(archivo).name;
                    var item = new ImgItem();
                    item.Name = name;
                    item.url = url;
                    if (filter == name)
                    {
                        urlName = archivo;
                    }

                }


            }
            catch (Exception ex)
            {
                //response.Error = "Error al eliminar archivo";
                return "";
                throw;
            }

            byte[] fileBytes = System.IO.File.ReadAllBytes(urlName);
            string base64String = Convert.ToBase64String(fileBytes);

            response.Data = base64String;
            return base64String;


        }

        public (string name, string url) GetRou(string archivo)
        {
            int count = archivo.Split("wwwroot").Length;
            int countName = archivo.Split("\\").Length;
            string url = archivo.Split("wwwroot")[count - 1].Replace("//", "/");
            string name = archivo.Split("\\")[countName - 1].Replace("//", "/");

            return (name, url);
        }



        #endregion ImgLocal






        #region web
        private byte[] ResizeImage2(byte[] originalImageBytes, int maxWidth, int maxHeight)
        {
            using (var originalStream = new MemoryStream(originalImageBytes))
            {
                using (var originalImage = System.Drawing.Image.FromStream(originalStream))
                {
                    // Calcula la nueva escala basada en el máximo ancho y alto permitido
                    var ratioX = (double)maxWidth / originalImage.Width;
                    var ratioY = (double)maxHeight / originalImage.Height;
                    var ratio = Math.Min(ratioX, ratioY);

                    var newWidth = (int)(originalImage.Width * ratio);
                    var newHeight = (int)(originalImage.Height * ratio);

                    // Crea un nuevo bitmap con las nuevas dimensiones
                    using (var resizedImage = new Bitmap(newWidth, newHeight))
                    {
                        using (var graphics = Graphics.FromImage(resizedImage))
                        {
                            // Configura la calidad de interpolación
                            graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                            graphics.DrawImage(originalImage, 0, 0, newWidth, newHeight);
                        }

                        // Guarda la imagen en un MemoryStream con su formato original
                        using (var memoryStream = new MemoryStream())
                        {
                            // Encuentra el formato de imagen adecuado
                            var imageFormat = GetImageFormat(originalImage.RawFormat);
                            // Guarda la imagen en el formato adecuado
                            resizedImage.Save(memoryStream, imageFormat);
                            // Devuelve los bytes de la imagen redimensionada
                            return memoryStream.ToArray();
                        }
                    }
                }
            }
        }

        private ImageFormat GetImageFormat(ImageFormat rawFormat)
        {
            // Devuelve el formato de imagen correspondiente al formato original
            if (rawFormat.Equals(ImageFormat.Jpeg))
                return ImageFormat.Jpeg;
            else if (rawFormat.Equals(ImageFormat.Png))
                return ImageFormat.Png;
            else if (rawFormat.Equals(ImageFormat.Gif))
                return ImageFormat.Gif;
            else if (rawFormat.Equals(ImageFormat.Bmp))
                return ImageFormat.Bmp;
            else if (rawFormat.Equals(ImageFormat.Tiff))
                return ImageFormat.Tiff;
            else
                return ImageFormat.Jpeg; // Por defecto, se devuelve JPEG si el formato es desconocido
        }

        #endregion web

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
