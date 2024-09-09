using Microsoft.ML.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.IAS
{
    public class ProductInput
    {
        [LoadColumn(0)]
        public string Name { get; set; }
    }

    public class ProductPrediction
    {
        [ColumnName("Score")]
        public float Score { get; set; }

        [ColumnName("Name")]
        public string Name { get; set; }
    }
}
