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
var View_Share_Panel = (function (_super) {
    __extends(View_Share_Panel, _super);
    function View_Share_Panel() {
        var _this = _super.call(this) || this;
        _this.gridArr = [];
        _this.loadRes("Share");
        return _this;
    }
    View_Share_Panel.prototype.childrenCreated = function () {
        GGlobal.createPack("Share");
        var sf = this;
        sf.view = fairygui.UIPackage.createObject("Share", "View_Share_Panel").asCom;
        sf.contentPane = sf.view;
        for (var i = 0; i < 5; i++) {
            var grid = (sf.view.getChild("grid" + i));
            sf.gridArr.push(grid);
        }
        sf.drawBt = (sf.view.getChild("drawBt"));
        sf.n1 = (sf.view.getChild("n1"));
        sf.itemImg = (sf.view.getChild("itemImg"));
        sf.checkBt = (sf.view.getChild("checkBt"));
        sf.closeButton = (sf.view.getChild("closeButton"));
        sf.txtHasGot = (sf.view.getChild("txtHasGot"));
        sf.drawBt.addClickListener(sf.shareHandler, sf);
        sf.txtHasGot.visible = false;
        _super.prototype.childrenCreated.call(this);
        sf.initAwards();
    };
    View_Share_Panel.prototype.initAwards = function () {
        var sf = this;
        var rewards = ConfigHelp.makeItemListArr(JSON.parse(Config.fenxiang_013[1].reward));
        for (var i = 0; i < 5; i++) {
            var grid = sf.gridArr[i];
            grid.isShowEff = true;
            grid.vo = rewards[i];
            grid.tipEnabled = true;
            grid.showEff(true);
        }
    };
    View_Share_Panel.prototype.shareHandler = function () {
        var sf = this;
        if (GGlobal.sdk) {
            GGlobal.sdk.ShareApp();
            GGlobal.control.listenonce(Enum_MsgType.GAMEACTIVE, sf.gameReact, sf);
        }
        else {
            GGlobal.modelShare.CG2701(1); //写死了先
            sf.closeEventHandler(null);
        }
    };
    View_Share_Panel.prototype.gameReact = function () {
        var sf = this;
        GGlobal.modelShare.CG2701(1); //写死了先
        sf.closeEventHandler(null);
    };
    View_Share_Panel.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        var sf = this;
        var state = GGlobal.modelShare.statesDic[1];
        if (state == 2) {
            sf.txtHasGot.visible = true;
        }
        else {
            sf.txtHasGot.visible = false;
        }
        IconUtil.setImg(sf.n1, Enum_Path.BACK_URL + "share.png");
        IconUtil.setImg(sf.itemImg, Enum_Path.PIC_URL + "640101.png");
    };
    View_Share_Panel.prototype.onHide = function () {
        var sf = this;
        GGlobal.layerMgr.close(UIConst.SHARE);
        ConfigHelp.cleanGridEff(sf.gridArr);
        IconUtil.setImg(sf.n1, null);
        IconUtil.setImg(sf.itemImg, null);
    };
    View_Share_Panel.URL = "ui://kummtenyayd22";
    return View_Share_Panel;
}(UIModalPanel));
__reflect(View_Share_Panel.prototype, "View_Share_Panel");
