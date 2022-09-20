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
var ChuangGuanYLIcon = (function (_super) {
    __extends(ChuangGuanYLIcon, _super);
    function ChuangGuanYLIcon() {
        return _super.call(this) || this;
    }
    ChuangGuanYLIcon.createInstance = function () {
        if (!this._inst) {
            this._inst = (fairygui.UIPackage.createObject("MainUI", "ChuangGuanYLIcon"));
            ;
        }
        return this._inst;
    };
    ChuangGuanYLIcon.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.body = (this.getChild("body"));
        this.n3 = (this.getChild("n3"));
        this.n6 = (this.getChild("n6"));
        this.n2 = (this.getChild("n2"));
    };
    ChuangGuanYLIcon.prototype.openView = function () {
        GGlobal.layerMgr.open(UIConst.CHUANGGUANYOULI);
    };
    ChuangGuanYLIcon.prototype.drawPic = function (pic) {
        var sf = this;
        sf.body.setXY(0, 60);
        sf.body.setScale(0.5, 0.5);
        IconUtil.setImg(sf.body, Enum_Path.PIC_URL + pic + ".png");
    };
    ChuangGuanYLIcon.prototype.drawBody = function (pic) {
        var sf = this;
        sf.body.setXY(-10, 45);
        sf.body.setScale(0.2, 0.2);
        IconUtil.setImg(sf.body, Enum_Path.JUESE_URL + pic + ".png");
    };
    ChuangGuanYLIcon.prototype.setMod = function () {
        var s = this;
        var m = GGlobal.modelChuangGuanYL;
        var cfg = Config.cgyl_262[m.currentId];
        if (!cfg)
            return;
        cfg.pic && s.drawPic(cfg.pic);
        cfg.mod && s.drawBody(cfg.mod);
    };
    ChuangGuanYLIcon.prototype.setNotice = function () {
        this.n6.visible = GGlobal.reddot.checkCondition(UIConst.CHUANGGUANYOULI);
    };
    ChuangGuanYLIcon.prototype.show1 = function (n, n1) {
        var s = this;
        // if (n == n1) {
        // 	s.n2.text = "可领取";
        // 	s.n6.visible = true;
        // } else {
        // 	s.n2.text = "完成进度 <font color='#fe0000'>" + n + "/" + n1 + "</font>";
        // 	s.n6.visible = false;
        // }
        var m = GGlobal.modelChuangGuanYL;
        var cfg = Config.cgyl_262[m.currentId];
        var vo = ConfigHelp.makeItem(JSON.parse(cfg.reward)[0]);
        s.n2.text = vo.name;
        s.n2.color = Color.getColorInt(vo.quality);
        s.height = 200;
        s.setMod();
        s.setNotice();
        s.addClickListener(s.openView, s);
        ViewMainUIRightTipContainer.getInstance().addCompnent(s, true);
        GGlobal.control.listen(Enum_MsgType.CGYL_LQ1, s.setMod, s);
        GGlobal.reddot.listen(UIConst.CHUANGGUANYOULI, s.setNotice, s);
        if (!s.iconEff)
            s.iconEff = EffectMgr.addEff("uieff/10028", s.displayListContainer, 47, 142, 1000, -1, true);
    };
    ChuangGuanYLIcon.prototype.hide1 = function () {
        var s = this;
        ViewMainUIRightTipContainer.getInstance().removeCompnent(s);
        GGlobal.reddot.remove(UIConst.CHUANGGUANYOULI, s.setNotice, s);
        GGlobal.control.remove(Enum_MsgType.CGYL_LQ1, s.setMod, s);
        s.removeClickListener(s.openView, s);
        if (s.iconEff) {
            EffectMgr.instance.removeEff(s.iconEff);
            s.iconEff = null;
        }
        IconUtil.setImg(s.body, null);
    };
    ChuangGuanYLIcon.URL = "ui://7gxkx46wlkx80";
    return ChuangGuanYLIcon;
}(fairygui.GComponent));
__reflect(ChuangGuanYLIcon.prototype, "ChuangGuanYLIcon");
