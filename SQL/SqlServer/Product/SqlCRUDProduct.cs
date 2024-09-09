using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Entities;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Utility.General;

namespace SQL.SqlServer.Product
{
    public class SqlCRUDProduct : ISqlModelProduct<tblProduct>
    {

        private readonly string ConnectionString = "";

        private readonly IConfiguration _Config;
        private int pageTemp;
        private int pageSize = 10;


        public SqlCRUDProduct(IConfiguration _Config)
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


        public async Task<Response<tblProduct>> Save(tblProduct product)
        {

            var obj = new Response<tblProduct>();

            try
            {
                if (product != null)
                {
                    if (product.UrlReferProduct == null) product.UrlReferProduct = "";
                    using (SqlConnection cmd = new SqlConnection(ConnectionString))
                    {
                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommand(TypeCommand.Save, product, cmd, "SaveProduct");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        cmd.Close();
                        if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "producto creado", Id = Guid.NewGuid() } };
                        if (obj.Status) obj.Data = product;
                        return obj;
                    }
                }
                else { obj.Log = new ErrorCustom { Msg = "Save product null", TypeMsg = ErrorCustom.TypeError.Warnig }; }
            }
            catch (Exception ex)
            {
                obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };
                obj.Log = new ErrorCustom { Msg = $" save poduct  {ex.Message}", TypeMsg = ErrorCustom.TypeError.Warnig };

                return obj;

            }


            obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = " No se guardo el producto" } };


            return obj;


        }
        public async Task<Response<tblProduct>> Update(tblProduct product)
        {
            var obj = new Response<tblProduct>();

            try
            {

                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    cmd.Open();
                    sqlCommand = await GetSqlCommand(TypeCommand.Update, product, cmd, "UpdateProduct");

                    obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                    cmd.Close();
                    if (obj.Status) obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Actualizado creado" } };
                    if (obj.Status) obj.Data = product;
                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }
        public async Task<Response<tblProduct>> Delete(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblProduct>();

            try
            {

                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Delete, new tblProduct() { Id = id }, cmd, "DeleteProdById");
                    cmd.Open();

                    obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                    cmd.Close();
                    obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Producto eliminado " } };

                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $"{ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }
        }
        public async Task<Response<tblProduct>> Get(ConceptFilter config, Guid id)
        {
            var obj = new Response<tblProduct>();
            SqlDataReader read;
            try
            {
                tblProduct rol = new tblProduct();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommand(TypeCommand.Get, new tblProduct() { Id = id }, cmd, "GetProductById");
                    cmd.Open();


                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = await GetProductList(read);

                    if (itemRead != null && itemRead.Count() > 0)
                    {

                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead.FirstOrDefault();

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
        public Task<Response<tblProduct>> Get(ConceptFilter config, string name)
        {
            throw new NotImplementedException();
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
                    sqlCommand = await GetSqlCommand(TypeCommand.GetName, product, cmd, "GetSearchProductByNameInProject", page);
                    cmd.Open();
                    read = await sqlCommand.ExecuteReaderAsync();

                    var itemRead = await GetProductList(read);
                    obj.Pages = pageTemp;  //await  GetPagesTotal(read);

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
                    sqlCommand = await GetSqlCommand(TypeCommand.Defaul, new tblProduct() { }, cmd, "CategoryOfProduct");
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
                return obj;
            }
        }

        private async Task<SqlCommand> GetSqlCommandImage(TypeCommand typeCommand, ImgItem img, SqlConnection cmd, string ProcedureName, int page = 0)
        {
            SqlCommand sqlCommand = new SqlCommand(ProcedureName, cmd);
            sqlCommand.CommandType = CommandType.StoredProcedure;


            if (typeCommand == TypeCommand.Delete || typeCommand == TypeCommand.Update || typeCommand == TypeCommand.Save)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.Id)}", img.Id);

            }
            if (typeCommand == TypeCommand.Save)
            {

                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.Code)}", img.Code);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.ConceptCompany)}", Null<NameConcept>.Set(img.ConceptCompany));
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.ConceptProject)}", Null<NameConcept>.Set(img.ConceptProject));
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.ConceptPrevious)}", Null<NameConcept>.Set(img.ConceptPrevious));
                //sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.IdPrevious)}", img.IdPrevious);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.url)}", img.url);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.TypeImgDb)}", img.TypeImgDb);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.Name)}", img.Name);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.NameVisible)}", img.NameVisible);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.CreationDate)}", img.CreationDate);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.EditDate)}", img.EditDate);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.Disable)}", img.Disable);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.InUse)}", img.InUse);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.IdCompany)}", img.IdCompany);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.IdProject)}", img.IdProject);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.ReferUse)}", Null<List<string>>.Set(img.ReferUse));


            }

            if (typeCommand == TypeCommand.UpdateImgByUrl)
            {              
                
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.url)}", img.url);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.ReferUse)}", Null<List<string>>.Set(img.ReferUse));

            }

            if (typeCommand == TypeCommand.UpdateImg)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.Id)}", img.Id);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.ConceptCompany)}", Null<NameConcept>.Set(img.ConceptCompany));
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.ConceptProject)}", Null<NameConcept>.Set(img.ConceptProject));
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.ConceptPrevious)}", Null<NameConcept>.Set(img.ConceptPrevious));
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.ReferUse)}", Null<List<string>>.Set(img.ReferUse));

            }


            if (typeCommand == TypeCommand.GetAll)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.IdCompany)}", img.IdCompany);
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.Name)}", img.Name);

            }

            if (typeCommand == TypeCommand.GetByUrl)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(ImgItem.url)}", img.url);            

            }

            return sqlCommand;
        }
        public async Task<Response<ImgItem>> SelectedImg(List<Guid> listImg, ConceptFilter config, Guid idrefer)
        {
            var obj = new Response<ImgItem>();
            //var conceptCompany = new UtilNameCancept(company);
            //var conceptProject = new UtilNameCancept(project);


            var images = await GeImagesByCompanyId(config, "all");

            int countRefer = 0;

            try
            {

                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {
                    bool delete = false;
                    if (listImg.Count <= 0 && config.IdCompany != Config.GuidEmpty && config.IdProject != Config.GuidEmpty)
                    {
                        delete = true;
                        listImg = (from i in images.Data select i.Id).ToList();
                    }

                    foreach (var img in listImg)
                    {
                        var imgNew = new UtilImgItem(config.IdCompany, config.IdProject).Img;

                        if (imgNew.ReferUse == null) imgNew.ReferUse = new List<string>();

                        var exist = images.Data.FirstOrDefault(s => s.Id == img);

                        if (delete)
                        {
                            imgNew = exist;
                            if (imgNew.ReferUse != null) imgNew.ReferUse.Remove(idrefer.ToString());
                        }
                        else
                        if (exist == null && listImg.Count > 0 && config.IdCompany != Config.GuidEmpty && config.IdProject != Config.GuidEmpty)
                        {
                            if (imgNew.ReferUse == null) imgNew.ReferUse = new List<string>();

                            imgNew.ReferUse.Add(idrefer.ToString());

                        }
                        else

                        if (exist != null && listImg.Count > 0 && config.IdCompany != Config.GuidEmpty && config.IdProject != Config.GuidEmpty)
                        {
                            if (exist.ReferUse == null) exist.ReferUse = new List<string>();


                            var referExist = exist.ReferUse.FirstOrDefault(s => s == idrefer.ToString());

                            if (referExist == null)
                            {
                                if (exist.ReferUse != null)
                                {
                                    imgNew.ReferUse = exist.ReferUse;
                                    imgNew.Id = exist.Id;
                                }

                                imgNew.ReferUse.Add(idrefer.ToString());

                            }


                        }





                        SqlCommand sqlCommand;
                        cmd.Open();
                        sqlCommand = await GetSqlCommandImage(TypeCommand.UpdateImg, imgNew, cmd, "UpdateImgProductById");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        cmd.Close();
                        obj.Msg.Add(new MsgResponse { Msg = "Actualizado " });

                    }
                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }

        }
      
        public async Task<Response<ImgItem>> SaveImg(List<ImgItem> imges)
        {
            var obj = new Response<ImgItem>();

            try
            {

                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    cmd.Open();
                    foreach (var img in imges)
                    {
                        sqlCommand = await GetSqlCommandImage(TypeCommand.Save, img, cmd, "SavedImage");

                        obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                        cmd.Close();
                        obj.Msg.Add(new MsgResponse { Msg = "Actualizado " });
                    }


                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }

        }
    
        
        public async Task<Response<ImgItem>> UpdateImgByName(ConceptFilter config, ImgItem image)
        {
            var obj = new Response<ImgItem>();

            try
            {

                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    cmd.Open();
                    sqlCommand = await GetSqlCommandImage(TypeCommand.UpdateImgByUrl, image, cmd, "UpdateImgProductByUrl");

                    obj.Status = await sqlCommand.ExecuteNonQueryAsync() > 0;
                    cmd.Close();
                    obj.Msg.Add(new MsgResponse { Msg = "Actualizado " });


                    return obj;
                }

            }
            catch (Exception ex)
            {
                obj.Log = new ErrorCustom { Msg = $" {ex.Message.ToString()}", TypeMsg = ErrorCustom.TypeError.Ecxecption };
                return obj;

            }

        }


        public async Task<Response<ImgItem>> GetImgByUrl(ConceptFilter config, string url)
        {

            var obj = new Response<ImgItem>();
            SqlDataReader read;
            try
            {
                ImgItem rol = new ImgItem();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommandImage(TypeCommand.GetByUrl, new ImgItem() { url = url, IdProject = config.IdProject  }, cmd, "GetImgByUrl");
                    cmd.Open();

                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = await GetImagetList(read);

                    if (itemRead != null && itemRead.Count() > 0)
                    {

                        obj.Status = true;
                        obj.Msg = new List<MsgResponse>() { new MsgResponse { Msg = "Item encontrados" } };

                        obj.Data = itemRead.FirstOrDefault();

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



        public async Task<Response<List<ImgItem>>> GeImagesByCompanyId(ConceptFilter config, string filter)
        {

            var obj = new Response<List<ImgItem>>();
            SqlDataReader read;
            try
            {
                ImgItem rol = new ImgItem();
                using (SqlConnection cmd = new SqlConnection(ConnectionString))
                {

                    SqlCommand sqlCommand;
                    sqlCommand = await GetSqlCommandImage(TypeCommand.GetAll, new ImgItem() { Name = filter, IdCompany  = config.IdCompany  }, cmd, "GeImagesByCompanyId");
                    cmd.Open();

                    read = await sqlCommand.ExecuteReaderAsync();
                    var itemRead = await GetImagetList(read);

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
     



        private async Task<List<tblProduct>> GetProductList(SqlDataReader read)
        {
            List<tblProduct> productList = new List<tblProduct>();

            while (read.Read())
            {
                try
                {
                    var producto = new tblProduct();
                    producto.Id = Null<Guid>.GetNull(read[nameof(tblProduct.Id)]);
                    producto.AdressId = Null<Guid>.GetNull(read[nameof(tblProduct.AdressId)]);
                    producto.IdCompany = Null<Guid>.GetNull(read[nameof(tblProduct.IdCompany)]);
                    producto.IdProject = Null<Guid>.GetNull(read[nameof(tblProduct.IdProject)]);
                    producto.ConceptCompany = Null<NameConcept>.Get(read[nameof(tblProduct.ConceptProject)]);
                    producto.ConceptProject = Null<NameConcept>.Get(read[nameof(tblProduct.ConceptProject)]);
                    producto.ConceptPrevious = Null<NameConcept>.Get(read[nameof(tblProduct.ConceptPrevious)]);
                    producto.IdTypeOfProduct = Null<Guid>.GetNull(read[nameof(tblProduct.IdTypeOfProduct)]);
                    producto.Name = Null<string>.GetNull(read[nameof(tblProduct.Name)]);
                    producto.ReferNumber = Null<string>.GetNull(read[nameof(tblProduct.ReferNumber)]);
                    producto.FirsImg = Null<ImgItem>.Get(read[nameof(tblProduct.FirsImg)]);
                    producto.Code = Null<string>.GetNull(read[nameof(tblProduct.Code)]);
                    producto.ImgList = Null<List<ImgItem>>.Get(read[nameof(tblProduct.ImgList)]);
                    producto.CreationDate = Null<string>.GetNull(read[nameof(tblProduct.CreationDate)]);
                    producto.IsPublic = Null<bool>.GetNull(read[nameof(tblProduct.IsPublic)]);
                    producto.Disable = Null<bool>.GetNull(read[nameof(tblProduct.Disable)]);
                    producto.IsProduct = Null<bool>.GetNull(read[nameof(tblProduct.IsProduct)]);
                    producto.InUse = Null<bool>.GetNull(read[nameof(tblProduct.InUse)]);
                    producto.ActualPrice = Null<decimal>.GetNull(read[nameof(tblProduct.ActualPrice)]);
                    producto.PricesInternal = Null<decimal>.GetNull(read[nameof(tblProduct.PricesInternal)]);
                    producto.Quantity = NotNull.GetNoNullByInt(read[nameof(tblProduct.Quantity)]).value;
                    producto.EditDate = Null<string>.GetNull(read[nameof(tblProduct.EditDate)]);
                    producto.DeliveryMode = NotNull.GetNoNullNameConcept(read[nameof(tblProduct.DeliveryMode)]).nameConcept;
                    producto.AvailableDay = NotNull.GetNoNullNameConcept(read[nameof(tblProduct.AvailableDay)]).nameConcept;
                    producto.Status = NotNull.GetNoNullNameConcept(read[nameof(tblProduct.Status)]).nameConcept;
                    producto.PriceString = Null<string>.GetNull(read[nameof(tblProduct.PriceString)]);
                    producto.Prices = Null<List<Prices>>.Get(read[nameof(tblProduct.Prices)]);
                    //producto.historyOfPrice = Null<List<Prices>>.Get(read[nameof(tblProduct.historyOfPrice)]);
                    //producto.Adress = Null<tblConcepValue>.Get(read[nameof(tblProduct.Adress)]);
                    producto.Characteristics = Null<List<tblCharacteristics>>.Get(read[nameof(tblProduct.Characteristics)]);
                    producto.UrlReferProduct = Null<string>.GetNull(read[nameof(tblProduct.UrlReferProduct)]);
                    producto.TypeProductName = Null<string>.GetNull(read[nameof(tblProduct.TypeProductName)]);
                    producto.FilterISearch = Null<List<string>>.Get(read[nameof(tblProduct.FilterISearch)]);
                    producto.Adress =
                      new tblConcepValue
                      {
                          Id = Null<Guid>.GetNull(read["adressId"]),
                          Name = Null<string>.GetNull(read["address"]),
                          Value = Null<string>.GetNull(read["coordinate"]),
                          Concept = Null<NameConcept>.Get(read["conceptLocation"])

                      };
                    productList.Add(producto);



                }
                catch (Exception ex)
                {

                    throw;
                }
            }
            return productList;
        }
        private async Task<List<ImgItem>> GetImagetList(SqlDataReader read)
        {
            List<ImgItem> productList = new List<ImgItem>();

            while (read.Read())
            {
                try
                {                   

                    var producto = new ImgItem();
                    producto.Id = Null<Guid>.GetNull(read[nameof(ImgItem.Id)]);                  
                    producto.IdCompany = Null<Guid>.GetNull(read[nameof(ImgItem.IdCompany)]);                  
                    producto.Name = Null<string>.GetNull(read[nameof(ImgItem.Name)]);
                    producto.Disable = Null<bool>.GetNull(read[nameof(ImgItem.Disable)]);
                    producto.EditDate = Null<string>.GetNull(read[nameof(ImgItem.EditDate)]);
                    producto.url = Null<string>.GetNull(read[nameof(ImgItem.url)]);
                    producto.ReferUse = Null<List<string>>.Get(read[nameof(ImgItem.ReferUse)]);
                    productList.Add(producto);

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
            sqlCommand.CommandType = CommandType.StoredProcedure;

            if (typeCommand == TypeCommand.Save || typeCommand == TypeCommand.Update)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Id)}", product.Id);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.IdProject)}", product.IdProject);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.AdressId)}", product.Adress !=null ? product.Adress.Id.ToString():Guid.Empty.ToString());
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.IdCompany)}", product.IdCompany);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Code)}", product.Code);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Name)}", product.Name.ToUpper());
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.ConceptCompany)}", Null<NameConcept>.Set(product.ConceptCompany));
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.ConceptProject)}", Null<NameConcept>.Set(product.ConceptProject));
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.ConceptPrevious)}", Null<NameConcept>.Set(product.ConceptPrevious));
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.IdTypeOfProduct)}", product.IdTypeOfProduct);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.CreationDate)}", product.GetCreationDate);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.EditDate)}", product.GetEditDate);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.ReferNumber)}", product.ReferNumber);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.DeliveryMode)}", NotNull.GetNoNullNameConcept(product.DeliveryMode).content);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.ActualPrice)}", product.ActualPrice);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.PriceString)}", product.PriceString);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.AvailableDay)}", NotNull.GetNoNullNameConcept(product.AvailableDay).content);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Status)}", NotNull.GetNoNullNameConcept(product.Status).content);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Quantity)}", product.Quantity);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.ImgList)}", Null<List<ImgItem>>.Set(product.ImgList));
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Characteristics)}", NotNull.GetNoNullCharacteristics(product.Characteristics).content);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.FirsImg)}", NotNull.GetNoNullImage(product.FirsImg).imgString);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Prices)}", Null<List<Prices>>.Set(product.Prices));
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.PricesInternal)}", Null<decimal>.Set(product.PricesInternal));
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.InUse)}", product.InUse);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.IsPublic)}", product.IsPublic);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Disable)}", product.Disable);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.CountRating)}", product.CountRating != null ? product.CountRating : 0);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.NegativeRating)}", product.NegativeRating != null ? product.NegativeRating : 0);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.PositiveRating)}", product.PositiveRating != null ? product.PositiveRating : 0);               
                //sqlCommand.Parameters.AddWithValue($"@{nameof(product.Adress)}", Null<tblConcepValue>.Set(product.Adress));
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.UrlReferProduct)}", Null<string>.GetNull(product.UrlReferProduct));
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.FilterISearch)}", Null<List<string>>.Set(product.FilterISearch));
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.IsProduct)}", Null<bool?>.Set(product.IsProduct));
            }

            if (typeCommand == TypeCommand.Disable || typeCommand == TypeCommand.Delete || typeCommand == TypeCommand.Get)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Id)}", product.Id.ToString().ToUpper());
            }

            if (typeCommand == TypeCommand.GetByName)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Name)}", product.Name);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.IdTypeOfProduct)}", product.IdTypeOfProduct);
                sqlCommand.Parameters.AddWithValue($"page", page);
                sqlCommand.Parameters.AddWithValue($"pageSize", pageSize);
            }

            if (typeCommand == TypeCommand.UpdateImg)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Id)}", product.Id.ToString().ToUpper());
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.ConceptCompany)}", Null<Guid>.GetNull(product.ConceptCompany));
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.ConceptProject)}", Null<Guid>.GetNull(product.ConceptProject));
            }

            if (typeCommand == TypeCommand.GetAll)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Name)}", product.Name);
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.IdProject)}", product.IdProject);
                //sqlCommand.Parameters.AddWithValue($"@Type", "");
                //sqlCommand.Parameters.AddWithValue($"@page", page);
            }

            if (typeCommand == TypeCommand.GetFilterByValueType)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Name)}", product.Name);
                sqlCommand.Parameters.AddWithValue($"@Type", "");
                sqlCommand.Parameters.AddWithValue($"@page", page);
            }


            if (typeCommand == TypeCommand.GetName)
            {
                sqlCommand.Parameters.AddWithValue($"@{nameof(product.Id)}", product.Id);
                sqlCommand.Parameters.AddWithValue($"@page", page);
            }

            return sqlCommand;
        }

       

        private enum TypeCommand
        {
            Get,
            Delete,
            Save,
            Update,
            UpdateImg,
            UpdateImgByUrl,
            GetAll,
            GetFilterByValueType,
            GetName,
            GetByUrl,
            GetCategory,
            Disable,
            GetByName,
            Defaul

        }

    }
}
