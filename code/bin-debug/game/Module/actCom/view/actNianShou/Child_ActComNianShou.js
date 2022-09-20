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
var Child_ActComNianShou = (function (_super) {
    __extends(Child_ActComNianShou, _super);
    function Child_ActComNianShou() {
        var _this = _super.call(this) || this;
        // private lastTime: number = 0
        _this.isCrit = 100;
        return _this;
    }
    Child_ActComNianShou.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComNianShou", "Child_ActComNianShou"));
    };
    Child_ActComNianShou.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.lbDes.text = HtmlUtil.createLink("玩法说明", true);
        s.hpBar.titleType = fairygui.ProgressTitleType.ValueAndMax;
    };
    Child_ActComNianShou.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ItemNianShouReward.URL, ItemNianShouReward);
        f(ItemNianShouGrid.URL, ItemNianShouGrid);
        f(VNianShou.URL, VNianShou);
        f(VNianShouHp.URL, VNianShouHp);
        f(VNianShouBtn.URL, VNianShouBtn);
    };
    Child_ActComNianShou.prototype.initView = function (pParent) {
        var s = this;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
    };
    Child_ActComNianShou.prototype.openPanel = function (pData) {
        var s = this;
        s.y = 0;
        s._act = pData;
        GGlobal.modelActivity.CG_OPENACT(s._act.id);
        IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "nianshou.jpg");
        Timer.instance.listen(s.upTimer, s, 1000);
        s.registerEvent(true);
        //大于则是暴击
        s.isCrit = Number(JSON.parse(ConfigHelp.getSystemDesc(7904))[0][0]);
        s._BPCfgTime = ConfigHelp.getSystemNum(7907);
        s._BPCfgCt = ConfigHelp.getSystemNum(7906);
        s.lbNameBP.text = HtmlUtil.fontNoSize("鞭炮", Color.getColorStr(Color.ORANGE));
    };
    Child_ActComNianShou.prototype.closePanel = function (pData) {
        var s = this;
        s.list.numItems = 0;
        IconUtil.setImg(s.imgBg, null);
        s.vNianShou.clean();
        Timer.instance.remove(s.upTimer, s);
        Timer.instance.remove(s.upTimeBP, s);
        s.registerEvent(false);
        s.vReward.clean();
        s.btnKing.clean();
    };
    Child_ActComNianShou.prototype.registerEvent = function (pFlag) {
        var s = this;
        var m = GGlobal.model_ActNianShou;
        // let red = GGlobal.reddot;
        m.register(pFlag, Model_ActNianShou.openui, s.upView, s);
        m.register(pFlag, Model_ActNianShou.attack, s.takeDmg, s);
        m.register(pFlag, Model_ActNianShou.ns_die, s.nsDie, s);
        m.register(pFlag, Model_ActNianShou.attack_fail, s.attackFail, s);
        GGlobal.control.register(pFlag, Enum_MsgType.ZERO_RESET, s.zeroReset, s);
        // red.register(pFlag, UIConst.ACTCOM_NIANSHOU, s.upRed, s);
        EventUtil.register(pFlag, s.btnZhao, egret.TouchEvent.TOUCH_TAP, s.onZhao, s);
        EventUtil.register(pFlag, s.btnRward, egret.TouchEvent.TOUCH_TAP, s.onRward, s);
        EventUtil.register(pFlag, s.btnKing, egret.TouchEvent.TOUCH_TAP, s.onKing, s);
        EventUtil.register(pFlag, s.vNianShou, egret.TouchEvent.TOUCH_TAP, s.onBat, s);
        EventUtil.register(pFlag, s.lbDes, egret.TextEvent.LINK, s.onTFClick, s);
    };
    Child_ActComNianShou.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.closePanel();
    };
    Child_ActComNianShou.prototype.itemRender = function (index, item) {
        var s = this;
        item.vo = s._listData[index];
    };
    Child_ActComNianShou.prototype.upTimer = function () {
        var s = this;
        var end = s._act ? s._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            s.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            s.labTime.text = "00:00:00";
        }
    };
    Child_ActComNianShou.prototype.upTimeBP = function () {
        var s = this;
        var m = GGlobal.model_ActNianShou;
        if (m.lastTime > 0) {
            s.lbFresh.text = DateUtil.getMSBySecond4(m.lastTime) + "后恢复1个鞭炮";
            m.lastTime--;
        }
        else {
            if (m.bianpaoCt < s._BPCfgCt) {
                m.lastTime = s._BPCfgTime;
                m.bianpaoCt++;
            }
            s.upBianPao();
        }
    };
    Child_ActComNianShou.prototype.upBianPao = function () {
        var s = this;
        var m = GGlobal.model_ActNianShou;
        s.lbBPCt.text = m.bianpaoCt + "/" + s._BPCfgCt;
        if (m.bianpaoCt < s._BPCfgCt) {
            Timer.instance.listen(s.upTimeBP, s, 1000);
        }
        else {
            s.lbFresh.text = "";
            Timer.instance.remove(s.upTimeBP, s);
        }
    };
    Child_ActComNianShou.prototype.upView = function () {
        var s = this;
        var m = GGlobal.model_ActNianShou;
        s._listData = m.nsArr;
        s.list.numItems = 5;
        //鞭炮
        // s.lastTime = m.lastTime
        s.upBianPao();
        if (m.nsId > 0 && m.lastHp > 0) {
            s.imgNo.visible = false;
            var nsCfg = Config.nian_299[m.nsId];
            s.lbName.text = HtmlUtil.fontNoSize(nsCfg.name, Color.getColorStr(nsCfg.pz));
            s.hpBar.max = nsCfg.hp;
            s.hpBar.value = m.lastHp;
            s.gHp.visible = true;
            s.vNianShou.setImg(nsCfg.pz);
            s.vNianShou.visible = true;
            //奖励
            s.gReward.visible = true;
            s.vReward.tipEnabled = s.vReward.isShowEff = true;
            var itRew = ConfigHelp.makeItemListArr(JSON.parse(nsCfg.reward))[0];
            s.vReward.vo = itRew;
            s.lbReward.text = itRew.name;
            s.lbReward.color = itRew.qColor;
            s.vNianShou.touchable = true;
        }
        else {
            s.imgNo.visible = true;
            s.vNianShou.visible = false;
            s.lbName.text = "";
            s.gHp.visible = false;
            s.gReward.visible = false;
        }
        s.lbTip1.visible = (m.nsId == 0 || m.lastHp == 0);
        s.btnZhao.visible = (m.nsId == 0 || m.lastHp == 0);
        // s.btnKing.visible = true
        s.btnKing.setSt(m.kingSt);
        this.btnRward.checkNotice = m.checkReward();
    };
    Child_ActComNianShou.prototype.onZhao = function () {
        GGlobal.model_ActNianShou.CG_SUMMON_11551();
    };
    Child_ActComNianShou.prototype.onRward = function () {
        GGlobal.layerMgr.open(UIConst.ACTCOM_NIANSHOU_REWARD);
    };
    Child_ActComNianShou.prototype.onKing = function () {
        var m = GGlobal.model_ActNianShou;
        if (m.kingSt > 0) {
            ViewCommonWarn.text("已召唤过年兽王");
            return;
        }
        var cfg = Config.nian_299[5];
        if (!Model_ActNianShou.getState(cfg.open, cfg.end)) {
            ViewCommonWarn.text("不在挑战时间");
            return;
        }
        GGlobal.model_ActNianShou.CG_SUMMON_KING_11553();
    };
    Child_ActComNianShou.prototype.onTFClick = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOM_NIANSHOU);
    };
    Child_ActComNianShou.prototype.onBat = function () {
        var s = this;
        s.vNianShou.touchable = false;
        GGlobal.model_ActNianShou.CG_ATTACT_11555();
    };
    Child_ActComNianShou.prototype.takeDmg = function (val) {
        var s = this;
        var hp = VNianShouHp.create();
        var iscrit = val > s.isCrit;
        hp.init(s.vNianShou.x, s.vNianShou.y, val, iscrit, true, false, false);
        hp.onAdd(this);
    };
    Child_ActComNianShou.prototype.nsDie = function () {
        var s = this;
        var m = GGlobal.model_ActNianShou;
        s.hpBar.value = m.lastHp;
        var v = ViewGrid.create();
        v.tipEnabled = v.isShowEff = false;
        v.vo = s.vReward.vo;
        v.setScale(0.7, 0.7);
        s.gReward.visible = false;
        this.addChild(v);
        v.x = s.vReward.x;
        v.y = s.vReward.y;
        //飘入
        egret.Tween.get(v).to({ x: s.list.x + s.list.width / 2, y: s.list.y }, 400, egret.Ease.sineIn).call(s.nsDieEnd, s, [v]);
    };
    Child_ActComNianShou.prototype.nsDieEnd = function (v) {
        var s = this;
        v.clean();
        v.removeFromParent();
        s.upView();
    };
    Child_ActComNianShou.prototype.attackFail = function () {
        var s = this;
        s.vNianShou.touchable = true;
    };
    Child_ActComNianShou.prototype.zeroReset = function () {
        if (GGlobal.model_ActNianShou.kingSt == 2) {
            GGlobal.model_ActNianShou.kingSt = 0;
            this.upView();
        }
    };
    Child_ActComNianShou.URL = "ui://ht2966i4dsuf0";
    Child_ActComNianShou.pkg = "actComNianShou";
    return Child_ActComNianShou;
}(fairygui.GComponent));
__reflect(Child_ActComNianShou.prototype, "Child_ActComNianShou");
