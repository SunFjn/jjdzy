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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewOfflineAwards = (function (_super) {
    __extends(ViewOfflineAwards, _super);
    function ViewOfflineAwards() {
        var _this = _super.call(this) || this;
        _this.awards = [];
        _this.loadRes("guanqia", "guanqia_atlas0");
        return _this;
    }
    ViewOfflineAwards.createInstance = function () {
        return (fairygui.UIPackage.createObject("guanqia", "ViewOfflineAwards"));
    };
    ViewOfflineAwards.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("guanqia");
        self.view = fairygui.UIPackage.createObject("guanqia", "ViewOfflineAwards").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        if (GGlobal.sdk) {
            self.n26.visible = true;
        }
        else {
            self.n26.visible = false;
        }
        self.n25.callbackThisObj = self;
        self.n25.itemRenderer = self.awardsRender;
        self.btnConfirm.addClickListener(self.onCloseHandler, self);
        self.isShowOpenAnimation = false;
        _super.prototype.childrenCreated.call(this);
        self.resetPosition();
    };
    ViewOfflineAwards.prototype.awardsRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.grid.showEff(true);
    };
    ViewOfflineAwards.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
    };
    ViewOfflineAwards.prototype.onShown = function () {
        this.update();
        IconUtil.setImg(this.imgBG, Enum_Path.BACK_URL + "guanqialx.jpg");
    };
    ViewOfflineAwards.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.GUANQIAOFFLINEINCOM);
        if (this.imgBG)
            IconUtil.setImg(this.imgBG, null);
    };
    ViewOfflineAwards.prototype.onCloseHandler = function () {
        this.doHideAnimation();
        this.n25.numItems = 0;
        GGlobal.layerMgr.close(UIConst.GUANQIASWEEPING);
    };
    ViewOfflineAwards.prototype.update = function () {
        var m = GGlobal.modelGuanQia;
        var self = this;
        var offlinedata = m.offlinedata;
        self.lbTime.text = "" + DateUtil.getHMSBySecond(offlinedata[7]);
        var awards = offlinedata[6];
        awards.unshift([Enum_Attr.TONGBI, 0, offlinedata[2]]);
        awards.unshift([Enum_Attr.EXP, 0, offlinedata[3]]);
        awards.unshift([Enum_Attr.EQUIP, 0, offlinedata[5]]);
        awards.unshift([9, 0, offlinedata[4]]);
        var list = [];
        var vo;
        for (var i = 0; i < awards.length; i++) {
            var rw = awards[i];
            if (parseInt(rw[0]) == Enum_Attr.ITEM) {
                vo = VoItem.create(parseInt(rw[1]));
            }
            else {
                vo = Vo_Currency.create(rw[0]);
                vo.showCount = true;
                vo.gType = Enum_Attr.TONGBI;
            }
            if (vo) {
                vo.count = parseInt(rw[2]);
                list.push(vo);
            }
        }
        this.awards = list;
        this.n25.numItems = list.length;
    };
    ViewOfflineAwards.URL = "ui://r92dp953hfx72";
    return ViewOfflineAwards;
}(UIModalPanel));
__reflect(ViewOfflineAwards.prototype, "ViewOfflineAwards");
