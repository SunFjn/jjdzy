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
var View_ShouHun_GaiLv = (function (_super) {
    __extends(View_ShouHun_GaiLv, _super);
    function View_ShouHun_GaiLv() {
        var _this = _super.call(this) || this;
        _this.xilianNum = 0;
        _this._neddCt = 0;
        fairygui.UIObjectFactory.setPackageItemExtension(VSHGaiLvItem.URL, VSHGaiLvItem);
        _this.childrenCreated();
        return _this;
    }
    View_ShouHun_GaiLv.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "View_ShouHun_GaiLv"));
    };
    View_ShouHun_GaiLv.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("shouhunJX", "View_ShouHun_GaiLv").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.curStarLv = (this.view.getChild("curStarLv"));
        this.hasCount = (this.view.getChild("hasCount"));
        this.curDesc = (this.view.getChild("curDesc"));
        this.upBtn = (this.view.getChild("upBtn"));
        this.maxLvDesc = (this.view.getChild("maxLvDesc"));
        this.list.itemRenderer = this.renderHander;
        this.list.callbackThisObj = this;
        _super.prototype.childrenCreated.call(this);
    };
    View_ShouHun_GaiLv.prototype.onShown = function () {
        var s = this;
        GGlobal.control.listen(UIConst.SHJXXILIAN_SHUOMING, s.bagUpdate, s);
        s.upBtn.addClickListener(s.onClickUpBtn, s);
        GGlobal.modelSHJX.listen(ModelSH.msg_yijianxilian, this.xilianResult, this); //一键洗练
        s.info = s._args;
        if (s._listData == null) {
            s._listData = [];
            for (var keys in Config.shjxxl_266) {
                var v = Config.shjxxl_266[keys];
                s._listData.push(v);
            }
        }
        s.list.numItems = s._listData.length;
        s.showInfo();
    };
    View_ShouHun_GaiLv.prototype.bagUpdate = function () {
        var self = this;
        self.setCurDesc(self.xilianNum, self.curIndex);
    };
    View_ShouHun_GaiLv.prototype.onClickUpBtn = function () {
        var self = this;
        if (self.isCanUp) {
            GGlobal.modelSHJX.CG5693(self.info.yj, self.info.id, self.curIndex);
        }
        else {
            //ViewCommonWarn.text("道具不足");
            View_QuickBuy_Panel.show(VoItem.create(410049), this._neddCt);
        }
    };
    View_ShouHun_GaiLv.prototype.showInfo = function () {
        var self = this;
        self.isCanUp = false;
        self.arr = [];
        var data = ModelSH.servDatas[self.info.yj];
        if (data) {
            for (var i = 0; i < data.datas.length; i++) {
                var tempDt = data.datas[i];
                if (tempDt.position == self.info.id) {
                    self.xilianNum = tempDt.xiLianNum;
                    var max = 0;
                    var curIndex = void 0;
                    //洗练次数少于已满级的次数的时候
                    if (self.xilianNum < Number(JSON.parse(Config.shjxxl_266[7].time)[0][0])) {
                        for (var i_1 = 0; i_1 < 7; i_1++) {
                            var cfg = Config.shjxxl_266[i_1 + 1];
                            var t = Number(JSON.parse(cfg.time)[0][0]);
                            self.arr.push(t);
                            if (self.xilianNum >= t) {
                                curIndex = i_1 + 1;
                            }
                            if (t > max) {
                                max = t;
                            }
                        }
                    }
                    else {
                        curIndex = 7;
                        max = Number(JSON.parse(Config.shjxxl_266[7].time)[0][0]);
                    }
                    var xilianNum = self.xilianNum > max ? max : self.xilianNum;
                    self.curStarLv.text = "当前星级 : " + curIndex + "星";
                    self.curIndex = curIndex;
                    self.hasCount.text = "已洗练 : " + xilianNum + "次";
                    if (curIndex == 7) {
                        self.upBtn.visible = false;
                        self.maxLvDesc.visible = true;
                        self.curDesc.visible = false;
                    }
                    else {
                        self.curDesc.visible = true;
                        self.upBtn.visible = true;
                        self.maxLvDesc.visible = false;
                        self.setCurDesc(xilianNum, curIndex);
                    }
                    break;
                }
            }
        }
    };
    //Model_Bag.getItemCount(410049), JSON.parse(Config.xtcs_004[5601].other)[0][2]
    // let a = [0, 150, 300, 500, 750, 1100, 1500]//对应0 10 50 200 500 800 1500次
    /**参数1：已洗练的次数，参数2：当前星级 */
    View_ShouHun_GaiLv.prototype.setCurDesc = function (hasCount, star) {
        var self = this;
        var a = self.arr; //[0, 150, 300, 500, 750, 1100, 1500]//对应0 10 50 200 500 800 1500次
        var curHasCount = Model_Bag.getItemCount(410049); //当前有的洗练石
        var xiaohao;
        xiaohao = (a[star]) - hasCount;
        xiaohao *= Number(JSON.parse(Config.xtcs_004[5601].other)[0][2]);
        if (curHasCount >= xiaohao) {
            self.isCanUp = true;
            self.curDesc.text = "消耗[color=#00ff00](" + curHasCount + "/" + xiaohao + ")[/color]个洗练石可直接升至[color=#FFCC00]" + (star + 1) + "星[/color]";
            this._neddCt = 0;
        }
        else {
            self.isCanUp = false;
            self.curDesc.text = "消耗[color=#ff0000](" + curHasCount + "/" + xiaohao + ")[/color]个洗练石可直接升至[color=#FFCC00]" + (star + 1) + "星[/color]";
            this._neddCt = xiaohao - curHasCount;
        }
    };
    View_ShouHun_GaiLv.prototype.xilianResult = function (arg) {
        var self = this;
        self.curIndex += 1;
        self.xilianNum += arg.count;
        self.curStarLv.text = "当前星级 : " + self.curIndex + "星";
        self.hasCount.text = "已洗练 : " + self.xilianNum + "次";
        if (self.curIndex < 7) {
            self.curDesc.visible = true;
            self.upBtn.visible = true;
            self.maxLvDesc.visible = false;
            self.setCurDesc(self.xilianNum, self.curIndex);
        }
        else {
            self.curDesc.visible = false;
            self.upBtn.visible = false;
            self.maxLvDesc.visible = true;
        }
    };
    View_ShouHun_GaiLv.prototype.onHide = function () {
        var s = this;
        GGlobal.layerMgr.close(UIConst.SHJXXILIAN_SHUOMING);
        GGlobal.control.remove(UIConst.SHJXXILIAN_SHUOMING, s.bagUpdate, s);
        GGlobal.modelSHJX.remove(ModelSH.msg_yijianxilian, this.xilianResult, this); //一键洗练
        s.list.numItems = 0;
        s.upBtn.removeClickListener(s.onClickUpBtn, s);
        s.arr = [];
        s.isCanUp = false;
    };
    View_ShouHun_GaiLv.prototype.renderHander = function (index, obj) {
        var gird = obj;
        gird.vo = this._listData[index];
    };
    View_ShouHun_GaiLv.URL = "ui://4aepcdbwdm9548";
    return View_ShouHun_GaiLv;
}(UIModalPanel));
__reflect(View_ShouHun_GaiLv.prototype, "View_ShouHun_GaiLv");
