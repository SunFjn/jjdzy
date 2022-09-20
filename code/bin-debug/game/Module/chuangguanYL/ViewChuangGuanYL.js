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
var ViewChuangGuanYL = (function (_super) {
    __extends(ViewChuangGuanYL, _super);
    function ViewChuangGuanYL() {
        var _this = _super.call(this) || this;
        _this.setSkin("chuangguanYL", "chuangguanYL_atlas0", "ViewChuangGuanYL");
        return _this;
    }
    ViewChuangGuanYL.createInstance = function () {
        return (fairygui.UIPackage.createObject("chuangguanYL", "ViewChuangGuanYL"));
    };
    ViewChuangGuanYL.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(CGYLItem.URL, CGYLItem);
    };
    ViewChuangGuanYL.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var sf = this;
        sf.itemVec = [];
        for (var i = 0; i < 4; i++) {
            sf.itemVec.push(sf["item" + i]);
        }
        sf.n5.checkNotice = true;
    };
    ViewChuangGuanYL.prototype.initDta = function () {
        var sf = this;
        var m = GGlobal.modelChuangGuanYL;
        var dta = m.currentDta;
        if (m.currentId == 0 || !dta.length)
            return;
        var cut = 0;
        var getNum = 0;
        for (var i = 0; i < 4; i++) {
            var item = sf.itemVec[i];
            var itemDta = dta[i];
            item.setdta(itemDta);
            if (itemDta[1] != 0)
                cut++;
            if (itemDta[1] == 2)
                getNum++;
        }
        var cfg = Config.cgyl_262[m.currentId];
        if (!cfg)
            return;
        cfg.pic && sf.drawPic(cfg.pic);
        cfg.mod && sf.drawBody(cfg.mod);
        IconUtil.setImg(sf.n22, Enum_Path.PIC_URL + cfg.name + ".png");
        sf.lbProgress.visible = m.currentTargetST != 1;
        sf.n5.visible = m.currentTargetST == 1 && getNum >= 4;
        sf.imgYlq.visible = m.currentTargetST == 2;
        sf.lbProgress.visible = cut != 4;
        sf.lbProgress.text = "完成以下任务可领\n<font color='#fe0000'>(" + cut + "/4)</font>";
        sf.labPower.text = cfg.power + "";
        if (ViewChuangGuanYL.isGuide) {
            sf.guideDraw(ViewChuangGuanYL.step);
        }
    };
    ViewChuangGuanYL.prototype.drawPic = function (pic) {
        var sf = this;
        sf.imgBody.setXY(220, 230);
        sf.imgBody.setScale(1, 1);
        IconUtil.setImg(sf.imgBody, Enum_Path.PIC_URL + pic + ".png");
    };
    ViewChuangGuanYL.prototype.drawBody = function (pic) {
        var sf = this;
        sf.imgBody.setXY(202, 217);
        sf.imgBody.setScale(0.4, 0.4);
        IconUtil.setImg(sf.imgBody, Enum_Path.JUESE_URL + pic + ".png");
    };
    ViewChuangGuanYL.prototype.getCallBack1 = function () {
        GGlobal.modelChuangGuanYL.CG_OPEN_4151();
    };
    ViewChuangGuanYL.prototype.getCallBack = function () {
        GGlobal.modelChuangGuanYL.CG_OPEN_4151();
    };
    ViewChuangGuanYL.prototype.getAwardsHD = function () {
        GGlobal.modelChuangGuanYL.CG_LQMB_4155();
    };
    ViewChuangGuanYL.prototype.onShown = function () {
        var sf = this;
        GGlobal.modelChuangGuanYL.CG_OPEN_4151();
        sf.initDta();
        var cr = GGlobal.control;
        cr.listen(Enum_MsgType.CGYL_OPEN, sf.initDta, sf);
        cr.listen(Enum_MsgType.CGYL_LQ, sf.getCallBack, sf);
        cr.listen(Enum_MsgType.CGYL_LQ1, sf.getCallBack1, sf);
        sf.n5.addClickListener(sf.getAwardsHD, sf);
        if (!this.effPart) {
            this.effPart = EffectMgr.addEff("uieff/10011", this.view.displayListContainer, 320, 360, 800, -1);
            this.effPart.mc.scaleX = this.effPart.mc.scaleY = 3;
            this.effPart.mc.parent.setChildIndex(this.effPart.mc, 2);
        }
    };
    ViewChuangGuanYL.prototype.onHide = function () {
        var sf = this;
        var cr = GGlobal.control;
        cr.remove(Enum_MsgType.CGYL_OPEN, sf.initDta, sf);
        cr.remove(Enum_MsgType.CGYL_LQ, sf.getCallBack, sf);
        cr.remove(Enum_MsgType.CGYL_LQ1, sf.getCallBack1, sf);
        sf.n5.removeClickListener(sf.getAwardsHD, sf);
        GGlobal.layerMgr.close(UIConst.CHUANGGUANYOULI);
        // IconUtil.setImg(sf.imgBody, null);
        // IconUtil.setImg(sf.n22, null);
        for (var i = 0; i < 4; i++) {
            var item = sf.itemVec[i];
            item.clean();
        }
        if (this.effPart) {
            this.effPart.mc.scaleX = this.effPart.mc.scaleY = 1;
            EffectMgr.instance.removeEff(this.effPart);
            this.effPart = null;
        }
    };
    ViewChuangGuanYL.prototype.guideDraw = function (step) {
        var m = GGlobal.modelChuangGuanYL;
        var sf = this;
        var index = 0;
        for (var i = 0; i < 4; i++) {
            var item = sf.itemVec[i];
            if (item.btnGet.visible) {
                index++;
                GuideStepManager.instance.showGuide(item.btnGet, item.btnGet.width / 2, item.btnGet.height / 2);
                GuideStepManager.instance.showGuide1(step.source.index, item.btnGet, item.btnGet.width / 2, 0, -90, -106, -100);
                break;
            }
        }
        if (m.currentTargetST == 1 && index == 0) {
            GuideStepManager.instance.showGuide(sf.n5, sf.n5.width / 2, sf.n5.height / 2);
            GuideStepManager.instance.showGuide1(step.source.index, sf.n5, sf.n5.width / 2, sf.n5.height, 90, -106, 35);
            sf.n5.parent.setChildIndex(sf.n5, sf.n5.parent.numChildren - 1);
        }
    };
    ViewChuangGuanYL.prototype.guideClosePanel = function (step) {
        var btn = this.closeButton.asButton;
        GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
        GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
    };
    ViewChuangGuanYL.URL = "ui://nf66suj6lkx81";
    ViewChuangGuanYL.isGuide = false;
    return ViewChuangGuanYL;
}(UIPanelBase));
__reflect(ViewChuangGuanYL.prototype, "ViewChuangGuanYL");
