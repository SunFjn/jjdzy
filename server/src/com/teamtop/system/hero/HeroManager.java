package com.teamtop.system.hero;

import java.net.SocketAddress;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;
import java.util.Set;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.houtaiHttp.events.adMark.adMarkCrossIO;
import com.teamtop.houtaiHttp.events.blackList.BlackListIO;
import com.teamtop.houtaiHttp.events.ipWhiteList.IpWhiteListIO;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoConst;
import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.houtaiHttp.events.rechargeWhiteList.RechargeWhiteListIO;
import com.teamtop.houtaiHttp.events.serverMaintain.ServerMaintainCache;
import com.teamtop.houtaiHttp.events.welfareNotice.WelfareNoticeCache;
import com.teamtop.houtaiHttp.events.whiteList.WhiteListIO;
import com.teamtop.netty.firewall.skyeye.SkyEyeCache;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.account.Account;
import com.teamtop.system.account.AccountDao;
import com.teamtop.system.actGift.ActGiftManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.DailyDirectBuyActFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossHeroesList.HeroesListFunction;
import com.teamtop.system.crossKing.local.CrossKingLocalCache;
import com.teamtop.system.crossKing.local.CrossKingManager;
import com.teamtop.system.crossKing.local.CrossKingSender;
import com.teamtop.system.crossMine.CrossMineFunction;
import com.teamtop.system.crossSoloRun.SoloRunSysCache;
import com.teamtop.system.dailyDirectBuy.DailyDirectBuyConst;
import com.teamtop.system.dailyDirectBuy.DailyDirectBuyFunction;
import com.teamtop.system.event.backstage.events.backstage.BackstageConst;
import com.teamtop.system.event.backstage.events.backstage.dao.HoutaiDao;
import com.teamtop.system.event.backstage.events.backstage.recharge.B_PayAccount;
import com.teamtop.system.event.backstage.events.backstage.register.B_Register;
import com.teamtop.system.event.backstage.events.backstage.roleInfo.B_RoleInfo;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.forge.ForgeFunction;
import com.teamtop.system.friends.FriendFunction;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.guanqia.GuanqiaFunction;
import com.teamtop.system.hero.platform.Platform;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.otherDailyDirectBuy.OtherDailyDirectBuyFunction;
import com.teamtop.system.rankNew.RankingCache;
import com.teamtop.system.rankNew.RankingConst;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankSender;
import com.teamtop.system.skill.SkillFunction;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.title.TitleModel;
import com.teamtop.system.weiXinShare.WeiXinShareFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.illiegalUtil.IlliegalUtil;
import com.teamtop.util.json.JsonUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.regexUtil.MD5;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_chongzhi_716;
import excel.config.Config_guanxian_701;
import excel.config.Config_mrzg1_256;
import excel.config.Config_mrzg2_256;
import excel.config.Config_mrzg3_256;
import excel.config.Config_shop_011;
import excel.config.Config_xtcs_004;
import excel.config.Config_zhuansheng_705;
import excel.struct.Struct_chongzhi_716;
import excel.struct.Struct_mrzg1_256;
import excel.struct.Struct_mrzg2_256;
import excel.struct.Struct_mrzg3_256;
import excel.struct.Struct_shop_011;
import io.netty.channel.Channel;

/**
 * ???????????????????????????
 *
 */
public class HeroManager {
	private static HeroManager ins = null;
	public static HeroManager getIns(){
		if(ins==null){
			ins = new HeroManager();
		}
		return ins;
	}

	// private Map<Long, Object> loginLockMap = new ConcurrentHashMap<Long,
	// Object>();
	private Object accLoginLock = new Object(); //?????????????????????
	
	/**
	 * ??????<br/>
	 * ???????????????????????????????????????????????????????????????????????????
	 * GC???????????????????????? B:??????????????????: 0???????????????,1???????????????????????????2????????????????????????????????????3????????????
	 * @param channel
	 * @param tx
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public void login(Channel channel,String data) throws Exception{
		Map<String,String> datamap = JsonUtils.jsonDecode(data, Map.class);
		String openid = datamap.get("account");
		String platform = datamap.get("platform");
		int zoneid=Integer.parseInt(datamap.get("zoneid"));
		//????????????
		String pfopenid=new String();
		if (datamap.get("openid")!=null) {
			pfopenid=datamap.get("openid");
		}
		//????????????
		String pfcode=new String();
		if (datamap.get("pfcode")!=null) {
			pfcode=datamap.get("pfcode");
		}
		// ???????????????????????? ??????'wxsgzj01-jy006-test001' ?????????:'wxsgzj01-jy006'
		String[] arr = pfcode.split("-");
		if (arr.length > 2) {
			pfcode = arr[0] + "-" + arr[1];
		}
		//????????????
		String usesys=new String();
		if (datamap.get("os")!=null) {
			usesys=datamap.get("os");
		}
		SocketAddress remoteAddress = channel.remoteAddress();
		String[] ipArr = remoteAddress.toString().split("\\:");
		String loginip =ipArr[0].substring(1, ipArr[0].length());
		//????????????
		String app_custom=new String();
		if (datamap.get("app_custom")!=null) {
			app_custom=datamap.get("app_custom");
		}
		LogTool.info("Login begin.Important.account:"+openid+",platform:"+platform+",zoneid:"+zoneid+" pfopenid:"+pfopenid+" pfcode:"+pfcode+" usesys:"+usesys+" app_custom:"+app_custom+",data:"+data, this);
		TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
		if(tempData.getHero()!=null){
			LogTool.warn("login fail,channel has bind hero",this);
			return;
		}
/*		//??????????????????????????????
		if(!checkBack(channel, tx)){
//			NettyWrite.writeData(channel, new Object[]{7,0}, HeroCmd.GC_ALLOW_LOGIN_102);
			channel.close();
			return;
		}*/
		//??????????????????????????????
		tempData.setOpenid(openid);
		tempData.setZoneid(zoneid);

		if(!GameProperties.zoneids.contains(zoneid)){
			LogTool.warn("zoneid:"+zoneid+", is wrong",this);
			channel.close();
			return;
		}
		//???????????????
		boolean isBlack = BlackListIO.getIns().checkBlackListLocal(openid, zoneid, channel);// ????????????
		if (isBlack) {
			return;
		}
		BlackListIO.getIns().checkBlackList(openid, zoneid, channel);// ???????????????
		// ???????????????????????????
		if (ServerMaintainCache.MAINTAIN_STATE == ServerInfoConst.OPEN_MAITAIN||ServerMaintainCache.MAINTAIN_STATE == ServerInfoConst.OPEN_WHITELIST) {
			// ??????????????????
			if (!WhiteListIO.getIns().checkWhiteListLocal(openid, zoneid)) {
				// ?????????????????? ?????? ?????????????????????
				NettyWrite.writeData(channel, new Object[] { ServerMaintainCache.CONTENT, 1 }, HeroCmd.GC_NoticeMsg_164);
				WhiteListIO.getIns().checkWhiteList(openid, zoneid);
				return;
			}
		}
//		WhiteListIO.getIns().checkWhiteList(openid, zoneid);
		Account account = null;
		B_Register b_Register=null;
		synchronized (accLoginLock) {
			account = AccountDao.getIns().find(openid,zoneid);
			b_Register=HoutaiDao.getIns().getB_RegisterByopenid(openid, zoneid);
			if(account==null){
				account = new Account();
				account.setOpenid(openid);
				account.setZoneid(zoneid);
				account.setOriopenid(openid);
				account.setCreatetime(TimeDateUtil.getCurrentTime());
				account.setCreateip(loginip);
				account.setPf(platform);
				account.setPd(platform);
				account.setVia(app_custom);
				account.setApp_custom(app_custom);
				account.setPf(pfcode);
				account.setPfcode(pfcode);
				account.setPfopenid(pfopenid);
				account.setUsesys(usesys);
				account.setLoginsys(usesys);
				AccountDao.getIns().insert(account);
				// ?????????????????????
				//LoginLoseEvent.setNewAccount(zoneid, tx.getPf(), tx.getPd());
			}else {
				account.setLoginsys(usesys);
				AccountDao.getIns().update(account);
			}
			if (b_Register==null) {
				b_Register=new B_Register();
				b_Register.setOpenid(openid);
				b_Register.setZoneid(zoneid);
				b_Register.setApp_custom(account.getApp_custom());
				b_Register.setCreateip(account.getCreateip());
				b_Register.setCreatetime(account.getCreatetime());
				b_Register.setPfcode(account.getPfcode());
				b_Register.setPfopenid(account.getPfopenid());
				b_Register.setUsesys(account.getUsesys());
				HoutaiDao.getIns().insertRegister(zoneid, b_Register);
			}
		}
		tempData.setAccount(account);
		tempData.setB_Register(b_Register);
		if(GameProperties.isServerOpen==0){
			LogTool.info("ServerOpen is 0", this);
			if (account.getIsmarket()==0) {
				//????????????
				return;
			}else {
				LogTool.info("is OPENER Openid:"+account.getOpenid(),this);
			}
			
		}
		//????????????
		Platform tx = new Platform(0, openid, pfopenid, "", platform, zoneid,"",loginip,"","","", app_custom, app_custom, "");
		
		long hid = account.getHid();
		if(hid==0){
			//????????????
			//??????????????????
			tempData.addAttribute(HeroEnum.plaform.toString(), tx);
			NettyWrite.writeData(channel, new Object[]{0}, HeroCmd.GC_Login_102);
			LogTool.info("Login end hid==0.create hero.Important.hid:"+hid,this);
			return;
		}
		// Object lock = loginLockMap.get(hid);
		// if(lock==null){
		// lock = new Object();
		// loginLockMap.put(hid, lock);
		// }
		// synchronized (lock) {
		// loginHandle(hid, channel, tempData, data, tx, pfcode, pfopenid, zoneid);
		// }
		String tempPfcode = pfcode;
		String tempPfopenid = pfopenid;
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				try {
					loginHandle(hid, channel, tempData, data, tx, tempPfcode, tempPfopenid, zoneid);
				} catch (Exception e) {
					LogTool.error(e, HeroManager.class, "HeroManager loginHandle");
				}
			}

			@Override
			public Object getSession() {
				return hid;
			}
		});
		LogTool.info("Login end.Important.hid:"+hid+" kaifu time:"+TimeDateUtil.printTime(GameProperties.serverOpenTime),this);
	}
	
	public void loginstate(Channel channel, int state) {
		try {
			TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
			Account account =tempData.getAccount();
			if (account==null) {
				LogTool.warn("account==null has wrong",  HeroManager.class);
				return;
			}
			account.setLoginstate(state);
			AccountDao.getIns().update(account);
		} catch (Exception e) {
			LogTool.error(e, HeroManager.class, "loginstate has wrong :"+state);
		}
		
	}
	
	/**
	 * ??????hero
	 * 106	B	GC???????????? B:??????1?????????????????????2????????????,3????????????
	 * @param channel
	 * @param job
	 * @param sex
	 */
	public synchronized void create(Channel channel,int job,String name){
		if(job==0|| job>3){
			LogTool.warn("job is "+job,this);
			return;
		}
		TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
		if(tempData.getHero()!=null){
			return;
		}
		Account acc = tempData.getAccount();
//		String name = acc.getOpenid();
		
		// ???????????????????????????
		String friendOpenId = "";
		int friendZoneId = 0;
		if(name.indexOf("_")!=-1) {
			// ????????????????????????
			friendOpenId = name.split("_")[1];
			friendZoneId = Integer.valueOf(name.split("_")[2]);
			name = name.split("_")[0];
		}
				
		int betweenOpen = TimeDateUtil.betweenOpen();
		int currentTime = TimeDateUtil.getCurrentTime();
		//??????openId
		if(!IlliegalUtil.isNameIll(name, 12)){
			LogTool.warn("openid:"+name+", is illegal!!",this);
			NettyWrite.writeData(channel, new Object[] { 3, job, 0, betweenOpen, currentTime }, HeroCmd.GC_Create_106);
			return;
		}
		//??????openid????????????
		int zoneid = acc.getZoneid();
		try {
			// ???????????????
			String openid = acc.getOpenid();
			boolean isBlack = BlackListIO.getIns().checkBlackListLocal(openid, zoneid, channel);// ????????????
			if (isBlack) {
				return;
			}
			BlackListIO.getIns().checkBlackList(openid, zoneid, channel);// ???????????????
			// ???????????????????????????
			if (ServerMaintainCache.MAINTAIN_STATE == ServerInfoConst.OPEN_MAITAIN
					|| ServerMaintainCache.MAINTAIN_STATE == ServerInfoConst.OPEN_WHITELIST) {
				// ??????????????????
				if (!WhiteListIO.getIns().checkWhiteListLocal(openid, zoneid)) {
					// ?????????????????? ?????? ?????????????????????
					NettyWrite.writeData(channel, new Object[] { ServerMaintainCache.CONTENT, 1 },
							HeroCmd.GC_NoticeMsg_164);
					WhiteListIO.getIns().checkWhiteList(openid, zoneid);
					return;
				}
			}
//			WhiteListIO.getIns().checkWhiteList(openid, zoneid);
			Long tempHid = HeroDao.getIns().findHidByOpenid(acc.getOpenid(), acc.getZoneid());
			if(tempHid != null){
				//???????????????
//				NettyWrite.writeData(channel, new Object[]{4},HeroCmd.GC_CREATE_ROLE_106);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e,this);
			return;
		}
		
		String ip = SkyEyeCache.getIp(channel);
		// ??????ip????????????
		if (IpWhiteListIO.getIns().checkIpLimit(tempData.getAccount(), tempData, true)) {
			return;
		}
//		String loginPf = (String) tempData.getAttribute(HeroEnum.pf.name());
		String loginPd = (String) tempData.getAttribute(HeroEnum.pd.name());
		Hero hero = new Hero();
		hero.setTempData(tempData);
		hero.setAid(acc.getId());
		hero.setJob(job);
		hero.setCreateJob(job);
		hero.setLevel(1);
		hero.setNowCreate(1);
//		name = "def#"+name;
		hero.setName(name);
		hero.setOpenid(acc.getOpenid());
		hero.setPf(acc.getPf());
		hero.setPd(acc.getPd());
		hero.setZoneid(zoneid);
		hero.setCreateTime(currentTime);
		hero.setCreateIp(ip);
		hero.setLoginIp(ip);
		hero.setLoginPf(acc.getPfcode());
		hero.setLoginPd(loginPd);
		//??????????????????
		hero.setLoginTime(currentTime);
		hero.getTempVariables().setLoginTemp(currentTime);
		hero.setLoginIp(ip);
		Platform tx = (Platform) tempData.getAttribute(HeroEnum.plaform.name());
		hero.setLoginPlatform(tx);
		try {
			HeroDao.getIns().insert(hero);
		} catch (Exception e) {
			//???????????????
			LogTool.error(e,this, "createHero err,name:"+name);
			NettyWrite.writeData(channel, new Object[] { 2, job, 0, betweenOpen, currentTime }, HeroCmd.GC_Create_106);
			return;
		}
		long hid = hero.getId();
		try {
			acc.setHid(hid);
			AccountDao.getIns().update(acc);
		} catch (Exception e) {
			LogTool.error(e,this);
			NettyWrite.writeData(channel, new Object[] { 0, job, 0, betweenOpen, currentTime }, HeroCmd.GC_Create_106);
			return;
		}
		try {
			B_Register b_Register = tempData.getB_Register();
			b_Register.setId(hid);
			b_Register.setName(name);
			b_Register.setJob(job);
			HoutaiDao.getIns().updateB_Register(zoneid, b_Register);
		} catch (Exception e) {
			LogTool.error(e, HeroManager.class, "update M_re has wrong");
			NettyWrite.writeData(channel, new Object[] { 0, job, hid, betweenOpen, currentTime },
					HeroCmd.GC_Create_106);
			return;
		}
		addB_RoleInfo(hero);				
		NettyWrite.writeData(channel, new Object[] { 1, job, hid, betweenOpen, currentTime }, HeroCmd.GC_Create_106);
//		Scene scene = initScene(hid);
//		hero.setScene(scene);
		//??????hero???channel,???????????????hero??????
		bindHeroChannel(channel,hero);
		hero.setLoginRecalc(true);
//		SystemEventFunction.triggerInitEvent(hero);
		tempData.addAttribute(HeroEnum.id.name(), hid);
		//????????????
		tempData.addAttribute(HeroEnum.ip.name(), ip);
		//???????????????
		adMarkCrossIO.getIns().checkAdMark(hero);
		
		// ?????????????????????
		if(friendZoneId != 0) {
			if(!hero.getOpenid().equals(friendOpenId)) {
				hero.getWeixinshare().setOpenId(friendOpenId);
				hero.getWeixinshare().setZoneId(friendZoneId);
				WeiXinShareFunction.getIns().noticFriend(hero);
			}
		}
	}
	
	private void addB_RoleInfo(Hero hero) {
		try {
			int currentTime = TimeDateUtil.getCurrentTime();
			String openid=hero.getOpenid();
			int zoneid=hero.getZoneid();
			TempData tempData = hero.getTempData();
			if (tempData == null) {
				LogTool.warn("tempData==null" + hero.getId() + "openid:" + hero.getOpenid(), this);
				return;
			}
			Account account = tempData.getAccount();
			if (account==null) {
				LogTool.warn("account==null"+hero.getId()+"openid:"+hero.getOpenid(), this);
				return;
			}
			if (HoutaiDao.getIns().getB_RoleInfoByopenid(openid, zoneid)==null) {
				B_RoleInfo m_RoleInfo=new B_RoleInfo();
				m_RoleInfo.setOpenid(openid);
				m_RoleInfo.setId(hero.getId());
				m_RoleInfo.setZoneid(zoneid);
				m_RoleInfo.setPfopenid(account.getPfopenid());
				m_RoleInfo.setPfcode(account.getPfcode());
				m_RoleInfo.setUsesys(account.getUsesys());
				m_RoleInfo.setCreateip(account.getCreateip());
				m_RoleInfo.setName(hero.getName());
				m_RoleInfo.setLevel(hero.getLevel());
				m_RoleInfo.setTotalStrength(hero.getTotalStrength());
				m_RoleInfo.setCoin(hero.getCoin());
				m_RoleInfo.setYuanbao(hero.getYuanbao());
				m_RoleInfo.setVip(hero.getVipLv());
				m_RoleInfo.setApp_custom(account.getApp_custom());
				m_RoleInfo.setSumMoney(hero.getChongZhiYuan());
				m_RoleInfo.setIsOld(hero.getIsOldPlayer());
				m_RoleInfo.setCreateHeroTime(hero.getCreateTime());
				m_RoleInfo.setRegisterTime(account.getCreatetime());
				m_RoleInfo.setUpdateTime(currentTime);
				m_RoleInfo.setReincarnationLevel(hero.getReincarnationLevel());
				HoutaiDao.getIns().insertB_RoleInfo(zoneid, m_RoleInfo);
			}
			
		} catch (Exception e) {
			LogTool.error(e, this, "M_RoleInfoEvent has wrong");
		}
	}
	
	private void loginHandle(long hid, Channel channel, TempData tempData, String data, Platform tx, String pfcode,
			String openid, int zoneid) throws Exception {
		LogTool.info("Login loading start.Important.hid:"+hid,this);
		int forbidState = 0;
		int forbidTimeout = 0;
		Hero hero = HeroCache.getHero(hid);
		if(hero!=null){
			forbidState = hero.getForbidState();
			forbidTimeout = hero.getForbidTimeout();
			//????????????????????????
			if(!checkFenghaoHandle(channel, tx, forbidState, forbidTimeout)){
				NettyWrite.writeData(channel, new Object[]{(byte)hero.getForbidState()}, HeroCmd.GC_FengHao_142);
				channel.close();
				return;
			}
			Channel oldCh = hero.getChannel();
			if(oldCh!=null){
				//????????? ???????????????2000ms???????????????
				LogTool.info(hero.getId(), hero.getNameZoneid(), "replace login",this);
				NettyWrite.writeData(oldCh, new Object[]{0}, HeroCmd.GC_OffLine_140);
				HeroFunction.getIns().logout(hero, BackstageConst.M_LOGINOUT_OPER_FORCE_OFFLINE);
				oldCh.close();
				Thread.sleep(2000);
				login(channel, data);//TODO ????????????
				return;
			}
		}else{
			LightLoginHero lightHero = HeroDao.getIns().findHeroLoginBase(hid);
			if(lightHero==null) return;
			forbidState = lightHero.getForbidState();
			forbidTimeout = lightHero.getForbidTimeout();
			//????????????????????????
			if(!checkFenghaoHandle(channel, tx, forbidState, forbidTimeout)){
				NettyWrite.writeData(channel, new Object[]{(byte)forbidState}, HeroCmd.GC_FengHao_142);
				channel.close();
				return;
			}
		}
		String ip = SkyEyeCache.getIp(channel);
		if (IpWhiteListIO.getIns().checkIpLimit(tempData.getAccount(), tempData, false)) {
			return;
		}
		tempData.addAttribute(HeroEnum.id.name(), hid);
		//????????????
		tempData.addAttribute(HeroEnum.ip.name(), ip);
		
//		NettyWrite.writeData(channel, new Object[]{2,0}, HeroCmd.GC_ALLOW_LOGIN_102);
		if(hero==null){
			try {
				hero = HeroDao.getIns().find(hid,null);
			} catch (Exception e) {
				LogTool.error(e,this,"id:"+hid);
			}
			HeroCache.removeTempHero(hid);
//			checkScene(hero);
		}
		//??????????????????	*//	
		if(forbidState==HeroConst.STATE_FORBID_FENG_HAO || forbidState==HeroConst.STATE_FORBID_FENG_HAO_HANDLE
				|| forbidState==HeroConst.STATE_FORBID_PRIVILEGE){
			
			if(TimeDateUtil.getCurrentTime()>=forbidTimeout){
				hero.setForbidState(HeroConst.STATE_FORBID_NORMAL);
			}
		}
		
		hero.getTempVariables().setLogoutState(false);
		bindHeroChannel(channel, hero);
		//hero????????????????????????
		if(!checkIllega(forbidState, forbidTimeout, openid)){
			NettyWrite.writeData(channel, new Object[]{(byte)hero.getForbidState()}, HeroCmd.GC_FengHao_142);
			channel.close();
			return;
		}
		hero.setLoginRecalc(true);
		hero.setLoginIp(ip);
		hero.setLoginPf(pfcode);
		hero.setLoginPd(tx.getPd());
		hero.setLoginPlatform(tx);
		NettyWrite.writeData(channel, new Object[]{1}, HeroCmd.GC_Login_102);
		try {
			//???????????????????????????????????????
			HeroDao.getIns().updateLoginPf(hid, hero.getLoginPf(), hero.getLoginPd(), zoneid);
		} catch (Exception e) {
			LogTool.error(e,this,"id:"+hid);
		}
//		SystemEventFunction.triggerInitEvent(hero);
		hero.getTempVariables().setLoginTemp(TimeDateUtil.getCurrentTime());
		hero.setLoginTime(TimeDateUtil.getCurrentTime());
		B_Register b_Register = tempData.getB_Register();
		if (b_Register != null && b_Register.getJob() == 0) {
			b_Register.setJob(hero.getCreateJob());
			HoutaiDao.getIns().updateB_Register(zoneid, b_Register);
		}
		LogTool.info("Login loading end.Important.hero "+hero.getId()+","+hero.getNameZoneid(),this);
		adMarkCrossIO.getIns().checkAdMark(hero);
	}
	
	/**
	 * ??????????????????????????????????????????????????????????????????
	 * @param hero
	 */
	public void loadAlready(Hero hero) {
		SevenWuShenRankSender.sendCmd_2300(hero.getId(), TimeDateUtil.betweenOpen());
		SystemEventFunction.triggerInitEvent(hero);
		// ??????login reset??????
		SystemEventFunction.triggerLoginResetEvent(hero);
		// ??????login??????
		SystemEventFunction.triggerLoginEvent(hero);
		// ??????afterLogin??????
		SystemEventFunction.triggerAfterLoginEvent(hero);
		hero.getTempVariables().setLoginSuccess(true);
		
		// ?????????????????????
		sendSystemState(hero);
		// ????????????
		RedPointFunction.getIns().sendLoginRedPoint(hero);

		// ?????????????????????
		Map<Long, SpecialRechargeInfo> waitRechargeMap = hero.getWaitRechargeMap();
		if (waitRechargeMap.size() > 0) {
			Set<Long> pidSet = new HashSet<>(waitRechargeMap.keySet());
			for (long cpOrderNum : pidSet) {
				SpecialRechargeInfo rechargeInfo = waitRechargeMap.remove(cpOrderNum);
				if (rechargeInfo != null) {
					byte gm = rechargeInfo.getGm();
					boolean isGm = false;
					if(gm==1) {
						isGm = true;
					}
					HeroFunction.getIns().rechargeHero(rechargeInfo.getHid(), isGm,
							rechargeInfo.getProduct_id(), rechargeInfo.getParamMap(), rechargeInfo.getParameters());
				}
			}
		}
	}
	
	private void sendSystemState(Hero hero) {
		try {
			Map<Integer, Integer> systemStateMap = hero.getSystemStateMap();
			if (systemStateMap.size() > 0) {
				List<Object[]> stateList = new ArrayList<>();
				Iterator<Entry<Integer, Integer>> iterator = systemStateMap.entrySet().iterator();
				Entry<Integer, Integer> entry = null;
				for (; iterator.hasNext();) {
					entry = iterator.next();
					stateList.add(new Object[] { entry.getKey(), entry.getValue() });
				}
				HeroSender.sendCmd_158(hero.getId(), stateList.toArray());
			}
			systemStateMap.clear();
		} catch (Exception e) {
			LogTool.error(e, HeroManager.class, hero.getId(), hero.getName(), "sendSystemState error");
		}
	}
	
	/**
	 * ??????????????????
i. PF=union-$id-$id*qqgame??????????????????qqgame?????????????????????????????????????????????qqgame??????????????????????????????
ii. PF=union-$id-$id*qzone??????????????????qzone?????????????????????????????????????????????qzone??????????????????????????????
iii. PF=union-$id-$id*pengyou??????????????????pengyou?????????????????????????????????????????????pengyou??????????????????????????????
iv. PF=union-$id-$id*3366??????????????????3366?????????????????????????????????????????????3366??????????????????????????????

v. PF=union-$id-$id*website???????????????????????????????????????????????????????????????????????????????????????????????????
vi. PF=union-$id-$id*union-10029-$id?????????????????????????????????????????????????????????????????????????????????????????????????????????iwan????????????????????????iwan????????????????????????????????????????????????iwan????????????

vii. PF=union-$id-$id*union-10153-$id??????????????????TGP?????????????????????????????????????????????TGP?????????????????????
viii. PF=union-$id-$id*union-10194-$id??????????????????QQ????????????????????????????????????????????????????????????????????????????????????
ix. PF=union-$id-$id*union-10210-$id????????????????????????????????????????????????????????????????????????????????????????????????????????????
	 * @param pf
	 * @return ???????????? 
	 */
	private String handlerPf(String pf,Hero hero){
		String loginpf = null;
		//????????????????????????
		if(StringUtils.indexOf(pf,"*")>0){
			String[] pfs = StringUtils.split(pf, "*");
			//??????????????????
			loginpf = pfs[1];
		}else{
			loginpf=pf;
		}
		/*if(StringUtils.indexOf(loginpf, "union")!=-1){
			if(StringUtils.indexOf(pf, "10029")!=-1){
				//PF=union-$id-$id*union-10029-$id??????????????????????????????????????????????????????????????????????????????????????????????????????
				hero.setLoginDiamondPf(PfConst.PF_TX_QQGAME);
			}else if(StringUtils.indexOf(pf, "10153")!=-1){
				//PF=union-$id-$id*union-10153-$id??????????????????TGP?????????????????????????????????????????????TGP?????????????????????
				hero.setLoginDiamondPf(PfConst.PF_TX_QQGAME);
			}else if(StringUtils.indexOf(pf, "10194")!=-1){
				//PF=union-$id-$id*union-10194-$id??????????????????QQ????????????????????????????????????????????????????????????????????????????????????
				hero.setLoginDiamondPf(PfConst.PF_TX_QQGAME);
			}else if(StringUtils.indexOf(pf, "10210")!=-1){
				//ix. PF=union-$id-$id*union-10210-$id????????????????????????????????????????????????????????????????????????????????????????????????????????????
				hero.setLoginDiamondPf(PfConst.PF_TX_QQGAME);
			}
		}*/
		return loginpf;
	}
	
	/**
	 * ????????????????????????
	 * @param pf
	 * @return
	 */
	private String aiwanPfHandler(String pf){
		if(StringUtils.indexOf(pf, "union")!=-1){
			if(StringUtils.indexOf(pf, "10029")!=-1){
				//PF=union-$id-$id*union-10029-$id??????????????????????????????????????????????????????????????????????????????????????????????????????
			}else if(StringUtils.indexOf(pf, "10153")!=-1){
				//PF=union-$id-$id*union-10153-$id??????????????????TGP?????????????????????????????????????????????TGP?????????????????????
			}else if(StringUtils.indexOf(pf, "10194")!=-1){
				//PF=union-$id-$id*union-10194-$id??????????????????QQ????????????????????????????????????????????????????????????????????????????????????
			}else if(StringUtils.indexOf(pf, "10210")!=-1){
				//ix. PF=union-$id-$id*union-10210-$id????????????????????????????????????????????????????????????????????????????????????????????????????????????
			}
			return pf;
		}else{
			return pf;
		}
	}
	
	
	/**
	 * ??????????????????????????????
	 * @param channel
	 * @param tx
	 * @return true???????????????
	 */
	private boolean checkBack(Channel channel,Platform tx){
		try {
			if(GameProperties.platformValidate==1){
				if(tx.getLoginMode()==1){
					if(!LoginTool.loginMod1(channel, tx)){
						LogTool.warn("checkLoginTx fail,openid:"+tx.getOpenid()+",seqid:"+tx.getSeqid()+",openkey:"+tx.getOpenkey(),this);
						return false;
					}
				}else if(tx.getLoginMode()==2){
					//????????????2???????????????????????????????????????????????????
//					if(!LoginTool.loginMod2(channel, tx)){
//						logger.warn(LogFormat.rec("checkLoginTx fail,openid:"+tx.getOpenid()));
//						return false;
//					}
				}else{
					channel.close();
					return false;
				}
			}
		} catch (Exception e) {
			LogTool.error(e,this,"validate platform err");
			return false;
		}
		return true;
	}
	
	/**
	 * ????????????????????????
	 * @param channel
	 * @param tx
	 * @param forbidState
	 * @param forbidTimeout
	 * @return true????????????false????????????
	 */
	private boolean checkFenghaoHandle(Channel channel, Platform tx, int forbidState, int forbidTimeout){
		try {
			if(forbidState==HeroConst.STATE_FORBID_FENG_HAO_HANDLE){
				if(TimeDateUtil.getCurrentTime()<forbidTimeout){
					if(!LoginTool.loginMod2(channel, tx)){
						LogTool.warn("checkLoginTx fail,openid:"+tx.getOpenid(),this);
						return false;
					}
				}
			}else if(GameProperties.platformValidate==1){
				if(tx.getLoginMode()==2){
					if(!LoginTool.loginMod2(channel, tx)){
						LogTool.warn("checkLoginTx fail,openid:"+tx.getOpenid(),this);
						return false;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e,this,"validate platform err");
			return false;
		}
		return true;
	}
	
	/**
	 * ?????????????????????????????????
	 * @param forbidState
	 * @param openid
	 * @return true????????????
	 */
	private boolean checkIllega(int forbidState,int forbidTimeout,String openid){
		if(forbidState==HeroConst.STATE_FORBID_FENG_HAO || forbidState==HeroConst.STATE_FORBID_PRIVILEGE){
			if(TimeDateUtil.getCurrentTime()<forbidTimeout){
				//????????????
				return false;
			}
		}
		if(!SkyEyeCache.canLogin(openid) || !SkyEyeCache.canGoOnBadSpeed(openid)){
			//????????????
			return false;
		}
		return true;
	}
	/**
	 * ??????hero???channel,???????????????hero??????
	 * @param hero
	 * @param channel
	 */
	public void bindHeroChannel(Channel channel,Hero hero){
//		HeroCache.getIns().putConcurrentHashMapValue(HeroCache.HERO_MAP, hero.getId(), hero);
		HeroDataSaver.removeClearCache(hero);
		HeroCache.putHero(hero);
		TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
//		tempData.setAccount(account);
		tempData.setHero(hero);
		tempData.setSyncTime(TimeDateUtil.getCurrentTime()+GameProperties.SYNC_FIXTIME);
		hero.setTempData(tempData);
		LogTool.info(hero.getId(), hero.getNameZoneid(), "bindHeroChannel done",this);
	}
//	/**
//	 * ??????????????? 111
//	 * @param job| ??????| byte
//	 */
//	public void openGeneral(Hero hero, int job) {
//		if(job>GameConst.WUNV || job<GameConst.ZHANSHI) return;
//		Map<Integer, FinalFightAttr> finalFightAttrMap = hero.getFinalFightAttrMap();
//		int len = finalFightAttrMap.size();
//		if(len==1){
//			//?????????????????????
//			//????????????80?????????VIP2???????????????????????????
//			if(hero.getLevel()>=80 || hero.getVipLv()>=2){
//			}else{
//				HeroSender.sendCmd_112(hero.getId(), 2);
//				return;
//			}
//		}else if(len==2){
//			//?????????????????????
//			//????????????4?????????VIP4???????????????????????????
//			if(hero.getRebornlv()>=4 || hero.getVipLv()>=4){
//				
//			}else{
////				HeroSender.sendCmd_112(hero.getId(), 2);
////				return;
//			}
//		}else{
//			HeroSender.sendCmd_112(hero.getId(), 3);
//			return;
//		}
//		Map<Integer, General> generalMap = hero.getGeneralMap();
//		for(General general:generalMap.values()){
//			if(general.getJob()==job){
//				HeroSender.sendCmd_112(hero.getId(), 4);
//				return;
//			}
//		}
//		General general = HeroEvent.getIns().newGeneral(hero,len,job);
//		generalMap.put(general.getJob(), general);
//		FightAttr fightAttr = new FightAttr();
//		hero.getFightAttrMap().put(general.getJob(),fightAttr);
//		FinalFightAttr finalFightAttr = new FinalFightAttr();
//		finalFightAttr.setUid(general.getId());
//		finalFightAttr.setType(general.getJob());
//		finalFightAttrMap.put(general.getJob(),finalFightAttr);
//		SystemEventFunction.triggerOpenNewGeneralEvent(hero, job);//????????????
////		HeroEvent.getIns().sendFightAttr(hero);
//		FinalFightAttr attr = hero.getFinalFightAttrMap().get(job);
//		int[] js = new int[] {};
//		List<Object[]> skillData = new ArrayList<Object[]>();
//		if(js != null){
//			for(int j=0; j<js.length; j++){
//				skillData.add(new Object[]{js[j], 0});
//			}
//		}
//		Object[] data = new Object[]{new Object[]{attr.getUid(),attr.getType(),attr.getHpMax(),attr.getAtt(),attr.getDef(),
//				attr.getCritical(),attr.getResistCrit(),attr.getHit(),attr.getEvade(),attr.getDamage(),
//				attr.getCriticalRate(),attr.getResistCritRate(),attr.getHitRate(),attr.getEvadeRate(),
//				attr.getCriticalDamageAdd(),attr.getCriticalDamageDerate(),attr.getDamageAdd(),attr.getDamageDerate(),
//				attr.getFireDamage(),attr.getFrozenDamage(),attr.getPoisonDamage(),attr.getElectricDamage(),
//				attr.getBoomDamage(),attr.getFireRes(),attr.getFrozenRes(),attr.getPoisonRes(),attr.getElectricRes(),attr.getBoomRes(),
//				skillData.toArray()}};
//		NettyWrite.writeData(hero.getId(), new Object[]{data,hero.getTotalStrength()}, HeroCmd.GC_HeroAttr_110);
//		HeroSender.sendCmd_112(hero.getId(), 1);
//	}
	
	
	
	
	/**
	 * ???????????? 113
	 * 1??????????????? 2??????????????????3??????????????????4??????????????????5???????????????6???????????????7??????????????????
	 */
	public void rebornUp(Hero hero) {
		try {
			//4101
			int nextid=0;
			int[][] tiaojia;
			int[][] reward;
			boolean isUp=false;
			if (Config_zhuansheng_705.getIns().get(hero.getRebornlv())!=null&&
					Config_zhuansheng_705.getIns().get(hero.getRebornlv()).getNextid()!=0) {
				nextid=Config_zhuansheng_705.getIns().get(hero.getRebornlv()).getNextid();
			}else {
				HeroSender.sendCmd_114(hero.getId(), 1, hero.getRebornlv());
				return;
			}
			tiaojia=Config_zhuansheng_705.getIns().get(nextid).getCondition();
			reward=Config_zhuansheng_705.getIns().get(nextid).getAward();
			if (tiaojia==null||reward==null) {
				return;
			}
			for (int i = 0; i < tiaojia.length; i++) {
				int type=tiaojia[i][0];
				int num=tiaojia[i][1];
				switch (type) {
				case 1:
					//??????
					if (hero.getRealLevel()>=num) {
						isUp=true;
					}else {
						isUp=false;
					}
					break;
				case 2:
					//???????????????
					if (ForgeFunction.getIns().maxBaoShiSum(hero)>=num) {
						isUp=true;
					}else {
						isUp=false;
					}
					break;
				case 3:
					//???????????????
					if (ForgeFunction.getIns().maxStrength(hero)>=num) {
						isUp=true;
					}else {
						isUp=false;
					}
					break;
				case 4:
					//???????????????
					if (ForgeFunction.getIns().maxStar(hero)>=num) {
						isUp=true;
					}else {
						isUp=false;
					}
					break;
				case 5:
					//????????????????????????
					if (SkillFunction.getIns().getMaxNum(hero)>=num) {
						isUp=true;
					}else {
						isUp=false;
					}
					break;
				case 6:
					//????????????
					if (hero.getOfficial()>=num) {
						isUp=true;
					}else {
						isUp=false;
					}
					break;
				case 7:
					//??????????????????
					if (hero.getPeacockFloor().getFloorNum()>=num) {
						isUp=true;
					}else {
						isUp=false;
					}
					break;	
				default:
					break;
				}
				if (!isUp) {
					break;
				}
			}
			if (isUp&&UseAddUtil.canAdd(hero, reward, false)) {
				//????????????
				UseAddUtil.add(hero, reward, SourceGoodConst.REBRON_REWARD, null, true);
				hero.setRebornlv(nextid);
				HeroFunction.getIns().addHeroRebornLv(hero, hero.getRebornlv());
				HeroSender.sendCmd_114(hero.getId(), 0, hero.getRebornlv());
				//
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.REBORNLV,SystemIdConst.HeroFight_SYSID);
				//??????
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_8, 0);
				// ????????????
				ActGiftManager.getIns().sendMsg(hero);
				if (nextid>=Config_xtcs_004.getIns().get(ChatConst.BROCAST_BRONNUM).getNum()) {
					ChatManager.getIns().broadCast(ChatConst.BROCAST_ZHUANBORN,
							new Object[] { hero.getName(), nextid }); // ????????????
				}
				if (CrossKingLocalCache.getInfo()!=null) {
					CrossKingSender.sendCmd_1860(hero.getId(), CrossKingLocalCache.getInfo().getState());
				}
				if (nextid==1001) {
					CrossKingManager.getIns().openShop(hero);
				}
				return;
			}
			HeroSender.sendCmd_114(hero.getId(), 1, hero.getRebornlv());
		} catch (Exception e) {
			LogTool.error(e, HeroManager.class, hero.getId(), hero.getName(), "rebornUp has wrong");
		}
	}
	/**
	 * ????????????????????????
	 * 
		???????????????????????????????????????????????????????????????20?????????

		???????????????????????????????????????????????????????????????20??????????????????20??????????????????????????????????????????5?????????????????????5???????????????????????????
		?????????????????????40???-100??????????????????????????????5??????
	 * @param hero
	 */
	public void askSceneHeros(Hero hero) {
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		int onlinesize = heroMap.size();
		int max = 20;
		int left = max - onlinesize;
		List<Object[]> list = new ArrayList<Object[]>();
		if(left>0){
			ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(RankingConst.LEVEL_RANKING);
			int size = treeSet.size();
			if(size>40){
				List<Integer> chooseList = new ArrayList<Integer>();
				List<BaseRankModel> heroLevelRank = new ArrayList<>(treeSet);
				for(int i=1;i<=left;i++){
					if(i>left) {
						break;
					}
					if(i>5) break;
					int randomNumInAreas = RandomUtil.getRandomNumInAreas(40, 99);
					if(size<=randomNumInAreas || chooseList.contains(randomNumInAreas)) continue;
					chooseList.add(randomNumInAreas);
					Hero h = HeroCache.getHero(heroLevelRank.get(randomNumInAreas).getHid(), HeroConst.FIND_TYPE_BATTLE);
					askSceneHeros1(h, list);
				}
			}
		}
		int i = 0;
		for(Hero h:heroMap.values()){
			if(i<max && h.isOnline() && h.getId()!=hero.getId()){
				askSceneHeros1(h, list);
				i++;
			}
		}
		HeroSender.sendCmd_132(hero.getId(), list.toArray());
	}
	private void askSceneHeros1(Hero h,List<Object[]> list){
		String gangname = "";
		//GangThree gang = GangThreeCache.getGang(h.getGangId());
		//if(gang!=null) gangname = gang.getName();
		int shenbingLv = 0;
		if(shenbingLv==0) shenbingLv = 1;
		//?????????????????????
		int titleId = 0;
		TitleModel title = h.getTitleModel();
		if(title!=null){
			titleId = title.getWearTitleId();
		}
		
		int fashionID = 0;
		list.add(new Object[]{h.getId(),h.getNameZoneid(),h.getJob(),gangname,shenbingLv,titleId,fashionID});
	}

	/**
	 * ??????????????????????????????
	 * @param channel
	 */
	public void inCreateRoleUI(Channel channel) {
		// ??????????????????????????????
		TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
		Account account = tempData.getAccount();
		int createtime = account.getCreatetime();
		// ???????????????????????????????????????????????????????????????
		if (createtime >= TimeDateUtil.getTodayZeroTimeReturnInt()) {
			int inCreate = account.getInCreate();
			// ?????????????????????????????????????????????
			if (inCreate == 0) {
				try {
					account.setInCreate(1);
					AccountDao.getIns().update(account);
					int zoneid = account.getZoneid();
					String pf = account.getPf();
					String pd = account.getPd();
				} catch (Exception e) {
					LogTool.error(e, HeroManager.class, "inCreateRoleUI has error!");
				}
			}
		}
	}
	/**
	 * ???????????? 135
	 * @param type
	 * ?????? 
	 * 1?????????
	 * 2????????????
	 * @param id ?????????????????????????????????id
	 */
	public void requestRecharge(Hero hero, int type, int id,String param) {
		try {
			LogTool.info("hid:"+hero.getId()+"type "+type+"id "+id, HeroManager.class);
			if(!HeroCache.isCanRecharge()) {
				HeroSender.sendCmd_136(hero.getId(), 2, null, 0, id);
				return;
			}
			if (type != RechargeConst.YB && type != RechargeConst.TEQUANKA && type != RechargeConst.DAILYDIRECTBUY
					&& type != RechargeConst.WEEK_CARD) {
				LogTool.warn("hid:"+hero.getId()+"type!=YB TEQUANKA type"+type, HeroManager.class);
				return;
			}
			Struct_shop_011 chongzhi = Config_shop_011.getIns().get(id);
			if (chongzhi==null) {
				LogTool.warn("hid:"+hero.getId()+"chongzhi==null :"+id, HeroManager.class);
				return;
			}
			int itemid=chongzhi.getIndex();
	        int time=TimeDateUtil.getCurrentTime();
	        Random random = new Random();
	        int num = random.nextInt(10000);
	        StringBuilder str = new StringBuilder();
	        str.append(time).append(num);
	        long product_id = Long.parseLong(str.toString());
	        //????????????
	        int  isblock =0;
	        if(RechargeWhiteListIO.getIns().checkRechargeWhiteList(hero.getOpenid(), hero.getZoneid())) {
	        	isblock=1;
	        }
	        Struct_shop_011 struct_shop_011 = Config_shop_011.getIns().get(itemid);
	        B_PayAccount m_PayAccount=new B_PayAccount();
	        m_PayAccount.setProduct_id(product_id);
	        m_PayAccount.setItemId(itemid);
	        m_PayAccount.setItemName(struct_shop_011.getName());
	        m_PayAccount.setItemInfo(struct_shop_011.getExplain());
	        m_PayAccount.setParameters(param);
	        if (isblock==1) {
	        	//???????????????1???
	        	m_PayAccount.setPayNum(100);
			}else {
				m_PayAccount.setPayNum(struct_shop_011.getRmb());
			}
	        TempData tempData = hero.getTempData();
			if (tempData==null) {
				return;
			}
			Account account=tempData.getAccount();
			if (account==null) {
				return;
			}
			B_Register b_Register=tempData.getB_Register();
			if (b_Register==null) {
				return;
			}
			// ??????????????????
			if (type == RechargeConst.DAILYDIRECTBUY) {
				if (!DailyDirectBuyActFunction.getIns().checkCanRecharge(hero, product_id, param)) {
					return;
				}
				int mid = Integer.parseInt(param);
				if (HeroFunction.getIns().checkSystemOpen(hero, DailyDirectBuyConst.SYSTEMID)) {
					// ????????????(??????????????????)
					Struct_mrzg1_256 struct_mrzg1_256 = Config_mrzg1_256.getIns().get(mid);
					int day = struct_mrzg1_256.getDay();
					if (!DailyDirectBuyFunction.getIns().checkCanRechargeDate(day)) {
						LogTool.warn("requestRecharge DailyDirectBuy checkCanRechargeDate itemid:" + itemid + " name:"
								+ hero.getNameZoneid() + " hid:" + hero.getId(), this);
						return;
					}
				} else if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DAILYDIRECTBUY)) {
					// ????????????(??????)
					Struct_mrzg2_256 struct_mrzg2_256 = Config_mrzg2_256.getIns().get(mid);
					int day = struct_mrzg2_256.getDay();
					if (!DailyDirectBuyActFunction.getIns().checkCanRechargeDate(day)) {
						LogTool.warn(
								"requestRecharge DailyDirectBuyAct checkCanRechargeDate itemid:" + itemid + " name:"
								+ hero.getNameZoneid() + " hid:" + hero.getId(), this);
						return;
					}
				} else if (OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DAILYBUY)) {
					// ????????????(8~28)
					Struct_mrzg3_256 struct_mrzg3_256 = Config_mrzg3_256.getIns().get(mid);
					int day = struct_mrzg3_256.getDay();
					if (!OtherDailyDirectBuyFunction.getIns().checkCanRechargeDate(day)) {
						LogTool.warn("requestRecharge OtherDailyDirectBuy checkCanRechargeDate itemid:" + itemid
								+ " name:"
								+ hero.getNameZoneid() + " hid:" + hero.getId(), this);
						return;
					}
				}
			}
			LogTool.info("hid:"+hero.getId()+" product_id:"+product_id+"param:"+param, HeroManager.class);
	        m_PayAccount.setCreatetime(account.getCreatetime());
	        m_PayAccount.setCreatTime(TimeDateUtil.getCurrentTime());
	        m_PayAccount.setUpdateTime(TimeDateUtil.getCurrentTime());
	        m_PayAccount.setHid(hero.getId());
	        m_PayAccount.setItemNum(1);
	        m_PayAccount.setLv(hero.getLevel());
	        m_PayAccount.setName(hero.getName());
	        m_PayAccount.setZoneid(hero.getZoneid());
	        m_PayAccount.setOpenid(account.getOpenid());
	        m_PayAccount.setApp_custom(account.getApp_custom());
	        m_PayAccount.setLoginpfcode(account.getPfcode());
			m_PayAccount.setPfcode(b_Register.getPfcode());
	        m_PayAccount.setPfopenid(account.getPfopenid());
	        m_PayAccount.setUsesys(account.getUsesys());
	        m_PayAccount.setLoginsys(account.getLoginsys());
	        m_PayAccount.setIsBlackList(isblock);
	        m_PayAccount.setJob(hero.getCreateJob());
	        hero.setRecentlyRechargeTime(TimeDateUtil.getCurrentTime()); // ??????????????????????????????
	        HoutaiDao.getIns().insertB_PayAccount(hero.getZoneid(), m_PayAccount);
			HeroSender.sendCmd_136(hero.getId(), 1, str.toString(), isblock, id);
		} catch (Exception e) {
			LogTool.error(e, HeroManager.class, hero.getId(), hero.getName(), "requestRecharge has wrong");
		}
        return;
		
	}
	public static void main(String[] args) {
		TreeMap<String, Object> map = new TreeMap<String, Object>();
//		map.put("gameid", 1);
//		map.put("uid", 1);
//		map.put("out_trade_no", 1);
//		map.put("notify_url", 1);
//		map.put("timestamp", 1);
//		map.put("amount", 1);
//		map.put("subject", 1);
//		map.put("detail", 1);
//		map.put("server_id", 1);
//		map.put("role_id", 1);
//		map.put("area", 1);
//		map.put("level", 1);
		map.put("gameid", "your-game-id");
		map.put("client", 1);
		map.put("access_token", "C79r8j7wtGVWOWBXszj3KmCCA3KCiB7G9pgp7NDd");
		map.put("timestamp", 1495078858);
		Iterator<Entry<String, Object>> it = map.entrySet().iterator();
		StringBuilder sb = new StringBuilder();
		int i=0;
		while(it.hasNext()){
			Entry<String, Object> next = it.next();
			String key = next.getKey();
			Object value = next.getValue();
//			System.err.println(key);
			if(i>0){
				sb.append("&");
			}
			sb.append(key).append("=").append(value);
			i++;
		}
		String secret = "your-game-secret";
//		sb.append(secret);
		MD5 md = new MD5();
		String param = sb.toString();
		String signature = md.toDigest(param+secret);
		sb.append("&signature=").append(signature);
		System.err.println("param:"+param);
		System.err.println("md5:"+signature);
		String senddata = sb.toString();
		
		int time=TimeDateUtil.getCurrentTime();
		Random random = new Random();
		int num = random.nextInt(10000);
		StringBuilder str = new StringBuilder();
		str.append(time).append(num);
		System.err.println("str:"+str+"num:"+num+"time:"+time);
		long l = Long.parseLong(str.toString());
		System.err.println(l);
	}
	/**
	 * ??????????????????
	 */
	public void openRecharge(Hero hero) {
		if(hero==null) {
			return;
		}
		try {
			int vipExp = hero.getVipData().getVipExp();
			Set<Integer> rechargeGrade = hero.getRechargeGrade();
			List<Object[]> fiveData = new ArrayList<>();
			int id = 0;
			int bieNum = 0;
			int doubleNum=Config_xtcs_004.getIns().get(RechargeConst.DOUBLE_RECHARGE).getNum();
			int normalNum=Config_xtcs_004.getIns().get(RechargeConst.NORMAL_RECHARGE).getNum();
			for (Struct_chongzhi_716 chongzhi_716:Config_chongzhi_716.getIns().getSortList()) {
				int i = chongzhi_716.getID();
				if (i==RechargeConst.rechargeItemId_998) {
					doubleNum=Config_xtcs_004.getIns().get(RechargeConst.NORMAL_RECHARGE_998).getNum();
				}else if (i==RechargeConst.rechargeItemId_1998) {
					doubleNum=Config_xtcs_004.getIns().get(RechargeConst.NORMAL_RECHARGE_1998).getNum();
				}
				if (chongzhi_716.getCz()==0) {
					bieNum = doubleNum;
				}
				if (rechargeGrade.contains(i)) {
					bieNum = normalNum;
				}else {
					bieNum = doubleNum;
				}
				fiveData.add(new Object[] {id, bieNum});
			}
			HeroSender.sendCmd_138(hero.getId(), hero.getVipLv(), vipExp, fiveData.toArray());
		} catch (Exception e) {
			LogTool.error(e, HeroManager.class, hero.getId(), hero.getName(), "");
		}
	}
	
	/**
	 * ?????????????????? 143
	 * @param name| ??????????????????| String 
	 */
	public synchronized void changeName(Hero hero, String name){
		long hid = hero.getId();
		if(StringUtils.isBlank(name)) {
			HeroSender.sendCmd_144(hid, 2, name);
			return;
		}
		//??????openId
		if(!IlliegalUtil.isNameIll(name, Integer.MAX_VALUE)){
			HeroSender.sendCmd_144(hid, 2, name);
			return;
		}
		//?????????????????????
		String CHECKSQL = ".*([';]+|(--)+).*";
		if(Pattern.matches(CHECKSQL,name)){
			HeroSender.sendCmd_144(hid, 2, name);
			return;
		}
		if(name.equals(hero.getName())){
			HeroSender.sendCmd_144(hid, 3, name);
			return;
		}
		boolean isExist = true;
		try {
			isExist = HeroDao.getIns().existName(name, hero.getZoneid());
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(isExist){
			HeroSender.sendCmd_144(hid, 4, name);
			return;
		}
		if(!UseAddUtil.canUse(hero, GameConst.TOOL, 1, HeroConst.CHANGE_NAME_ITEM_ID)){
			HeroSender.sendCmd_144(hid, 5, name);
			return;
		}
		UseAddUtil.use(hero, GameConst.TOOL, 1, HeroConst.CHANGE_NAME_ITEM_ID, SourceGoodConst.CHANGE_NAME);
		hero.setName(name);
		try {
			HeroDao.getIns().updateName(name, hid, hero.getZoneid());;
		} catch (Exception e) {
			HeroSender.sendCmd_144(hid, 4, name);
			return;
		}
		HeroSender.sendCmd_144(hid, 1, name);
		RankingFunction.getIns().refreshAll(hero);
		FriendFunction.getIns().changeName(hero);
		GuanqiaFunction.getIns().changeName(hero);
		SoloRunSysCache.addToRank(hero);
		HeroesListFunction.getIns().reflashName(hero);
		CrossMineFunction.getIns().changeName(hero);
		WeiXinShareFunction.getIns().noticName(hero);
	}

	/**
	 * ??????????????????
	 * @param hero
	 * @param key
	 * @param value
	 */
	public void cG_PLAYERSETTING(Hero hero, String key, String value) {
		if(key == null || "".equals(key) || value == null || "".equals(value)){
			return;
		}
		if("sound".equals(key)){
			//????????????
			hero.setGameSound(Integer.valueOf(value));
		}else if("skill".equals(key)){
			//????????????
			hero.setAutoFight(Integer.valueOf(value));
		}
	} 

	public void operateDamage(Hero hero, int index, int num) {
		if (hero == null) {
			return;
		}
		try {

		} catch (Exception e) {
			LogTool.error(e, HeroManager.class, hero.getId(), hero.getName(), "operateStrength fail");
		}
	}

	public void operateStrength(Hero hero, int index, int num) {
		if (hero == null) {
			return;
		}
		try {

		} catch (Exception e) {
			LogTool.error(e, HeroManager.class, hero.getId(), hero.getName(), "operateStrength fail");
		}
	}
	/**
	 * ???????????? 
	 * @param hero
	 */
	public void getGuan(Hero hero) {
		try {
			HeroSender.sendCmd_154(hero.getId(), hero.getOfficial(), hero.getZhanGong());
		} catch (Exception e) {
			LogTool.error(e, HeroManager.class, hero.getId(), hero.getName(), "getGuan fail");
		}
		
	}
	/**
	 * ????????????
	 * @param hero
	 */
	public void upGuan(Hero hero) {
		try {
			if(Config_guanxian_701.getIns().get(hero.getOfficial())!=null
					&&Config_guanxian_701.getIns().get(hero.getOfficial()).getLvup()!=0
					&&UseAddUtil.canUse(hero, GameConst.ZHANGONG, Config_guanxian_701.getIns().get(hero.getOfficial()).getLvup())) {
				hero.setOfficial(hero.getOfficial()+1);
				hero.getShowModel().setOfficial(hero.getOfficial());
				FightCalcFunction.setRecalcAll(hero,FightCalcConst.UPLEVEL_GUAN,SystemIdConst.HeroFight_SYSID);
				HeroSender.sendCmd_156(hero.getId(), 0,hero.getOfficial(), hero.getZhanGong());
//				CountryFunction.getIns().refreshCountryStrengthMap(hero, 0);
//				KingShipFunction.getIns().refreshKingShipModelMap(hero,0);
				//??????
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_26, 0);
				//????????????
				//HeroFunction.getIns().loginRebornUpReadPoint(hero,false);
				// ???????????????
				RankingFunction.getIns().refreshAll(hero);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, HeroManager.class, hero.getId(), hero.getName(), "upGuan fail");
		}
		
	}
	
	/**
	 * ????????????????????????
	 */
	public void getWelfareNotice(Hero hero) {
		try {
			HeroSender.sendCmd_170(hero.getId(), WelfareNoticeCache.WelfareNotice);
		} catch (Exception e) {
			LogTool.error(e, HeroManager.class, hero.getId(), hero.getName(), "getWelfareNotice fail");
		}
	}
	
	/***
	 * ??????????????????
	 * @param hero
	 */
	public void openupdate(Hero hero) {
		hero.setNoticestr(GlobalCache.getVersion());
	}

	
	
}
