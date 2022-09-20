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
var VCrossKingPoint = (function (_super) {
    __extends(VCrossKingPoint, _super);
    function VCrossKingPoint() {
        return _super.call(this) || this;
    }
    VCrossKingPoint.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossKingPoint"));
    };
    VCrossKingPoint.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbPoint = (this.getChild("lbPoint"));
        this.list = (this.getChild("list"));
        this.btnGet = (this.getChild("btnGet"));
        this.imgHas = (this.getChild("imgHas"));
        this.list.itemRenderer = this.renderListItem;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.btnGet.addClickListener(this.onGet, this);
    };
    Object.defineProperty(VCrossKingPoint.prototype, "vo", {
        set: function (v) {
            this._vo = v;
            if (v.rewardArr == null) {
                v["rewardArr"] = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.reward));
            }
            this.list.numItems = v["rewardArr"].length;
            this.lbPoint.text = "" + v.bp;
            //0没有领取 1可领取2已领取
            var status = Model_CrossKing.pointRwd[v.id];
            this._status = status;
            if (status == 0) {
                this.btnGet.visible = this.btnGet.touchable = true;
                this.btnGet.checkNotice = false;
                this.imgHas.visible = false;
            }
            else if (status == 1) {
                this.btnGet.visible = this.btnGet.touchable = true;
                this.btnGet.checkNotice = true;
                this.imgHas.visible = false;
            }
            else {
                this.btnGet.visible = this.btnGet.touchable = false;
                this.imgHas.visible = true;
            }
            this.btnGet.enabled = status == 1;
        },
        enumerable: true,
        configurable: true
    });
    VCrossKingPoint.prototype.renderListItem = function (index, obj) {
        var item = obj;
        item.isShowEff = true;
        item.vo = this._vo["rewardArr"][index];
    };
    VCrossKingPoint.prototype.onGet = function () {
        if (this._status == 0) {
            ViewCommonWarn.text("积分不足");
            return;
        }
        GGlobal.modelCrossKing.CG_GET_JF_REWARD(this._vo.id);
    };
    VCrossKingPoint.prototype.clean = function () {
        this.list.numItems = 0;
    };
    VCrossKingPoint.URL = "ui://me1skowlhfct3z";
    return VCrossKingPoint;
}(fairygui.GComponent));
__reflect(VCrossKingPoint.prototype, "VCrossKingPoint");
