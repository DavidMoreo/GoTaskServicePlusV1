using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Configuration;
using System;
using Microsoft.AspNetCore.Authorization;
using GoTaskServicePlus.Services.UtilService;

using System.Linq;
using Microsoft.ML;
using Microsoft.ML.Data;


using GoTaskServicePlus.Services.Security.Policy;
using GoTaskServicePlus.Services.Security;
using GoTaskServicePlus.Services.LoginService;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.UtilInterfaces;
using GoTaskServicePlus.Services.Interfaces;
using GoTaskServicePlus.Services.SubAppServices;
using GoTaskServicePlus.Interfaces.ExtraDriver;
using GoTaskServicePlus.Services.ExtraDriver;
using GoTaskServicePlus.Interfaces.Products;
using GoTaskServicePlus.Model.Structure;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces.RequestLogs;
using GoTaskServicePlus.Services.Product.CRUD.Products;
using GoTaskServicePlus.Services.Product.CRUD.Product;
using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Interfaces.Products.Concept;
using GoTaskServicePlus.Services.Product.Concept;
using GoTaskServicePlus.Services.LoginService.Interfaces;
using GoTaskServicePlus.Services.LoginService.Validation;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Services.Security.RegisterServices;
using JWT;
using GoTaskServicePlus.Interfaces.Product;
using GoTaskServicePlus.Services.Product;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Services.Company;
//using GoTaskServicePlus.Services.DB.SqlServer.Admin;
using GoTaskServicePlus.Services.User;
using GoTaskServicePlus.Interfaces.Security.UtilRegister;
using GoTaskServicePlus.Services.Security.RegisterServices.Util;
using GoTaskServicePlus.Interfaces.IA;
using GoTaskServicePlus.IA.SearchProduct;
using GoTaskServicePlus.Model.Chats;
using GoTaskServicePlus.Services.Chat;
using SQL.SqlServer.Chat;
using SQL.SqlServer.Admin;
using SQL.SqlServer.Product;
using SQL.SqlServer.Product.Concept;
using SQL.SqlServer.Security;
using GoTaskServicePlus.Interfaces.BuyCustomer;
using GoTaskServicePlus.Services.BuyCustomer;
using GoTaskServicePlus.Interfaces.Mail;
using GoTaskServicePlus.Services.MailService;
using GoTaskServicePlus.Services.Admin;
using GoTaskServicePlus.Interfaces.File;
using GoTaskServicePlus.Services.File;
using GoTaskServicePlus.Interfaces.Notification;
using GoTaskServicePlus.Services.Notification;
using GoTaskServicePlus.Services.BuyCustomer.Util;
using GoTaskServicePlus.Interfaces.Chat;
using GoTaskServicePlus.Services.Chat.Util;
using GoTaskServiceplus.Server.CompanyController;
using HubAction;
using GoTaskServicePlus.Interfaces.Hub;
using Microsoft.AspNetCore.SignalR;
using GoTaskServicePlus.Services.KeyValidation;
using GoTaskServicePlus.Interfaces.CarCustomer.Util;
using GoTaskServicePlus.Services.CarCustomerServi.Util;

using GoTaskServicePlus.Services.CarCustomerServi;
using GoTaskServicePlus.Interfaces.CarCustomers;
using GoTaskServicePlus.Services.CarCustomerServices;
using GoTaskServicePlus.Interfaces.FavoriteCustomers;
using GoTaskServicePlus.Services.FavoriteCustomerServi.Util;
using GoTaskServicePlus.Interfaces.FavoriteCustomer.Util;




var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddAuthorization();
//builder.Services.AddAuthentication("Bearer").AddJwtBearer();

builder.Services.AddControllersWithViews();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(
               options =>
               {

                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuer = false,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["keyJws:secret"])),
                       ValidateAudience = false,

                   };
               }
               );



//builder.Services.AddAuthorization( aut =>
//aut.AddPolicy("PolicyRoll", pol =>pol.Requirements.Add(new RolPolicy()))
//);






//Swagger
builder.Services.AddSwaggerGen(c =>
{ //<-- NOTE 'Add' instead of 'Configure'
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API",
        Version = "v1"
    });



});

//Inject
builder.Services.AddSingleton<IAuthorizationHandler, PolicyRolHandler>();
builder.Services.AddSingleton<IClaims, ClaimsService>();
builder.Services.AddSingleton<ILogin, LoginService>();


builder.Services.AddSingleton<IMail, Mail>();
builder.Services.AddSingleton<IAutorizacionService, AutorizacionService>();

//builder.Services.AddSingleton<ISql, Sql>();
//builder.Services.AddSingleton<ISqlModelSearch<tblProduct>, SqlSearchProduct>();


//Util{
builder.Services.AddSingleton<ProductUtil>();
builder.Services.AddSingleton<IUtilRegister, UtilRegister>();
builder.Services.AddSingleton<IChatUtil, ChatUtil>();


//Extra
builder.Services.AddSingleton<IExtraDriverInterface, ExtraDriverService>();


//CRUD SQL
builder.Services.AddSingleton<IProductService, ProductService>();
builder.Services.AddSingleton<ICompany, CompanyService>();
builder.Services.AddSingleton<IProject, ProjectService>();
builder.Services.AddSingleton<IUser, UserService>();
builder.Services.AddSingleton<IBuyCustomer, BuyCustomerService>();
builder.Services.AddSingleton<IPagesService, PagesService>();
builder.Services.AddSingleton<IRolUser, RolUser>();




builder.Services.AddSingleton<ISqlModelUser<tblUser>, SqlCRUDUser>();
builder.Services.AddSingleton<ISqlModelProduct<tblProduct>, SqlCRUDProduct>();
builder.Services.AddSingleton<ISqlModelProject<tblProject>, SqlCRUDProject>();
builder.Services.AddSingleton<ISqlModelCompany<tblCompany>, SqlCRUDCompany>();
builder.Services.AddSingleton<ISqlModelChat<tblChatBotMsg>, SqlCRUDChat>();
builder.Services.AddSingleton<ISqlModelRolUser<tblRol>, SqlCRUDRolUser>();



builder.Services.AddSingleton<ISqlModelBuyCutomer<tblBuyerCustomer>, SqlCRUDBuyCustomer>();


builder.Services.AddSingleton<ISqlModelConcept<tblConcepValue>, SqlCRUDConcept>();


builder.Services.AddSingleton<IDataAnalysisService, DataAnalysisService>();

builder.Services.AddSingleton<IHubNotification, HubNotification>();



builder.Services.AddSingleton<IFileProductUpload, FileProductUpload>();

//builder.Services.AddSingleton<ISqlSearch<tblConcepValue>, SqlCRUDConcept>();


//builder.Services.AddSingleton<IConcept, ConceptService>();



//builder.Services.AddSingleton<ISqlSearch<tblConcepValue>, SqlCRUDConcept>();

builder.Services.AddSingleton<ISqlSearch<tblProduct>, SqlCRUDSearchProduct>();


builder.Services.AddSingleton<ISqlModelLogin<tblUser>, SqlSecurity>();


builder.Services.AddSingleton<IProductService, ProductService>();
builder.Services.AddSingleton<IRegister, RegisterService>();
builder.Services.AddSingleton<IKeyValidation, KeyValidationService>();



//CRUD SERVICE
builder.Services.AddSingleton<IConcept, ConceptService>();
builder.Services.AddSingleton<IUserValidationUser, UserValidationUser>();
builder.Services.AddTransient<IJWTAutentication, JWTAutentication>();
builder.Services.AddSingleton<IProducSearch, IProductSearchService>();



//Cart
builder.Services.AddSingleton<IUtilCarCustomerService, UtilCarCustomerService>();//
builder.Services.AddSingleton<ICartCustomer, CartCustomerService>();
builder.Services.AddSingleton<ISqlModelCarCutomer<tblBuyerCustomer>, SqlCRUDCarCustomer>();

 
//Favorites
builder.Services.AddSingleton<IFavoriteCustomer, FavoriteCustomerService>();
builder.Services.AddSingleton<ISqlModelFavoriteCutomer<tblBuyerCustomer>, SqlCRUDFavoriteCustomer>();
builder.Services.AddSingleton<IUtilFavoriteCustomerService, UtilFavoriteCustomerService>();




builder.Services.AddSingleton<IQuestionIA, QuestionIAService>();
builder.Services.AddSingleton<IDowLoaderVideoInterface, DowLoaderVideoService>();


//IA
builder.Services.AddSingleton<IPredictionProductName, PredictionProductName>();
builder.Services.AddSingleton<INotification, NotificationService>();
builder.Services.AddSingleton<IBuyCustomerUtil, BuyCustomerUtil>();



//Util
builder.Services.AddSingleton<IProductUtil, ProductUtil>();


//UtilRegister
builder.Services.AddSingleton<IUtilNotificationRegister, UtilNotificationRegister>();



builder.Services.AddSingleton<IChatIA, ChatIA>();
builder.Services.AddSingleton<IChat, ChatService>();
builder.Services.AddSingleton<IChatMsgBotIA, ChatBotIA>();
builder.Services.AddSingleton<IStorageTemp, StorageTemp>();
//Admin



//Refer Product
builder.Services.AddSingleton<ITblReferProduct, ReferProductService>();
builder.Services.AddSingleton<ISqlTblReferProduct<tblReferProduct>, SqlCRUDReferProduct>();
 


//builder.Services.AddSingleton<RequestLogsInterface, RequestLogService>();




//builder.WithOrigins("https://localhost:44462") // Reemplaza esto con el origen de tu aplicación

//builder.AllowAnyOrigin()
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
                       .AllowAnyHeader();
    });
});


//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(name: "AllowAll2", builder =>
//    {
//        builder.WithOrigins("https://localhost:44462")
//            .AllowAnyMethod()
//            .AllowAnyHeader()
//            .AllowCredentials();
//    });
//});



//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(name: "AllowAll", builder =>
//    {
//        builder.AllowAnyOrigin()
//            .AllowAnyMethod()
//                       .AllowAnyHeader();
//    });
//});


builder.Services.AddSignalR(option =>
{
    option.EnableDetailedErrors = true;
});


var app = builder.Build();

app.UseStaticFiles();
app.UseCors("AllowAll");







// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    //  app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{

    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API de prueba V1");

});


app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();


app.UseHttpsRedirection();



app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action}");

app.MapHub<HubNotification>("/Hub");

app.MapFallbackToFile("index.html");

app.Run();
