/**场景掉落物品 */
class SceneDropGoods extends DepSprite implements ISceneObject {
	public img: fairygui.GLoader;
	public qualityBG: fairygui.GLoader;
	public lb: fairygui.GRichTextField;
	public x = 0;
	public y = 0;
	public h = 0;

	/** 1:通常角色(主角 怪物等) 10:岩石*/
	public objType = 0;

	public scene: MapScene;
	public id = 0;

	/**所在势力队伍 */
	public force = 0;

	public static POOL = [];
	public static create(): SceneDropGoods {
		var pool = SceneDropGoods.POOL;
		if (pool.length) {
			return pool.shift();
		}
		return new SceneDropGoods();
	}

	public init(x: number, y: number, arg): void {
		this.x = x - this.img.width / 2;
		this.y = y - this.img.height / 2;
		this.dep = this.y;
		var icon;
		var type = arg[0];
		var id = arg[1];
		var name = "";
		var color = 2;
		if (type == Enum_Attr.ITEM) {
			var lib: Idaoju_204 | Izhuangbei_204 | Ijssx_002 = Config.daoju_204[id];
			icon = lib.icon;
			name = ConfigHelp.getItemColorName(id);
			color = lib.quality;
		} else if (type == Enum_Attr.EQUIP) {
			lib = Config.zhuangbei_204[id];
			icon = lib.icon;
			color = lib.q;
			name = ConfigHelp.getItemColorName(id);
		} else {
			lib = Config.jssx_002[type];
			name = HtmlUtil.fontNoSize(lib.name, Color.getColorStr(lib.color))
			icon = lib.icon;
			color = lib.color;
		}
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + icon + ".png", this.img);
		ImageLoader.instance.loader(Enum_Path.BACK_URL +"iconbg" +color + ".png", this.qualityBG);
		this.lb.text = name;
		// this.lb.x = (this.img.width - this.lb.textWidth) / 2;
	}

	public constructor() {
		super();
		let s = this;

		s.id = SceneObject.COUNTER++;
		let view = SceneDropView.createInstance();
		s.addChild(view.displayObject);
		s.qualityBG = view.n0;
		s.lb = view.n1;
		s.img = view.n2;
	}

	public update(ctx) {
	}

	public onAdd() {
		this.scene.unitLayer.depAddChild(this);
	}

	public onRemove() {
		egret.Tween.removeTweens(this);
		if (this.scene) {
			this.scene.unitLayer.depRemoveChild(this);
		}
		if (SceneDropGoods.POOL.indexOf(this) == -1) {
			SceneDropGoods.POOL.push(this);
		} else {
			if (DEBUG) {
				throw new Error("重复释放了掉落物品。");
			}
		}
	}

	public onEvent(evt, arg = null) {
	}
}