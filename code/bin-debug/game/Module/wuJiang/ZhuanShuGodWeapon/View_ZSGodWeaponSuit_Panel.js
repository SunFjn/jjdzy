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
var View_ZSGodWeaponSuit_Panel = (function (_super) {
    __extends(View_ZSGodWeaponSuit_Panel, _super);
    function View_ZSGodWeaponSuit_Panel() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_ZSGodWeaponSuit_Panel.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("wuJiang", "View_ZSGodWeaponSuit_Panel").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    View_ZSGodWeaponSuit_Panel.prototype.updateShow = function () {
        var self = this;
        var vo = self.vo;
        self.powerLb.text = vo.zhuanShuCfg.zhanli + "";
        self.wujiangGrid.setSuitVo(vo.wujiangVo);
        self.weaponGrid.setSuitVo(vo);
        self.levelLb.text = "专属等级：" + vo.zsLv;
        var tiaoJianArr = JSON.parse(vo.zhuanShuCfg.dangqian);
        var index = 0;
        self.godBt.checkNotice = false;
        if (vo.zhuanShuCfg.next == 0) {
            self.curLb.text = ConfigHelp.reTxt("当前阶段：武将·{0}和神兵·{1}达到{2}星({3})", vo.wujiangVo.name, vo.cfg.name, tiaoJianArr[0][1], HtmlUtil.fontNoSize("已满级", Color.getColorStr(2)));
            var skillArr = JSON.parse(vo.zhuanShuCfg.jineng);
            self.curAttLb.text = ConfigHelp.reTxt("{0}提升[color=#66CCFF]{1}%[/color]伤害", Config.skill_210[skillArr[0][0]].n, skillArr[0][1] / 1000) + "\n" +
                ConfigHelp.attrString(JSON.parse(vo.zhuanShuCfg.shuxing), "+");
            self.curAttLb.color = Color.getColorInt(2);
            self.nextGroup.visible = false;
        }
        else if (vo.zhuanShuCfg.zhanli == 0) {
            var nextcfg = Config.sbzs_750[vo.zhuanShuCfg.next];
            var tiaoJianArr1 = JSON.parse(nextcfg.dangqian);
            if (Model_WuJiang.getWuJiangStarByJob(vo.job) >= tiaoJianArr1[0][1])
                index++;
            if (vo.starLv >= tiaoJianArr1[1][1])
                index++;
            var color = index >= 2 ? 2 : 6;
            self.curLb.text = ConfigHelp.reTxt("下一阶段：武将·{0}和神兵·{1}达到{2}星({3})", vo.wujiangVo.name, vo.cfg.name, tiaoJianArr1[0][1], HtmlUtil.fontNoSize(index + "/2", Color.getColorStr(color)));
            var skillArr = JSON.parse(nextcfg.jineng);
            self.curAttLb.text = ConfigHelp.reTxt("{0}提升[color=#66CCFF]{1}%[/color]伤害", Config.skill_210[skillArr[0][0]].n, skillArr[0][1] / 1000) + "\n" +
                ConfigHelp.attrString(JSON.parse(nextcfg.shuxing), "+");
            self.curAttLb.color = 0x999999;
            self.nextGroup.visible = false;
            self.godBt.enabled = self.godBt.checkNotice = index >= 2;
            self.godBt.text = "激活";
        }
        else {
            var nextcfg = Config.sbzs_750[vo.zhuanShuCfg.next];
            var tiaoJianArr1 = JSON.parse(nextcfg.dangqian);
            if (Model_WuJiang.getWuJiangStarByJob(vo.job) >= tiaoJianArr1[0][1])
                index++;
            if (vo.starLv >= tiaoJianArr1[1][1])
                index++;
            var color = index >= 2 ? 2 : 6;
            self.curLb.text = ConfigHelp.reTxt("当前阶段：武将·{0}和神兵·{1}达到{2}星({3})", vo.wujiangVo.name, vo.cfg.name, tiaoJianArr[0][1], HtmlUtil.fontNoSize("2/2", Color.getColorStr(2)));
            var skillArr = JSON.parse(vo.zhuanShuCfg.jineng);
            self.curAttLb.text = ConfigHelp.reTxt("{0}提升[color=#66CCFF]{1}%[/color]伤害", Config.skill_210[skillArr[0][0]].n, skillArr[0][1] / 1000) + "\n" +
                ConfigHelp.attrString(JSON.parse(vo.zhuanShuCfg.shuxing), "+");
            self.curAttLb.color = Color.getColorInt(2);
            self.nextLb.text = ConfigHelp.reTxt("下一阶段：武将·{0}和神兵·{1}达到{2}星({3})", vo.wujiangVo.name, vo.cfg.name, tiaoJianArr1[0][1], HtmlUtil.fontNoSize(index + "/2", Color.getColorStr(color)));
            var skillArr1 = JSON.parse(nextcfg.jineng);
            self.nextAttLb.text = ConfigHelp.reTxt("{0}提升[color=#66CCFF]{1}%[/color]伤害", Config.skill_210[skillArr1[0][0]].n, skillArr1[0][1] / 1000) + "\n" +
                ConfigHelp.attrString(JSON.parse(nextcfg.shuxing), "+");
            self.nextGroup.visible = true;
            self.godBt.enabled = self.godBt.checkNotice = index >= 2;
            self.godBt.text = "升级";
        }
    };
    View_ZSGodWeaponSuit_Panel.prototype.OnUp = function () {
        var self = this;
        if (self.godBt.checkNotice) {
            GGlobal.modelGodWeapon.CG_GodWeapon_actzhuanshuLv_7857(self.vo.job);
        }
        else {
            ViewCommonWarn.text("专属神兵已满级");
        }
    };
    View_ZSGodWeaponSuit_Panel.prototype.onShown = function () {
        var self = this;
        self.vo = self._args;
        self.updateShow();
        self.godBt.addClickListener(self.OnUp, self);
        GGlobal.reddot.listen(UIConst.ZS_GODWEAPON, self.updateShow, self);
    };
    View_ZSGodWeaponSuit_Panel.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(UIConst.ZS_GODWEAPON_SUIT);
        self.godBt.removeClickListener(self.OnUp, self);
        GGlobal.reddot.remove(UIConst.ZS_GODWEAPON, self.updateShow, self);
    };
    View_ZSGodWeaponSuit_Panel.URL = "ui://zyx92gzwhi6342";
    return View_ZSGodWeaponSuit_Panel;
}(UIModalPanel));
__reflect(View_ZSGodWeaponSuit_Panel.prototype, "View_ZSGodWeaponSuit_Panel");
