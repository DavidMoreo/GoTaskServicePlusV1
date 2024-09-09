using GoTaskServiceplus.Client.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Structure
{
    public class tblPayment : Info
    {
        public string Id { get; set; }
        public int NumberPayment { get; set; }
        public decimal Payment { get; set; }
        public TypePayment TypePayments { get; set; }

        public TypePayment GetTypePayment(string Type) {

            TypePayment TypePaymentValue = TypePayment.Defaul;

            if(Type == TypePayment.CompraCliente.ToString()) TypePaymentValue = TypePayment.CompraCliente;
            if(Type == TypePayment.CompraVendedor.ToString()) TypePaymentValue = TypePayment.CompraVendedor;

            return TypePaymentValue;
        
        }

        public enum TypePayment            
        {
            CompraCliente,
            CompraVendedor,
            Defaul

        }

    }
}
