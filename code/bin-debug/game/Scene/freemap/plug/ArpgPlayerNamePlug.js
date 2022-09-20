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
var ArpgPlayerNamePlug = (function (_super) {
    __extends(ArpgPlayerNamePlug, _super);
    function ArpgPlayerNamePlug() {
        var _this = _super.call(this) || this;
        _this.autoRemove = 1;
        return _this;
    }
    ArpgPlayerNamePlug.create = function () {
        return ArpgPlayerNamePlug.POOL.length ? ArpgPlayerNamePlug.POOL.pop() : ArpgPlayerNamePlug.createInstance();
    };
    ArpgPlayerNamePlug.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ArpgPlayerNamePlug"));
    };
    ArpgPlayerNamePlug.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.touchable = false;
    };
    ArpgPlayerNamePlug.prototype.update = function () {
        var a = this;
        a.updateHp();
        if (a.role.nameBarVild)
            a.updateShow();
    };
    ArpgPlayerNamePlug.prototype.onAdd = function () {
        var a = this;
        a.role.headGroup.addChild(a.displayObject);
        a.role.nameBarVild = 1;
        a.vo = ModelArpgMap.getPlayerData(a.role.id);
        this.nameLb.color = Model_player.isMineID(a.role.id) ? Color.GREENINT : Color.WHITEINT;
    };
    ArpgPlayerNamePlug.prototype.updateHp = function () {
        var a = this;
        a.hpbar.max = a.vo.maxHp;
        a.hpbar.value = a.vo.hp;
    };
    ArpgPlayerNamePlug.prototype.updateShow = function () {
        var a = this;
        a.role.nameBarVild = 0;
        a.nameLb.text = a.role.name;
        var vo = a.vo;
        if (!vo) {
            true && console.error("没有这个玩家：" + a.role.id);
        }
        if (vo.title > 0) {
            var cfg = Config.chenghao_702[vo.title];
            a.titleImg.visible = true;
            ImageLoader.instance.loader(Enum_Path.TITLE_URL + cfg.picture + ".png", a.titleImg, Handler.create(this, this.resetTitlePos));
            a.titleImg.setXY(61, -116);
        }
        else {
            a.titleImg.visible = false;
        }
        a.updateNameColor();
    };
    ArpgPlayerNamePlug.prototype.resetTitlePos = function () {
        var a = this;
        var xx = (172 - a.titleImg.width) >> 1;
        a.titleImg.setXY(xx, 41 - a.titleImg.height);
    };
    ArpgPlayerNamePlug.prototype.updateNameColor = function () {
        if (Model_player.isMineID(this.role.id)) {
            this.nameLb.color = Color.GREENINT;
            return;
        }
        var sceneType = ModelArpgMap.getInstance().sceneType;
        var checkEnemy = false;
        switch (sceneType) {
            case EnumMapType.WDTX:
                checkEnemy = true;
                break;
            case EnumMapType.BOSSZC_LOCAL:
            case EnumMapType.BOSSZC_CROSS:
                checkEnemy = GGlobal.modelBossZc.sceneState == 2;
                break;
            case EnumMapType.LIANGCAO:
                checkEnemy = !GameUnitManager.isMyCamp(this.role.camp);
                break;
        }
        if (checkEnemy) {
            this.nameLb.color = Color.REDINT;
        }
        else {
            this.nameLb.color = Color.WHITEINT;
        }
    };
    ArpgPlayerNamePlug.prototype.onRemove = function () {
        var a = this;
        a.role.nameBarVild = 1;
        this.nameLb.color = Color.WHITEINT;
        a.vo = null;
        a.role.headGroup.removeChild(a.displayObject);
        ArpgPlayerNamePlug.POOL.push(this);
    };
    ArpgPlayerNamePlug.prototype.onEvent = function (evt, arg) {
        var self = this;
        if (evt == EVT_SC.EVT_HURT) {
            self.hpbar.value = 1;
            self.hpbar.value = 1;
        }
    };
    ArpgPlayerNamePlug.POOL = [];
    ArpgPlayerNamePlug.URL = "ui://jvxpx9emdzc53f1";
    return ArpgPlayerNamePlug;
}(fairygui.GComponent));
__reflect(ArpgPlayerNamePlug.prototype, "ArpgPlayerNamePlug");
