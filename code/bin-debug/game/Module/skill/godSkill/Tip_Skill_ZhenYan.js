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
var Tip_Skill_ZhenYan = (function (_super) {
    __extends(Tip_Skill_ZhenYan, _super);
    function Tip_Skill_ZhenYan() {
        var _this = _super.call(this) || this;
        _this.iconurlArr = ["", "ui://c7onhgk8dn7917", "ui://c7onhgk8dn7919", "ui://c7onhgk8dn7918"];
        _this.skillID = 0;
        _this.ret = 0;
        _this.childrenCreated();
        return _this;
    }
    Tip_Skill_ZhenYan.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("Skill", "Tip_Skill_ZhenYan").asCom;
        this.contentPane = this.view;
        this.iconImg = (this.view.getChild("iconImg"));
        this.upgradeBt = (this.view.getChild("upgradeBt"));
        this.nameLb = (this.view.getChild("nameLb"));
        this.levelLb = (this.view.getChild("levelLb"));
        this.curAttLb = (this.view.getChild("curAttLb"));
        this.nextAttLb = (this.view.getChild("nextAttLb"));
        this.costItem = (this.view.getChild("costItem"));
        this.upgradeBt.addClickListener(this.upgradeHandle, this);
        _super.prototype.childrenCreated.call(this);
    };
    Tip_Skill_ZhenYan.prototype.upgradeHandle = function () {
        if (this.upgradeBt.checkNotice) {
            GGlobal.modelSkill.CG_UPGRADE_GODSKILL_ZHENYAN(this.skillID);
        }
        else {
            if (this.ret == 1) {
                ViewCommonWarn.text("已满级");
            }
            else if (this.ret == 2) {
                View_CaiLiao_GetPanel.show(this._costItem);
            }
        }
    };
    Tip_Skill_ZhenYan.prototype.update = function () {
        var skillList = Model_player.voMine.skillList;
        for (var i = 0; i < skillList.length; i++) {
            if (skillList[i].type == Model_Skill.TYPE3) {
                this._args = skillList[i].zhenYanArr[Math.floor(this.skillID / 1000) - 1];
                break;
            }
        }
        this.show();
    };
    Tip_Skill_ZhenYan.prototype.show = function () {
        this.skillID = this._args;
        this.ret = 0;
        var cfg = Config.godskill_210[this.skillID];
        var arr = JSON.parse(cfg.result);
        this.iconImg.url = this.iconurlArr[cfg.type];
        this.nameLb.text = cfg.name;
        this.levelLb.text = cfg.dengji % 1000 + "级";
        this.curAttLb.text = Vo_attr.getShowStr(arr[0][0], arr[0][1]);
        if (cfg.next > 0) {
            var costArr = JSON.parse(cfg.consume);
            this._costItem = VoItem.create(costArr[0][1]);
            var count = Model_Bag.getItemCount(costArr[0][1]);
            this.costItem.setLb(count, costArr[0][2]);
            this.costItem.setImgUrl(this._costItem.icon);
            var cfg1 = Config.godskill_210[cfg.next];
            var arr1 = JSON.parse(cfg1.result);
            this.nextAttLb.text = Vo_attr.getShowStr(arr1[0][0], arr1[0][1]);
            this.upgradeBt.checkNotice = count >= costArr[0][2];
            if (count < costArr[0][2])
                this.ret = 2;
        }
        else {
            this.nextAttLb.text = this.curAttLb.text;
            this.upgradeBt.checkNotice = false;
            this.costItem.setCount(HtmlUtil.fontNoSize("已满级", Color.getColorStr(6)));
            this.costItem.setImgUrl();
            this.ret = 1;
        }
    };
    Tip_Skill_ZhenYan.prototype.onShown = function () {
        this.show();
        GGlobal.reddot.listen(ReddotEvent.CHECK_GOD_SKILL, this.update, this);
    };
    Tip_Skill_ZhenYan.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.GODSKILL_ZHENYAN);
        GGlobal.reddot.remove(ReddotEvent.CHECK_GOD_SKILL, this.update, this);
    };
    Tip_Skill_ZhenYan.URL = "ui://c7onhgk8lqbqo";
    return Tip_Skill_ZhenYan;
}(UIModalPanel));
__reflect(Tip_Skill_ZhenYan.prototype, "Tip_Skill_ZhenYan");
