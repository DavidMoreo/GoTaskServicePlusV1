
using CloudinaryDotNet.Actions;
using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Entities.UtilNameConcepts;
using GoTaskServicePlus.Model.Chats;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;


namespace GoTaskServicePlus.Entities.Company
{
    public class UtilChatIntent :IntentChat
    {
        public IntentChat intent { get; set; }
        public List<IntentChat> intents { get; set; }
        public UtilChatIntent()
        {
            intent = new IntentChat();
        }

        public UtilChatIntent(tblChatBotMsg chatCreate)
        {
            var utilConcept = new UtilNameCancept();
            intent = new IntentChat()
            {
                Name = Null<string>.GetNull(chatCreate.Name),
                Code = Null<string>.GetNull(chatCreate.Code),
                CreationDate = Config.GetDateTodayString(),
                EditDate = Config.GetDateTodayString(),
                InUse = Null<bool>.GetNull(chatCreate.InUse),
                Disable = Null<bool>.GetNull(chatCreate.Disable),
                Confirm = Null<bool>.GetNull(chatCreate.ConfirmData),
                Id = chatCreate.Id,
                IdCompany = GetIdNew(chatCreate.IdCompany),
                IdProject = GetIdNew(chatCreate.IdProject),
                Answer = chatCreate.Answer,
                Intent = chatCreate.Intent,
                Question = chatCreate.QuestionA,


            };
        }


        public UtilChatIntent(List<tblChatBotMsg> chatCreate)
        {
            var utilConcept = new UtilNameCancept();

            intents = (from d in chatCreate
                        select new IntentChat()
                        {
                            Name = Null<string>.GetNull(d.Name),
                            Code = Null<string>.GetNull(d.Code),
                            CreationDate = Config.GetDateTodayString(),
                            EditDate = Config.GetDateTodayString(),
                            InUse = Null<bool>.GetNull(d.InUse),
                            Disable = Null<bool>.GetNull(d.Disable),
                            Confirm = Null<bool>.GetNull(d.ConfirmData),
                            Id = d.Id,
                            IdCompany = GetIdNew(d.IdCompany),
                            IdProject = GetIdNew(d.IdProject),
                            Answer = d.Answer,
                            Intent = d.Intent,
                            Question = d.QuestionA
                        }
                        ).ToList();           


        }



        internal Guid GetIdEmpty(Guid? _id)
        {
            if (_id != null)
            {
                this.Id = _id.Value;
            }
            else
            {
                return Config.GuidEmpty;
            }
            return this.Id;
        }

        internal Guid GetIdNew(Guid? _id)
        {
            if (_id != null)
            {
                this.Id = _id.Value;
            }
            else
            {
                return Config.NewGuid;
            }
            return this.Id;
        }

        internal Guid GetId(Guid? _id)
        {
            if (_id != null)
            {
                this.Id = _id.Value;
            }
            else
            {
                throw new NotImplementedException();
            }
            return this.Id;
        }

        internal Guid GetId(Guid _id)
        {
            if (_id != Config.GuidEmpty)
            {
                this.Id = _id;
            }
            else
            {
                throw new NotImplementedException();
            }
            return this.Id;
        }



    }
}
