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
var ViewCommonPrompt = (function (_super) {
    __extends(ViewCommonPrompt, _super);
    function ViewCommonPrompt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemDatas = [];
        return _this;
    }
    ViewCommonPrompt.textItemList = function (arr) {
        GGlobal.layerMgr.open(UIConst.COMMON_PROMPT);
        var v = GGlobal.layerMgr.getView(UIConst.COMMON_PROMPT);
        v.showItemList(arr);
    };
    Object.defineProperty(ViewCommonPrompt, "instance", {
        get: function () {
            if (!ViewCommonPrompt._instance)
                ViewCommonPrompt._instance = new ViewCommonPrompt();
            return ViewCommonPrompt._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**显示物品 */
    ViewCommonPrompt.prototype.showItemList = function (arr) {
        // var item: PromptItemList = PromptItemList.createInstance();
        // if (item instanceof PromptItemList) {
        // } else {
        // 	return;
        // }
        if (this.itemDatas.length < 3) {
            var start = 0;
            // var start = arr.length - 9 > 0 ? arr.length - 9 : 0;
            var arr3 = [];
            for (var i = start; i < arr.length; i++) {
                if (arr3.length == 0) {
                    this.itemDatas.push(arr3);
                }
                arr3.push(arr[i]);
                if (arr3.length >= 3) {
                    arr3 = [];
                }
            }
        }
        this.doLoop();
    };
    ViewCommonPrompt.prototype.doLoop = function () {
        if (this.itemDatas.length > 0 && this._tween == null) {
            var datas = this.itemDatas.shift();
            if (!datas || datas.length == 0)
                return;
            var item;
            if (datas[0] instanceof VoBaZhenTu) {
                item = PromptBaZhenTu.createInstance();
            }
            else {
                item = PromptItemList.createInstance();
            }
            // var item: PromptItemList = PromptItemList.createInstance();
            // item.showItemList(this.itemDatas.shift());
            item.showItemList(datas);
            item.y = fairygui.GRoot.inst.height - item.height - 10;
            item.x = -item.width;
            var midX = (fairygui.GRoot.inst.width - item.width) / 2;
            var endX = fairygui.GRoot.inst.width + item.width;
            this.addChild(item);
            this._tween = egret.Tween.get(item);
            this._tween.to({ x: midX }, 300, egret.Ease.backInOut).wait(500).to({ x: endX }, 300, egret.Ease.backIn).call(this.showItemListNext, this, [item]);
        }
    };
    ViewCommonPrompt.prototype.showItemListNext = function (item) {
        item.parent.removeChild(item);
        item.disposePanel();
        this._tween = null;
        if (this.itemDatas.length == 0) {
            GGlobal.layerMgr.close(UIConst.COMMON_PROMPT);
        }
        else {
            this.doLoop();
        }
    };
    ViewCommonPrompt.prototype.onOpen = function () {
    };
    ViewCommonPrompt.prototype.onClose = function () {
        GGlobal.layerMgr.close(UIConst.COMMON_PROMPT);
    };
    ViewCommonPrompt.prototype.resetPosition = function () {
        this.setXY(0, 0);
    };
    //=============八阵图
    ViewCommonPrompt.textBaZhenTuList = function (arr) {
        GGlobal.layerMgr.open(UIConst.COMMON_PROMPT);
        var v = GGlobal.layerMgr.getView(UIConst.COMMON_PROMPT);
        v.showItemList(arr);
    };
    return ViewCommonPrompt;
}(fairygui.GComponent));
__reflect(ViewCommonPrompt.prototype, "ViewCommonPrompt");
var PromptItemList = (function (_super) {
    __extends(PromptItemList, _super);
    function PromptItemList() {
        return _super.call(this) || this;
    }
    PromptItemList.createInstance = function () {
        var POOL = PromptItemList.POOL;
        if (POOL.length) {
            return POOL.pop();
        }
        return (fairygui.UIPackage.createObject("common", "PromptItemList"));
    };
    PromptItemList.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.back = (this.getChild("back"));
        this.list = (this.getChild("list"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.touchable = false;
    };
    PromptItemList.prototype.showItemList = function (arr) {
        this._dataList = arr;
        this.list.numItems = this._dataList.length;
        if (this.list.numItems == 1) {
            this.list.x = this.back.x + this.back.width / 2 - 102 / 2;
        }
        else if (this.list.numItems == 2) {
            this.list.x = this.back.x + this.back.width / 2 - 102 - 34 / 2;
        }
        else {
            this.list.x = 82;
        }
    };
    PromptItemList.prototype.renderHandle = function (index, obj) {
        var render = obj;
        render.tipEnabled = false;
        render.vo = this._dataList[index];
        render.showNotice = false;
    };
    PromptItemList.prototype.disposePanel = function () {
        this.list.numItems = 0;
        PromptItemList.POOL.push(this);
    };
    PromptItemList.POOL = [];
    PromptItemList.URL = "ui://jvxpx9emx2oe6a";
    return PromptItemList;
}(fairygui.GComponent));
__reflect(PromptItemList.prototype, "PromptItemList");
//八阵图 飘神符
var PromptBaZhenTu = (function (_super) {
    __extends(PromptBaZhenTu, _super);
    function PromptBaZhenTu() {
        return _super.call(this) || this;
    }
    PromptBaZhenTu.createInstance = function () {
        var POOL = PromptBaZhenTu.POOL;
        if (POOL.length) {
            return POOL.pop();
        }
        return (fairygui.UIPackage.createObject("common", "PromptBaZhenTu"));
    };
    PromptBaZhenTu.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.back = (this.getChild("back"));
        this.list = (this.getChild("list"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.touchable = false;
    };
    PromptBaZhenTu.prototype.showItemList = function (arr) {
        this._dataList = arr;
        this.list.numItems = this._dataList.length;
        if (this.list.numItems == 1) {
            this.list.x = this.back.x + this.back.width / 2 - 102 / 2;
        }
        else if (this.list.numItems == 2) {
            this.list.x = this.back.x + this.back.width / 2 - 102 - 34 / 2;
        }
        else {
            this.list.x = 82;
        }
    };
    PromptBaZhenTu.prototype.renderHandle = function (index, obj) {
        var render = obj;
        render.isShowEff = true;
        render.vo = this._dataList[index];
    };
    PromptBaZhenTu.prototype.disposePanel = function () {
        this.list.numItems = 0;
        PromptBaZhenTu.POOL.push(this);
    };
    PromptBaZhenTu.POOL = [];
    PromptBaZhenTu.URL = "ui://jvxpx9emtszw3gq";
    return PromptBaZhenTu;
}(fairygui.GComponent));
__reflect(PromptBaZhenTu.prototype, "PromptBaZhenTu");
