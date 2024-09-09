using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Hub
{
    public interface IHubNotification
    {

        Task Send(string msg);

    }
}
