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
var ChildTigerPass = (function (_super) {
    __extends(ChildTigerPass, _super);
    function ChildTigerPass() {
        return _super.call(this) || this;
    }
    ChildTigerPass.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ChildTigerPass"));
    };
    ChildTigerPass.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.addEventListener(egret.Event.ADDED_TO_STAGE, s.onShow, s);
        s.addEventListener(egret.Event.REMOVED_FROM_STAGE, s.onHide, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderHander;
        s.txtDes.text = HtmlUtil.createLink("玩法说明");
    };
    ChildTigerPass.prototype.onLink = function (e) {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.CHILD_TIGER_PASS);
        e.stopPropagation();
        e.stopImmediatePropagation();
    };
    ChildTigerPass.prototype.onShow = function () {
        var m = GGlobal.modelTigerPass;
        var s = this;
        m.CGOpenUI8901();
        m.listen(Model_TigerPass.msg_openui, s.onUpdate, s);
        m.listen(Model_TigerPass.msg_employ, s.onUpEmp, s);
        m.listen(Model_TigerPass.msg_join_employ, s.upJoinEmp, s);
        s.btnSignUp.addClickListener(s.onSignUp, s);
        s.btnBattle.addClickListener(s.onBattle, s);
        s.btnEmploy.addClickListener(s.onEmploy, s);
        s.btnRew.addClickListener(s.onRew, s);
        s.txtDes.addEventListener(egret.TextEvent.LINK, s.onLink, s);
        s.onUpdate();
        IconUtil.setImg(s.imgBg, Enum_Path.GUAN_QIA_URL + "tigPasBg.jpg");
        IconUtil.setImg(s.imgBg1, Enum_Path.GUAN_QIA_URL + "tigPasBg1.png");
    };
    ChildTigerPass.prototype.onHide = function () {
        var m = GGlobal.modelTigerPass;
        var s = this;
        s.list.numItems = 0;
        m.remove(Model_TigerPass.msg_openui, s.onUpdate, s);
        m.remove(Model_TigerPass.msg_employ, s.onUpEmp, s);
        m.remove(Model_TigerPass.msg_join_employ, s.upJoinEmp, s);
        s.btnSignUp.removeClickListener(s.onSignUp, s);
        s.btnBattle.removeClickListener(s.onBattle, s);
        s.btnEmploy.removeClickListener(s.onEmploy, s);
        s.btnRew.removeClickListener(s.onRew, s);
        Timer.instance.remove(s.onTimer, s);
        s.txtDes.removeEventListener(egret.TextEvent.LINK, s.onLink, s);
        IconUtil.setImg(s.imgBg, null);
        IconUtil.setImg(s.imgBg1, null);
        IconUtil.setImg(s.imgCost, null);
    };
    ChildTigerPass.prototype.onUpdate = function () {
        var s = this;
        var m = GGlobal.modelTigerPass;
        if (m.curId == 0)
            return;
        s._rew = null;
        var lasRew = null;
        if (m.rewArr.length > 0) {
            for (var i = 0; i < m.rewArr.length; i++) {
                var v = m.rewArr[i];
                if (v.status == 1) {
                    s._rew = v;
                    break;
                }
            }
            lasRew = m.rewArr[m.rewArr.length - 1];
        }
        var rewId = m.curId;
        if (s._rew && s._rew.status == 1) {
            s.btnEmploy.visible = false;
            s.btnBattle.visible = false;
            s.btnRew.visible = true;
            s.btnRew.checkNotice = true;
            s.imgHas.visible = false;
            //进度条
            s.bar.value = 0;
            s.bar.max = 100;
            s.lbGua.text = s._rew.id + "";
            rewId = s._rew.id;
        }
        else if (lasRew && lasRew.status == 2 && lasRew.id == m.curId) {
            s.imgHas.visible = true;
            s.btnEmploy.visible = false;
            s.btnBattle.visible = false;
            s.btnRew.visible = false;
            //进度条
            s.bar.value = 0;
            s.bar.max = 100;
            s.lbGua.text = m.curId + "";
        }
        else {
            s.btnEmploy.visible = true;
            s.btnBattle.visible = true;
            s.btnRew.visible = false;
            s.imgHas.visible = false;
            //进度条
            s.bar.value = m.bossCurHp;
            s.bar.max = m.bossMaxHp;
            s.lbGua.text = m.curId + "";
        }
        //奖励
        var cfg = Config.hlg_323[rewId];
        s._rewArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.tg));
        s.list.numItems = s._rewArr.length;
        //cd
        if (m.cdTime > 0) {
            Timer.instance.listen(s.onTimer, s, 1000);
            s.onTimer();
        }
        else {
            Timer.instance.remove(s.onTimer, s);
            s.lbTime.text = "";
        }
        s.onUpEmp();
        s.upBatCount();
        s.upJoinEmp();
    };
    ChildTigerPass.prototype.upJoinEmp = function () {
        var s = this;
        var m = GGlobal.modelTigerPass;
        s.btnSignUp.checkNotice = m.isEmploy == 0;
    };
    ChildTigerPass.prototype.onUpEmp = function () {
        var s = this;
        var m = GGlobal.modelTigerPass;
        //雇佣
        if (m.employPower > 0) {
            s.lbName.text = m.employName + "";
            s.lbPower.text = "战力:" + m.employPower;
            s.vHead.setdata(m.employHead, -1, "", m.employVip, false, m.employFrame);
            s.boxEmp.visible = true;
        }
        else {
            s.boxEmp.visible = false;
        }
    };
    ChildTigerPass.prototype.renderHander = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._rewArr[index];
    };
    ChildTigerPass.prototype.onEmploy = function () {
        if (GGlobal.modelTigerPass.employId > 0) {
            ViewCommonWarn.text("已雇佣帮手，无需重复雇佣");
            return;
        }
        GGlobal.layerMgr.open(UIConst.TIGER_PASS_EMPLOY);
    };
    ChildTigerPass.prototype.onSignUp = function () {
        GGlobal.layerMgr.open(UIConst.TIGER_PASS_SIGNUP);
    };
    ChildTigerPass.prototype.onBattle = function () {
        GGlobal.modelTigerPass.CGBattle8903();
    };
    ChildTigerPass.prototype.onRew = function () {
        GGlobal.modelTigerPass.CGgetReward8917(this._rew.id);
    };
    ChildTigerPass.prototype.onTimer = function () {
        var s = this;
        var m = GGlobal.modelTigerPass;
        m.cdTime--;
        s.lbTime.text = DateUtil.getMSBySecond4(m.cdTime) + "后恢复1次";
        if (m.cdTime < 0) {
            s.lbTime.text = "";
            Timer.instance.remove(s.onTimer, s);
            m.batCt++;
            s.upBatCount();
        }
    };
    ChildTigerPass.prototype.upBatCount = function () {
        var s = this;
        var m = GGlobal.modelTigerPass;
        //消耗
        var ct = Model_Bag.getItemCount(Model_TigerPass.TZ_LING);
        if (!s._vitem) {
            s._vitem = VoItem.create(Model_TigerPass.TZ_LING);
        }
        if (m.employId == 0) {
            s.btnEmploy.checkNotice = true;
        }
        if (m.batCt > 0) {
            s.imgCost.visible = false;
            s.lbCost.text = "挑战次数: " + HtmlUtil.fontNoSize(m.batCt + "/" + ConfigHelp.getSystemNum(7102), Color.GREENSTR);
            s.btnBattle.checkNotice = true;
        }
        else if (ct > 0) {
            s.lbCost.text = "虎牢关挑战令:        " + HtmlUtil.fontNoSize(ct + "/1", Color.GREENSTR);
            IconUtil.setImg(s.imgCost, Enum_Path.ICON70_URL + s._vitem.icon + ".png");
            s.imgCost.visible = true;
            s.btnBattle.checkNotice = true;
        }
        else {
            s.imgCost.visible = false;
            s.lbCost.text = "挑战次数: " + HtmlUtil.fontNoSize(m.batCt + "/" + ConfigHelp.getSystemNum(7102), Color.REDSTR);
            s.btnBattle.checkNotice = false;
            s.btnEmploy.checkNotice = false;
        }
        if (s.lbTime.text == "") {
            s.lbCost.x = (s.width - s.lbCost.textWidth) / 2;
            s.imgCost.x = s.lbCost.x + 119;
        }
        else {
            s.lbCost.x = 160;
            s.imgCost.x = 279;
        }
        var xpot = s.lbCost.x + s.lbCost.textWidth + 8;
        s.lbTime.x = 355 > xpot ? 355 : xpot;
    };
    ChildTigerPass.URL = "ui://7a366usay5hd23";
    return ChildTigerPass;
}(fairygui.GComponent));
__reflect(ChildTigerPass.prototype, "ChildTigerPass");
