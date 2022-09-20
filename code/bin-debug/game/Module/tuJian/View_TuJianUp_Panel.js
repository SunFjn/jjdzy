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
var View_TuJianUp_Panel = (function (_super) {
    __extends(View_TuJianUp_Panel, _super);
    function View_TuJianUp_Panel() {
        var _this = _super.call(this) || this;
        _this.STARMAX = 5;
        return _this;
    }
    View_TuJianUp_Panel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        a.grid.isShowEff = true;
        a.item.isShowMask = false;
        a.item.isShowNotice = false;
        a.jihuoBt.addClickListener(a.jihuoHandle, a);
        a.upStarBt.addClickListener(a.upStarHandle, a);
        a.upLvBt.addClickListener(a.upLvHandle, a);
        a.showBt.addClickListener(a.showHandler, a);
    };
    View_TuJianUp_Panel.prototype.showHandler = function () {
        if (!this.vo)
            return;
        GGlobal.modelchat.CG_CHAT_SHOW_DATA(1, this.vo.ID);
    };
    View_TuJianUp_Panel.prototype.upStarHandle = function () {
        GGlobal.layerMgr.open(UIConst.TUJIAN_UPSTAR, this.vo);
    };
    View_TuJianUp_Panel.prototype.upLvHandle = function () {
        var a = this;
        if (a.upLvBt.checkNotice) {
            GGlobal.modelTuJian.CG_TUJIAN_UPGRADE(a.vo.ID);
        }
        else {
            if (a.vo.level >= a.vo.levelMax && a.vo.next_star <= 0) {
                ViewCommonWarn.text("已达最高等级");
            }
            else if (a.vo.level >= a.vo.levelMax) {
                ViewCommonWarn.text("升星可提升等级上限");
            }
            else {
                var costArr1 = a.vo.consume_level;
                var costVo1 = VoItem.create(costArr1[0][1]);
                View_CaiLiao_GetPanel.show(costVo1);
            }
        }
    };
    View_TuJianUp_Panel.prototype.jihuoHandle = function () {
        var a = this;
        if (a.jihuoBt.checkNotice) {
            GGlobal.modelTuJian.CG_TUJIAN_JIHUO(a.vo.ID);
        }
        else {
            var costArr0 = a.vo.activation_jihuo;
            var costVo0 = VoItem.create(costArr0[0][1]);
            View_CaiLiao_GetPanel.show(costVo0);
        }
    };
    View_TuJianUp_Panel.prototype.updateShow = function (vo) {
        var a = this;
        a.vo = vo;
        if (!a.vo)
            return;
        if (a.vo.isJiHuo) {
            a.showBt.visible = true;
            a.c1.selectedIndex = 1;
            if (a.vo.next_star > 0) {
                var costArr0 = a.vo.consume_star;
                var costVo0 = VoItem.create(costArr0[0][1]);
                var count2 = Model_Bag.getItemCount(costArr0[0][1]);
                var color = count2 >= costArr0[0][2] ? 2 : 6;
                HtmlUtil.fontNoSize("(" + count2 + "/" + costArr0[0][2] + ")", Color.getColorStr(color));
                var count0 = Model_Bag.getItemCount(costArr0[0][1]);
                a.upStarBt.checkNotice = count0 >= costArr0[0][2];
            }
            else {
                a.upStarBt.checkNotice = false;
            }
            if (a.vo.level < a.vo.levelMax) {
                var costArr1 = a.vo.consume_level;
                var costVo1 = VoItem.create(costArr1[0][1]);
                var count1 = Model_Bag.getItemCount(costArr1[0][1]);
                if (count1 >= costArr1[0][2]) {
                    a.costLb1.setCount(HtmlUtil.fontNoSize(count1 + "/" + costArr1[0][2], Color.getColorStr(2)));
                    a.upLvBt.checkNotice = true;
                }
                else {
                    a.costLb1.setCount(HtmlUtil.fontNoSize(count1 + "/" + costArr1[0][2], Color.getColorStr(6)));
                    a.upLvBt.checkNotice = false;
                }
                a.costLb1.setImgUrl(costVo1.icon);
                a.itemNameLb.visible = true;
                a.itemNameLb.text = costVo1.name;
                a.itemNameLb.color = costVo1.qColor;
            }
            else {
                a.upLvBt.checkNotice = false;
                a.costLb1.setCount("已满级");
                a.costLb1.setImgUrl();
                a.itemNameLb.visible = false;
            }
            a.levelBar.value = a.vo.level;
            a.levelBar.max = a.vo.levelMax;
            var attarr = a.vo.attr_level;
            var attstr = "";
            var attstr1 = "";
            var nextcfg = Config.piclv_005[a.vo.next_level];
            if (nextcfg) {
                var attarr1 = JSON.parse(nextcfg.attr);
                for (var i = 0; i < attarr.length; i++) {
                    if (i == 0) {
                        attstr += Vo_attr.getShowStr(attarr[i][0], attarr[i][1] + a.vo.attr_jihuo[i][1]);
                        attstr1 += "+" + (attarr1[i][1] + a.vo.attr_jihuo[i][1]);
                    }
                    else {
                        attstr += "\n" + Vo_attr.getShowStr(attarr[i][0], attarr[i][1] + a.vo.attr_jihuo[i][1]);
                        attstr1 += "\n+" + (attarr1[i][1] + a.vo.attr_jihuo[i][1]);
                    }
                }
            }
            else {
                for (var i = 0; i < attarr.length; i++) {
                    if (i == 0) {
                        attstr += Vo_attr.getShowStr(attarr[i][0], attarr[i][1] + a.vo.attr_jihuo[i][1]);
                        attstr1 += "已满级";
                    }
                    else {
                        attstr += "\n" + Vo_attr.getShowStr(attarr[i][0], attarr[i][1] + a.vo.attr_jihuo[i][1]);
                        attstr1 += "\n" + "已满级";
                    }
                }
            }
            a.nextAttLb.text = attstr1;
            a.curAttLb.text = attstr;
            if (a.vo.level >= a.vo.levelMax && a.vo.next_star <= 0) {
                a.upLvBt.enabled = false;
            }
            else {
                a.upLvBt.enabled = true;
            }
            a.powerLb.text = "升级战力：" + (a.vo.power0 + a.vo.power1 + a.vo.power2) + "";
        }
        else {
            a.showBt.visible = false;
            a.c1.selectedIndex = 0;
            var costArr0 = a.vo.activation_jihuo;
            var costVo0 = VoItem.create(costArr0[0][1]);
            costVo0.count = costArr0[0][2];
            a.grid.vo = costVo0;
            a.grid.tipEnabled = true;
            var count = Model_Bag.getItemCount(costArr0[0][1]);
            var color = count >= costVo0.count ? 2 : 6;
            a.grid.showText = HtmlUtil.fontNoSize(count + "/" + costVo0.count, Color.getColorStr(color));
            a.jihuoBt.checkNotice = count >= costVo0.count;
            var attarr = a.vo.attr_jihuo;
            var attstr0 = "";
            var attstr1 = "";
            for (var i = 0; i < attarr.length; i++) {
                if (i == 0) {
                    attstr0 += Vo_attr.getShowStr(attarr[i][0], 0);
                    attstr1 += "+" + attarr[i][1];
                }
                else {
                    attstr0 += "\n" + Vo_attr.getShowStr(attarr[i][0], 0);
                    attstr1 += "\n+" + attarr[i][1];
                }
            }
            a.curAttLb.text = attstr0;
            a.nextAttLb.text = attstr1;
            a.powerLb.text = "升级战力：0";
        }
        a.item.vo = a.vo;
    };
    View_TuJianUp_Panel.prototype.onShown = function (vo) {
        var a = this;
        a.updateShow(vo);
    };
    View_TuJianUp_Panel.prototype.onHide = function () {
        var a = this;
        a.grid.showEff(false);
        a.item.clean();
    };
    View_TuJianUp_Panel.URL = "ui://m0rbmsgsrcvu27";
    return View_TuJianUp_Panel;
}(fairygui.GComponent));
__reflect(View_TuJianUp_Panel.prototype, "View_TuJianUp_Panel");
