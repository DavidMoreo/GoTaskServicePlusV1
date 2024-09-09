using GoTaskServicePlus.Model.IA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.IA
{
    public interface IPredictionProductName
    {
        public dynamic IaModel { get; set; }    
        public Task<List<ChatBot>> Get(string palabra);
    }
}
