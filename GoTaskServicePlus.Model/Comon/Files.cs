using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static GoTaskServiceplus.Client.Model.Comon.ImgItem;

namespace GoTaskServicePlus.Model.Comon
{
    public class FilesInfo
    {
        public string NameFilePC { get; set; }
        public string NameFilePHONE { get; set; }
        public Guid idCompany { get; set; }      
        public string key { get; set; }
        public TypeDbImg TypeImgDb { get; set; }


    }
}
