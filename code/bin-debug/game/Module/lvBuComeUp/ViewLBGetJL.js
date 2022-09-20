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
var ViewLBGetJL = (function (_super) {
    __extends(ViewLBGetJL, _super);
    function ViewLBGetJL() {
        var _this = _super.call(this) || this;
        _this.loadRes("LvBuComeUp", "LvBuComeUp_atlas0");
        return _this;
    }
    ViewLBGetJL.prototype.childrenCreated = function () {
        GGlobal.createPack("LvBuComeUp");
        var self = this;
        self.view = self.contentPane = fairygui.UIPackage.createObject("LvBuComeUp", "ViewGetJL").asCom;
        self.list = self.view.getChild("list").asList;
        self.btnGet = self.view.getChild("btnGet");
        self.iconGot = self.view.getChild("iconGot");
        self.buttonClose = self.view.getChild("frame").asCom.getChild("closeButton").asButton;
        self.view.getChild("frame").asCom.getChild("title").text = "奖 励";
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.onItemRender;
        self.list.setVirtual();
        self.buttonClose.addClickListener(self.closeEventHandler, self);
        self.btnGet.addClickListener(self.onHand, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewLBGetJL.prototype.onHand = function () {
        if (this.btnGet.enabled == false) {
            return;
        }
        GGlobal.modelLvBuCompup.CG2715(this.$data.cfgId);
    };
    ViewLBGetJL.prototype.onItemRender = function (index, item) {
        var data = this.awards[index];
        item.vo = data;
        item.tipEnabled = true;
        item.showEff(true);
    };
    ViewLBGetJL.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        this.update(this._args);
    };
    ViewLBGetJL.prototype.update = function (data) {
        var self = this;
        self.$data = data;
        self.btnGet.visible = true;
        switch (data.state) {
            case 0:
                self.btnGet.enabled = false;
                self.btnGet.text = "不可领取";
                self.btnGet.checkNotice = false;
                self.iconGot.visible = false;
                break;
            case 1:
                self.btnGet.enabled = true;
                self.btnGet.text = "领取";
                self.btnGet.checkNotice = true;
                self.iconGot.visible = false;
                break;
            case 2:
                self.btnGet.enabled = false;
                self.btnGet.text = "已领取";
                self.btnGet.checkNotice = false;
                self.iconGot.visible = true;
                self.btnGet.visible = false;
                break;
        }
        var arr = JSON.parse(data.awards);
        self.awards = ConfigHelp.makeItemListArr(arr);
        self.list.numItems = self.awards.length;
    };
    ViewLBGetJL.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        GGlobal.layerMgr.close(UIConst.VIEWLBGETJL);
        this.list.numItems = 0;
    };
    return ViewLBGetJL;
}(UIModalPanel));
__reflect(ViewLBGetJL.prototype, "ViewLBGetJL");
