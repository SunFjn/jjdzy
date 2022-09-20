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
var View_DuanZao_StoneSuit = (function (_super) {
    __extends(View_DuanZao_StoneSuit, _super);
    function View_DuanZao_StoneSuit() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    View_DuanZao_StoneSuit.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("DuanZao", "View_DuanZao_StoneSuit").asCom;
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
    View_DuanZao_StoneSuit.prototype.upHandle = function () {
        var s = this;
        if (s.upgradeBt.checkNotice) {
            GGlobal.modelDuanZao.CG_DUANZAO_SUIT_UPGRADE(2);
        }
        else {
            var suitLv = Model_DuanZao.suitArr[1];
            var nextCfg = Config.dzgemsuit_209[suitLv + 1];
            if (nextCfg) {
                ViewCommonWarn.text("未达到条件，不能进阶");
            }
            else {
                ViewCommonWarn.text("已满阶");
            }
        }
    };
    View_DuanZao_StoneSuit.prototype.updateShow = function () {
        var s = this;
        var suitLv = Model_DuanZao.suitArr[1];
        if (suitLv > 0) {
            s.cfg = Config.dzgemsuit_209[suitLv];
            s.suitLb.text = "宝石大师" + suitLv + "阶";
            s.powerLb.text = "战力：" + s.cfg.power;
            s.curLb.setVar("des", "宝石总等级达到" + s.cfg.lv).setVar("state", "[color=#00ff00](已激活)[/color]").flushVars();
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
            var nextCfg = Config.dzgemsuit_209[suitLv + 1];
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
                var equipData = Model_player.voMine.equipData;
                for (var key in equipData) {
                    if (Model_Equip.isEquip(parseInt(key))) {
                        var vo = equipData[key];
                        index += vo.gemLv;
                    }
                }
                if (index >= nextCfg.lv) {
                    s.nextLb.setVar("des", "宝石总等级达到" + nextCfg.lv).setVar("state", "[color=#15f234](" + index + "/" + nextCfg.lv + ")[/color]").flushVars();
                }
                else {
                    s.nextLb.setVar("des", "宝石总等级达到" + nextCfg.lv).setVar("state", "[color=#ff0000](" + index + "/" + nextCfg.lv + ")[/color]").flushVars();
                }
                s.nextAttLb.text = attStr1;
                s.upgradeBt.enabled = s.upgradeBt.checkNotice = Model_DuanZao.gemLv >= nextCfg.lv;
            }
            else {
                s.c1.selectedIndex = 2;
                s.upgradeBt.enabled = s.upgradeBt.checkNotice = false;
            }
        }
        else {
            s.c1.selectedIndex = 0;
            s.cfg = Config.dzgemsuit_209[1];
            s.suitLb.text = "宝石大师" + suitLv + "阶";
            s.powerLb.text = "战力：0";
            var index = 0;
            var equipData = Model_player.voMine.equipData;
            for (var key in equipData) {
                if (Model_Equip.isEquip(parseInt(key))) {
                    var vo = equipData[key];
                    index += vo.gemLv;
                }
            }
            if (index >= s.cfg.lv) {
                s.nextLb.setVar("des", "宝石总等级达到" + s.cfg.lv).setVar("state", "[color=#15f234](" + index + "/" + s.cfg.lv + ")[/color]").flushVars();
            }
            else {
                s.nextLb.setVar("des", "宝石总等级达到" + s.cfg.lv).setVar("state", "[color=#ff0000](" + index + "/" + s.cfg.lv + ")[/color]").flushVars();
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
            s.upgradeBt.enabled = s.upgradeBt.checkNotice = Model_DuanZao.gemLv >= s.cfg.lv;
        }
    };
    View_DuanZao_StoneSuit.prototype.onShown = function () {
        var s = this;
        s.updateShow();
        GGlobal.control.listen(Enum_MsgType.DUANZAO_DATA_UPDATE, s.updateShow, this);
    };
    View_DuanZao_StoneSuit.prototype.onHide = function () {
        var s = this;
        GGlobal.layerMgr.close(UIConst.DUANZAO_STONE_SUIT);
        GGlobal.control.remove(Enum_MsgType.DUANZAO_DATA_UPDATE, s.updateShow, s);
    };
    View_DuanZao_StoneSuit.URL = "ui://pofv8989kn3r7";
    return View_DuanZao_StoneSuit;
}(UIModalPanel));
__reflect(View_DuanZao_StoneSuit.prototype, "View_DuanZao_StoneSuit");
