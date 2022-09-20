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
var NZBZ_Item = (function (_super) {
    __extends(NZBZ_Item, _super);
    function NZBZ_Item() {
        return _super.call(this) || this;
    }
    NZBZ_Item.createInstance = function () {
        return (fairygui.UIPackage.createObject("nzbz", "NZBZ_Item"));
    };
    NZBZ_Item.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.headItem = (this.getChild("headItem"));
        this.guanxianLb = (this.getChild("guanxianLb"));
        this.gongxunLb = (this.getChild("gongxunLb"));
        this.prestigeLb = (this.getChild("prestigeLb"));
        this.jifenImg = (this.getChild("jifenImg"));
        this.powerLb = (this.getChild("powerLb"));
        this.battleBt = (this.getChild("battleBt"));
        this.saoDangBt = (this.getChild("saoDangBt"));
        this.battleBt.addClickListener(this.battleHandler, this);
        this.saoDangBt.addClickListener(this.battleHandler, this);
    };
    NZBZ_Item.prototype.battleHandler = function () {
        if (Model_NZBZ.battleNum > 0) {
            var vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
            if (vipcfg && vipcfg.SAODANGPK == 1 && Model_player.voMine.str >= this.vo.power) {
                GGlobal.modelnzbz.CG_NZBZ_SAODANG(this.vo.id);
            }
            else {
                GGlobal.modelnzbz.CG_NZBZ_BATTLE(this.vo.id);
            }
        }
        else {
            Model_NZBZ.addHandler();
            // ViewCommonWarn.text("剩余挑战次数不足");
        }
    };
    Object.defineProperty(NZBZ_Item.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            this._vo = vo;
            if (vo) {
                this.headItem.show(vo.headId, vo.framePic, vo.country, vo.level);
                if (vo.guanzhi <= 1) {
                    this.guanxianLb.text = vo.name;
                }
                else {
                    this.guanxianLb.text = "【" + (vo.guanzhi - 1) + "阶·" + Config.guanxian_701[vo.guanzhi].name + "】" + vo.name;
                }
                var arr = JSON.parse(Config.xtcs_004[vo.constId].other);
                this.gongxunLb.text = "功勋        " + arr[0][2];
                this.prestigeLb.text = "声望        " + arr[1][2];
                var url = void 0;
                if (vo.jifenId == 1041) {
                    url = "ui://xzyn0qe3aro8p"; //30积分
                }
                else if (vo.jifenId == 1042) {
                    url = "ui://xzyn0qe3aro8r"; //20积分
                }
                else {
                    url = "ui://xzyn0qe3aro8q"; //10积分
                }
                this.jifenImg.url = url;
                this.powerLb.text = "战力：" + vo.power;
                var vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
                this.saoDangBt.visible = false;
                this.battleBt.visible = false;
                if (vipcfg && vipcfg.SAODANGPK == 1 && Model_player.voMine.str >= vo.power) {
                    this.saoDangBt.visible = true;
                }
                else {
                    this.battleBt.visible = true;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    NZBZ_Item.URL = "ui://xzyn0qe3nb1u6";
    return NZBZ_Item;
}(fairygui.GComponent));
__reflect(NZBZ_Item.prototype, "NZBZ_Item");
