using GoTaskServicePlus.Interfaces.File;
using GoTaskServicePlus.Model.Comon;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;

namespace GoTaskServicePlus.Services.File
{
    public class FileProductUpload : IFileProductUpload
    {
        HttpClient httpClient;
        public string key { get { return "6C7A9FEB3D24E0425A8D8F1BC2E0C375"; } }
        public FileProductUpload() {
        
            this.httpClient = new HttpClient();
           this.httpClient.BaseAddress = new Uri("https://migestion.bsite.net/");
           // this.httpClient.BaseAddress = new Uri("https://localhost:7077/");
        
        }

      public  async Task<bool> UploadProductFile(IFormFile file, string namePC, string namePHONE, string idCompany)
        {


            using (var formData = new MultipartFormDataContent())
            {
                // Lee el contenido del archivo en un array de bytes
                var t = file.OpenReadStream();

                var streamContent = new StreamContent(file.OpenReadStream());
                formData.Add(streamContent, "file", file.Name);
                formData.Add(new StringContent(namePC), "NameFilePC");
                formData.Add(new StringContent(namePHONE), "NameFilePHONE");
                formData.Add(new StringContent(namePHONE), "NameFilePHONE");
                formData.Add(new StringContent(idCompany.ToString()), "idCompany");
                formData.Add(new StringContent(key), "key");


                // Realiza la solicitud POST
                //var  response1 = await httpClient.GetAsync("Get");

                var response = await httpClient.PostAsync("UploadFileWebp", formData);

                // Verifica si la solicitud fue exitosa
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Archivo subido exitosamente.");
                }
                else
                {
                    Console.WriteLine("Error al subir el archivo. Código de estado: " + response.StatusCode);
                }
            }

            return true;    
        }

        public async Task<bool> DeleteFile(string names)
        {

            var content = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(names));
            var response = await httpClient.DeleteAsync($"DeleteFileByUrl?url={names}&key={key}");

            return response.IsSuccessStatusCode;
        }

        public async Task<string> GetFileBase64(string name)
        {           
            var response = await httpClient.GetAsync($"GetBase64?filter={name}&key={key}");
            var content = await response.Content.ReadAsStringAsync();
           var result = Null<string>.GetNull(content);
            return result;
        }
    }
}








