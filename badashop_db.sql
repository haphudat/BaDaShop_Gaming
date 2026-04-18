/*
 Navicat Premium Dump SQL

 Source Server         : badashop
 Source Server Type    : MySQL
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : badashop_db

 Target Server Type    : MySQL
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 17/04/2026 22:42:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` double NULL DEFAULT NULL,
  `brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `stock` int NULL DEFAULT NULL,
  `specs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 76 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES (1, 'tai nghe', '/images/tainghe/tainghe01.png', 'Tai nghe Logitech G331', 890000, 'Logitech', 'Âm thanh tốt, giá hợp lý', 15, 'Nhẹ\\nStereo\\nJack 3.5mm');
INSERT INTO `products` VALUES (2, 'tai nghe', '/images/tainghe/tainghe02.png\n', 'Tai nghe Logitech G Pro X', 2900000, 'Logitech', 'Tai nghe chuyên game thủ', 8, 'DTS 7.1\\nMic rời\\nBlue Voice');
INSERT INTO `products` VALUES (3, 'tai nghe', '/images/tainghe/tainghe03\n.png', 'Tai nghe Razer Kraken X', 990000, 'Razer', 'Nhẹ, đeo lâu không đau', 20, '250g\\n7.1 Surround\\n3.5mm');
INSERT INTO `products` VALUES (4, 'tai nghe', '/images/tainghe/tainghe04\n.png', 'Tai nghe Razer BlackShark V2', 2490000, 'Razer', 'Âm thanh chi tiết cao', 10, 'THX Audio\\nMic rời\\nUSB');
INSERT INTO `products` VALUES (5, 'tai nghe', '/images/tainghe/tainghe05\n.png', 'Tai nghe HyperX Cloud II', 2100000, 'HyperX', 'Huyền thoại gaming', 12, '7.1\\nMemory Foam\\nUSB');
INSERT INTO `products` VALUES (6, 'tai nghe', '/images/tainghe/tainghe06.png', 'Tai nghe HyperX Cloud Stinger', 990000, 'HyperX', 'Giá rẻ, nhẹ', 18, '275g\\nMic xoay\\n3.5mm');
INSERT INTO `products` VALUES (7, 'tai nghe', '/images/tainghe/tainghe07\n.png', 'Tai nghe SteelSeries Arctis 1', 1500000, 'SteelSeries', 'Đa nền tảng', 9, 'Discord Cert\\nMic rời\\n3.5mm');
INSERT INTO `products` VALUES (8, 'tai nghe', '/images/tainghe/tainghe08\n.png', 'Tai nghe SteelSeries Arctis 7', 4200000, 'SteelSeries', 'Không dây cao cấp', 6, 'Wireless\\nDTS\\n24h pin');
INSERT INTO `products` VALUES (9, 'tai nghe', '/images/tainghe/tainghe09\n.png', 'Tai nghe Corsair HS50 Pro', 1200000, 'Corsair', 'Bền, âm rõ', 14, 'Stereo\\nMic rời\\n3.5mm');
INSERT INTO `products` VALUES (10, 'tai nghe', '/images/tainghe/tainghe10\n.png', 'Tai nghe Corsair Void RGB', 2900000, 'Corsair', 'RGB đẹp, không dây', 7, 'RGB\\nWireless\\n7.1');
INSERT INTO `products` VALUES (11, 'tai nghe', '/images/tainghe/tainghe11\n.png', 'Tai nghe Asus TUF H3', 1300000, 'Asus', 'Bền chuẩn quân đội', 11, '7.1\\nNhẹ\\n3.5mm');
INSERT INTO `products` VALUES (12, 'tai nghe', '/images/tainghe/tainghe12\n.png', 'Tai nghe Asus ROG Delta', 4500000, 'Asus', 'Cao cấp, DAC rời', 5, 'Hi-Res\\nRGB\\nUSB-C');
INSERT INTO `products` VALUES (13, 'tai nghe', '/images/tainghe/tainghe13\n.png', 'Tai nghe JBL Quantum 100', 700000, 'JBL', 'Giá rẻ, âm ổn', 25, '3.5mm\\nMic rời\\nNhẹ');
INSERT INTO `products` VALUES (14, 'tai nghe', '/images/tainghe/tainghe14\n.png', 'Tai nghe JBL Quantum 400', 2000000, 'JBL', 'USB, âm thanh vòm', 13, 'USB\\n7.1\\nRGB');
INSERT INTO `products` VALUES (15, 'tai nghe', '/images/tainghe/tainghe15.png', 'Tai nghe MSI DS502', 1100000, 'MSI', 'Giá tốt, gaming cơ bản', 16, '7.1\\nUSB\\nLED');
INSERT INTO `products` VALUES (16, 'tay cam', '/images/taycam/taycam01\n.png', 'Tay cầm Sony DualShock 4', 1200000, 'Sony', 'Tay cầm PS4 phổ biến', 15, 'Bluetooth\\nPin sạc\\nTouchpad');
INSERT INTO `products` VALUES (17, 'tay cam', '/images/taycam/taycam02\n.png', 'Tay cầm Sony DualSense PS5', 1800000, 'Sony', 'Công nghệ rung phản hồi mới ', 10, 'Adaptive Trigger\\nHaptic\\nUSB-C');
INSERT INTO `products` VALUES (18, 'tay cam', '/images/taycam/taycam03\n.png', 'Tay cầm Xbox Series X Controller', 1500000, 'Microsoft', 'Tay cầm Xbox thế hệ mới', 12, 'Bluetooth\\nErgonomic\\nUSB-C');
INSERT INTO `products` VALUES (19, 'tay cam', '/images/taycam/taycam04\n.png', 'Tay cầm Xbox One Controller', 1300000, 'Microsoft', 'Tương thích PC tốt', 14, ' Wireless\\n3.5mm Jack\\nPin AA');
INSERT INTO `products` VALUES (20, 'tay cam', '/images/taycam/taycam05\n.png', 'Tay cầm Logitech F310', 500000, 'Logitech', 'Giá rẻ, bền', 20, 'Wired\\nXInput\\nDirectInput');
INSERT INTO `products` VALUES (21, 'tay cam', '/images/taycam/taycam06\n.png', 'Tay cầm Logitech F710', 900000, 'Logitech', 'Không dây tiện lợi', 18, 'Wireless\\n2.4GHz\\nRung');
INSERT INTO `products` VALUES (22, 'tay cam', '/images/taycam/taycam07\n.png', 'Tay cầm Razer Wolverine Ultimate', 3500000, 'Razer', 'Cao cấp cho eSports', 6, 'RGB\\nNút phụ\\nWired');
INSERT INTO `products` VALUES (23, 'tay cam', '/images/taycam/taycam08\n.png', 'Tay cầm Razer Kishi', 2200000, 'Razer', 'Chơi game mobile', 9, 'USB-C\\nGập gọn\\nAndroid');
INSERT INTO `products` VALUES (24, 'tay cam', '/images/taycam/taycam09\n.png', 'Tay cầm Gamesir T4 Pro', 800000, 'GameSir', 'Giá tốt, đa nền tảng', 16, 'Bluetooth\\nRGB\\nPC/Android');
INSERT INTO `products` VALUES (25, 'tay cam', '/images/taycam/taycam10\n.png', 'Tay cầm Gamesir X2', 1500000, 'GameSir', 'Dành cho điện thoại', 11, 'USB-C\\nAndroid\\nCloud Gaming');
INSERT INTO `products` VALUES (26, 'tay cam', '/images/taycam/taycam11\n.png', 'Tay cầm 8BitDo Pro 2', 1300000, '8BitDo', 'Retro + hiện đại', 3, 'Bluetooth\\nCustom Profile\\nPC/Switch');
INSERT INTO `products` VALUES (27, 'tay cam', '/images/taycam/taycam12\n.png', 'Tay cầm 8BitDo SN30 Pro', 1000000, '8BitDo', 'Thiết kế cổ điển', 17, 'Bluetooth\\nRetro\\nSwitch/PC');
INSERT INTO `products` VALUES (28, 'tay cam', '/images/taycam/taycam13\n.png', 'Tay cầm Nintendo Switch Pro', 1700000, 'Nintendo', 'Tay cầm chính hãng Switch', 8, 'Bluetooth\\nHD Rumble\\nUSB-C');
INSERT INTO `products` VALUES (29, 'tay cam', '/images/taycam/taycam14\n.png', 'Tay cầm PowerA Enhanced Controller', 900000, 'PowerA', 'Giá rẻ cho Switch', 9, 'Wired\\nSwitch\\nNút phụ');
INSERT INTO `products` VALUES (30, 'tay cam', '/images/taycam/taycam15.png', 'Tay cầm SteelSeries Stratus Duo', 1600000, 'SteelSeries', 'Đa nền tảng, pin lâu', 10, 'Wireless\\nPC/Android\\n20h pin');
INSERT INTO `products` VALUES (31, 'ban phim', '/images/banphim/banphim01\n.png', 'Bàn phím Logitech G Pro X', 3200000, 'Logitech', 'Bàn phím cơ cao cấp cho game thủ', 8, 'Switch thay được\\nRGB\\nTKL');
INSERT INTO `products` VALUES (32, 'ban phim', '/images/banphim/banphim02\n.png', 'Bàn phím Logitech G213 Prodigy', 1200000, 'Logitech', 'Giá rẻ, chống nước', 15, 'Membrane\\nRGB\\nSpill-resistant');
INSERT INTO `products` VALUES (33, 'ban phim', '/images/banphim/banphim03\n.png', 'Bàn phím Razer BlackWidow V3', 2900000, 'Razer', 'Bàn phím cơ RGB nổi bật ', 10, 'Switch Green\\nRGB\\nUSB');
INSERT INTO `products` VALUES (34, 'ban phim', '/images/banphim/banphim04\n.png', 'Bàn phím Razer Huntsman Mini', 2800000, 'Razer', 'Nhỏ gọn 60%', 12, 'Optical Switch\\nRGB\\n60% layout');
INSERT INTO `products` VALUES (35, 'ban phim', '/images/banphim/banphim05\n.png', 'Bàn phím HyperX Alloy Core RGB', 1500000, 'HyperX', 'Bền, giá hợp lý', 14, 'Membrane\\nRGB\\nChống nước');
INSERT INTO `products` VALUES (36, 'ban phim', '/images/banphim/banphim06\n.png', 'Bàn phím HyperX Alloy FPS Pro', 2200000, 'HyperX', 'TKL chuyên FPS', 9, 'Cherry MX\\nRed LED\\nTKL');
INSERT INTO `products` VALUES (37, 'ban phim', '/images/banphim/banphim07\n.png', 'Bàn phím Corsair K55 RGB Pro', 1300000, 'Corsair', 'Giá rẻ, nhiều tính năng', 16, 'Membrane\\nRGB\\nMacro keys');
INSERT INTO `products` VALUES (38, 'ban phim', '/images/banphim/banphim08\n.png', 'Bàn phím Corsair K70 RGB MK.2', 3900000, 'Corsair', 'Cao cấp, build chắc chắn', 6, 'Cherry MX\\nRGB\\nAluminum frame');
INSERT INTO `products` VALUES (39, 'ban phim', '/images/banphim/banphim09\n.png', 'Bàn phím SteelSeries Apex 3', 1400000, 'SteelSeries', 'Chống nước tốt', 13, 'Membrane\\nRGB\\nIP32');
INSERT INTO `products` VALUES (40, 'ban phim', '/images/banphim/banphim10.png', 'Bàn phím ASUS ROG Strix Scope', 3000000, 'ASUS', 'Thiết kế gaming mạnh mẽ', 7, 'Cherry MX\\nRGB\\nFullsize');
INSERT INTO `products` VALUES (41, 'chuot', '/images/chuot/chuot01\n.png', 'Chuột Logitech G102 Lightsync', 400000, 'Logitech', 'Chuột gaming quốc dân, giá rẻ', 20, '8000 DPI\\nRGB\\n6 nút');
INSERT INTO `products` VALUES (42, 'chuot', '/images/chuot/chuot02\n.png', 'Chuột Logitech G304 Lightspeed', 900000, 'Logitech', 'Không dây, pin lâu', 15, 'Wireless\\n12000 DPI\\n250h pin');
INSERT INTO `products` VALUES (43, 'chuot', '/images/chuot/chuot03\n.png', 'Chuột Razer DeathAdder Essential', 700000, 'Razer', 'Form công thái học', 18, '6400 DPI\\nErgonomic\\nLED xanh');
INSERT INTO `products` VALUES (44, 'chuot', '/images/chuot/chuot04\n.png', 'Chuột Razer DeathAdder V2', 1500000, 'Razer', 'Hiệu năng cao, FPS', 0, '20000 DPI\\nOptical Switch\\nRGB');
INSERT INTO `products` VALUES (45, 'chuot', '/images/chuot/chuot05\n.png', 'Chuột Razer Basilisk Essential', 1100000, 'Razer', 'Nút sniper tiện lợi', 12, '6400 DPI\\n7 nút\\nErgonomic');
INSERT INTO `products` VALUES (46, 'chuot', '/images/chuot/chuot06\n.png', 'Chuột HyperX Pulsefire Core', 800000, 'HyperX', 'Bền, giá hợp lý', 17, '6200 DPI\\nRGB\\nPixart sensor');
INSERT INTO `products` VALUES (47, 'chuot', '/images/chuot/chuot07\n.png', 'Chuột HyperX Pulsefire Haste', 1300000, 'HyperX', 'Siêu nhẹ, FPS', 11, '59g\\n16000 DPI\\nHoneycomb');
INSERT INTO `products` VALUES (48, 'chuot', '/images/chuot/chuot08\n.png', 'Chuột SteelSeries Rival 3', 900000, 'SteelSeries', 'Nhẹ, tracking tốt', 14, '8500 DPI\\nRGB\\nTrueMove Core');
INSERT INTO `products` VALUES (49, 'chuot', '/images/chuot/chuot09\n.png', 'Chuột Corsair M55 RGB Pro', 800000, 'Corsair', 'Đối xứng, đa dụng', 16, '12400 DPI\\nRGB\\nAmbidextrous');
INSERT INTO `products` VALUES (50, 'chuot', '/images/chuot/chuot10.png', 'Chuột ASUS TUF M3', 600000, 'ASUS', 'Bền chuẩn gaming', 19, '7000 DPI\\nRGB\\nIP42');
INSERT INTO `products` VALUES (51, 'man hinh', '/images/manhinh/manhinh01\n.png', 'Màn hình AOC C24G1 24 inch', 3200000, 'AOC', 'Màn hình cong gaming giá tốt', 12, '24\"\\n144Hz\\n1ms\\nVA\\nFreeSync');
INSERT INTO `products` VALUES (52, 'man hinh', '/images/manhinh/manhinh02\n.png', 'Màn hình ViewSonic XG2405', 3000000, 'ViewSonic', 'IPS, màu đẹp, gaming ổn định', 10, '24\"\\n144Hz\\n1ms\\nIPS\\nFreeSync');
INSERT INTO `products` VALUES (53, 'man hinh', '/images/manhinh/manhinh03.png\n', 'Màn hình LG UltraGear 24GN65R-B', 3200000, 'LG           ', 'Gaming mượt, phổ biến', 4, '24\"\\n144Hz\\n1ms\\nIPS\\nHDR10');
INSERT INTO `products` VALUES (54, 'man hinh', '/images/manhinh/manhinh04\n.png', 'Màn hình Xiaomi G27i', 3200000, 'Xiaomi       ', '2K, cong, gaming cao cấp', 9, '27\"\\n165Hz\\n1ms\\nIPS\\nFreeSync');
INSERT INTO `products` VALUES (55, 'man hinh', '/images/manhinh/manhinh05\n.png', 'Màn hình Samsung Odyssey G5', 4900000, 'Samsung      ', 'Màn cong, tần số cao', 7, '27\"\\n165Hz\\n1ms\\nQHD\\nVA');
INSERT INTO `products` VALUES (56, 'man hinh', '/images/manhinh/manhinh05\n.png', 'Màn hình Gigabyte G27FC', 3300000, 'Gigabyte     ', 'Bền, gaming ổn định', 11, '27\"\\n165Hz\\n1ms\\nVA\\nFreeSync');
INSERT INTO `products` VALUES (57, 'man hinh', '/images/manhinh/manhinh07\n.png', 'Màn hình ASUS TUF VG249Q', 2900000, 'ASUS         ', 'Màn cong, màu sắc tốt', 3, '24\"\\n144Hz\\n1ms\\nIPS\\nAdaptive Sync');
INSERT INTO `products` VALUES (58, 'man hinh', '/images/manhinh/manhinh08\n.png', 'Màn hình MSI Optix MAG241C', 3500000, 'MSI          ', 'IPS, gaming mượt', 8, '24\"\\n144Hz\\n1ms\\nVA\\nFreeSync');
INSERT INTO `products` VALUES (59, 'man hinh', '/images/manhinh/manhinh09\n.png', 'Màn hình HP X24ih', 3500000, 'HP           ', '27 inch cong, 165Hz', 10, '24\"\\n144Hz\\n1ms\\nIPS\\nFreeSync');
INSERT INTO `products` VALUES (60, 'man hinh', '/images/manhinh/manhinh10.png', 'Màn hình Lenovo G27-c10', 4700000, 'Lenovo       ', 'Giá tốt, 165Hz', 6, '27\"\\n165Hz\\n1ms\\nVA\\nCurved ');
INSERT INTO `products` VALUES (61, 'ghe', '/images/ghe/ghe01\n.png', 'Ghế DXRacer Formula Series F101', 5990000, 'DXRacer', 'Ghế gaming cao cấp, công thái học', 5, 'Ngả lưng\\nGối cổ\\nKhung thép');
INSERT INTO `products` VALUES (62, 'ghe', '/images/ghe/ghe02\n.png', 'Ghế Cougar Armor Gaming Chair ', 9990000, 'Cougar', 'Ghế cao cấp, thiết kế mạnh mẽ', 4, 'Da PU\\nNgả 180°\\nTay 4D');
INSERT INTO `products` VALUES (63, 'ghe', '/images/ghe/ghe03\n.png', 'Ghế Alpha Gamer Orion V2', 4990000, 'Alpha Gamer', 'Ghế tầm trung, thiết kế đẹp', 7, 'Ngả lưng\\nGối lưng\\nKhung kim loại');
INSERT INTO `products` VALUES (64, 'ghe', '/images/ghe/ghe04\n.png', 'Ghế Alpha Gamer Polaris Racing', 1990000, 'Alpha Gamer', 'Giá rẻ, phù hợp sinh viên', 12, 'Da PU\\nNgả nhẹ\\nĐệm êm');
INSERT INTO `products` VALUES (65, 'ghe', '/images/ghe/ghe05.png', 'Ghế Secretlab Titan Evo 2022', 12000000, 'Secretlab', 'Ghế cao cấp top đầu thị trường', 3, 'Memory foam\\nTay 4D\\nErgonomic');
INSERT INTO `products` VALUES (66, 'phu kien', '/images/phukien/phukien01\n.png', 'Lót chuột RGB XXL', 350000, 'Generic      ', 'Lót chuột lớn, có LED RGB', 20, 'XXL\\nRGB\\nChống trượt');
INSERT INTO `products` VALUES (67, 'phu kien', '/images/phukien/phukien02\n.png', 'Mouse Bungee Razer', 600000, 'Razer        ', 'Giữ dây chuột gọn gàng', 15, 'Chống rối dây\\nĐế nặng\\nỔn định');
INSERT INTO `products` VALUES (68, 'phu kien', '/images/phukien/phukien03\n.png', 'Giá treo tai nghe RGB Kafri', 600000, 'Kafri        ', 'Treo tai nghe + LED RGB', 10, 'RGB\\nUSB Hub\\nChống trượt');
INSERT INTO `products` VALUES (69, 'phu kien', '/images/phukien/phukien04\n.png', 'Hub USB gaming 4 cổng', 300000, 'Ugreen       ', 'Mở rộng cổng kết nối', 18, '4 cổng USB\\nPlug & Play');
INSERT INTO `products` VALUES (70, 'phu kien', '/images/phukien/phukien05\n.png', 'Đế sạc tay cầm PS5 DualSense', 700000, 'Sony         ', 'Sạc nhanh tay cầm PS5', 12, 'Sạc đôi\\nUSB-C\\nDock');
INSERT INTO `products` VALUES (71, 'phu kien', '/images/phukien/phukien06\n.png', 'Giá đỡ tay cầm + tai nghe RGB', 500000, 'Generic      ', 'Setup gọn gàng, đẹp mắt', 9, 'RGB\\nNhiều móc treo\\nUSB');
INSERT INTO `products` VALUES (72, 'phu kien', '/images/phukien/phukien07\n.png', 'Đèn LED dây RGB bàn gaming', 250000, 'Xiaomi       ', ' Trang trí góc gaming ', 25, 'RGB\\nĐiều khiển\\nUSB');
INSERT INTO `products` VALUES (73, 'phu kien', '/images/phukien/phukien08\n.png', 'Quạt tản nhiệt laptop gaming', 450000, 'Cooler Master', 'Làm mát laptop khi chơi game', 14, '5 quạt\\nLED\\nUSB');
INSERT INTO `products` VALUES (74, 'phu kien', '/images/phukien/phukien09\n.png', 'Bàn di chuột có sạc không dây RGB', 1200000, 'Generic      ', 'Mousepad tích hợp sạc', 8, 'RGB\\nWireless Charging\\nXXL');
INSERT INTO `products` VALUES (75, 'phu kien', '/images/phukien/phukien10.png', 'Dock sạc Joy-Con Nintendo Switch', 600000, 'Nintendo     ', 'Sạc nhiều tay cầm cùng lúc', 11, 'Sạc 4 tay\\nUSB-C\\nLED báo');

SET FOREIGN_KEY_CHECKS = 1;
