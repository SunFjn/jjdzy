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
var ItemGQDetail = (function (_super) {
    __extends(ItemGQDetail, _super);
    function ItemGQDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemGQDetail.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.iconMap = self.part1.getChild("iconMap");
        self.txtName = self.part1.getChild("txtName");
        self.grid = self.part2.getChild("grid");
        self.iconNot = self.part2.getChild("iconNot");
        self.part1.addClickListener(self.onJumpMap, self);
        self.part2.addClickListener(self.onHand, self);
    };
    ItemGQDetail.prototype.onJumpMap = function (evt) {
        if (this._data.ID == ModelGuanQia.curGQID) {
            ViewCommonWarn.text("当前正在<font color='#00ff00'>" + Config.dgq_205[this._data.ID].mingcheng + "</font>" + "征战!");
            return;
        }
        if (this._data.ID == ModelGuanQia.curGQID + 1) {
            if (ModelGuanQia.hasPassed()) {
                GGlobal.modelGuanQia.CG1117();
            }
            else {
                ViewCommonWarn.text("请先通关<font color='#00ff00'>" + Config.dgq_205[ModelGuanQia.curGQID].mingcheng + "</font>" + "所有关卡!");
            }
        }
        else if (this._data.ID > ModelGuanQia.curGQID + 1) {
            var preId = this._data.ID - 1;
            var cfg = Config.dgq_205[preId];
            if (cfg) {
                ViewCommonWarn.text("请先通关<font color='#00ff00'>" + cfg.mingcheng + "</font>" + "所有关卡!");
            }
        }
    };
    ItemGQDetail.prototype.setData = function (value) {
        var self = this;
        self._data = value;
        IconUtil.setImg(self.iconMap, "resource/image/guanqia/" + value.tupian + ".png");
        self.txtName.text = value.mingcheng;
        self.grid.vo = ConfigHelp.makeItemListArr(JSON.parse(value.jiangli))[0];
        self.updateNot();
    };
    // public getData() {
    //     return this._data;
    // }
    ItemGQDetail.prototype.onHand = function () {
        GGlobal.modelGuanQia.CG1115(this._data.ID);
    };
    ItemGQDetail.prototype.updateNot = function () {
        this.iconNot.visible = GGlobal.modelGuanQia.curGQNotice(this._data);
        var infoArr = JSON.parse(this._data.guanqia);
        var low = infoArr[0][0], max = infoArr[0][1];
        this.iconTG.visible = ModelGuanQia.curGQID > this._data.ID || (ModelGuanQia.curGQID == this._data.ID && GGlobal.modelGuanQia.curGuanQiaLv > max);
        this.part2.visible = !ModelGuanQia.rewardGetDic[this._data.ID];
    };
    ItemGQDetail.prototype.setGuard = function (value) {
        if (value) {
            if (!this.eff) {
                this.eff = EffectMgr.addEff("eff/200007/ani", this.displayListContainer, 66, 81, 1000, -1, true, 1, Main.skill_part_type);
            }
        }
        else {
            if (this.eff) {
                EffectMgr.instance.removeEff(this.eff);
                this.eff = null;
            }
        }
    };
    ItemGQDetail.prototype.clean = function () {
        var self = this;
        if (self.eff) {
            EffectMgr.instance.removeEff(self.eff);
            self.eff = null;
        }
        IconUtil.setImg(self.iconMap, null);
    };
    ItemGQDetail.URL = "ui://qxuksu69h0zq1z";
    return ItemGQDetail;
}(fairygui.GComponent));
__reflect(ItemGQDetail.prototype, "ItemGQDetail");
