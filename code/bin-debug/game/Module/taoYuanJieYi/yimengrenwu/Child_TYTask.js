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
/**
 * 义盟任务子界面
 */
var Child_TYTask = (function (_super) {
    __extends(Child_TYTask, _super);
    function Child_TYTask() {
        return _super.call(this) || this;
    }
    Child_TYTask.createInstance = function () {
        return (fairygui.UIPackage.createObject("taoYuanJieYi", "Child_TYTask"));
    };
    Child_TYTask.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
        var self = this;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
    };
    Child_TYTask.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    Child_TYTask.prototype.openPanel = function (pData) {
        GGlobal.control.listen(UIConst.TYJY_YMRW, this.updateList, this);
        this.show();
    };
    Child_TYTask.prototype.closePanel = function () {
        this.onHide();
    };
    Child_TYTask.prototype.show = function () {
        var self = this;
        this._listData = [];
        for (var key in Config.tyjyrw_251) {
            var cfg = Config.tyjyrw_251[key];
            this._listData.push(cfg);
        }
        self.updateList();
    };
    Child_TYTask.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        GGlobal.control.remove(UIConst.TYJY_YMRW, this.updateList, this);
    };
    /**
     * 更新列表数据
     */
    Child_TYTask.prototype.updateList = function () {
        var self = this;
        self.list.numItems = this._listData ? this._listData.length : 0;
    };
    Child_TYTask.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._listData[idx]);
    };
    Child_TYTask.URL = "ui://m2fm2aiyvfmx14";
    return Child_TYTask;
}(fairygui.GComponent));
__reflect(Child_TYTask.prototype, "Child_TYTask", ["IPanel"]);
