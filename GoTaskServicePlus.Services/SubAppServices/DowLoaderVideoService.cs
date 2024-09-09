using GoTaskServicePlus.Model.SubApp;
using GoTaskServicePlus.Services.Interfaces;
using Microsoft.ML.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Services.SubAppServices
{
    public class DowLoaderVideoService : IDowLoaderVideoInterface
    {
        public List<StreamVideo> ListStreamVideo { get; set; } 

        public async Task<List<byte>> ReadStreamToListAsync(Stream stream)
        {
         
            List<byte> list = new List<byte>();


            using (var memoryStream = new MemoryStream())
            {
                await stream.CopyToAsync(memoryStream);
                return memoryStream.ToArray().ToList();
            }
        }

        public DowLoaderVideoService()
        {
            ListStreamVideo = new List<StreamVideo>();
        }

    }
}
