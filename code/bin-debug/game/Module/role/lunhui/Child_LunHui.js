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
/**
 * 轮回系统
 */
var Child_LunHui = (function (_super) {
    __extends(Child_LunHui, _super);
    function Child_LunHui() {
        return _super.call(this) || this;
    }
    Child_LunHui.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "Child_LunHui"));
    };
    Child_LunHui.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_LunHui.prototype.openPanel = function (pData) {
        this.onShown();
    };
    Child_LunHui.prototype.closePanel = function (pData) {
        this.onHide();
    };
    Child_LunHui.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        a.linkLb.text = HtmlUtil.createLink("玩法说明");
        a.linkLb.addEventListener(egret.TextEvent.LINK, a.openGaiLV, a);
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandler;
    };
    Child_LunHui.prototype.openGaiLV = function (evt) {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.LUNHUI);
    };
    Child_LunHui.prototype.renderHandler = function (index, obj) {
        obj.setVo(this.rewardArr[index]);
    };
    /**
     * 轮回按钮点击事件
     */
    Child_LunHui.prototype.lunhuiHandle = function () {
        var a = this;
        var count = Model_Bag.getItemCount(a._itemVo.id);
        if (count < a._costArr[0][2]) {
            View_CaiLiao_GetPanel.show(VoItem.create(a._itemVo.id));
            return;
        }
        if (a.lunhuiBtn.checkNotice) {
            GGlobal.modellh.CG_LUNHUI();
        }
        else {
            var cfg = Config.lunhui_274[Model_player.voMine.reincarnationLevel];
            if (cfg.next <= 0) {
                ViewCommonWarn.text("已满级");
            }
            else {
                ViewCommonWarn.text("等级不足");
            }
        }
    };
    /**
     * 更新轮回信息
     */
    Child_LunHui.prototype.updateShow = function () {
        var a = this;
        a.lunhuiBtn.visible = false;
        a.upGroup.visible = false;
        a.maxAtt.visible = false;
        a.maxTips.visible = false;
        a.jihuoLb.visible = false;
        var cfg = Config.lunhui_274[Model_player.voMine.reincarnationLevel];
        a.powerLb.text = cfg.power + "";
        var nextcfg = Config.lunhui_274[cfg.next];
        var attstr = "";
        var attstr1 = "";
        if (cfg.attr != "0") {
            var attArr = JSON.parse(cfg.attr);
            if (nextcfg) {
                var attArr1 = JSON.parse(nextcfg.attr);
                for (var i = 0; i < attArr.length; i++) {
                    if (i == 0) {
                        attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                        attstr1 += Vo_attr.getShowStr(attArr[i][0], attArr1[i][1]);
                    }
                    else {
                        attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                        attstr1 += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr1[i][1]);
                    }
                }
                a.checkBtnRedDot();
            }
            else {
                for (var i = 0; i < attArr.length; i++) {
                    if (i == 0) {
                        attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                        attstr1 += "已满阶";
                    }
                    else {
                        attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                        attstr1 += "\n" + "已满阶";
                    }
                }
            }
        }
        else {
            var attArr1 = JSON.parse(nextcfg.attr);
            for (var i = 0; i < attArr1.length; i++) {
                if (i == 0) {
                    attstr += Vo_attr.getShowStr(attArr1[i][0], 0);
                    attstr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                }
                else {
                    attstr += "\n" + Vo_attr.getShowStr(attArr1[i][0], 0);
                    attstr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                }
            }
            a.checkBtnRedDot();
        }
        if (cfg.lv > 0) {
            a.lunhuiBtn.visible = true;
            a.upGroup.visible = true;
            a.curAtt.text = attstr;
            a.nextAtt.text = attstr1;
            a.jihuoLb.visible = true;
            a.jihuoLb.text = cfg.lv + "级可轮回";
            if (Model_player.voMine.level >= cfg.lv) {
                a.jihuoLb.color = Color.GREENINT;
            }
            else {
                a.jihuoLb.color = Color.REDINT;
            }
            a.costLb.visible = true;
            a._costArr = JSON.parse(cfg.conmuse);
            a._itemVo = VoItem.create(a._costArr[0][1]);
            var count = Model_Bag.getItemCount(a._costArr[0][1]);
            var color = count >= a._costArr[0][2] ? 2 : 6;
            a.costLb.text = "消耗：" + HtmlUtil.fontNoSize(a._itemVo.name, Color.getColorStr(a._itemVo.quality)) + "x" + a._costArr[0][2] +
                HtmlUtil.fontNoSize("(" + count + "/" + a._costArr[0][2] + ")", Color.getColorStr(color));
        }
        else {
            a.maxAtt.visible = true;
            a.maxAtt.text = attstr;
            a.maxTips.visible = true;
            a.costLb.visible = false;
        }
        a.numIcon.url = CommonManager.getUrl("lunhui", "icon" + cfg.id);
        a.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        a.list.numItems = a.rewardArr.length;
    };
    /**
     * 更新按钮红点状态
     */
    Child_LunHui.prototype.checkBtnRedDot = function () {
        var a = this;
        a.lunhuiBtn.checkNotice = Model_LunHui.checkLunHuiNotice();
    };
    Child_LunHui.prototype.onShown = function () {
        var a = this;
        a.updateShow();
        a.lunhuiBtn.addClickListener(a.lunhuiHandle, a);
        GGlobal.reddot.listen(ReddotEvent.CHECK_LUNHUI, a.updateShow, a);
        GGlobal.modelPlayer.listen(Model_player.MSG_HERO_LEVEL, a.checkBtnRedDot, this);
        GGlobal.control.listen(Enum_MsgType.LUNHUI_DATA_UPDATE, a.updateShow, a);
    };
    Child_LunHui.prototype.onHide = function () {
        var a = this;
        a.lunhuiBtn.removeClickListener(a.lunhuiHandle, a);
        GGlobal.reddot.remove(ReddotEvent.CHECK_LUNHUI, a.updateShow, a);
        GGlobal.modelPlayer.remove(Model_player.MSG_HERO_LEVEL, a.checkBtnRedDot, this);
        GGlobal.control.remove(Enum_MsgType.LUNHUI_DATA_UPDATE, a.updateShow, a);
        a.list.numItems = 0;
    };
    Child_LunHui.URL = "ui://ehelf5bhh2o6k";
    return Child_LunHui;
}(fairygui.GComponent));
__reflect(Child_LunHui.prototype, "Child_LunHui", ["IPanel"]);
