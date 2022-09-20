var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RESObj = (function () {
    function RESObj() {
        this.state = -1;
        this.proprity = 1;
        this.refCount = 0;
        this.useParts = [];
        this.disposeTimes = 0;
    }
    RESObj.create = function (type) {
        var ret = RESObj.POOL.length ? RESObj.POOL.pop() : new RESObj();
        ret.partType = type;
        return ret;
    };
    RESObj.prototype.startLoad = function () {
        this.state = 0; //-1未开始 0 开始 2 完成 
        var baseKey = this.val;
        var reg = new RegExp("\/", "g");
        baseKey = baseKey.replace(reg, "_");
        this.jsonUrl = baseKey; // baseKey + "_json"//GGlobal.resHead+"resource/model/" + this.val + ".json";
        if (this.partType == PartType.MC) {
            this.textureUrl = Enum_Path.getModelPath(this.val);
            RES.getResByUrl(this.textureUrl, this.textureComplete, this);
        }
        else {
            console.log("加载龙骨动画！");
            this.dbUrlList = Enum_Path.getModelDBPath(this.val);
            if (this.haveDB()) {
                this.initDBData();
                this.buildDB();
                return;
            }
            RES.getResByUrl(this.dbUrlList[0], this.skeComplete, this);
        }
    };
    RESObj.prototype.addDBToCache = function () {
        var obj = {};
        obj.dburl = this.dbUrlList[0];
        obj.factory = this.dbfactory;
        // obj.skeData = this.dbskedata;
        // obj.texData = this.mcdata;
        // obj.texture = this.mctexture; 
        RESObj.dbResCache[obj.dburl] = obj;
    };
    RESObj.prototype.haveDB = function () {
        return RESObj.dbResCache[this.dbUrlList[0]];
    };
    RESObj.prototype.initDBData = function () {
        var obj = RESObj.dbResCache[this.dbUrlList[0]];
        this.dbfactory = obj.factory;
        // this.dbskedata = obj.skeData;
        // this.mcdata = obj.texData
        // this.mctexture = obj.texture; 
    };
    //-------------加载db数据---------------
    //-------------加载db数据完成-----------
    //---ske json数据完成
    RESObj.prototype.skeComplete = function (res, key) {
        // this.dbskedata = GGlobal.aniCfg[key];
        this.dbskedata = res;
        if (!res) {
            if (true) {
                ViewCommonWarn.text("资源报错：" + this.val);
            }
            console.error("资源报错：" + this.val);
        }
        RES.getResByUrl(this.dbUrlList[1], this.texJsonComplete, this);
    };
    //--texJson数据完成
    RESObj.prototype.texJsonComplete = function (res, key) {
        // this.mcdata = GGlobal.aniCfg[key];
        this.mcdata = res;
        if (!res) {
            if (true) {
                ViewCommonWarn.text("资源报错：" + this.val);
            }
            console.error("资源报错：" + this.val);
        }
        RES.getResByUrl(this.dbUrlList[2], this.texComplete, this);
    };
    //--tex完成
    RESObj.prototype.texComplete = function (res, key) {
        this.state = 2;
        if (!res) {
            if (true) {
                ViewCommonWarn.text("资源报错：" + this.val);
            }
            console.error("资源报错：" + this.val);
        }
        this.mctexture = res;
        this.dbcomplete();
    };
    RESObj.prototype.textureComplete = function (res, key) {
        this.state = 2;
        this.mcdata = GGlobal.aniCfg[this.jsonUrl];
        if (!res) {
            if (true) {
                ViewCommonWarn.text("资源报错：" + this.val);
            }
            console.error("资源报错：" + this.val);
        }
        this.mctexture = res;
        this.complete();
    };
    RESObj.prototype.complete = function () {
        this.factory = new egret.MovieClipDataFactory(this.mcdata, this.mctexture);
        var uses = this.useParts;
        this.ready = true;
        for (var i = uses.length - 1; i >= 0; i--) {
            var p = uses[i];
            p.buildmc();
        }
        uses.length = 0;
        GGlobal.resMgr.onLoaded();
    };
    /***
     * db 完成
     */
    RESObj.prototype.dbcomplete = function () {
        this.dbfactory = new dragonBones.EgretFactory();
        this.dbfactory.parseDragonBonesData(this.dbskedata);
        this.dbfactory.parseTextureAtlasData(this.mcdata, this.mctexture);
        this.addDBToCache();
        this.buildDB();
    };
    RESObj.prototype.buildDB = function () {
        var uses = this.useParts;
        this.ready = true;
        for (var i = uses.length - 1; i >= 0; i--) {
            var p = uses[i];
            p.buildmc();
        }
        uses.length = 0;
        GGlobal.resMgr.onLoaded();
    };
    RESObj.prototype.dispose = function () {
        // if (this.mcdata) {
        // 	RES.destroyRes(this.jsonUrl);
        // 	this.mcdata = null;
        // }
        if (this.mctexture) {
            RES.destroyRes(this.textureUrl);
            //this.mctexture.dispose();
            this.mctexture = null;
        }
        this.dbfactory = null;
        this.dbUrlList = null;
        this.jsonUrl = this.textureUrl = null;
        this.state = -1;
        this.ready = false;
        this.disposeTimes++;
    };
    RESObj.POOL = [];
    RESObj.dbResCache = {};
    return RESObj;
}());
__reflect(RESObj.prototype, "RESObj");
