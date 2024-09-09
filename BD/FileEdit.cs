using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Utility.General;


namespace Utility
{
    public class FileEditAction<T>
    {
        public static async Task<(bool status, string error)> WriteFile(T obj, string routeFile, string name)
        {
            string  routeDir =     SetDir(routeFile);
            string routeName = Path.Combine(routeDir, name); 
            try
            {
                var textContent = System.Text.Json.JsonSerializer.Serialize(obj);
                await System.IO.File.WriteAllTextAsync(routeName, textContent);               
                return  (true, "");

            }
            catch (Exception ex)
            {
                 return (false, "");
                throw;
            }
        }

        public static async Task<(bool status, string error, T obj)> ReadFile(string routeFile, string name)
        {
            var routeDir = SetDir(routeFile);
            string routeName = Path.Combine(routeDir, name);
            try
            {
                var textContent = await System.IO.File.ReadAllTextAsync(routeName);
                var obj = System.Text.Json.JsonSerializer.Deserialize<T>(textContent);
                return (true, "", obj);
            }
            catch (Exception ex)
            {
                return (false, ex.Message, default(T));
                throw;
            }
          
        }

        public static (bool status, string error) DeleteFile(string routeFile, string name  )
        {
            var routeDir = SetDir(routeFile);
            string routeName = Path.Combine(routeDir, name);
            try
            {
                if (System.IO.File.Exists(routeName))
                {
                    System.IO.File.Delete(routeName);
                }

                return (true, "");
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
                throw;
            }
        }
        private static string SetDir(string directoryPath)
        {
            string route = Config.GetRouteFiles;
            string path = Path.Combine(route, "Languages");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            return path;
        }

    }
}
