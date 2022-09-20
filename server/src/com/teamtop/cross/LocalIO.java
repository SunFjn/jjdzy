package com.teamtop.cross;

import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossLoginCache;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.dao.MailDao;
import com.teamtop.system.mail.model.Mail;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class LocalIO {
	private static LocalIO ins = null;

	public static LocalIO getIns() {
		if (ins == null) {
			ins = new LocalIO();
		}
		return ins;
	}

//	private Logger logger = LoggerFactory.getLogger(LocalIO.class);
	/**
	 * 中央服询问子服某个将领（原来中央服没有这位将领）
	 * @param channel
	 * @param data
	 *//*
	public void askGeneralFromLocal(Channel channel,CrossData data){
		Long hid = (Long) data.get(CrossEnum.hid.name());
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
			logger.warn(LogTool.rec("askGeneralFromLocal hero is null,hid:"+hid));
			return;
		}
		int gid = (int) data.get(CrossEnum.gid.name());
		data.finishGet();
		General general = hero.getGeneral(gid);
		data.put(CrossEnum.general.name(), general);
		NettyWrite.writeBlockCallback(channel, data, data.getCallbackCmd());
	}
	*//**
	 * 中央服退出
	 * @param channel
	 * @param data
	 */
	public void crossQuit(Channel channel,CrossData data){
		Long hid = (Long) data.getObject(CrossEnum.hid.name(), Long.class);
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
			LogTool.warn("crossQuit hero is null,hid:"+hid, this);
			return;
		}
		int crossLoginType = (int) data.getObject(CrossEnum.crossLoginType.name(), Integer.class);
		try {
			AbsCrossLoginEvent event = CrossLoginCache.getEvent(crossLoginType);
			if (event!= null) {
				event.localAfterLogout(hero, data);
			}
		} catch (Exception e) {
			LogTool.warn(LogTool.exception(e), this);
		}
		CrossChannelSchedule.crossHeroDown(hero);
	}
	
	/**
	 * 查看其他玩家信息 
	 * @param channel
	 * @param data
	 *//*
	public void lookOtherHero(Channel channel,CrossData data){
		String lookHeroPf = (String) data.get(CrossEnum.pf.name());
		Long lhid = (Long) data.get(CrossEnum.otherhid.name());
		int type = (int) data.get(CrossEnum.type.name());
		int gid = (int) data.get(CrossEnum.gid.name());
		byte[] lookOtherHero = HeroManager.getIns().getLookOtherHero(lookHeroPf, lhid, type, gid);
		data.finishGet();
		data.put(CrossEnum.lookHeroData.name(), lookOtherHero);
		NettyWrite.writeBlockCallback(channel, data, data.getCallbackCmd());
	}
	*//**
	 * 查看其他玩家宠物
	 * @param channel
	 * @param data
	 *//*
	public void lookOtherPet(Channel channel,CrossData data){
		Long lhid = (Long) data.get(CrossEnum.otherhid.name());
		byte[] lookOtherPet = PetManager.getIns().lookOtherPet(lhid);
		data.finishGet();
		data.put(CrossEnum.lookHeroPet.name(), lookOtherPet);
		NettyWrite.writeBlockCallback(channel, data, data.getCallbackCmd());
	}
	*/
	/**
	 * 中央服发送邮件
	 * @param channel
	 * @param data
	 */
	public void crossSendMail(Channel channel,CrossData data){
		try {
			Mail mail = (Mail) data.getObject(CrossEnum.mail.name(), Mail.class);
			String receiver;
			long receiverId=mail.getReceiverId();
			boolean isOnline = HeroFunction.getIns().isOnline(mail.getReceiverId());
			Hero hero;
			if(isOnline) {
				hero = HeroCache.getHero(receiverId);
			}else{
				hero = HeroDao.getIns().findBasic(receiverId);
			}
			if(hero!=null){
				receiver = hero.getNameZoneid();
				mail.setReceiver(receiver);
				MailDao.getIns().addMail(mail);
			}else{
				LogTool.warn("hero==null receiverId:"+receiverId+" mailId Content"+mail.getContent(), LocalIO.class);
			}
		} catch (Exception e) {
			LogTool.error(e, LocalIO.class, "crossSendMail has wrong");
		}
	}
	
	/**
	 * 中央服获取奖励是否需要绑定，根据世界等级
	 * @param channel
	 * @param data
	 *//*
	public void getRewardBindOrNot(Channel channel,CrossData data){
		try {
			Long hid = (Long) data.get(CrossEnum.hid.name());
			int level = 0;
			if(HeroFunction.getIns().isOnline(hid)) {
				Hero hero = HeroCache.getHero(hid);
				level = hero.getLevel();
			}else {
				try {
					level = HeroDao.getIns().findLevel(hid, CommonUtil.getZoneIdById(hid));
				} catch (Exception e) {
					logger.error(LogTool.exception(e,hid,""));
				}
			}
			boolean rtn = false;
			int worldLevel = WelFareHallCache.getWorldLevel();
			//世界等级小于50 不需要绑定
			if(worldLevel < WelFareHallConst.WORLD_LEVEL_SHOW) {
				rtn = false;
			}else{
				rtn =  level <= worldLevel - WelFareHallConst.LOW_BIND_LEVEL;
			}
			data.finishGet();
			data.put(CrossEnum.rtn.name(), rtn);
			NettyWrite.writeBlockCallback(channel, data, data.getCallbackCmd());
		} catch (Exception e) {
			data.put(CrossEnum.rtn.name(), false);
			NettyWrite.writeBlockCallback(channel, data, data.getCallbackCmd());
			logger.error(LogTool.exception(e));
		}
	}
	*//**
	 * 同步场景到本地
	 * @param channel
	 * @param data
	 *//*
	public void syncSceneToLocal(Channel channel,CrossData data){
		Long hid = (Long) data.get(CrossEnum.hid.name());
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
			logger.warn(LogTool.rec("syncSceneToLocal hero is null,hid:"+hid));
			return;
		}
		int sceneSysId = (int) data.get(CrossEnum.sceneSysId.name());
		int sceneUid = (int) data.get(CrossEnum.sceneUnitId.name());
		int x = (int) data.get(CrossEnum.x.name());
		int y = (int) data.get(CrossEnum.y.name());
		Scene scene = hero.getScene();
		scene.setSceneSysId(sceneSysId);
		scene.setSceneType(Config_map_204.getIns().get(sceneSysId).getType());
		scene.setSceneUnitId(sceneUid);
		scene.setPosX(x);
		scene.setPosY(y);
	}
	
	public void crossSendTitle(Channel channel,CrossData data){
		Long hid = (Long) data.get(CrossEnum.hid.name());
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
			logger.warn(LogTool.rec("crossSendTitle hero is null,hid:"+hid));
			return;
		}
		int titleId = (int) data.get(CrossEnum.title.name());
		int titleDeadTime = (int) data.get(CrossEnum.titleDaadTime.name());
		TitleManager.getIns().addTitle(hid, titleId, titleDeadTime);
	}
	*//**
	 * 中央服获取帮会
	 * @param channel
	 * @param data
	 *//*
	public void getGang(Channel channel,CrossData data){
		long gangid = (long) data.get(CrossEnum.gangid.name());
		Gang gang = GangCache.getGang(gangid);
		if(gang!=null){
			Map<Long,GangMember> gangMembers = GangCache.getGangAllMember(gangid);
			data.put(CrossEnum.gangMembers.name(), gangMembers);
		}
		data.put(CrossEnum.gang.name(), gang);
		NettyWrite.writeBlockCallback(channel, data, data.getCallbackCmd());
	}
	
	*//**
	 * 获取好友数据
	 * @param channel
	 * @param data
	 *//*
	public void getFriend(Channel channel,CrossData data){
		Long hid = (Long) data.get(CrossEnum.hid.name());
		Hero hero = HeroCache.getHero(hid);
		if(hero!=null){
			Friend friend = hero.getFriend();
			if(friend!=null){
				data.put(CrossEnum.friendData.name(), friend);
				NettyWrite.writeBlockCallback(channel, data, data.getCallbackCmd());
			}
		}
	}
	
	*//**
	 * 中央服通知子服通知客户端结束战斗，活动结束时部分玩家由于没收到320或322就断开连接卡死战斗
	 * @param channel
	 * @param data
	 *//*
	public void crossTellLocalTellClientEndBattle(Channel channel,CrossData data){
		Long hid = (Long) data.get(CrossEnum.hid.name());
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
			logger.warn(LogTool.rec("crossTellLocalTellClientEndBattle hero is null,hid:"+hid));
			return;
		}
		SendDataMap send = new SendDataMap();
		int bid = (int) data.get(CrossEnum.battleId.name());
		int battleResult = (int) data.get(CrossEnum.battleResult.name());
		send.put(BattleOper.ID, bid);
		send.put(BattleOper.RESULT, battleResult);
		NettyWrite.writeXData(hid, BattleCmd.GC_SkipSuccData_322, send);
	}
*/}
