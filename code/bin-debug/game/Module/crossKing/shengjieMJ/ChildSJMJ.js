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
var ChildSJMJ = (function (_super) {
    __extends(ChildSJMJ, _super);
    function ChildSJMJ() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildSJMJ.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "ChildSJMJ"));
    };
    ChildSJMJ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.onItemRender;
        self.list.callbackThisObj = self;
        self.btnHand.visible = false;
        self.initOrUpdateList();
    };
    ChildSJMJ.prototype.initView = function (pParent) {
    };
    ChildSJMJ.prototype.onHand = function () {
        GGlobal.modelSJMJ.CG3787(0);
    };
    ChildSJMJ.prototype.onItemRender = function (index, renderer) {
        var data = this.datas[index];
        renderer.data = data;
        renderer.setBg(index);
    };
    ChildSJMJ.prototype.initOrUpdateList = function () {
        var self = this;
        if (!self.datas) {
            var lib = Config.sjmj_258;
            var datas = this.datas = [];
            for (var key in lib) {
                datas.push(lib[key]);
            }
        }
        self.datas.sort(self.onSort);
        self.list.numItems = self.datas.length;
        self.list.scrollToView(0);
    };
    ChildSJMJ.prototype.onSort = function (a, b) {
        var openLvA = a.lv;
        var openLvB = b.lv;
        var heroLv = Model_LunHui.realLv;
        var aIndex = a.px + (heroLv < openLvA ? 100 : 0);
        var bIndex = b.px + (heroLv < openLvB ? 100 : 0);
        return aIndex - bIndex;
    };
    ChildSJMJ.prototype.openPanel = function () {
        var s = this;
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_sjmj, s.initOrUpdateList, s);
        GGlobal.modelSJMJ.CG3761();
    };
    ChildSJMJ.prototype.closePanel = function () {
        var s = this;
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_sjmj, s.initOrUpdateList, s);
        s.list.numItems = 0;
    };
    ChildSJMJ.URL = "ui://yqpfulefgenj3w";
    return ChildSJMJ;
}(fairygui.GComponent));
__reflect(ChildSJMJ.prototype, "ChildSJMJ", ["IPanel"]);
