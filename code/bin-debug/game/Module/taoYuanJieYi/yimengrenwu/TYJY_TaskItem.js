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
 * 义盟任务子界面item
 */
var TYJY_TaskItem = (function (_super) {
    __extends(TYJY_TaskItem, _super);
    function TYJY_TaskItem() {
        var _this = _super.call(this) || this;
        _this._cs = 0;
        return _this;
    }
    TYJY_TaskItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_TaskItem"));
    };
    TYJY_TaskItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        var s = this;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
    };
    TYJY_TaskItem.prototype.clean = function () {
        var s = this;
        s.list.numItems = 0;
    };
    TYJY_TaskItem.prototype.setdata = function (cfg) {
        var s = this;
        if (!cfg)
            return;
        var model = GGlobal.model_TYJY;
        s.titleLb.text = "任务：" + cfg.name;
        var obj = model.taskObj[cfg.id];
        s._listData = obj.arr ? obj.arr : [];
        s._cs = cfg.cs;
        s.list.numItems = this._listData ? this._listData.length : 0;
        var arr = model.taskObj[cfg.id].arr1 ? model.taskObj[cfg.id].arr1 : [];
        s.boxs = [];
        for (var i = 0; i < 3; i++) {
            s.boxs.push(s["box" + i]);
            s.boxs[i].setDate(i);
            s.boxs[i].cfg = cfg;
            s.boxs[i].update(arr[i]);
        }
        s.expBar.max = 3;
        var value = 0;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var status_1 = arr[i];
            if (status_1 <= 0) {
                break;
            }
            value++;
        }
        s.expBar.value = value;
        s.expBar._titleObject.text = "";
    };
    TYJY_TaskItem.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._listData[idx][0], this._listData[idx][1], this._cs);
    };
    TYJY_TaskItem.URL = "ui://m2fm2aiyvfmx15";
    return TYJY_TaskItem;
}(fairygui.GComponent));
__reflect(TYJY_TaskItem.prototype, "TYJY_TaskItem");
