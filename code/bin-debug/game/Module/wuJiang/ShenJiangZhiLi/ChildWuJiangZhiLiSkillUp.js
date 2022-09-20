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
 * 神将之力 - 技能进阶
 */
var ChildWuJiangZhiLiSkillUp = (function (_super) {
    __extends(ChildWuJiangZhiLiSkillUp, _super);
    function ChildWuJiangZhiLiSkillUp() {
        var _this = _super.call(this) || this;
        _this._maxLv = 0;
        _this.heroType = 0;
        _this._count = 0;
        return _this;
    }
    ChildWuJiangZhiLiSkillUp.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "ChildWuJiangZhiLiSkillUp"));
    };
    ChildWuJiangZhiLiSkillUp.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildWuJiangZhiLiSkillUp.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.vres.setType(1);
    };
    ChildWuJiangZhiLiSkillUp.prototype.openPanel = function (pData) {
        var s = this;
        s.heroType = Model_WuJiang.wujiangzhiliType;
        s.skillUpBtn.addClickListener(s.onSkillUp, s);
        GGlobal.control.listen(Enum_MsgType.WUJIANG_SHENGJIANGZHILI_SKILLUP, s.updateView, s);
        s.updateView();
    };
    ChildWuJiangZhiLiSkillUp.prototype.closePanel = function (pData) {
        var s = this;
        s.skillUpBtn.removeClickListener(s.onSkillUp, s);
        GGlobal.control.remove(Enum_MsgType.WUJIANG_SHENGJIANGZHILI_SKILLUP, s.updateView, s);
    };
    ChildWuJiangZhiLiSkillUp.prototype.updateView = function () {
        var s = this;
        var cfg;
        for (var key in Config.herogodskill_211) {
            cfg = Config.herogodskill_211[key];
            var id_1 = Math.floor(cfg.id / 100);
            if (id_1 == Model_WuJiang.wujiangzhiliType) {
                s._maxLv = cfg.star;
            }
        }
        var shenjiangzhiliSkillLv = Model_WuJiang.shenjiangzhiliSkillLv[Model_WuJiang.wujiangzhiliType] ? Model_WuJiang.shenjiangzhiliSkillLv[Model_WuJiang.wujiangzhiliType] : 0;
        var shenjiangzhiliLv = Model_WuJiang.wujiangGodPower[Model_WuJiang.wujiangzhiliType] ? Model_WuJiang.wujiangGodPower[Model_WuJiang.wujiangzhiliType] : 0;
        var id = Model_WuJiang.wujiangzhiliType * 100 + shenjiangzhiliSkillLv;
        var curCfg = Config.herogodskill_211[id];
        var nextCfg = Config.herogodskill_211[id + 1];
        if (shenjiangzhiliSkillLv > 0) {
            if (nextCfg) {
                s.c1.selectedIndex = 1;
                s.powerLb.text = curCfg.power + "";
                var color = shenjiangzhiliLv >= curCfg.star ? "#58ff31" : "#ee1515";
                s.curLb.text = "[color=#ffee79]当前阶段：[/color][color=#fffccc]神将之力达到" + curCfg.star + "级[/color][color=" + color + "](" + shenjiangzhiliLv + "/" + curCfg.star + ")[/color]";
                s.curDes.text = curCfg.tips;
                var attArr = JSON.parse(curCfg.attr);
                var attStr = "";
                for (var i = 0; i < attArr.length; i++) {
                    if (i == 0) {
                        attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1], "+", "#ffffff");
                    }
                    else {
                        attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1], "+", "#ffffff");
                    }
                }
                s.curAttLb.text = attStr;
                color = shenjiangzhiliLv >= nextCfg.star ? "#58ff31" : "#ee1515";
                s.nextLb.text = "[color=#ffee79]下一阶段：[/color][color=#fffccc]神将之力达到" + nextCfg.star + "级[/color][color=" + color + "](" + shenjiangzhiliLv + "/" + nextCfg.star + ")[/color]";
                s.nextDes.text = nextCfg.tips;
                attArr = JSON.parse(nextCfg.attr);
                attStr = "";
                for (var i = 0; i < attArr.length; i++) {
                    if (i == 0) {
                        attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                    }
                    else {
                        attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
                    }
                }
                s.nextAttLb.text = attStr;
                s._costArr = JSON.parse(nextCfg.consume);
                var itemVo = VoItem.create(s._costArr[0][1]);
                s.vres.setImgUrl(itemVo.icon);
                s._count = Model_Bag.getItemCount(s._costArr[0][1]);
                s.vres.setLb(s._count, s._costArr[0][2]);
                s.itemName.text = itemVo.name;
            }
            else {
                s.c1.selectedIndex = 2;
                s.powerLb.text = curCfg.power + "";
                var color = shenjiangzhiliLv >= curCfg.star ? "#58ff31" : "#ee1515";
                s.curLb.text = "[color=#ffee79]当前阶段：[/color][color=#fffccc]神将之力达到" + curCfg.star + "级[/color][color=" + color + "](" + shenjiangzhiliLv + "/" + curCfg.star + ")[/color]";
                s.curDes.text = curCfg.tips;
                var attArr = JSON.parse(curCfg.attr);
                var attStr = "";
                for (var i = 0; i < attArr.length; i++) {
                    if (i == 0) {
                        attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1], "+", "#ffffff");
                    }
                    else {
                        attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1], "+", "#ffffff");
                    }
                }
                s.curAttLb.text = attStr;
            }
            var arr = JSON.parse(curCfg.attpg);
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                if (s["skillTxt" + i]) {
                    s["skillTxt" + i].text = s.ShowSkillTxt(arr[i][0], arr[i][1]);
                }
            }
        }
        else {
            s.c1.selectedIndex = 0;
            s.powerLb.text = "0";
            var color = shenjiangzhiliLv >= nextCfg.star ? "#58ff31" : "#ee1515";
            s.nextLb.text = "[color=#ffee79]下一阶段：[/color][color=#fffccc]神将之力达到" + nextCfg.star + "级[/color][color=" + color + "](" + shenjiangzhiliLv + "/" + nextCfg.star + ")[/color]";
            s.nextDes.text = nextCfg.tips;
            var attArr = JSON.parse(nextCfg.attr);
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
            s._costArr = JSON.parse(nextCfg.consume);
            var itemVo = VoItem.create(s._costArr[0][1]);
            s.vres.setImgUrl(itemVo.icon);
            s._count = Model_Bag.getItemCount(s._costArr[0][1]);
            s.vres.setLb(s._count, s._costArr[0][2]);
            s.itemName.text = itemVo.name;
            var arr = JSON.parse(nextCfg.attpg);
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                if (s["skillTxt" + i]) {
                    s["skillTxt" + i].text = s.ShowSkillTxt(arr[i][0], 0);
                }
            }
        }
        s.skillUpBtn.checkNotice = GGlobal.reddot.checkCondition(UIConst.WUJIANGZHILI_SKILL, this.heroType);
    };
    /**
     * 技能伤害txt
     */
    ChildWuJiangZhiLiSkillUp.prototype.ShowSkillTxt = function (id, per) {
        var str = "";
        var cfg = Config.skill_210[id];
        str = cfg ? cfg.n : "";
        str += "：" + per / 1000 + "%";
        return str;
    };
    /**
     * 技能进阶
     */
    ChildWuJiangZhiLiSkillUp.prototype.onSkillUp = function () {
        // let s = this;
        // if(Model_WuJiang.shenjiangzhiliSkillLv[Model_WuJiang.wujiangzhiliType] = null)
        // {
        // 	ViewCommonWarn.text("神将未激活");
        // 	return;
        // }
        // if(Model_WuJiang.shenjiangzhiliSkillLv[Model_WuJiang.wujiangzhiliType] >= this._maxLv)
        // {
        // 	ViewCommonWarn.text("已达最大阶");
        // 	return;
        // }
        // if(s._count < s._costArr[0][2])
        // {
        // 	ViewCommonWarn.text("道具不足");
        // 	return;
        // }
        GGlobal.modelWuJiang.CG_GENERAL_SKILLUP(Model_WuJiang.wujiangzhiliType);
    };
    ChildWuJiangZhiLiSkillUp.URL = "ui://zyx92gzwf00b4y";
    return ChildWuJiangZhiLiSkillUp;
}(fairygui.GComponent));
__reflect(ChildWuJiangZhiLiSkillUp.prototype, "ChildWuJiangZhiLiSkillUp", ["IPanel"]);
