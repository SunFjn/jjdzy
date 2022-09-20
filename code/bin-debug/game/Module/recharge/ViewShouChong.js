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
var ViewShouChong = (function (_super) {
    __extends(ViewShouChong, _super);
    function ViewShouChong() {
        var _this = _super.call(this) || this;
        _this.grids = [];
        _this.awards = [];
        _this._index = 0;
        _this.isFirstExc = true;
        _this.loadRes("shouchong", "shouchong_atlas0");
        return _this;
    }
    ViewShouChong.prototype.childrenCreated = function () {
        GGlobal.createPack("shouchong");
        var self = this;
        self.contentPane = self.view = fairygui.UIPackage.createObject("shouchong", "ViewShouChong").asCom;
        CommonManager.parseChildren(self.view, self);
        self.btnClose.displayObject.touchEnabled = true;
        self.btnClose.addClickListener(self.closeEventHandler, self);
        self.item1.addClickListener(self.onHand, self);
        // self.item1.getChild("txtDes").asTextField.text = "充值6元\n橙色神剑";
        self.item2.addClickListener(self.onHand, self);
        self.item1.getChild("iconTJ").visible = false;
        // self.item2.getChild("txtDes").asTextField.text = "充值98元\n红色宝物";
        self.btnGet.addClickListener(self.onGet, self);
        self.n64.callbackThisObj = self;
        self.n64.itemRenderer = self.listRender;
        _super.prototype.childrenCreated.call(this);
        self.dealWithJob();
    };
    ViewShouChong.prototype.listRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.showEff(true);
    };
    ViewShouChong.prototype.onGet = function () {
        var model = GGlobal.modelRecharge;
        if (model.scInfos[this._index] == 1) {
            GGlobal.modelRecharge.CG2753(this._index);
        }
        else {
            if (model.scInfos[this._index] == 2) {
                ViewCommonWarn.text("您已领取了该奖励");
            }
            else {
                var cfgid = Config.xsc_731[this._index].id;
                var cfg = Config.shop_011[cfgid]; //用统一的商品表去兼容不一样的系统和平台
                ModelChongZhi.recharge(cfg.rmb, cfg.Index, cfg.name);
                GGlobal.modelchongzhi.CG_CHONGZHI_135(cfgid, null, false);
                this.closeEventHandler(null);
            }
        }
    };
    ViewShouChong.prototype.onHand = function (evt) {
        this.setSel(evt.currentTarget == this.item1 ? this.targetCfg.index : this.commonCfg.index);
    };
    ViewShouChong.prototype.setSel = function (index) {
        this._index = index;
        if (index > 0) {
            this.onUpdate();
        }
    };
    ViewShouChong.prototype.showEff = function (value, type) {
        var self = this;
        switch (type) {
            case 1:
                if (self.eff1) {
                    EffectMgr.instance.removeEff(self.eff1);
                    self.eff1 = null;
                }
                if (value) {
                    self.eff1 = EffectMgr.addEff("uieff/" + (self._index == self.targetCfg.index ? 10020 : 10019), self.icon1["_container"], 63, 63);
                }
                break;
            case 2:
                if (self.eff2) {
                    EffectMgr.instance.removeEff(self.eff2);
                    self.eff2 = null;
                }
                if (value) {
                    self.eff2 = EffectMgr.addEff("uieff/10018", self.icon2["_container"], 60, 60);
                }
                break;
        }
    };
    ViewShouChong.prototype.onUpdate = function () {
        var self = this;
        var curIndex = self._index = self._index == 0 ? self.targetCfg.index : self._index;
        switch (curIndex) {
            case self.targetCfg.index:
                self.item1.getController("c1").setSelectedIndex(1);
                self.item2.getController("c1").setSelectedIndex(0);
                self.iconDes.url = "ui://zzz8io3rweoo29";
                self.iconUp.url = "ui://zzz8io3rweoo28";
                // self.btnPlay.visible = true;
                self.icon4kYB.visible = false;
                // IconUtil.setImg(self.IcTittle, Enum_Path.PIC_URL + "5603.png");
                self.selCfg = self.targetCfg;
                break;
            case self.commonCfg.index:
                self.item1.getController("c1").setSelectedIndex(0);
                self.item2.getController("c1").setSelectedIndex(1);
                self.iconDes.url = "ui://zzz8io3rqblv22";
                self.iconUp.url = "ui://zzz8io3rnxbw27";
                // self.btnPlay.visible = false;
                self.icon4kYB.visible = true;
                IconUtil.setImg(self.IcTittle, null);
                self.selCfg = self.commonCfg;
                break;
        }
        var txt = self.btnGet.getChild("txtGet").asTextField;
        var info = GGlobal.modelRecharge.scInfos;
        if (GGlobal.modelRecharge.scInfos[self._index] == 2) {
            self.btnGet.visible = false;
            self.iconGot.visible = true;
        }
        else if (GGlobal.modelRecharge.scInfos[self._index] == 1) {
            txt.text = "领取";
            self.iconGot.visible = false;
            self.btnGet.visible = true;
        }
        else {
            txt.text = curIndex == self.targetCfg.index ? "充值6元" : "充值98元";
            self.iconGot.visible = false;
            self.btnGet.visible = true;
        }
        self.setBtnLabel();
        self.showAwards();
        self.showDef();
        self.showPics();
    };
    ViewShouChong.prototype.dealWithJob = function () {
        var job = Model_Recharge.heroJob;
        var lib = Config.xsc_731;
        for (var key in lib) {
            var tempCfg = lib[key];
            if (tempCfg.zhiye > 0) {
                if (tempCfg.zhiye == job) {
                    this.targetCfg = tempCfg;
                }
            }
            else {
                this.commonCfg = tempCfg;
            }
        }
        this.setDefaultSelector();
    };
    ViewShouChong.prototype.setDefaultSelector = function () {
        var m = GGlobal.modelRecharge;
        var data = m.scInfos;
        if (data && this.commonCfg && this.targetCfg && data[this.targetCfg.index] == 2) {
            this.setSel(this.commonCfg.index);
        }
    };
    ViewShouChong.prototype.setBtnLabel = function () {
        var self = this;
        var name = Config.hero_211[Model_Recharge.heroJob].name;
        // self.item1.getChild("txtDes").asTextField.text = `${self.targetCfg.shuoming}\n${name}时装`;
        self.item1.getChild("txtDes").asTextField.text = self.targetCfg.shuoming + "\n" + self.targetCfg.wenzi;
        self.item2.getChild("txtDes").asTextField.text = self.commonCfg.shuoming + "\n" + self.commonCfg.wenzi;
    };
    ViewShouChong.prototype.showAwards = function () {
        var self = this;
        var cfg = self.selCfg;
        this.awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.jiangli));
        this.n64.numItems = this.awards.length;
        self.item1.getChild("iconNot").visible = GGlobal.modelRecharge.scInfos[self.targetCfg.index] == 1;
        self.item2.getChild("iconNot").visible = GGlobal.modelRecharge.scInfos[self.commonCfg.index] == 1;
        self.btnGet.getChild("noticeImg").visible = GGlobal.modelRecharge.scInfos[self._index] == 1;
    };
    ViewShouChong.prototype.showDef = function () {
        var self = this;
        self.txtGift.text = self.selCfg.miaoshu;
    };
    ViewShouChong.prototype.showPics = function () {
        var self = this;
        var selCfg = self.selCfg;
        self.disPoAwat();
        self.showPicsByType(selCfg.zuo, "left");
        self.showPicsByType(selCfg.you, "right", selCfg.id == 21);
        IconUtil.setImg(self.iconEff, Enum_Path.PIC_URL + selCfg.tupian + ".png");
    };
    ViewShouChong.prototype.showPicsByType = function (arg, left_right, forceShowEffect) {
        if (forceShowEffect === void 0) { forceShowEffect = false; }
        var showInfo = JSON.parse(arg)[0];
        var type = showInfo[0];
        var value = showInfo[1];
        var self = this;
        switch (type) {
            case 1://展示图片
                if (left_right == "left") {
                    IconUtil.setImg(self.icon1, Enum_Path.PIC_URL + value + ".png");
                    self.showEff(true, 1);
                    self.icon1.visible = true;
                }
                else {
                    IconUtil.setImg(self.icon2, Enum_Path.PIC_URL + value + ".png");
                    self.showEff(false || forceShowEffect, 2);
                    self.icon2.visible = true;
                }
                break;
            case 2://展示模型
                var position = null;
                self.icon1.visible = self.icon2.visible = false;
                if (left_right == "left") {
                    position = { x: 210, y: 562 };
                    self.showEff(false, 1);
                }
                else {
                    position = { x: 430, y: 547 };
                    self.showEff(false, 2);
                }
                if (!self.awatar) {
                    self.awatar = UIRole.create();
                    self.awatar.uiparent = self._container;
                    self.awatar.setScaleXY(1.2, 1.2);
                }
                self.awatar.setPos(position.x, position.y);
                self.awatar.setBody(value);
                self.awatar.setWeapon(value);
                self.awatar.onAdd();
                var cfgh = Config.hero_211[value];
                var skillsArr = ConfigHelp.SplitStr(cfgh.skills);
                var secSkill = skillsArr[1][0];
                if (self.secSkill != secSkill) {
                    self.secSkill = secSkill;
                    Timer.instance.remove(self.playSkill, self);
                    self.playSkill();
                }
                break;
        }
    };
    ViewShouChong.prototype.playSkill = function () {
        var self = this;
        self.awatar.playSkillID(self.secSkill, false);
        Timer.instance.callLater(self.playSkill, 5000, self);
    };
    ViewShouChong.prototype.openMovie = function () {
        GGlobal.layerMgr.open(UIConst.SHENJIAN_GETTER);
    };
    ViewShouChong.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        var self = this;
        var m = GGlobal.modelRecharge;
        IconUtil.setImg(self.iconBg, Enum_Path.BACK_URL + "SCBg.png");
        m.listen(Model_Recharge.msg_info, self.onUpdate, self);
        m.CG2751();
        m.showOrHideSC(false);
        this.setDefaultSelector();
        // this.btnPlay.addClickListener(this.openMovie, this);
    };
    ViewShouChong.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        var self = this;
        self.setSel(0);
        self.n64.numItems = 0;
        GGlobal.modelRecharge.remove(Model_Recharge.msg_info, self.onUpdate, self);
        GGlobal.layerMgr.close(UIConst.SHOUCHONG);
        self.disPoAwat();
        IconUtil.setImg(self.iconBg, null);
        IconUtil.setImg(self.iconEff, null);
        self.showEff(false, 1);
        self.showEff(false, 2);
        IconUtil.setImg(self.IcTittle, null);
        if (self.isFirstExc) {
            self.isFirstExc = false;
            GGlobal.modelRecharge.CG2757();
        }
    };
    ViewShouChong.prototype.disPoAwat = function () {
        if (this.awatar) {
            this.awatar.onRemove();
            this.awatar = null;
        }
        Timer.instance.remove(this.playSkill, this);
        this.secSkill = 0;
    };
    return ViewShouChong;
}(UIModalPanel));
__reflect(ViewShouChong.prototype, "ViewShouChong");
