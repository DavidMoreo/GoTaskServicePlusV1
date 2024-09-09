using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.SubAppInterfaces
{
    public interface IFileEdit<T>
    {

        Task<(bool status, string error)> WriteFile(T obj, string routeFile);
        Task<(bool status, string error, T obj)> ReadFile(string routeFile);
        Task<(bool status, string error, T obj)> DeleteFile(string routeFile);
    }

}
