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
var Child_ActCom_XFZD = (function (_super) {
    __extends(Child_ActCom_XFZD, _super);
    function Child_ActCom_XFZD() {
        return _super.call(this) || this;
    }
    Child_ActCom_XFZD.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_XFZD", "Child_ActCom_XFZD"));
    };
    Child_ActCom_XFZD.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
    };
    Child_ActCom_XFZD.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(XFZDGrid.URL, XFZDGrid);
    };
    Child_ActCom_XFZD.prototype.initView = function (pParent) {
    };
    Child_ActCom_XFZD.prototype.renderHandler = function (index, grid) {
        var self = this;
        grid.setVo(self.showData[index]);
        grid.setDraw(GGlobal.modelxfzd.itemIDArr.indexOf(self.showData[index].id) != -1);
    };
    Child_ActCom_XFZD.prototype.updateShow = function () {
        var model = GGlobal.modelxfzd;
        var self = this;
        self.list.numItems = self.showData.length;
        if (model.playIndex >= 0)
            return;
        if (model.eggData[0][0] > 0 && model.eggData[1][0] > 0 && model.eggData[2][0] > 0) {
            self.eggBt0.visible = self.danImg0.visible = false;
            self.eggBt2.visible = self.danImg2.visible = false;
            self.grid2.visible = self.grid0.visible = self.grid1.visible = false;
            self.grid0.clean();
            self.grid1.clean();
            self.grid2.clean();
            self.danImg1.url = CommonManager.getUrl("ActCom_XFZD", "caidan");
            self.eggBt1.checkNotice = self.eggBt1.visible = true;
        }
        else {
            if (Config.xhdxfzdxfb_320[self.vo.qs * 1000 + model.drawNum + 1]) {
                for (var i = 0; i < 3; i++) {
                    var danImg = self["danImg" + i];
                    var grid = self["grid" + i];
                    danImg.visible = true;
                    if (model.eggData[i][0] > 0) {
                        danImg.url = CommonManager.getUrl("ActCom_XFZD", "ptDanC");
                        self["eggBt" + i].visible = false;
                        grid.tipEnabled = grid.isShowEff = true;
                        grid.visible = true;
                        grid.vo = ConfigHelp.makeItem(model.eggData[i]);
                    }
                    else {
                        danImg.url = CommonManager.getUrl("ActCom_XFZD", "ptEgg");
                        self["eggBt" + i].visible = true;
                        self["eggBt" + i].checkNotice = model.surNum > 0;
                        grid.visible = false;
                        grid.clean();
                    }
                }
            }
            else {
                self.eggBt1.visible = self.eggBt0.visible = self.danImg0.visible = false;
                self.eggBt2.visible = self.danImg2.visible = false;
                self.grid2.visible = self.grid0.visible = false;
                self.grid0.clean();
                self.grid2.clean();
                self.danImg1.url = CommonManager.getUrl("ActCom_XFZD", "caidanC");
                self.grid1.visible = true;
                self.grid1.tipEnabled = self.grid1.isShowEff = true;
                self.grid1.vo = ConfigHelp.makeItem(model.eggData[3]);
            }
        }
        var color = model.surNum <= 0 ? 6 : 2;
        self.numLb.text = "剩余砸蛋次数:" + HtmlUtil.fontNoSize(model.surNum + "", Color.getColorStr(color));
        self.expBar.value = model.costMoney;
        if (Config.xhdxfzdxfb_320[self.vo.qs * 1000 + model.drawNum + model.surNum + 1]) {
            self.expBar.max = Config.xhdxfzdxfb_320[self.vo.qs * 1000 + model.drawNum + model.surNum + 1].yb;
            self.promptLb.text = "每砸蛋3次可砸1次[color=#ffff00]超级金蛋[/color]";
        }
        else {
            self.promptLb.text = "已达到最高砸蛋次数";
            self.expBar.max = Config.xhdxfzdxfb_320[self.vo.qs * 1000 + model.drawNum + model.surNum].yb;
        }
    };
    Child_ActCom_XFZD.prototype.updateTime = function () {
        var self = this;
        self.timeLb.text = "剩余时间：" + DateUtil.getMSBySecond4(self.vo.getSurTime());
        6;
        if (self.vo.getSurTime() > 0) {
            Timer.instance.listen(self.updateTime, self, 1000);
        }
        else {
            Timer.instance.remove(self.updateTime, self);
        }
    };
    Child_ActCom_XFZD.prototype.OnEgg = function (evt) {
        var index = evt.target.data;
        var model = GGlobal.modelxfzd;
        var self = this;
        if (model.surNum > 0 || model.eggData[index][0] > 0) {
            model.playIndex = index;
            self.eggBt0.touchable = self.eggBt1.touchable = self.eggBt2.touchable = false;
            model.CG_ConsumeSmashEgg_smashEgg_9503(index);
        }
        else {
            ViewCommonWarn.text("砸蛋次数不足");
        }
    };
    Child_ActCom_XFZD.prototype.playEff = function () {
        var self = this;
        var model = GGlobal.modelxfzd;
        var color = model.surNum <= 0 ? 6 : 2;
        self.numLb.text = "剩余砸蛋次数:" + HtmlUtil.fontNoSize(model.surNum + "", Color.getColorStr(color));
        var eggImg = self["danImg" + model.playIndex];
        var arr;
        if (model.eggData[0][0] <= 0 && model.eggData[1][0] <= 0 && model.eggData[2][0] <= 0) {
            arr = [ConfigHelp.makeItem(model.eggData[3])];
            EffectMgr.addEff("uieff/10054", eggImg.displayObject, eggImg.width / 2, eggImg.height / 2, 1000, 1000, false);
        }
        else {
            arr = [ConfigHelp.makeItem(model.eggData[model.playIndex])];
            EffectMgr.addEff("uieff/10053", eggImg.displayObject, eggImg.width / 2, eggImg.height / 2, 1000, 1000, false);
        }
        var times = setTimeout(function () {
            model.playIndex = -1;
            self.eggBt0.touchable = self.eggBt1.touchable = self.eggBt2.touchable = true;
            GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, arr);
            self.updateShow();
        }, 1000);
    };
    Child_ActCom_XFZD.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        GGlobal.modelxfzd.playIndex = -1;
        IconUtil.setImg(self.backImg, Enum_Path.ACTCOM_URL + "xfzd.jpg");
        self.timeLb.text = "剩余时间：" + DateUtil.getMSBySecond4(pData.getSurTime());
        if (pData.getSurTime() > 0) {
            Timer.instance.listen(self.updateTime, self, 1000);
        }
        else {
            Timer.instance.remove(self.updateTime, self);
        }
        var itemArr = JSON.parse(Config.xfzdyl_320[pData.qs].jl);
        self.showData = ConfigHelp.makeItemListArr(itemArr);
        self.eggBt0.data = 0;
        self.eggBt1.data = 1;
        self.eggBt2.data = 2;
        self.eggBt0.addClickListener(self.OnEgg, self);
        self.eggBt1.addClickListener(self.OnEgg, self);
        self.eggBt2.addClickListener(self.OnEgg, self);
        self.linkLb.addClickListener(self.openGaiLV, self);
        GGlobal.control.listen(UIConst.ACTCOM_XFZD, self.updateShow, self);
        GGlobal.control.listen(Enum_MsgType.ACTCOM_XFZD_SHOWEFF, self.playEff, self);
        self.eggBt0.touchable = self.eggBt1.touchable = self.eggBt2.touchable = true;
        Model_GlobalMsg.CG_ACTTIVITY_OR_SYSTEM_DATA(pData.id);
    };
    Child_ActCom_XFZD.prototype.openGaiLV = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.GAILV, 10);
    };
    Child_ActCom_XFZD.prototype.closePanel = function (pData) {
        var self = this;
        IconUtil.setImg(self.backImg, null);
        Timer.instance.remove(self.updateTime, self);
        self.list.numItems = 0;
        self.eggBt0.removeClickListener(self.OnEgg, self);
        self.eggBt1.removeClickListener(self.OnEgg, self);
        self.eggBt2.removeClickListener(self.OnEgg, self);
        self.linkLb.removeClickListener(self.openGaiLV, self);
        GGlobal.control.remove(UIConst.ACTCOM_XFZD, self.updateShow, self);
        GGlobal.control.remove(Enum_MsgType.ACTCOM_XFZD_SHOWEFF, self.playEff, self);
    };
    Child_ActCom_XFZD.URL = "ui://nshesk1rglz71";
    Child_ActCom_XFZD.pkg = "ActCom_XFZD";
    return Child_ActCom_XFZD;
}(fairygui.GComponent));
__reflect(Child_ActCom_XFZD.prototype, "Child_ActCom_XFZD", ["IPanel"]);
