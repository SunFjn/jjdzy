class RESObj {

	public ready: boolean;
	public state: number = -1;
	public proprity: number = 1;

	public ref0Time: number;

	public val: any;

	public refCount: number = 0;
	public dbskedata: Object;
	public mcdata: Object;
	public mctexture: egret.Texture;

	public factory: egret.MovieClipDataFactory;
	public dbfactory: dragonBones.EgretFactory;

	public useParts: Array<any> = [];

	public jsonUrl: string;
	public textureUrl: string;
	public dbUrlList: Array<string>;

	public static POOL = [];

	public disposeTimes = 0;

	/** 是否在销毁列表中 */
	public inDList: boolean;
	public partType: PartType;
	public static create(type: PartType): RESObj {
		var ret: RESObj = RESObj.POOL.length ? RESObj.POOL.pop() : new RESObj();
		ret.partType = type;
		return ret;
	}

	public startLoad() {
		this.state = 0;//-1未开始 0 开始 2 完成 
		let baseKey: string = this.val;
		var reg = new RegExp("\/", "g");
		baseKey = baseKey.replace(reg, "_");
		this.jsonUrl = baseKey;// baseKey + "_json"//GGlobal.resHead+"resource/model/" + this.val + ".json";
		if (this.partType == PartType.MC) {
			this.textureUrl = Enum_Path.getModelPath(this.val);
			RES.getResByUrl(this.textureUrl, this.textureComplete, this);
		} else {
			console.log("加载龙骨动画！");
			this.dbUrlList = Enum_Path.getModelDBPath(this.val);
			if(this.haveDB()){
				this.initDBData();
				this.buildDB();
				return;
			}
			RES.getResByUrl(this.dbUrlList[0], this.skeComplete, this);
		}
	}
	private static dbResCache:Object = {};
	private addDBToCache():void
	{
        var obj:any={};
		obj.dburl=this.dbUrlList[0];
		obj.factory = this.dbfactory;
		// obj.skeData = this.dbskedata;
		// obj.texData = this.mcdata;
		// obj.texture = this.mctexture; 
		RESObj.dbResCache[obj.dburl] = obj;
	}
	private haveDB():boolean{
		return RESObj.dbResCache[this.dbUrlList[0]];
	}
	private initDBData(){
		var obj:any=RESObj.dbResCache[this.dbUrlList[0]];
		this.dbfactory = obj.factory;
		// this.dbskedata = obj.skeData;
		// this.mcdata = obj.texData
		// this.mctexture = obj.texture; 
	}

	//-------------加载db数据---------------
	//-------------加载db数据完成-----------
	//---ske json数据完成
	public skeComplete(res: any, key: string) {
		// this.dbskedata = GGlobal.aniCfg[key];
		this.dbskedata =res;
		if (!res) {
			if (DEBUG) {
				ViewCommonWarn.text("资源报错：" + this.val);
			}
			console.error("资源报错：" + this.val);
		}
		RES.getResByUrl(this.dbUrlList[1], this.texJsonComplete, this);
	}
	//--texJson数据完成
	public texJsonComplete(res: any, key: string) {
		// this.mcdata = GGlobal.aniCfg[key];
		this.mcdata = res;
		if (!res) {
			if (DEBUG) {
				ViewCommonWarn.text("资源报错：" + this.val);
			}
			console.error("资源报错：" + this.val);
		}
		RES.getResByUrl(this.dbUrlList[2], this.texComplete, this);
	}
	//--tex完成
	public texComplete(res: any, key: string) {
		this.state = 2;
		if (!res) {
			if (DEBUG) {
				ViewCommonWarn.text("资源报错：" + this.val);
			}
			console.error("资源报错：" + this.val);
		}
		this.mctexture = res;
		this.dbcomplete();
	}

	public textureComplete(res: any, key: string) {
		this.state = 2;
		this.mcdata = GGlobal.aniCfg[this.jsonUrl];
		if (!res) {
			if (DEBUG) {
				ViewCommonWarn.text("资源报错：" + this.val);
			}
			console.error("资源报错：" + this.val);
		}
		this.mctexture = res;
		this.complete();
	}

	public complete() {
		this.factory = new egret.MovieClipDataFactory(this.mcdata, this.mctexture);

		var uses = this.useParts;
		this.ready = true;
		for (var i = uses.length - 1; i >= 0; i--) {
			var p: Part = uses[i];
			p.buildmc();
		}
		uses.length = 0;

		GGlobal.resMgr.onLoaded();
	}
    /***
	 * db 完成
	 */
	public dbcomplete() {
		this.dbfactory =new  dragonBones.EgretFactory();
		this.dbfactory.parseDragonBonesData(this.dbskedata);
		this.dbfactory.parseTextureAtlasData(this.mcdata, this.mctexture);
		this.addDBToCache();
        this.buildDB();
	}
	private buildDB():void{
		var uses = this.useParts;
		this.ready = true;
		for (var i = uses.length - 1; i >= 0; i--) {
			var p: Part = uses[i];
			p.buildmc();
		}
		uses.length = 0;

		GGlobal.resMgr.onLoaded();
	}

	public dispose() {
		// if (this.mcdata) {
		// 	RES.destroyRes(this.jsonUrl);
		// 	this.mcdata = null;
		// }
		if (this.mctexture) {
			RES.destroyRes(this.textureUrl);
			//this.mctexture.dispose();
			this.mctexture = null;
		}
		this.dbfactory =null;
		this.dbUrlList = null;
		this.jsonUrl = this.textureUrl = null;
		this.state = -1;
		this.ready = false;
		this.disposeTimes++;
	}
}