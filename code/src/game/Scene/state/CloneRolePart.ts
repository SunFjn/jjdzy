class CloneRolePart {
	private static POOL = [];
	public static create(): CloneRolePart {
		var p = CloneRolePart.POOL;
		if (p.length) {
			return p.shift();
		}
		return new CloneRolePart();
	}

	public constructor() {
	}

	public role: SceneCharRole;
	public remainTime = 2500;
	public autoRemove = 1;//自动移除
	public aniTime = 0;
	public aniInterv = 1000;
	public parts: Parts;
	public attack_index = 0;
	public offx = 0;
	public offy = 0;
	public scaleX = 1;

	public update(ctx) {
		var self = this;
		self.remainTime -= ctx.dt;
		self.aniTime += ctx.dt;
		var perc = self.aniTime / self.aniInterv;
		self.parts.perc = perc;
		if (self.remainTime <= 0) {
			ctx.d = 1;
		}
	}

	public onAdd() {
		let self = this;
		if (!self.parts) {
			self.parts = new Parts();
		}
		self.parts.x = self.offx;
		self.parts.y = self.offy;
		self.parts.scaleX = self.scaleX;
		self.role.view.addChild(self.parts);
		var body: Part = self.parts.dic[1];
		if (!body) {
			body = Part.create();
			body.type = 1;
			body.dep = 5;
			self.parts.addPart(body);
		}
		var urlkey;
		var weaponkey;
		var actkey = 1;
		var weaponpic = self.role.godWeaponpic ? self.role.godWeaponpic : self.role.weaponpic;
		if (self.attack_index > 10) {
			urlkey = "body/" + self.role.body + "/skill_0" + (self.attack_index % 10) + "/ani";
			if (weaponpic) {
				weaponkey = "weapon/" + weaponpic + "/skill_0" + (self.attack_index % 10) + "/ani";
			}
		} else {
			urlkey = "body/" + self.role.body + "/attack_0" + self.attack_index + "/ani";
			if (weaponpic) {
				weaponkey = "weapon/" + weaponpic + "/attack_0" + self.attack_index + "/ani";
			}
		}
		self.parts.ptype = Parts.DIS_REAPEAT;
		if (urlkey) {
			self.parts.setPart(1, urlkey);
		}
		if (weaponpic) {
			var weapon: Part = self.parts.dic[2];
			if (!weapon) {
				weapon = Part.create();
				weapon.type = 2;
				weapon.dep = 6;
				self.parts.addPart(weapon);
			}
			self.parts.setPart(2, weaponkey);
		}
		self.parts.setVal(actkey);
	}

	public onRemove() {
		let self = this;
		self.aniTime = 0;
		self.scaleX = 1;
		self.parts.removePartExceptBody();
		if (self.role) {
			self.role.view.removeChild(self.parts);
		}
		self.role = null;
		if (CloneRolePart.POOL.indexOf(self) == -1) CloneRolePart.POOL.push(self);
	}

	public onEvent(evt, arg) {

	}
}