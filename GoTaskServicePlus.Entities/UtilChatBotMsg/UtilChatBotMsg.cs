
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
    public class UtilChatBotMsg : tblUser
    {
        public tblChatBotMsg chat { get; set; }
        public UtilChatBotMsg()
        {
            chat = new tblChatBotMsg();
        }

        public UtilChatBotMsg(tblChatBotMsg chatCreate)
        {
            var utilConcept = new UtilNameCancept();
            chat = new tblChatBotMsg()
            {
                Name = Null<string>.GetNull(chatCreate.Name),
                Code = Null<string>.GetNull(chatCreate.Code),
                ConceptCompany = Null<NameConcept>.GetNull(utilConcept.Concept),
                ConceptPrevious = Null<NameConcept>.Get(utilConcept.Concept),
                ConceptProject = Null<NameConcept>.Get(utilConcept.Concept),
                CreationDate = Config.GetDateTodayString(),
                EditDate = Config.GetDateTodayString(),
                InUse = Null<bool>.GetNull(chatCreate.InUse),
                Disable = Null<bool>.GetNull(chatCreate.Disable),
                Id = Config.NewGuid,
                IdCompany = GetIdNew(chatCreate.IdCompany),
                IdProject = GetIdNew(chatCreate.IdProject),
                ConfirmData = Null<bool>.GetNull(chatCreate.ConfirmData),
                QuestionA = chatCreate.QuestionA,
                QuestionB = chatCreate.QuestionB,
                Answer = chatCreate.Answer,
                TypeModelIa = chatCreate.TypeModelIa

            };
        }


        public UtilChatBotMsg(IntentChat intent)
        {
            var utilConcept = new UtilNameCancept();
            chat = new tblChatBotMsg()
            {
                Name = Null<string>.GetNull(intent.Name),
                Code = Null<string>.GetNull(intent.Code),
                Intent = intent.Intent,
                CreationDate = intent.CreationDate == "" ? Config.GetDateTodayString() : intent.CreationDate,
                EditDate = intent.EditDate == "" ? Config.GetDateTodayString() : intent.EditDate,
                InUse = Null<bool>.GetNull(intent.InUse),
                Disable = Null<bool>.GetNull(intent.Disable),
                Id =  GetIdNew( intent.Id ),
                IdCompany = GetIdNew(intent.IdProject),
                IdProject = GetIdNew(intent.IdProject),
                ConfirmData = Null<bool>.GetNull(intent.Confirm),
                QuestionB = "",
                QuestionA = intent.Question,                
                Answer = intent.Answer,
                TypeModelIa = tblChatTypeModelIa.Intent
            };
        }

        public UtilChatBotMsg(IAAssistant assistant)
        {
            var utilConcept = new UtilNameCancept();
            chat = new tblChatBotMsg()
            {
                Name = Null<string>.GetNull(assistant.Name),
                Code = Null<string>.GetNull(assistant.Code),
                CreationDate = assistant.CreationDate == "" ? Config.GetDateTodayString() : assistant.CreationDate,
                EditDate = assistant.EditDate == "" ? Config.GetDateTodayString() : assistant.EditDate,
                InUse = Null<bool>.GetNull(assistant.InUse),
                Disable = Null<bool>.GetNull(assistant.Disable),
                Id = Config.NewGuid,
                IdCompany = GetIdNew(assistant.IdProject),
                IdProject = GetIdNew(assistant.IdProject),
                ConfirmData = Null<bool>.GetNull(assistant.Confirm),
                QuestionA = assistant.Question,
                QuestionB = assistant.QuestionB,
                Answer = assistant.Answer,
                TypeModelIa = tblChatTypeModelIa.AIAssistant
            };
        }

        public UtilChatBotMsg(IAByNameProduct byName)
        {
            var utilConcept = new UtilNameCancept();
            chat = new tblChatBotMsg()
            {
                Name = Null<string>.GetNull(byName.Name),
                Code = Null<string>.GetNull(byName.Code),
                CreationDate = byName.CreationDate == "" ? Config.GetDateTodayString() : byName.CreationDate,
                EditDate = byName.EditDate == "" ? Config.GetDateTodayString() : byName.EditDate,
                InUse = Null<bool>.GetNull(byName.InUse),
                Disable = Null<bool>.GetNull(byName.Disable),
                Id = GetIdNew(Id),
                IdCompany = GetIdNew(byName.IdProject),
                IdProject = GetIdNew(byName.IdProject),
                ConfirmData = Null<bool>.GetNull(byName.Confirm),
                QuestionB = byName.Question,
                Answer = byName.Answer,
                TypeModelIa = tblChatTypeModelIa.SearchProductsByName
            };
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
