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
var ChildKingShipResult = (function (_super) {
    __extends(ChildKingShipResult, _super);
    function ChildKingShipResult() {
        var _this = _super.call(this) || this;
        _this.myPos = 0;
        _this.listGuard = [];
        return _this;
    }
    ChildKingShipResult.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "ChildKingShipResult"));
    };
    ChildKingShipResult.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.linkLb.text = HtmlUtil.createLink("玩法说明", true, "");
        self.linkLb.addEventListener(egret.TextEvent.LINK, self.linkHandler, self);
        self.listGuard = [self.leader0, self.leader1, self.leader2, self.guard0, self.guard1, self.guard2, self.guard3];
        self.buyBt.addClickListener(self.buyHandler, self);
        self.moBaiBt.addClickListener(self.mobaiHandler, self);
        self.boxBt.addClickListener(self.boxHandler, self);
    };
    ChildKingShipResult.prototype.linkHandler = function (event) {
        event.stopPropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.COUNTRY_KINGSHIP);
    };
    ChildKingShipResult.prototype.boxHandler = function () {
        GGlobal.layerMgr.open(UIConst.COUNTRY_KINGSHIP_REWARD, this.myPos);
    };
    ChildKingShipResult.prototype.mobaiHandler = function () {
        GGlobal.modelKingship.CG_KINGSHIP_MOBAI_5211();
    };
    ChildKingShipResult.prototype.buyHandler = function () {
        Model_Kingship.buyHandler();
    };
    ChildKingShipResult.prototype.addListen = function () {
        GGlobal.control.listen(Enum_MsgType.KINGSHIP_UPDATEDATA, this.updateView, this);
        IconUtil.setImg(this.imgBg, Enum_Path.BACK_URL + "kingship.jpg");
        this.updateView();
    };
    ChildKingShipResult.prototype.removeListen = function () {
        var self = this;
        Timer.instance.remove(self.timeHandler, self);
        Timer.instance.remove(self.upTimer, self);
        GGlobal.control.remove(Enum_MsgType.KINGSHIP_UPDATEDATA, self.updateView, self);
        IconUtil.setImg(self.imgBg, null);
        for (var i = 0; i < self.listGuard.length; i++) {
            self.listGuard[i].remove();
        }
    };
    ChildKingShipResult.prototype.setListGuard = function (arr) {
        var self = this;
        var index = 0;
        for (var i = 0; i < this.listGuard.length; i++) {
            if (i < arr.length) {
                self.listGuard[i].visible = true;
                if (i == 0) {
                    self.listGuard[i].setVo(arr[i], 0, 1);
                }
                else {
                    self.listGuard[i].setVo(arr[i], 0, i % 2);
                }
                if (arr[i].id == Model_player.voMine.id) {
                    index++;
                    self.myPos = arr[i].pos;
                    self.dataLb.text = HtmlUtil.fontNoSize("名字：", Color.TEXT_YELLOW) + Model_player.voMine.name + "\n" + HtmlUtil.fontNoSize("职位：", Color.TEXT_YELLOW) +
                        Model_Kingship.countryText[Model_player.voMine.country - 1][arr[i].pos - 1 >= 3 ? 3 : arr[i].pos - 1] + "\n" + HtmlUtil.fontNoSize("战力：", Color.TEXT_YELLOW) +
                        ConfigHelp.numToStr(Model_player.voMine.str);
                }
            }
            else {
                self.listGuard[i].visible = false;
            }
        }
        if (index == 0) {
            self.myPos = 0;
            self.dataLb.text = HtmlUtil.fontNoSize("名字：", Color.TEXT_YELLOW) + Model_player.voMine.name + "\n" + HtmlUtil.fontNoSize("职位：", Color.TEXT_YELLOW) +
                "无\n" + HtmlUtil.fontNoSize("战力：", Color.TEXT_YELLOW) + ConfigHelp.numToStr(Model_player.voMine.str);
        }
    };
    ChildKingShipResult.prototype.updateView = function () {
        var self = this;
        self.roleGroup.visible = false;
        self.mbGroup.visible = false;
        self.battleTimeLb.visible = false;
        self.labTimeTips1.visible = false;
        if (Model_Kingship.overTime > 0) {
            self.labTimeTips1.visible = true;
            if (!Timer.instance.has(self.upTimer, self)) {
                Timer.instance.listen(self.upTimer, self, 1000);
            }
            self.roleGroup.visible = Model_Kingship.status == 1;
            self.head.setdata(Model_Setting.headId, Model_player.voMine.level, null, null, false, Model_Setting.frameId);
            if (Model_Kingship.times > 0) {
                self.battleTimeLb.visible = true;
                if (!Timer.instance.has(self.timeHandler, self)) {
                    Timer.instance.listen(self.timeHandler, self, 1000);
                }
            }
            else {
                Timer.instance.remove(self.timeHandler, self);
            }
            if (Model_Kingship.battleCount <= 0) {
                self.battleNumLb.text = "挑战次数" + HtmlUtil.fontNoSize(Model_Kingship.battleCount + "/" + Model_Kingship.BATTLE_MAX, Color.getColorStr(6));
            }
            else {
                self.battleNumLb.text = "挑战次数" + HtmlUtil.fontNoSize(Model_Kingship.battleCount + "/" + Model_Kingship.BATTLE_MAX, Color.getColorStr(2));
            }
        }
        else {
            Timer.instance.remove(self.upTimer, self);
        }
        self.mbGroup.visible = Model_Kingship.status == 2;
        self.moBaiBt.checkNotice = self.moBaiBt.visible = Model_Kingship.moBai == 0;
        self.moBaiImg.visible = Model_Kingship.moBai == 1;
        self.boxBt.checkNotice = Model_Kingship.isDraw != 1 && Model_Kingship.status == 2;
        this.setListGuard(Model_Kingship.guardArr);
    };
    ChildKingShipResult.prototype.timeHandler = function () {
        var self = this;
        Model_Kingship.times--;
        if (Model_Kingship.times <= 0) {
            if (Model_Kingship.battleCount <= 10)
                Model_Kingship.battleCount++;
            Timer.instance.remove(self.timeHandler, self);
            self.battleTimeLb.visible = false;
        }
        else {
            self.battleTimeLb.visible = true;
            self.battleTimeLb.text = DateUtil.getHMSBySecond2(Model_Kingship.times) + "后恢复一次";
        }
    };
    ChildKingShipResult.prototype.upTimer = function () {
        //活动时间
        var model = Model_Kingship;
        var self = this;
        model.overTime--;
        if (model.overTime < 0) {
            model.overTime = 0;
        }
        if (model.status == 1) {
            var str = DateUtil.getMSBySecond4(model.overTime);
            self.labTimeTips1.text = str ? str + "后结束" : "";
            if (model.overTime <= 0) {
                model.status = 2;
                self.labTimeTips1.text = "";
                Timer.instance.remove(self.upTimer, self);
                self.updateView();
            }
        }
        else if (model.status == 2) {
            var str1 = DateUtil.getMSBySecond4(model.overTime);
            self.labTimeTips1.text = str1 ? "王位之争将于" + str1 + "后开始" : "";
            if (model.overTime <= 0) {
                model.status = 1;
                model.overTime = 12 * 3600;
                self.updateView();
            }
        }
        else {
            self.labTimeTips1.text = "";
        }
    };
    ChildKingShipResult.URL = "ui://uwzc58nju0wz20";
    return ChildKingShipResult;
}(fairygui.GComponent));
__reflect(ChildKingShipResult.prototype, "ChildKingShipResult");
