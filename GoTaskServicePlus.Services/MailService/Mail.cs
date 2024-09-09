using GoTaskServicePlus.Interfaces.Mail;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Services.MailService
{
    public class Mail : IMail
    {
        private static string CodeSenGridMiCompra = "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";
        private static string CodeSenGrid = "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";



        public static async Task<string> SenrMail(string Msg, string EmailSender, string EmailDestiny, string MailSubject)
        {
            string apiKey = CodeSenGrid;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(EmailSender);
            var subject = MailSubject;
            var to = new EmailAddress(EmailDestiny);
            var plainTextContent = "";
            var htmlContent = Msg;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            var response = await client.SendEmailAsync(msg);
            return response.IsSuccessStatusCode.ToString();
        }
        public  async Task<Response<string>> SenrMail(MailContent mail)
        {
            var obj = new Response<string>();
            mail.EmailTo = "micompramef@gmail.com";
            mail.EmailFrom = "webmigestion@gmail.com" ;

            string apiKey = CodeSenGridMiCompra;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(mail.EmailFrom, "GoTaskService.com");
            var subject = mail.Subject;
            var Destiny = new EmailAddress(mail.EmailTo);
            var plainTextContent = "";
            var htmlContent = mail.Msg;
            var msg = MailHelper.CreateSingleEmail(from, Destiny, subject, plainTextContent, htmlContent);

            var response = await client.SendEmailAsync(msg);
            obj.Data =  response.IsSuccessStatusCode.ToString();
            return obj;
        }

    }
}
