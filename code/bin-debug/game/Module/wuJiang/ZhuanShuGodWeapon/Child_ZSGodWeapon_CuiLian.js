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
var Child_ZSGodWeapon_CuiLian = (function (_super) {
    __extends(Child_ZSGodWeapon_CuiLian, _super);
    function Child_ZSGodWeapon_CuiLian() {
        var _this = _super.call(this) || this;
        _this.unitDrawAngle = 0.36;
        _this.radius = 175;
        _this.startAngle = Math.PI;
        return _this;
    }
    Child_ZSGodWeapon_CuiLian.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "Child_ZSGodWeapon_CuiLian"));
    };
    Child_ZSGodWeapon_CuiLian.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
        self.shape.clearGraphics();
        self.expBar.displayObject.mask = self.shape.displayObject;
    };
    Child_ZSGodWeapon_CuiLian.prototype.updateExp = function () {
        var self = this;
        var circle = Math.PI * 2;
        var value = 0;
        if (self.curVo.cuiLianCfg.exp == 0) {
            value = 360;
            self.expLb.text = "";
        }
        else {
            value = self.curVo.clExp * (360 / self.curVo.cuiLianCfg.exp);
            self.expLb.text = self.curVo.clExp + "/" + self.curVo.cuiLianCfg.exp;
        }
        var endAngle = self.startAngle + value / 360 * circle;
        self.drawFan(endAngle);
    };
    Child_ZSGodWeapon_CuiLian.prototype.drawFan = function (endAngle) {
        var self = this;
        self.shape.clearGraphics();
        var g = self.shape.graphics;
        var tx;
        var ty;
        g.beginFill(0xffffff);
        var times = Math.ceil((endAngle - self.startAngle) / this.unitDrawAngle);
        var tempAngle = self.startAngle;
        g.moveTo(this.radius, self.radius);
        tx = self.radius * (1 + Math.sin(self.startAngle));
        ty = self.radius * (1 - Math.cos(self.startAngle));
        g.lineTo(tx, ty);
        while (times > 0) {
            if (times != 1) {
                tx = self.radius * (1 + Math.sin(tempAngle + self.unitDrawAngle));
                ty = self.radius * (1 - Math.cos(tempAngle + self.unitDrawAngle));
            }
            else {
                tx = self.radius * (1 + Math.sin(endAngle));
                ty = self.radius * (1 - Math.cos(endAngle));
            }
            g.lineTo(tx, ty);
            tempAngle += self.unitDrawAngle;
            times--;
        }
        g.lineTo(self.radius, self.radius);
        g.endFill();
    };
    Child_ZSGodWeapon_CuiLian.prototype.itemHandler = function (event) {
        var self = this;
        var grid = event.itemObject;
        if (self.curVo && self.curVo.job == grid.vo.job)
            return;
        self.curVo = grid.vo;
        self.curItem = grid;
        self.updateShow();
    };
    Child_ZSGodWeapon_CuiLian.prototype.renderHandler = function (index, item) {
        var self = this;
        var arr = Model_ZSGodWeapon.godWeoponArr;
        item.vo = arr[index];
        if (!self.curVo && Model_ZSGodWeapon.selectJob <= 0) {
            item.selected = true;
            self.curVo = arr[index];
            self.curItem = item;
        }
        else if (self.curVo && self.curVo.job == item.vo.job) {
            if (self.curItem)
                self.curItem.selected = false;
            item.selected = true;
            self.curVo = arr[index];
            self.curItem = item;
        }
        else if (item.vo.job == Model_ZSGodWeapon.selectJob) {
            if (self.curItem)
                self.curItem.selected = false;
            item.selected = true;
            self.curVo = arr[index];
            self.curItem = item;
        }
        else {
            item.selected = false;
        }
        item.setNot(Model_ZSGodWeapon.checkOneCuiLian(arr[index]));
    };
    Child_ZSGodWeapon_CuiLian.prototype.show = function () {
        var self = this;
        if (Model_ZSGodWeapon.godWeoponArr.length <= 0)
            Model_ZSGodWeapon.initcfg();
        self.list.numItems = Model_ZSGodWeapon.godWeoponArr.length;
        if (Model_ZSGodWeapon.selectJob > 0) {
            for (var i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
                var vo = Model_ZSGodWeapon.godWeoponArr[i];
                if (vo.job == Model_ZSGodWeapon.selectJob) {
                    self.list.scrollToView(i, false);
                    break;
                }
            }
        }
        self.updateShow();
    };
    Child_ZSGodWeapon_CuiLian.prototype.updateShow = function () {
        var self = this;
        if (!self.curVo)
            return;
        var vo = self.curVo;
        Model_ZSGodWeapon.selectJob = 0;
        self.powerLb.text = vo.cuiLianCfg.power + "";
        self.levelLb.setVar("jie", "" + Math.floor(vo.cuiLianCfg.lv % 1000 / 10)).setVar("level", "" + (vo.cuiLianCfg.lv % 10)).flushVars();
        self.updateExp();
        self.attGroup.visible = self.showAtt.visible = false;
        if (vo.cuiLianCfg.exp != 0) {
            self.attGroup.visible = true;
            self.curAtt.text = ConfigHelp.attrString(JSON.parse(vo.cuiLianCfg.attr), "+");
            var nextcfg = Config.sbcl_750[vo.quality * 10000 + vo.clLv + 1];
            self.nextAtt.text = ConfigHelp.attrString(JSON.parse(nextcfg.attr), "+");
        }
        else {
            self.showAtt.visible = true;
            self.showAtt.text = ConfigHelp.attrString(JSON.parse(vo.cuiLianCfg.attr), "+", Color.getColorStr(1), Color.getColorStr(2));
        }
        if (self.godEff) {
            EffectMgr.instance.removeEff(self.godEff);
            self.godEff = null;
        }
        self.clGroup.visible = self.promptLb.visible = self.maxGroup.visible = self.clBt.visible = self.keyCLBt.visible = true;
        if (vo.starLv <= 0) {
            self.godEff = EffectMgr.addEff("uieff/" + vo.cfg.picture, self.godWeaponIcon.displayObject, self.godWeaponIcon.width / 2, self.godWeaponIcon.height / 2, 1000);
            self.maxGroup.visible = self.clGroup.visible = false;
            self.promptLb.text = "请先激活神兵" + vo.cfg.name;
            self.nameLb.text = vo.cfg.name;
            self.nameLb.color = Color.getColorInt(vo.quality);
        }
        else {
            var itemVo = VoItem.create(Model_ZSGodWeapon.cuiLianDan);
            self.costNameLb.text = itemVo.name;
            self.costNameLb.color = itemVo.qColor;
            self.costLb.setImgUrl(itemVo.icon);
            var count = Model_Bag.getItemCount(itemVo.id);
            self.costLb.setCount(count);
            self.promptLb.visible = false;
            if (vo.cuiLianCfg.exp == 0) {
                self.clGroup.visible = false;
                self.clBt.visible = self.keyCLBt.visible = false;
            }
            else {
                self.keyCLBt.checkNotice = count * Model_ZSGodWeapon.cuiLianExp >= vo.cuiLianCfg.exp - vo.clExp && vo.starLv >= vo.cuiLianCfg.tiaojian;
                self.maxGroup.visible = false;
            }
            if (vo.equipID > 0) {
                var pic = 0;
                var nameStr = "";
                var quality = 0;
                if (vo.equipID == vo.cfg.bianhao) {
                    pic = vo.cfg.picture;
                    nameStr = vo.cfg.name;
                    quality = vo.quality;
                }
                else {
                    var cfg = Config.sbpf_750[vo.equipID];
                    pic = cfg.zs;
                    nameStr = cfg.mz;
                    quality = cfg.pz;
                }
                self.godEff = EffectMgr.addEff("uieff/" + pic, self.godWeaponIcon.displayObject, self.godWeaponIcon.width / 2, self.godWeaponIcon.height / 2, 1000);
                self.nameLb.text = nameStr;
                self.nameLb.color = Color.getColorInt(quality);
            }
            else {
                self.godEff = EffectMgr.addEff("uieff/" + vo.cfg.picture, self.godWeaponIcon.displayObject, self.godWeaponIcon.width / 2, self.godWeaponIcon.height / 2, 1000);
                self.nameLb.text = vo.cfg.name;
                self.nameLb.color = Color.getColorInt(vo.quality);
            }
        }
    };
    Child_ZSGodWeapon_CuiLian.prototype.OnCuiLian = function () {
        var self = this;
        if (self.curVo.starLv >= self.curVo.cuiLianCfg.tiaojian) {
            var count = Model_Bag.getItemCount(Model_ZSGodWeapon.cuiLianDan);
            if (count > 0) {
                GGlobal.modelGodWeapon.CG_GodWeapon_upcuilianlv_7859(self.curVo.job, 0);
            }
            else {
                View_CaiLiao_GetPanel.show(VoItem.create(Model_ZSGodWeapon.cuiLianDan));
            }
        }
        else {
            ViewCommonWarn.text("需要当前神兵达到" + self.curVo.cuiLianCfg.tiaojian + "星");
        }
    };
    Child_ZSGodWeapon_CuiLian.prototype.OnKeyCuiLian = function () {
        var self = this;
        if (self.curVo.starLv >= self.curVo.cuiLianCfg.tiaojian) {
            var count = Model_Bag.getItemCount(Model_ZSGodWeapon.cuiLianDan);
            if (count > 0) {
                GGlobal.modelGodWeapon.CG_GodWeapon_upcuilianlv_7859(self.curVo.job, 1);
            }
            else {
                View_CaiLiao_GetPanel.show(VoItem.create(Model_ZSGodWeapon.cuiLianDan));
            }
        }
        else {
            ViewCommonWarn.text("需要当前神兵达到" + self.curVo.cuiLianCfg.tiaojian + "星");
        }
    };
    Child_ZSGodWeapon_CuiLian.prototype.onOpen = function () {
        var self = this;
        IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "godWeapon.jpg");
        IconUtil.setImg(self.expBar, Enum_Path.BACK_URL + "expBack.png");
        self.show();
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, self);
        GGlobal.reddot.listen(UIConst.ZS_GODWEAPON, self.show, self);
        self.clBt.addClickListener(self.OnCuiLian, self);
        self.keyCLBt.addClickListener(self.OnKeyCuiLian, self);
    };
    Child_ZSGodWeapon_CuiLian.prototype.onClose = function () {
        var self = this;
        if (self.curItem)
            self.curItem.selected = false;
        self.curItem = null;
        self.curVo = null;
        self.list.numItems = 0;
        self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, self);
        IconUtil.setImg(self.backImg, null);
        IconUtil.setImg(self.expBar, null);
        GGlobal.reddot.remove(UIConst.ZS_GODWEAPON, self.show, self);
        self.clBt.removeClickListener(self.OnCuiLian, self);
        self.keyCLBt.removeClickListener(self.OnKeyCuiLian, self);
        if (self.godEff) {
            EffectMgr.instance.removeEff(self.godEff);
            self.godEff = null;
        }
    };
    Child_ZSGodWeapon_CuiLian.prototype.getSelectJob = function () {
        var self = this;
        if (self.curVo) {
            return self.curVo.job;
        }
        return 0;
    };
    Child_ZSGodWeapon_CuiLian.URL = "ui://zyx92gzwu7vv3p";
    return Child_ZSGodWeapon_CuiLian;
}(fairygui.GComponent));
__reflect(Child_ZSGodWeapon_CuiLian.prototype, "Child_ZSGodWeapon_CuiLian");
