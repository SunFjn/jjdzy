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
var VTipBWJiHuo = (function (_super) {
    __extends(VTipBWJiHuo, _super);
    function VTipBWJiHuo() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    VTipBWJiHuo.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "VTipBWJiHuoSkin").asCom;
        self.contentPane = self.view;
        var children = self.view._children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            self[child.name] = child;
        }
        self.txtEff.wordWrap = true;
        self.btnHand.addClickListener(self.closeEventHandler, self);
        _super.prototype.childrenCreated.call(this);
        this.showDetail(VTipBWJiHuo.datas.shift());
    };
    VTipBWJiHuo.prototype.closeEventHandler = function () {
        var datas = VTipBWJiHuo.datas;
        if (datas.length > 0) {
            this.showDetail(datas.shift());
        }
        else {
            _super.prototype.closeEventHandler.call(this, null);
        }
    };
    VTipBWJiHuo.prototype.showDetail = function (vo) {
        var self = this;
        self.txtSJ.text = "";
        if (self.godWeaponEff) {
            EffectMgr.instance.removeEff(self.godWeaponEff);
            self.godWeaponEff = null;
        }
        var effID = 0;
        if (vo instanceof Vo_BaoWu) {
            self.txtType.text = "宝物效果:";
            self.txtInfo.text = "点击<font color='#FFC344'>[角色-宝物]</font>可激活新宝物并使用";
            IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.imageID + ".png");
            self.txtEff.text = SkillUtil.getSkillDes(vo.skillVo, 3);
            IconUtil.setImg(self.n11, Enum_Path.JIBAN_URL + "baowu.png");
            self.nameLb.text = vo.name;
        }
        else if (vo instanceof Vo_ShenJian) {
            effID = vo.cfg.tptx;
            self.txtType.text = "";
            self.txtInfo.text = "点击<font color='#FFC344'>[角色-神剑]</font>可激活新神剑并使用";
            IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.id + ".png");
            self.txtEff.text = "";
            self.txtSJ.text = HtmlUtil.fontNoSize("神剑效果: ", "#FFC344") + HtmlUtil.fontNoSize(vo.miaoshu, "#FFFFFF");
            IconUtil.setImg(self.n11, Enum_Path.JIBAN_URL + "shenjian.png");
            self.nameLb.text = vo.name;
        }
        else if (vo instanceof VoTianShu) {
            self.txtType.text = "天书效果:";
            self.txtInfo.text = "点击<font color='#FFC344'>[角色-天书]</font>可激活新天书并使用";
            IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.pic + ".png");
            self.txtEff.text = vo.desc;
            IconUtil.setImg(self.n11, Enum_Path.JIBAN_URL + "tianshu.png");
            self.nameLb.text = vo.name;
        }
        else if (vo instanceof Vo_ZhanJia) {
            effID = vo.cfg.tptx;
            self.txtType.text = "";
            self.txtInfo.text = "点击<font color='#FFC344'>[角色-战甲]</font>可激活新战甲并使用";
            IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.cfg.pic + ".png");
            self.txtEff.text = "";
            self.n11.url = CommonManager.getUrl("Skill", "zhanjia");
            self.nameLb.text = vo.cfg.name;
        }
        else if (vo instanceof VoBingFa) {
            effID = vo.lib.tptx;
            self.txtType.text = "";
            self.txtInfo.text = "点击<font color='#FFC344'>[角色-兵法]</font>可激活新兵法并使用";
            IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.pic + ".png");
            self.txtEff.text = "";
            IconUtil.setImg(self.n11, Enum_Path.JIBAN_URL + "bingfa.png");
            self.nameLb.text = vo.name;
        }
        else if (vo instanceof Vo_YiBao) {
            effID = vo.cfg.tptx;
            self.txtType.text = "";
            self.txtInfo.text = "点击<font color='#FFC344'>[角色-异宝]</font>可激活新异宝并使用";
            IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.imageID + ".png");
            self.txtEff.text = "";
            IconUtil.setImg(self.n11, Enum_Path.JIBAN_URL + "yibao.png");
            self.nameLb.text = vo.name;
        }
        else if (vo instanceof Vo_ZSGodWeapon) {
            self.txtType.text = "";
            self.txtInfo.text = "点击<font color='#FFC344'>[武将-神兵]</font>可激活新神兵并使用";
            IconUtil.setImg(self.bwIcon, null);
            self.godWeaponEff = EffectMgr.addEff("uieff/" + vo.cfg.picture, self.bwIcon.displayObject, self.bwIcon.width / 2, self.bwIcon.height / 2 + 50, 1000);
            self.txtEff.text = "";
            IconUtil.setImg(self.n11, Enum_Path.JIBAN_URL + "shenbing.png");
            self.nameLb.text = vo.cfg.name;
        }
        if (self.bwEff) {
            EffectMgr.instance.removeEff(self.bwEff);
            self.bwEff = null;
        }
        if (effID > 0) {
            if (!self.bwEff) {
                self.bwEff = EffectMgr.addEff("uieff/" + effID, self.bwIcon.displayObject, self.bwIcon.width / 2, self.bwIcon.height / 2, 1000, -1, true);
            }
        }
    };
    VTipBWJiHuo.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(UIConst.BAOWU_GETTIPS);
        IconUtil.setImg(self.bwIcon, null);
        IconUtil.setImg(self.n11, null);
        if (self.godWeaponEff) {
            EffectMgr.instance.removeEff(self.godWeaponEff);
            self.godWeaponEff = null;
        }
        if (self.bwEff) {
            EffectMgr.instance.removeEff(self.bwEff);
            self.bwEff = null;
        }
    };
    VTipBWJiHuo.add = function (vo) {
        this.datas.push(vo);
        if (!GGlobal.layerMgr.isOpenView(UIConst.BAOWU_GETTIPS)) {
            GGlobal.layerMgr.open(UIConst.BAOWU_GETTIPS);
        }
        var view = GGlobal.layerMgr.getView(UIConst.BAOWU_GETTIPS);
        if (view.isInit && this.datas.length > 0) {
            view.showDetail(this.datas.shift());
        }
    };
    VTipBWJiHuo.datas = [];
    return VTipBWJiHuo;
}(UIModalPanel));
__reflect(VTipBWJiHuo.prototype, "VTipBWJiHuo");
