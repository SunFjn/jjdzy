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
var View_JiangHun_UpgradePanel = (function (_super) {
    __extends(View_JiangHun_UpgradePanel, _super);
    function View_JiangHun_UpgradePanel() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_JiangHun_UpgradePanel.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("role", "View_JiangHun_UpgradePanel").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
        s.upBt.addClickListener(s.upHandle, this);
    };
    View_JiangHun_UpgradePanel.prototype.upHandle = function () {
        var s = this;
        if (Model_player.voMine.hunhuo > 0) {
            if (s.vo.next > 0) {
                GGlobal.modeljh.CG_JIANGHUN_UP(s.vo.ID);
            }
            else {
                ViewCommonWarn.text("已满级");
            }
        }
        else {
            ViewCommonWarn.text("魂火数量不足");
        }
    };
    View_JiangHun_UpgradePanel.prototype.updateShow = function () {
        var s = this;
        s.vo = s._args;
        var vo = s.vo;
        s.nameLb.text = vo.name;
        s.nameLb.color = Color.getColorInt(vo.quality);
        s.levelLb.text = "Lv." + vo.level;
        s.powerLb.text = vo.power + "";
        var attstr0 = "";
        var attstr1 = "";
        var nextcfg = Config.genlv_006[vo.next];
        if (nextcfg) {
            s.expbar.max = vo.consumeArr[0][2];
            s.expbar.value = vo.exp;
            s.upBt.enabled = s.upBt.checkNotice = Model_player.voMine.hunhuo >= (vo.consumeArr[0][2] - vo.exp);
        }
        else {
            s.expbar.max = 1;
            s.expbar.value = 1;
            s.expbar._titleObject.text = "已满级";
            s.upBt.enabled = s.upBt.checkNotice = false;
        }
        s.moneyLb.text = Model_player.voMine.hunhuo + "";
        var len = vo.attArr.length;
        if (len <= 0) {
            var attArr = JSON.parse(nextcfg.attr);
            for (var i = 0; i < attArr.length; i++) {
                if (i == 0) {
                    attstr0 += Vo_attr.getShowStr(attArr[i][0], 0);
                    attstr1 += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
                else {
                    attstr0 += "\n" + Vo_attr.getShowStr(attArr[i][0], 0);
                    attstr1 += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
            }
        }
        else {
            if (nextcfg) {
                var attArr = JSON.parse(nextcfg.attr);
                for (var i = 0; i < len; i++) {
                    if (i == 0) {
                        attstr0 += Vo_attr.getShowStr(attArr[i][0], vo.attArr[i][1]);
                        attstr1 += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                    }
                    else {
                        attstr0 += "\n" + Vo_attr.getShowStr(attArr[i][0], vo.attArr[i][1]);
                        attstr1 += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                    }
                }
            }
            else {
                for (var i = 0; i < len; i++) {
                    if (i == 0) {
                        attstr0 += Vo_attr.getShowStr(vo.attArr[i][0], vo.attArr[i][1]);
                        attstr1 += Vo_attr.getShowStr(vo.attArr[i][0], vo.attArr[i][1]);
                    }
                    else {
                        attstr0 += "\n" + Vo_attr.getShowStr(vo.attArr[i][0], vo.attArr[i][1]);
                        attstr1 += "\n" + Vo_attr.getShowStr(vo.attArr[i][0], vo.attArr[i][1]);
                    }
                }
            }
        }
        s.curAtt.text = attstr0;
        s.nextAtt.text = attstr1;
        s.grid.vo1 = vo;
    };
    View_JiangHun_UpgradePanel.prototype.onShown = function () {
        var s = this;
        s.updateShow();
        GGlobal.reddot.listen(ReddotEvent.CHECK_JIANGHUN, s.updateShow, s);
    };
    View_JiangHun_UpgradePanel.prototype.onHide = function () {
        var s = this;
        s.grid.vo1 = null;
        GGlobal.layerMgr.close(UIConst.JIANGHUN_UP);
        GGlobal.reddot.remove(ReddotEvent.CHECK_JIANGHUN, s.updateShow, s);
    };
    View_JiangHun_UpgradePanel.URL = "ui://3tzqotadk8ozp";
    return View_JiangHun_UpgradePanel;
}(UIModalPanel));
__reflect(View_JiangHun_UpgradePanel.prototype, "View_JiangHun_UpgradePanel");
