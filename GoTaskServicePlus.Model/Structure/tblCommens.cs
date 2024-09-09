using GoTaskServiceplus.Client.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Structure
{
    public class tblCommens : Info
    {
        //el Id del chat generado al iniciar un chat, este asocia los mensajes en un chat 
        public Guid IdChat { get; set; } 
        //el usuario que envia 
        public Guid IdTransmitter { get; set; } 
        //Si el mensaje es para una sucursal o project  es el id del projecto IdProject
        //Si el mensaje es comentario de producto es el id de Producto
        //Si el mensaje es la respuesta de un comentario es el id de Msj
        public Guid IdReceiver { get; set; }
        public TypeCommen TypeCommenMode { get; set; }

        //Si MensajeChat  mensaje directo a producto
        //Si el mensaje es comentario de producto es el id de Producto
        //Si el mensaje es la respuesta de un comentario es el id de Msj
        public string Msg { get; set; }
        public enum TypeCommen
        {
            MensajeChat,
            ComentarioAChat,
            ComentarioProducto,
            Defaul
        }

        public static TypeCommen GetStringToTypeCommen(string value)
        {
            if(value =="0") return TypeCommen.MensajeChat;
            if(value =="1") return TypeCommen.ComentarioAChat;
            if(value =="2") return TypeCommen.ComentarioProducto;
            return TypeCommen.Defaul;

        }

    }
}
