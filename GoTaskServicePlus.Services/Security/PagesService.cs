using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Security
{
    public class PagesService : IPagesService
    {
        public Task<Response<List<Pages>>> GetAll()
        {
            var pages = new Response<List<Pages>>();
            pages.Data = new List<Pages>();
            pages.Status = true;
            pages.Data.Add( new Pages { Name = "Home", Page= "home", IsPrivate  = false });
            pages.Data.Add( new Pages { Name = "Menu principal", Page= "home-menu", IsPrivate = false });
            pages.Data.Add( new Pages { Name = "Carrito de compras", Page= "product-cart", IsPrivate = false });
            pages.Data.Add( new Pages { Name = "Compras realisadas por cliente final", Page= "product-buy", IsPrivate = false });
            pages.Data.Add( new Pages { Name = "Favoritos gurdados por cliente final ", Page= "user-favorite", IsPrivate = false });
            pages.Data.Add( new Pages { Name = "Cuando se selecciona un producto", Page= "select-product-search", IsPrivate = false });
            pages.Data.Add( new Pages { Name = "Descarga de productos", Page= "youtube-download", IsPrivate = false });
            pages.Data.Add( new Pages { Name = "Cursos Iot", Page= "learn-iot", IsPrivate = false });
            pages.Data.Add( new Pages { Name = "Texto a voz", Page= "text-to-speech", IsPrivate = false });
            pages.Data.Add( new Pages { Name = "Agregar producto", Page= "add-product", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Concepto de productos", Page= "conceptual-product", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Conceptos de sucurdales", Page= "customer-concept", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Administrar compañias", Page= "admin-company", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Administrar proyectos", Page= "admin-project", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Administrar usuarios", Page= "admin-user", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Administrar roles", Page= "admin-rol-user", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Administrar chat", Page= "chat-config", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Administrar menu", Page= "project-menu", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Administrar compras", Page= "admin-buy", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Administrar busquedas", Page= "admin-list-search", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Seleccionar productos", Page= "select-product", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Activar productos", Page= "app-vendor-active-product", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Actualizar Sucursal", Page= "update-project-vendor", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "N/A", Page= "*", IsPrivate = true });
            pages.Data.Add( new Pages { Name = "Control Total", Page= "root", IsPrivate = true });
           
            return Task.FromResult(pages);


        }
    }
}
