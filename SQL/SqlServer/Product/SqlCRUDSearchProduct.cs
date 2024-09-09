using CloudinaryDotNet.Actions;
using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Utility.General;

namespace SQL.SqlServer.Product
{
    public class SqlCRUDSearchProduct : ISqlSearch<tblProduct>
    {

        private readonly string ConnectionString = "";
        private int pageSize = 10;
        private int pageTemp = 0;

        private readonly IConfiguration _Config;

        public List<tblProduct> ListFilter { get; set; }


        public SqlCRUDSearchProduct(IConfiguration _Config)
        {
            try
            {
                this._Config = _Config;

                ConnectionString = this._Config.GetSection(Config.ConnectionSqlName).Value.ToString();

            }
            catch (Exception)
            {

                throw;
            }

        }


        public List<tblProduct> GetConceptName(SqlDataReader read)
        {
            var list = new List<tblProduct>();

            while (read.Read())
            {
                try
                {
                    list.Add(new tblProduct()
                    {
                        Id = Null<Guid>.GetNull(read[nameof(tblProduct.Id)]),
                        Name = Null<string>.GetNull(read[nameof(tblProduct.Name)]),
                        IsPublic = NotNull.GetIntToBool(read[nameof(tblProduct.IsPublic)]).value,

                    }); ;
                }
                catch (Exception ex)
                {

                    throw;
                }
            }

            return list;

        }

        public List<tblProduct> GetConceptNameIA(SqlDataReader read)
        {
            var list = new List<tblProduct>();

            while (read.Read())
            {
                try
                {


                    var product = new tblProduct();

                    product.Id = Null<Guid>.GetNull(read[nameof(tblProduct.Id)]);
                    product.IdProject = Null<Guid>.GetNull(read[nameof(tblProduct.IdProject)]);
                    product.Name = Null<string>.GetNull(read[nameof(tblProduct.Name)]);
                    product.IsPublic = Null<bool>.GetNull(read[nameof(tblProduct.IsPublic)]);
                    product.IdTypeOfProduct = Null<Guid>.GetNull(read[nameof(tblProduct.IdTypeOfProduct)]);
                    product.FirsImg = Null<ImgItem>.Get(read[nameof(tblProduct.FirsImg)]);
                    product.PriceString = Null<string>.GetNull(read[nameof(tblProduct.PriceString)]);
                    product.ActualPrice = Null<decimal>.GetNull(read[nameof(tblProduct.ActualPrice)]);
                    product.FilterISearch = Null<List<string>>.Get(read[nameof(tblProduct.FilterISearch)]);
                    product.IdCompany = Null<Guid>.GetNull(read[nameof(tblProduct.IdCompany)]);
                    product.Disable = Null<bool>.GetNull(read[nameof(tblProduct.Disable)]);
                    product.Adress = product.Adress =
                      new tblConcepValue
                      {
                          Id = Null<Guid>.GetNull(read["adressId"]),
                          Name = Null<string>.GetNull(read["address"]),
                          Value = Null<string>.GetNull(read["coordinate"]),
                          Concept = Null<NameConcept>.Get(read["conceptLocation"])
                      };



                    list.Add(product);

                }
                catch (Exception ex)
                {

                    throw;
                }
            }

            return list;

        }

        public async Task<Response<List<tblProduct>>> GetListById(List<Guid> IdProducts)
        {
            var obj = new Response<List<tblProduct>>();
            SqlDataReader read;
            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetByListId, new tblProduct() { Name = string.Join(",", IdProducts) }, cmd, "GetProductListById");
                    cmd.Open();
                    read = await sqlCommand.ExecuteReaderAsync();

                    var itemRead = await GetProductList(read);

                    if (itemRead != null && itemRead.Count() > 0)
                    {
                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }



        public async Task<Response<List<tblProduct>>> GetFilterByName(ConceptFilter concept, tblProduct product, int page, int pageSize)
        {
            if (page == 0) page = 1;
            var obj = new Response<List<tblProduct>>();
            SqlDataReader read;
            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    product.IdProject = concept.IdProject;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetByName, product, cmd, "GetSearchProductByName", page);
                    cmd.Open();
                    read = await sqlCommand.ExecuteReaderAsync();

                    var itemRead = await GetProductList(read);
                    obj.Pages = pageTemp;  //await  GetPagesTotal(read);

                    if (itemRead != null && itemRead.Count() > 0)
                    {
                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead;

                    }
                    else
                    {
                        obj.Data = new List<tblProduct>();
                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item no disponible" } };


                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }


       

        public async Task<Response<List<ImgItem>>> GetListFirsImages(List<Guid> IdProducts)
        {
            var obj = new Response<List<ImgItem>>();
            SqlDataReader read;
            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetByListId, new tblProduct() { Name = string.Join(",", IdProducts) }, cmd, "GetProductListById");
                    cmd.Open();
                    read = await sqlCommand.ExecuteReaderAsync();

                    var itemRead = await GetFirstImages(read);

                    if (itemRead != null && itemRead.Count() > 0)
                    {
                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }

        async Task<Response<List<tblProduct>>> ISqlSearch<tblProduct>.GetListFilter()
        {

            var obj = new Response<List<tblProduct>>();
            SqlDataReader read;
            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Disable, new tblProduct(), cmd, "GetListFilter");
                    cmd.Open();
                    read = await sqlCommand.ExecuteReaderAsync();

                    var itemRead = GetConceptName(read);

                    if (itemRead != null && itemRead.Count() > 0)
                    {
                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }





        public async Task<Response<List<tblProduct>>> CategoryOfProduct(ConceptFilter config)
        {
            var obj = new Response<List<tblProduct>>();
            SqlDataReader read;
            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.GetCategory, new tblConcepValue() { IdProject = config.IdProject }, cmd, "GetCategoryOfProduct");
                    cmd.Open();
                    read = await sqlCommand.ExecuteReaderAsync();

                    var itemRead = await ReadCategory(read);

                    if (itemRead != null && itemRead.Count() > 0)
                    {
                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }








        async Task<Response<List<tblProduct>>> ISqlSearch<tblProduct>.GetListIAData()
        {

            var obj = new Response<List<tblProduct>>();
            SqlDataReader read;
            try
            {
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Disable, new tblProduct(), cmd, "GetListProductIA");
                    cmd.Open();
                    read = await sqlCommand.ExecuteReaderAsync();

                    var itemRead = GetConceptNameIA(read);

                    if (itemRead != null && itemRead.Count() > 0)
                    {
                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead;

                    };

                    cmd.Close();

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }
        private async Task<List<ImgItem>> GetFirstImages(SqlDataReader read)
        {
            List<ImgItem> productList = new List<ImgItem>();

            while (read.Read())
            {
                try
                {
                    ImgItem img = Null<ImgItem>.Get(read[nameof(tblProduct.FirsImg)]);
                    if (img != null)
                    {
                        img.Code = Null<string>.GetNull(read[nameof(tblProduct.PriceString)]);
                        productList.Add(img);
                    }
                }
                catch (Exception ex)
                {

                    throw;
                }
            }
            return productList;
        }
        private async Task<SqlCommand> GetSqlCommand(TypeCommand typeCommand, tblProduct product, SqlConnection cmd, string ProcedureName, int page = 0)
        {
            SqlCommand sqlCommand = new SqlCommand(ProcedureName, cmd);
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            if (typeCommand == TypeCommand.GetByName)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Name)}", product.Name);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.IdTypeOfProduct)}", product.IdTypeOfProduct);
                sqlCommand.Parameters.AddWithValue($"page", page);
                sqlCommand.Parameters.AddWithValue($"pageSize", pageSize);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.IdProject)}", product.IdProject);
            }

            if (typeCommand == TypeCommand.GetByListId)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Name)}", product.Name);
            }


            return sqlCommand;
        }

        private async Task<SqlCommand> GetSqlCommand(TypeCommand typeCommand, tblConcepValue product, SqlConnection cmd, string ProcedureName, int page = 0)
        {
            SqlCommand sqlCommand = new SqlCommand(ProcedureName, cmd);
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;


            if (typeCommand == TypeCommand.GelAll)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Name)}", product.Name);
               
            }

            if (typeCommand == TypeCommand.GetCategory)
            {
             
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.IdProject)}", product.IdProject);
            }


            return sqlCommand;
        }




        private async Task<List<tblProduct>> GetProductList(SqlDataReader read)
        {
            List<tblProduct> productList = new List<tblProduct>();
            var product = new tblProduct();
            while (read.Read())
            {
                try
                {
                    product = new tblProduct();

                    product.Id = Null<Guid>.GetNull(read[nameof(tblProduct.Id)]);
                    product.IdProject = Null<Guid>.GetNull(read[nameof(tblProduct.IdProject)]);
                    product.IdCompany = Null<Guid>.GetNull(read[nameof(tblProduct.IdCompany)]);
                    product.ConceptCompany = Null<NameConcept>.Get(read[nameof(tblProduct.ConceptCompany)]);
                    product.ConceptProject = Null<NameConcept>.Get(read[nameof(tblProduct.ConceptProject)]);
                    product.ConceptPrevious = Null<NameConcept>.Get(read[nameof(tblProduct.ConceptPrevious)]);
                    product.IdTypeOfProduct = Null<Guid>.GetNull(read[nameof(tblProduct.IdTypeOfProduct)]);
                    product.Name = Null<string>.GetNull(read[nameof(tblProduct.Name)]);
                    product.ReferNumber = Null<string>.GetNull(read[nameof(tblProduct.ReferNumber)]);
                    product.FirsImg = NotNull.GetNoNullImage(read[nameof(tblProduct.FirsImg)]).content;
                    product.Code = Null<string>.GetNull(read[nameof(tblProduct.Code)]);
                    product.ImgList = NotNull.GetNoNullImages(read[nameof(tblProduct.ImgList)]).content;
                    product.CreationDate = Null<string>.GetNull(read[nameof(tblProduct.CreationDate)]);
                    product.IsPublic = Null<bool>.Get(read[nameof(tblProduct.IsPublic)]);
                    product.Disable = Null<bool>.GetNull(read[nameof(tblProduct.Disable)]);
                    product.InUse = Null<bool>.Get(read[nameof(tblProduct.InUse)]);
                    product.ActualPrice = NotNull.GetNoNullByDecimal(read[nameof(tblProduct.ActualPrice)]).valueString;
                    product.EditDate = Null<string>.GetNull(read[nameof(tblProduct.EditDate)]);
                    product.DeliveryMode = Null<NameConcept>.Get(read[nameof(tblProduct.DeliveryMode)]);
                    product.AvailableDay = Null<NameConcept>.Get(read[nameof(tblProduct.AvailableDay)]);
                    product.Status = Null<NameConcept>.Get(read[nameof(tblProduct.Status)]);
                    
                    product.PriceString = Null<string>.GetNull(read[nameof(tblProduct.PriceString)]);
                    product.Prices = Null<List<Prices>>.Get(read[nameof(tblProduct.Prices)]);
                    //product.Adress = Null<List<tblConcepValue>>.Get(read[nameof(tblProduct.Adress)]);
                    product.Quantity = Null<int>.GetNull(read[nameof(tblProduct.Quantity)]);
                    product.UrlReferProduct = Null<string>.Get(read[nameof(tblProduct.UrlReferProduct)]);
                    product.FilterISearch = Null<List<string>>.Get(read[nameof(tblProduct.FilterISearch)]);
                    product.Adress =
                      new tblConcepValue
                      {
                          Id = Null<Guid>.GetNull(read["adressId"]),
                          Name = Null<string>.GetNull(read["address"]),
                          Value = Null<string>.GetNull(read["coordinate"]),
                          Concept = Null<NameConcept>.Get(read["conceptLocation"])
                      };

                    try
                    {
                        pageTemp = Null<int>.GetNull(read["TotalPages"]);
                    }
                    catch (Exception ex)
                    {
                    }

                    try
                    {
                        product.TypeProductName = Null<string>.GetNull(read[nameof(tblProduct.TypeProductName)]);
                    }
                    catch (Exception ex)
                    {
                       
                    }

                }
                catch (Exception ex)
                {

                    throw;
                }
                productList.Add(product);
            }
            return productList;
        }

        private async Task<int> GetPagesTotal(SqlDataReader read)
        {
            int count = 0;

            while (read.Read())
            {
                try
                {
                    count = Null<int>.GetNull(read["TotalPages"]);
                }
                catch (Exception ex)
                {

                    throw;
                }

            }
            return count;
        }


        private async Task<List<tblProduct>> ReadCategory(SqlDataReader read)
        {
            List<tblProduct> productList = new List<tblProduct>();
            var product = new tblProduct();
            while (read.Read())
            {
                try
                {


                    product = new tblProduct();

                    product.Name = Null<string>.GetNull(read["name"]);
                    product.FirsImg = Null<ImgItem>.Get(read[nameof(tblProduct.FirsImg)]);
                    product.Code = Null<string>.GetNull(read["Type"]);
                    product.IdProject = Null<Guid>.GetNull(read["idProject"]);
                    product.IdCompany = Null<Guid>.GetNull(read[nameof(product.IdCompany)]);
                    product.IdTypeOfProduct = Null<Guid>.GetNull(read["idTypeOfProduct"]);


                }
                catch (Exception ex)
                {

                    throw;
                }
                productList.Add(product);
            }
            return productList;
        }



        private enum TypeCommand
        {
            GetByName,
            GetCategory,
            GetListFilter,
            GetByListId,
            GelAll,
            Disable

        }

        private enum TypeCommandFilter
        {
            IsActive,
            Disable

        }

    }
}
