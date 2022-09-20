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
var TianGongItem = (function (_super) {
    __extends(TianGongItem, _super);
    function TianGongItem() {
        var _this = _super.call(this) || this;
        _this.type = 0;
        _this.max = 0;
        _this.isDown = 0;
        _this.lastTime = 0;
        _this.selectNum = 0;
        return _this;
    }
    TianGongItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "TianGongItem"));
    };
    TianGongItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    //type 0为背包内 1为已经选择
    TianGongItem.prototype.setdata = function (vo, type) {
        var self = this;
        self.vo = vo;
        self.isDown = 0;
        self.grid.vo = vo;
        self.type = type;
        self.grid.grid.showEff(true);
        self.grid.grid.tipEnabled = false;
        self.max = vo.count;
        self.addClickListener(self.clickHd, self);
        // if (type == 1) {
        // 	self.addClickListener(self.cancelSelected, self);
        // } else {
        // 	self.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.__mousedown, self);
        // }
        GGlobal.control.listen(HomeModel.BAG_UPDATE, self.resetNum, self);
    };
    TianGongItem.prototype.clickHd = function () {
        var self = this;
        if (self.type == 1) {
            GGlobal.homemodel.selectItemInTianGong(self.vo.id, 0, 0);
            GGlobal.control.notify(HomeModel.BAG_UPDATE, self.vo.id);
        }
        else {
            GGlobal.layerMgr.open(UIConst.HOME_TGL_ADD, self.vo);
        }
    };
    // private __mousedown(evt: egret.TouchEvent): void {
    // 	const self = this;
    // 	self.isDown = 1;
    // 	self.lastTime = egret.getTimer() + 4000;
    // 	fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_END, self.__mouseup, self);
    // 	Timer.listen(self.notifyCount, self, 100);
    // }
    // private cancelSelected() {
    // 	const self = this;
    // 	GGlobal.homemodel.selectItemInTianGong(self.vo.id, 0, 0);
    // 	GGlobal.control.notify(HomeModel.BAG_UPDATE, self.vo.id);
    // }
    // private notifyCount() {
    // 	const self = this;
    // 	if (egret.getTimer() > self.lastTime) {
    // 		self.selectNum = self.max;
    // 	} else {
    // 		self.selectNum++;
    // 	}
    // 	GGlobal.homemodel.selectItemInTianGong(self.vo.id, self.selectNum, 1);
    // }
    // private __mouseup() {
    // 	const self = this;
    // 	Timer.remove(self.notifyCount, self);
    // 	fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_END, self.__mouseup, self);
    // }
    TianGongItem.prototype.resetNum = function () {
        this.selectNum = 0;
    };
    TianGongItem.prototype.clean = function () {
        var self = this;
        self.isDown = 0;
        self.selectNum = 0;
        self.grid.vo = null;
        // Timer.remove(self.notifyCount, self);
        self.removeClickListener(self.clickHd, self);
        GGlobal.control.remove(HomeModel.BAG_UPDATE, self.resetNum, self);
        // self.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.__mousedown, self);
        // fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_END, self.__mouseup, self);
    };
    TianGongItem.URL = "ui://y0plc878ye03a";
    return TianGongItem;
}(fairygui.GComponent));
__reflect(TianGongItem.prototype, "TianGongItem");
