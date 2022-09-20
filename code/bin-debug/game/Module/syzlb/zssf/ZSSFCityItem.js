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
var ZSSFCityItem = (function (_super) {
    __extends(ZSSFCityItem, _super);
    function ZSSFCityItem() {
        var _this = _super.call(this) || this;
        _this.cityID = 0;
        _this._choose = false;
        return _this;
    }
    ZSSFCityItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ZSSFCityItem"));
    };
    ZSSFCityItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.costLb.setType(0);
        self.selImg.visible = false;
    };
    ZSSFCityItem.prototype.onShow = function (cityData) {
        var self = this;
        var cfg = Config.zssf_294[cityData.id];
        self.cityData = cityData;
        self.noticeImg.visible = false;
        self.ldImg.visible = self.drawBt.visible = self.timesGroup.visible = self.btGroup.visible = self.lockImg.visible = self.nameGroup.visible = false;
        if (Model_player.voMine.reincarnationLevel >= cfg.lh || Model_player.voMine.viplv >= cfg.vip) {
            self.touchable = true;
            if (cityData.state != 0) {
                self.drawBt.visible = cityData.state == 2;
                self.btGroup.visible = self.timesGroup.visible = cityData.state == 1;
                self.head.setdata(RoleUtil.getHeadRole(Config.hero_211[cityData.generalID].head), -1, "", -1, true);
                var costItem = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[8004].other))[0];
                if (cityData.state == 1) {
                    self.costLb.setCount(costItem.count);
                    self.costLb.setImgUrl(costItem.icon);
                    var surTime = ConfigHelp.getSurTime(cityData.times);
                    self.timeLb.text = "剩余时间：" + DateUtil.getHMSBySecond2(surTime);
                    Timer.instance.listen(self.timeHandler, self);
                }
                else {
                    Timer.instance.remove(self.timeHandler, self);
                }
            }
            else {
                self.noticeImg.visible = GGlobal.modelzssf.getHasWujiang(cityData.id).length > 0;
                self.nameGroup.visible = true;
                self.nameLb.text = "无人镇守";
                self.head.setdata(0);
            }
            self.nameLb.color = Color.getColorInt(1);
        }
        else {
            self.head.setdata(0);
            self.lockImg.visible = self.nameGroup.visible = true;
            self.nameLb.text = "轮回" + cfg.lh + "世或VIP" + cfg.vip + "开放";
            self.nameLb.color = Color.getColorInt(6);
            self.touchable = false;
        }
        self.registerEvent(true);
    };
    ZSSFCityItem.prototype.timeHandler = function () {
        var self = this;
        var surTime = ConfigHelp.getSurTime(self.cityData.times);
        self.timeLb.text = "剩余时间：" + DateUtil.getHMSBySecond2(surTime);
        if (surTime <= 0) {
            GGlobal.modelzssf.CG_GuardArea_openUI_10901();
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    ZSSFCityItem.prototype.onShow1 = function (cityID, value) {
        var self = this;
        self.touchable = true;
        self.noticeImg.visible = false;
        var cfg = Config.zssf_294[cityID];
        self.cityID = cityID;
        self.cityData1 = value;
        self.drawBt.visible = self.timesGroup.visible = self.btGroup.visible = self.lockImg.visible = false;
        self.nameGroup.visible = true;
        if (value && value.job > 0) {
            self.nameLb.text = value.name;
            self.head.setdata(RoleUtil.getHeadRole(Config.hero_211[value.job].head), -1, "", -1, true);
            self.ldImg.visible = value.state == 1;
        }
        else {
            self.nameLb.text = "无人镇守";
            self.head.setdata(0);
            self.ldImg.visible = false;
        }
        Timer.instance.remove(self.timeHandler, self);
        self.registerEvent(true);
    };
    ZSSFCityItem.prototype.clean = function () {
        var self = this;
        self.registerEvent(false);
        self.costLb.setImgUrl();
        Timer.instance.remove(self.timeHandler, self);
    };
    ZSSFCityItem.prototype.registerEvent = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.drawBt, egret.TouchEvent.TOUCH_TAP, self.onDraw, self);
        EventUtil.register(pFlag, self.backBt, egret.TouchEvent.TOUCH_TAP, self.onBack, self);
    };
    ZSSFCityItem.prototype.onDraw = function () {
        var model = GGlobal.modelzssf;
        model.cityID = this.cityData.id;
        model.CG_GuardArea_getAward_10905(model.cityID);
    };
    ZSSFCityItem.prototype.onBack = function () {
        var self = this;
        var model = GGlobal.modelzssf;
        var costItem = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[8004].other))[0];
        ViewAlert.show("是否花费" + HtmlUtil.fontNoSize(costItem.count + "元宝", Color.getColorStr(2)) + "提前召回", Handler.create(this, function func() {
            if (ConfigHelp.checkEnough(Config.xtcs_004[8004].other, false)) {
                model.cityID = self.cityData.id;
                model.CG_GuardArea_recall_10907(self.cityData.id);
            }
            else {
                ModelChongZhi.guideToRecharge(Handler.create(self, function () {
                    GGlobal.layerMgr.close2(UIConst.ZSSF);
                }));
            }
        }, null, true), ViewAlert.OKANDCANCEL, "确定", "取消");
    };
    ZSSFCityItem.prototype.setChoose = function (value) {
        this.selImg.visible = value;
        this._choose = value;
    };
    ZSSFCityItem.URL = "ui://3o8q23uuspfrw";
    return ZSSFCityItem;
}(fairygui.GLabel));
__reflect(ZSSFCityItem.prototype, "ZSSFCityItem");
