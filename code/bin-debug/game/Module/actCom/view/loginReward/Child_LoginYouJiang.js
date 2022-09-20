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
var Child_LoginYouJiang = (function (_super) {
    __extends(Child_LoginYouJiang, _super);
    function Child_LoginYouJiang() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Child_LoginYouJiang.createInstance = function () {
        return (fairygui.UIPackage.createObject("LoginReward", "Child_LoginYouJiang"));
    };
    Child_LoginYouJiang.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Item_LoginYouJiang.URL, Item_LoginYouJiang);
    };
    Child_LoginYouJiang.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.setVirtual();
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
    };
    Child_LoginYouJiang.prototype.initView = function (pParent) {
        var self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    };
    Child_LoginYouJiang.prototype.itemRender = function (index, item) {
        item.setData(this.datas[index]);
    };
    Child_LoginYouJiang.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        GGlobal.control.listen(UIConst.ACTCOM_LOGINREWARD, self.setList, self);
        self.startTime();
        GGlobal.modelEightLock.CG4571(pData.id);
        IconUtil.setImg(self.bg, "resource/image/sanGuoQD/" + UIConst.DENGLUSONGLI + ".jpg");
    };
    Child_LoginYouJiang.prototype.setList = function () {
        var self = this;
        var model = GGlobal.modelLoginGift;
        self.datas = [];
        for (var key in model.rewardData) {
            self.datas.push(Config.wszwdlyj_324[parseInt(key)]);
        }
        self.datas.sort(function (a, b) {
            return self.getSortIndex(a.id) - self.getSortIndex(b.id);
        });
        self.list.numItems = self.datas.length;
    };
    Child_LoginYouJiang.prototype.getSortIndex = function (cfgID) {
        var model = GGlobal.modelLoginGift;
        var ret = cfgID;
        if (model.rewardData[cfgID] == 1) {
            ret -= 10000;
        }
        else if (model.rewardData[cfgID] == 2) {
            ret += 10000;
        }
        return ret;
    };
    Child_LoginYouJiang.prototype.closePanel = function () {
        var self = this;
        GGlobal.control.remove(UIConst.ACTCOM_LOGINREWARD, self.setList);
        Timer.instance.remove(self.timeHandler, self);
        self.datas = [];
        self.list.numItems = 0;
        IconUtil.setImg(self.bg, null);
    };
    Child_LoginYouJiang.prototype.startTime = function () {
        var self = this;
        self.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.vo.getSurTime());
        if (self.vo.getSurTime() > 0) {
            Timer.instance.listen(self.timeHandler, self, 1000);
        }
        else {
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    Child_LoginYouJiang.prototype.timeHandler = function () {
        var self = this;
        self.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.vo.getSurTime());
        if (self.vo.getSurTime() <= 0) {
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    Child_LoginYouJiang.pkg = "LoginReward";
    Child_LoginYouJiang.URL = "ui://q4uuphepdsdy1";
    return Child_LoginYouJiang;
}(fairygui.GComponent));
__reflect(Child_LoginYouJiang.prototype, "Child_LoginYouJiang", ["IPanel"]);
