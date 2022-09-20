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
var ViewBaZhenTuDaShi = (function (_super) {
    __extends(ViewBaZhenTuDaShi, _super);
    function ViewBaZhenTuDaShi() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewBaZhenTuDaShi.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "ViewBaZhenTuDaShi"));
    };
    ViewBaZhenTuDaShi.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("baZhenTu", "ViewBaZhenTuDaShi").asCom;
        s.contentPane = s.view;
        s.c1 = s.view.getController("c1");
        s.upgradeBt = (s.view.getChild("upgradeBt"));
        s.suitLb = (s.view.getChild("suitLb"));
        s.powerLb = (s.view.getChild("powerLb"));
        s.curLb = (s.view.getChild("curLb"));
        s.curAttLb = (s.view.getChild("curAttLb"));
        s.curAttLb.leading = 6;
        s.nextLb = (s.view.getChild("nextLb"));
        s.nextAttLb = (s.view.getChild("nextAttLb"));
        s.nextAttLb.leading = 6;
        _super.prototype.childrenCreated.call(this);
        s.upgradeBt.addClickListener(s.upHandle, this);
    };
    ViewBaZhenTuDaShi.prototype.upHandle = function () {
        var s = this;
        if (s.cfgNext && GGlobal.modelBaZhenTu.dsLv >= s.cfgNext.lv) {
            GGlobal.modelBaZhenTu.CGDASHI_UPLV4419();
        }
        else {
            ViewCommonWarn.text("未达到条件，不能进阶");
        }
    };
    ViewBaZhenTuDaShi.prototype.updateShow = function () {
        var s = this;
        var m = GGlobal.modelBaZhenTu;
        var dsId = m.dsId;
        s.cfg = Config.bztfwtz_261[dsId];
        var index = m.dsLv;
        var nextCfg = s.cfgNext = Config.bztfwtz_261[dsId + 1];
        if (dsId > 0) {
            s.suitLb.text = "符文大师" + dsId + "阶";
            s.powerLb.text = "战力：" + s.cfg.power;
            s.curLb.setVar("des", "红色符文总星级+" + s.cfg.lv).setVar("state", "[color=#00ff00](已激活)[/color]").flushVars();
            var attArr = JSON.parse(s.cfg.attr);
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
                if (index >= nextCfg.lv) {
                    s.nextLb.setVar("des", "红色符文总星级+" + nextCfg.lv).setVar("state", "[color=#15f234](" + index + "/" + nextCfg.lv + ")[/color]").flushVars();
                }
                else {
                    s.nextLb.setVar("des", "红色符文总星级+" + nextCfg.lv).setVar("state", "[color=#ed1414](" + index + "/" + nextCfg.lv + ")[/color]").flushVars();
                }
                s.nextAttLb.text = attStr1;
                s.upgradeBt.enabled = s.upgradeBt.checkNotice = index >= nextCfg.lv;
            }
            else {
                s.c1.selectedIndex = 2;
                s.upgradeBt.enabled = s.upgradeBt.checkNotice = false;
            }
        }
        else {
            s.c1.selectedIndex = 0;
            s.cfg = Config.bztfwtz_261[1];
            s.suitLb.text = "符文大师" + dsId + "阶";
            s.powerLb.text = "战力：0";
            if (index >= nextCfg.lv) {
                s.nextLb.setVar("des", "红色符文总星级+" + nextCfg.lv).setVar("state", "[color=#15f234](" + index + "/" + nextCfg.lv + ")[/color]").flushVars();
            }
            else {
                s.nextLb.setVar("des", "红色符文总星级+" + nextCfg.lv).setVar("state", "[color=#ed1414](" + index + "/" + nextCfg.lv + ")[/color]").flushVars();
            }
            var attArr = JSON.parse(s.cfg.attr);
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
            s.upgradeBt.enabled = s.upgradeBt.checkNotice = index >= nextCfg.lv;
        }
    };
    ViewBaZhenTuDaShi.prototype.onShown = function () {
        var s = this;
        GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.DA_SHI, s.updateShow, this);
        s.updateShow();
    };
    ViewBaZhenTuDaShi.prototype.onHide = function () {
        var s = this;
        GGlobal.layerMgr.close(UIConst.BAZHENTU_DASHI);
        GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.DA_SHI, s.updateShow, this);
    };
    ViewBaZhenTuDaShi.URL = "ui://xrzn9ppavrr61g";
    return ViewBaZhenTuDaShi;
}(UIModalPanel));
__reflect(ViewBaZhenTuDaShi.prototype, "ViewBaZhenTuDaShi");
