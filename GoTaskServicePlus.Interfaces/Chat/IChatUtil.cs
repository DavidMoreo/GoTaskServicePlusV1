using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Chat
{
    public interface IChatUtil
    {
        public Task SendNotification(string text);

    }
}
