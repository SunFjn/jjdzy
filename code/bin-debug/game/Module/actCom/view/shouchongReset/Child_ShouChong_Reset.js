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
var Child_ShouChong_Reset = (function (_super) {
    __extends(Child_ShouChong_Reset, _super);
    function Child_ShouChong_Reset() {
        return _super.call(this) || this;
    }
    Child_ShouChong_Reset.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActComShouChong", "Child_ShouChong_Reset"));
    };
    Child_ShouChong_Reset.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    Child_ShouChong_Reset.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_ShouChong_Reset.prototype.onGo = function () {
        var date = new Date(Model_GlobalMsg.getServerTime());
        var key = "SHOUCHONG_RESET_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
        var value = egret.localStorage.getItem(key);
        if (!value) {
            GGlobal.reddot.setCondition(UIConst.SHOUCHONG_RESET, 0, false);
            egret.localStorage.setItem(key, "SHOUCHONG_RESET_Notice");
        }
        ViewChongZhi.tryToOpenCZ();
    };
    Child_ShouChong_Reset.prototype.update = function () {
        var self = this;
        self.noticeImg.visible = GGlobal.reddot.checkCondition(UIConst.SHOUCHONG_RESET);
        self.timeLb.text = "剩余时间：" + DateUtil.getMSBySecond4(self.vo.getSurTime());
        Timer.instance.listen(self.timeHandler, self);
    };
    Child_ShouChong_Reset.prototype.timeHandler = function () {
        var self = this;
        if (self.vo.getSurTime() <= 0) {
            Timer.instance.remove(self.timeHandler, self);
        }
        else {
            self.timeLb.text = "剩余时间：" + DateUtil.getMSBySecond4(self.vo.getSurTime());
        }
    };
    Child_ShouChong_Reset.prototype.openPanel = function (vo) {
        var self = this;
        self.vo = vo;
        self.update();
        self.goBt.addClickListener(self.onGo, self);
        IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "shouchongReset.jpg");
    };
    Child_ShouChong_Reset.prototype.closePanel = function (vo) {
        var self = this;
        self.goBt.removeClickListener(self.onGo, self);
        Timer.instance.remove(self.timeHandler, self);
        IconUtil.setImg(self.backImg, null);
    };
    Child_ShouChong_Reset.URL = "ui://yih9vfegzm7h2";
    Child_ShouChong_Reset.pkg = "ActComShouChong";
    return Child_ShouChong_Reset;
}(fairygui.GComponent));
__reflect(Child_ShouChong_Reset.prototype, "Child_ShouChong_Reset");
