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
var TeamFuBenItem = (function (_super) {
    __extends(TeamFuBenItem, _super);
    function TeamFuBenItem() {
        return _super.call(this) || this;
    }
    TeamFuBenItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "TeamFuBenItem"));
    };
    TeamFuBenItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.grid0.isShowEff = s.grid1.isShowEff = true;
    };
    TeamFuBenItem.prototype.setVo = function (cfg) {
        var s = this;
        s.vo = cfg;
        s.nameIcon.url = CommonManager.getUrl("crossKing", "fuben" + cfg.id);
        s.nameIcon.grayed = Model_player.voMine.zsID < cfg.zs;
        var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward3));
        s.grid0.isShowEff = true;
        s.grid1.isShowEff = true;
        s.grid0.vo = rewardArr[0];
        s.grid1.vo = rewardArr[1];
        s.grid0.tipEnabled = true;
        s.grid1.tipEnabled = true;
        var lb = Config.NPC_200[cfg.boss];
        if (!s.awatar) {
            s.awatar = UIRole.create();
            s.awatar.uiparent = s.displayListContainer;
        }
        s.awatar.setBody(lb.mod);
        s.awatar.setPos(100, 170);
        if (lb.weapon) {
            s.awatar.setWeapon(lb.mod);
        }
        s.awatar.onAdd();
        IconUtil.setImg(s.taiziImg, Enum_Path.BACK_URL + "taizi.png");
        IconUtil.setImg(s.chooseImg, Enum_Path.BACK_URL + "seletedbg.png");
        var act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
        this.imgDoub.visible = (act != null);
    };
    TeamFuBenItem.prototype.clean = function () {
        var s = this;
        if (s.awatar) {
            s.awatar.onRemove();
            s.awatar = null;
        }
        IconUtil.setImg(s.taiziImg, null);
        IconUtil.setImg(s.chooseImg, null);
        s.grid0.vo = null;
        s.grid1.vo = null;
    };
    TeamFuBenItem.URL = "ui://yqpfulefiad82x";
    return TeamFuBenItem;
}(fairygui.GButton));
__reflect(TeamFuBenItem.prototype, "TeamFuBenItem");
