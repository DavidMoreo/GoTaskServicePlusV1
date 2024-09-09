using System.Data;

using System.Data;
using GoTaskServicePlus.Interfaces.IA;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.IA;
using Microsoft.ML;
using GoTaskServicePlus.IA.Bots.Concept;
using GoTaskServicePlus.Model.IAS;


namespace GoTaskServicePlus.IA.SearchProduct
{
    public class ChatIA : IChatIA
    {
        private IPredictionProductName _IPredictionProductName;


        public IPredictionProductName _Search;
        private IStorageTemp _CacheIA;



        public ChatIA(IPredictionProductName _IPredictionProductName, IPredictionProductName _Search, IStorageTemp _CacheIA)
        {

            this._IPredictionProductName = _IPredictionProductName;
            this._Search = _Search;
            this._CacheIA = _CacheIA;
        }




        public async Task<Response<List<ChatBot>>> GetChatProdct(string question)
        {

            //if (_CacheIA.ListMsgChatBotTemp != null)
            //{

            //    Parallel.ForEach(_CacheIA.ListMsgChatBotTemp, (item) =>
            //    {
            //        item.Id = Config.NewGuid;
            //    });

            //}
            try
            {

                //    var obj = new Response<List<ChatBot>>();
                //    Microsoft.ML.MLContext mlContext = new Microsoft.ML.MLContext();

                //    var allData = new List<ChatBot>();


                //    var ListData = ChatBotTo(_CacheIA.ListMsgChatBotTemp);
                //    ListData.AddRange(ChatBotTo(_CacheIA.ListPoductChatBotTemp));

                //    IDataView trainingDataView = mlContext.Data.LoadFromEnumerable(ListData);

                //    var pipeline = mlContext.Transforms.Text.FeaturizeText("Features", nameof(IaDataFilter.Name))
                //          .Append(mlContext.Transforms.Conversion.MapValueToKey("Name"))
                //          .Append(mlContext.Transforms.NormalizeMinMax("Features"))
                //          .Append(mlContext.Transforms.Concatenate("Features", "Features"))
                //          .Append(mlContext.MulticlassClassification.Trainers.SdcaMaximumEntropy("Name", "Features"))
                //          .Append(mlContext.Transforms.Conversion.MapKeyToValue("PredictedLabel"));




                //    TransformerChain<Microsoft.ML.Transforms.KeyToValueMappingTransformer> model = null;

                //    if (IaModel == null)
                //    {
                //        model = pipeline.Fit(trainingDataView);
                //        IaModel = model;
                //    }
                //    else model = IaModel;


                //    IaModel = model;

                //    var predictionEngine = mlContext.Model.CreatePredictionEngine<IaDataFilter, ProductPrediction>(model);


                //    var prueba = new IaDataFilter()
                //    {
                //        Name = question
                //    };

                //    var prediction = predictionEngine.Predict(
                //        prueba
                //       );

                //    List<ChatBot> response = new List<ChatBot>();
                //    ChatBot predictionQuestion = new ChatBot();


                //    predictionQuestion = _CacheIA.ListMsgChatBotTemp.FirstOrDefault(s => s.Name == prediction.PredictedCategory);

                //    if (predictionQuestion == null)
                //        predictionQuestion = _CacheIA.ListPoductChatBotTemp.FirstOrDefault(s => s.Name == prediction.PredictedCategory);

                //    var probaility = prediction.Probaility.Max();


                //    if (prediction.Probaility == null || predictionQuestion == null || prediction.Probaility.Max() < 0.5955724)
                //    {
                //        predictionQuestion.Status = false;
                //    }
                //    else
                //    {
                //        predictionQuestion.Status = true;
                //    }

                //    ChatBot predictionBot = new ChatBot();
                //    var dataItem = await ValidatePrediction(predictionQuestion, prediction.PredictedCategory, question);

                //    if (obj.Data == null) obj.Data = new List<ChatBot>();

                //    if (dataItem != null && dataItem.Count > 0) obj.Data.AddRange(dataItem);


                //    if (obj.Data == null || obj.Data.Count <= 0)
                //    {

                //        if (response == null) response = new List<ChatBot>();
                //        if (obj.Data == null) obj.Data = new List<ChatBot>();

                //        predictionQuestion = new ChatBot
                //        {
                //            Name = "",
                //            Value = "Lo sentimos, no logré entender su comentario. Estamos constantemente mejorando para usted. Si busca un producto en particular, puede intentar escribir solo su nombre. Es posible que en este momento dicho producto no esté disponible en nuestra página, pero seguramente lo estará en el futuro.",
                //            IsProduct = false,
                //            Url = "",
                //            Status = false
                //        };
                //        obj.Data.Add(predictionQuestion);
                //    }





                //    obj.Status = obj.Data != null;
                //    return obj;

            }
            catch (Exception ex)
            {
                return new Response<List<ChatBot>>();
                throw;
            }

            return new Response<List<ChatBot>>();

        }



        private async Task<ChatBotContext> ValidateIntent(string question)
        {
            var temp = new ChatBotContext();   
            var mlContext = new MLContext();

            // Filtrar palabras vacías del mensaje
            var filteredText = string.Join(" ", StopWordsIA.FilterStopWords(question.Split(' ')));

            // Cargar el modelo entrenado
            ITransformer model = mlContext.Model.Load("intentModel.zip", out _);

            // Crear un predictor
            var predictor = mlContext.Model.CreatePredictionEngine<IntentDataInput, IntentDataOutput>(model);

            // Predecir la intención
            var input = new IntentDataInput { Text = filteredText };
            var result = predictor.Predict(input);

             
             temp.intent = result.PredictedLabel;   

            return temp;
        }



      
        public async Task<Response<List<ChatBot>>> BotQuestion(string questionCustomer, ChatBotContext responses)
        {
            var response = new Response<List<ChatBot>>();
            response.Data = new List<ChatBot>();

           var intent = ValidateIntent(responses.question);



            //// Devolver la mejor respuesta encontrada
            //response.Data.Add(new ChatBot
            //{
            //    id = Config.NewGuid,
            //    Question = bestMatchAnswer,
            //    Response = processedResponses[mostSimilarIdx].Question,
            //    PredictionWeight = similarities[mostSimilarIdx]
            //});

            return response;
        }

      

    }






}
