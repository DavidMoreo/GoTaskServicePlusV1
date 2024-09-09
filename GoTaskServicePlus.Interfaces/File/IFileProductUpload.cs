using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.File
{
    public interface IFileProductUpload
    {

        Task<bool> UploadProductFile(IFormFile file, string namePC, string namePHONE, string idCompany);
        Task<bool> DeleteFile(string name);
        Task<string> GetFileBase64(string name);

    }
}
