class HuangZhongArrow1 extends DepSprite implements ISceneObject {

	public scene: MapScene;

	public objType;

	public h: number = 0;
	public id;
	public force = 0;
	public updateFunc = null;

	public eff: Part;
	public effInterv = 0;
	public lifeTime = 0;
	public dieTime = 0;
	public ms;

	public va;
	public vb;
	public vc;
	public vd;
	public ve;

	public static LMDROP(arrow: HuangZhongArrow1, ctx) {
		if (arrow.vd == 1) {//droping	
			arrow.h += 20;
			if (arrow.h >= 0) {
				arrow.h = 0;
				arrow.vd = 10;//booming
				arrow.eff.setVal("eff/9015");
				arrow.lifeTime = 0;
				arrow.dieTime = 500;
				arrow.eff.mc.rotation = arrow.vc;
			}
			arrow.x += arrow.va;
			arrow.eff.mc.y = arrow.h;
			arrow.lifeTime = 0;
			arrow.eff.setPec(0);
		} else {//booming
			arrow.lifeTime += ctx.dt;
			var perc = arrow.lifeTime / arrow.dieTime;
			arrow.eff.setPec(perc);
			if (perc >= 1) {
				ctx.d = 1;
			}
		}
	}

	public static ZY3FUNC(arrow: HuangZhongArrow1, ctx) {
		arrow.lifeTime += ctx.dt;
		if (arrow.lifeTime >= arrow.dieTime) {
			ctx.d = 1;
		} else {
			arrow.x += arrow.va;
			arrow.eff.mc.rotation += arrow.vb;
			var perc = arrow.lifeTime / arrow.effInterv;
			perc = perc - (perc >> 0);
			arrow.eff.setPec(perc);
		}
	}


	public static LIFEONLY(arrow: HuangZhongArrow1, ctx) {
		arrow.lifeTime += ctx.dt;
		if (arrow.lifeTime >= arrow.effInterv) {
			ctx.d = 1;
		} else {
			var perc = arrow.lifeTime / arrow.effInterv;
			arrow.eff.setPec(perc);
		}
	}

	public static FORWARD(arrow: HuangZhongArrow1, ctx) {
		arrow.lifeTime += ctx.dt;
		if (arrow.lifeTime >= arrow.dieTime) {
			ctx.d = 1;
		} else {
			var perc = arrow.lifeTime / arrow.effInterv;
			if (perc > 1) {
				perc = perc - (perc >> 0);
			}
			arrow.eff.setPec(perc);
		}
		arrow.x += arrow.va;
		arrow.y += arrow.vb;
		//arrow.alpha -= 0.01;
	}

	public static HZ1FUNC(arrow: HuangZhongArrow1, ctx) {
		arrow.lifeTime += ctx.dt;
		if (arrow.lifeTime >= arrow.effInterv) {
			ctx.d = 1;
		} else {
			arrow.x += arrow.va;
			arrow.alpha -= arrow.vb;
			var perc = arrow.lifeTime / arrow.effInterv;
			arrow.eff.setPec(perc);
		}
	}

	public static ZGL2FUNC(arrow: HuangZhongArrow1, ctx) {
		arrow.lifeTime += ctx.dt;
		if (arrow.lifeTime >= arrow.effInterv) {
			ctx.d = 1;
		} else {
			arrow.eff.mc.scaleX += arrow.va;
			arrow.eff.mc.scaleY = arrow.eff.mc.scaleX;
			arrow.alpha -= 0.01;
			var perc = arrow.lifeTime / arrow.effInterv;
			arrow.eff.setPec(perc);
		}
	}

	// public static ZGLTHUNDERFUNC(arrow:HuangZhongArrow1,ctx) {
	// 	arrow.lifeTime += ctx.dt;
	// 	if(arrow.lifeTime >= arrow.effInterv) {
	// 		ctx.d = 1;
	// 	}else{
	// 		arrow.x += arrow.va;
	// 		arrow.y += arrow.vb;
	// 		arrow.alpha -= 0.025;
	// 		var perc = arrow.lifeTime / arrow.vc;
	// 		perc > 1 && (perc = perc - (perc >> 0));
	// 		arrow.eff.setPec(perc);
	// 		arrow.dep = arrow.y + 1;
	// 	}
	// }

	public static ZGLTHUNDERFUNC2(arrow: HuangZhongArrow1, ctx) {
		arrow.lifeTime += ctx.dt;
		if (arrow.lifeTime >= arrow.dieTime) {
			ctx.d = 1;
		} else {
			arrow.vc += 0.05;
			arrow.vd += 6;
			arrow.ve += 3;
			arrow.x = Math.cos(arrow.vc) * arrow.vd + arrow.va;
			arrow.y = Math.sin(arrow.vc) * arrow.ve + arrow.vb;
			arrow.alpha -= 0.025;
			var perc = arrow.lifeTime / arrow.effInterv;
			perc > 1 && (perc = perc - (perc >> 0));
			arrow.eff.setPec(perc);
			arrow.dep = arrow.y + 1;
		}
	}

	public static CLBOSSFUNC(arrow: HuangZhongArrow1, ctx) {
		arrow.lifeTime += ctx.dt;
		if (arrow.lifeTime >= arrow.dieTime) {
			ctx.d = 1;
		} else {
			var perc = arrow.lifeTime / arrow.dieTime;
			perc > 1 && (perc = perc - (perc >> 0));
			arrow.eff.setPec(perc);

			if (perc < 0.75) {
				arrow.eff.mc.y = -Math.sin(Math.PI * perc / 0.75) * 50 - (200 * (1 - perc));
			} else {
				arrow.eff.mc.y = perc * (arrow.vd - arrow.vb) + arrow.vb;
			}

			var stagex = perc * (arrow.vc - arrow.va) + arrow.va;

			arrow.x = stagex;
			arrow.dep = arrow.y + 1;
		}
	}

	public static CLBOSSFUNC1(arrow: HuangZhongArrow1, ctx) {
		arrow.lifeTime += ctx.dt;
		if (arrow.lifeTime >= arrow.dieTime) {
			ctx.d = 1;
		} else {
			var perc = arrow.lifeTime / arrow.dieTime;
			perc > 1 && (perc = perc - (perc >> 0));
			arrow.eff.setPec(perc);
			arrow.dep = arrow.y + 1;
		}
	}

	public constructor() {
		super();
		this.id = SceneObject.COUNTER++;
	}

	public initWithRoleFace(role: SceneCharRole, effid, act, interv = 500, isLoop: boolean, offx = 0, h = 0, offy = 0, scaleX = 1) {
		this.effInterv = interv;

		var eff: Part = this.eff = new Part();
		eff.setAct(act);
		eff.setVal(effid)
		eff.setPec(0);
		this.x = role.x + role.faceDir * offx;
		this.y = role.y + offy;
		this.h = h;
		this.eff.mc.y = this.h;
		this.dep = role.y + 1;
		this.lifeTime = 0;
		eff.mc.scaleX = role.faceDir * scaleX;
		this.addChild(eff.mc);
	}

	public initXY(effid, act, interv = 500, isLoop: boolean, x = 0, y = 0, h = 0, scaleX = 1
	) {
		this.effInterv = interv;

		var eff: Part = this.eff = new Part();
		eff.setAct(act);
		eff.setVal(effid)
		eff.setPec(0);
		this.x = x;
		this.y = y;
		this.h = h;
		this.eff.mc.y = this.h;
		this.dep = y + 1;
		eff.mc.scaleX = scaleX;
		this.addChild(eff.mc);
	}

	public isTopObj: any;
	public onAdd() {
		if (this.isTopObj) {
			this.scene.view.addChild(this);
		} else {
			this.scene.unitLayer.depAddChild(this);
		}
	}

	public onRemove() {
		if (this.eff) {
			this.eff.setVal(null);
		}
		if (this.isTopObj) {
			this.scene.view.removeChild(this);
		} else {
			this.scene.unitLayer.depRemoveChild(this);
		}
		this.scene = null;
	}

	public update(ctx) {
		if (this.updateFunc) {
			this.updateFunc(this, ctx);
		}
	}

	public onEvent(evt, arg) {
	}

	public static create() {
		var ret = new HuangZhongArrow1();
		return ret;
	}
}