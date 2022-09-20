class LoaderManager {

	public ctxMap: Object;

	public queue: Array<LoaderCtx>;

	//public loadingCtx:LoaderCtx;

	public idleLoaders: Array<egret.URLLoader> = [];

	public static RES_T_TEXTURE: number = 0;
	public static RES_T_TEXT: number = 1;

	public removed: boolean;

	public constructor() {
		this.queue = new Array<LoaderCtx>();
		this.ctxMap = {};
		for (var i = 0; i < 2; i++) {
			var loader = new egret.URLLoader();
			loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;

			loader.addEventListener(egret.Event.COMPLETE, this.onImgComp, this);
			loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onImgError, this);
			this.idleLoaders.push(loader);
		}
	}

	public addLoad(url: string, complete: Function, self: any, restype: number = 0, arg: Object = null, tick: Function = null, error: Function = null) {
		var item: LoaderItem = LoaderItem.create();
		item.arg = arg;
		item.complete = complete;
		item.tick = tick;
		item.error = error;
		item.url = url;
		item.self = self;
		item.restype = restype;

		this.addLoadItem(item);

		//console.log("starLoad:"+url);
	}

	public addLoadItem(item: LoaderItem) {
		var ctx: LoaderCtx = this.ctxMap[item.url];
		if (ctx == null) {
			ctx = this.ctxMap[item.url] = LoaderCtx.create();
			ctx.url = item.url;
			ctx.restype = item.restype
			this.insertCtx(ctx);
		}
		ctx.items.push(item);
		item.ctx = ctx;

		if (ctx.removed) {
			ctx.removed = null;
		}

		this.checkLoad();
	}

	public insertCtx(ctx: LoaderCtx) {
		this.queue.push(ctx);
	}

	protected checkLoad() {
		if (this.idleLoaders.length > 0 && this.queue.length > 0) {
			var ctx: LoaderCtx = this.queue.pop();
			var loader: any = this.idleLoaders.shift();
			loader.ctx = ctx;
			ctx.loader = loader;
			if (true) {
				if (ctx.restype == LoaderManager.RES_T_TEXTURE) {
					loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
				} else {
					loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
				}
				var request: egret.URLRequest = new egret.URLRequest(GGlobal.resHead + ctx.url);
				loader.load(request);
			}
		}
	}

	protected onImgComp(e: egret.Event) {
		var loader: any = e.target;
		var ctx: LoaderCtx = loader.ctx;
		if (ctx.removed) {
			loader.loadingCtx = null;
			this.idleLoaders.push(loader);
			delete this.ctxMap[ctx.url];
			return;
		}
		//console.log("loadComp:"+curCtx.url);
		ctx.items.forEach(element => {
			if (element.complete) {
				element.complete(element);
			}
		});
		loader.ctx = null;
		ctx.loader = null;
		this.idleLoaders.push(loader);
		delete this.ctxMap[ctx.url];
		this.checkLoad();
	}

	protected onImgError(e: egret.IOErrorEvent) {
		var loader = e.target;
		var ctx: LoaderCtx = loader.ctx;
		console.log("loadError:" + ctx.url);
		if (ctx.removed) {
			loader.loadingCtx = null;
			this.idleLoaders.push(loader);
			delete this.ctxMap[ctx.url];
			return;
		}
		ctx.items.forEach(element => {
			if (element.error) {
				element.error(element);
			}
		});
		loader.loadingCtx = null;
		ctx.loader = null;
		this.idleLoaders.push(loader);
		delete this.ctxMap[ctx.url];
		this.checkLoad();
	}

	public removeLoad(url: string) {
		var ctx: LoaderCtx = this.ctxMap[url];
		if (ctx) {
			delete this.ctxMap[url];
			ctx.removed = true;
			if (ctx.loader) {
			} else {
				this.queue.splice(this.queue.indexOf(ctx), 1);
			}
		}
	}
}