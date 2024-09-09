using GoTaskServicePlus.Interfaces.Notification;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;
using System.Security.Cryptography;



namespace GoTaskServicePlus.Services.KeyValidation
{
    public class KeyValidationService : IKeyValidation
    {

        private INotification _INotification;


        private static readonly int KeySize = 256;
        private static readonly int BlockSize = 128;


        public KeyValidationService(INotification _INotification)
        {
            this._INotification = _INotification;
        }

        public  string KeyCrypt(string palabra, int numero = 10)
        {
            char[] caracteres = palabra.ToCharArray();
            for (int i = 0; i < caracteres.Length; i++)
            {
                caracteres[i] = (char)(caracteres[i] + numero);
            }
            return new string(caracteres);
        }

        public  string KeyDesCrypt(string palabra, int numero = 10)
        {
            char[] caracteres = palabra.ToCharArray();
            for (int i = 0; i < caracteres.Length; i++)
            {
                caracteres[i] = (char)(caracteres[i] - numero);
            }
            return new string(caracteres);
        }

        public async Task<Response<string>> KeySendAsync(string number)
        {
            var response = new Response<string>();  
            var code = Config.NewGuid.ToString().Split("-")[1];


            var notify = new NotificationModel();
            notify.PhoneNumber = number;

            var aditional = new AditionalText();
            aditional.Name = "Asunto";
            aditional.Value = "Somos Go Task Service : https://gotaskservice.com/";
            notify.Aditional.Add(aditional);

            aditional = new AditionalText();
            aditional.Name = "msg";
            aditional.Value = "Tu código de verificación";
            notify.Aditional.Add(aditional);

            aditional = new AditionalText();
            aditional.Name = "code";
            aditional.Value = code.ToUpper();
            notify.Aditional.Add(aditional);
            notify.Msg = $"";

            if (notify.Link == null) notify.Link = new List<string>();

            await _INotification.SaveNotification(notify);
            response.Data = code;
            response.Status = true;
            return response;
        }









        // Generar una clave derivada de una contraseña proporcionada por el usuario
        private  byte[] GenerateKey(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                return sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }


        private  byte[] GenerateIV()
        {
            byte[] iv = new byte[BlockSize / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(iv);
            }
            return iv;
        }

        // Cifrar un texto
        public  string Encrypt(string plainText, string password)
        {
            if (string.IsNullOrEmpty(plainText))
                throw new ArgumentException("El texto plano no puede estar vacío.");
            if (string.IsNullOrEmpty(password))
                throw new ArgumentException("La clave no puede estar vacía.");

            byte[] key = GenerateKey(password);
            byte[] iv = GenerateIV();

            using (var aes = Aes.Create())
            {
                aes.Key = key;
                aes.IV = iv;
                aes.Mode = CipherMode.CBC;
                aes.Padding = PaddingMode.PKCS7;

                using (var encryptor = aes.CreateEncryptor(aes.Key, aes.IV))
                using (var ms = new MemoryStream())
                {
                    using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                    using (var sw = new StreamWriter(cs))
                    {
                        sw.Write(plainText);
                    }

                    byte[] encryptedBytes = ms.ToArray();

                    // Concatenar IV con el texto cifrado
                    byte[] result = new byte[iv.Length + encryptedBytes.Length];
                    Buffer.BlockCopy(iv, 0, result, 0, iv.Length);
                    Buffer.BlockCopy(encryptedBytes, 0, result, iv.Length, encryptedBytes.Length);

                    return Convert.ToBase64String(result);
                }
            }
        }

        // Descifrar un texto
        public  string Decrypt(string cipherText, string password)
        {
            if (string.IsNullOrEmpty(cipherText))
                throw new ArgumentException("El texto cifrado no puede estar vacío.");
            if (string.IsNullOrEmpty(password))
                throw new ArgumentException("La clave no puede estar vacía.");

            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            byte[] iv = new byte[BlockSize / 8];
            byte[] encryptedBytes = new byte[cipherBytes.Length - iv.Length];

            Buffer.BlockCopy(cipherBytes, 0, iv, 0, iv.Length);
            Buffer.BlockCopy(cipherBytes, iv.Length, encryptedBytes, 0, encryptedBytes.Length);

            byte[] key = GenerateKey(password);

            using (var aes = Aes.Create())
            {
                aes.Key = key;
                aes.IV = iv;
                aes.Mode = CipherMode.CBC;
                aes.Padding = PaddingMode.PKCS7;

                using (var decryptor = aes.CreateDecryptor(aes.Key, aes.IV))
                using (var ms = new MemoryStream(encryptedBytes))
                using (var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                using (var sr = new StreamReader(cs))
                {
                    try
                    {
                       return sr.ReadToEnd() ;

                    }
                    catch (Exception)
                    {

                        return "";
                    }
                }
            }
        }












        }
}
