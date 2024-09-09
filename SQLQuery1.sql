

use GoTaskServicePlus;
CREATE TABLE tblProduct (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    idCompany NVARCHAR(36),
    idProject NVARCHAR(36),
    idPrevious NVARCHAR(100),
    name NVARCHAR(100),
    code NVARCHAR(255),
    creationDate NVARCHAR(30),
    editDate NVARCHAR(30),
    inUse BIT,
    disable BIT,
    idTypeOfProduct NVARCHAR(36),
    ReferNumber NVARCHAR(50),
	availableDay NVARCHAR(100),
	status NVARCHAR(100),
	priceString NVARCHAR(100),
	prices NVARCHAR(max),
    deliveryMode NVARCHAR(100),
    quantity INT,
    interestedBuyers INT,
    negativeRating INT,
    positiveRating INT,
    countRating INT,
    actualPrice INT,
    isPublic BIT,
	imgList nvarchar(max),
	FirsImg nvarchar(max),
	adress nvarchar(max)
);


use GoTaskServicePlus;
CREATE TABLE tblConceptValue (
    id NVARCHAR(36) PRIMARY KEY,
    idCompany UNIQUEIDENTIFIER,
    idProject UNIQUEIDENTIFIER,
    idPrevious NVARCHAR(36),
    name NVARCHAR(100),
    code NVARCHAR(100),
    creationDate NVARCHAR(50),
    editDate NVARCHAR(50),
    inUse BIT,
    disable BIT,
    value NVARCHAR(100),
    type NVARCHAR(100)
);






CREATE TABLE Characteristics (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    idCompany UNIQUEIDENTIFIER,
    idProject UNIQUEIDENTIFIER,
    idPrevious NVARCHAR(255),
    name NVARCHAR(255),
    code NVARCHAR(255),
    creationDate NVARCHAR(255),
    editDate NVARCHAR(255),
    inUse BIT,
    disable BIT,
    color NVARCHAR(255),
    height INT,
    width INT,
    long INT,
    weight INT,
    title NVARCHAR(255),
    description NVARCHAR(MAX),
    aditional NVARCHAR(MAX),
    productId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES tblProduct(id)
);



CREATE TABLE TypeOfProduct (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    idCompany UNIQUEIDENTIFIER,
    idProject UNIQUEIDENTIFIER,
    idPrevious NVARCHAR(255),
    name NVARCHAR(255),
    code NVARCHAR(255),
    creationDate NVARCHAR(255),
    editDate NVARCHAR(255),
    inUse BIT,
    disable BIT,
    typeConceptValue NVARCHAR(255),
    typeValue NVARCHAR(255),
    isPublic BIT,
    value INT,
    description INT,
    productId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES ProductInfo(id)
);








use GoTaskServicePlus;
create table tblRol(
Id nvarchar(36) primary key, 
IdPrevious nvarchar(36), 
IdCompany  nvarchar(36), 
IdProject nvarchar(36),
Name	 nvarchar(50) DEFAULT '',
Code	 nvarchar(50) DEFAULT '',
Img	 nvarchar(70) DEFAULT '',
OrderQuantity int DEFAULT 0,
CreationDate varchar(50),
PermissionByRoll  nvarchar(MAX) DEFAULT '',
)


use GoTaskServicePlus;
create table tblUser(
Id nvarchar(36) primary key,
IdPrevious nvarchar(36), 
IdCompany  nvarchar(36), 
IdProject nvarchar(36),
IdRol nvarchar(36),
Disable nvarchar(6), 
Name nvarchar(100) DEFAULT '',
ImgList	 nvarchar(MAX) DEFAULT '' ,
CreationDate varchar(50),
RolUserId nvarchar(50),
Password nvarchar(50) ,
KeyPassword nvarchar(50),
Email nvarchar(MAX),
MobileNumber nvarchar(50) DEFAULT  0,
StatusRegister int DEFAULT 0,
ListMyLikes  nvarchar(MAX) DEFAULT '',
ListFavorites  nvarchar(MAX) DEFAULT '',
AddressList  nvarchar(MAX) DEFAULT '',
RolUserActive nvarchar(MAX) DEFAULT '',
RolUser nvarchar(MAX) DEFAULT '',
Code nvarchar(50) DEFAULT '',
constraint  fr_rol foreign key(IdRol)  references  tblRol(Id)
)




CREATE PROCEDURE InsertProduct
    @Id UNIQUEIDENTIFIER,
    @Disable BIT,
    @IdPrevious NVARCHAR(255),
    @Name NVARCHAR(255),
    @InUse BIT,
    @IdCompany UNIQUEIDENTIFIER,
    @IdProject UNIQUEIDENTIFIER,
    @Code NVARCHAR(255),
    @CreationDate NVARCHAR(255),
    @EditDate NVARCHAR(255),
    @ReferNumber NVARCHAR(255),
    @Color NVARCHAR(255),
    @Height INT,
    @Width INT,
    @Long INT,
    @Weight INT,
    @Quantity INT,
    @IsActive BIT,
    @Qualification INT,
    @PriceUnid INT,
    @DeliveryMode NVARCHAR(255),
    @TypeCurrencyId UNIQUEIDENTIFIER
AS
BEGIN
    -- Verificar si ya existe un registro con el mismo Id
    IF NOT EXISTS (SELECT 1 FROM tblProduct WHERE Id = @Id)
    BEGIN
        -- Insertar el nuevo registro
        INSERT INTO tblProduct (
            Id, Disable, IdPrevious, Name, InUse, IdCompany, IdProject, Code,
            CreationDate, EditDate, ReferNumber, Color, Height, Width, Long, Weight,
            Quantity, IsActive, Qualification, PriceUnid, DeliveryMode, TypeCurrencyId
        )
        VALUES (
            @Id, @Disable, @IdPrevious, @Name, @InUse, @IdCompany, @IdProject, @Code,
            @CreationDate, @EditDate, @ReferNumber, @Color, @Height, @Width, @Long, @Weight,
            @Quantity, @IsActive, @Qualification, @PriceUnid, @DeliveryMode, @TypeCurrencyId
        );
        
        PRINT 'Registro insertado correctamente.';
    END
    ELSE
    BEGIN
        PRINT 'Ya existe un registro con el mismo Id. La inserción no se ha realizado.';
    END
END;
