-- MariaDB dump 10.19  Distrib 10.9.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: crazycandy
-- ------------------------------------------------------
-- Server version	10.9.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ncategoria` varchar(100) DEFAULT NULL,
  `pasilloInicio` int(11) DEFAULT NULL,
  `pasilloFin` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES
(1,'Chocolates1',5,8,1),
(2,'Chocolates',5,7,1),
(3,'Chetos',1,4,1),
(4,'Bebidas',9,11,1),
(5,'Dulces Chinos',12,14,1),
(6,'Dulces Japoneses',15,17,1),
(7,'Dulces Americanos',18,20,1),
(8,'Salsas',21,21,1),
(9,'Adornos',22,22,1),
(10,'Arreglos',23,23,1),
(11,'Postres',24,24,1),
(12,'Papas',24,24,1);
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compra` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_usuario` int(11) DEFAULT NULL,
  `ID_prov` int(11) DEFAULT NULL,
  `total` decimal(11,4) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `observaciones` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_usuario` (`ID_usuario`),
  KEY `ID_prov` (`ID_prov`),
  KEY `fecha` (`fecha`),
  CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`ID_usuario`) REFERENCES `usuario` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `compra_ibfk_3` FOREIGN KEY (`ID_prov`) REFERENCES `proveedor` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES
(2,12,2,120.6500,'2022-11-11 22:59:00','dd'),
(3,1,5,71.2500,'2022-11-11 23:47:32','suc1'),
(4,1,5,100.2250,'2022-11-11 23:48:22','suc1'),
(5,1,1,46.0750,'2022-11-11 23:51:40','w'),
(6,12,1,132.0500,'2022-11-20 14:50:10',''),
(7,15,1,28.9750,'2022-11-28 17:30:48','||||');
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra_producto`
--

DROP TABLE IF EXISTS `compra_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compra_producto` (
  `ID_prod` int(11) NOT NULL,
  `ID_comp` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precioUnitario` decimal(6,4) DEFAULT NULL,
  PRIMARY KEY (`ID_prod`,`ID_comp`),
  KEY `ID_comp` (`ID_comp`),
  CONSTRAINT `compra_producto_ibfk_1` FOREIGN KEY (`ID_prod`) REFERENCES `producto` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `compra_producto_ibfk_2` FOREIGN KEY (`ID_comp`) REFERENCES `compra` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra_producto`
--

LOCK TABLES `compra_producto` WRITE;
/*!40000 ALTER TABLE `compra_producto` DISABLE KEYS */;
INSERT INTO `compra_producto` VALUES
(1,2,3,28.9750),
(1,4,1,28.9750),
(1,5,1,28.9750),
(1,6,1,28.9750),
(1,7,1,28.9750),
(2,2,1,19.4750),
(2,6,1,19.4750),
(3,2,1,14.2500),
(4,6,4,20.9000),
(5,3,2,17.1000),
(5,4,2,17.1000),
(5,5,1,17.1000),
(6,3,3,12.3500),
(6,4,3,12.3500);
/*!40000 ALTER TABLE `compra_producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER suc_prod
AFTER INSERT ON compra_producto
FOR EACH ROW
BEGIN

DECLARE num INT;
DECLARE suc INT;
DECLARE unidad VARCHAR(5);
SELECT u.id_sucursal INTO suc FROM compra c,usuario u WHERE c.id_usuario=u.id and c.id=NEW.id_comp;
SELECT IF(p.pieza = 0,'caja','pieza') INTO unidad FROM producto p,compra_producto cp WHERE p.id=cp.id_prod and p.id=NEW.id_prod and cp.id_comp=NEW.id_comp;
SELECT count(*) tot INTO num FROM sucursal_producto WHERE id_producto=NEW.id_prod and id_sucursal=(SELECT u.id_sucursal FROM compra c,usuario u WHERE c.id_usuario=u.id and c.id=NEW.id_comp);
IF num>0 THEN 
UPDATE sucursal_producto SET existencias = existencias + NEW.cantidad WHERE id_sucursal=suc and id_producto=NEW.id_prod;
ELSE
INSERT INTO sucursal_producto(ID_sucursal,ID_producto,existencias,status,unidad) VALUES (suc,NEW.id_prod,NEW.cantidad,1,unidad);
END IF; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `detalle_venta`
--

DROP TABLE IF EXISTS `detalle_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalle_venta` (
  `ID_producto` int(11) NOT NULL,
  `ID_venta` int(11) NOT NULL,
  `pproducto` decimal(8,4) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_producto`,`ID_venta`),
  KEY `ID_venta` (`ID_venta`),
  CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`ID_producto`) REFERENCES `producto` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`ID_venta`) REFERENCES `venta` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta`
--

LOCK TABLES `detalle_venta` WRITE;
/*!40000 ALTER TABLE `detalle_venta` DISABLE KEYS */;
INSERT INTO `detalle_venta` VALUES
(1,2,30.5000,3),
(1,3,30.5000,3),
(1,4,30.5000,2),
(1,5,30.5000,1),
(1,6,30.5000,1),
(2,2,20.5000,1),
(2,3,20.5000,1),
(2,5,20.5000,1),
(3,3,15.0000,1),
(5,6,18.0000,2),
(5,7,18.0000,1),
(6,8,13.0000,1),
(36,9,1.1000,10);
/*!40000 ALTER TABLE `detalle_venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER insertDetalle
AFTER INSERT ON detalle_venta
FOR EACH ROW
BEGIN
UPDATE sucursal_producto SET existencias=existencias-NEW.cantidad 
WHERE id_sucursal = (SELECT u.id_sucursal suc FROM venta v,usuario u
WHERE v.id_usuario = u.id and v.id = NEW.id_venta) and id_producto = NEW.id_producto;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `nomcomprov`
--

DROP TABLE IF EXISTS `nomcomprov`;
/*!50001 DROP VIEW IF EXISTS `nomcomprov`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `nomcomprov` AS SELECT
 1 AS `id`,
  1 AS `nomcom` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` int(11) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `precioUnitario` decimal(8,4) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `imagen` varchar(100) DEFAULT NULL,
  `piezas` int(11) DEFAULT NULL,
  `pertenece` int(11) DEFAULT NULL,
  `pieza` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`ID`),
  KEY `categoria` (`categoria`),
  KEY `pertenece` (`pertenece`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`pertenece`) REFERENCES `producto` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES
(1,1,'Chocolate Resees','Chocolatina de chocolate con leche rellena de mantequilla de cacahuate',30.5000,0,'reeses.jpg',20,NULL,0),
(2,1,'Chocolate Ghirardelli','Clasico sabor de chocolate con leche acompañado de caramelo suave, hecho con manteca de cacao y con relleno de caramelo cremoso una combinacion unica',20.5000,1,'ghirardelli.jpg',20,NULL,0),
(3,1,'Chocolate Twix','Barra de chocolate compuesta de galleta en el centro, cubierta de caramelo y recubierta de chocolate con leche.',15.0000,1,'twix.jpg',20,NULL,0),
(4,1,'Chocolate Whoppers','Bolitas de leche malteada cubiertas por una cobertura de chocolate artificial',22.0000,1,'whoppers.png',20,36,0),
(5,1,'Chocolate Almond Joy','Cuando tu diente dulce golpea espontáneamente, hay una cosa que seguramente lo satisface: coco, almendras enteras y chocolate.',18.0000,1,'almond.jpg',20,NULL,0),
(6,3,'Cheetos Puffs','El intenso sabor a queso con una textura liviana y esponjosa. Los CHEETOS® inflados, bocadillos sabor a queso, están llenos de sabor y ¡hechos con queso de verdad!',13.0000,1,'cheetospuffs.png',20,NULL,0),
(7,3,'Cheetos Flamin Hot','Un sabor picante y especiado en un bocadillo crocante y con queso. Los CHEETOS® FLAMIN HOT® crocantes, bocadillos sabor a queso, están llenos de sabor y hechos con queso de verdad.',14.0000,1,'cheetosflamin.jpg',20,NULL,0),
(8,3,'Cheetos Crunchy','Con una bolsa de CHEETOS® crocantes, bocadillos sabor a queso, tendrás algo delicioso, con queso y crujiente para picar. Están hechos con queso de verdad para darle muchísimo más sabor.',18.4000,1,'cheetoscrunchy.jpg',20,NULL,0),
(9,3,'Cheetos XXtra Flamin Hot','El sabor extrapicante y condimentado comprimido en estos bocadillos crujientes y con queso hará que te suba la temperatura. Sentirás mucho más picor con los CHEETOS® XXTRA FLAMIN HOT® crocantes, bocadillos sabor a queso.',21.4500,1,'cheetosxxtra.jpg',20,NULL,0),
(10,3,'Cheetos PopCorn','El delicioso sabor de CHEETOS® ahora viene en el clásico bocadillo que les gusta a todos: ¡las palomitas de maíz! Traen lo que ya conoces y te encanta de los CHEETOS® originales: un rico y delicioso sabor a mucho queso. Ya están listas para salir de la bolsa, con un toque extra de diversión llena de sabor, picardía y queso.',14.3000,1,'cheetospopcorn.png',20,NULL,0),
(11,4,'Mtn Dew','Original Mountain Dew es un refresco con sabor a cítricos . El refresco es único porque incluye una pequeña cantidad de jugo de naranja. Si bien algunos han comparado a Mountain Dew con el refresco de lima-limón, es en gran medida distinto y único de ellos, y ha generado muchos imitadores propios.',17.0000,1,'mtndew.jpg',20,NULL,0),
(12,4,'Dr Pepper','Dr Pepper es un refresco carbonatado . Fue creado en la década de 1880 por el farmacéutico Charles Alderton en Waco, Texas, y se sirvió por primera vez alrededor de 1885.',12.5000,1,'drpepper.jpg',20,NULL,0),
(13,4,'Fanta Berry','Descubre este nuevo sabor de Fanta importado de los Estados Unidos. Tiene un sabor afrutado a frambuesa azul. Bebida con gas sin cafeína.',13.3000,1,'fantaberry.jpg',20,NULL,0),
(14,4,'Crush','Crush ofrece una excitante ráfaga de sabor y diversión en cada sorbo. Como el refresco de naranja original, Crush tiene una larga historia de deleitar a los consumidores con una amplia gama de sabores afrutados que complacen a la multitud.',15.4000,1,'crush.jpg',20,NULL,0),
(15,4,'Canada Dry','Refrescante bebida de color dorado con el sabor a ginger ale. Reconocida internacionalmente y con gran tradición en el mercado. Históricamente reconocida como el champagne de los refrescos.',16.8000,1,'canadadry.jpg',20,NULL,0),
(16,7,'Twizzlers','Los Twizzlers son dulces largos y retorcidos, hechos de varios ingredientes, como el jarabe de maíz, y se asemejan al regaliz.',15.5000,1,'twizzlers.jpg',20,NULL,0),
(17,7,'Nerds Gummy Clusters','Los Gummy Clusters vienen en combinación de sabores y teturas, saborizantes, crujientes, dulces, gomosos y la capacidad de tomarlo de un solo bocado. Los Rainbow Nerds rodean el centro afrutado y gomoso.',12.5000,1,'nerdsgummy.jpg',20,NULL,0),
(18,7,'Sour Patch','Sour Patch Kids gomitas dulces con polvo acidito de sabores frutales.',22.2000,1,'sourpatch.jpg',20,NULL,0),
(19,7,'Sweetarts','SweeTARTS ofrece su emocionante sacudida de sabor en una variedad de coloridas creaciones de dulces. Las cuerdas suaves y masticables SweeTARTS llevan la fusión clásica de sabor dulce y agrio un paso más allá, creando diversión flexible que es regaliz afrutado y SweeTARTS todo en uno.',15.2000,1,'sweetarts.jpg',20,NULL,0),
(20,7,'AirHeads','Festivamente gomosas, tremendamente acidulada y llena de sabor de la fruta desajustar la diversión de Airheads! ',14.0000,1,'airheads.jpg',20,NULL,0),
(21,8,'Tapatio','La salsa tiene un color rojizo vivo, con un ligero olor a picante amargo y un toque a ajo. El picante se desvanece en el paladar y queda un sabor de chile asado. Disponible. La salsa tiene un color rojizo vivo, con un ligero olor a picante amargo y un toque a ajo.',15.0000,1,'tapatio.jpg',20,NULL,0),
(22,8,'Red Hot','Adquiere tu salsa Red Hot original en su presentación de 3.78 l Es la salsa ideal para la botana en tus fiestas o reuniones con los amigos. Está conformado por los siguientes ingredientes: Chile (pimienta de cayena), vinagre, agua, sal, ajo en polvo.',11.5000,1,'redhot.jpg',20,NULL,0),
(23,8,'Sriracha','Esta salsa picante multiusos de color rojo brillante está hecha de chiles rojos, ajo, vinagre, sal y azúcar. La salsa es picante y picante con solo un toque de dulzura, lo que la distingue de las salsas picantes de la variedad de su jardín.',24.0000,1,'sriracha.jpg',20,NULL,0),
(24,8,'Bufalo','La característica de la salsa Búfalo es que es picante y está elaborada a base de vinagre y mantequilla.',21.0000,1,'bufalo.jpg',20,NULL,0),
(25,8,'Yahualica','Salsa picante producto Gourmet, chile de árbol yahualica, con denominación de origen en jalisco méxico 280 gr Mezcla perfecta de chile de árbol, ajonjolí, semillas de girasol, cacahuate tostados, aceite de oliva y un toque de ajo.',17.0000,1,'yahualica.jpg',20,NULL,0),
(26,11,'Oreo Mint','La galleta Oreo que todos hemos amado y disfrutado desde siempre, pero ahora con un nuevo y especial relleno cremoso sabor menta que fue pensado y creado especialmente para ti que buscas continuamente una manera novedosa de tener y disfrutar un snack delicioso que conserve la inigualable calidad y único sabor de las galletas Oreo',20.0000,1,'oreomint.jpg',20,NULL,0),
(27,11,'Pop Tarts','Tartas planas, rectangulares y prehorneadas hechas por la compañia Kellogg´s. Rellenas de dulce sellado entre dos capas de masa, algunas estan glaseadas y pueden comerse sin necesidad de ser calentadas.',19.0000,1,'poptarts.jpg',20,NULL,0),
(28,11,'Cosmic Brownies','Los brownies cosmicos son panesillos ultra masticables con un rico glaseado dulce que esta salpicado de chispas crujientes de arcoiris.',17.5000,1,'cosmicbrownies.jpg',20,NULL,0),
(29,11,'Chips Ahoy','¡Chips Ahoy! las galletas están llenas de chispas de chocolate horneadas en cada bocado. Están disponibles en variedades originales, masticables, gruesas, dulces y bajas en grasa. ¡Chips Ahoy! Las cookies están ampliamente disponibles en todo el mundo, en Asia, Europa, América Latina y América del Norte.',16.4500,1,'chipsahoy.jpg',20,NULL,0),
(30,11,'Oreo Cakesters','OREO Cakesters Soft Snack Cakes son un delicioso toque horneado suave en un dulce clásico. Estos bocadillos OREO se rellenan con crema entre dos pasteles de chocolate, lo que los convierte en sabrosos bocadillos dulces para todas las edades.',14.2500,1,'oreocakesters.jpg',20,NULL,0),
(31,12,'Lays Barbecue','Todo empieza con papas de campo, que se cocinan y condimentan a la perfección, y después les agregamos el dulzor picosito de la salsa BBQ para que cada LAYS® tenga una crocantes insuperable y sea deliciosa. Happiness in Every Bite.',10.5000,1,'laysbarbecue.jpg',20,NULL,0),
(32,12,'Doritos Tapatio','Bolsa de 10.7 onzas de doritos taptio con sabor a tortilla, las papas fritas crujientes y la audacia hacen que los aperitivos DORITOS sean impresionantes e ideales para tu despensa ',14.0000,1,'doritostapatio.jpg',20,NULL,0),
(33,12,'Funyuns Flamin Hot','Los aros FUNYUNS sabor a cebolla, son una botana deliciosamente diferente a cualquier otra, con una textura crujiente y un sabroso sabor.',15.0000,1,'funyuns.jpg',20,NULL,0),
(34,12,'Fritos Twists','Bolsa de fragmentos de maíz con sabor a miel para barbacoa 4,25 oz. Snacks de maíz trenzado, divertido para aperitivos.',11.0000,1,'fritostwists.jpg',20,NULL,0),
(35,12,'Pringles Cheese','No usamos cualquier sabor de queso en las papas fritas con queso cheddar Pringles. Elegimos queso cheddar, el rey de los quesos. Así que incluso podrías decir que es un sabor real. Es tan majestuosamente bueno que no querrás mencionárselo a tus amigos intolerantes a la lactosa.',17.3500,1,'pringlescheese.jpg',20,NULL,0),
(36,1,'Chocolate Whoppers (por pieza)','Bolitas de leche malteada cubiertas por una cobertura de chocolate artificial',1.1000,1,'whoppers.png',1,NULL,1);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proveedor` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_ubicacion` int(11) DEFAULT NULL,
  `nempresa` varchar(30) DEFAULT NULL,
  `nencargado` varchar(20) DEFAULT NULL,
  `appat` varchar(20) DEFAULT NULL,
  `apmat` varchar(20) DEFAULT NULL,
  `calle` varchar(100) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `telefono` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_ubicacion` (`ID_ubicacion`),
  CONSTRAINT `proveedor_ibfk_1` FOREIGN KEY (`ID_ubicacion`) REFERENCES `ubicacion` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES
(1,10,'Dulces de la Rosa','Juan','Reynoso','Higareda','Mijarez',788,'Proveedor por mayoreo.','Delarosa11@outlook.com',1,'496-996-88-77'),
(2,12,'Super sweets','Smith','White','Brady','Life',411,'Proveedor extranjero por mayoreo.','sweets12@gmail.com',1,'814-78-95-66'),
(3,15,'Dulces Japoneses','Asuna','Kiribama','Yahoko','Esencia',777,'Proveedor extranjero.','Djapon@gmail.com',1,'267-54-70-11'),
(4,14,'Dulces Chinos','Kasuto','Atoriyama','Kamazaky','Legendaria',877,'Proveedor extranjero.','Dchinos@gmail.com',1,'241-881-77-22'),
(5,13,'Tasty sweets','Tom','Staham','Freed','Shine',72,'Proveedor extranjero.','TastySweets@gmail.com',1,'805-557-44-88');
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursal`
--

DROP TABLE IF EXISTS `sucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sucursal` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_ubicacion` int(11) DEFAULT NULL,
  `calle` varchar(100) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `horarioap` time DEFAULT NULL,
  `horariocierre` time DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_1` (`ID_ubicacion`),
  CONSTRAINT `fk_1` FOREIGN KEY (`ID_ubicacion`) REFERENCES `ubicacion` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursal`
--

LOCK TABLES `sucursal` WRITE;
/*!40000 ALTER TABLE `sucursal` DISABLE KEYS */;
INSERT INTO `sucursal` VALUES
(1,11,'Av. Universidad',630,'449-145-78-95','crazyuni@gmail.com',1,'09:00:00','22:00:00'),
(2,2,'Heroes',455,'659-458-75-15','crazyheroes@gmail.com',1,'09:00:00','21:00:00'),
(3,3,'Caracas',758,'659-784-12-51','crazycaracas@gmail.com',1,'09:00:00','22:00:00'),
(4,4,'Hernan',65,'449-821-46-52','crazypancho@gmail.com',1,'09:00:00','21:00:00'),
(5,5,'Huerta',45,'449-102-30-40','crazycalvillo@gmail.com',1,'09:00:00','22:00:00'),
(6,6,'Guerreros',782,'461-758-94-42','crazymadero@gmail.com',1,'08:00:00','22:00:00'),
(7,7,'Jimenez',701,'461-654-98-12','crazyiztapalapa@gmail.com',1,'09:00:00','21:00:00'),
(8,8,'Magallanez',305,'313-513-74-20','crazymich@gmail.com',1,'08:00:00','20:00:00'),
(9,10,'Villa',145,'496-784-96-32','crazyzac@gmail.com',1,'09:00:00','21:00:00'),
(10,1,'Av. Interceptor',888,'449-872-45-98','crazyint@gmail.com',1,'09:00:00','22:00:00');
/*!40000 ALTER TABLE `sucursal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursal_producto`
--

DROP TABLE IF EXISTS `sucursal_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sucursal_producto` (
  `ID_sucursal` int(11) NOT NULL,
  `ID_producto` int(11) NOT NULL,
  `existencias` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `unidad` varchar(5) DEFAULT 'caja',
  PRIMARY KEY (`ID_sucursal`,`ID_producto`),
  KEY `ID_producto` (`ID_producto`),
  CONSTRAINT `sucursal_producto_ibfk_1` FOREIGN KEY (`ID_sucursal`) REFERENCES `sucursal` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `sucursal_producto_ibfk_2` FOREIGN KEY (`ID_producto`) REFERENCES `producto` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursal_producto`
--

LOCK TABLES `sucursal_producto` WRITE;
/*!40000 ALTER TABLE `sucursal_producto` DISABLE KEYS */;
INSERT INTO `sucursal_producto` VALUES
(1,1,0,1,'caja'),
(1,5,2,1,'caja'),
(1,6,2,1,'caja'),
(2,1,2,1,'caja'),
(2,2,1,1,'caja'),
(2,3,1,1,'caja'),
(2,4,2,1,'caja'),
(2,36,30,1,'pieza');
/*!40000 ALTER TABLE `sucursal_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ubicacion` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(30) DEFAULT NULL,
  `ciudad` varchar(30) DEFAULT NULL,
  `colonia` varchar(30) DEFAULT NULL,
  `cp` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
INSERT INTO `ubicacion` VALUES
(1,'Aguascalientes','Aguascalientes','Fatima','20130'),
(2,'Chihuahua','Chihuahua','Independencia','2000'),
(3,'Chihuahua','Ahumada','Revolución','15243'),
(4,'Aguascalientes','San pancho','Reales','79896'),
(5,'Aguascalientes','Calvillo','Rio azul','78410'),
(6,'Cd Mexico','Gustavo A. Madero','Juarez','14569'),
(7,'Cd Mexico','Iztapalapa','Zaragoza','74183'),
(8,'Michoacan','Morelia','Estudiantes','43197'),
(9,'Michoacan','Uruapan','Hidalgo','93752'),
(10,'Zacatecas','Guadalupe','Revolucion','97453'),
(11,'Aguascalientes','Aguascalientes','Sab J. Arenal','20130'),
(12,'California USA','Los Angeles','Misuri','75123'),
(13,'Minnesota USA','Minneapolis','Central ave SE','55407'),
(14,'Yuzhong China','Lanzhou','Gansu','730199'),
(15,'Nagano Japon','Sako','Nakagomi','30201');
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_sucursal` int(11) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `appat` varchar(30) DEFAULT NULL,
  `apmat` varchar(30) DEFAULT NULL,
  `privilegios` enum('administrador','vendedor','almacenista','reponedor','superadmin') DEFAULT NULL,
  `des` varchar(200) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `activo` tinyint(1) DEFAULT 0,
  `imagen` varchar(100) DEFAULT 'default.png',
  `telefono` varchar(20) DEFAULT NULL,
  `salario` decimal(12,4) DEFAULT NULL,
  `genero` char(1) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `email` (`email`),
  KEY `ID_sucursal` (`ID_sucursal`),
  KEY `fecha` (`fecha`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`ID_sucursal`) REFERENCES `sucursal` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES
(1,1,'b460b1982188f11d175f60ed670027e1afdd16558919fe47023ecd38329e0b7f','Hector','Perez','Lopez','reponedor','Tiempo completo','hect11@outlook.com',1,0,'default.png','449-789-52-45',7000.5000,'m','2022-11-10 20:36:39'),
(2,1,'e82827b00b2ca8620beb37f879778c082b292a52270390cff35b6fe3157f4e8b','Ana Maria','Reyes','Hernandez','vendedor','Tiempo medio','Mariaes@protonmail.com',1,0,'default.png','449-852-78-44',8500.0000,'f','2022-11-10 20:36:39'),
(3,1,'e1f9d22462069f21a3537f3476fa7e99665f3ca2c9d37fbfa8b755170aa8461c','Juan Carlos','Alonso','Bravo','administrador','Tiempo completo','Juka@gmail.com',1,0,'default.png','449-874-00-41',12000.0000,'m','2022-11-10 20:36:39'),
(4,1,'4d7a6ff89a07162c382478fcd35e722c01c8c85a38922726fad8c5da83472a94','Ricardo','Perez','Reynoso','almacenista','Tiempo completo','Riki@gmail.com',1,0,'default.png','449-478-08-45',8500.0000,'m','2022-11-10 20:36:39'),
(5,1,'4c4228129e6b328c10cdf678003888d6f3156ccb53615ab10f7f67c5836bb4fa','Samantha','Esparragoza','Delgado','vendedor','Tiempo completo','Sami@gmail.com',1,0,'default.png','449-144-80-78',8500.0000,'f','2022-11-10 20:36:39'),
(6,1,'ca7b3af8a2cf36f63221bb25522cea3941762c2ce006c7a694d8db783ebf9e9a','Manuel','Bravo','Cisneros','almacenista','Tiempo completo','Manue@gmail.com',1,0,'default.png','449-150-47-44',8500.0000,'m','2022-11-10 20:36:39'),
(7,1,'acba9915e924c05cf670f280f5ae516a024edf32c363d8cc342df45c78c1f077','Teresa','Villalpando','Cruz','reponedor','Tiempo completo','Tere11@outlook.com',1,0,'default.png','449-754-05-01',7000.5000,'f','2022-11-10 20:36:39'),
(8,1,'9c51b72e643cfebb5a94bd374ea8ab154fd5426637896f583742b3c13ab4970e','Kirito','Honda','Akiriyama','vendedor','Tiempo completo','Kiri56@gmail.com',1,0,'default.png','449-044-87-47',8500.0000,'m','2022-11-10 20:36:39'),
(9,1,'1d2edc8ab8d305887120870b84897272f53ddd8c3ea70819ffe1173e4ae0c8e3','Yadira','Esparza','Guzman','almacenista','Tiempo medio.','Yadi@gmail.com',1,0,'default.png','449-888-74-55',8500.0000,'f','2022-11-10 20:36:39'),
(10,1,'86bd2f8301c869acc8ba530756cb795bd080c6a809d7aa91ffd6ce7af4198722','Lolita','Reyes','Torres','vendedor','Tiempo Completo.','Lolii@gmail.com',1,0,'default.png','449-111-47-54',8500.0000,'f','2022-11-10 20:36:39'),
(11,2,'a2561a496c0cd5ee4e8c37833846f24eb6747526c6169100ea1c342b9d23e7ee','Luis Enrique','Lopez','Almada','reponedor','Tiempo completo.','Lenrique@outlook.com',1,0,'default.png','658-789-98-88',7000.5000,'m','2022-11-10 20:39:54'),
(12,2,'bdf842aec979fca4466729793bd6e09816e32cfc3c05a54910270d6c8d871171','Raul','Martinez','Contreras','administrador','Tiempo completo.','Raul115@gmail.com',1,0,'default.png','685-452-81-00',12000.0000,'m','2022-11-10 20:39:54'),
(13,2,'915ad4484089145f7d29e435b9754f0b8a1608e40ed130ee758a204f5a5f92b5','Jessica','Villalpando','Juarez','vendedor','Tiempo completo.','Jessi8@outlook.com',1,0,'default.png','685-854-11-99',8500.0000,'f','2022-11-10 20:39:54'),
(14,2,'27212e5661106b3298e28def365d758a7591cc91fb5d08cc6acd58fa02eba43b','Almendra','Rodriguez','Gutierrez','vendedor','Tiempo completo.','Alme12@gmail.com',1,0,'default.png','685-952-12-33',8500.0000,'f','2022-11-10 20:39:54'),
(15,2,'940fc061d45e7e5e5c9cd3b751cffbe002a2e04415e8d7a381657cb0982dcd49','Maria','Torres','Martinez','vendedor','Tiempo completo.','Mariii88@gmail.com',1,0,'default.png','685-981-00-20',8500.0000,'f','2022-11-10 20:39:54'),
(16,2,'8fa56ffbb5a2ddf7ac363b7a1eb80abb6e475dcb1de7fa38060585212ff33cee','Jony','Beltran','Leiva','reponedor','Tiempo completo.','jony11i@gmail.com',1,0,'default.png','685-487-30-00',7000.5000,'m','2022-11-10 20:39:54'),
(17,2,'5fffde61c0f07130b5cfd0a278f25a936378a89202bb7db876c8739c15d7d085','Felipe','Cruz','Guzman','almacenista','Tiempo completo.','Felo12@outlook.com',1,0,'default.png','685-258-16-91',8500.0000,'m','2022-11-10 20:39:54'),
(18,2,'e3de3a6dd09737341dd98ce0714ed8d23ba70d253f87b515e25f7f73cc32b8d0','Juan','Guevara','Ruiseñor','almacenista','Tiempo completo.','Juanitoalimania@gmail.com',1,0,'default.png','685-951-19-43',8500.0000,'m','2022-11-10 20:39:54'),
(19,2,'e337dd6b852d6dbce3075c376c1cba41a8bb41c9cea1ae5f8fd25a99dac161fe','Guillermo','Vazquez','Alonso','reponedor','Tiempo completo.','Guille14@outlook.com',1,0,'default.png','685-025-85-20',7000.5000,'m','2022-11-10 20:39:54'),
(20,2,'68f3717213b645c3c930949335636c6e6406cea98db7535597eff692ea8e2c42','Mabel','Magon','Hernandez','almacenista','Tiempo completo.','Mabii12@gmail.com',1,0,'default.png','685-951-03-08',8500.0000,'f','2022-11-10 20:39:54'),
(21,1,'cd8cc3acf19a191b938470c520ccab4e6b5f6b40e95cbd2b92e4a4bba73c329c','Cristiano','Ronaldo','Torres','superadmin','Tiempo Completo.','ronaldo@gmail.com',1,0,'default.png','449-111-47-54',15000.0000,'m','2022-11-12 09:30:48'),
(22,1,'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','norbit','juarez','medina','superadmin',' ','norbit@gmail.com',1,0,'default.png','448-996-41-22',1500.5000,'m','2022-11-30 22:05:20');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `venta` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_usuario` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `fechav` datetime DEFAULT NULL,
  `total` decimal(11,4) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_usuario` (`ID_usuario`),
  KEY `fecha` (`fechav`),
  CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`ID_usuario`) REFERENCES `usuario` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES
(2,12,1,'2022-11-19 00:46:49',112.0000,''),
(3,12,1,'2022-11-19 00:47:38',127.0000,''),
(4,12,1,'2022-11-19 10:27:56',61.0000,''),
(5,12,1,'2022-11-19 10:28:47',51.0000,''),
(6,1,1,'2022-11-19 10:51:11',66.5000,''),
(7,1,1,'2022-11-19 10:54:41',18.0000,''),
(8,1,1,'2022-11-19 10:54:49',13.0000,''),
(9,15,1,'2022-11-20 14:56:25',11.0000,'');
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'crazycandy'
--
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cvtotales` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cvtotales`(a CHAR(1),b INT,c CHAR(1),t CHAR(1),f1 DATE,f2 DATE,n VARCHAR(100),d INT)
BEGIN 
IF a = 'v' and c = 'g' and t = 't' THEN 
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(v.total) inversion,u.id_sucursal suc from venta v,usuario u WHERE v.id_usuario=u.id GROUP BY u.id LIMIT d,11;
ELSEIF a = 'c' and c = 'g' and t = 't' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(c.total) inversion,u.id_sucursal suc from compra c,usuario u WHERE c.id_usuario=u.id GROUP BY u.id LIMIT d,11;
ELSEIF a = 'v' and c = 'g' and t = 'f' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(v.total) inversion,u.id_sucursal suc from venta v,usuario u WHERE v.id_usuario=u.id and DATE(v.fechav) = f1 GROUP BY u.id LIMIT d,11;
ELSEIF a = 'c' and c = 'g' and t = 'f' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(c.total) inversion,u.id_sucursal suc from compra c,usuario u WHERE c.id_usuario=u.id and DATE(c.fecha) = f1 GROUP BY u.id LIMIT d,11;
ELSEIF a = 'v' and c = 'g' and t = 'r' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(v.total) inversion,u.id_sucursal suc from venta v,usuario u WHERE v.id_usuario=u.id and DATE(v.fechav) BETWEEN f1 AND f2 GROUP BY u.id LIMIT d,11;
ELSEIF a = 'c' and c = 'g' and t = 'r' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(c.total) inversion,u.id_sucursal suc from compra c,usuario u WHERE c.id_usuario=u.id and DATE(c.fecha) BETWEEN f1 AND f2 GROUP BY u.id LIMIT d,11;
ELSEIF a = 'v' and c = 'g' and t = 'n' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(v.total) inversion,u.id_sucursal suc from venta v,usuario u WHERE v.id_usuario=u.id and concat(u.nombre,u.appat,u.apmat) LIKE concat('%',n,'%') GROUP BY u.id LIMIT d,11;
ELSEIF a = 'c' and c = 'g' and t = 'n' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(c.total) inversion,u.id_sucursal suc from compra c,usuario u WHERE c.id_usuario=u.id and concat(u.nombre,u.appat,u.apmat) LIKE concat('%',n,'%') GROUP BY u.id LIMIT d,11;
ELSEIF a = 'v' and c = 's' and t = 't' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(v.total) inversion,u.id_sucursal suc from venta v,usuario u WHERE v.id_usuario=u.id and u.id_sucursal = b GROUP BY u.id LIMIT d,11; 
ELSEIF a = 'c' and c = 's' and t = 't' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(c.total) inversion,u.id_sucursal suc from compra c,usuario u WHERE c.id_usuario=u.id and u.id_sucursal = b GROUP BY u.id LIMIT d,11;
ELSEIF a = 'v' and c = 's' and t = 'f' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(v.total) inversion,u.id_sucursal suc from venta v,usuario u WHERE v.id_usuario=u.id and DATE(v.fechav) = f1 and u.id_sucursal = b GROUP BY u.id LIMIT d,11;

ELSEIF a = 'c' and c = 's' and t = 'f' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(c.total) inversion,u.id_sucursal suc from compra c,usuario u WHERE c.id_usuario=u.id and DATE(c.fecha) = f1 and u.id_sucursal = b GROUP BY u.id LIMIT d,11;
ELSEIF a = 'v' and c = 's' and t = 'r' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(v.total) inversion,u.id_sucursal suc from venta v,usuario u WHERE v.id_usuario=u.id and DATE(v.fechav) BETWEEN f1 AND f2 and u.id_sucursal = b GROUP BY u.id LIMIT d,11;

ELSEIF a = 'c' and c = 's' and t = 'r' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(c.total) inversion,u.id_sucursal suc from compra c,usuario u WHERE c.id_usuario=u.id and DATE(c.fecha) BETWEEN f1 AND f2 and u.id_sucursal = b GROUP BY u.id LIMIT d,11;

ELSEIF a = 'v' and c = 's' and t = 'n' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(v.total) inversion,u.id_sucursal suc from venta v,usuario u WHERE v.id_usuario=u.id and concat(u.nombre,u.appat,u.apmat) LIKE concat('%',n,'%') and u.id_sucursal = b GROUP BY u.id LIMIT d,11;

ELSEIF a = 'c' and c = 's' and t = 'n' THEN
SELECT concat(u.nombre,' ',u.appat,' ',u.apmat) nombre, count(*) total,sum(c.total) inversion,u.id_sucursal suc from compra c,usuario u WHERE c.id_usuario=u.id and concat(u.nombre,u.appat,u.apmat) LIKE concat('%',n,'%') and u.id_sucursal = b GROUP BY u.id LIMIT d,11;


END IF; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertPiezas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertPiezas`(IN suc INT,IN prod INT,IN exist INT,IN status BOOLEAN,IN unidad VARCHAR(5))
BEGIN
DECLARE num INT;
SELECT count(*) INTO num FROM sucursal_producto WHERE id_producto=prod and id_sucursal=suc;
IF num>0 THEN
UPDATE sucursal_producto SET existencias=existencias+exist WHERE id_producto=prod and id_sucursal=suc; 
ELSE
INSERT INTO sucursal_producto VALUES (suc,prod,exist,status,unidad);
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `obtenerProductosCompra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerProductosCompra`(IN id_compra INT)
BEGIN
SELECT c.id,p.id id_prod,p.nombre,cat.ncategoria,cp.cantidad,cp.precioUnitario precioCompra,p.precioUnitario precioVenta 
FROM compra c,compra_producto cp,producto p,categoria cat 
WHERE c.id=cp.id_comp and cp.id_prod=p.id and p.categoria=cat.id and c.id=id_compra;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reportes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reportes`(t CHAR(1),suc INT,f1 DATE,f2 DATE)
BEGIN

IF t = 'v' and suc = 0 THEN

SELECT count(*) total,u.id_sucursal s FROM venta v,usuario u WHERE v.id_usuario=u.id and DATE(v.fechav) BETWEEN f1 AND f2 GROUP BY u.id_sucursal;
ELSEIF t = 'g' and suc = 0 THEN
SELECT count(*) total,genero FROM usuario GROUP BY genero;
ELSEIF t = 'v' and suc != 0 THEN
SELECT count(*) total,id_sucursal s FROM venta v,usuario u WHERE v.id_usuario=u.id and u.id_sucursal = suc and DATE(v.fechav) BETWEEN f1 AND f2;
ELSEIF t = 'g' and suc != 0 THEN
SELECT count(*) total,genero FROM usuario WHERE id_sucursal = suc GROUP BY genero;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `nomcomprov`
--

/*!50001 DROP VIEW IF EXISTS `nomcomprov`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb3 */;
/*!50001 SET character_set_results     = utf8mb3 */;
/*!50001 SET collation_connection      = utf8mb3_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `nomcomprov` AS select `proveedor`.`ID` AS `id`,concat(`proveedor`.`nencargado`,' ',`proveedor`.`appat`,' ',`proveedor`.`apmat`) AS `nomcom` from `proveedor` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-02 18:07:42
