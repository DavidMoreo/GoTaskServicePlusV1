using GoTaskServicePlus.Services.Security.Policy;
using Microsoft.AspNetCore.Authorization;

namespace GoTaskServicePlus.Services.Security
{
    public class PolicyRolHandler : AuthorizationHandler<RolPolicy>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, RolPolicy requirement)
        {
            if (context.User.Claims.Any(r => r.Type == "Vendor"))
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
