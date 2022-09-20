declare let QuickSDK;
class HLSDK {
	public async Login() {
	}

	public setKeepScreenOn() {
	}

	public ShareApp() {
	}

	//退出游戏:
	public exitApp() {
	}

	//监听微信右上角分享按钮
	public shareCallBack() {
	}

	private shareHandle() {

	}

	//获取用户信息（授权）:  
	public getUserInfo() {
	}

	//数据上报（注册）:打点时间：选服完成，到达创角页
	public RegisterReport() {
	}

	//充值 && 支付:
	public static payOrder(payParams) {
		var orderInfoJson = JSON.stringify(payParams);
		if (HLSDK.whalePbSDK) QuickSDK.pay(orderInfoJson, function (payStatusObject) {
			console.log('Qucik SDK GameDemo:下单通知' + JSON.stringify(payStatusObject));
		})
	}

	//数据上报（创建角色）:打点时间：创角完成，到达游戏页
	public ReportData(roleData) {
	}

	//客服系统:
	public Customer() {
	}

	public offline() {
	}

	public setNetWorkState() {
	}

	public getNetWorkState() {
	}

	public onShow() {
	}

	public onHide() {
	}

	public blackPlayerWarning() {
	}


	//鲸鱼自研SDK 以及联运SDK
	public static get whalePbSDK(): any {
		if (DEBUG) return null;
		return (window as any).QuickSDK;
	}

	/**选择服务器上报 */
	public static roleserver() {
	}

	/**进入游戏上报 */
	public static rolelogin() {
	}

	public static roleupdate(v = false) {
		let loginArg = GGlobal.loginArg;
		let voMine = Model_player.voMine;
		let roleInfo: any = new Object();
		roleInfo.isCreateRole = v;
		roleInfo.roleCreateTime = (new Date()).valueOf();
		roleInfo.uid = GameConfig.uid;
		roleInfo.username = GameConfig.username;
		roleInfo.serverId = GGlobal.zone;
		roleInfo.serverName = GGlobal.zoneName;
		if (!v) {
			roleInfo.userRoleName = voMine.name;
			roleInfo.userRoleId = voMine.id;
			roleInfo.userRoleBalance = voMine.yuanbao;
			roleInfo.vipLevel = voMine.viplv;
			roleInfo.userRoleLevel = voMine.level;
			roleInfo.gameRolePower = voMine.str;
		} else {
			roleInfo.userRoleName = ModelLogin.roleName;
			roleInfo.userRoleId = ModelLogin.roleID;
			roleInfo.userRoleBalance = 0;
			roleInfo.vipLevel = 0;
			roleInfo.userRoleLevel = 1;
			roleInfo.gameRolePower = 1;
		}
		roleInfo.partyId = 1;
		roleInfo.partyName = '无帮派';
		roleInfo.gameRoleGender = '男';
		roleInfo.partyRoleId = 1;
		roleInfo.partyRoleName = '会长';
		roleInfo.professionId = '1';
		roleInfo.profession = '武士';
		roleInfo.friendlist = '';
		var roleInfoJson = JSON.stringify(roleInfo);
		if (HLSDK.whalePbSDK) QuickSDK.uploadGameRoleInfo(roleInfoJson, function (response) {
		});
	}

	public static init(): void {
		if (HLSDK.whalePbSDK) {
			QuickSDK.setLogoutNotification(function (logoutObject) {
				window.location.reload();
				console.log('Game:玩家点击注销帐号');
			})
			QuickSDK.setSwitchAccountNotification(function (callbackData) {
				window.location.reload();
				console.log('Game:切换账号');
			});
		}
	}

	public static logout(): void {
		if (HLSDK.whalePbSDK) QuickSDK.logout(function (logoutObject) {
			console.log('Game:成功退出游戏');
		})
	}

}