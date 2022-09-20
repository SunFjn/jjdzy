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
var ChildServerRank = (function (_super) {
    __extends(ChildServerRank, _super);
    function ChildServerRank() {
        return _super.call(this) || this;
    }
    ChildServerRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "ChildServerRank"));
    };
    ChildServerRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        CommonManager.parseChildren(sf, sf);
        // this.n15 = <fairygui.GImage><any>(this.getChild("n15"));
        // this.n14 = <fairygui.GImage><any>(this.getChild("n14"));
        // this.imgHead = <fairygui.GLoader><any>(this.getChild("imgHead"));
        // this.imgHeadGrid = <fairygui.GLoader><any>(this.getChild("imgHeadGrid"));
        // this.lbScore = <fairygui.GTextField><any>(this.getChild("lbScore"));
        // this.n6 = <ViewGrid><any>(this.getChild("n6"));
        // this.n7 = <ViewGrid><any>(this.getChild("n7"));
        // this.n8 = <ViewGrid><any>(this.getChild("n8"));
        // this.n10 = <fairygui.GImage><any>(this.getChild("n10"));
        // this.lbMvp = <fairygui.GTextField><any>(this.getChild("lbMvp"));
        // this.n11 = <fairygui.GImage><any>(this.getChild("n11"));
        // this.n1 = <fairygui.GTextField><any>(this.getChild("n1"));
        // this.n18 = <fairygui.GList><any>(this.getChild("n18"));
        sf.grids = [sf.n6, sf.n7, sf.n8];
        this.n18.callbackThisObj = this;
        this.n18.itemRenderer = this.itemRender;
        var mvpcfg = ConfigHelp.makeItemListArr(JSON.parse(ConfigHelp.getSystemDesc(3903)));
        for (var i = 0; i < 3; i++) {
            sf.grids[i].vo = mvpcfg[i];
            sf.grids[i].showEff(true);
            sf.grids[i].tipEnabled = true;
        }
    };
    ChildServerRank.prototype.itemRender = function (idx, obj) {
        var item = obj;
        if (this._data[idx]) {
            item.setdata(this._data[idx], idx);
        }
        else {
            item.setdata(null, idx);
        }
    };
    ChildServerRank.prototype.listUpdate = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        this._data = m.rank_server;
        this.n18.numItems = 3;
        if (m.mvpHead) {
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHeadGrid), sf.imgHeadGrid);
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHead), sf.imgHead);
        }
        sf.lbMvp.text = m.currentMVP == "" ? "虚位以待" : m.currentMVP;
        sf.lbScore.text = "MVP玩家积分：" + m.currentMVPScore;
    };
    ChildServerRank.prototype.show = function () {
        var sf = this;
        sf.listUpdate();
        GGlobal.modelFengHuoLY.CG_SERVERRANK_3555();
        GGlobal.control.listen(Enum_MsgType.FHLY_SERVER_UPDATE, sf.listUpdate, sf);
        for (var i = 0; i < 3; i++) {
            sf.grids[i].showEff(true);
        }
        IconUtil.setImg(sf.n14, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/bg.png");
    };
    ChildServerRank.prototype.hide = function () {
        var sf = this;
        GGlobal.control.remove(Enum_MsgType.FHLY_SERVER_UPDATE, sf.listUpdate, sf);
        this.n18.numItems = 0;
        for (var i = 0; i < 3; i++) {
            sf.grids[i].showEff(false);
        }
        IconUtil.setImg(sf.n14, null);
    };
    ChildServerRank.URL = "ui://edvdots4kzd9i";
    return ChildServerRank;
}(fairygui.GComponent));
__reflect(ChildServerRank.prototype, "ChildServerRank");
