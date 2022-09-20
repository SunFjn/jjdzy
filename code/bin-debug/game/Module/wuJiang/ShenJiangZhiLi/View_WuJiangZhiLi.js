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
var View_WuJiangZhiLi = (function (_super) {
    __extends(View_WuJiangZhiLi, _super);
    function View_WuJiangZhiLi() {
        return _super.call(this) || this;
        //    this.loadRes("wuJiang","wuJiang_atlas0");
    }
    View_WuJiangZhiLi.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "View_WuJiangZhiLi"));
    };
    View_WuJiangZhiLi.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    View_WuJiangZhiLi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    View_WuJiangZhiLi.prototype.onClickUpBtn = function () {
        if ((this.starLevel) >= this.currentMaxLevel) {
            GGlobal.modelWuJiang.CGGetGodPower(this.heroType);
        }
        else {
            ViewCommonWarn.text("请先升级星级");
        }
    };
    View_WuJiangZhiLi.prototype.isShow = function (group, isVisible) {
        group.visible = isVisible;
    };
    View_WuJiangZhiLi.prototype.setCurrentLevel = function (name, maxLevel, life, attack, defense, realHurt, curLevel) {
        this.current.text = "[color=#ffee79]当前阶段: [/color][color=#fffccc]" + name + "达到" + maxLevel + "星[/color][color=#58ff31](" + curLevel + "/" + maxLevel + ")[/color]";
        if (this.godPower == 0) {
            this.curLife.text = "[color=#a0a0a0]" + this.oneDesc + " +" + life + "[/color]";
            this.curAttack.text = "[color=#a0a0a0]" + this.twoDesc + " +" + attack + "[/color]";
            this.curDefense.text = "[color=#a0a0a0]" + this.threeDesc + " +" + defense + "[/color]";
            this.curRealHurt.text = "[color=#a0a0a0]" + this.fourDesc + " +" + realHurt + "[/color]";
        }
        else {
            this.curLife.text = "[color=#ffffff]" + this.oneDesc + "[/color][color=#58ff31] +" + life + "[/color]";
            this.curAttack.text = "[color=#ffffff]" + this.twoDesc + "[/color][color=#58ff31] +" + attack + "[/color]";
            this.curDefense.text = "[color=#ffffff]" + this.threeDesc + "[/color][color=#58ff31] +" + defense + "[/color]";
            this.curRealHurt.text = "[color=#ffffff]" + this.fourDesc + "[/color][color=#58ff31] +" + realHurt + "[/color]";
        }
    };
    View_WuJiangZhiLi.prototype.setNextLevel = function (name, maxLevel, life, attack, defense, realHurt, curLevel) {
        if (this.starLevel >= this.currentMaxLevel) {
            this.next.text = "[color=#ffee79]下一阶段: [/color][color=#fffccc]" + name + "达到" + maxLevel + "星[/color][color=#58ff31](" + curLevel + "/" + maxLevel + ")[/color]";
        }
        else {
            this.next.text = "[color=#ffee79]下一阶段: [/color][color=#fffccc]" + name + "达到" + maxLevel + "星[/color][color=#ee1515](" + curLevel + "/" + maxLevel + ")[/color]";
        }
        this.nextLife.text = "[color=#a0a0a0]" + this.oneDesc + " +" + life + "[/color]";
        this.nextAttack.text = "[color=#a0a0a0]" + this.twoDesc + " +" + attack + "[/color]";
        this.nextDefense.text = "[color=#a0a0a0]" + this.threeDesc + " +" + defense + "[/color]";
        this.nextRealHurt.text = "[color=#a0a0a0]" + this.fourDesc + " +" + realHurt + "[/color]";
    };
    /**设置等级为0的情况下的显示 */
    View_WuJiangZhiLi.prototype.setZeroState = function (name, maxLevel, life, attack, defense, realHurt, curLevel) {
        this.current.text = "[color=#ffee79]下一阶段: [/color][color=#fffccc]" + name + "达到" + maxLevel + "星[/color][color=#ee1515](" + curLevel + "/" + maxLevel + ")[/color]";
        this.curLife.text = "[color=#a0a0a0]" + this.oneDesc + " +" + life + "[/color]";
        this.curAttack.text = "[color=#a0a0a0]" + this.twoDesc + " +" + attack + "[/color]";
        this.curDefense.text = "[color=#a0a0a0]" + this.threeDesc + " +" + defense + "[/color]";
        this.curRealHurt.text = "[color=#a0a0a0]" + this.fourDesc + " +" + realHurt + "[/color]";
    };
    View_WuJiangZhiLi.prototype.openPanel = function (pData) {
        GGlobal.control.listen(Enum_MsgType.WUJIANG_SHENGJIANGZHILI, this.updateView, this);
        this.VOdata = Config.herogod_211;
        // this.heroName = "武将·" + this._args.name 
        // this.heroType = this._args.type;
        // this.godPower = Model_WuJiang.wujiangGodPower[this.heroType] || 0;
        // this.starLevel = this._args.star || 0;
        this.heroName = "武将·" + Model_WuJiang.wujiangzhiliName;
        this.heroType = Model_WuJiang.wujiangzhiliType;
        this.godPower = Model_WuJiang.wujiangGodPower[this.heroType] || 0;
        this.starLevel = Model_WuJiang.wujiangzhiliStar || 0;
        this.updateView({ id: this.heroType, level: this.godPower });
        this.upBtn.addClickListener(this.onClickUpBtn, this);
    };
    View_WuJiangZhiLi.prototype.closePanel = function (pData) {
        GGlobal.control.remove(Enum_MsgType.WUJIANG_SHENGJIANGZHILI, this.updateView, this);
        this.VOdata = null;
        GGlobal.control.notify(Enum_MsgType.WUJIANG_SHENGJIANGZHILIUPDATE);
    };
    View_WuJiangZhiLi.prototype.updateView = function (arg) {
        var isnoUpgrad = (!arg.level) || arg.level == 0;
        var heroId = this.heroType * 100 + (isnoUpgrad ? 1 : arg.level);
        var curData = this.VOdata[heroId];
        this.godPower = Model_WuJiang.wujiangGodPower[this.heroType] || 0;
        this.currentMaxLevel = 2;
        this.currentLevel.text = (arg.level ? arg.level : 0) + "阶神将之力";
        var max = Config.hero_211[this.heroType].star;
        this.maxDesc.visible = (curData.star == max);
        this.adorn.visible = (curData.star == max);
        this.upBtn.visible = !(curData.star == max);
        if (curData.star == max) {
            GGlobal.reddot.setCondition(UIConst.WUJIANGZHILI, this.heroType, false);
        }
        this.upBtn.noticeImg.visible = GGlobal.reddot.checkCondition(UIConst.WUJIANGZHILI, this.heroType);
        this.upBtn.text = (arg.level == 0 || arg.level == undefined) ? "激 活" : "升 阶";
        this.isShow(this.upGroup, true);
        this.isShow(this.downGroup, arg.level > 0);
        if (isnoUpgrad) {
            this.currentPower.text = "战力: [color=#58ff31]0[/color]";
        }
        else {
            this.currentPower.text = "战力: [color=#58ff31]" + (curData.power) + "[/color]";
        }
        var nextData;
        this.setDesc(JSON.parse(curData.attr));
        if (curData.star >= max) {
            this.isShow(this.downGroup, false);
            this.upBtn.visible = false;
            this.maxDesc.visible = true;
        }
        else if (arg.level > 0) {
            this.isShow(this.downGroup, true);
            this.upBtn.visible = true;
            this.maxDesc.visible = false;
            nextData = this.getNextData(heroId);
            var temp_1 = JSON.parse(nextData.attr);
            this.currentMaxLevel = nextData.star;
            this.setNextLevel(this.heroName, nextData.star, temp_1[0][1], temp_1[1][1], temp_1[2][1], temp_1[3][1], this.starLevel);
        }
        var temp = JSON.parse(curData.attr);
        if ((arg.level == 0 || !arg.level)) {
            this.setZeroState(this.heroName, curData.star, temp[0][1], temp[1][1], temp[2][1], temp[3][1], this.starLevel);
            if (this.starLevel >= curData.star) {
                this.setCurrentLevel(this.heroName, curData.star, temp[0][1], temp[1][1], temp[2][1], temp[3][1], this.starLevel);
            }
        }
        else {
            this.setCurrentLevel(this.heroName, curData.star, temp[0][1], temp[1][1], temp[2][1], temp[3][1], this.starLevel);
        }
    };
    View_WuJiangZhiLi.prototype.getNextData = function (heroId) {
        var isGet = false;
        for (var key in this.VOdata) {
            if (isGet) {
                return this.VOdata[key];
            }
            if (heroId == this.VOdata[key].id) {
                isGet = true;
            }
        }
    };
    View_WuJiangZhiLi.prototype.setDesc = function (temp) {
        var data = Config.jssx_002;
        this.oneDesc = data[temp[0][0]].name;
        this.twoDesc = data[temp[1][0]].name;
        this.threeDesc = data[temp[2][0]].name;
        this.fourDesc = data[temp[3][0]].name;
    };
    View_WuJiangZhiLi.URL = "ui://zyx92gzwjxbq3m";
    return View_WuJiangZhiLi;
}(fairygui.GComponent));
__reflect(View_WuJiangZhiLi.prototype, "View_WuJiangZhiLi", ["IPanel"]);
