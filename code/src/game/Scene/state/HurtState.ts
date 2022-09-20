class HurtState {

	public role: SceneCharRole;
	public constructor() {
	}

	public lifeTime = 600;

	public shakex = 1;
	public shakeInterv = 0;

	public speedh = 10;
	public throwspeed: number = 0;

	public throwState = 0;

	public enable = false;

	public isThrow: boolean;

	public throwSt3time = 0;

	public alltime = 0;

	public hurtCounter;

	public reset() {
		let self = this;
		self.isThrow = false;
		self.throwState = 0;
	}

	public update(ctx) {
		let self = this;
		var role = self.role;
		if (!role.immuneDmg && !role.invincible) {
			self.alltime += ctx.dt;
			if (self.alltime >= Math.floor(Config.changshu_101[2].num / 100)) {
				if (self.role.ignoreBati) {
					var batistate = BaTiState.create();
					batistate.role = role;
					self.role.addPlug(batistate);
					if (!self.isThrow) {
						self.isThrow = true;
					}
				}
			}
		}
		if (self.isThrow) {
			role.vech -= 2 * GGlobal.frameScale;
			self.lifeTime -= ctx.dt;
			if (self.throwState == 0) {
				role.scene.moveRole(role, role.vecx, 0, self.role.vech);
				if (role.vech <= 0) {
					role.hurt_state = 2;
					role.invalid |= 1;
					self.throwState = 1;
				}
			} else if (self.throwState == 1) {
				role.scene.moveRole(role, role.vecx, 0, role.vech);
				if (!role.h) {
					if (role.curhp) {
						if (!role.immuneHSt && !role.invincible && !role.immuneDmg && role.ignoreBati) {
							var bati = BaTiState.create();
							bati.role = role;
							role.addPlug(bati);
						}

						role.hurt_state = 5;
						role.invalid |= 1;
						self.throwState = 2;
						self.throwSt3time = 500;
						role.setPlayTime(500, false, true);
					} else {
						role.hurt_state = 4;
						role.invalid |= 1;
						self.throwState = 10;
						self.throwSt3time = 500;
						role.setPlayTime(500, false, true);
					}
				}
			} else if (self.throwState == 2) {
				self.throwSt3time -= ctx.dt;
				if (self.throwSt3time <= 0) {
					role.hurt_state = 0;
					role.invalid |= 1;
					ctx.d = true;
				}
			} else if (self.throwState == 3) {
				role.scene.moveRole(role, role.vecx, 0, role.vech);
				if (!role.h) {
					if (role.curhp) {
						role.hurt_state = 1;
						role.invalid |= 1;
						self.throwState = 2;
						self.throwSt3time = 500;
						self.role.setPlayTime(500, true, true);
					} else {
						role.hurt_state = 4;
						role.invalid |= 1;
						self.throwState = 10;
						self.throwSt3time = 500;
						role.setPlayTime(500, false, true);
					}
				}
			} else {//死亡
				self.throwSt3time -= ctx.dt;
				self.role.view.alpha -= 0.03;
				if (self.throwSt3time <= 0) {
					ctx.d = true;
					self.role.deadRemove();
				}
			}
		} else {
			self.lifeTime -= ctx.dt;
			if (self.lifeTime <= 0) {
				ctx.d = 1;
			}

			self.shakeInterv += ctx.dt;
			if (self.shakeInterv >= 40) {
				self.shakeInterv = 0;
				self.shakex = -self.shakex;
				self.role.parts.x = self.shakex;
			}
		}
	}

	public onAdd() {
		let self = this;
		self.alltime = 0;
		self._hurtTimes = 0;

		if (self.role.h < 0) {
			self.throw(self.role.vecx * -self.role.faceDir, self.role.vecy);
			self.role.hurt_state = 3;
		} else {
			self.isThrow = false;
			self.role.hurt_state = 1;
		}
		self.lifeTime = 600;
		self.enable = true;
		self.role.invalid |= 1;
		self.role.setPlayTime(600, true, true);

		self.hurtCounter = 0;
		self.role.endSkill();
	}

	public reEnter() {
		let self = this;
		self.lifeTime = 0;
		if (self.isThrow) {
		} else {
			self.lifeTime = 600;
		}
	}

	public onRemove() {
		let self = this;
		self.enable = false;
		self.role.hurt_state = 0;
		self.throwState = 0;
		self.isThrow = false;
		self.role.setPlayTime();
	}

	protected _hurtTimes = 0;
	public onEvent(evt, arg) {
		let self = this;
		if (evt == EVT_SC.EVT_HURT) {
			self._hurtTimes++;

			var value = arg.dmgVal;
			if (value > 0) {
				self.hurtCounter += value;
			}
		}
	}

	public throw(speedx, speedh) {
		let self = this;
		self.role.vecx = speedx * GGlobal.frameScale;
		self.role.vech = speedh;

		self.role.hurt_state = 3;
		self.isThrow = true;
		if (self.role.vech > 0) {
			self.throwState = 0;
		} else {
			self.throwState = 1;
		}
		self.role.invalid |= 1;
	}

	public backoff(speedx, speedh) {
		let self = this;
		self.role.vecx = speedx;
		self.role.vech = speedh;
		self.isThrow = true;
		self.role.hurt_state = 1;
		self.throwState = 3;
		self.role.invalid |= 1;
	}
}