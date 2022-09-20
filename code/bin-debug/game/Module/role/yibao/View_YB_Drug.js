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
var View_YB_Drug = (function (_super) {
    __extends(View_YB_Drug, _super);
    function View_YB_Drug() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_YB_Drug.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "TipEatDan").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    View_YB_Drug.prototype.tunshiHandle = function (event) {
        switch (event.target.id) {
            case this.btnEat.id:
                if (this.btnEat.checkNotice) {
                    GGlobal.modelYiBao.CG_YIBAO_TUNSHI(0);
                }
                else {
                    if (Model_YiBao.drugCount >= Model_YiBao.drugMax) {
                        ViewCommonWarn.text("吞噬已满");
                    }
                    else {
                        View_CaiLiao_GetPanel.show(this.itemVo);
                    }
                }
                break;
            case this.btnOneKey.id:
                if (this.btnOneKey.checkNotice) {
                    GGlobal.modelYiBao.CG_YIBAO_TUNSHI(1);
                }
                else {
                    if (Model_YiBao.drugCount >= Model_YiBao.drugMax) {
                        ViewCommonWarn.text("吞噬已满");
                    }
                    else {
                        View_CaiLiao_GetPanel.show(this.itemVo);
                    }
                }
                break;
        }
    };
    View_YB_Drug.prototype.updateShow = function () {
        var cfg = Config.drug_200[Model_YiBao.drugIndex];
        var itemID = Model_YiBao.drugId;
        this.itemVo = VoItem.create(itemID);
        this.grid.tipEnabled = false;
        this.grid.isShowEff = true;
        this.grid.vo = this.itemVo;
        // ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + this.itemVo.quality + ".png", this.bg);
        // ImageLoader.instance.loader(Enum_Path.ICON70_URL + this.itemVo.icon + ".png", this.imgIcon);
        var num = Model_Bag.getItemCount(itemID);
        var attArr = JSON.parse(cfg.attr);
        var attstr = "";
        for (var i = 0; i < attArr.length; i++) {
            if (i == 0) {
                attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1] * Model_YiBao.drugCount);
            }
            else {
                attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1] * Model_YiBao.drugCount);
            }
        }
        this.lab.text = "宝物激活（升星）可增加吞噬上限";
        this.labAttr.text = attstr;
        this.labName.text = this.itemVo.name;
        this.labName.color = Color.getColorInt(this.itemVo.quality);
        this.labHas.text = "已吞噬：" + Model_YiBao.drugCount + "/" + Model_YiBao.drugMax;
        this.labCount.text = "拥有数量：" + num;
        if (Model_YiBao.drugCount >= Model_YiBao.drugMax) {
            this.btnOneKey.checkNotice = this.btnEat.checkNotice = false;
        }
        else {
            this.btnOneKey.checkNotice = this.btnEat.checkNotice = num > 0;
        }
    };
    View_YB_Drug.prototype.onShown = function () {
        this.btnOneKey.addClickListener(this.tunshiHandle, this);
        this.btnEat.addClickListener(this.tunshiHandle, this);
        GGlobal.reddot.listen(ReddotEvent.CHECK_YIBAO, this.updateShow, this);
        this.updateShow();
    };
    View_YB_Drug.prototype.onHide = function () {
        this.btnOneKey.removeClickListener(this.tunshiHandle, this);
        this.btnEat.removeClickListener(this.tunshiHandle, this);
        GGlobal.reddot.remove(ReddotEvent.CHECK_YIBAO, this.updateShow, this);
        GGlobal.layerMgr.close(UIConst.YIBAO_DRUG);
        this.grid.clean();
    };
    return View_YB_Drug;
}(UIModalPanel));
__reflect(View_YB_Drug.prototype, "View_YB_Drug");
