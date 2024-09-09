using System.Data;
using Microsoft.ML;
using Microsoft.ML.Data;
using System.Data;
using GoTaskServicePlus.Interfaces.IA;
using GoTaskServicePlus.Model.IA;
using GoTaskServicePlus.Model.Comon;
using Utility.General;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Structure;
using CloudinaryDotNet;
//using GoTaskServicePlus.Model.Comon;

namespace GoTaskServicePlus.IA.SearchProduct
{


    public class PredictionProductName : IPredictionProductName
    {

        public dynamic IaModel { get; set; }

        private IStorageTemp _CacheIA;
        public PredictionProductName(IStorageTemp _CacheIA)
        {

            this._CacheIA = _CacheIA;
        }

        public async Task<List<ChatBot>> Get(string palabra)
        {
            return null;

            //try
            //{

            //    var data = new List<IaDataFilter>();
            //    Microsoft.ML.MLContext mlContext = new Microsoft.ML.MLContext();

            //    data = ChatBotTo(_CacheIA.ListPoductChatBotTemp, "product");
            //    IDataView trainingDataView = mlContext.Data.LoadFromEnumerable(data);

            //    var pipeline = mlContext.Transforms.Text.FeaturizeText("Features", nameof(IaDataFilter.Name))
            //        .Append(mlContext.Transforms.Conversion.MapValueToKey("Name"))
            //        .Append(mlContext.Transforms.NormalizeMinMax("Features"))
            //        .Append(mlContext.Transforms.Concatenate("Features", "Features"))
            //        .Append(mlContext.MulticlassClassification.Trainers.SdcaMaximumEntropy("Name", "Features"))
            //        .Append(mlContext.Transforms.Conversion.MapKeyToValue("PredictedLabel"));


            //    TransformerChain<Microsoft.ML.Transforms.KeyToValueMappingTransformer> modelData = null;

            //    if (IaModel == null)
            //    {
            //        IaModel = pipeline.Fit(trainingDataView);
            //        modelData = IaModel;
            //    }
            //    else
            //    {
            //        modelData = IaModel;
            //    }

            //    var predictionEngine = mlContext.Model.CreatePredictionEngine<IaDataFilter, ProductPrediction>(modelData);

            //    var prediction = predictionEngine.Predict(
            //    new IaDataFilter()
            //    {
            //        Name = palabra.ToLower()
            //    });




            //    var list = new List<ChatBot>();

            //    if (prediction.PredictedCategory != null)
            //    {


            //        var filterRange = _CacheIA.ListPoductChatBotTemp.Where(s => s.Name.ToLower() == prediction.PredictedCategory);

            //        if (filterRange != null && filterRange.Count() > 0)
            //        {
            //            foreach (var item in filterRange)
            //            {
            //                foreach (var itemSplit in item.Name.Split(" "))
            //                {
            //                   var listData =  _CacheIA.ListPoductChatBotTemp.Where(s => s.Name.ToLower().Contains(itemSplit.ToLower()));

            //                    foreach (var existe in listData)
            //                    {

            //                    var exist = list.Where(s => s.Id == existe.Id);
            //                    if (exist == null || exist.Count() <= 0)
            //                        list.Add(new ChatBot { IdProject = existe.IdProject, Name = existe.Code, Id = existe.Id, Score = prediction.Probaility.Max(), IsProduct = true });

            //                    }
            //                }
            //            }
            //        }


            //        if (list != null) list.OrderByDescending(s => s.Price).ToList();

            //    }
            //    else
            //    {
            //        list = new List<ChatBot>();
            //    }

            //    if (prediction.Probaility != null && prediction.Probaility.Max() < Config.ProbabilityLowIA)
            //    {
            //        list.Clear();

            //        list.Add(new ChatBot
            //        {
            //            Name = "",
            //            Value = "Lo siento 😔, actualmente no cotamos con ese producto, ya lo estamos agregando a nuestra lista de pendientes 😉.",
            //            IsProduct = false,
            //            Url = "",
            //            Score = prediction.Probaility.Max()
            //        });

            //    }
            //    else
            //    if (prediction.Probaility != null && prediction.Probaility.Max() < Config.ProbabilityMediunIA)
            //    {
            //        list.Clear();

            //        list.Add(new ChatBot
            //        {
            //            Name = "",
            //            Value = "Sé que intentaste ser claro, pero te pido que seas más específico en tus preguntas. Por ejemplo: 'Quiero comprar un bombillo' 😊",
            //            IsProduct = false,
            //            Url = "",
            //            Score = prediction.Probaility.Max()
            //        });

            //        list.Add(new ChatBot
            //        {
            //            Name = "",
            //            Value = "Pero si lo pienso bien puede pasar que no contemos actualmente con este producto. 😊",
            //            IsProduct = false,
            //            Url = "",
            //            Score = prediction.Probaility.Max()
            //        });

            //    }
            //    else
            //    if (prediction.Probaility.Max() > Config.ProbabilityMediunIA && prediction.Probaility.Max() < Config.ProbabilityMaxIA || prediction.PredictedCategory == null)
            //    {
            //        //list.Clear();

            //        list.Add(new ChatBot
            //        {
            //            Name = "",
            //            Value = "Estoy casi seguro de que es lo que estás buscando, pero tengo mis dudas. 😆",
            //            IsProduct = false,
            //            Url = "",
            //            Score = prediction.Probaility.Max()
            //        });

            //    }
            //    else
            //    if (prediction.Probaility.Max() > Config.ProbabilityMaxIA || prediction.PredictedCategory == null)
            //    {
            //        //list.Clear();

            //        list.Add(new ChatBot
            //        {
            //            Name = "",
            //            Value = "Me alegra poder encontrar lo que  busca. 🙂",
            //            IsProduct = false,
            //            Url = "",
            //            Score = prediction.Probaility.Max()
            //        });

            //    }
            //    if (list.Count <= 1)
            //    {
            //        list.Add(new ChatBot
            //        {
            //            Name = "",
            //            Value = "Mensaje incompleto",
            //            IsProduct = false,
            //            Url = "",
            //            Score = prediction.Probaility.Max()
            //        });

            //    }
            //    return list.Distinct().ToList();

            //}
            //catch (Exception ex)
            //{
            //    return new List<ChatBot>();
            //    throw;
            //}

        }


    


    }

}
