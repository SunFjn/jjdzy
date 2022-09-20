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
var View_Stone_Bag = (function (_super) {
    __extends(View_Stone_Bag, _super);
    function View_Stone_Bag() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        _this._sel = 0;
        _this.loadRes();
        return _this;
    }
    View_Stone_Bag.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("DuanZao", "View_Stone_Bag").asCom;
        a.contentPane = a.view;
        a.list = (a.view.getChild("list"));
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandle;
        a.list.setVirtual();
        a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
        a.curMsgLb = (a.view.getChild("curMsgLb"));
        a.nextMsgLb = (a.view.getChild("nextMsgLb"));
        a.curGrid = (a.view.getChild("curGrid"));
        a.nextGrid = (a.view.getChild("nextGrid"));
        a.xqBt = (a.view.getChild("xqBt"));
        a.hcBt = (a.view.getChild("hcBt"));
        a.delBt = (a.view.getChild("delBt"));
        a.keyhcBt = (a.view.getChild("keyhcBt"));
        a.curGroup = (a.view.getChild("curGroup"));
        a.nextGroup = (a.view.getChild("nextGroup"));
        a.nameLb0 = (a.view.getChild("nameLb0"));
        a.nameLb1 = (a.view.getChild("nameLb1"));
        _super.prototype.childrenCreated.call(this);
        a.xqBt.addClickListener(a.xqHandle, a);
        a.hcBt.addClickListener(a.hcHandle, a);
        a.keyhcBt.addClickListener(a.keyhcHandle, a);
        a.delBt.addClickListener(a.delHandle, a);
    };
    View_Stone_Bag.prototype.delHandle = function () {
        GGlobal.modelDuanZao.CG_DUANZAO_STONE_DEL(this.equipVo.type, this._args.stonePart + 1, this.curItem.vo.id);
    };
    View_Stone_Bag.prototype.listHandle = function (event) {
        var grid = event.itemObject;
        if (!grid.vo)
            return;
        if (grid.data == this.curItem.data)
            return;
        if (this.curItem)
            this.curItem.choose = false;
        grid.choose = true;
        this.curItem = grid;
        this.updateGrid();
    };
    View_Stone_Bag.prototype.keyhcHandle = function () {
        //一键合成宝石
        if (this.keyhcBt.checkNotice) {
            GGlobal.modelDuanZao.CG_DUANZAO_KEY_HECHENG(this.curItem.vo.id);
        }
        else {
            ViewCommonWarn.text("宝石不足无法合成");
        }
    };
    View_Stone_Bag.prototype.hcHandle = function () {
        if (this.stoneVo && this.curItem.data == 0) {
            if (this.hcBt.checkNotice) {
                var vo = this.curItem.vo;
                GGlobal.modelDuanZao.CG_DUANZAO_STONEID_HECHENG_BYEQUIP(this.curItem.vo.id, this.equipVo.type, this._args.stonePart + 1);
            }
            else {
                ViewCommonWarn.text("宝石不足无法合成");
            }
        }
        else {
            if (this.curItem.vo.count > 1) {
                GGlobal.modelDuanZao.CG_DUANZAO_STONEID_HECHENG(this.curItem.vo.id);
            }
            else {
                ViewCommonWarn.text("宝石不足无法合成");
            }
        }
    };
    View_Stone_Bag.prototype.xqHandle = function () {
        if (this.curGrid.vo.id == this._args.stoneId) {
            ViewCommonWarn.text("更换的宝石和当前镶嵌的宝石一样");
            return;
        }
        GGlobal.modelDuanZao.CG_DUANZAO_STONE_EQUIP(this.equipVo.type, this._args.stonePart + 1, this.curGrid.vo.id);
    };
    View_Stone_Bag.prototype.renderHandle = function (index, obj) {
        var grid = obj;
        grid.data = index;
        grid.tipEnabled = false;
        grid.isinsert = false;
        if (this.stoneVo) {
            if (index == 0) {
                grid.vo = this.stoneVo;
            }
            else {
                if (index - 1 < this.itemArr.length) {
                    grid.vo = this.itemArr[index - 1];
                }
                else {
                    grid.vo = null;
                }
            }
            if (index - 1 < this.itemArr.length) {
                if (index > 0) {
                    grid.showNotice = grid.vo.count > 1;
                }
                else if (this._args.stoneId > 0 && index == 0) {
                    grid.isinsert = true;
                    grid.showNotice = Model_Bag.getItemCount(this._args.stoneId) > 0;
                }
            }
        }
        else {
            if (index < this.itemArr.length) {
                grid.vo = this.itemArr[index];
                grid.showNotice = grid.vo.count > 1;
                grid.isinsert = false;
            }
            else {
                grid.vo = null;
            }
        }
        if ((!this.curItem || !this.curItem.vo || this.curItem.data >= this.list.numItems) && index == this._sel) {
            if (this.curItem)
                this.curItem.choose = false;
            grid.choose = true;
            this.curItem = grid;
        }
    };
    View_Stone_Bag.prototype.updateShow = function () {
        var len = Model_Bag.gemList.length;
        this.itemArr = [];
        for (var i = 0; i < len; i++) {
            var cfg = Config.dzgem_209[Model_Bag.gemList[i].id];
            if (cfg.position == this._args.stonePart + 1) {
                this.itemArr.push(Model_Bag.gemList[i]);
            }
        }
        this.stoneVo = null;
        this.equipVo = this._args.equipVo;
        var num;
        if (this._args.stoneId > 0) {
            this.stoneVo = VoItem.create(this._args.stoneId);
            num = this.itemArr.length + 1;
        }
        else {
            num = this.itemArr.length;
        }
        var sel = 0;
        for (var i = num - 1; i >= 0; i--) {
            if (i == 0)
                break;
            var v = void 0;
            if (this._args.stoneId > 0) {
                v = this.itemArr[i - 1];
            }
            else {
                v = this.itemArr[i];
            }
            if (v.count > 1) {
                sel = i;
                break;
            }
        }
        if (this.curItem) {
            this.curItem.choose = false;
            this.curItem = null;
        }
        this._sel = sel;
        if (num < 15) {
            this.list.numItems = num = 15;
        }
        else {
            this.list.numItems = Math.ceil(num / 5) * 5;
        }
        this.list.scrollToView(Math.floor(sel / 5) * 5);
        this.updateGrid();
    };
    View_Stone_Bag.prototype.updateGrid = function () {
        if (!this.curItem || !this.curItem.vo) {
            this.nextGroup.visible = this.curGroup.visible = false;
            this.curGrid.isinsert = false;
        }
        else {
            this.curGroup.visible = true;
            this.curGrid.vo = this.curItem.vo;
            var curVo = this.curGrid.vo;
            var curCfg = Config.dzgem_209[curVo.id];
            this.nameLb0.text = curVo.name;
            this.nameLb0.color = curVo.qColor;
            this.curMsgLb.text = "战力：" + curCfg.power + "\n" + curVo.cfg.miaoshu;
            if (curCfg.next > 0) {
                this.nextGroup.visible = true;
                var nextVo = VoItem.create(curCfg.next);
                this.nextGrid.vo = nextVo;
                var nextCfg = Config.dzgem_209[nextVo.id];
                this.nameLb1.text = nextVo.name;
                this.nameLb1.color = nextVo.qColor;
                this.nextMsgLb.text = "战力：" + nextCfg.power + "\n" + nextVo.cfg.miaoshu;
            }
            else {
                this.nextGroup.visible = false;
            }
            this.xqBt.visible = this.delBt.visible = this.keyhcBt.visible = true;
            if (this.stoneVo) {
                if (this.curItem.data > 0) {
                    this.delBt.visible = false;
                    this.curGrid.isinsert = false;
                    this.keyhcBt.checkNotice = this.hcBt.checkNotice = this.curItem.vo.count >= curCfg.consume;
                }
                else {
                    this.xqBt.visible = this.keyhcBt.visible = false;
                    this.curGrid.isinsert = true;
                    this.hcBt.checkNotice = Model_Bag.getItemCount(this.curItem.vo.id) >= curCfg.consume - 1;
                }
            }
            else {
                this.delBt.visible = false;
                this.curGrid.isinsert = false;
                this.keyhcBt.checkNotice = this.hcBt.checkNotice = this.curItem.vo.count >= curCfg.consume;
            }
        }
    };
    View_Stone_Bag.prototype.getStoneHandle = function (vo, self) {
        if (vo.type == 4 || vo.type == 5 || vo.type == 6 || vo.type == 7) {
            var pos = Config.dzgem_209[vo.id].position;
            if (pos == self._args.stonePart + 1) {
                return true;
            }
        }
        return false;
    };
    View_Stone_Bag.prototype.updateGemBag = function (value) {
        if (value === void 0) { value = null; }
        //自动选中最小的可合成的
        // if (this.curItem) {
        // 	let index:number = this.curItem.data
        // 	let nextItem:ViewGridRender = null;
        // 	for (let i = 0; i < this.list._children.length; i++) {
        // 		let item = this.list._children[i] as ViewGridRender;
        // 		if (Number(item.data) == index - 1) {
        // 			nextItem = item
        // 			break;
        // 		}
        // 	}
        // 	if(nextItem){
        // 		this.curItem.choose = false;
        // 		this.curItem = nextItem
        // 		this.curItem.choose = true;
        // 	}
        // }
        if (value)
            this._args = value;
        this.updateShow();
    };
    View_Stone_Bag.prototype.onShown = function () {
        this.updateShow();
        GGlobal.control.listen(Enum_MsgType.DUANZAO_STONEBAG_UPDATE, this.updateGemBag, this);
    };
    View_Stone_Bag.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.DUANZAO_STONE_BAG);
        this.list.numItems = 0;
        if (this.curItem)
            this.curItem.choose = false;
        this.curItem = null;
        GGlobal.control.remove(Enum_MsgType.DUANZAO_STONEBAG_UPDATE, this.updateGemBag, this);
    };
    View_Stone_Bag.prototype.resetPosition = function () {
        _super.prototype.resetPosition.call(this);
    };
    View_Stone_Bag.URL = "ui://pofv8989pzg76";
    return View_Stone_Bag;
}(UIModalPanel));
__reflect(View_Stone_Bag.prototype, "View_Stone_Bag");
