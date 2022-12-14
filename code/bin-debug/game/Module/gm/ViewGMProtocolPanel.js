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
var ViewGMProtocolPanel = (function (_super) {
    __extends(ViewGMProtocolPanel, _super);
    function ViewGMProtocolPanel() {
        var _this = _super.call(this) || this;
        _this.contentArr = [];
        _this.titleArr = [];
        _this.setSkin("GM", "", "ViewGMProtocolPanel");
        return _this;
    }
    ViewGMProtocolPanel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(GMProtItem.URL, GMProtItem);
        fairygui.UIObjectFactory.setPackageItemExtension(GMProtInputItem.URL, GMProtInputItem);
    };
    ViewGMProtocolPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.list0.callbackThisObj = this;
        this.list0.itemRenderer = this.renderHandker0;
        this.list0.addEventListener(fairygui.ItemEvent.CLICK, this.listHandler, this);
        this.list1.callbackThisObj = this;
        this.list1.itemRenderer = this.renderHandler1;
    };
    ViewGMProtocolPanel.prototype.listHandler = function (event) {
        var tab = event.itemObject;
        this.contentArr = this.titleArr[tab.data].items;
        this.list1.numItems = this.contentArr.length;
        this.list1.scrollToView(0);
    };
    ViewGMProtocolPanel.prototype.renderHandler1 = function (index, obj) {
        var item = obj;
        item.show(this.contentArr[index]);
    };
    ViewGMProtocolPanel.prototype.renderHandker0 = function (index, obj) {
        var tab = obj;
        tab.data = index;
        tab.text = this.titleArr[index].label;
        if (index == 0) {
            tab.selected = true;
            this.contentArr = this.titleArr[index].items;
            this.list1.numItems = this.contentArr.length;
        }
    };
    ViewGMProtocolPanel.prototype.loadProtocol = function () {
        var self = this;
        var map = {};
        RES.getResByUrl(GGlobal.resHead + "resource/config/GMprotocol.proEx", function (buffer) {
            if (!buffer) {
                return;
            }
            var bytes = new egret.ByteArray(buffer);
            var len = bytes.readShort();
            self.titleArr = [];
            for (var i = 0; i < len; i++) {
                var sysID = bytes.readShort(); //???????????????????????????id
                var sysName = bytes.readUTF(); //??????????????????
                var cmd = bytes.readShort(); //?????????
                var typeCGorGC = bytes.readByte(); //????????????,1 CG???????????????,2 GC???????????????
                var title = bytes.readUTF(); //????????????  
                var decs = bytes.readUTF(); //??????????????????????????????html??????
                var readTypes = bytes.readUTF(); //????????????   ??????:U-B
                if (typeCGorGC != 1) {
                    continue;
                }
                var ctx = {};
                ctx.pointer = 0;
                var typeList = Model_GM.parseProtocolObj(readTypes, ctx);
                var item = {
                    sysID: sysID,
                    sysName: sysName,
                    typeCGorGC: typeCGorGC,
                    cmd: cmd,
                    types: typeList,
                    typeStr: readTypes,
                    decs: decs,
                    label: "" + cmd + ":" + title
                };
                if (!map[sysID]) {
                    map[sysID] = {
                        label: sysID + "." + sysName,
                        items: [],
                        sysID: sysID
                    };
                }
                map[sysID].items.push(item);
            }
            for (var k in map) {
                self.titleArr.push(map[k]);
            }
            self.titleArr.sort(function (a, b) {
                return a.sysID - b.sysID;
            });
            self.list0.numItems = self.titleArr.length;
        }, self, RES.ResourceItem.TYPE_BIN);
    };
    ViewGMProtocolPanel.prototype.onShown = function () {
        this.loadProtocol();
    };
    ViewGMProtocolPanel.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.GM_PROTOCOL);
    };
    return ViewGMProtocolPanel;
}(UIPanelBase));
__reflect(ViewGMProtocolPanel.prototype, "ViewGMProtocolPanel");
