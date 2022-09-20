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
var View_DuanZao_StarSuit = (function (_super) {
    __extends(View_DuanZao_StarSuit, _super);
    function View_DuanZao_StarSuit() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    View_DuanZao_StarSuit.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("DuanZao", "View_DuanZao_StarSuit").asCom;
        a.contentPane = a.view;
        a.c1 = a.view.getController("c1");
        a.upgradeBt = (a.view.getChild("upgradeBt"));
        a.suitLb = (a.view.getChild("suitLb"));
        a.powerLb = (a.view.getChild("powerLb"));
        a.curLb = (a.view.getChild("curLb"));
        a.curAttLb = (a.view.getChild("curAttLb"));
        a.curAttLb.leading = 6;
        a.nextLb = (a.view.getChild("nextLb"));
        a.nextAttLb = (a.view.getChild("nextAttLb"));
        a.nextAttLb.leading = 6;
        _super.prototype.childrenCreated.call(this);
        a.upgradeBt.addClickListener(a.upHandle, a);
    };
    View_DuanZao_StarSuit.prototype.upHandle = function () {
        var starLv = Model_DuanZao.suitArr[2];
        if (starLv > 0) {
            var nextCfg = Config.dzstarsuit_209[starLv + 1];
            if (nextCfg) {
                if (Model_DuanZao.starMinLv >= nextCfg.yaoqiu) {
                    GGlobal.modelDuanZao.CG_DUANZAO_SUIT_UPGRADE(3);
                }
                else {
                    ViewCommonWarn.text("未达到条件，不能进阶");
                }
            }
            else {
                ViewCommonWarn.text("已满级");
            }
        }
        else {
            if (Model_DuanZao.starMinLv >= this.cfg.yaoqiu) {
                GGlobal.modelDuanZao.CG_DUANZAO_SUIT_UPGRADE(3);
            }
            else {
                ViewCommonWarn.text("未达到条件，不能进阶");
            }
        }
    };
    View_DuanZao_StarSuit.prototype.updateShow = function () {
        var a = this;
        var suitLv = Model_DuanZao.suitArr[2];
        if (suitLv > 0) {
            a.cfg = Config.dzstarsuit_209[suitLv];
            a.suitLb.text = "升星大师" + suitLv + "阶";
            a.powerLb.text = "战力：" + a.cfg.power;
            a.curLb.setVar("des", "全身升星+" + a.cfg.yaoqiu).setVar("state", "[color=#00ff00](已激活)[/color]").flushVars();
            var attArr = JSON.parse(a.cfg.attr);
            var attStr = "";
            for (var i = 0; i < attArr.length; i++) {
                if (i == 0) {
                    attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
                else {
                    attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
            }
            a.curAttLb.text = attStr;
            var nextCfg = Config.dzstarsuit_209[suitLv + 1];
            if (nextCfg) {
                a.c1.selectedIndex = 1;
                var attArr1 = JSON.parse(nextCfg.attr);
                var attStr1 = "";
                for (var i = 0; i < attArr1.length; i++) {
                    if (i == 0) {
                        attStr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                    }
                    else {
                        attStr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                    }
                }
                var index = 0;
                var equipData = Model_player.voMine.equipData;
                for (var key in equipData) {
                    if (Model_Equip.isEquip(parseInt(key))) {
                        var vo = equipData[key];
                        if (vo.starLv >= nextCfg.yaoqiu) {
                            index++;
                        }
                    }
                }
                if (index >= 10) {
                    a.nextLb.setVar("des", "全身升星+" + nextCfg.yaoqiu).setVar("state", "[color=#00ff00](" + index + "/10)[/color]").flushVars();
                }
                else {
                    a.nextLb.setVar("des", "全身升星+" + nextCfg.yaoqiu).setVar("state", "[color=#ff0000](" + index + "/10)[/color]").flushVars();
                }
                a.nextAttLb.text = attStr1;
                a.upgradeBt.enabled = a.upgradeBt.checkNotice = Model_DuanZao.starMinLv >= nextCfg.yaoqiu;
            }
            else {
                a.c1.selectedIndex = 2;
                a.upgradeBt.enabled = a.upgradeBt.checkNotice = false;
            }
        }
        else {
            a.c1.selectedIndex = 0;
            a.cfg = Config.dzstarsuit_209[1];
            a.suitLb.text = "升星大师" + suitLv + "阶";
            a.powerLb.text = "战力：0";
            var index = 0;
            var equipData = Model_player.voMine.equipData;
            for (var key in equipData) {
                if (Model_Equip.isEquip(parseInt(key))) {
                    var vo = equipData[key];
                    if (vo.starLv >= a.cfg.yaoqiu) {
                        index++;
                    }
                }
            }
            if (index >= 10) {
                a.nextLb.setVar("des", "全身升星+" + a.cfg.yaoqiu).setVar("state", "[color=#00ff00](" + index + "/10)[/color]").flushVars();
            }
            else {
                a.nextLb.setVar("des", "全身升星+" + a.cfg.yaoqiu).setVar("state", "[color=#ff0000](" + index + "/10)[/color]").flushVars();
            }
            var attArr = JSON.parse(a.cfg.attr);
            var attStr = "";
            for (var i = 0; i < attArr.length; i++) {
                if (i == 0) {
                    attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
                else {
                    attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
            }
            a.nextAttLb.text = attStr;
            a.upgradeBt.enabled = a.upgradeBt.checkNotice = Model_DuanZao.starMinLv >= a.cfg.yaoqiu;
        }
    };
    View_DuanZao_StarSuit.prototype.onShown = function () {
        GGlobal.reddot.listen(ReddotEvent.CHECK_DAUNZAO, this.updateShow, this);
        this.updateShow();
    };
    View_DuanZao_StarSuit.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.DUANZAO_STAR_SUIT);
        GGlobal.reddot.remove(ReddotEvent.CHECK_DAUNZAO, this.updateShow, this);
    };
    View_DuanZao_StarSuit.prototype.resetPosition = function () {
        _super.prototype.resetPosition.call(this);
    };
    View_DuanZao_StarSuit.URL = "ui://pofv8989sv0g2c";
    return View_DuanZao_StarSuit;
}(UIModalPanel));
__reflect(View_DuanZao_StarSuit.prototype, "View_DuanZao_StarSuit");
