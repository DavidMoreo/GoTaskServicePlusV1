using Microsoft.ML.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.IAS
{

    public class QuestionPairInput
    {
        [LoadColumn(0)]
        public string Question { get; set; }

        [LoadColumn(1)]
        public string Answer { get; set; }

        [LoadColumn(2)]
        public bool Label { get; set; }
    }

    public class QuestionPairOutput
    {
        [ColumnName("PredictedLabel")]
        public string Answer { get; set; }

        public float[] Score { get; set; }  // Puntajes de confianza para cada clase
    }
}
