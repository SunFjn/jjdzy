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
var VTaskInfo = (function (_super) {
    __extends(VTaskInfo, _super);
    function VTaskInfo() {
        var _this = _super.call(this) || this;
        _this.datas = [];
        _this.grids = [];
        fairygui.UIObjectFactory.setPackageItemExtension(ItemTaskInfo.URL, ItemTaskInfo);
        _this.loadRes("eightLock", "eightLock_atlas0");
        return _this;
    }
    VTaskInfo.prototype.childrenCreated = function () {
        GGlobal.createPack("eightLock");
        var view = fairygui.UIPackage.createObject("eightLock", "VTaskInfo").asCom;
        this.contentPane = view;
        CommonManager.parseChildren(view, this);
        this.list.itemRenderer = this.onListRender;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.btnGotAll.addClickListener(this.onHand, this);
        _super.prototype.childrenCreated.call(this);
    };
    VTaskInfo.prototype.onHand = function () {
        GGlobal.modelEightLock.CG4525(this._args);
    };
    VTaskInfo.prototype.onListRender = function (index, render) {
        render.setData(this.datas[index]);
    };
    VTaskInfo.prototype.showList = function () {
        var id = this._args;
        this.datas.length = 0;
        var lib = Config.bmjsrw_262;
        for (var key in lib) {
            var cfg = lib[key];
            if (cfg.door == id) {
                this.datas.push(lib[key]);
            }
        }
        this.list.numItems = this.datas.length;
        this.list.scrollToView(0);
    };
    VTaskInfo.prototype.onUpdate = function () {
        var id = this._args;
        var cfg = Config.bmjs_262[id];
        var progress = GGlobal.modelEightLock.getTotalTaskProg(id);
        this.txtInfo.text = HtmlUtil.fontNoSize(cfg.door + "\u4EFB\u52A1: ", "#00ff00") + HtmlUtil.fontNoSize("(" + progress.cur + "/" + progress.max + ")", "#00ff00");
        this.txtJiangLi.text = cfg.door + "奖励";
        this.txtPower.text = cfg.power + "";
        IconUtil.setImg(this.glName, Enum_Path.PIC_URL + cfg.name + ".png");
        IconUtil.setImg(this.glPic, Enum_Path.PIC_URL + cfg.pic + ".png");
        if (this.grids.length) {
            ConfigHelp.cleanGridview(this.grids);
        }
        var rewards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        this.grids = ConfigHelp.addGridview(rewards, this, 48, 454, true, false, 3, 80, 0.6);
        if (GGlobal.modelEightLock.eightLockBigRewDic[cfg.id].state == 2) {
            this.iconGot.visible = true;
            this.txtCZ.text = "";
            this.btnGotAll.visible = false;
            this.txtGotAll.visible = false;
            this.btnGotAll.checkNotice = false;
        }
        else {
            if (this.bigRewSuitable(cfg)) {
                this.txtCZ.text = "";
                this.btnGotAll.visible = true;
                var nextCfg = Config.bmjs_262[cfg.id + 1];
                this.txtGotAll.visible = nextCfg != null;
                this.btnGotAll.checkNotice = true;
                this.iconGot.visible = false;
            }
            else {
                if (ModelEightLock.chongZhiValue >= cfg.cz) {
                    this.txtCZ.text = "活动期间充值" + HtmlUtil.fontNoSize("(" + ConfigHelp.numToStr(ModelEightLock.chongZhiValue) + "/" + ConfigHelp.numToStr(cfg.cz) + ")", "#00ff00") + "元宝可快速完成";
                }
                else {
                    this.txtCZ.text = "活动期间充值" + HtmlUtil.fontNoSize("(" + ConfigHelp.numToStr(ModelEightLock.chongZhiValue) + "/" + ConfigHelp.numToStr(cfg.cz) + ")", "#ff0000") + "元宝可快速完成";
                }
                this.btnGotAll.visible = false;
                this.txtGotAll.visible = false;
                this.iconGot.visible = false;
            }
        }
        this.datas.sort(this.onSort);
        this.list.numItems = this.datas.length;
        if (!this.effPart) {
            this.effPart = EffectMgr.addEff("uieff/10011", this.contentPane.displayListContainer, this.glPic.x + this.glPic.width / 2, this.glPic.y + this.glPic.height / 2 - 30, 800, -1);
            var childIdx = this.contentPane.getChildIndex(this.glPic);
            this.contentPane.displayListContainer.setChildIndex(this.effPart.mc, childIdx - 1);
            this.effPart.mc.scaleX = this.effPart.mc.scaleY = 3;
        }
    };
    VTaskInfo.prototype.onSort = function (pre, next) {
        var idx1 = GGlobal.modelEightLock.eightLockTaskDic[pre.id].state == 1 ? 0 :
            (GGlobal.modelEightLock.eightLockTaskDic[pre.id].state == 2 ? 2 : 1);
        var idx2 = GGlobal.modelEightLock.eightLockTaskDic[next.id].state == 1 ? 0 :
            (GGlobal.modelEightLock.eightLockTaskDic[next.id].state == 2 ? 2 : 1);
        return idx1 - idx2;
    };
    VTaskInfo.prototype.bigRewSuitable = function (cfg) {
        var valid = 1;
        var dic = GGlobal.modelEightLock.eightLockTaskDic;
        for (var key in dic) {
            if (cfg.id == Config.bmjsrw_262[key].door) {
                valid &= (dic[key].state == 2 ? 1 : 0);
            }
        }
        return !!valid;
    };
    VTaskInfo.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        var s = this;
        s.showList();
        s.onUpdate();
        s.frame.text = Config.bmjs_262[s._args].door;
        GGlobal.modelEightLock.listen(ModelEightLock.msg_datas, s.onUpdate, s);
    };
    VTaskInfo.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        var s = this;
        IconUtil.setImg(s.glPic, null);
        GGlobal.layerMgr.close(s.panelId);
        GGlobal.modelEightLock.remove(ModelEightLock.msg_datas, s.onUpdate, s);
        if (s.effPart) {
            s.effPart.mc.scaleX = s.effPart.mc.scaleY = 1;
            EffectMgr.instance.removeEff(s.effPart);
            s.effPart = null;
        }
        s.list.numItems = 0;
    };
    return VTaskInfo;
}(UIModalPanel));
__reflect(VTaskInfo.prototype, "VTaskInfo");
