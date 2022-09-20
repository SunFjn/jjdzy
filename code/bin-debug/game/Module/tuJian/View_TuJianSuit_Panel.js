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
var View_TuJianSuit_Panel = (function (_super) {
    __extends(View_TuJianSuit_Panel, _super);
    function View_TuJianSuit_Panel() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_TuJianSuit_Panel.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("TuJian", "View_TuJianSuit_Panel").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
        s.upBt.addClickListener(s.upHandle, s);
    };
    View_TuJianSuit_Panel.prototype.upHandle = function () {
        var s = this;
        if (s.upBt.checkNotice) {
            GGlobal.modelTuJian.CG_TUJIAN_UPSUIT(s.vo.suitID);
        }
        else {
            if (s.vo.suitNext <= 0) {
                ViewCommonWarn.text("已提升到满级");
            }
            else {
                ViewCommonWarn.text("图鉴等级不足");
            }
        }
    };
    View_TuJianSuit_Panel.prototype.updateShow = function () {
        var s = this;
        s.vo = s._args;
        if (!s.vo)
            return;
        s.nameLb.text = s.vo.suitName;
        s.levelLb.text = Model_TuJian.tabArr[s.vo.type] + "图鉴总等级：" + s.vo.tujianLv;
        var nextcfg = Config.picteam_005[s.vo.suitNext];
        var attstr = "";
        var attArr = s.vo.suitAttArr;
        var attstr1 = "";
        var len = attArr.length;
        if (nextcfg) {
            if (attArr.length > 0) {
                var attArr1 = JSON.parse(nextcfg.attr);
                var len_1 = attArr.length;
                for (var i = 0; i < len_1; i++) {
                    if (i == 0) {
                        attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                        attstr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                    }
                    else {
                        attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                        attstr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                    }
                }
            }
            else {
                var attArr_1 = JSON.parse(nextcfg.attr);
                var len_2 = attArr_1.length;
                for (var i = 0; i < len_2; i++) {
                    if (i == 0) {
                        attstr += Vo_attr.getShowStr(attArr_1[i][0], 0);
                        attstr1 += Vo_attr.getShowStr(attArr_1[i][0], attArr_1[i][1]);
                    }
                    else {
                        attstr += "\n" + Vo_attr.getShowStr(attArr_1[i][0], 0);
                        attstr1 += "\n" + Vo_attr.getShowStr(attArr_1[i][0], attArr_1[i][1]);
                    }
                }
            }
            s.numLb.text = "(" + s.vo.tujianLv + "/" + nextcfg.need + ")";
            s.numLb.color = s.vo.tujianLv >= nextcfg.need ? Color.getColorInt(2) : Color.getColorInt(6);
            s.upBt.enabled = s.upBt.checkNotice = s.vo.tujianLv >= nextcfg.need;
            s.upBt.visible = true;
            s.maxGroup.visible = false;
        }
        else {
            var len_3 = attArr.length;
            for (var i = 0; i < len_3; i++) {
                if (i == 0) {
                    attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
                else {
                    attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                }
            }
            attstr1 = "";
            s.upBt.visible = false;
            s.numLb.text = "已满级";
            s.numLb.color = Color.getColorInt(6);
            s.maxGroup.visible = true;
        }
        s.curAttLb.text = attstr;
        s.nextAttLb.text = attstr1;
    };
    View_TuJianSuit_Panel.prototype.onShown = function () {
        var s = this;
        s.updateShow();
        GGlobal.control.listen(Enum_MsgType.TUJIAN_DATA_UPDATE, s.updateShow, s);
    };
    View_TuJianSuit_Panel.prototype.onHide = function () {
        var s = this;
        GGlobal.layerMgr.close(UIConst.TUJIAN_SUIT);
        GGlobal.control.remove(Enum_MsgType.TUJIAN_DATA_UPDATE, s.updateShow, s);
    };
    View_TuJianSuit_Panel.URL = "ui://m0rbmsgsrkgc2l";
    return View_TuJianSuit_Panel;
}(UIModalPanel));
__reflect(View_TuJianSuit_Panel.prototype, "View_TuJianSuit_Panel");
