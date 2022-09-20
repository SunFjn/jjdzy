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
var ViewGQDetail = (function (_super) {
    __extends(ViewGQDetail, _super);
    function ViewGQDetail() {
        var _this = _super.call(this) || this;
        ViewGQDetail.inst = _this;
        fairygui.UIObjectFactory.setPackageItemExtension(ItemGQDetail.URL, ItemGQDetail);
        fairygui.UIObjectFactory.setPackageItemExtension(RoadItem.URL, RoadItem);
        _this.loadRes("guanqiaMap", "guanqiaMap_atlas0");
        return _this;
    }
    ViewGQDetail.prototype.childrenCreated = function () {
        GGlobal.createPack("guanqiaMap");
        this.view = fairygui.UIPackage.createObject("guanqiaMap", "ViewGQDetail").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.btnClose.addClickListener(this.closeEventHandler, this);
        this.roadList.setVirtual();
        this.roadList.callbackThisObj = this;
        this.roadList.itemRenderer = this.itemRenderer;
        this.roadList.scrollItemToViewOnClick = false;
        this.roadList.selectionMode = fairygui.ListSelectionMode.Single;
        _super.prototype.childrenCreated.call(this);
    };
    ViewGQDetail.prototype.itemRenderer = function (index, item) {
        var temp = this.roadVo[index];
        for (var i = 0; i < this.roadVo[index].length; i++) {
            if (temp[i]) {
                this.roadVo[index][i].index = index;
            }
        }
        item.setData(this.roadVo[index]);
    };
    ViewGQDetail.prototype.onUpdate = function () {
        var lib = Config.dgq_205;
        var index = 0;
        this.roadVo = [];
        var tempVO = [];
        for (var key in lib) {
            index++;
            var vo = new RoadItemVO();
            vo.init(lib[key]);
            tempVO.push(vo);
        }
        var index2 = 0;
        while (index > 0) {
            index -= 3;
            if (tempVO[index2] && tempVO[index2 + 1] && tempVO[index2 + 2]) {
                this.roadVo.push([tempVO[index2], tempVO[index2 + 1], tempVO[index2 + 2]]);
            }
            else if (tempVO[index2] && tempVO[index2 + 1]) {
                this.roadVo.push([tempVO[index2], tempVO[index2 + 1]]);
            }
            else if (tempVO[index2]) {
                this.roadVo.push([tempVO[index2]]);
            }
            index2 += 3;
        }
        this.roadList.numItems = this.roadVo.length;
        //向下取整
        var current = Math.floor(ModelGuanQia.curGQID / 3); //计算当前的 item 序号 
        if (ModelGuanQia.hasPassed()) {
            this.roadList.addSelection(current, true); //跳转到头像的的优先
        }
        else {
            for (var i = 0; i < this.roadVo.length; i++) {
                var temp = this.roadVo[i];
                for (var j = 0; j < temp.length; j++) {
                    if (GGlobal.modelGuanQia.curGQNotice(temp[j])) {
                        this.roadList.addSelection(i, true); //红点     
                        return;
                    }
                    if (temp[j].ID == ModelGuanQia.curGQID) {
                        break;
                    }
                }
            }
            if (current * 3 == ModelGuanQia.curGQID && !ModelGuanQia.hasPassed()) {
                this.roadList.addSelection(current - 1, true);
            }
            else {
                this.roadList.addSelection(current, true);
            }
        }
    };
    ViewGQDetail.prototype.moveTo = function (id) {
        var index = 0; //当前所在的 item 的序号
        var vo;
        //找到对应关卡所在的 vo 
        for (var i = 0; i < this.roadVo.length; i++) {
            var temp = this.roadVo[i];
            for (var j = 0; j < 3; j++) {
                if (temp[j]) {
                    if (temp[j].ID == id) {
                        index = i;
                        vo = this.roadVo[i];
                        break;
                    }
                }
            }
        }
        for (var i = 0; i < vo.length; i++) {
            if (vo[i].ID == id) {
                //找到要移动的 位置
                GGlobal.modelGuanQia.notify(ModelGuanQia.msg_moveTween, { index: index, pos: i });
                break;
            }
        }
    };
    ViewGQDetail.prototype.updateSingle = function (id) {
        this.roadList.numItems = this.roadVo.length;
    };
    ViewGQDetail.prototype.onShown = function () {
        GGlobal.modelGuanQia.listen(ModelGuanQia.msg_gqGetRed, this.updateSingle, this);
        GGlobal.modelGuanQia.listen(ModelGuanQia.msg_addEffect, this.addEffect, this);
        this.onUpdate();
    };
    ViewGQDetail.prototype.onHide = function () {
        GGlobal.layerMgr.close(this.panelId);
        GGlobal.modelGuanQia.remove(ModelGuanQia.msg_gqGetRed, this.updateSingle, this);
        GGlobal.modelGuanQia.remove(ModelGuanQia.msg_addEffect, this.addEffect, this);
        this.roadList.numItems = 0;
        if (this.eff) {
            EffectMgr.instance.removeEff(this.eff);
            this.displayListContainer.removeChild(this.eff);
            this.eff = null;
        }
    };
    ViewGQDetail.trytoOpen = function () {
        if (ModuleManager.isOpen(UIConst.GUANQIAMAP, true)) {
            GGlobal.layerMgr.open(UIConst.GUANQIAMAP);
        }
    };
    ViewGQDetail.prototype.guideClosePanel = function () {
        // let btn = this.btnClose; 
        // GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
    };
    ViewGQDetail.prototype.addEffect = function () {
        if (!this.eff) {
            this.eff = EffectMgr.addEff("eff/200007/ani", this.displayListContainer, 617, 21, 1000, -1, true, 1, Main.skill_part_type);
            this.eff.mc.scaleX = -1;
            this.displayListContainer.addChild(this.eff);
        }
    };
    return ViewGQDetail;
}(UIModalPanel));
__reflect(ViewGQDetail.prototype, "ViewGQDetail");
