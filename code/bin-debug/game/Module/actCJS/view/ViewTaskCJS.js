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
 * 成就树任务面板
 * @author: lujiahao
 * @date: 2019-11-21 18:16:56
 */
var ViewTaskCJS = (function (_super) {
    __extends(ViewTaskCJS, _super);
    function ViewTaskCJS() {
        var _this = _super.call(this) || this;
        _this._curLayer = 1;
        _this.loadRes("actCJS", "actCJS_atlas0");
        return _this;
    }
    ViewTaskCJS.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCJS", "ViewTaskCJS"));
    };
    ViewTaskCJS.prototype.childrenCreated = function () {
        GGlobal.createPack("actCJS");
        this.view = fairygui.UIPackage.createObject("actCJS", "ViewTaskCJS").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewTaskCJS.prototype.initView = function () {
        this.list.itemRenderer = this.onItemRender;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    };
    //=========================================== API ==========================================
    ViewTaskCJS.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        if (t._args && "layer" in t._args) {
            t._curLayer = t._args.layer;
        }
        t.refreshData();
        t.list.scrollToView(0);
    };
    ViewTaskCJS.prototype.onHide = function () {
        this.registerEvent(false);
        this.list.numItems = 0;
    };
    ViewTaskCJS.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewTaskCJS.prototype.onItemRender = function (pIndex, pItem) {
        if (this._dataList) {
            pItem.setData(this._dataList[pIndex]);
        }
    };
    ViewTaskCJS.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelCJS;
        var t_qs = t_model.getCurQs();
        var t_voList = t_model.getTaskVoListByQsAndLayer(t_qs, t._curLayer).concat();
        t_voList.sort(function (pA, pB) {
            return pB.sortValue - pA.sortValue;
        });
        t._dataList = t_voList;
        t.list.numItems = t_voList.length;
        var t_strLayer = ConfigHelp.NumberToChinese(t._curLayer);
        t.tfLayer.text = "\u6210\u5C31\u6811\u7B2C" + t_strLayer + "\u5C42";
        var t_completeCount = 0;
        for (var _i = 0, t_voList_1 = t_voList; _i < t_voList_1.length; _i++) {
            var v = t_voList_1[_i];
            if (v.state == 1) {
                t_completeCount++;
            }
        }
        t.tfCount.text = "\u5DF2\u70B9\u4EAE\uFF1A" + t_completeCount + "/" + t_voList.length;
    };
    ViewTaskCJS.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.CJS_UPDATE, t.onUpdate, t);
    };
    //======================================== handler =========================================
    ViewTaskCJS.prototype.onUpdate = function () {
        var t = this;
        t.refreshData();
    };
    //>>>>end
    ViewTaskCJS.URL = "ui://ehocr0vupwnz7";
    return ViewTaskCJS;
}(UIModalPanel));
__reflect(ViewTaskCJS.prototype, "ViewTaskCJS");
