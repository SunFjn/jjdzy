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
var VSCTip = (function (_super) {
    __extends(VSCTip, _super);
    function VSCTip() {
        return _super.call(this) || this;
    }
    VSCTip.createInstance = function () {
        if (!VSCTip.inst) {
            VSCTip.inst = (fairygui.UIPackage.createObject("common", "VSCTip"));
        }
        return VSCTip.inst;
    };
    VSCTip.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n3 = (this.getChild("n3"));
        this.container = (this.getChild("container"));
        this.n8 = (this.getChild("n8"));
        this.n9 = (this.getChild("n9"));
        this.t0 = this.getTransition("t0");
    };
    VSCTip.prototype.clickHD = function () {
        GGlobal.layerMgr.open(UIConst.SHOUCHONG);
    };
    VSCTip.prototype.showPanel = function () {
        var self = this;
        var st = GGlobal.modelRecharge.isFirstGet(); //是否已领取6元奖励
        IconUtil.setImg(self.n0, Enum_Path.BACK_URL + "shouchong/bg.png");
        IconUtil.setImg(self.n9, Enum_Path.BACK_URL + "shouchong/point.png");
        if (st) {
            IconUtil.setImg(self.n3, Enum_Path.BACK_URL + "shouchong/power98.png");
            IconUtil.setImg(self.n8, Enum_Path.BACK_URL + "shouchong/title98.png");
            self.clearAwatar();
            this.container.visible = true;
        }
        else {
            this.container.visible = false;
            IconUtil.setImg(self.n3, Enum_Path.BACK_URL + "shouchong/power6.png");
            IconUtil.setImg(self.n8, Enum_Path.BACK_URL + "shouchong/title6.png");
            var lib = Config.xsc_731[1];
            var showInfo = JSON.parse(lib.zuo)[0];
            var type = showInfo[0];
            var value = showInfo[1];
            if (!self.awatar) {
                self.awatar = UIRole.create();
                self.awatar.uiparent = self._container;
                self.awatar.setScaleXY(1.2, 1.2);
            }
            var position = { x: 115, y: 170 };
            self.awatar.setPos(position.x, position.y);
            self.awatar.setBody(value);
            self.awatar.setWeapon(value);
            self.awatar.onAdd();
            // let cfgh = Config.hero_211[value]
            // var skillsArr = ConfigHelp.SplitStr(cfgh.skills);
            // var secSkill = skillsArr[1][0];
            // if (self.secSkill != secSkill) {
            // 	self.secSkill = secSkill;
            // 	Timer.instance.remove(self.playSkill, self);
            // 	self.playSkill();
            // }
        }
        var pic = JSON.parse(Config.xsc_731[4].zuo)[0][1];
        self.container.showPic(Enum_Path.PIC_URL + pic + ".png");
        self.addClickListener(self.clickHD, self);
    };
    VSCTip.prototype.clearAwatar = function () {
        var s = this;
        if (s.awatar) {
            s.awatar.onRemove();
            s.awatar = null;
        }
        // Timer.instance.remove(s.playSkill, s);
    };
    // private playSkill() {
    // 	let self = this;
    // 	self.awatar.playSkillID(self.secSkill, false);
    // 	Timer.instance.callLater(self.playSkill, 5000, self);
    // }
    VSCTip.prototype.hidePanel = function () {
        var s = this;
        IconUtil.setImg(s.n0, null);
        IconUtil.setImg(s.n9, null);
        IconUtil.setImg(s.n3, null);
        IconUtil.setImg(s.n8, null);
        s.removeClickListener(s.clickHD, s);
        s.clearAwatar();
        // Timer.instance.remove(s.playSkill, s);
        // s.secSkill = 0;
    };
    VSCTip.URL = "ui://jvxpx9em810t3dy";
    return VSCTip;
}(fairygui.GComponent));
__reflect(VSCTip.prototype, "VSCTip");
