using GoTaskServicePlus.Model.SubApp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Services.Interfaces
{
    public interface IDowLoaderVideoInterface
    {
        public List<StreamVideo> ListStreamVideo { get; set; }
        public  Task<List<byte>> ReadStreamToListAsync(Stream stream);



    }
}
