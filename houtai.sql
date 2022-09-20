/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 50529
 Source Host           : localhost:3306
 Source Schema         : houtai

 Target Server Type    : MySQL
 Target Server Version : 50529
 File Encoding         : 65001

 Date: 14/09/2022 19:52:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for antiaddictioninfo
-- ----------------------------
DROP TABLE IF EXISTS `antiaddictioninfo`;
CREATE TABLE `antiaddictioninfo`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色账号',
  `startOnlineTime` int(10) NULL DEFAULT NULL COMMENT '开始在线时间',
  `onlineTime` int(10) NULL DEFAULT NULL COMMENT '累计在线时间',
  `leftTime` int(10) NULL DEFAULT NULL COMMENT '累计离线时长',
  `lastLogoutTime` int(10) NULL DEFAULT NULL COMMENT '最后一次离线时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `u_openid`(`openid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of antiaddictioninfo
-- ----------------------------
INSERT INTO `antiaddictioninfo` VALUES (1, '111', 1657552103, 1814, 17105, 1657552617);

-- ----------------------------
-- Table structure for globaldata
-- ----------------------------
DROP TABLE IF EXISTS `globaldata`;
CREATE TABLE `globaldata`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `type` int(10) NULL DEFAULT NULL COMMENT '系统类型',
  `content` mediumblob NULL COMMENT '数据',
  `insertTime` int(10) NULL DEFAULT NULL COMMENT '插入时间',
  `invalidTime` int(10) NULL DEFAULT NULL COMMENT '过期时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 110 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of globaldata
-- ----------------------------
INSERT INTO `globaldata` VALUES (3, 3, '', 0, 0);
INSERT INTO `globaldata` VALUES (19, 19, '', 0, 0);
INSERT INTO `globaldata` VALUES (22, 22, '', 0, 0);
INSERT INTO `globaldata` VALUES (23, 23, '', 0, 0);
INSERT INTO `globaldata` VALUES (26, 26, 0x323032322D30372D31312031363A33303A3538, 0, 0);
INSERT INTO `globaldata` VALUES (31, 31, '', 0, 0);
INSERT INTO `globaldata` VALUES (36, 36, '', 0, 0);
INSERT INTO `globaldata` VALUES (37, 37, '', 0, 0);
INSERT INTO `globaldata` VALUES (41, 41, '', 0, 0);
INSERT INTO `globaldata` VALUES (59, 59, '', 0, 0);
INSERT INTO `globaldata` VALUES (61, 61, '', 0, 0);
INSERT INTO `globaldata` VALUES (72, 72, '', 0, 0);
INSERT INTO `globaldata` VALUES (74, 74, '', 0, 0);
INSERT INTO `globaldata` VALUES (75, 75, '', 0, 0);
INSERT INTO `globaldata` VALUES (78, 78, '', 0, 0);
INSERT INTO `globaldata` VALUES (97, 97, '', 0, 0);
INSERT INTO `globaldata` VALUES (105, 105, '', 0, 0);
INSERT INTO `globaldata` VALUES (109, 109, '', 0, 0);

-- ----------------------------
-- Table structure for kuafufenquinfo
-- ----------------------------
DROP TABLE IF EXISTS `kuafufenquinfo`;
CREATE TABLE `kuafufenquinfo`  (
  `centralIndex` int(10) NOT NULL AUTO_INCREMENT COMMENT '中央服编号',
  `pf` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '平台号',
  `centralIp` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '域名',
  `centralPort` int(10) NULL DEFAULT NULL COMMENT '端口',
  `numRange` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '游戏服范围',
  PRIMARY KEY (`centralIndex`) USING BTREE,
  INDEX `i_centralIp`(`centralIp`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13002 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of kuafufenquinfo
-- ----------------------------
INSERT INTO `kuafufenquinfo` VALUES (13001, 'elbt01', '127.0.0.1', 12001, '12');

-- ----------------------------
-- Table structure for m_adaccount
-- ----------------------------
DROP TABLE IF EXISTS `m_adaccount`;
CREATE TABLE `m_adaccount`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `openid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色账号',
  `time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `u_openid`(`openid`) USING BTREE,
  INDEX `i_time`(`time`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of m_adaccount
-- ----------------------------

-- ----------------------------
-- Table structure for m_admark
-- ----------------------------
DROP TABLE IF EXISTS `m_admark`;
CREATE TABLE `m_admark`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色账号',
  `time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `state` int(10) NULL DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `u_openid`(`openid`) USING BTREE,
  INDEX `i_time`(`time`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of m_admark
-- ----------------------------

-- ----------------------------
-- Table structure for m_blacklist
-- ----------------------------
DROP TABLE IF EXISTS `m_blacklist`;
CREATE TABLE `m_blacklist`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色账号',
  `account` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '添加人账号',
  `time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `state` int(10) NULL DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `u_openid`(`openid`) USING BTREE,
  INDEX `i_time`(`time`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of m_blacklist
-- ----------------------------

-- ----------------------------
-- Table structure for m_cdkeydata
-- ----------------------------
DROP TABLE IF EXISTS `m_cdkeydata`;
CREATE TABLE `m_cdkeydata`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '激活码id',
  `cdkey` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '激活码',
  `type` int(10) NULL DEFAULT NULL COMMENT '激活码的类型',
  `isUsed` int(10) NULL DEFAULT NULL COMMENT '是否已被使用 0：未使用，1：已使用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of m_cdkeydata
-- ----------------------------

-- ----------------------------
-- Table structure for m_ipwhitelist
-- ----------------------------
DROP TABLE IF EXISTS `m_ipwhitelist`;
CREATE TABLE `m_ipwhitelist`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `ip` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip地址',
  `time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `state` int(10) NULL DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `u_ip`(`ip`) USING BTREE,
  INDEX `i_time`(`time`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of m_ipwhitelist
-- ----------------------------

-- ----------------------------
-- Table structure for m_oldplayer
-- ----------------------------
DROP TABLE IF EXISTS `m_oldplayer`;
CREATE TABLE `m_oldplayer`  (
  `openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色账号',
  `zoneids` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '玩家建号的区号列表',
  `createIp` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创号ip',
  PRIMARY KEY (`openid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of m_oldplayer
-- ----------------------------
INSERT INTO `m_oldplayer` VALUES ('111', '{{1,1657552103}}', '127.0.0.1');

-- ----------------------------
-- Table structure for m_rechargewhitelist
-- ----------------------------
DROP TABLE IF EXISTS `m_rechargewhitelist`;
CREATE TABLE `m_rechargewhitelist`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色账号',
  `account` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '添加人账号',
  `time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `state` int(10) NULL DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `u_openid`(`openid`) USING BTREE,
  INDEX `i_time`(`time`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of m_rechargewhitelist
-- ----------------------------

-- ----------------------------
-- Table structure for m_redlist
-- ----------------------------
DROP TABLE IF EXISTS `m_redlist`;
CREATE TABLE `m_redlist`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色账号',
  `account` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '添加人账号',
  `time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `state` int(10) NULL DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `u_openid`(`openid`) USING BTREE,
  INDEX `i_time`(`time`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of m_redlist
-- ----------------------------

-- ----------------------------
-- Table structure for m_serverinfo
-- ----------------------------
DROP TABLE IF EXISTS `m_serverinfo`;
CREATE TABLE `m_serverinfo`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `zoneid` int(10) NULL DEFAULT NULL COMMENT '区号',
  `alias` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '区服名',
  `pf` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '平台号',
  `port` int(10) NULL DEFAULT NULL COMMENT '端口',
  `houtaiport` int(10) NULL DEFAULT NULL COMMENT '后台端口',
  `rechargeport` int(10) NULL DEFAULT NULL COMMENT '充值端口',
  `ip` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip地址',
  `state` int(10) NULL DEFAULT NULL COMMENT '服务器状态',
  `dbip` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '数据库ip',
  `dbport` int(10) NULL DEFAULT NULL COMMENT '数据库端口',
  `dbname` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '数据库名称',
  `dbuser` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '数据库user',
  `dbpwd` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '数据库密码',
  `opentime` int(10) NULL DEFAULT NULL COMMENT '实际开服时间 时间戳',
  `autoopen` int(10) NULL DEFAULT NULL COMMENT '自动开服标志',
  `content` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '维护公告',
  `hefuServer` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '合服区',
  `hefuTime` int(10) NULL DEFAULT NULL COMMENT '合服时间',
  `clientversion` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '客户端版本',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `i_zoneid`(`zoneid`) USING BTREE,
  INDEX `i_pf`(`pf`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of m_serverinfo
-- ----------------------------
INSERT INTO `m_serverinfo` VALUES (1, 1, '1服', 'elbt01', 8001, 9001, 10001, '127.0.0.1', 1, '127.0.0.1', 3306, 'el01_8001', 'root', '123456', 1657444949, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for m_whitelist
-- ----------------------------
DROP TABLE IF EXISTS `m_whitelist`;
CREATE TABLE `m_whitelist`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色账号',
  `account` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '添加人账号',
  `time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `state` int(10) NULL DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `u_openid`(`openid`) USING BTREE,
  INDEX `i_time`(`time`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of m_whitelist
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
