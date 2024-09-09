
using GoTaskServicePlus.Interfaces.Hub;
using Microsoft.AspNetCore.SignalR;

namespace HubAction
{
    public class HubNotification : Hub  , IHubNotification
    {

        private readonly IHubContext<HubNotification> _hubContext;

        public HubNotification(IHubContext<HubNotification> _hubContext)
        {
            this._hubContext = _hubContext; 
        }

        public async Task Send(string msg)
        {
            await _hubContext.Clients.All.SendAsync("msg",msg);            
        }
    }
}
