/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


class ChildSuperMarbles extends fairygui.GComponent {

	public n15: fairygui.GLoader;
	public ball: fairygui.GImage;
	public n16: fairygui.GLoader;
	public btnReset: fairygui.GButton;
	public btnShot1: fairygui.GButton;
	public btnShot5: fairygui.GButton;
	public btnPre: fairygui.GButton;
	public btnShop: fairygui.GButton;
	public lbTips: fairygui.GRichTextField;
	public lbTime: fairygui.GRichTextField;
	public n19: fairygui.GImage;
	public n20: fairygui.GImage;
	public lbScore: fairygui.GRichTextField;
	public n23: fairygui.GImage;
	public n24: fairygui.GImage;
	public btnDesc: fairygui.GRichTextField;
	public lbPrice0: fairygui.GRichTextField;
	public lbPrice1: fairygui.GRichTextField;
	public lbreset: fairygui.GRichTextField;
	public linkLb: fairygui.GRichTextField;
	public card0: SMCard;
	public card1: SMCard;
	public card2: SMCard;
	public card3: SMCard;
	public card4: SMCard;
	public card5: SMCard;
	public card6: SMCard;
	public ball0: fairygui.GImage;
	public ball1: fairygui.GImage;
	public ball2: fairygui.GImage;
	public ball4: fairygui.GImage;
	public ball3: fairygui.GImage;
	public ball5: fairygui.GImage;
	public ball7: fairygui.GImage;
	public ball6: fairygui.GImage;
	public ball8: fairygui.GImage;
	public ball16: fairygui.GImage;
	public ball15: fairygui.GImage;
	public ball17: fairygui.GImage;
	public ball33: fairygui.GImage;
	public ball18: fairygui.GImage;
	public ball20: fairygui.GImage;
	public ball34: fairygui.GImage;
	public ball35: fairygui.GImage;
	public ball36: fairygui.GImage;
	public ball37: fairygui.GImage;
	public ball10: fairygui.GImage;
	public ball9: fairygui.GImage;
	public ball11: fairygui.GImage;
	public ball21: fairygui.GImage;
	public ball22: fairygui.GImage;
	public ball23: fairygui.GImage;
	public ball38: fairygui.GImage;
	public ball24: fairygui.GImage;
	public ball26: fairygui.GImage;
	public ball39: fairygui.GImage;
	public ball40: fairygui.GImage;
	public ball12: fairygui.GImage;
	public ball14: fairygui.GImage;
	public ball13: fairygui.GImage;
	public ball28: fairygui.GImage;
	public ball27: fairygui.GImage;
	public ball29: fairygui.GImage;
	public ball30: fairygui.GImage;
	public ball31: fairygui.GImage;
	public ball32: fairygui.GImage;
	public ball41: fairygui.GImage;
	public ball42: fairygui.GImage;
	public ball43: fairygui.GImage;
	public ball25: fairygui.GImage;
	public ball44: fairygui.GImage;
	public ball19: fairygui.GImage;

	public static URL: string = "ui://gf2tw9lz7jlm0";
	public static pkg = "superMarbles";
	public static createInstance(): ChildSuperMarbles {
		return <ChildSuperMarbles><any>(fairygui.UIPackage.createObject("superMarbles", "ChildSuperMarbles"));
	}


	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(SuperMarblesItem.URL, SuperMarblesItem);
		f(SuperMarblesPoolItem.URL, SuperMarblesPoolItem);
		f(SMCard.URL, SMCard);
	}

	public constructor() {
		super();
	}

	dispose() {
		super.dispose();
	}

	paths: any[];
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
		self.paths = [];
		self.paths[0] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball3, self.ball7, self.ball6, self.ball16, self.ball15, self.ball33];
		self.paths[1] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball3, self.ball7, self.ball6, self.ball16, self.ball17, self.ball34];
		self.paths[12] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball3, self.ball7, self.ball8, self.ball19, self.ball18, self.ball35];
		self.paths[2] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball3, self.ball7, self.ball8, self.ball19, self.ball20, self.ball36];
		self.paths[24] = [self.ball0, self.ball1, self.ball2, self.ball10, self.ball9, self.ball22, self.ball21, self.ball37];
		self.paths[3] = [self.ball0, self.ball1, self.ball2, self.ball10, self.ball9, self.ball22, self.ball23, self.ball38];
		self.paths[36] = [self.ball0, self.ball1, self.ball2, self.ball10, self.ball11, self.ball25, self.ball24, self.ball39];
		self.paths[4] = [self.ball0, self.ball1, self.ball2, self.ball10, self.ball11, self.ball25, self.ball26, self.ball40];
		self.paths[48] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball5, self.ball13, self.ball12, self.ball28, self.ball27, self.ball41];
		self.paths[5] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball5, self.ball13, self.ball12, self.ball28, self.ball29, self.ball42];
		self.paths[51] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball5, self.ball13, self.ball14, self.ball31, self.ball30, self.ball43];
		self.paths[6] = [self.ball0, self.ball1, self.ball2, self.ball4, self.ball5, self.ball13, self.ball14, self.ball31, self.ball32, self.ball44];
	}

	public initView(pParent: fairygui.GObject) {

	}


	private onUpdate() {
		const end = this._vo ? this._vo.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			this.lbTime.text = "00:00:00";
		}
	}

	clickPre = () => {
		GGlobal.layerMgr.open(UIConst.ACTCOMCJDZ_POOL);
	}

	clickShop = () => {
		GGlobal.layerMgr.open(UIConst.ACTCOMCJDZ_SHOP);
	}

	clickDesc = () => {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOMCJDZ);
	}

	clickRest = () => {
		GGlobal.modelSuperMarbles.CG_reset();
	}

	clickShot1 = () => {
		this.playType = 1;
		GGlobal.modelSuperMarbles.CG_reOptAwards(1);
	}

	clickShot5 = () => {
		this.playType = 5;
		GGlobal.modelSuperMarbles.CG_reOptAwards(2);
	}

	private openGaiLV(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.GAILV, 12);
	}


	price = 0;
	temp = [];
	tempLen = 0;
	update = (data?) => {
		const self = this;
		if (self.inAnimation) {
			return;
		}
		const model = GGlobal.modelSuperMarbles;
		if (data) {
			self.cleanTween();
			self.inAnimation = 1;
			self.animationData = data[0];
			self.tempLen = self.animationData.length;
			self.temp = data[1];
			Timer.listen(self.doAnimation, self, 50);
			self.btnShot5.enabled = false;
			self.btnShot1.enabled = false;
			for (let i = 0; i < self.cards.length; i++) {
				self.cards[i].touchable = false;
			}
		} else {
			let data = model.pools;
			for (let i = 0; i < self.cards.length; i++) {
				self.cards[i].setdata(data[i], i);
			}
		}
		let priceContent = JSON.parse(ConfigHelp.getSystemDesc(7910));
		let price = priceContent[model.closeNum];
		self.price = price[1];
		self.lbPrice0.text = self.price + "";
		self.lbPrice1.text = (self.price * 5) + "";
		self.lbScore.text = model.score + "";
		self.lbTips.text = "屏蔽奖励后，弹珠不会掉落到该品质奖励槽中\n再抽取" + (5 - model.shotTime) + "/5次重置奖池";
		let content = ConfigHelp.getSystemDesc(7912);
		self.lbreset.text = JSON.parse(content)[0][2] + "";
	}

	inAnimation = 0;
	speed = 3;
	doAnimation = () => {
		const self = this;
		if (!self.animationData.length) {
			return;
		}
		let data = self.animationData.shift();
		let ball0 = new fairygui.GLoader();
		ball0.url = "ui://gf2tw9lz77k99";
		let idx = self.ball1.parent.getChildIndex(self.ball1);
		self.ball1.parent.addChildAt(ball0, idx);
		let pos = data.idx;
		let path = self.paths[pos - 1].concat();

		let len = path.length;
		let node = path.shift();
		ball0.data = path;
		ball0.setXY(node.x, node.y)
		self.tweenBalls.push(ball0);
		self.ballMoveComplete(ball0);
	}

	playType = 1;
	ballMoveComplete(ball0: fairygui.GLoader) {
		const self = this;
		let path = ball0.data;//存路径以及方向
		if (!path || path.length == 0) {
			self.tempLen--;
			let idx = self.tweenBalls.indexOf(ball0);
			self.tweenBalls.splice(idx, 1);
			if (self.tweenBalls.length == 0 && self.tempLen <= 0) {
				if (self.playType == 1) {
					ViewSuperMarblesShow.show(UIConst.ACTCOM, self.playType, Handler.create(self, self.clickShot1), self.temp, self.price, 0, 0);
				} else {
					ViewSuperMarblesShow.show(UIConst.ACTCOM, self.playType, Handler.create(self, self.clickShot5), self.temp, self.price, 0, 0);
				}
				self.inAnimation = 0;
				self.cleanTween();
				self.update();
			}
			return;
		}
		self.inAnimation = 1;
		let target: any = path.shift();
		let dist = MathUtil.dist(ball0.x, ball0.y, target.x, target.y);
		let time = Math.sqrt(dist) / self.speed * 10;
		egret.Tween.get(ball0).to({ x: target.x, y: target.y }, time).call(self.ballMoveComplete, self, [ball0]);
	}

	cleanTween() {
		const self = this;
		self.animationData = [];
		self.btnShot5.enabled = true;
		self.btnShot1.enabled = true;
		while (self.tweenBalls && self.tweenBalls.length) {
			let ball = self.tweenBalls.shift();
			egret.Tween.removeTweens(ball);
			ball.removeFromParent();
		}
		for (let i = 0; i < self.cards.length; i++) {
			self.cards[i].touchable = true;
		}
		self.tempLen = 0;
		self.tweenBalls = [];
	}

	eventFun = (v) => {
		const self = this;
		const fun = EventUtil.register;
		fun(v, self.btnPre, EventUtil.TOUCH, self.clickPre, self);
		fun(v, self.btnShop, EventUtil.TOUCH, self.clickShop, self);
		fun(v, self.btnDesc, EventUtil.TOUCH, self.clickDesc, self);
		fun(v, self.btnReset, EventUtil.TOUCH, self.clickRest, self);
		fun(v, self.btnShot1, EventUtil.TOUCH, self.clickShot1, self);
		fun(v, self.btnShot5, EventUtil.TOUCH, self.clickShot5, self);
		fun(v, self.linkLb, EventUtil.TOUCH, self.openGaiLV, self);
	}

	_vo: Vo_Activity;
	cards: SMCard[];
	tweenBalls: fairygui.GLoader[];
	animationData = [];
	_timerFlag = 0;
	public openPanel(pData?: Vo_Activity): void {
		let self = this;
		self._vo = pData;
		GGlobal.modelActivity.CG_OPENACT(self._vo.id);
		GGlobal.modelSuperMarbles.newQS = pData.qs;
		GGlobal.modelSuperMarbles.createCfg();
		self.cards = [self.card0, self.card1, self.card2, self.card3, self.card4, self.card5, self.card6];
		IconUtil.setImg(self.n15, Enum_Path.ACTCOM_URL + "cjdzbg.png");
		IconUtil.setImg(self.n16, Enum_Path.ACTCOM_URL + "cjdzbg1.png");
		self.eventFun(1);
		GGlobal.control.listen(UIConst.ACTCOMCJDZ, self.update, self);
		GGlobal.reddot.setCondition(UIConst.ACTCOMCJDZ, 0, false);
		GGlobal.reddot.notify(UIConst.ACTCOM);
		Timer.instance.listen(self.onUpdate, self, 1000);
	}

	/**销毁 */
	public closePanel(): void {
		let self = this;
		self.eventFun(0);
		Timer.instance.remove(self.onUpdate, self);
		Timer.remove(self.doAnimation, self);
		IconUtil.setImg(self.n15, null);
		IconUtil.setImg(self.n16, null);
		while (self.cards && self.cards.length) {
			self.cards.shift().clean();
		}
		self.cleanTween();
		GGlobal.control.remove(UIConst.ACTCOMCJDZ, self.update, self);
		self.inAnimation = 0;
	}
}