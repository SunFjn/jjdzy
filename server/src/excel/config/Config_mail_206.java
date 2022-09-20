package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_mail_206;
public class Config_mail_206 extends ConfigBase<Struct_mail_206> {
    private static Config_mail_206 ins = null;
    public static Config_mail_206 getIns(){
        if(ins==null){
            ins = new Config_mail_206();
        }
        return ins;
    }
    private Config_mail_206(){
        put(1,new Struct_mail_206(1,"系统"));
        put(2,new Struct_mail_206(2,"异宝奖励"));
        put(3,new Struct_mail_206(3,"活跃宝箱奖励"));
        put(4,new Struct_mail_206(4,"称号奖励"));
        put(5,new Struct_mail_206(5,"失去称号"));
        put(7,new Struct_mail_206(7,"单刀赴会晋级奖励"));
        put(8,new Struct_mail_206(8,"单刀赴会本服排名奖励"));
        put(9,new Struct_mail_206(9,"单刀赴会跨服排名奖励"));
        put(10,new Struct_mail_206(10,"单刀赴会每日奖励补发"));
        put(11,new Struct_mail_206(11,"南征北战个人排名奖励"));
        put(12,new Struct_mail_206(12,"南征北战国家排名奖励"));
        put(13,new Struct_mail_206(13,"魔神吕布最后一击奖励"));
        put(14,new Struct_mail_206(14,"魔神吕布排名奖励"));
        put(15,new Struct_mail_206(15,"膜拜奖励"));
        put(16,new Struct_mail_206(16,"竞猜成功奖励"));
        put(17,new Struct_mail_206(17,"竞猜失败奖励"));
        put(18,new Struct_mail_206(18,"七擒孟获参与奖励"));
        put(19,new Struct_mail_206(19,"七擒孟获个人排名奖励"));
        put(20,new Struct_mail_206(20,"七擒孟获国家排名奖励"));
        put(21,new Struct_mail_206(21,"七擒孟获最后一击奖励"));
        put(22,new Struct_mail_206(22,"七擒孟获伤害达标奖励"));
        put(23,new Struct_mail_206(23,"三国无双排名奖励"));
        put(24,new Struct_mail_206(24,"乱世枭雄段位奖励"));
        put(25,new Struct_mail_206(25,"乱世枭雄晋级奖励"));
        put(26,new Struct_mail_206(26,"每日首充奖励"));
        put(27,new Struct_mail_206(27,"枭雄争霸排名奖励"));
        put(28,new Struct_mail_206(28,"枭雄争霸押注胜利奖励"));
        put(29,new Struct_mail_206(29,"枭雄争霸押注失败奖励"));
        put(30,new Struct_mail_206(30,"群英榜排名奖励"));
        put(31,new Struct_mail_206(31,"补发群英榜积分奖励"));
        put(32,new Struct_mail_206(32,"武圣榜排名奖励"));
        put(33,new Struct_mail_206(33,"补发开服狂欢奖励"));
        put(34,new Struct_mail_206(34,"登录豪礼奖励"));
        put(35,new Struct_mail_206(35,"隆中对排名奖励"));
        put(36,new Struct_mail_206(36,"寻宝排名奖励"));
        put(37,new Struct_mail_206(37,"补发全民狂欢奖励"));
        put(38,new Struct_mail_206(38,"补发材料返利奖励"));
        put(39,new Struct_mail_206(39,"补发元宝返利奖励"));
        put(40,new Struct_mail_206(40,"累计充值奖励"));
        put(41,new Struct_mail_206(41,"单日累充奖励"));
        put(42,new Struct_mail_206(42,"三国战神排名奖励"));
        put(43,new Struct_mail_206(43,"将衔每日俸禄"));
        put(44,new Struct_mail_206(44,"首充奖励"));
        put(45,new Struct_mail_206(45,"签到累计奖励"));
        put(46,new Struct_mail_206(46,"晋升豪礼排名奖励"));
        put(47,new Struct_mail_206(47,"寻宝积分奖励补发"));
        put(48,new Struct_mail_206(48,"连续累充奖励"));
        put(49,new Struct_mail_206(49,"晋升豪礼目标奖励补发"));
        put(50,new Struct_mail_206(50,"单笔充值奖励"));
        put(51,new Struct_mail_206(51,"超值返利奖励"));
        put(52,new Struct_mail_206(52,"合服改名卡补偿"));
        put(53,new Struct_mail_206(53,"合服补偿"));
        put(54,new Struct_mail_206(54,"首充团购奖励"));
        put(55,new Struct_mail_206(55,"补发连续消费奖励"));
        put(56,new Struct_mail_206(56,"烽火狼烟区服排名奖励"));
        put(57,new Struct_mail_206(57,"烽火狼烟个人排名奖励"));
        put(58,new Struct_mail_206(58,"烽火狼烟MVP奖励"));
        put(59,new Struct_mail_206(59,"烽火狼烟积分奖励补发"));
        put(60,new Struct_mail_206(60,"每日直购奖励补发"));
        put(61,new Struct_mail_206(61,"寻宝区服奖励"));
        put(62,new Struct_mail_206(62,"王位争夺奖励补发"));
        put(63,new Struct_mail_206(63,"国家boss个人排名奖励"));
        put(64,new Struct_mail_206(64,"国家boss国家排名奖励"));
        put(65,new Struct_mail_206(65,"国家boss击杀奖励"));
        put(66,new Struct_mail_206(66,"庆典活动-庆典基金"));
        put(67,new Struct_mail_206(67,"消费排行"));
        put(68,new Struct_mail_206(68,"元宝返还"));
        put(69,new Struct_mail_206(69,"豪礼转盘排名奖励"));
        put(70,new Struct_mail_206(70,"活跃有礼-七擒孟获"));
        put(71,new Struct_mail_206(71,"问鼎天下-排名奖励"));
        put(72,new Struct_mail_206(72,"问鼎天下-真龙天子"));
        put(73,new Struct_mail_206(73,"问鼎天下-奖励补发"));
        put(74,new Struct_mail_206(74,"豪礼转盘目标奖励"));
        put(75,new Struct_mail_206(75,"加群有礼"));
        put(76,new Struct_mail_206(76,"周卡奖励补发"));
        put(77,new Struct_mail_206(77,"七擒孟获"));
        put(78,new Struct_mail_206(78,"奖励补发"));
        put(79,new Struct_mail_206(79,"奖励补发"));
        put(80,new Struct_mail_206(80,"奖励补发"));
        put(81,new Struct_mail_206(81,"问鼎天下-积分奖励补发"));
        put(82,new Struct_mail_206(82,"连续累充-奖励补发"));
        put(83,new Struct_mail_206(83,"连续累充-大奖补发"));
        put(84,new Struct_mail_206(84,"vip补偿礼包"));
        put(85,new Struct_mail_206(85,"武圣榜排名大奖奖励"));
        put(86,new Struct_mail_206(86,"神将送礼排名奖励"));
        put(87,new Struct_mail_206(87,"神将送礼目标奖励补发"));
        put(88,new Struct_mail_206(88,"神将送礼排名特殊奖励"));
        put(89,new Struct_mail_206(89,"登录送礼奖励补发"));
        put(90,new Struct_mail_206(90,"单笔返利奖励补发"));
        put(91,new Struct_mail_206(91,"累充返利奖励补发"));
        put(92,new Struct_mail_206(92,"兽魂洗练奖励补发"));
        put(93,new Struct_mail_206(93,"兽魂目标奖励补发"));
        put(94,new Struct_mail_206(94,"每日活跃奖励补发"));
        put(95,new Struct_mail_206(95,"圣兽寻宝奖励补发"));
        put(96,new Struct_mail_206(96,"圣兽寻宝排名奖励"));
        put(97,new Struct_mail_206(97,"圣兽寻宝排名大奖"));
        put(98,new Struct_mail_206(98,"圣兽寻宝奖励补发"));
        put(99,new Struct_mail_206(99,"圣兽寻宝排名奖励"));
        put(100,new Struct_mail_206(100,"圣兽寻宝排名大奖"));
        put(101,new Struct_mail_206(101,"金猪送财奖励补发"));
        put(102,new Struct_mail_206(102,"累计充值奖励补发"));
        put(103,new Struct_mail_206(103,"七日目标奖励补发"));
        put(104,new Struct_mail_206(104,"银猪送财奖励补发"));
        put(105,new Struct_mail_206(105,"银猪送财元宝返利"));
        put(106,new Struct_mail_206(106,"金猪送财元宝返利"));
        put(107,new Struct_mail_206(107,"单笔转盘奖励补发"));
        put(108,new Struct_mail_206(108,"三国一统国王赏赐"));
        put(109,new Struct_mail_206(109,"三国一统国家排名奖励"));
        put(110,new Struct_mail_206(110,"三国一统国王专属奖励"));
        put(111,new Struct_mail_206(111,"三国一统个人排名奖励"));
        put(112,new Struct_mail_206(112,"三国一统积分奖励补发"));
        put(113,new Struct_mail_206(113,"赴宴奖励"));
        put(114,new Struct_mail_206(114,"敬酒奖励"));
        put(115,new Struct_mail_206(115,"敬全场宾客奖励"));
        put(116,new Struct_mail_206(116,"武圣榜补偿邮件"));
        put(117,new Struct_mail_206(117,"血战到底补偿邮件"));
        put(118,new Struct_mail_206(118,"跨服矿藏协助邮件"));
        put(119,new Struct_mail_206(119,"每日直购目标奖励补发"));
        put(120,new Struct_mail_206(120,"完美鉴定排名奖励"));
        put(121,new Struct_mail_206(121,"完美鉴定排名大奖"));
        put(122,new Struct_mail_206(122,"兽魂洗练排名奖励"));
        put(123,new Struct_mail_206(123,"兽魂洗练排名大奖"));
        put(124,new Struct_mail_206(124,"少主祈愿排名奖励"));
        put(125,new Struct_mail_206(125,"少主祈愿排名大奖"));
        put(126,new Struct_mail_206(126,"少主学堂陪读邮件"));
        put(60023,new Struct_mail_206(60023,"霸服银卡（等级豪礼）"));
        put(60024,new Struct_mail_206(60024,"霸服金卡（等级豪礼）"));
        put(60025,new Struct_mail_206(60025,"霸服铂金卡（等级豪礼）"));
        put(60026,new Struct_mail_206(60026,"霸服黑卡（等级豪礼）"));
        put(60027,new Struct_mail_206(60027,"霸服金卡（定制道具）"));
        put(60028,new Struct_mail_206(60028,"霸服铂金卡（定制道具）"));
        put(60029,new Struct_mail_206(60029,"霸服黑卡（定制道具）"));
        put(127,new Struct_mail_206(127,"专属活动-单笔充值奖励"));
        put(128,new Struct_mail_206(128,"专属活动-单笔返利奖励"));
        put(129,new Struct_mail_206(129,"专属活动-累计充值奖励"));
        put(130,new Struct_mail_206(130,"专属活动-元宝返利奖励"));
        put(131,new Struct_mail_206(131,"单笔转盘奖励补发"));
        put(901,new Struct_mail_206(901,"义结金兰排名奖励"));
        put(902,new Struct_mail_206(902,"义结金兰目标奖励补偿"));
        put(903,new Struct_mail_206(903,"分享币奖励补偿"));
        put(132,new Struct_mail_206(132,"曹操来袭最后一击奖励"));
        put(133,new Struct_mail_206(133,"曹操来袭排名奖励"));
        put(134,new Struct_mail_206(134,"完美鉴定排名奖励"));
        put(135,new Struct_mail_206(135,"完美鉴定排名大奖"));
        put(136,new Struct_mail_206(136,"少主祈愿排名奖励"));
        put(137,new Struct_mail_206(137,"少主祈愿排名大奖"));
        put(138,new Struct_mail_206(138,"节日活动-充值排行"));
        put(139,new Struct_mail_206(139,"虎牢关-雇佣奖励"));
        put(140,new Struct_mail_206(140,"每日活跃补偿"));
        put(141,new Struct_mail_206(141,"累计充值补偿"));
        put(142,new Struct_mail_206(142,"限定武将"));
        put(143,new Struct_mail_206(143,"连充豪礼"));
        put(144,new Struct_mail_206(144,"三国宝藏"));
        put(145,new Struct_mail_206(145,"仙山寻兽排名奖励"));
        put(146,new Struct_mail_206(146,"登录有奖补偿"));
        put(147,new Struct_mail_206(147,"累计充值奖励补发"));
        put(148,new Struct_mail_206(148,"每日活跃奖励补发"));
        put(149,new Struct_mail_206(149,"群雄逐鹿每日任务奖补补发"));
        put(150,new Struct_mail_206(150,"群雄逐鹿每周任务奖补补发"));
        put(151,new Struct_mail_206(151,"群雄逐鹿驻守奖补补发"));
        put(152,new Struct_mail_206(152,"仙山寻兽排名大奖"));
        put(153,new Struct_mail_206(153,"异兽送礼奖励补发"));
        put(154,new Struct_mail_206(154,"三国战令奖励补发"));
        put(155,new Struct_mail_206(155,"异兽boss-率先通关奖励"));
        put(156,new Struct_mail_206(156,"修炼天赋奖励补发"));
        put(157,new Struct_mail_206(157,"天赋目标奖励补发"));
        put(158,new Struct_mail_206(158,"群雄逐鹿城池奖励"));
        put(159,new Struct_mail_206(159,"群雄逐鹿本国排名奖励"));
        put(160,new Struct_mail_206(160,"群雄逐鹿国家排名奖励"));
        put(161,new Struct_mail_206(161,"神将现世奖励补发"));
        put(162,new Struct_mail_206(162,"充值返利奖励补发"));
        put(163,new Struct_mail_206(163,"大神送礼奖励补发"));
        put(164,new Struct_mail_206(164,"合服首充奖励补发"));
        put(165,new Struct_mail_206(165,"张飞醉酒奖励补发"));
        put(166,new Struct_mail_206(166,"张飞醉酒最后一击奖励"));
        put(167,new Struct_mail_206(167,"神将现世排名奖励"));
        put(168,new Struct_mail_206(168,"张飞醉酒排名奖励"));
        put(169,new Struct_mail_206(169,"群雄逐鹿MVP奖励"));
        put(170,new Struct_mail_206(170,"运筹帷幄-锦囊妙计奖励补发"));
        put(171,new Struct_mail_206(171,"运筹帷幄-奇策有礼奖励补发"));
        put(172,new Struct_mail_206(172,"群雄逐鹿战斗胜利奖励"));
        put(173,new Struct_mail_206(173,"群雄逐鹿战斗失败奖励"));
        put(174,new Struct_mail_206(174,"许愿树排名奖励"));
        put(175,new Struct_mail_206(175,"许愿树目标奖励补发"));
        put(176,new Struct_mail_206(176,"许愿树排名特殊奖励"));
        put(177,new Struct_mail_206(177,"连续充值"));
        put(178,new Struct_mail_206(178,"许愿树送礼奖励补发"));
        put(179,new Struct_mail_206(179,"粮草争夺-个人排名奖励"));
        put(180,new Struct_mail_206(180,"粮草争夺-区服排名奖励"));
        put(181,new Struct_mail_206(181,"粮草争夺-MVP奖励"));
        put(182,new Struct_mail_206(182,"粮草争夺-积分奖励补发"));
        put(183,new Struct_mail_206(183,"主题消费奖励补发"));
        put(184,new Struct_mail_206(184,"幸运翻牌奖励补发"));
        put(185,new Struct_mail_206(185,"请离义盟"));
        put(186,new Struct_mail_206(186,"桃园结义任务奖励补发"));
        put(187,new Struct_mail_206(187,"桃园结义BOSS奖励补发"));
        put(188,new Struct_mail_206(188,"幸运翻牌累胜奖励补发"));
        put(189,new Struct_mail_206(189,"全服消费奖励补发"));
        put(190,new Struct_mail_206(190,"限时礼包奖励补发"));
        put(191,new Struct_mail_206(191,"宝藏拼图奖励补发"));
        put(192,new Struct_mail_206(192,"成就树"));
        put(193,new Struct_mail_206(193,"累计返利"));
        put(194,new Struct_mail_206(194,"群雄逐鹿个人排名奖励"));
        put(195,new Struct_mail_206(195,"跨服王者晋级奖励"));
        put(196,new Struct_mail_206(196,"跨服王者排名奖励"));
        put(197,new Struct_mail_206(197,"跨服王者每日奖励补发"));
        put(198,new Struct_mail_206(198,"对对联排名奖励"));
        put(199,new Struct_mail_206(199,"对对联奖励补发"));
        put(200,new Struct_mail_206(200,"府邸排名奖励"));
        put(201,new Struct_mail_206(201,"赴宴奖励"));
        put(202,new Struct_mail_206(202,"氛围奖励"));
        put(203,new Struct_mail_206(203,"敬酒奖励补发"));
        put(204,new Struct_mail_206(204,"年兽闹春奖励补发"));
        put(205,new Struct_mail_206(205,"年兽闹春目标奖励补发"));
        put(206,new Struct_mail_206(206,"擂台比武擂主奖励"));
        put(207,new Struct_mail_206(207,"擂台比武协助奖励"));
        put(208,new Struct_mail_206(208,"做元宵奖励补发"));
        put(209,new Struct_mail_206(209,"天降豪礼奖励补发"));
        put(210,new Struct_mail_206(210,"红包退回"));
        put(211,new Struct_mail_206(211,"许田围猎"));
        put(212,new Struct_mail_206(212,"许田围猎"));
        put(213,new Struct_mail_206(213,"登峰造极海选排名奖励"));
        put(214,new Struct_mail_206(214,"登峰造极决赛排名奖励"));
        put(215,new Struct_mail_206(215,"登峰造极海选积分奖励补发"));
        put(216,new Struct_mail_206(216,"登峰造极冠军猜对奖励"));
        put(217,new Struct_mail_206(217,"登峰造极冠军猜错奖励"));
        put(218,new Struct_mail_206(218,"貔貅散宝奖励补发"));
        put(219,new Struct_mail_206(219,"武庙十哲排名奖励"));
        put(220,new Struct_mail_206(220,"武庙十哲积分奖励补发"));
        put(221,new Struct_mail_206(221,"幸运福签奖励补发"));
        put(222,new Struct_mail_206(222,"幸运福签排名奖励"));
        put(223,new Struct_mail_206(223,"借用天工炉奖励"));
        put(224,new Struct_mail_206(224,"犒赏三军每日挑战奖励补发"));
        put(225,new Struct_mail_206(225,"犒赏三军双周挑战奖励补发"));
        put(226,new Struct_mail_206(226,"犒赏三军等级奖励补发"));
        put(227,new Struct_mail_206(227,"荣誉勋章每日挑战奖励补发"));
        put(228,new Struct_mail_206(228,"荣誉勋章双周挑战奖励补发"));
        put(229,new Struct_mail_206(229,"荣誉勋章等级奖励补发"));
        put(230,new Struct_mail_206(230,"线下返利-累计充值"));
        put(231,new Struct_mail_206(231,"线下返利-每日累充"));
        put(232,new Struct_mail_206(232,"线下返利-每日元宝返利"));
    }
    public void reset(){
        ins = null;
    }
}