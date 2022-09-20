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
 * 跨服王者战斗界面
 * @author: lujiahao
 * @date: 2019-12-16 15:02:54
 */
var ViewBattleKfwz = (function (_super) {
    __extends(ViewBattleKfwz, _super);
    function ViewBattleKfwz() {
        var _this = _super.call(this) || this;
        _this.isClosePanel = false;
        _this.isShowMask = false;
        _this.loadRes("Arena", "Arena_atlas0");
        return _this;
    }
    ViewBattleKfwz.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewBattleKfwz"));
    };
    ViewBattleKfwz.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewBattleKfwz").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewBattleKfwz.prototype.initView = function () {
        var t = this;
        t._myListHead = [t.head10, t.head11, t.head12];
        t._enemyListHead = [t.head20, t.head21, t.head22];
        t.groupUpTips.visible = false;
    };
    //=========================================== API ==========================================
    ViewBattleKfwz.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.refreshData();
    };
    ViewBattleKfwz.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
    };
    ViewBattleKfwz.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewBattleKfwz.prototype.onMcComplete = function () {
        var t = this;
        t.groupUpTips.visible = false;
        ImageLoader.instance.removeLoader(t.imgHead);
        ImageLoader.instance.removeLoader(t.imgHeadGrid);
    };
    ViewBattleKfwz.prototype.playUpTips = function (pNextVo) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        t.groupUpTips.visible = true;
        if (pNextVo.headGrid)
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pNextVo.headGrid + ""), t.imgHeadGrid);
        if (pNextVo.head)
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pNextVo.head + ""), t.imgHead);
        var t_color = Color.GREENSTR;
        if (pNextVo.force == 2) {
            //敌方阵营
            t_color = Color.REDSTR;
        }
        t.tfUpTips.text = HtmlUtil.font(pNextVo.name, t_color) + "上阵";
        // t.mcUp.play(t.onMcComplete, t);
        egret.Tween.removeTweens(t.groupUpTips);
        t.groupUpTips.x = -t.groupUpTips.width;
        t.groupUpTips.visible = true;
        var tw = egret.Tween.get(t.groupUpTips);
        tw.to({ x: t.width - t.groupUpTips.width >> 1 }, 250)
            .wait(750)
            .to({ x: t.width }, 250)
            .call(function () {
            t.onMcComplete();
        });
    };
    ViewBattleKfwz.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        for (var i = 0; i < t._myListHead.length; i++) {
            var t_vo = t_model.myFightList[i];
            t._myListHead[i].setData(t_vo);
        }
        for (var i = 0; i < t._enemyListHead.length; i++) {
            var t_vo = t_model.enemyFightList[i];
            t._enemyListHead[i].setData(t_vo);
        }
        t.tfName1.text = t_model.myFightList[0].name;
        t.tfName2.text = t_model.enemyFightList[0].name;
        if (t_model.myBattleList.length < 2)
            t.groupFlag1.visible = false;
        else
            t.groupFlag1.visible = true;
        if (t_model.enemyBattleList.length < 2)
            t.groupFlag2.visible = false;
        else
            t.groupFlag2.visible = true;
        t.refreshHp();
    };
    ViewBattleKfwz.prototype.refreshHp = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        var t_vo1 = t_model.myFightList[0];
        var t_vo2 = t_model.enemyFightList[0];
        if (t_vo1) {
            t.hpBar1.max = t_vo1.maxHp;
            t.hpBar1.value = t_vo1.curHp;
            if (t_vo1.curHp == 0 || t_vo1.maxHp == 0) {
                t.tfHp1.text = 0 + "%";
            }
            else {
                var t_value = t_vo1.curHp * 100 / t_vo1.maxHp;
                var t_str = t_value.toFixed(1);
                if (t_str.charAt(t_str.length - 1) == "0")
                    t_str = t_value.toFixed(0);
                t.tfHp1.text = t_str + "%";
            }
        }
        if (t_vo2) {
            t.hpBar2.max = t_vo2.maxHp;
            t.hpBar2.value = t_vo2.curHp;
            if (t_vo2.curHp == 0 || t_vo2.maxHp == 0) {
                t.tfHp2.text = 0 + "%";
            }
            else {
                var t_value = t_vo2.curHp * 100 / t_vo2.maxHp;
                var t_str = t_value.toFixed(1);
                if (t_str.charAt(t_str.length - 1) == "0")
                    t_str = t_value.toFixed(0);
                t.tfHp2.text = t_str + "%";
            }
        }
    };
    ViewBattleKfwz.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_BATTLE_PLAYER_DEAD, t.onPlayerDead, t);
        if (pFlag) {
            SimpleTimer.ins().addTimer(t.onUpdate, t, 0, 0);
        }
        else {
            SimpleTimer.ins().removeTimer(t.onUpdate, t);
        }
    };
    //======================================== handler =========================================
    /** 玩家死亡更新处理 */
    ViewBattleKfwz.prototype.onPlayerDead = function (pData) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        t.refreshData();
        if (pData.nextVo) {
            t.playUpTips(pData.nextVo);
        }
        else {
            if (pData.nextVo === undefined) {
            }
            else {
                //提示某某退出
                var t_color = Color.GREENSTR;
                if (pData.deadVo.force == 2) {
                    //敌方阵营
                    t_color = Color.REDSTR;
                }
                ViewCommonWarn.text(HtmlUtil.font(pData.deadVo.name, t_color) + "退出了战斗");
            }
        }
    };
    ViewBattleKfwz.prototype.onUpdate = function () {
        var t = this;
        t.refreshHp();
    };
    //>>>>end
    ViewBattleKfwz.URL = "ui://me1skowlfyft85";
    return ViewBattleKfwz;
}(UIModalPanel));
__reflect(ViewBattleKfwz.prototype, "ViewBattleKfwz");
