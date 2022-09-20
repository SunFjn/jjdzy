package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_huodong_009;
public class Config_huodong_009 extends ConfigBase<Struct_huodong_009> {
    private static Config_huodong_009 ins = null;
    public static Config_huodong_009 getIns(){
        if(ins==null){
            ins = new Config_huodong_009();
        }
        return ins;
    }
    private Config_huodong_009(){
        put(115,new Struct_huodong_009(115,7601,100,7600,"合服狂欢-登录有奖","0","0",1));
        put(116,new Struct_huodong_009(116,7602,0,7600,"合服狂欢-大神送礼","0","0",1));
        put(117,new Struct_huodong_009(117,7603,0,7600,"合服狂欢-张飞醉酒","0","0",1));
        put(118,new Struct_huodong_009(118,7604,0,7600,"合服狂欢-合服首充","0","0",1));
        put(119,new Struct_huodong_009(119,7605,0,7600,"合服狂欢-充值返利","0","0",1));
        put(1,new Struct_huodong_009(1,5006,0,0,"每日首充","2018-07-12 00:00:00","2023-11-18 23:59:59",0));
        put(101,new Struct_huodong_009(101,8003,1,8003,"犒赏三军（活动）","2021-02-12 00:00:00","2021-02-25 23:59:59",0));
        put(102,new Struct_huodong_009(102,8004,2,8004,"荣誉勋章（活动）","2021-02-12 00:00:00","2021-02-25 23:59:59",0));
        put(103,new Struct_huodong_009(103,8003,3,8003,"犒赏三军（活动）","2021-02-26 00:00:00","2021-03-11 23:59:59",0));
        put(104,new Struct_huodong_009(104,8004,4,8004,"荣誉勋章（活动）","2021-02-26 00:00:00","2021-03-11 23:59:59",0));
        put(105,new Struct_huodong_009(105,8003,5,8003,"犒赏三军（活动）","2021-03-12 00:00:00","2021-03-25 23:59:59",0));
        put(106,new Struct_huodong_009(106,8004,6,8004,"荣誉勋章（活动）","2021-03-12 00:00:00","2021-03-25 23:59:59",0));
        put(201,new Struct_huodong_009(201,5010,1,5010,"每日直购","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(202,new Struct_huodong_009(202,5202,1,5201,"全民狂欢-全民BOSS","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(203,new Struct_huodong_009(203,5203,1,5201,"全民狂欢-乱世枭雄","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(204,new Struct_huodong_009(204,5204,1,5201,"全民狂欢-魔神吕布","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(205,new Struct_huodong_009(205,5205,1,5201,"全民狂欢-单刀赴会","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(206,new Struct_huodong_009(206,4610,1,4601,"材料返利","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(207,new Struct_huodong_009(207,4612,1,4601,"元宝返利","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(208,new Struct_huodong_009(208,4614,1,4601,"连续消费","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(209,new Struct_huodong_009(209,4604,1,4601,"超值转盘","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(210,new Struct_huodong_009(210,4504,1,4501,"累计充值","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(211,new Struct_huodong_009(211,4508,1,4501,"连续累充","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(212,new Struct_huodong_009(212,4506,1,4501,"超级点将","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(213,new Struct_huodong_009(213,4510,1,4501,"登录豪礼","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(214,new Struct_huodong_009(214,4514,1,4501,"单日累充","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(215,new Struct_huodong_009(215,4512,1,4501,"单笔充值","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(216,new Struct_huodong_009(216,5605,1,5601,"神将送礼","2021-02-12 00:00:00","2021-02-14 23:59:59",0));
        put(217,new Struct_huodong_009(217,5605,2,5601,"神将送礼","2021-02-16 00:00:00","2021-02-18 23:59:59",0));
        put(301,new Struct_huodong_009(301,5010,2,5010,"每日直购","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(302,new Struct_huodong_009(302,5202,2,5201,"全民狂欢-全民BOSS","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(303,new Struct_huodong_009(303,5203,2,5201,"全民狂欢-乱世枭雄","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(304,new Struct_huodong_009(304,5204,2,5201,"全民狂欢-魔神吕布","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(305,new Struct_huodong_009(305,5205,2,5201,"全民狂欢-单刀赴会","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(306,new Struct_huodong_009(306,4610,2,4601,"材料返利","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(307,new Struct_huodong_009(307,4612,2,4601,"元宝返利","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(308,new Struct_huodong_009(308,4614,2,4601,"连续消费","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(309,new Struct_huodong_009(309,4604,2,4601,"超值转盘","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(310,new Struct_huodong_009(310,4504,2,4501,"累计充值","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(311,new Struct_huodong_009(311,4508,2,4501,"连续累充","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(312,new Struct_huodong_009(312,4506,2,4501,"超级点将","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(313,new Struct_huodong_009(313,4510,2,4501,"登录豪礼","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(314,new Struct_huodong_009(314,4514,2,4501,"单日累充","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(315,new Struct_huodong_009(315,4512,2,4501,"单笔充值","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(316,new Struct_huodong_009(316,5605,3,5601,"神将送礼","2021-02-19 00:00:00","2021-02-21 23:59:59",0));
        put(317,new Struct_huodong_009(317,5605,4,5601,"神将送礼","2021-02-23 00:00:00","2021-02-25 23:59:59",0));
        put(401,new Struct_huodong_009(401,5010,3,5010,"每日直购","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(402,new Struct_huodong_009(402,5202,3,5201,"全民狂欢-全民BOSS","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(403,new Struct_huodong_009(403,5203,3,5201,"全民狂欢-乱世枭雄","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(404,new Struct_huodong_009(404,5204,3,5201,"全民狂欢-魔神吕布","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(405,new Struct_huodong_009(405,5205,3,5201,"全民狂欢-单刀赴会","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(406,new Struct_huodong_009(406,4610,3,4601,"材料返利","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(407,new Struct_huodong_009(407,4612,3,4601,"元宝返利","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(408,new Struct_huodong_009(408,4614,3,4601,"连续消费","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(409,new Struct_huodong_009(409,4604,3,4601,"超值转盘","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(410,new Struct_huodong_009(410,4504,3,4501,"累计充值","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(411,new Struct_huodong_009(411,4508,3,4501,"连续累充","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(412,new Struct_huodong_009(412,4506,3,4501,"超级点将","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(413,new Struct_huodong_009(413,4510,3,4501,"登录豪礼","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(414,new Struct_huodong_009(414,4514,3,4501,"单日累充","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(415,new Struct_huodong_009(415,4512,3,4501,"单笔充值","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(416,new Struct_huodong_009(416,5605,5,5601,"神将送礼","2021-02-26 00:00:00","2021-02-28 23:59:59",0));
        put(417,new Struct_huodong_009(417,5605,6,5601,"神将送礼","2021-03-02 00:00:00","2021-03-04 23:59:59",0));
        put(501,new Struct_huodong_009(501,5010,4,5010,"每日直购","2021-03-05 00:00:00","2021-03-11 23:59:59",0));
        put(502,new Struct_huodong_009(502,5202,4,5201,"全民狂欢-全民BOSS","2021-03-05 00:00:00","2021-03-11 23:59:59",0));
        put(503,new Struct_huodong_009(503,5203,4,5201,"全民狂欢-乱世枭雄","2021-03-05 00:00:01","2021-03-11 23:59:60",0));
        put(504,new Struct_huodong_009(504,5204,4,5201,"全民狂欢-魔神吕布","2021-03-05 00:00:02","2021-03-11 23:59:61",0));
        put(505,new Struct_huodong_009(505,5205,4,5201,"全民狂欢-单刀赴会","2021-03-05 00:00:03","2021-03-11 23:59:62",0));
        put(506,new Struct_huodong_009(506,4610,4,4601,"材料返利","2021-03-05 00:00:04","2021-03-11 23:59:63",0));
        put(507,new Struct_huodong_009(507,4612,4,4601,"元宝返利","2021-03-05 00:00:05","2021-03-11 23:59:64",0));
        put(508,new Struct_huodong_009(508,4614,4,4601,"连续消费","2021-03-05 00:00:06","2021-03-11 23:59:65",0));
        put(509,new Struct_huodong_009(509,4604,4,4601,"超值转盘","2021-03-05 00:00:07","2021-03-11 23:59:66",0));
        put(510,new Struct_huodong_009(510,4504,4,4501,"累计充值","2021-03-05 00:00:08","2021-03-11 23:59:67",0));
        put(511,new Struct_huodong_009(511,4508,4,4501,"连续累充","2021-03-05 00:00:09","2021-03-11 23:59:68",0));
        put(512,new Struct_huodong_009(512,4506,4,4501,"超级点将","2021-03-05 00:00:10","2021-03-11 23:59:69",0));
        put(513,new Struct_huodong_009(513,4510,4,4501,"登录豪礼","2021-03-05 00:00:11","2021-03-11 23:59:70",0));
        put(514,new Struct_huodong_009(514,4514,4,4501,"单日累充","2021-03-05 00:00:12","2021-03-11 23:59:71",0));
        put(515,new Struct_huodong_009(515,4512,4,4501,"单笔充值","2021-03-05 00:00:13","2021-03-11 23:59:72",0));
        put(516,new Struct_huodong_009(516,5605,7,5601,"神将送礼","2021-03-05 00:00:14","2021-03-07 23:59:73",0));
        put(517,new Struct_huodong_009(517,5605,8,5601,"神将送礼","2021-03-09 00:00:15","2021-03-11 23:59:74",0));
        put(601,new Struct_huodong_009(601,5010,5,5010,"每日直购","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(602,new Struct_huodong_009(602,5202,5,5201,"全民狂欢-全民BOSS","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(603,new Struct_huodong_009(603,5203,5,5201,"全民狂欢-乱世枭雄","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(604,new Struct_huodong_009(604,5204,5,5201,"全民狂欢-魔神吕布","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(605,new Struct_huodong_009(605,5205,5,5201,"全民狂欢-单刀赴会","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(606,new Struct_huodong_009(606,4610,5,4601,"材料返利","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(607,new Struct_huodong_009(607,4612,5,4601,"元宝返利","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(608,new Struct_huodong_009(608,4614,5,4601,"连续消费","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(609,new Struct_huodong_009(609,4604,5,4601,"超值转盘","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(610,new Struct_huodong_009(610,4504,5,4501,"累计充值","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(611,new Struct_huodong_009(611,4508,5,4501,"连续累充","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(612,new Struct_huodong_009(612,4506,5,4501,"超级点将","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(613,new Struct_huodong_009(613,4510,5,4501,"登录豪礼","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(614,new Struct_huodong_009(614,4514,5,4501,"单日累充","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(615,new Struct_huodong_009(615,4512,5,4501,"单笔充值","2021-03-12 00:00:00","2021-03-18 23:59:59",0));
        put(616,new Struct_huodong_009(616,5605,9,5601,"神将送礼","2021-03-12 00:00:00","2021-03-14 23:59:59",0));
        put(617,new Struct_huodong_009(617,5605,10,5601,"神将送礼","2021-03-16 00:00:00","2021-03-18 23:59:59",0));
        put(1001,new Struct_huodong_009(1001,7209,1,5701,"新活动-充值排行","2021-02-12 00:00:00","2021-02-14 23:59:59",0));
        put(1002,new Struct_huodong_009(1002,7209,2,5701,"新活动-充值排行","2021-02-15 00:00:00","2021-02-18 23:59:59",0));
        put(1003,new Struct_huodong_009(1003,7235,1,5701,"新活动-天降红包","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(1004,new Struct_huodong_009(1004,7236,1,5701,"新活动-年兽闹喜","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(1005,new Struct_huodong_009(1005,7234,1,5701,"新活动-对对联","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(1006,new Struct_huodong_009(1006,5709,1,5701,"三国庆典-累计返利","2021-02-12 00:00:00","2021-02-15 23:59:59",0));
        put(1007,new Struct_huodong_009(1007,7202,1,5701,"新活动-充值转盘","2021-02-15 00:00:00","2021-02-18 23:59:59",0));
        put(1008,new Struct_huodong_009(1008,7226,1,5701,"新活动-三国战令","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(1009,new Struct_huodong_009(1009,7237,1,5701,"新活动-金鼠送财","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(1101,new Struct_huodong_009(1101,5702,1,5701,"三国庆典-消费排行","2021-02-19 00:00:00","2021-02-21 23:59:59",0));
        put(1102,new Struct_huodong_009(1102,5702,2,5701,"三国庆典-消费排行","2021-02-22 00:00:00","2021-02-25 23:59:59",0));
        put(1103,new Struct_huodong_009(1103,7240,1,5701,"新活动-天降豪礼","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(1104,new Struct_huodong_009(1104,7207,1,5701,"新活动-首充三倍","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(1105,new Struct_huodong_009(1105,7246,1,5701,"新活动-幸运福签","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(1106,new Struct_huodong_009(1106,5709,2,5701,"三国庆典-累计返利","2021-02-19 00:00:00","2021-02-21 23:59:59",0));
        put(1107,new Struct_huodong_009(1107,7202,2,5701,"新活动-充值转盘","2021-02-22 00:00:00","2021-02-25 23:59:59",0));
        put(1108,new Struct_huodong_009(1108,7203,1,5701,"新活动-曹操来袭","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(1109,new Struct_huodong_009(1109,7229,1,5701,"新活动-节日商城","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(1110,new Struct_huodong_009(1110,7213,1,5701,"新活动-双倍掉落","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(1201,new Struct_huodong_009(1201,7209,3,5701,"新活动-充值排行","2021-02-26 00:00:00","2021-02-28 23:59:59",0));
        put(1202,new Struct_huodong_009(1202,7209,4,5701,"新活动-充值排行","2021-03-01 00:00:00","2021-03-04 23:59:59",0));
        put(1203,new Struct_huodong_009(1203,7242,1,5701,"新活动-至尊秘宝","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(1204,new Struct_huodong_009(1204,5706,1,5701,"三国庆典-活跃有礼","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(1205,new Struct_huodong_009(1205,5710,1,5701,"三国庆典-庆典商城","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(1206,new Struct_huodong_009(1206,5709,3,5701,"三国庆典-累计返利","2021-02-26 00:00:00","2021-02-28 23:59:59",0));
        put(1207,new Struct_huodong_009(1207,7202,3,5701,"新活动-充值转盘","2021-03-01 00:00:00","2021-03-04 23:59:59",0));
        put(1208,new Struct_huodong_009(1208,7226,2,5701,"新活动-三国战令","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(1209,new Struct_huodong_009(1209,7237,2,5701,"新活动-金鼠送财","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(1301,new Struct_huodong_009(1301,5702,3,5701,"三国庆典-消费排行","2021-03-05 00:00:00","2021-03-07 23:59:59",0));
        put(1302,new Struct_huodong_009(1302,5702,4,5701,"三国庆典-消费排行","2021-03-08 00:00:00","2021-03-11 23:59:59",0));
        put(1303,new Struct_huodong_009(1303,5707,1,5701,"三国庆典-登录送礼","2021-03-05 00:00:00","2021-03-11 23:59:59",0));
        put(1304,new Struct_huodong_009(1304,7207,1,5701,"新活动-首充三倍","2021-03-05 00:00:00","2021-03-11 23:59:59",0));
        put(1305,new Struct_huodong_009(1305,5704,1,5701,"三国庆典-庆典基金","2021-03-05 00:00:00","2021-03-11 23:59:59",0));
        put(1306,new Struct_huodong_009(1306,5709,4,5701,"三国庆典-累计返利","2021-03-05 00:00:00","2021-03-07 23:59:59",0));
        put(1307,new Struct_huodong_009(1307,7202,4,5701,"新活动-充值转盘","2021-03-08 00:00:00","2021-03-11 23:59:59",0));
        put(1308,new Struct_huodong_009(1308,5705,1,5701,"三国庆典-豪礼转盘","2021-03-05 00:00:00","2021-03-11 23:59:59",0));
        put(1309,new Struct_huodong_009(1309,5703,1,5701,"三国庆典-豪礼兑换","2021-03-05 00:00:00","2021-03-11 23:59:59",0));
        put(1310,new Struct_huodong_009(1310,7213,1,5701,"新活动-双倍掉落","2021-03-05 00:00:00","2021-03-11 23:59:59",0));
        put(2001,new Struct_huodong_009(2001,7212,1,7200,"新活动-限时抢购","2021-02-12 00:00:00","2021-02-12 23:59:59",0));
        put(2002,new Struct_huodong_009(2002,7212,2,7200,"新活动-限时抢购","2021-02-13 00:00:00","2021-02-13 23:59:59",0));
        put(2003,new Struct_huodong_009(2003,7212,3,7200,"新活动-限时抢购","2021-02-14 00:00:00","2021-02-14 23:59:59",0));
        put(2004,new Struct_huodong_009(2004,7212,4,7200,"新活动-限时抢购","2021-02-15 00:00:00","2021-02-15 23:59:59",0));
        put(2005,new Struct_huodong_009(2005,7245,1,7200,"新活动-武庙十哲","2021-02-12 00:00:00","2021-02-14 23:59:59",0));
        put(2006,new Struct_huodong_009(2006,7245,2,7200,"新活动-武庙十哲","2021-02-15 00:00:00","2021-02-18 23:59:59",0));
        put(2007,new Struct_huodong_009(2007,7218,1,7200,"新活动-神将现世","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(2008,new Struct_huodong_009(2008,7222,1,7200,"新活动-连续充值","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(2009,new Struct_huodong_009(2009,7201,1,7200,"新活动-单笔返利","2021-02-12 00:00:00","2021-02-18 23:59:59",0));
        put(2010,new Struct_huodong_009(2010,7225,1,7200,"新活动-全服消费","2021-02-12 00:00:00","2021-02-14 23:59:59",0));
        put(2011,new Struct_huodong_009(2011,7220,1,7200,"新活动-消费摇骰","2021-02-12 00:00:00","2021-02-14 23:59:59",0));
        put(2012,new Struct_huodong_009(2012,7224,1,7200,"新活动-幸运翻牌","2021-02-12 00:00:00","2021-02-14 23:59:59",0));
        put(2013,new Struct_huodong_009(2013,7208,1,7200,"新活动-vip折扣","2021-02-12 00:00:00","2021-02-14 23:59:59",0));
        put(2014,new Struct_huodong_009(2014,7205,1,7200,"新活动-消费转盘","2021-02-15 00:00:00","2021-02-18 23:59:59",0));
        put(2015,new Struct_huodong_009(2015,7217,1,7200,"新活动-消费砸蛋","2021-02-15 00:00:00","2021-02-18 23:59:59",0));
        put(2016,new Struct_huodong_009(2016,7204,1,7200,"新活动-三国宝藏","2021-02-15 00:00:00","2021-02-18 23:59:59",0));
        put(2101,new Struct_huodong_009(2101,7212,5,7200,"新活动-限时抢购","2021-02-19 00:00:00","2021-02-19 23:59:59",0));
        put(2102,new Struct_huodong_009(2102,7212,6,7200,"新活动-限时抢购","2021-02-20 00:00:00","2021-02-20 23:59:59",0));
        put(2103,new Struct_huodong_009(2103,7212,7,7200,"新活动-限时抢购","2021-02-21 00:00:00","2021-02-21 23:59:59",0));
        put(2104,new Struct_huodong_009(2104,7212,8,7200,"新活动-限时抢购","2021-02-22 00:00:00","2021-02-22 23:59:59",0));
        put(2105,new Struct_huodong_009(2105,7241,1,7200,"新活动-超级弹珠","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(2106,new Struct_huodong_009(2106,7244,1,7200,"新活动-貔貅散宝","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(2107,new Struct_huodong_009(2107,7243,1,7200,"新活动-刮刮乐","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(2108,new Struct_huodong_009(2108,7227,1,7200,"新活动-宝藏拼图","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(2109,new Struct_huodong_009(2109,7232,1,7200,"新活动-财神送礼","2021-02-19 00:00:00","2021-02-25 23:59:59",0));
        put(2110,new Struct_huodong_009(2110,7223,1,7200,"新活动-主题消费","2021-02-19 00:00:00","2021-02-21 23:59:59",0));
        put(2111,new Struct_huodong_009(2111,7221,1,7200,"新活动-打气球","2021-02-19 00:00:00","2021-02-21 23:59:59",0));
        put(2112,new Struct_huodong_009(2112,7224,2,7200,"新活动-幸运翻牌","2021-02-19 00:00:00","2021-02-21 23:59:59",0));
        put(2113,new Struct_huodong_009(2113,7208,2,7200,"新活动-vip折扣","2021-02-19 00:00:00","2021-02-21 23:59:59",0));
        put(2114,new Struct_huodong_009(2114,7205,2,7200,"新活动-消费转盘","2021-02-22 00:00:00","2021-02-25 23:59:59",0));
        put(2115,new Struct_huodong_009(2115,7217,2,7200,"新活动-消费砸蛋","2021-02-22 00:00:00","2021-02-25 23:59:59",0));
        put(2116,new Struct_huodong_009(2116,7204,2,7200,"新活动-三国宝藏","2021-02-22 00:00:00","2021-02-25 23:59:59",0));
        put(2201,new Struct_huodong_009(2201,7212,9,7200,"新活动-限时抢购","2021-02-26 00:00:00","2021-02-26 23:59:59",0));
        put(2202,new Struct_huodong_009(2202,7212,10,7200,"新活动-限时抢购","2021-02-27 00:00:00","2021-02-27 23:59:59",0));
        put(2203,new Struct_huodong_009(2203,7212,11,7200,"新活动-限时抢购","2021-02-28 00:00:00","2021-02-28 23:59:59",0));
        put(2204,new Struct_huodong_009(2204,7212,12,7200,"新活动-限时抢购","2021-03-01 00:00:00","2021-03-01 23:59:59",0));
        put(2205,new Struct_huodong_009(2205,7245,3,7200,"新活动-武庙十哲","2021-02-26 00:00:00","2021-02-28 23:59:59",0));
        put(2206,new Struct_huodong_009(2206,7245,4,7200,"新活动-武庙十哲","2021-03-01 00:00:00","2021-03-04 23:59:59",0));
        put(2207,new Struct_huodong_009(2207,7218,2,7200,"新活动-神将现世","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(2208,new Struct_huodong_009(2208,7222,2,7200,"新活动-连续充值","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(2209,new Struct_huodong_009(2209,7201,2,7200,"新活动-单笔返利","2021-02-26 00:00:00","2021-03-04 23:59:59",0));
        put(2210,new Struct_huodong_009(2210,7225,2,7200,"新活动-全服消费","2021-02-26 00:00:00","2021-02-28 23:59:59",0));
        put(2211,new Struct_huodong_009(2211,7220,2,7200,"新活动-消费摇骰","2021-02-26 00:00:00","2021-02-28 23:59:59",0));
        put(2212,new Struct_huodong_009(2212,7224,3,7200,"新活动-幸运翻牌","2021-02-26 00:00:00","2021-02-28 23:59:59",0));
        put(2213,new Struct_huodong_009(2213,7208,3,7200,"新活动-vip折扣","2021-02-26 00:00:00","2021-02-28 23:59:59",0));
        put(2214,new Struct_huodong_009(2214,7205,3,7200,"新活动-消费转盘","2021-03-01 00:00:00","2021-03-04 23:59:59",0));
        put(2215,new Struct_huodong_009(2215,7217,3,7200,"新活动-消费砸蛋","2021-03-01 00:00:00","2021-03-04 23:59:59",0));
        put(2216,new Struct_huodong_009(2216,7204,3,7200,"新活动-三国宝藏","2021-03-01 00:00:00","2021-03-04 23:59:59",0));
        put(2301,new Struct_huodong_009(2301,7212,13,7200,"新活动-限时抢购","2021-03-05 00:00:00","2021-03-05 23:59:59",0));
        put(2302,new Struct_huodong_009(2302,7212,14,7200,"新活动-限时抢购","2021-03-06 00:00:00","2021-03-06 23:59:59",0));
        put(2303,new Struct_huodong_009(2303,7212,15,7200,"新活动-限时抢购","2021-03-07 00:00:00","2021-03-07 23:59:59",0));
        put(2304,new Struct_huodong_009(2304,7212,16,7200,"新活动-限时抢购","2021-03-08 00:00:00","2021-03-08 23:59:59",0));
        put(2305,new Struct_huodong_009(2305,7228,1,7200,"新活动-成就树","2021-03-05 00:00:00","2021-03-11 23:59:59",0));
        put(2306,new Struct_huodong_009(2306,7233,1,7200,"新活动-幸运扭蛋","2021-03-05 00:00:00","2021-03-11 23:59:59",0));
        put(2307,new Struct_huodong_009(2307,7243,2,7200,"新活动-刮刮乐","2021-03-05 00:00:00","2021-03-11 23:59:59",0));
        put(2308,new Struct_huodong_009(2308,7227,2,7200,"新活动-宝藏拼图","2021-03-05 00:00:00","2021-03-11 23:59:59",0));
        put(2309,new Struct_huodong_009(2309,7232,2,7200,"新活动-财神送礼","2021-03-05 00:00:00","2021-03-11 23:59:59",0));
        put(2310,new Struct_huodong_009(2310,7223,2,7200,"新活动-主题消费","2021-03-05 00:00:00","2021-03-07 23:59:59",0));
        put(2311,new Struct_huodong_009(2311,7221,2,7200,"新活动-打气球","2021-03-05 00:00:00","2021-03-07 23:59:59",0));
        put(2312,new Struct_huodong_009(2312,7224,4,7200,"新活动-幸运翻牌","2021-03-05 00:00:00","2021-03-07 23:59:59",0));
        put(2313,new Struct_huodong_009(2313,7208,4,7200,"新活动-vip折扣","2021-03-05 00:00:00","2021-03-07 23:59:59",0));
        put(2314,new Struct_huodong_009(2314,7205,4,7200,"新活动-消费转盘","2021-03-08 00:00:00","2021-03-11 23:59:59",0));
        put(2315,new Struct_huodong_009(2315,7217,4,7200,"新活动-消费砸蛋","2021-03-08 00:00:00","2021-03-11 23:59:59",0));
        put(2316,new Struct_huodong_009(2316,7204,4,7200,"新活动-三国宝藏","2021-03-08 00:00:00","2021-03-11 23:59:59",0));
        put(3001,new Struct_huodong_009(3001,7238,1,7200,"新活动-擂台比武","2021-02-20 00:00:00","2021-02-21 23:59:59",0));
        put(3002,new Struct_huodong_009(3002,7214,1,7200,"新活动-鉴定排名","2021-02-20 00:00:00","2021-02-21 23:59:59",0));
        put(3003,new Struct_huodong_009(3003,7215,1,7200,"新活动-祈愿排名","2021-02-20 00:00:00","2021-02-21 23:59:59",0));
        put(3004,new Struct_huodong_009(3004,7238,2,7200,"新活动-擂台比武","2021-02-27 00:00:00","2021-02-28 23:59:59",0));
        put(3005,new Struct_huodong_009(3005,7214,2,7200,"新活动-鉴定排名","2021-02-27 00:00:00","2021-02-28 23:59:59",0));
        put(3006,new Struct_huodong_009(3006,7215,3,7200,"新活动-祈愿排名","2021-02-27 00:00:00","2021-02-28 23:59:59",0));
        put(3007,new Struct_huodong_009(3007,7238,3,7200,"新活动-擂台比武","2021-03-06 00:00:00","2021-03-07 23:59:59",0));
        put(3008,new Struct_huodong_009(3008,7214,3,7200,"新活动-鉴定排名","2021-03-06 00:00:00","2021-03-07 23:59:59",0));
        put(3009,new Struct_huodong_009(3009,7215,3,7200,"新活动-祈愿排名","2021-03-06 00:00:00","2021-03-07 23:59:59",0));
        put(3010,new Struct_huodong_009(3010,7238,4,7200,"新活动-擂台比武","2021-03-13 00:00:00","2021-03-14 23:59:59",0));
        put(3011,new Struct_huodong_009(3011,7214,4,7200,"新活动-鉴定排名","2021-03-13 00:00:00","2021-03-14 23:59:59",0));
        put(3012,new Struct_huodong_009(3012,7215,4,7200,"新活动-祈愿排名","2021-03-13 00:00:00","2021-03-14 23:59:59",0));
    }
    public void reset(){
        ins = null;
    }
}