class ImageLoader {
	protected static _ins: ImageLoader;
	public static get instance() {
		if (!this._ins) {
			this._ins = new ImageLoader();
		}
		return this._ins;
	}

	static loader(url: string, img: fairygui.GLoader, loadCom?: Handler){
		ImageLoader.instance.loader(url, img, loadCom);
	}

	public map: { [url: string]: ImgLoaderItem } = {};
	public loaderVoMap: { [loaderHashCode: number]: LoaderVo } = {};
	/**url是不加head的，统一在这里加上 */
	loader(url: string, img: fairygui.GLoader, loadCom?: Handler) {
		this.removeLoader(img);
		img.texture = null;
		var u = RESManager.getVersionUrl(url);
		IconUtil.addUrlCounter(u);
		var item = this.map[u];
		if (!item) {
			this.map[u] = item = ImgLoaderItem.getObjFromPool();
			item.url = u;
		}

		let t_loaderVo = LoaderVo.getObjFromPool();
		t_loaderVo.url = u;
		t_loaderVo.handler = loadCom;
		this.loaderVoMap[img.hashCode] = t_loaderVo;

		item.list.push(img);
		if (!item.isLoader) {
			item.isLoader = true;
			RES.getResByUrl(u, this.loadComplete, this, RES.ResourceItem.TYPE_IMAGE);
		}
	}

	removeLoader(img: fairygui.GLoader) {
		var code = img.hashCode;
		let t_loaderVo = this.loaderVoMap[code];
		if (!t_loaderVo)
			return;

		var item: ImgLoaderItem = this.map[t_loaderVo.url];
		var index = item.list.indexOf(img);
		if (index >= 0) {
			item.list.splice(index, 1);
			if (item.list.length <= 0) {
				delete this.map[t_loaderVo.url];
				ImgLoaderItem.recycleToPool(item);
			}
		}
		delete this.loaderVoMap[code];
		LoaderVo.recycleToPool(t_loaderVo);
	}

	protected loadComplete(texture, url: string) {
		var item: ImgLoaderItem = this.map[url];
		if (item) {
			delete this.map[url];
			for (var i = 0, len = item.list.length; i < len; i++) {
				let t_loader = item.list[i];
				t_loader.texture = texture;
				let t_loaderVo = this.loaderVoMap[t_loader.hashCode];
				if (t_loaderVo) {
					let t_handler = t_loaderVo.handler;
					if (t_handler)
						t_handler.run();

					delete this.loaderVoMap[t_loader.hashCode];
					LoaderVo.recycleToPool(t_loaderVo);
				}
			}
			ImgLoaderItem.recycleToPool(item);
		}
	}

}

class ImgLoaderItem {
	//============== 静态管理 ===================
	static getObjFromPool(): ImgLoaderItem {
		let t_vo = Pool.getItemByClass("ImgLoaderItem",ImgLoaderItem);
		return t_vo;
	}

	static recycleToPool(pVo: ImgLoaderItem) {
		pVo.recycle();
		Pool.recover("ImgLoaderItem",pVo);
	}
	//============== 静态管理 ===================

	public url: string;
	public list: fairygui.GLoader[] = [];
	public isLoader: boolean;
	public constructor() {
	}

	public recycle() {
		this.url = "";
		this.list.length = 0;
		this.isLoader = false;
	}
}

class LoaderVo {
	//============== 静态管理 ===================
	static _pool: LoaderVo[] = [];
	static getObjFromPool(): LoaderVo {
		let t_vo = Pool.getItemByClass("LoaderVo",LoaderVo);
		return t_vo;
	}

	static recycleToPool(pVo: LoaderVo) {
		pVo.recycle();
		Pool.recover("LoaderVo",pVo);
	}
	//============== 静态管理 ===================

	public url: string;
	public handler: Handler;

	public constructor() {
	}

	public recycle() {
		this.url = "";
		this.handler = null;
	}
}