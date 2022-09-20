class HomeScenePlayerAI {
	public constructor() {
	}

	public role: SceneCharRole;

	/**0 stand 1:move*/
	public state = 0;

	public sx: number;
	public sy: number;
	public lenx: number;
	public leny: number;

	public starttime;
	public moveTime;

	public moveInterv = 0;

	/**自动移除 */
	public autoRemove = 1;

	public top = 425;
	public bottom = 800;

	public thinkLeft = 100;
	public thinkRight = 1500;
	public thinkTop = 450;
	public thinkBottom = 600;

	public aithink(ctx) {
		if (this.state == 0) {
			this.moveInterv -= ctx.dt;
			if (this.moveInterv <= 0) {
				this.moveTo(MathUtil.rndNum(this.thinkLeft, this.thinkRight), MathUtil.rndNum(this.thinkTop, this.thinkBottom));
			}
		}
	}

	public update(ctx) {
		this.aithink(ctx);
		var self = this;
		if (self.state == 1) {
			var now = egret.getTimer();
			var perc = (now - self.starttime) / self.moveTime;
			if (perc > 1) {
				perc = 1;
				self.state = 0;
				self.role.move_state = 0;
				self.role.invalid |= 1;
				this.moveInterv = MathUtil.rndNum(3000, 7000);
			}
			self.role.x = self.sx + self.lenx * perc;
			self.role.y = self.sy + self.leny * perc;
		}
	}

	public moveTo(dx, dy) {
		dy = Math.max(this.top, Math.min(this.bottom, dy));

		var self = this;

		self.state = 1;
		self.starttime = egret.getTimer();
		self.sx = self.role.x;
		self.sy = self.role.y;
		self.lenx = dx - self.role.x;
		self.leny = dy - self.role.y;

		self.role.move_state = 1;
		self.role.faceX(dx);
		self.role.invalid |= 1;

		self.moveTime = MoveUtil.distSqrt(self.role.x, self.role.y, dx, dy) * 30 / self.role.movespeed;
	}

	public onAdd() {
		this.moveInterv = MathUtil.rndNum(3000, 7000);
	}

	public onRemove() {
	}
}