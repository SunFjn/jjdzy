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
var VCrossMineralReport = (function (_super) {
    __extends(VCrossMineralReport, _super);
    function VCrossMineralReport() {
        var _this = _super.call(this) || this;
        _this.order = 0;
        return _this;
    }
    VCrossMineralReport.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossMineralReport"));
    };
    VCrossMineralReport.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n1 = (this.getChild("n1"));
        this.n2 = (this.getChild("n2"));
        this.n3 = (this.getChild("n3"));
        this.roomBt = (this.getChild("roomBt"));
        this.n9 = (this.getChild("n9"));
        this.n10 = (this.getChild("n10"));
        this.roomBt.addClickListener(this.onRoom, this);
    };
    VCrossMineralReport.prototype.onRoom = function () {
        GGlobal.modelCrossMineral.CG_CHECK_RIDEO(this.order);
    };
    VCrossMineralReport.prototype.setdata = function (data, index) {
        var ret = data[0];
        var id = data[1];
        var name = data[2];
        var isMax = data[3] >= Model_CrossMineral.MAX_LEVEL;
        var awards;
        if (data[4]) {
            awards = ConfigHelp.makeItemListArr(data[4]);
        }
        var s = this;
        s.order = index;
        s.n10.visible = ret == 1;
        s.n9.visible = ret == 0;
        s.n2.text = ret == 2 ? "顺手牵羊" : "战斗抢夺";
        s.roomBt.visible = ret != 2;
        switch (ret) {
            case 0:
                if (isMax) {
                    s.n3.text = BroadCastManager.reTxt("{0}抢夺了你的矿藏，好在开采顶级矿藏，没有造成损失", HtmlUtil.fontNoSize(name, Color.getColorStr(2)));
                }
                else {
                    if (awards) {
                        s.n3.text = BroadCastManager.reTxt("{0}抢夺了你的矿藏，损失了{1}", HtmlUtil.fontNoSize(name, Color.getColorStr(2)), HtmlUtil.fontNoSize(awards[0].name, Color.getColorStr(awards[0].quality)) + "x" + awards[0].count +
                            "、" + HtmlUtil.fontNoSize(awards[1].name, Color.getColorStr(awards[1].quality)) + "x" + awards[1].count);
                    }
                }
                break;
            case 1:
                s.n3.text = BroadCastManager.reTxt("{0}不自量力，前来抢夺你的矿藏，被你狠狠的教训了一顿", HtmlUtil.fontNoSize(name, Color.getColorStr(2)));
                break;
            case 2:
                if (isMax) {
                    s.n3.text = BroadCastManager.reTxt("{0}在你的矿藏上顺手牵羊，好在开采顶级矿藏，没有造成损失", HtmlUtil.fontNoSize(name, Color.getColorStr(2)));
                }
                else {
                    if (awards) {
                        s.n3.text = BroadCastManager.reTxt("{0}在你的矿藏上顺手牵羊，损失了{1}", HtmlUtil.fontNoSize(name, Color.getColorStr(2)), HtmlUtil.fontNoSize(awards[0].name, Color.getColorStr(awards[0].quality)) + "x" + awards[0].count +
                            "、" + HtmlUtil.fontNoSize(awards[1].name, Color.getColorStr(awards[1].quality)) + "x" + awards[1].count);
                    }
                }
                break;
        }
    };
    VCrossMineralReport.URL = "ui://yqpfulefnyv75c";
    return VCrossMineralReport;
}(fairygui.GComponent));
__reflect(VCrossMineralReport.prototype, "VCrossMineralReport");
