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
 * 许愿树目标排行
 */
var WishTreeTargetView = (function (_super) {
    __extends(WishTreeTargetView, _super);
    function WishTreeTargetView() {
        var _this = _super.call(this) || this;
        _this._systemId = 0;
        _this.childrenCreated();
        return _this;
    }
    WishTreeTargetView.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("ActCom_WishTree", "WishTreeTargetView").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    WishTreeTargetView.prototype.onShown = function () {
        this._systemId = this._args.id;
        this.addListen();
        // GGlobal.modelWishTree.CG_OPEN_TARGETUI(this._systemId);
        this.update();
    };
    WishTreeTargetView.prototype.onHide = function () {
        this.removeListen();
        this.list.numItems = 0;
        GGlobal.layerMgr.close(this.panelId);
    };
    WishTreeTargetView.prototype.addListen = function () {
        // GGlobal.control.listen(UIConst.WISHTREE_TARGET, this.update, this);
        GGlobal.control.listen(UIConst.WISHTREE_ACT, this.update, this);
        GGlobal.control.listen(UIConst.WISHTREE_SYSTEM, this.update, this);
        GGlobal.control.listen(Enum_MsgType.WISHTREE_PRAY_MOVIE, this.update, this);
    };
    WishTreeTargetView.prototype.removeListen = function () {
        // GGlobal.control.remove(UIConst.WISHTREE_TARGET, this.update, this);
        GGlobal.control.remove(UIConst.WISHTREE_ACT, this.update, this);
        GGlobal.control.remove(UIConst.WISHTREE_SYSTEM, this.update, this);
        GGlobal.control.remove(Enum_MsgType.WISHTREE_PRAY_MOVIE, this.update, this);
    };
    WishTreeTargetView.prototype.update = function () {
        var model = GGlobal.modelWishTree;
        this.dataArr = model.targetArr;
        this.dataArr.sort(this.funcSort);
        this.list.numItems = this.dataArr.length;
        var ct = model.targetCount ? model.targetCount + "" : "0";
        if (this.dataArr.length > 0)
            this.list.scrollToView(0);
        this.lb.text = "我的许愿次数：" + ct;
    };
    WishTreeTargetView.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.setVo(this.dataArr[index], index, this._systemId);
    };
    WishTreeTargetView.prototype.funcSort = function (a, b) {
        if (a.status == b.status) {
            return a.id - b.id;
        }
        else {
            if (a.status == 1) {
                return -1;
            }
            if (b.status == 1) {
                return 1;
            }
            if (a.status == 0) {
                return -1;
            }
            if (b.status == 0) {
                return 1;
            }
        }
        return 1;
    };
    WishTreeTargetView.URL = "ui://zyevj37nlonvd";
    return WishTreeTargetView;
}(UIModalPanel));
__reflect(WishTreeTargetView.prototype, "WishTreeTargetView");
