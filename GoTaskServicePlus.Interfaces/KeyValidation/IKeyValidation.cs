using GoTaskServicePlus.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Services.KeyValidation
{
    public interface IKeyValidation
    {
        public  string KeyCrypt(string palabra, int numero = 10);


        public  string KeyDesCrypt(string palabra, int numero = 10);

        public Task<Response<string>> KeySendAsync(string number);
        public string Encrypt(string plainText, string password);
        public string Decrypt(string cipherText, string password);



    }
}
