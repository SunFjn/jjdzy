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
var RoadItem = (function (_super) {
    __extends(RoadItem, _super);
    function RoadItem() {
        var _this = _super.call(this) || this;
        /**是否需要播放动画 */
        _this.isNeedPlayAnimation = false;
        _this.posArr = [{ x: 40, y: 120 }, { x: 180, y: 285 }, { x: 430, y: 150 }, { x: -209, y: 150 }, { x: 630, y: 50 }];
        _this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onShown, _this);
        _this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onHidden, _this);
        return _this;
    }
    RoadItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("guanqiaMap", "RoadItem"));
    };
    RoadItem.prototype.onShown = function () {
        GGlobal.modelGuanQia.listen(ModelGuanQia.msg_moveTween, this.moveTween, this);
    };
    RoadItem.prototype.onHidden = function () {
        GGlobal.modelGuanQia.remove(ModelGuanQia.msg_moveTween, this.moveTween, this);
    };
    RoadItem.prototype.moveTween = function (arg) {
        this.index = arg.index; //当前的item
        this.pos = arg.pos;
        if (this.voDatas[0].index == this.index) {
            var toPos = void 0;
            if (this.pos === 0) {
                this.head.setXY(this.posArr[3].x, this.posArr[3].y);
                toPos = this.posArr[0];
            }
            else if (this.pos == 1) {
                toPos = this.posArr[1];
            }
            else if (this.pos == 2) {
                toPos = this.posArr[2];
            }
            egret.Tween.get(this.head).to({ x: toPos.x, y: toPos.y }, 1000).call(function () {
                //GGlobal.modelGuanQia.notify(ModelGuanQia.msg_addEffect); 
                GGlobal.layerMgr.close2(UIConst.GUANQIAMAP);
            }, this);
        }
    };
    RoadItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        this.itemArr = [];
        this.itemArr[0] = this.item1;
        this.itemArr[1] = this.item2;
        this.itemArr[2] = this.item3;
    };
    RoadItem.prototype.setData = function (data) {
        var self = this;
        IconUtil.setImg(self.loader, "resource/image/back/chuangGuanBg.jpg");
        self.isNeedPlayAnimation = false;
        self.voDatas = data;
        self.setVisible(3, false);
        self.setVisible(self.voDatas.length, true);
        self.setHeadPos();
        self.playAnimation();
    };
    RoadItem.prototype.playAnimation = function () {
        this.releaseAnimation(false);
        if (ModelGuanQia.hasPassed()) {
            for (var i = 0; i < this.voDatas.length; i++) {
                if (this.voDatas[i].ID == ModelGuanQia.curGQID + 1) {
                    this.itemArr[i].setGuard(true);
                }
            }
        }
    };
    /**根据数据的长度设置item显示的个数 */
    RoadItem.prototype.setVisible = function (length, isVisible) {
        for (var i = 0; i < length; i++) {
            this.itemArr[i].visible = isVisible;
        }
    };
    RoadItem.prototype.setHeadPos = function () {
        this.head.visible = false;
        for (var i = 0; i < this.voDatas.length; i++) {
            this.itemArr[i].setData(this.voDatas[i]);
            if (this.voDatas[i].ID == ModelGuanQia.curGQID) {
                this.head.visible = true;
                if ((this.voDatas[i].ID) == ModelGuanQia.curGQID - 1) {
                    this.isNeedPlayAnimation = true;
                }
                this.head.setXY(this.posArr[i].x, this.posArr[i].y);
                this.head.setdata(Model_Setting.headId);
            }
        }
    };
    RoadItem.prototype.clean = function () {
        var self = this;
        self.releaseAnimation(false);
        IconUtil.setImg(self.loader, "resource/image/back/chuangGuanBg.jpg");
        for (var i = 0; i < this.itemArr.length; i++) {
            self.itemArr[i].clean();
        }
    };
    RoadItem.prototype.releaseAnimation = function (isRelease) {
        for (var i = 0; i < this.itemArr.length; i++) {
            this.itemArr[i].setGuard(isRelease);
        }
    };
    RoadItem.URL = "ui://qxuksu69ir1y2h";
    return RoadItem;
}(fairygui.GComponent));
__reflect(RoadItem.prototype, "RoadItem");
