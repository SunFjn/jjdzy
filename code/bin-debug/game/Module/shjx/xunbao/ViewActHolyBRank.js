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
var ViewActHolyBRank = (function (_super) {
    __extends(ViewActHolyBRank, _super);
    function ViewActHolyBRank() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewActHolyBRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "ViewActHolyBRank"));
    };
    ViewActHolyBRank.prototype.childrenCreated = function () {
        GGlobal.createPack("shouhunJX");
        this.view = fairygui.UIPackage.createObject("shouhunJX", "ViewActHolyBRank").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.lbMy = (this.view.getChild("lbMy"));
        this.lbQuan = (this.view.getChild("lbQuan"));
        this.lbTip = (this.view.getChild("lbTip"));
        this.c1 = this.view.getController("c1");
        this.tab0 = (this.view.getChild("tab0"));
        this.tab1 = (this.view.getChild("tab1"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.list.numItems = 0;
        this.lbTip.text = ConfigHelp.getSystemNum(5607) + "圈后方可上榜";
        _super.prototype.childrenCreated.call(this);
    };
    ViewActHolyBRank.prototype.onShown = function () {
        if (Model_GlobalMsg.kaifuDay < 15) {
            this.tab0.visible = false;
            this.tab1.visible = false;
        }
        else {
            this.tab0.visible = true;
            this.tab1.visible = true;
        }
        this.c1.selectedIndex = 0;
        this.addListen();
        this.selectPage();
    };
    ViewActHolyBRank.prototype.onHide = function () {
        this.removeListen();
        this.list.numItems = 0;
    };
    ViewActHolyBRank.prototype.addListen = function () {
        this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
        GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_XUNBAO_RANK, this.update, this);
    };
    ViewActHolyBRank.prototype.removeListen = function () {
        this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
        GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_XUNBAO_RANK, this.update, this);
        GGlobal.layerMgr.close(UIConst.ACT_HOLYB_XBRANK);
    };
    ViewActHolyBRank.prototype.update = function () {
        var model = GGlobal.modelSHXunbao;
        var myRank = model.xbRankMy > 0 ? model.xbRankMy : "未上榜";
        this.lbMy.text = "我的排名：" + myRank;
        this.lbQuan.text = "我的圈数：" + model.xbQuanMy;
        this._listData = Model_SHXunBao.xbRankCfgArr();
        this.list.numItems = this._listData.length;
    };
    ViewActHolyBRank.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.setVo(this._listData[index], index);
    };
    ViewActHolyBRank.prototype.selectPage = function () {
        var i = this.c1.selectedIndex;
        if (i == 0) {
            GGlobal.modelSHXunbao.CG_XUNBAO_RANK(1);
        }
        else {
            GGlobal.modelSHXunbao.CG_XUNBAO_RANK(2);
        }
    };
    ViewActHolyBRank.URL = "ui://d5y9ngt6phvva";
    return ViewActHolyBRank;
}(UIModalPanel));
__reflect(ViewActHolyBRank.prototype, "ViewActHolyBRank");
