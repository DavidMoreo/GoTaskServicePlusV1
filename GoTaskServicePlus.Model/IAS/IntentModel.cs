using Microsoft.ML.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.IAS
{
    public class IntentDataInput
    {
        [LoadColumn(0)]
        public string Text { get; set; }

        [LoadColumn(1)]
        public string Intent { get; set; }
    }

    public class IntentDataOutput
    {
        [ColumnName("Score")]
        public float[] Score { get; set; }  // Cambiar a un array de floats para manejar el vector

        [ColumnName("PredictedLabel")]
        public string PredictedLabel { get; set; }
    }




    public class MessageData
    {
        public string Text { get; set; }
        public string Intent { get; set; }  // Aquí almacenamos la intención
    }

    // Clase de entrada para ML.NET
    public class MessageDataInput
    {
        [LoadColumn(0)]
        public string Text { get; set; }

        [LoadColumn(1)]
        public string Intent { get; set; }
    }

    // Clase de salida para ML.NET
    public class MessageDataOutput
    {
        [ColumnName("Score")]
        public float[] Score { get; set; }  // Cambiar a un array de floats para manejar el vector

        [ColumnName("PredictedLabel")]
        public string PredictedLabel { get; set; }
    }
}
