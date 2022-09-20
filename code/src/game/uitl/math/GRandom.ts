class GRandom {
	public constructor() {
	}

	public maxshort = 65535;
	public mul = 1194211693;
	public adder = 12345;

	public seed = 0;

	public counter = 0;
	public times = 0;
	public avarange = 0;

	/**产生0-1的浮点数*/
	public random() {
		var self = this;
		var seed = self.seed;
		seed = (seed + 1) * (seed + 3) * (seed + 9);
		seed = (seed % 1000) >> 0;
		var ret = seed / 1000;

		// if(1) {
		// 	self.times++;
		// 	self.counter += ret;
		// 	self.avarange = self.counter / self.times;
		// 	if(GRandom.logFunc) {
		// 		GRandom.logFunc("random:" + "seed=" + self.seed + "rnd=" + ret);
		// 	}else{
		// 		console.log("random:" + "seed=" + self.seed + "rnd=" + ret);
		// 	}
		// }
		self.seed++;
		if(self.seed > 1000) {
			self.seed = 1;
		}
		return ret;
	}

	public rndNum(min:number, max:number, fix:number=100) {
		var rnd = min + this.random() * (max - min);
		rnd = (rnd * fix) >> 0;
		return rnd / fix;
	}

	/**产生0-1000的整数*/
	public randomInt() {
		var self = this;
		var seed = self.seed;
		seed = (seed + 1) * (seed + 3) * (seed + 9);
		seed = (seed % 1000) >> 0;
		var ret = seed;
		self.seed++;
		if(self.seed > 1000) {
			self.seed = 1;
		}
		return ret;
	}
}