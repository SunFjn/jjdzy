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
var JinShengItem = (function (_super) {
    __extends(JinShengItem, _super);
    function JinShengItem() {
        return _super.call(this) || this;
    }
    JinShengItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "JinShengItem"));
    };
    JinShengItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        a.expBar = (a.getChild("expBar"));
        a.goBt = (a.getChild("goBt"));
        a.drawBt = (a.getChild("drawBt"));
        a.expLb = (a.getChild("expLb"));
        a.conditionLb = (a.getChild("conditionLb"));
        a.moneyLb = (a.getChild("moneyLb"));
        a.backImg = (a.getChild("backImg"));
        a.drawImg = (a.getChild("drawImg"));
        a.goBt.addClickListener(a.onGo, this);
        a.drawBt.addClickListener(a.onGo, this);
    };
    JinShengItem.prototype.onGo = function (evt) {
        var a = this;
        evt.stopImmediatePropagation();
        evt.stopPropagation();
        if ((a.vo.state == 0 && a.vo.curCount >= a.vo.max) || a.vo.state == 1) {
            GGlobal.modeljinsheng.CG_JINSHENG_DRAWTASK(a.vo.id);
        }
        else {
            var panelId = a.vo.ui;
            if (panelId == UIConst.ERBASU) {
                GGlobal.layerMgr.open(panelId, { tabIndex: 2, listIndex: a.vo.can1 - 1 });
            }
            else if (panelId == UIConst.GUANXIAN) {
                var ui = GGlobal.layerMgr.getView(UIConst.JINSHENG);
                if (panelId == UIConst.GUANXIAN)
                    ui.onOpen(1);
            }
            else {
                if (Math.floor(panelId / 100) == 45 && !ModuleManager.isOpen(panelId)) {
                    panelId = UIConst.HUODONG;
                }
                GGlobal.layerMgr.open(panelId);
            }
        }
    };
    JinShengItem.prototype.show = function (vo) {
        var a = this;
        a.vo = vo;
        a.expLb.text = vo.exp + "";
        a.conditionLb.text = vo.tips;
        a.moneyLb.text = vo.yb + "";
        a.expBar.max = vo.max;
        a.expBar.value = vo.curCount;
        a.goBt.visible = false;
        a.drawImg.visible = false;
        a.drawBt.visible = false;
        if ((vo.state == 0 && vo.curCount >= vo.max) || vo.state == 1) {
            a.drawBt.visible = true;
            a.drawBt.checkNotice = true;
        }
        else if (vo.state == 2) {
            a.drawImg.visible = true;
        }
        else {
            a.goBt.visible = true;
        }
        if (vo.id < 3000) {
            a.backImg.url = "ui://dllc71i9hd1b15";
        }
        else {
            a.backImg.url = "ui://dllc71i9hd1b14";
        }
    };
    JinShengItem.URL = "ui://dllc71i9s0h0d";
    return JinShengItem;
}(fairygui.GComponent));
__reflect(JinShengItem.prototype, "JinShengItem");
