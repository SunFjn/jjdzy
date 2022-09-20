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
var View_JiangHun_Suit = (function (_super) {
    __extends(View_JiangHun_Suit, _super);
    function View_JiangHun_Suit() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_JiangHun_Suit.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("role", "View_JiangHun_Suit").asCom;
        a.contentPane = a.view;
        a.nameLb = (a.view.getChild("nameLb"));
        a.levelLb = (a.view.getChild("levelLb"));
        a.curAttLb = (a.view.getChild("curAttLb"));
        a.nextAttLb = (a.view.getChild("nextAttLb"));
        a.numLb = (a.view.getChild("numLb"));
        a.upBt = (a.view.getChild("upBt"));
        _super.prototype.childrenCreated.call(this);
        a.upBt.addClickListener(a.upHandle, a);
    };
    View_JiangHun_Suit.prototype.upHandle = function () {
        var a = this;
        if (a.upBt.checkNotice) {
            GGlobal.modeljh.CG_JIANGHUN_SUIT(a.suitID);
        }
        else {
            a.suitID = Model_JiangHun.suitIdArr[a.type - 1];
            var cfg = Config.genteam_006[a.suitID];
            if (cfg.next) {
                ViewCommonWarn.text("将魂等级不足");
            }
            else {
                ViewCommonWarn.text("已满阶");
            }
        }
    };
    View_JiangHun_Suit.prototype.updateShow = function () {
        var a = this;
        a.type = a._args;
        if (!a.type)
            return;
        a.suitID = Model_JiangHun.suitIdArr[a.type - 1];
        var cfg = Config.genteam_006[a.suitID];
        a.nameLb.text = cfg.name;
        a.levelLb.text = cfg.name + "总等级：" + cfg.lv;
        var attstr = "";
        var attstr1 = "";
        var nextcfg = Config.genteam_006[cfg.next];
        if (nextcfg) {
            var attArr = JSON.parse(cfg.attr);
            var attArr1 = JSON.parse(nextcfg.attr);
            var len = attArr.length;
            for (var i = 0; i < len; i++) {
                if (i == 0) {
                    attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                    attstr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                }
                else {
                    attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                    attstr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                }
            }
            a.numLb.text = "(" + Model_JiangHun.level + "/" + nextcfg.need + ")";
            a.numLb.color = Model_JiangHun.level >= nextcfg.need ? Color.getColorInt(2) : Color.getColorInt(6);
            a.upBt.checkNotice = Model_JiangHun.level >= nextcfg.need;
        }
        else {
            var attArr = JSON.parse(cfg.attr);
            var len = attArr.length;
            for (var i = 0; i < len; i++) {
                if (i == 0) {
                    attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                    attstr1 += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
                else {
                    attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                    attstr1 += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
            }
            a.numLb.text = "已满阶";
            a.numLb.color = Color.getColorInt(6);
            a.upBt.checkNotice = false;
        }
        a.curAttLb.text = attstr;
        a.nextAttLb.text = attstr1;
    };
    View_JiangHun_Suit.prototype.onShown = function () {
        var a = this;
        a.updateShow();
        GGlobal.reddot.listen(ReddotEvent.CHECK_JIANGHUN, a.updateShow, a);
    };
    View_JiangHun_Suit.prototype.onHide = function () {
        var a = this;
        GGlobal.layerMgr.close(UIConst.JIANGHUN_SUIT);
        GGlobal.reddot.remove(ReddotEvent.CHECK_JIANGHUN, a.updateShow, a);
    };
    View_JiangHun_Suit.URL = "ui://3tzqotadk8ozq";
    return View_JiangHun_Suit;
}(UIModalPanel));
__reflect(View_JiangHun_Suit.prototype, "View_JiangHun_Suit");
