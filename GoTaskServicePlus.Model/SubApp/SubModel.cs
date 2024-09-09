using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.SubApp
{
    public class StreamVideo
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public List<List<byte>> StreamDataByteList { get; set; }
        public Stream StreamData { get; set; }
        public int RangeStart { get; set; }
        public int RangeEnd { get; set; }
        public int EndData { get; set; }
        public DateTime Date { get; set; }
 

    }
}
