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
var ChildActPreView = (function (_super) {
    __extends(ChildActPreView, _super);
    function ChildActPreView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildActPreView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = function (index, render) { render.setData(ModelActPreView.datas[index]); };
        self.rewardGRP.displayObject.touchEnabled = true;
        self.rewardGRP.addClickListener(self.onGetReward, self);
    };
    ChildActPreView.prototype.onGetReward = function () {
        GGlobal.layerMgr.open(UIConst.VACTPREVIEWBOX);
    };
    ChildActPreView.prototype.onOpen = function () {
        var self = this;
        var date = new Date(Model_GlobalMsg.getServerTime());
        self.txtDate.text = (date.getMonth() + 1) + "月" + date.getDate() + "日  " + "周" + self.getWeek(date.getDay());
        self.list.numItems = ModelActPreView.datas.length;
        GGlobal.modelactPreView.listen(ModelActPreView.msg_datas, self.showNot, self);
        this.showNot();
    };
    ChildActPreView.prototype.showNot = function () {
        this.noticeImg.visible = GGlobal.modelactPreView.getNotice();
    };
    ChildActPreView.prototype.getWeek = function (day) {
        if (day == 0) {
            return "日";
        }
        else {
            return ConfigHelp.NumberToChinese(day);
        }
    };
    ChildActPreView.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        GGlobal.modelactPreView.remove(ModelActPreView.msg_datas, this.showNot, this);
    };
    ChildActPreView.URL = "ui://b3p8szvvtc2x1p";
    return ChildActPreView;
}(fairygui.GComponent));
__reflect(ChildActPreView.prototype, "ChildActPreView");
