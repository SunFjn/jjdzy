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
var VRunManLayer = (function (_super) {
    __extends(VRunManLayer, _super);
    function VRunManLayer() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        return _this;
    }
    VRunManLayer.createInstance = function () {
        return (fairygui.UIPackage.createObject("FuBen", "VRunManLayer"));
    };
    VRunManLayer.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.imgBg = (this.getChild("imgBg"));
        this.listDrop = (this.getChild("listDrop"));
        this.labDrop = (this.getChild("labDrop"));
        this.imgFirst = (this.getChild("imgFirst"));
        this.imgPass = (this.getChild("imgPass"));
        this.labDropFirst = (this.getChild("labDropFirst"));
        this.listDrop.itemRenderer = this.renderHandle;
        this.listDrop.callbackThisObj = this;
    };
    VRunManLayer.prototype.setVo = function (layer, cur, max) {
        //每层奖励
        var id;
        if (layer <= 100) {
            id = 1 * 1000 + layer;
        }
        else {
            if (layer % 100 == 0) {
                id = Math.floor(layer / 100) * 1000 + 100;
            }
            else {
                id = (Math.floor(layer / 100) + 1) * 1000 + layer % 100;
            }
        }
        var curLayer = cur ? Config.ggzj_008[cur.layerId].guan + 1 : 1;
        var maxLayer = max ? Config.ggzj_008[max.layerMaxId].guan : 0;
        var ggzj = Config.ggzj_008[id];
        this.imgPass.visible = curLayer > layer;
        this.imgFirst.visible = !(maxLayer >= layer);
        if (maxLayer >= layer) {
            this._dropReward = ggzj ? ConfigHelp.makeItemListArr(JSON.parse(ggzj.bd1)) : [];
            this.labDrop.text = "第" + layer + "关 通关奖励";
            this.labDropFirst.text = "";
        }
        else {
            this._dropReward = ggzj ? ConfigHelp.makeItemListArr(JSON.parse(ggzj.award)) : [];
            this.labDropFirst.text = "第" + layer + "关";
            this.labDrop.text = "";
        }
        this.listDrop.numItems = this._dropReward.length;
        if (!this.awatar) {
            this.awatar = UIRole.create();
            this.awatar.setPos(this.imgBg.x, this.imgBg.y + 10);
            this.awatar.setScaleXY(1, 1);
        }
        var v = Config.NPC_200[ggzj.boss];
        this.awatar.setBody(v.mod);
        if (v.weapon) {
            this.awatar.setWeapon(v.mod);
        }
        else {
            this.awatar.setWeapon(null);
        }
        this.addChild(this.imgPass);
        this.awatar.uiparent = this.displayListContainer;
        this.awatar.onAdd();
    };
    VRunManLayer.prototype.renderHandle = function (index, obj) {
        var item = obj;
        var v = this._dropReward[index];
        item.isShowEff = true;
        item.vo = v;
        item.tipEnabled = true;
    };
    VRunManLayer.prototype.removeListen = function () {
        if (this.awatar) {
            this.awatar.onRemove();
            this.awatar = null;
        }
        this.listDrop.numItems = 0;
    };
    VRunManLayer.URL = "ui://pkuzcu87nphm2f";
    return VRunManLayer;
}(fairygui.GComponent));
__reflect(VRunManLayer.prototype, "VRunManLayer");
