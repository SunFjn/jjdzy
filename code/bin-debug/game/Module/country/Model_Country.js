var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Model_Country = (function (_super) {
    __extends(Model_Country, _super);
    function Model_Country() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_Country.getCountryName = function (type) {
        switch (type) {
            case 1:
                return "魏国";
            case 2:
                return "蜀国";
            case 3:
                return "吴国";
            default:
                return "";
        }
    };
    Model_Country.getCouNameMin = function (type) {
        switch (type) {
            case 1:
                return "魏";
            case 2:
                return "蜀";
            case 3:
                return "吴";
            default:
                return "";
        }
    };
    Model_Country.getCountryUrl = function (type) {
        return Enum_Path.IMAGE_MODULES_URL + "country/countryb" + type + ".png";
        ;
    };
    /**1471 随机国家 */
    Model_Country.prototype.CG_RANDOM_COUNTRY = function () {
        var bates = this.getBytes();
        this.sendSocket(1471, bates);
    };
    /**1473 国家捐献 */
    Model_Country.prototype.CG_COUNTRY_DONATION = function () {
        var bates = this.getBytes();
        this.sendSocket(1473, bates);
    };
    /**1475 捐献(铜钱、元宝) B:捐献类型1：铜钱2：元宝 */
    Model_Country.prototype.CG_DONATION = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(1475, bates);
    };
    /**1477 选择国家 B:国家类型 */
    Model_Country.prototype.CG_SELECT_COUNTRY = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(1477, bates);
    };
    /**1479 打开界面 */
    Model_Country.prototype.CG_OPENUI = function () {
        var bates = this.getBytes();
        this.sendSocket(1479, bates);
    };
    //协议处理
    Model_Country.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(1472, this.GC_RANDOM_COUNTRY, this);
        mgr.regHand(1474, this.GC_COUNTRY_DONATION, this);
        mgr.regHand(1476, this.GC_DONATION, this);
        mgr.regHand(1478, this.GC_SELECT_COUNTRY, this);
        mgr.regHand(1480, this.GC_OPENUI, this);
    };
    //随机国家 B:随机到的国家IdU:玩家姓名
    Model_Country.prototype.GC_RANDOM_COUNTRY = function (self, data) {
        var country = data.readByte();
        Model_player.voMine.setCountry(country);
        var name = data.readUTF();
        GGlobal.control.notify(Enum_MsgType.COUNTRY_UPDATE);
        ViewCommonWarn.text("加入" + Model_Country.getCouNameMin(country) + "国成功");
    };
    //B:铜钱剩余捐献次数B:元宝剩余捐献次数
    Model_Country.prototype.GC_COUNTRY_DONATION = function (self, data) {
        Model_Country.donateNumCoin = data.readByte();
        Model_Country.donateNumGold = data.readByte();
        GGlobal.control.notify(Enum_MsgType.COUNTRY_DONATE_UPDATE);
    };
    //捐献返回 B:捐献状态 1：成功2：次数不足3：铜钱不足4：元宝不足B:铜钱剩余捐献次数B:元宝剩余捐献次数
    Model_Country.prototype.GC_DONATION = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_Country.donateNumCoin = data.readByte();
            Model_Country.donateNumGold = data.readByte();
            GGlobal.control.notify(Enum_MsgType.COUNTRY_DONATE_UPDATE);
        }
        else if (result == 2) {
            ViewCommonWarn.text("次数不足");
        }
        else if (result == 3) {
            ViewCommonWarn.text("铜钱不足");
        }
        else if (result == 4) {
            ModelChongZhi.guideToRecharge();
        }
        else {
            ViewCommonWarn.text("捐献失败");
        }
    };
    //返回国家 B:国家类型U:国家姓名
    Model_Country.prototype.GC_SELECT_COUNTRY = function (self, data) {
        Model_player.voMine.setCountry(data.readByte());
        var name = data.readUTF();
        GGlobal.control.notify(Enum_MsgType.COUNTRY_UPDATE);
        ViewCommonWarn.text("加入国家成功");
    };
    //打开界面返回 I:君主等级I:君主头像I:君主头像框U:君主姓名U:丞相姓名U:大将军姓名
    Model_Country.prototype.GC_OPENUI = function (self, data) {
        Model_Country.kingLv = data.readInt();
        Model_Country.kingHead = data.readInt();
        Model_Country.kingFrame = data.readInt();
        Model_Country.kingName = data.readUTF(); //君主姓名
        Model_Country.ministerName = data.readUTF(); //丞相姓名
        Model_Country.genName = data.readUTF(); //大将军姓名
        GGlobal.control.notify(Enum_MsgType.COUNTRY_OPEN_UI);
    };
    Model_Country.checkDonate = function () {
        var coinCfg = Config.juanxian_712[1];
        var coinUse = ConfigHelp.SplitStr(coinCfg.USE);
        var coinCost = Number(coinUse[0][2]);
        return (Model_Country.donateNumCoin > 0 && Model_player.voMine.tongbi >= coinCost);
    };
    //1魏国2蜀国3吴国
    Model_Country.COUNTRY_WEI = 1;
    Model_Country.COUNTRY_SHU = 2;
    Model_Country.COUNTRY_WU = 3;
    Model_Country.donateNumCoin = 0;
    Model_Country.donateNumGold = 0;
    Model_Country.kingName = "";
    Model_Country.ministerName = "";
    Model_Country.genName = "";
    return Model_Country;
}(BaseModel));
__reflect(Model_Country.prototype, "Model_Country");
