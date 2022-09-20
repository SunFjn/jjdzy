var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Enum_Path = (function () {
    function Enum_Path() {
    }
    Enum_Path.getModelPath = function (val) {
        var baseKey = val;
        var reg = new RegExp("\/", "g");
        baseKey = baseKey.replace(reg, "_");
        var picUrl = val.replace(reg, "_");
        var textureUrl;
        var ver = RESManager.getPartVersion(picUrl);
        if (picUrl.indexOf("uieff") != -1) {
            if (true) {
                textureUrl = GGlobal.resHead + "resource/model/uieff/" + picUrl + ".png";
            }
            else {
                textureUrl = GGlobal.resHead + "resource/model/uieff/" + picUrl + "_v" + ver + ".png";
            }
        }
        else {
            var path = val.replace("/ani", "");
            if (true) {
                textureUrl = GGlobal.resHead + "resource/model/" + path + "/" + picUrl + ".png";
            }
            else {
                textureUrl = GGlobal.resHead + "resource/model/" + path + "/" + picUrl + "_v" + ver + ".png";
            }
        }
        return textureUrl;
    };
    Enum_Path.getModelDBPath = function (val) {
        //  body/1/stand/ani
        var baseKey = val;
        var reg = new RegExp("\/", "g");
        baseKey = baseKey.replace(reg, "_");
        var picUrl = val.replace(reg, "_");
        var textureUrl;
        //body_1_stand_ani
        var picArr;
        picArr = picUrl.split("_");
        picUrl = picArr[0] + "_" + picArr[1];
        var ver = RESManager.getPartVersion(picUrl);
        var dbUrl = new Array();
        var dbFileName;
        if (picUrl.indexOf("uieff") != -1) {
            if (true) {
                textureUrl = GGlobal.resHead + "resource/model/uieff/" + picUrl + ".png";
            }
            else {
                textureUrl = GGlobal.resHead + "resource/model/uieff/" + picUrl + "_v" + ver + ".png";
            }
        }
        else {
            var path = val.replace("/ani", "");
            var pathArr = path.split("/");
            path = pathArr[0] + "/" + pathArr[1] + "/";
            if (path.indexOf("eff/") == -1) {
                dbFileName = "KQDMW_ZD";
            }
            else {
                dbFileName = "eff";
            }
            //body/1/stand
            if (true) {
                textureUrl = GGlobal.resHead + "resource/model/" + path + "/" + picUrl + ".png";
                dbUrl.push(GGlobal.resHead + "resource/model/" + path + dbFileName + "_ske.dbbin");
                dbUrl.push(GGlobal.resHead + "resource/model/" + path + dbFileName + "_tex.json");
                dbUrl.push(GGlobal.resHead + "resource/model/" + path + dbFileName + "_tex.png");
            }
            else {
                textureUrl = GGlobal.resHead + "resource/model/" + path + "/" + picUrl + "_v" + ver + ".png";
                dbUrl.push(GGlobal.resHead + "resource/model/" + path + dbFileName + "_ske" + "_v" + ver + ".dbbin");
                dbUrl.push(GGlobal.resHead + "resource/model/" + path + dbFileName + "_tex" + "_v" + ver + ".json");
                dbUrl.push(GGlobal.resHead + "resource/model/" + path + dbFileName + "_tex" + "_v" + ver + ".png");
            }
        }
        return dbUrl;
    };
    Enum_Path.UI_URL = "resource/UI/";
    Enum_Path.IMAGE_URL = "resource/image/";
    Enum_Path.IMAGE_MODULES_URL = "resource/image/modules/";
    Enum_Path.ICON70_URL = "resource/image/icon70/";
    Enum_Path.SKILL_URL = "resource/image/skill/";
    Enum_Path.HEAD_URL = "resource/assets/head/";
    Enum_Path.TITLE_URL = "resource/image/title/";
    Enum_Path.PIC_URL = "resource/image/pic/";
    Enum_Path.GENERAL_URL = "resource/image/general/";
    Enum_Path.TUJIAN_URL = "resource/image/tujian/";
    Enum_Path.BACK_URL = "resource/image/back/";
    Enum_Path.SHOP_URL = "resource/image/shop/";
    Enum_Path.ZHANJIA_URL = "resource/image/pic/";
    Enum_Path.JUESE_URL = "resource/image/juese/";
    Enum_Path.SYSSHOW_URL = "resource/image/sysshow/";
    Enum_Path.vipURL = "resource/image/vip/";
    Enum_Path.MAINUI_URL = "resource/image/mainUI/";
    Enum_Path.JIBAN_URL = "resource/image/jiBan/";
    Enum_Path.BAZHENTU_URL = "resource/image/baZhenTu/";
    Enum_Path.FUBEN_URL = "resource/image/fuben/";
    Enum_Path.MAP_URL = "resource/map/{0}/bgs512/{1}.png";
    Enum_Path.GUAN_QIA_URL = "resource/image/guanqia/";
    Enum_Path.YISHOULU_URL = "resource/image/yishoulu/";
    Enum_Path.ACTCOM_URL = "resource/image/actCom/";
    Enum_Path.ZHENYAN_URL = "resource/image/zhenyan/";
    Enum_Path.CJS_URL = "resource/image/chengjiushu/";
    Enum_Path.TIANMING_URL = "resource/image/tianming/";
    Enum_Path.SHAOZHU_URL = "resource/image/shaozhu/";
    Enum_Path.HOME_URL = "resource/image/fudi/";
    Enum_Path.YANHUI_URL = "resource/image/yanhui/";
    Enum_Path.HOMEMAID_URL = "resource/image/homeMaid/";
    Enum_Path.SIXWAY_URL = "resource/image/liudao/";
    Enum_Path.RYXZ_URL = "resource/image/ryxz/";
    Enum_Path.TYJY_URL = "resource/image/taoyuanjieyi/";
    Enum_Path.SHILIAN_URL = "resource/image/shilian/";
    Enum_Path.PRELOAD_ROLE1 = "body/1/attack_01/ani,body/1/attack_02/ani,body/1/attack_03/ani,body/1/fire/ani,body/1/hurt/ani,body/1/ice/ani,body/1/jump/ani,body/1/poison/ani,body/1/run/ani,body/1/rush/ani,body/1/skill_01/ani,body/1/skill_02/ani,body/1/skill_03/ani,body/1/skill_04/ani,body/1/stand/ani,body/1/thunder/ani,body/1/use_01/ani,body/1/use_02/ani,weapon/1/attack_01/ani,weapon/1/attack_02/ani,weapon/1/attack_03/ani,weapon/1/fire/ani,weapon/1/hurt/ani,weapon/1/ice/ani,weapon/1/poison/ani,weapon/1/run/ani,weapon/1/rush/ani,weapon/1/skill_01/ani,weapon/1/skill_02/ani,weapon/1/skill_03/ani,weapon/1/skill_04/ani,weapon/1/stand/ani,weapon/1/thunder/ani,weapon/1/use_01/ani,weapon/1/use_02/ani";
    Enum_Path.PRELOAD_ROLE2 = "body/2/attack_01/ani,body/2/attack_02/ani,body/2/attack_03/ani,body/2/fire/ani,body/2/hurt/ani,body/2/ice/ani,body/2/jump/ani,body/2/poison/ani,body/2/run/ani,body/2/rush/ani,body/2/skill_01/ani,body/2/skill_02/ani,body/2/skill_03/ani,body/2/skill_04/ani,body/2/stand/ani,body/2/thunder/ani,body/2/use_01/ani,body/2/use_02/ani,weapon/2/attack_01/ani,weapon/2/attack_02/ani,weapon/2/attack_03/ani,weapon/2/fire/ani,weapon/2/hurt/ani,weapon/2/ice/ani,weapon/2/jump/ani,weapon/2/poison/ani,weapon/2/run/ani,weapon/2/rush/ani,weapon/2/skill_01/ani,weapon/2/skill_02/ani,weapon/2/skill_03/ani,weapon/2/skill_04/ani,weapon/2/stand/ani,weapon/2/thunder/ani,weapon/2/use_01/ani,weapon/2/use_02/ani";
    Enum_Path.PRELOAD_ROLE3 = "body/3/attack_01/ani,body/3/stand/ani,body/3/rush/ani,body/3/hurt/ani,body/3/attack_02/ani,body/3/attack_03/ani,body/3/run/ani,body/3/skill_01/ani,weapon/3/attack_03/ani,weapon/3/attack_02/ani,weapon/3/attack_01/ani,weapon/3/stand/ani,weapon/3/rush/ani,weapon/3/hurt/ani,weapon/3/run/ani,weapon/3/skill_01/ani";
    Enum_Path.PRELOAD_MONSTER = "body/200001/attack_01/ani,body/200001/stand/ani,body/200001/hurt/ani,body/200002/attack_01/ani,body/200002/hurt/ani,body/200002/run/ani,body/200002/stand/ani,body/200001/run/ani,body/200003/attack_01/ani,body/200003/hurt/ani,body/200003/run/ani,body/200003/stand/ani,body/200004/attack_01/ani,body/200004/hurt/ani,body/200004/run/ani,body/200004/stand/ani,body/200005/attack_01/ani,body/200005/hurt/ani,body/200005/stand/ani,body/200005/run/ani,body/9/attack_01/ani,body/9/attack_03/ani,body/9/attack_02/ani,body/9/run/ani,body/9/hurt/ani,body/9/stand/ani,weapon/9/attack_03/ani,weapon/9/attack_02/ani,weapon/9/attack_01/ani,weapon/9/run/ani,weapon/9/hurt/ani,weapon/9/stand/ani,body/201002/attack_01/ani,body/201002/skill_01/ani,body/201002/skill_02/ani,body/201002/stand/ani,body/201002/skill_03/ani,body/201002/hurt/ani,body/8/attack_03/ani,body/8/attack_02/ani,body/8/attack_01/ani,body/8/stand/ani,body/8/run/ani,body/8/hurt/ani,weapon/8/attack_03/ani,weapon/8/attack_02/ani,weapon/8/attack_01/ani,weapon/8/stand/ani,weapon/8/run/ani,weapon/8/hurt/ani,weapon/1/attack_03/ani,weapon/1/attack_02/ani,weapon/1/attack_01/ani,weapon/1/stand/ani,weapon/1/run/ani,weapon/1/hurt/ani,body/1/stand/ani,body/1/run/ani,body/1/hurt/ani,body/1/attack_03/ani,body/1/attack_01/ani,body/1/attack_02/ani,body/14/stand/ani,weapon/14/stand/ani,weapon/14/run/ani,weapon/14/hurt/ani,weapon/14/attack_03/ani,weapon/14/attack_02/ani,weapon/14/attack_01/ani";
    return Enum_Path;
}());
__reflect(Enum_Path.prototype, "Enum_Path");
