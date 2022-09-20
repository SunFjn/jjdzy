class Part extends egret.DisplayObject {

	public parts: Parts;

	/** 外部对于特效的引用 */
	public refThis: any;
	/** 外部引用特效的key名 */
	public refKey: string;

	public mc: egret.MovieClip | egret.Sprite;
	private dbDis: dragonBones.EgretArmatureDisplay;

	public type: number; //对应 1身体 2武器 3影子 4坐骑 5坐骑翅膀 //public static T_BODY = 1;  public static T_WEAPON = 2;  public static T_SHOUHUN = 3; public static T_HORSE = 4; // public static T_HORSE_WING = 5;
	public dep: number = 0;
	public val: any;
	public body: any = null;

	public res: RESObj;

	public parent: Parts;

	public act: any = 0;

	//[--- 作为特效时的数据
	public startTime: number;
	public aniInterv: number;
	public endTime: number;
	public repeat: boolean;

	public removeBreak: boolean;//被打断的时候移除
	//作为特效时的数据 ---]

	public static POOL = [];
	public partType: PartType;
	public static create(partType: PartType = PartType.MC): Part {
		var ret: Part = Part.POOL.length ? Part.POOL.pop() : new Part(partType);
		ret.partType = partType;
		if (DEBUG) {
			ret.isDispose = null;
		}
		return ret;
	}

	public constructor(type: PartType = PartType.MC) {
		super();//此处需要修改
		if (type == PartType.MC) {
			//序列帧
			this.mc = new egret.MovieClip();
		} else if (type == PartType.DB) {
			//龙骨
			this.mc = new egret.Sprite();
			console.log("创建龙骨！");
		}
		this.partType = type;
	}

	public setVal(v: any, body: any = null): void {
		// if((v as string).indexOf("/eff/")){
		// 	console.log("2222222");
		// }
		let self = this;
		let action: string;
		if (this.partType == PartType.DB && v) {
			let vlist: Array<string> = (v as string).split("/");
			v = vlist[0] + "/" + vlist[1];
			action = vlist[2];
			if (action == "ani") {
				action = "idle";
			}
		}
		if (v != self.val) {
			if (self.res) {
				var useindex = self.res.useParts.indexOf(self);
				self.res.useParts.splice(useindex, 1);
				//GGlobal.mcMgr.reduceRes(this.val);
				GGlobal.resMgr.reduceRes(self.val);
			}
			self.val = v;
			if (v) {
				//this.res = GGlobal.mcMgr.refRes(v);
				if (self.body == null || self.body == undefined || self.body != body) {
					if (this.type != Parts.T_WEAPON) {
						//龙骨动画 武器和人物一起了
						if (this.partType == PartType.DB) {
							console.log("需要加载龙骨" + v);
						}
						self.res = GGlobal.resMgr.refRes(v, this.partType);

						self.res.useParts.push(this);
						self.buildmc();
					}
				}

			} else {
				self.res = null;
				self.mc.visible = false;
				self.mc.scaleX = self.mc.scaleY = 1;
				self.mc.x = self.mc.y = 0;
			}
		} else {
			if (this.partType == PartType.DB) {
				if (this.dbDis) {
					this.dbDis.animation.play(this.actTran(action));
				}
			}
		}
	}

	public setAct(v: any) {
		if (this.act != v) {
			this.act = v;
			this.buildmc();
			if (this.partType == PartType.DB && this.body) {
				console.log("this.body" + this.body);
			}
		}
	}

	private _curFrm;
	public setPec(v: number): void {
		//v时间 进度
		const self = this;
		if (self.mc instanceof egret.MovieClip) {
			if (self.res && self.res.ready && self.mc.movieClipData.frames.length > 0) {
				var curFrame = 1 + (v * self.mc.$totalFrames) >> 0;
				//this.mc.currentFrame = curFrame;
				if (self._curFrm != curFrame) {
					try { //此处需要修改
						if (self.mc.$movieClipData.frames[curFrame - 1] && self.mc.$movieClipData.getTextureByFrame(curFrame)) {
							self.mc.gotoAndStop(curFrame);
						}
						self._curFrm = curFrame;
					} catch (e) {
						console.error("资源报错：" + e + self.res.jsonUrl);
					}
				}
			}
		}
		if (self.mc instanceof egret.Sprite) {
			if(this.dbDis && this.dbDis.armature && this.dbDis.armature.clock.contains(this.dbDis.armature)==false){
				this.dbDis.armature.clock.add(this.dbDis.armature);
			}
			// this.dbDis.animation.play(this.actTran(this.act));
		}

	}

	public buildmc() {
		if (this.mc instanceof egret.MovieClip) {
			if (this.res && this.res.factory) {
				// this.act  对应 1.受击2.浮空3.受击倒地4.死亡5.起身 */
				let movieClipData = this.res.factory.generateMovieClipData(this.act);
				try {//此处需要修改
					this.mc.movieClipData = movieClipData;
					this.mc.visible = true;
				} catch (e) {
				}
			} else {
			}
		} else if (this.mc instanceof egret.Sprite) {
			if (this.res && this.res.dbfactory) {
				// this.act  对应 1.受击2.浮空3.受击倒地4.死亡5.起身 */
				if (this.dbDis) {
					this.dbDis.animation.play(this.actTran(this.act));
					this.dbDis.armature.clock.add(this.dbDis.armature);
					// console.log("this.act="+this.act);
					return;
				}
				this.dbDis = this.res.dbfactory.buildArmatureDisplay("armatureName");
				this.dbDis.animation.play(this.actTran(this.act));
				this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFormStage, this);
				try {//此处需要修改
					this.mc.addChild(this.dbDis);
					this.mc.visible = true;
				} catch (e) {
				}
			} else {
			}
		}

	}

	private actDic: Object = null;
	private actTran(act: string): string {
		if (this.actDic == null) {
			this.actDic = {
				attack01: "attack"
				, attack02: "attack1"
				, attack03: "attack"
				, fire: "hurt"
				, hurt: "hurt"
				, ice: "hurt"
				, jump: "run"
				, posion: "die"
				, ride: "取消坐骑动作"
				, ride_st: "取消坐骑动作"
				, run: "run", rush: "attack"
				, skill_01: "skill3"
				, skill_02: "skill1"
				, skill_03: "skill2"
				, skill_04: "skill1"
				, stand: "idle"
				, thunder: "hurt"
				, use_01: "win1"
				, use_02: "win1"
			};
		}

		return this.actDic[act];
	}

	public isDispose;
	public dispose() {
		var self = this;
		if (DEBUG) {
			if (self.isDispose) {
				console.error("错误的释放PART:" + self.val);
			}
			self.isDispose = true;
		}
		if (this.dbDis) {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFormStage, this);
			// this.dbDis.animation.stop();
			// this.dbDis.animation.reset();
			// this.dbDis.animation.returnToPool();
			this.dbDis.armature.clock.remove(this.dbDis.armature);
			// this.dbDis.dbClear();
			// if (this.dbDis.parent) this.dbDis.parent.removeChild(this.dbDis);
			this.dbDis = null;
		}

		self.removeBreak = null;

		self.parts = null;
		if (self.refThis && self.refKey) {
			self.refThis[self.refKey] = null;
			self.refThis = null;
			self.refKey = null;
		}
		self.mc.visible = false;
		self.mc.scaleX = self.mc.scaleY = 1;

		self.mc.x = this.mc.y = 0;

		self.setVal(null, null);
		this.body = null;
		//self.mc.currentFrameLabel = null;
		self.dep = 0;


		Part.POOL.push(self);
		this.partType = 1;
	}

	public setVisible(v: boolean): void {
		this.mc.visible = v;
		this.visible = v;
	}

	public getMC(): egret.MovieClip | egret.Sprite {
		return this.mc;
	}
	private onRemoveFormStage(event: egret.Event): void {
		if (this.dbDis) {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFormStage, this);
			// this.dbDis.animation.stop();
			// this.dbDis.animation.reset();
			// this.dbDis.animation.returnToPool();
			this.dbDis.armature.clock.remove(this.dbDis.armature);
			// this.dbDis.dbClear();
			// if (this.dbDis.parent) this.dbDis.parent.removeChild(this.dbDis);
			this.dbDis = null;
		}
	}
}
/**
 *部件类型 
 */
enum PartType {
	MC = 1,//序列帧
	DB = 2//龙骨
}