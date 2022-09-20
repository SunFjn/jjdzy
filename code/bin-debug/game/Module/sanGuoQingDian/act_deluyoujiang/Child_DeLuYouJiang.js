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
/**登陆有礼 */
var Child_DeLuYouJiang = (function (_super) {
    __extends(Child_DeLuYouJiang, _super);
    function Child_DeLuYouJiang() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Child_DeLuYouJiang.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "Child_DeLuYouJiang"));
    };
    Child_DeLuYouJiang.setExtends = function () {
    };
    Child_DeLuYouJiang.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        this.list.setVirtual();
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.itemRender;
    };
    Child_DeLuYouJiang.prototype.initView = function (pParent) {
        var self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    };
    Child_DeLuYouJiang.prototype.itemRender = function (index, item) {
        item.setData(this.datas[index]);
    };
    Child_DeLuYouJiang.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        self.list.numItems = 0;
        GGlobal.control.listen(Enum_MsgType.DENGLUYOULI, self.setList, self);
        GGlobal.control.listen(Enum_MsgType.DENGLUYOULIREWARD, self.refreshList, self);
        self.startTime();
        GGlobal.modelActivity.CG_OPENACT(pData.id);
        IconUtil.setImg(self.bg, "resource/image/sanGuoQD/" + UIConst.DENGLUSONGLI + ".jpg");
    };
    Child_DeLuYouJiang.prototype.refreshList = function (arg) {
        for (var i = 0; i < this.datas.length; ++i) {
            if (arg.id == this.datas[i].id) {
                this.datas[i].state = 2;
                break;
            }
        }
        for (var i = 0; i < this.datas.length; ++i) {
            var state = this.datas[i].state == 1;
            GGlobal.reddot.setCondition(UIConst.DENGLUSONGLI, 0, state);
            if (state) {
                break;
            }
        }
        this.datas.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
        this.list.numItems = this.datas.length;
        GGlobal.control.notify(Enum_MsgType.ACTIVITY_ACTOPENSTATE);
        GGlobal.modelSGQD.notify(ModelSGQD.msg_notice);
    };
    Child_DeLuYouJiang.prototype.setList = function (arg) {
        this.datas = arg.data;
        this.datas.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
        this.list.numItems = this.datas.length;
    };
    Child_DeLuYouJiang.prototype.closePanel = function () {
        var self = this;
        GGlobal.control.remove(Enum_MsgType.DENGLUYOULI, self.setList);
        GGlobal.control.remove(Enum_MsgType.DENGLUYOULIREWARD, self.refreshList);
        Timer.instance.remove(self.timeHandler, self);
        self.datas = [];
        self.list.numItems = 0;
        IconUtil.setImg(self.bg, null);
    };
    Child_DeLuYouJiang.prototype.startTime = function () {
        var self = this;
        var vo = self.vo;
        self.times = vo.getSurTime();
        self.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.times);
        if (self.times > 0) {
            Timer.instance.listen(self.timeHandler, self, 1000);
        }
        else {
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    Child_DeLuYouJiang.prototype.timeHandler = function () {
        var s = this;
        s.times--;
        s.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
        if (s.times <= 0) {
            Timer.instance.remove(s.timeHandler, s);
        }
    };
    Child_DeLuYouJiang.pkg = "sanGuoQingDian";
    Child_DeLuYouJiang.URL = "ui://kdt501v2mq0c1e";
    return Child_DeLuYouJiang;
}(fairygui.GComponent));
__reflect(Child_DeLuYouJiang.prototype, "Child_DeLuYouJiang", ["IPanel"]);
