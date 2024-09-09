using System.Data;
using Microsoft.ML;
using Microsoft.ML.Data;
using System.Data;
using GoTaskServicePlus.Interfaces.IA;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.IA;
using Utility.General;
using System.Reflection.Emit;
using System.Collections.Generic;
using GoTaskServicePlus.IA.Bots.Concept;
using GoTaskServicePlus.Model.IAS;
using Microsoft.AspNetCore.Hosting;
using static System.Formats.Asn1.AsnWriter;
using static Microsoft.AspNetCore.Hosting.Internal.HostingApplication;

namespace GoTaskServicePlus.IA.SearchProduct
{
    public class ChatBotIA : IChatMsgBotIA
    {
        private IPredictionProductName _IPredictionProductName;


        public IPredictionProductName _Search;
        public IChatMsgBotIA _IChatMsgBotIA;
        private readonly Microsoft.AspNetCore.Hosting.IHostingEnvironment _env;


        public ChatBotIA(IPredictionProductName _IPredictionProductName, IHostingEnvironment _env, IPredictionProductName _Search)
        {

            this._IPredictionProductName = _IPredictionProductName;
            this._Search = _Search;
            this._env = _env;


        }




        //Validar intención
        private async Task<ChatBotContext> ValidateIntent(string question)
        {
            var temp = new ChatBotContext();
            var mlContext = new MLContext();

            try
            {

                // Filtrar palabras vacías del mensaje
                var filteredText = string.Join(" ", StopWordsIA.FilterStopWords(question.Split(' ')));

                // Cargar el modelo entrenado
                ITransformer model = mlContext.Model.Load(_env.WebRootPath + "/Model IA/intentModel.zip", out _);

                // Crear un predictor
                var predictor = mlContext.Model.CreatePredictionEngine<IntentDataInput, IntentDataOutput>(model);

                // Predecir la intención
                var input = new IntentDataInput { Text = filteredText };
                var result = predictor.Predict(input);


                temp.intent = result.PredictedLabel;
                temp.intentScore = result.Score.Max(); ;
            }
            catch (Exception ex)
            {

                throw;
            }
            return temp;
        }

        //Preguntas generales 
        private async Task<Response<List<ChatBot>>> BotGeneralQuestions(string question)
        {

            var response = new Response<List<ChatBot>>();
            response.Data = new List<ChatBot>();
           var data  = new ChatBot();


            var mlContext = new MLContext();

            // Filtrar palabras vacías de la pregunta
            var filteredQuestion = string.Join(" ", StopWordsIA.FilterStopWords(question.Split(' ')));

            // Cargar el modelo entrenado
            var model = mlContext.Model.Load(_env.WebRootPath + "/Model IA/questionAnswerModel.zip", out var schema);

            // Crear un predictor
            var predictor = mlContext.Model.CreatePredictionEngine<QuestionPairInput, QuestionPairOutput>(model);

            // Predecir la respuesta
            var input = new QuestionPairInput { Question = filteredQuestion };
            var result = predictor.Predict(input);

            // Obtener el puntaje más alto y su índice
            var maxScore = result.Score.Max();
            var predictedAnswer = result.Answer;

            data.Question = question;
            data.PredictionWeight = maxScore;
            data.Response =predictedAnswer;

            response.Data.Add(data);    

            return response;
        }


        public async  Task<Response<List<ChatBot>>> PreditProductByName(string question)
        {
            var chat = new ChatBot();
            var DataResponse = new Response<List<ChatBot>>();
           
            var mlContext = new MLContext();

            // Filtrar palabras vacías de la pregunta
            var filteredQuestion = string.Join(" ", StopWordsIA.FilterStopWords(question.Split(' ')));

            // Cargar el modelo entrenado
            var model = mlContext.Model.Load(_env.WebRootPath + "/Model IA/ProductByName.zip", out var schema);

            // Crear un predictor
            var predictor = mlContext.Model.CreatePredictionEngine<QuestionPairInput, QuestionPairOutput>(model);

            // Predecir la respuesta
            var input = new QuestionPairInput { Question = filteredQuestion };
            var result = predictor.Predict(input);

            // Obtener el puntaje más alto y su índice
            var maxScore = result.Score.Max();
            var predictedAnswer = result.Answer;

            chat.Question = question;
            chat.PredictionWeight = maxScore;
            chat.Response = predictedAnswer; 
            var ListChat = new List<ChatBot>();
            ListChat.Add(chat);
            DataResponse.Data = ListChat;

            return DataResponse;
            
        }

        // Método para calcular la similitud (puede ser ajustado)
        private static float CalculateSimilarity(string input, string productName)
        {
            var inputWords = input.Split(' ');
            var productWords = productName.Split(' ');
            var commonWordsCount = inputWords.Intersect(productWords).Count();
            return commonWordsCount / (float)inputWords.Length;
        }




        public async Task<Response<List<ChatBot>>> BotQuestion(CancellationToken cancel, ChatBotContext responses)
        {
            var response = new Response<List<ChatBot>>();
            response.Data = new List<ChatBot>();

            var intent = await ValidateIntent(responses.question);
           
            if (IntentName.Comment == intent.intent)
            {
               response = await  BotGeneralQuestions(responses.question);
            }

            if (IntentName.Product == intent.intent)
            {
                response = await PreditProductByName(responses.question);
            }

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
