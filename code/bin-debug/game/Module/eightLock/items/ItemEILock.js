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
var ItemEILock = (function (_super) {
    __extends(ItemEILock, _super);
    function ItemEILock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemEILock.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.list.itemRenderer = this.onListRender;
        this.list.callbackThisObj = this;
        this.txtInfo3.addEventListener(egret.TextEvent.LINK, this.onHand, this);
        this.btnQW.addClickListener(this.onHand, this);
        this.btnTask.addClickListener(this.onHand, this);
    };
    ItemEILock.prototype.onListRender = function (index, render) {
        if (this.rewards) {
            render.vo = this.rewards[index];
            render.isShowEff = true;
            render.tipEnabled = true;
        }
    };
    ItemEILock.prototype.onHand = function () {
        GGlobal.layerMgr.open(UIConst.VIEWTASKINFO, this._data.id);
    };
    ItemEILock.prototype.setData = function (value) {
        this._data = value;
        this.txtInfo.text = value.door;
        this.rewards = ConfigHelp.makeItemListArr(JSON.parse(value.reward));
        this.list.numItems = this.rewards.length;
        var state = GGlobal.modelEightLock.getState(value.id);
        switch (state) {
            case 0://已完成
                this.txtInfo3.text = HtmlUtil.createLink("<font color='#00ff00' size='20'>查看任务</font>");
                this.txtInfo4.text = "";
                this.btnQW.visible = false;
                this.btnTask.visible = false;
                this.iconGot.visible = true;
                break;
            case 1://可以领取 红点
                this.txtInfo3.text = this.txtInfo4.text = "";
                this.iconGot.visible = false;
                this.btnTask.visible = false;
                this.btnQW.visible = true;
                this.btnQW.checkNotice = true;
                break;
            case 2://任务进度
                var progress = GGlobal.modelEightLock.getTotalTaskProg(value.id);
                if (progress.cur >= progress.max) {
                    this.txtInfo3.text = "<font color='#ffffff' size='18'>任务进度: </font>" + ("<font color='#00ff00' size='18'>" + progress.cur + "/" + progress.max) + "</font>";
                }
                else {
                    this.txtInfo3.text = "<font color='#ffffff' size='18'>任务进度: </font>" + ("<font color='#ff0000' size='18'>" + progress.cur + "/" + progress.max) + "</font>";
                }
                this.txtInfo4.text = "";
                this.btnQW.visible = false;
                this.btnTask.visible = true;
                this.btnTask.text = value.door + "\u4EFB\u52A1";
                this.iconGot.visible = false;
                break;
            case 3://还没开启
                this.txtInfo3.text = "";
                this.txtInfo4.text = "\u9700\u5F00\u542F" + Config.bmjs_262[value.id - 1].door;
                this.btnQW.visible = false;
                this.btnTask.visible = false;
                this.iconGot.visible = false;
                break;
        }
    };
    ItemEILock.prototype.getData = function () {
        return this._data;
    };
    ItemEILock.prototype.clean = function () {
        this.list.numItems = 0;
    };
    ItemEILock.URL = "ui://hincjqblvib66";
    return ItemEILock;
}(fairygui.GComponent));
__reflect(ItemEILock.prototype, "ItemEILock");
