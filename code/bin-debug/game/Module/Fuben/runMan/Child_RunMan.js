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
var Child_RunMan = (function (_super) {
    __extends(Child_RunMan, _super);
    function Child_RunMan() {
        return _super.call(this) || this;
    }
    Child_RunMan.createInstance = function () {
        return (fairygui.UIPackage.createObject("FuBen", "Child_RunMan"));
    };
    Child_RunMan.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_RunMan.prototype.openPanel = function (pData) {
        this.addListen();
        this.update();
    };
    Child_RunMan.prototype.closePanel = function (pData) {
        this.removeListen();
    };
    Child_RunMan.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.vLayerArr = [];
        for (var i = 0; i < 4; i++) {
            self.vLayerArr.push((self.getChild("vLayer" + i)));
        }
        self.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, self.onAdd, self);
        self.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onRemove, self);
    };
    Child_RunMan.prototype.onAdd = function () {
        IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "bg4.jpg");
    };
    Child_RunMan.prototype.onRemove = function () {
        this.gridBigReward.onRemove();
        IconUtil.setImg(this.backImg, null);
    };
    Child_RunMan.prototype.addListen = function () {
        this.btnSoul.addClickListener(this.onSoul, this);
        this.btnChallenge.addClickListener(this.onChallenge, this);
        this.btnOneKey.addClickListener(this.onOneKey, this);
        GGlobal.control.listen(Enum_MsgType.RUNMAN_OPENUI, this.openUI, this);
        GGlobal.modelRunMan.CG_OPENUI();
    };
    Child_RunMan.prototype.removeListen = function () {
        this.btnSoul.removeClickListener(this.onSoul, this);
        this.btnChallenge.removeClickListener(this.onChallenge, this);
        this.btnOneKey.removeClickListener(this.onOneKey, this);
        for (var i = 0; i < 4; i++) {
            this.vLayerArr[i].removeListen();
        }
        GGlobal.control.remove(Enum_MsgType.RUNMAN_OPENUI, this.openUI, this);
    };
    Child_RunMan.prototype.update = function () {
        // var type = 1
        // var info = Model_RunMan.layerInfo[type - 1];
        // if (info) {
        // 	this._curLayer = info.layerId % 1000 + 1;
        // 	this._maxLayer = info.layerMaxId % 1000;
        // } else {
        // 	this._curLayer = 1;
        // 	this._maxLayer = 0
        // }
        this._curLayer = 1;
        this._maxLayer = 0;
        this._infoCur = null;
        this._infoMax = null;
        for (var i = 0; i < 4; i++) {
            var info = Model_RunMan.layerInfo[i];
            if (!info) {
                continue;
            }
            if (info.layerId > 0) {
                this._infoCur = info;
                if (Config.ggzj_008[info.layerId].next == 0) {
                    this._curLayer = Config.ggzj_008[info.layerId].guan;
                }
                else {
                    this._curLayer = Config.ggzj_008[info.layerId].guan + 1;
                }
            }
            if (info.layerMaxId > 0) {
                this._infoMax = info;
                this._maxLayer = Config.ggzj_008[info.layerMaxId].guan;
            }
        }
        this.labMaxLayer.text = "最高通关：" + this._maxLayer + "关";
        //将魂奖励
        var soulInfo = Model_RunMan.getSoulReward(this._infoMax ? this._infoMax.type : 1, this._maxLayer);
        if (soulInfo) {
            var vo = Vo_JiangHun.create(soulInfo.ID);
            this.gridBigReward.vo = vo;
            this.gridBigReward.visible = true;
            this.labBigReward.text = "第" + soulInfo.actLayer + "关";
            this.imgBig.visible = true;
        }
        else {
            this.gridBigReward.visible = false;
            this.labBigReward.text = "";
            this.imgBig.visible = false;
        }
        //层
        var layer = Math.floor((this._curLayer - 1) / 4) * 4 + 1;
        for (var i = 0; i < 4; i++) {
            this.vLayerArr[i].setVo(i + layer, this._infoCur, this._infoMax);
        }
        this.btnOneKey.checkNotice = Model_RunMan.checkTabNotice();
    };
    Child_RunMan.prototype.onSoul = function () {
        GGlobal.layerMgr.open(UIConst.JIANGHUN);
    };
    Child_RunMan.prototype.onChallenge = function () {
        if (this._infoCur) {
            var id = this._infoCur.layerId;
            var ggzj = Config.ggzj_008[id];
            if (ggzj.next == 0) {
                ViewCommonWarn.text("已达最大关卡");
                return;
            }
        }
        GGlobal.modelRunMan.CG_BattleType(1);
    };
    Child_RunMan.prototype.onOneKey = function () {
        if (this._infoCur && this._infoCur.layerId >= this._infoMax.layerMaxId) {
            ViewCommonWarn.text("没有可扫荡的关卡");
            return;
        }
        GGlobal.modelRunMan.CG_OneKey(1);
    };
    Child_RunMan.prototype.openUI = function () {
        this.update();
    };
    //>>>>end
    Child_RunMan.URL = "ui://pkuzcu87x3g6l";
    return Child_RunMan;
}(fairygui.GComponent));
__reflect(Child_RunMan.prototype, "Child_RunMan", ["IPanel"]);
