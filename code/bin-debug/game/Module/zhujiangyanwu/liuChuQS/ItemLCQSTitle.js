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
var ItemLCQSTitle = (function (_super) {
    __extends(ItemLCQSTitle, _super);
    function ItemLCQSTitle() {
        return _super.call(this) || this;
    }
    ItemLCQSTitle.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ItemLCQSTitle"));
    };
    ItemLCQSTitle.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ItemLCQSTitle.prototype.addListen = function () {
        IconUtil.setImg(this.imgBg, Enum_Path.GUAN_QIA_URL + "lcqsBg.png");
        this.btnSM.addClickListener(this.onShuoMing, this);
        GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.openui, this.onUpdate, this);
        this.onUpdate();
    };
    ItemLCQSTitle.prototype.removeListen = function () {
        IconUtil.setImg(this.imgBg, null);
        this.btnSM.removeClickListener(this.onShuoMing, this);
        GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.openui, this.onUpdate, this);
    };
    ItemLCQSTitle.prototype.onShuoMing = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.CHILD_LCQS);
    };
    ItemLCQSTitle.prototype.onUpdate = function () {
        var s = this;
        var m = GGlobal.model_LiuChuQS;
        s.lbHelpMe.text = "今日求助次数：" + m.helpMeCt + "/" + ConfigHelp.getSystemNum(6901);
        s.lbHelpOth.text = "今日帮助次数：" + m.helpOthCt + "/" + ConfigHelp.getSystemNum(6902);
    };
    ItemLCQSTitle.URL = "ui://7a366usaloov1t";
    return ItemLCQSTitle;
}(fairygui.GComponent));
__reflect(ItemLCQSTitle.prototype, "ItemLCQSTitle");
