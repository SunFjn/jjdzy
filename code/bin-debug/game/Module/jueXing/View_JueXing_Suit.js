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
var View_JueXing_Suit = (function (_super) {
    __extends(View_JueXing_Suit, _super);
    function View_JueXing_Suit() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    View_JueXing_Suit.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("jueXing", "View_JueXing_Suit").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        s.curAttLb.leading = 6;
        s.nextAttLb.leading = 6;
        _super.prototype.childrenCreated.call(this);
        s.upgradeBt.addClickListener(s.upHandle, this);
    };
    View_JueXing_Suit.prototype.upHandle = function () {
        var s = this;
        var nextCfg = Config.jxzl_271[s.vo.quality * 100 + s.vo.suitLv + 1];
        if (nextCfg) {
            var index = 0;
            if (s.vo.skilllv0 % 1000 >= nextCfg.lv) {
                index++;
            }
            if (s.vo.skilllv1 % 1000 >= nextCfg.lv) {
                index++;
            }
            if (s.vo.skilllv2 % 1000 >= nextCfg.lv) {
                index++;
            }
            if (index >= 3) {
                GGlobal.modeljx.CG_UPGRADE_JUEXING_821(s.vo.type, s.vo.id, 4);
            }
            else {
                ViewCommonWarn.text("未达到条件，不能进阶");
            }
        }
        else {
            ViewCommonWarn.text("已满级");
        }
    };
    View_JueXing_Suit.prototype.updateShow = function (vo) {
        var s = this;
        s.vo = vo;
        s.boxMax.visible = false;
        s.upgradeBt.visible = true;
        if (vo.suitLv > 0) {
            var cfg = Config.jxzl_271[s.vo.quality * 100 + vo.suitLv];
            s.suitLb.text = "觉醒之力" + vo.suitLv + "阶";
            s.powerLb.text = "战力：" + cfg.power;
            s.curLb.setVar("des", "全身觉醒至" + cfg.lv).setVar("state", "[color=#00ff00](已激活)[/color]").flushVars();
            var attArr = JSON.parse(cfg.attr);
            var attStr = "";
            for (var i = 0; i < attArr.length; i++) {
                if (i == 0) {
                    attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
                else {
                    attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
            }
            s.curAttLb.text = attStr;
            var nextCfg = Config.jxzl_271[s.vo.quality * 100 + vo.suitLv + 1];
            if (nextCfg) {
                s.c1.selectedIndex = 1;
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
                if (vo.skilllv0 % 1000 >= nextCfg.lv) {
                    index++;
                }
                if (vo.skilllv1 % 1000 >= nextCfg.lv) {
                    index++;
                }
                if (vo.skilllv2 % 1000 >= nextCfg.lv) {
                    index++;
                }
                if (index >= 3) {
                    s.nextLb.setVar("des", "全身觉醒至" + nextCfg.lv).setVar("state", "[color=#15f234](" + index + "/3)[/color]").flushVars();
                    s.upgradeBt.enabled = s.upgradeBt.checkNotice = true;
                }
                else {
                    s.nextLb.setVar("des", "全身觉醒至" + nextCfg.lv).setVar("state", "[color=#ed1414](" + index + "/3)[/color]").flushVars();
                    s.upgradeBt.enabled = s.upgradeBt.checkNotice = false;
                }
                s.nextAttLb.text = attStr1;
            }
            else {
                s.c1.selectedIndex = 2;
                s.upgradeBt.visible = false;
                s.boxMax.visible = true;
            }
        }
        else {
            s.c1.selectedIndex = 0;
            var cfg = Config.jxzl_271[s.vo.quality * 100 + 1];
            s.suitLb.text = "觉醒之力1阶";
            s.powerLb.text = "战力：0";
            var index = 0;
            if (vo.skilllv0 % 1000 >= cfg.lv) {
                index++;
            }
            if (vo.skilllv1 % 1000 >= cfg.lv) {
                index++;
            }
            if (vo.skilllv2 % 1000 >= cfg.lv) {
                index++;
            }
            if (index >= 3) {
                s.nextLb.setVar("des", "全身觉醒至" + cfg.lv).setVar("state", "[color=#15f234](" + index + "/3)[/color]").flushVars();
                s.upgradeBt.enabled = s.upgradeBt.checkNotice = true;
            }
            else {
                s.nextLb.setVar("des", "全身觉醒至" + cfg.lv).setVar("state", "[color=#ed1414](" + index + "/3)[/color]").flushVars();
                s.upgradeBt.enabled = s.upgradeBt.checkNotice = false;
            }
            var attArr = JSON.parse(cfg.attr);
            var attStr = "";
            for (var i = 0; i < attArr.length; i++) {
                if (i == 0) {
                    attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
                else {
                    attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
            }
            s.nextAttLb.text = attStr;
        }
    };
    View_JueXing_Suit.prototype.onShown = function () {
        var s = this;
        GGlobal.control.listen(Enum_MsgType.JUEXING_SUIT_UPDATE, s.updateShow, this);
        s.updateShow(s._args);
    };
    View_JueXing_Suit.prototype.onHide = function () {
        var s = this;
        GGlobal.layerMgr.close(UIConst.JUEXING_SUIT);
        GGlobal.control.remove(Enum_MsgType.JUEXING_SUIT_UPDATE, s.updateShow, this);
    };
    View_JueXing_Suit.URL = "ui://tbqdf7fdnlhgd";
    return View_JueXing_Suit;
}(UIModalPanel));
__reflect(View_JueXing_Suit.prototype, "View_JueXing_Suit");
