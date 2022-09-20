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
var ChildShaoZhuTarget = (function (_super) {
    __extends(ChildShaoZhuTarget, _super);
    function ChildShaoZhuTarget() {
        var _this = _super.call(this) || this;
        _this._currentID = 1;
        _this.dataProvider = [];
        _this.labels = ["少主升星", "亲密度", "技能洗练", "技能星级", "少主战力"];
        return _this;
    }
    Object.defineProperty(ChildShaoZhuTarget, "instance", {
        get: function () {
            if (!ChildShaoZhuTarget._instance) {
                ChildShaoZhuTarget._instance = (fairygui.UIPackage.createObject("shaozhuAct", "ChildShaoZhuTarget"));
            }
            return ChildShaoZhuTarget._instance;
        },
        enumerable: true,
        configurable: true
    });
    ChildShaoZhuTarget.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.n0.callbackThisObj = self;
        self.n0.itemRenderer = self.iconReder;
        self.n0.numItems = self.labels.length;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.listRender;
    };
    ChildShaoZhuTarget.prototype.iconReder = function (idx, obj) {
        var item = obj;
        item.text = this.labels[idx];
        item.data = idx + 1;
    };
    ChildShaoZhuTarget.prototype.listRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._data[idx]);
    };
    ChildShaoZhuTarget.prototype.updateView = function () {
        this._data = GGlobal.modelShaoZhuAct.target_data;
        this.list.numItems = this._data.length;
    };
    ChildShaoZhuTarget.prototype.setNotic = function () {
        var data = GGlobal.modelShaoZhuAct.target_data;
        var cnt = this._children.length;
        var _children = this.n0._children;
        for (var j = 0; j < cnt; ++j) {
            var btn = _children[j];
            if (btn) {
                var id = btn.data;
                btn.getChild("noticeImg").visible = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_TARGET, id - 1);
            }
        }
    };
    ChildShaoZhuTarget.prototype.listHandle = function (evt) {
        var a = this;
        var tab = evt.itemObject;
        var id = tab.data;
        if (TimeUitl.cool("ChildShaoZhuTarget", 100)) {
            GGlobal.modelShaoZhuAct.CG_OPEN_TARGET(id);
        }
    };
    ChildShaoZhuTarget.prototype.onUpdate = function () {
        var datas = GGlobal.modelEightLock.getDatas();
        var act = ModelEightLock.originalDatas[UIConst.SHAOZHU_TARGET];
        var end = act ? act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.lbTime.text = "00:00:00";
        }
    };
    ChildShaoZhuTarget.prototype.disposePanel = function () {
        var n = this;
        n.list.numItems = 0;
        GGlobal.control.remove(UIConst.SHAOZHU_TARGET, n.updateView, n);
        GGlobal.reddot.remove(UIConst.SHAOZHU_ACT, n.setNotic, n);
        n.n0.removeEventListener(fairygui.ItemEvent.CLICK, n.listHandle, n);
        IconUtil.setImg(this.n6, null);
    };
    ChildShaoZhuTarget.prototype.show = function () {
        var n = this;
        GGlobal.modelShaoZhuAct.CG_OPEN_TARGET(this._currentID);
        GGlobal.control.listen(UIConst.SHAOZHU_TARGET, n.updateView, n);
        GGlobal.reddot.listen(UIConst.SHAOZHU_ACT, n.setNotic, n);
        n.n0.addEventListener(fairygui.ItemEvent.CLICK, n.listHandle, n);
        IconUtil.setImg(this.n6, Enum_Path.BACK_URL + "6806.jpg");
        n.n0.selectedIndex = 0;
        n.updateView();
    };
    ChildShaoZhuTarget.URL = "ui://w5ll6n5j6hpm4";
    return ChildShaoZhuTarget;
}(fairygui.GComponent));
__reflect(ChildShaoZhuTarget.prototype, "ChildShaoZhuTarget");
