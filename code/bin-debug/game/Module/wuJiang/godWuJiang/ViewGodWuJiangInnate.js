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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewGodWuJiangInnate = (function (_super) {
    __extends(ViewGodWuJiangInnate, _super);
    function ViewGodWuJiangInnate() {
        var _this = _super.call(this) || this;
        _this.update = function () {
            var self = _this;
            if (!self._wujiangVO)
                return;
            var job = self._wujiangVO.type;
            var tfskill = self._wujiangVO.skill;
            var skillCFG = Config.skill_210[tfskill];
            var data = ModelGodWuJiang.getGodDataByID(job);
            var level = data.tfLv;
            self.skill0.setVo(tfskill, 4, level, { id: self._wujiangVO.buffid });
            self.lbSkillName.text = skillCFG.n + "  Lv." + level;
            self.lbDesc.text = SkillUtil.getBuffDescription(self._wujiangVO.buffid, level);
            self._isLimit = self._isFull = false;
            self._isAcvition = Boolean(ModelGodWuJiang.getWuJiangIsActivation(job));
            self.n18.text = "激活神将后才可升级神将天赋";
            self.n18.visible = !self._isAcvition;
            var cfg = Config.godherotf_289[level];
            self.lbPower.text = "战力：" + cfg.power;
            if (cfg.next == 0) {
                self._isFull = true;
                self.boxMax.visible = true;
                self.groupAttribute.visible = false;
                self.lbCost.visible = false;
                self.n10.visible = false;
                var attrArr = JSON.parse(cfg.attr);
                self.lbFullAttribute.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
            }
            else {
                var xiulianCFG = Config.godheroxl_289[data.xiulianLv];
                self.lbCost.visible = true;
                self.n10.visible = true;
                self.boxMax.visible = false;
                var limitLevel = xiulianCFG.max;
                self._isLimit = limitLevel <= level;
                if (self._isAcvition) {
                    if (self._isLimit) {
                        self.n18.visible = true;
                        var limitLevel_1 = Config.godherotf_289[level + 1].xl;
                        self.n18.text = BroadCastManager.reTxt("神将修炼达到{0}可继续升级天赋技能", ModelGodWuJiang.getXiuLianStr(limitLevel_1));
                    }
                }
                self.groupAttribute.visible = true;
                self.lbFullAttribute.text = "";
                var attrArr = JSON.parse(cfg.attr);
                self.lbNowAttribute.text = ConfigHelp.attrString(attrArr, "+", null, "#ffffff");
                var nextCFG = Config.godherotf_289[cfg.next];
                attrArr = JSON.parse(nextCFG.attr);
                self.lbNextAttribute.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
            }
        };
        _this._isFull = false;
        _this._isLimit = false;
        _this._enough = false;
        _this._isAcvition = false;
        _this.bagUpdate = function () {
            var self = _this;
            var job = self._wujiangVO.type;
            var data = ModelGodWuJiang.getGodDataByID(job);
            var level = data.tfLv;
            var cfg = Config.godherotf_289[level];
            var item = JSON.parse(cfg.conmuse);
            if (item == '0') {
                return;
            }
            var id = item[0][1];
            var needCount = item[0][2];
            var itemName = ConfigHelp.getItemColorName(id);
            var hasCount = Model_Bag.getItemCount(id);
            var color = hasCount >= needCount ? Color.GREENSTR : Color.REDSTR;
            self._enough = hasCount >= needCount;
            self.n10.checkNotice = Boolean(self._enough && self._isAcvition && !_this._isLimit);
            self.lbCost.text = BroadCastManager.reTxt("消耗材料：{0}x{1}(<font color='{2}'>{3}/{4}</font>)", itemName, needCount, color, hasCount, item[0][2]);
        };
        _this.leveluphd = function () {
            if (!_this._isAcvition) {
                ViewCommonWarn.text("激活神将后才可升级神将天赋");
            }
            else if (_this._isFull) {
                ViewCommonWarn.text("已满级");
            }
            else if (_this._isLimit) {
                ViewCommonWarn.text("请先提升修炼等级");
            }
            else if (_this._enough) {
                GGlobal.modelGodWuJiang.CG_WuJiang_upShenJiangTf_683(_this._wujiangVO.type);
            }
            else {
                ViewCommonWarn.text("材料不足");
            }
        };
        _this.loadRes();
        return _this;
    }
    ViewGodWuJiangInnate.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("wuJiang", "ViewGodWuJiangInnate").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(this.view, this);
        _super.prototype.childrenCreated.call(this);
    };
    ViewGodWuJiangInnate.prototype.onShown = function () {
        var self = this;
        self._wujiangVO = self._args;
        self.update();
        self.bagUpdate();
        self.n10.addClickListener(self.leveluphd, self);
        GGlobal.control.listen(UIConst.WU_JIANG, self.update, self);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, self.bagUpdate, self);
    };
    ViewGodWuJiangInnate.prototype.onHide = function () {
        var self = this;
        self.n10.addClickListener(self.leveluphd, self);
        GGlobal.control.remove(UIConst.WU_JIANG, self.update, self);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, self.bagUpdate, self);
        GGlobal.layerMgr.close(UIConst.GOD_WUJIANG_TF);
    };
    ViewGodWuJiangInnate.URL = "ui://zyx92gzwnlyo4k";
    return ViewGodWuJiangInnate;
}(UIModalPanel));
__reflect(ViewGodWuJiangInnate.prototype, "ViewGodWuJiangInnate");
