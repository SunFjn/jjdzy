package com.teamtop.system.chat;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.kefu.M_KefuRequest;
import com.teamtop.houtaiHttp.events.kefu.ResponseResult;
import com.teamtop.houtaiHttp.events.whiteList.WhiteListIO;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.system.archive.ArchiveFunction;
import com.teamtop.system.archive.model.ArchiveData;
import com.teamtop.system.archive.model.ArchiveModel;
import com.teamtop.system.bingfa.BingFa;
import com.teamtop.system.bingfa.BingFaFunction;
import com.teamtop.system.bingfa.BingFaModel;
import com.teamtop.system.country.CountrySysCache;
import com.teamtop.system.country.model.Country;
import com.teamtop.system.crossSJMiJing.CrossSJMiJingFunction;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJing;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.destiny.model.DestinyBagData;
import com.teamtop.system.destiny.model.PersonalDestiny;
import com.teamtop.system.event.backstage.events.backstage.adMonitor.AdMonitorConst;
import com.teamtop.system.event.backstage.events.backstage.adMonitor.AdMonitorFunction;
import com.teamtop.system.excalibur.ExcaliburFunction;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.excalibur.model.ExcaliburModel;
import com.teamtop.system.fashionClothes.FashionClothes;
import com.teamtop.system.godWeapon.GodWeapon;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.godWeapon.GodWeaponInfo;
import com.teamtop.system.godWeapon.GodWeaponManager;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.godbook.GodBookFunction;
import com.teamtop.system.godbook.GodBookModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroMapper;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.maid.MaidFunction;
import com.teamtop.system.house.maid.model.Maid;
import com.teamtop.system.house.maid.model.MaidModel;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderFunction;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.liuChuQiShan.model.LiuChuQiShan;
import com.teamtop.system.monsterSpirit.MonsterSpiritFunction;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritEquip;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritInfo;
import com.teamtop.system.monsterSpirit.model.StampData;
import com.teamtop.system.mount.Mount;
import com.teamtop.system.mount.MountFunction;
import com.teamtop.system.mount.MountModel;
import com.teamtop.system.qice.QiCeFunction;
import com.teamtop.system.qice.model.QiCe;
import com.teamtop.system.qice.model.QiCeModel;
import com.teamtop.system.skill.SkillConst;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.system.specialAnimalDir.SpecialAnimalDirFunction;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDir;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDirInfo;
import com.teamtop.system.specialTreasure.SpecialTreasure;
import com.teamtop.system.specialTreasure.SpecialTreasureManager;
import com.teamtop.system.treasure.TreasureFunction;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.system.zhanjia.ZhanJia;
import com.teamtop.system.zhanjia.ZhanJiaFunction;
import com.teamtop.system.zhanjia.ZhanJiaModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.common.Tools;
import com.teamtop.util.illiegalUtil.IlliegalUtil;
import com.teamtop.util.json.JsonUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hero_211;
import excel.config.Config_six_279;
import excel.config.Config_sjmj_258;
import excel.config.Config_sjmjfb_258;
import excel.config.Config_tishi_703;
import excel.config.Config_xtcs_004;
import excel.config.Config_zdfb_255;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_six_279;
import excel.struct.Struct_sjmj_258;
import excel.struct.Struct_sjmjfb_258;
import excel.struct.Struct_tishi_703;
import excel.struct.Struct_zdfb_255;
import io.netty.channel.Channel;
/**
 * 聊天
 * @author Administrator
 *
 */
public class ChatManager {
	private static ChatManager ins = null;

	public static ChatManager getIns() {
		if (ins == null) {
			ins = new ChatManager();
		}
		return ins;
	}

	/**
	 * 聊天频道聊天 451
	 * @param type| B(1跨服,2本服,3国家4系统)| byte
	 * @param msg| 内容| String
	 */
	public void chat(Hero hero, int type, String msg) {
		try {
          /*if (true) {
				GlobalSender.sendCmd_260(hero.getId(), 1, "系统维护中");
				return;
			}*/
			if(type==ChatConst.CROSS&&!TimeDateUtil.serverOpenOverDays(7)){
				LogTool.warn("type==ChatConst.CROSS&&!TimeDateUtil.serverOpenOverDays(7)", ChatManager.class);
				//屏蔽
				return;
			}
			String oldMsg = msg;
			long hid = hero.getId();
			int level=hero.getLevel();
			int reincarnationLevel = hero.getReincarnationLevel();
			long str=hero.getTotalStrength();
			int  promotionLv=0;
			if (hero.getPromotionModel()!=null) {
				 promotionLv=hero.getPromotionModel().getLevel();
			}
			int rebornType=hero.getRebornlv();
			int CountryType=hero.getCountryType();
			if (hero.getSettingData().getShowCountry()==1) {
				CountryType=0;
			}
			int titleId=hero.getTitleId();
			int official=hero.getOfficial();
			String name = hero.getNameZoneid();
			int vipLv = hero.getVipLv();
			int vipLimit = 15;//VIP限制聊天条件
			int herdiceon =hero.getSettingData().getIcon();
			int frame=hero.getSettingData().getFrame();
			int job=hero.getJob();
			int godWeapon = GodWeaponFunction.getIns().getNowGodWeapon(hero);
			int mountId = hero.getMountId();
			// 微信检测
//			if (!WeixinApiUtils.getIns().msgChesk(msg)) {

//			}
			//敏感字
			String mingan = IlliegalUtil.isMingan(msg,1);
			if(mingan!=null){
				msg = mingan;
			}
			long heroId = hero.getId();
			if (isFbSpeak(heroId)) {
				//被禁言了
				if(hero.getAdState() == AdMonitorConst.STATE_4){
					//广告号记录聊天内容，只能自己看到自己的发言
					//ChatSender.sendCmd_454(hero.getId(), 2);
//					ChatSender.sendCmd_452(hero.getId(), type, hid,herdiceon,frame,level ,str , promotionLv, rebornType, CountryType, official,titleId, name, vipLv,job,0, msg);
				}
				return;
			}
			
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_CHAT)) return;
			boolean isWhite = WhiteListIO.getIns().checkWhiteListLocal(hero);
			if (hero.getRealLevel() < Config_xtcs_004.getIns().get(ChatConst.CHAT_LEVEL).getNum() && (!isWhite)) {
				//小于发言等级
				return;
			}
			if(type< 1 || type>3){
				LogTool.warn("type invalid", this);
				return;
			}
			String chatstr = hero.getTempVariables().getChatstr();
			if (chatstr!=null&&AdMonitorFunction.getIns().checkString(chatstr, msg)) {
				ChatSender.sendCmd_458(hero.getId(), 9, 0);
				return;
			}
			//100-150级，聊天第3句话后只有自己能看到（V4及以上不限制）
			int realLevel = hero.getRealLevel();
			if (hero.getVipLv()==vipLimit&&realLevel<=100&&realLevel>=80) {
				if (type==ChatConst.CROSS&&hero.getChat().getCrossCiShu()>=3) {
					hero.getChat().setCrossCiShu(hero.getChat().getCrossCiShu()+1);
					ChatSender.sendCmd_452(hero.getId(), type, hid,herdiceon,frame,realLevel,str , promotionLv, rebornType, CountryType, official,titleId, name, vipLv,job,godWeapon,0, msg,reincarnationLevel,mountId );
					return;
				}else if(type==ChatConst.LOCAL&&hero.getChat().getLocalCiShu()>=3){
					hero.getChat().setLocalCiShu(hero.getChat().getLocalCiShu()+1);
					ChatSender.sendCmd_452(hero.getId(), type, hid,herdiceon,frame,realLevel ,str , promotionLv, rebornType, CountryType, official,titleId, name, vipLv,job,godWeapon,0, msg,reincarnationLevel,mountId );
					return;
				}
			}
			int now = TimeDateUtil.getCurrentTime();
			
			if(msg.length()>ChatConst.WROLD_SIZE){
				ChatSender.sendCmd_458(hero.getId(), 3, 0);
				return;
			}
			int maxNum=Config_xtcs_004.getIns().get(ChatConst.DAY_NUM).getNum();
			
			Iterator<Long> iterator = null;
			if(type==ChatConst.CROSS){
				//聊天数量
				if (hero.getChat().getCrossCiShu()>=maxNum&&hero.getVipLv()==vipLimit) {
					ChatSender.sendCmd_458(hero.getId(), 5,0);
					return;
				}
				//屏蔽
				Channel channel = Client_2.getIns().getCrossChannel();
				boolean isActive = channel.isActive();
				if( !isActive){
					ChatSender.sendCmd_458(hero.getId(), 8,0);
					return;
				}
				int crossLenQueShiJian = hero.getTempVariables().getCrossLengQueShiJian();
				//聊天最小间隔
				if(now - crossLenQueShiJian<ChatConst.CROSS_TIME){
					int lastTime=ChatConst.CROSS_TIME- now + crossLenQueShiJian;
					if (lastTime<=0) {
						lastTime=0;
					}
					ChatSender.sendCmd_458(hero.getId(), 4,lastTime);
					return;
				}
				hero.getTempVariables().setCrossLengQueShiJian(now);

				hero.getChat().setCrossCiShu(hero.getChat().getCrossCiShu()+1);
			}else if(type==ChatConst.LOCAL){
				//聊天数量
				if (hero.getChat().getLocalCiShu()>=maxNum&&hero.getVipLv()==vipLimit) {
					ChatSender.sendCmd_458(hero.getId(), 5,0);
					return;
				}
				//本服
				int localLengQueShiJian = hero.getTempVariables().getLocalLengQueShiJian();
				//聊天最小间隔
				if(now - localLengQueShiJian<ChatConst.LOCAL_TIME){
					int lastTime=ChatConst.LOCAL_TIME- now + localLengQueShiJian;
					if (lastTime<=0) {
						lastTime=0;
					}
					ChatSender.sendCmd_458(hero.getId(), 4, lastTime);
					return;
				}
				hero.getTempVariables().setLocalLengQueShiJian(now);
				iterator = HeroCache.getHeroMap().keySet().iterator();

				hero.getChat().setLocalCiShu(hero.getChat().getLocalCiShu()+1);
				
			}else if (type==ChatConst.COUNTRY) {
				//国家
				int countryLengQueShiJian = hero.getTempVariables().getCountryLengQueShiJian();
				//聊天最小间隔
				if(now - countryLengQueShiJian<ChatConst.COUNTTRY_TIME){
					int lastTime=ChatConst.COUNTTRY_TIME- now + countryLengQueShiJian;
					if (lastTime<=0) {
						lastTime=0;
					}
					ChatSender.sendCmd_458(hero.getId(), 4, lastTime);
					return;
				}
				if (hero.getCountryType()==0) {
					return;
				}
				hero.getTempVariables().setCountryLengQueShiJian(now);
				Country country = CountrySysCache.getCountryCache().getCountryMap().get(hero.getCountryType());
				iterator =country.getHidList().iterator();
			}
			//开服前2日 上传所有玩家的聊天
			AdMonitorFunction.getIns().openTwoDays(hero, oldMsg, type);
			//聊天内容的广告监控
			//AdMonitorFunction.getIns().checkAdKeyword(hero, msg, type);
			//B:(1跨服,2本服,3国家4系统)L:玩家idI:等级L:战斗力I:晋升I:转生B:国家I:将衔U:名字B:vipU:内容
			ChatCrossModel chatCrossModel=new ChatCrossModel(hid,herdiceon,frame, level,reincarnationLevel, str, promotionLv, rebornType, CountryType, official, vipLv,titleId,job,godWeapon,0,name,msg,mountId);
			if (type==ChatConst.CROSS) {
				//
				ChatLocalIO.getIns().SGChat(chatCrossModel);
			}
			while(iterator!=null&&iterator.hasNext()){
				Long next = iterator.next();
				if(HeroFunction.getIns().isOnline(next)){
					Hero h= HeroCache.getHero(next);
					if (h==null) {
						LogTool.warn("h==null"+next, ChatManager.class);
						continue;
					}
					if (h.getChat()==null) {
						LogTool.warn("h.getChat()==null"+next, ChatManager.class);
						continue;
					}
					if (h.getChat().getBlackMap()==null) {
						LogTool.warn("h.getChat().getBlackMap()"+next, ChatManager.class);
						continue;
					}
					if(!h.getChat().getBlackMap().containsKey(hid)){
						ChatSender.sendCmd_452(h.getId(), type, hid,herdiceon,frame,level,str , promotionLv, rebornType, CountryType, official, titleId,name, vipLv,job,godWeapon,0,msg,reincarnationLevel,mountId );
					}
				}
			}
			//添加到聊天缓存
			if (type==ChatConst.LOCAL||type==ChatConst.COUNTRY) {
				ArrayList<ChatHistorys> chatHistory=ChatCache.getChaHistorys().get(type);
				if (chatHistory==null) {
					ChatCache.getChaHistorys().put(type, new ArrayList<ChatHistorys>());
					chatHistory=ChatCache.getChaHistorys().get(type);
					chatHistory.add(new ChatHistorys(hid,chatCrossModel));
				}else {
					if (chatHistory.size()>=ChatConst.WROLD_MAX_NUM) {
						chatHistory.remove(0);
					}
					chatHistory.add(new ChatHistorys(hid,chatCrossModel));
				}
			}
			//添加上一句聊天记录
			hero.getTempVariables().setChatstr(msg);
			
			ChatSender.sendCmd_458(hero.getId(), 1, 0);
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE7);
			return;
		} catch (Exception e) {
			LogTool.error(e, ChatManager.class, "chat has wrong");
		}
		
	}
	/**
	 * 打开ui 申请聊天缓存
	 * @param hero
	 * @param type
	 */
	public void openUI(Hero hero, int type) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_CHAT)) return;
			ArrayList<ChatHistorys> chatHistory=ChatCache.getChaHistorys().get(type);
			if(type==ChatConst.COUNTRY&&hero.getCountryType()==0){
				//申请国家聊天 没有国家
				LogTool.warn("(type==ChatConst.COUNTRY&&hero.getCountryType()==0", ChatManager.class);
				return;
			}
			if (chatHistory!=null) {
				Object[] info=new Object[chatHistory.size()];
				for (int i = 0; i < info.length; i++) {
					ChatHistorys chatHistorys=chatHistory.get(i);
					long hid = chatHistorys.getChatCrossModel().getHid();
					int level=chatHistorys.getChatCrossModel().getLevel();
					int reincarnationLevel=chatHistorys.getChatCrossModel().getReincarnationLevel();
					long str=chatHistorys.getChatCrossModel().getStr();
					int promotionLv=chatHistorys.getChatCrossModel().getPromotionLv();
					int rebornType=chatHistorys.getChatCrossModel().getRebornType();
					int CountryType=chatHistorys.getChatCrossModel().getCountryType();
					int official=chatHistorys.getChatCrossModel().getOfficial();
					String name = chatHistorys.getChatCrossModel().getName();
					int vipLv =chatHistorys.getChatCrossModel().getVipLv();
					int herdiceon =chatHistorys.getChatCrossModel().getHerdid();
					int frame=chatHistorys.getChatCrossModel().getHerdUi();
					int titleId=chatHistorys.getChatCrossModel().getTitleId();
					int job=chatHistorys.getChatCrossModel().getJob();
					int show=chatHistorys.getChatCrossModel().getIsShow();
					int godWeapon = chatHistorys.getChatCrossModel().getGodWeapon();
					int mountId = chatHistorys.getChatCrossModel().getMountId();
				    String maString=chatHistorys.getChatCrossModel().getMsg();
					//[B:频道L:玩家idU:名称B:vip等级I:等级I:转生L:战斗力I:晋升B:国家I:将衔U:内容]
					if(!hero.getChat().getBlackMap().containsKey(hid)){
						if (type==ChatConst.COUNTRY) {
							if (hero.getCountryType()==chatHistorys.getChatCrossModel().getCountryType()) {
								info[i]=new Object[]{type,hid,name,vipLv,herdiceon,frame,level,rebornType,str,promotionLv,CountryType, official,titleId,job,godWeapon,show,maString,reincarnationLevel,mountId};
							}
						}else {
							info[i]=new Object[]{type,hid,name,vipLv,herdiceon,frame,level,rebornType,str,promotionLv,CountryType, official,titleId,job,godWeapon,show,maString,reincarnationLevel,mountId};
						}
					}
				}
				info=CommonUtil.removeNull(info);
				ChatSender.sendCmd_460(hero.getId(), info);
			}
		} catch (Exception e) {
			LogTool.error(e, ChatManager.class, "openUI has wrong");
		}
		
	}
	/**
	 * 判断是否禁言
	 * @return true 禁言  false 不禁言
	 */
	public boolean isFbSpeak(long rid){
		Hero role=HeroCache.getHero(rid);
		if(role==null)return true;
		if(role.getIllegalState()==ChatConst.STATE_ILLEGAL_NONE)return false;
		if(role.getIllegalState()==ChatConst.STATE_ILLEGAL_JIN_YAN){
			if(TimeDateUtil.getCurrentTime()<role.getIllegalTimeout()){
				//发送前端提示
				ChatSender.sendCmd_454(rid, 1);
				return true;
			}
		}else if(role.getIllegalState()==ChatConst.STATE_ILLEGAL_JIN_OTHER){
			if(TimeDateUtil.getCurrentTime()<role.getIllegalTimeout()){
				//发送前端提示
				ChatSender.sendCmd_454(rid, 2);
				return true;
			}
		}
		//不在时间内则解禁
		role.setIllegalState(ChatConst.STATE_ILLEGAL_NONE);
		role.setIllegalReason(0 + "");
		ChatSender.sendCmd_454(rid, 0);
		return false;
	}
	
	/**
	 * 广播，参数数组第一层对应表中的参数顺序，第二层对于一个参数位置有多个参数的时候使用，参数数组转成X_X_X,X形式，第一层用"_"分割，第二层用","分割
	 * @param castNum 广播编号 
	 * @param params 参数集合与对应的数值表中的参数顺序要一致为一个参数的时候直接可以传入一个object
	 * @author yxh
	 * @date：2012-7-19 上午07:52:23
	 * @version 1.0.0
	 */
	public void broadCast(int castNum,Object params){
		try {
			String setReturnParam = setReturnParam(params);
			//通过广播编号获得系统id
			Struct_tishi_703 guangbo_205 = Config_tishi_703.getIns().get(castNum);
			if(guangbo_205 == null){
				LogTool.warn("broadCast castNum is error!castNum:"+castNum+" 广播表还没录",this);
				return;
			}
			Map<Long, Hero> roleCache = HeroCache.getHeroMap();
			Iterator<Hero> it = roleCache.values().iterator();
			//Struct_xitongkaiqi_103 xitongkaiqi_103 = Config_xitongkaiqi_103.getIns().get(sysId);
			while(it.hasNext()){
				Hero role = it.next();
				if(castNum == ChatConst.CROSS_TEAM_FUBEN) {
					// 转数不足不显示邀请
					Object[] obj = (Object[])params;
					Struct_zdfb_255 excel = Config_zdfb_255.getIns().get(Integer.valueOf(obj[1].toString()));
					if (excel == null) {
						// 配置错误
						continue;
					}
					int rebornlv = role.getRebornlv();
					int zsExcel = excel.getZs();
					if (zsExcel > rebornlv) {
						// 转数不足
						continue;
					}
				}else if(castNum == ChatConst.CROSS_S_J_MI_JING) {
					// 未通关秘境不显示邀请
					Object[] obj = (Object[])params;
					int id = Integer.valueOf(obj[1].toString());
					Struct_sjmjfb_258 excel = Config_sjmjfb_258.getIns().get(id);
					if (excel == null) {
						// 配置错误
						continue;
					}
					CrossSJMiJing crossSJMiJing = role.getCrossSJMiJing();
					if (crossSJMiJing == null) {
						// 跨服调起广播时，刚创号玩家数据还没来得及创建
						continue;
					}
					int miJingNextID = CrossSJMiJingFunction.getIns().getMiJingNextID(role, id);
					if (miJingNextID < id && miJingNextID!=0) {
						// 需要通关前面的副本才能打这个副本
						continue;
					}
					boolean checkJie = CrossSJMiJingFunction.getIns().checkJie(role, id);
					if (!checkJie) {
						// 阶数不足
						continue;
					}
					int type = CrossSJMiJingFunction.getIns().getTypeByID(id);
					Struct_sjmj_258 excelType = Config_sjmj_258.getIns().get(type);
					int lvOpen = excelType.getLv();
					int level = role.getRealLevel();
					if (lvOpen > level) {
						// 等级不足
						continue;
					}
				} else if (castNum == ChatConst.LIUCHUQISHAN_NOTIC) {
					// 未通关六出祁山不显示邀请
					Object[] obj = (Object[]) params;
					int id = Integer.valueOf(obj[1].toString());
					Struct_six_279 excel = Config_six_279.getIns().get(id);
					if (excel == null) {
						// 配置错误
						continue;
					}
					LiuChuQiShan liuChuQiShan = role.getLiuChuQiShan();
					if (liuChuQiShan == null) {
						// 调起广播时，刚创号玩家数据还没来得及创建
						continue;
					}
					int gqId = liuChuQiShan.getGqId();
					if (gqId < id) {
						// 需要通关前面的副本才会显示这个副本的邀请链接
						continue;
					}
				}else if (castNum == ChatConst.CROSS_TEAMKING) {
					if (!HeroFunction.getIns().checkSystemOpen(role, SystemIdConst.CROSS_TEAMKING)) {
						continue;
					}
					int rebornlv = role.getCrossTeamKingLocal().getReborenType();
					Object[] obj = (Object[])params;
					int rebornType = Integer.valueOf(obj[1].toString());
					if (rebornlv!=rebornType) {
						continue;
					}
				}else if (castNum == ChatConst.REBORN_FB_YAOQING) {
					// 轮回等级要足够
					Object[] obj = (Object[]) params;
					int id = Integer.valueOf(obj[1].toString());
					if(role.getReincarnationLevel() < id/1000) {
						continue;
					}
				}
				ChatSender.sendCmd_456(role.getId(), castNum, setReturnParam);
			}
		} catch (Exception e) {
			LogTool.error(e, this);
		}
	}
	/***
	 * 按照转生广播
	 * @param castNum
	 * @param params
	 * @param minReborn 最小转生
	 * @param maxReborn 最大转生
	 */
	public void boardCastByReborn(int castNum,Object params,int minReborn,int maxReborn){
		try {
			String setReturnParam = setReturnParam(params);
			//通过广播编号获得系统id
			Struct_tishi_703 guangbo_205 = Config_tishi_703.getIns().get(castNum);
			if(guangbo_205 == null){
				LogTool.warn("broadCast castNum is error!castNum:"+castNum+" 广播表还没录",this);
				return;
			}
			Map<Long, Hero> roleCache = HeroCache.getHeroMap();
			Iterator<Hero> it = roleCache.values().iterator();
			//Struct_xitongkaiqi_103 xitongkaiqi_103 = Config_xitongkaiqi_103.getIns().get(sysId);
			while(it.hasNext()){
				Hero role = it.next();
				int rebornlv = role.getRebornlv();
				if (rebornlv>=minReborn&&rebornlv<=maxReborn) {
					ChatSender.sendCmd_456(role.getId(), castNum, setReturnParam);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this);
		}
	}
	
	/**
	 * 广播个人
	 */
	public void broadCast(Hero hero,int castNum,Object params) {
		String setReturnParam = setReturnParam(params);
		//通过广播编号获得系统id
		Struct_tishi_703 guangbo_205 = Config_tishi_703.getIns().get(castNum);
		if(guangbo_205 == null){
			LogTool.warn("broadCast castNum is error!castNum:"+castNum,this);
			return;
		}
		ChatSender.sendCmd_456(hero.getId(), castNum, setReturnParam);
	}
	
	/**
	 * 广播，限制等级
	 * @param castNum
	 * @param params
	 * @param type
	 * @param lvLimit 限制等级
	 * @param isLargeEq 是否大于等于此等级收到，true为是，false为小于等于此等级收到
	 */
	public void boardCastByLv(int castNum,Object params,int lvLimit,boolean isLargeEq){
		Map<Long, Hero> roleCache = HeroCache.getHeroMap();
		Iterator<Hero> it = roleCache.values().iterator();
		while(it.hasNext()){
			Hero role = it.next();
			if(isLargeEq && role.getRealLevel()<lvLimit){
				//大于等于30级等级，但角色为40级
				continue;
			}
			if(!isLargeEq && role.getRealLevel()>lvLimit){
				//小于等于30级等级，但角色为10级
				continue;
			}
			ChatSender.sendCmd_456(role.getId(),  castNum, setReturnParam(params));
		}
	}
	
	/**
	 * 广播，限制等级
	 * @param castNum
	 * @param params
	 * @param type
	 * @param lvLimit 限制等级
	 * @param isLessEq 是否小于等于此等级收到，true为是，false为大于等于此等级收到
	 */
	public void boardCastTreasureRaider(int castNum,Object params,int minLv,int maxLv){
		Map<Long, Hero> roleCache = HeroCache.getHeroMap();
		Iterator<Hero> it = roleCache.values().iterator();
		while(it.hasNext()){
			Hero role = it.next();
			if(minLv<=role.getRealLevel() && maxLv>=role.getRealLevel()){
				ChatSender.sendCmd_456(role.getId(),  castNum, setReturnParam(params));
			}
		}
	}
	
	/**
	 * 根据传入的对象参数组织成X,X,X的string类型参数
	 * @param params
	 * @return
	 */
	public String setReturnParam(Object params){
		StringBuffer returnParam = new StringBuffer();
		//获取返回前端参数
		if(params!=null){
			if(params instanceof Object[]){
				Object[] objs = (Object[])params;
				for(int i=0;i<objs.length;i++){
					if(i==0){
						returnParam.append(setReturnParamArr(objs[i]));
					}else{
						returnParam.append(Tools.DELIMITER_INNER_ITEM+setReturnParamArr(objs[i]));
					}
				}
			}else{
				returnParam.append(setReturnParamArr(params));
			}
		}
		return returnParam.toString();
	}
	
	/**
	 * 根据传入的对象参数组织成X_X_X的string类型参数
	 * @param params
	 * @return
	 */
	public String setReturnParamArr(Object params){
		StringBuffer returnParam = new StringBuffer();
		//获取返回前端参数
		if(params!=null){
			if(params instanceof Object[]){
				Object[] objs = (Object[])params;
				for(int i=0;i<objs.length;i++){
					if(i==0){
						returnParam.append(objs[i]);
					}else{
						returnParam.append(Tools.DELIMITER_CAS_ITEMS+objs[i]);
					}
				}
			}else{
				returnParam.append(params);
			}
		}
		return returnParam.toString();
	}
	
	/**
	 * 登录时候发2条
	 * @param hero
	 */
	public void loginToTwo(Hero hero){
		try {
			int type=ChatConst.LOCAL;
			if (TimeDateUtil.serverOpenOverDays(7)) {
				type=ChatConst.CROSS;
			}
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_CHAT)) return;
			ArrayList<ChatHistorys> chatHistory=ChatCache.getChaHistorys().get(type);
			if (chatHistory!=null) {
				Object[] info=new Object[chatHistory.size()];
				for (int i = 0; i < info.length; i++) {
					ChatHistorys chatHistorys=chatHistory.get(i);
					long hid = chatHistorys.getChatCrossModel().getHid();
					int level=chatHistorys.getChatCrossModel().getLevel();
					int reincarnationLevel=chatHistorys.getChatCrossModel().getReincarnationLevel();
					long str=chatHistorys.getChatCrossModel().getStr();
					int promotionLv=chatHistorys.getChatCrossModel().getPromotionLv();
					int rebornType=chatHistorys.getChatCrossModel().getRebornType();
					int CountryType=chatHistorys.getChatCrossModel().getCountryType();
					int official=chatHistorys.getChatCrossModel().getOfficial();
					String name = chatHistorys.getChatCrossModel().getName();
					int vipLv =chatHistorys.getChatCrossModel().getVipLv();
					int herdiceon =chatHistorys.getChatCrossModel().getHerdid();
					int frame=chatHistorys.getChatCrossModel().getHerdUi();
					int titleId=chatHistorys.getChatCrossModel().getTitleId();
					int job=chatHistorys.getChatCrossModel().getJob();
					int godWeapon = chatHistorys.getChatCrossModel().getGodWeapon();
					int show=chatHistorys.getChatCrossModel().getIsShow();
				    String maString=chatHistorys.getChatCrossModel().getMsg();
				    int mountId = chatHistorys.getChatCrossModel().getMountId();
					//[B:频道L:玩家idU:名称B:vip等级I:等级I:转生L:战斗力I:晋升B:国家I:将衔U:内容]
					if(!hero.getChat().getBlackMap().containsKey(hid)){
						info[i]=new Object[]{type,hid,name,vipLv,herdiceon,frame,level,rebornType,2222222222l,promotionLv,CountryType, official,titleId,job,godWeapon,show,maString,reincarnationLevel,mountId};
					}
				}
				info=CommonUtil.removeNull(info);
				if (info.length>=2) {
					Object[] info1=new Object[2];
					info1[0]=info[info.length-2];
					info1[1]=info[info.length-1];
					ChatSender.sendCmd_460(hero.getId(), info1);
				}else {
					ChatSender.sendCmd_460(hero.getId(), info);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, LogTool.getmsg(hero.getId(), hero.getName(), "loginToTwo error."));
		}

	}

	/**
	 * 咨询客服
	 * @param hero
	 * @param content
	 * @param tranid
	 */
	public void kefuRequest(Hero hero, String content, int tranid) {
		Chat chat = hero.getChat();
		if(chat == null){
			return;
		}
		
		String mingan = IlliegalUtil.isMingan(content,1);
		if(mingan!=null){
			content = mingan;
		}
		//入库
		int currentTime = TimeDateUtil.getCurrentTime();
		M_KefuRequest request = new M_KefuRequest();
		request.setReqTime(currentTime);
		request.setHid(hero.getId());
		request.setName(hero.getNameZoneid());
		request.setVipLv(hero.getVipLv());
		request.setZoneid(hero.getZoneid());
		request.setPf(hero.getLoginPf());
		request.setContent(content);
		try {
			//返回前端
			ChatSender.sendCmd_472(hero.getId(), 0);
			//上报
			StringBuilder url = new StringBuilder(GameProperties.openApiAddress+"?mod=kefu&op=gmservice&cmd=107009");
			url.append("&randnum="+currentTime);
			url.append("&openid="+hero.getOpenid());
			url.append("&zoneid="+hero.getZoneid());
			url.append("&rolename="+URLEncoder.encode(hero.getNameZoneid(), "utf-8"));
			url.append("&rid="+hero.getId());
			url.append("&viplv="+hero.getVipLv());
			url.append("&transid="+tranid);
			url.append("&type=0");
			url.append("&content="+URLEncoder.encode(content, "utf-8"));
			url.append("&cid="+request.getId());
			url.append("&pf="+hero.getLoginPf());
			LogTool.info(url.toString(), ChatManager.class);
			String response = HttpUtil.connectGet(url.toString());
			ResponseResult result = JsonUtils.toObj(response, ResponseResult.class);
			if(result != null){
				LogTool.info("kefuRequest http result:"+result.getRet()+",msg:"+result.getMsg(), ChatManager.class);
			}
			if(result != null && result.getRet() != 0){
				LogTool.warn("kefuRequest http error!respone:"+response, ChatManager.class);
			}
		} catch (Exception e) {
			LogTool.error(e, ChatManager.class, "insertKefurequest error!");
		}
	}

	public void openBlack(Hero hero) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_CHAT)) return;
			Chat chat=hero.getChat();
			Object[] black=null;
			if (hero.getChat().getBlackMap().size()>0) {
				black=new Object[chat.getBlackMap().size()];
				int i=0;
				for (long id :chat.getBlackMap().keySet()) {
					String name=chat.getBlackMap().get(id);
					black[i]=new Object[] {id,name};
					i++;
				}
				ChatSender.sendCmd_478(hero.getId(), black);
				return;
			}
			ChatSender.sendCmd_478(hero.getId(), black);
			return;
		} catch (Exception e) {
			LogTool.error(e, ChatManager.class, "openBlack error!");
		}
		
	}
	
	public void addblack(Hero hero, long hidOth,String name) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_CHAT)) return;
			if(hero.getChat().getBlackMap().size()>=Config_xtcs_004.getIns().get(ChatConst.BLACKMAX_NUM).getNum()) {
				ChatSender.sendCmd_474(hero.getId(), 3, hidOth);
				return;
			}
			if(!hero.getChat().getBlackMap().containsKey(hidOth)) {
				hero.getChat().getBlackMap().put(hidOth, name);
				ChatSender.sendCmd_474(hero.getId(), 0, hidOth);
				
				Hero heroOth = HeroCache.getHero(hidOth);
				if( heroOth==null){
					heroOth = HeroCache.getHero(hidOth, HeroConst.FIND_TYPE_CHAT);
				}
				Chat chat = heroOth.getChat();
				HashMap<Long,String> inOthBlackMap = chat.getInOthBlackMap();
				inOthBlackMap.put( hero.getId(), hero.getName());
					
				boolean online = HeroFunction.getIns().isOnline(hidOth);
				if( !online){
					DaoUtil.update( chat, HeroMapper.class, CommonUtil.getZoneIdById(hidOth));
				} 
			}else {
				ChatSender.sendCmd_474(hero.getId(), 2, hidOth);
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, ChatManager.class, "addblack error!, hidOth=" + hidOth);
		}
		
	}

	public void minblack(Hero hero, long hidOth) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_CHAT)) return;
			if(hero.getChat().getBlackMap().containsKey(hidOth)) {
				hero.getChat().getBlackMap().remove(hidOth);
				ChatSender.sendCmd_476(hero.getId(), 0, hidOth);
				
				Hero heroOth = HeroCache.getHero(hidOth);
				if( heroOth==null){
					heroOth = HeroCache.getHero(hidOth, HeroConst.FIND_TYPE_CHAT);
				}
				Chat chat = heroOth.getChat();
				HashMap<Long,String> inOthBlackMap = chat.getInOthBlackMap();
				inOthBlackMap.remove( hero.getId());
					
				boolean online = HeroFunction.getIns().isOnline(hidOth);
				if( !online){
					DaoUtil.update( chat, HeroMapper.class, CommonUtil.getZoneIdById(hidOth));
				}
			}else {
				ChatSender.sendCmd_476(hero.getId(), 1, hidOth);
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, ChatManager.class, "minblack error!");
		}
	}

	/**
	 * 给全服发个信息
	 * @param typeChat  1跨服,2本服,3国家4系统
	 * @param hidSay  默认0
	 * @param herdIcon_1003  默认1003
	 * @param frameIcon_2001  默认2001
	 * @param levelSay_1  默认666
	 * @param strengthSay  默认0
	 * @param promotionLv_1  默认1  晋升
	 * @param rebornID  默认0
	 * @param countryID  默认0
	 * @param official_1  默认1 将衔
	 * @param nameSay
	 * @param vipLvSay  默认0
	 * @param msg
	 */
	public void chatToAllHero( int typeChat, long hidSay, int herdIcon_1003, int frameIcon_2001, int levelSay_1,int reincarnationLevelSay_1, long strengthSay, int promotionLv_1, int rebornID, int countryID, int official_1, String nameSay, int vipLvSay, String msg){
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		Iterator<Entry<Long, Hero>> iterator = heroMap.entrySet().iterator();
		while( iterator.hasNext()){
			Entry<Long, Hero> next = iterator.next();
			long hid = next.getKey();
			
			ChatSender.sendCmd_452( hid, typeChat, hidSay, herdIcon_1003, frameIcon_2001,levelSay_1,strengthSay , promotionLv_1, rebornID, countryID, official_1,0, nameSay, vipLvSay,0,0,0,msg,reincarnationLevelSay_1,0 );
		}
	}

	
	public void chatshow(Hero hero, int type, int index) {
		try {
			if (type < 1 || type > 18) {
				return;
			}
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_CHAT)) return;
			if (hero.getRealLevel()<Config_xtcs_004.getIns().get(ChatConst.CHAT_LEVEL).getNum()) {
				//小于发言等级
				ChatSender.sendCmd_482(hero.getId(), 1);
				return;
			}
			long heroId = hero.getId();
			if(isFbSpeak(heroId))return;
			//1图鉴2宝物3兵法4异宝5神剑6战甲7天书8武将9符文
			StringBuffer msg= new StringBuffer();
			switch (type) {
			case 1:
				//图鉴 星级 等阶 战力 
				ArchiveData archiveData = hero.getArchiveData();
				ArchiveModel archiveModel = archiveData.getArchiveMap().get(index);
				if (archiveModel==null) {
					ChatSender.sendCmd_482(hero.getId(), 1);
					return;
				}
				long str=ArchiveFunction.getIns().getArchiveStrengthByIndex(hero, index);
				msg.append(index).append("_").append(archiveModel.getStarLevelIndex()).append("_").append(archiveModel.getLevelIndex()).append("_").append(str);
				break;
			case 2:
				//宝物 星级 等阶 战力 
				TreasureData treasureData = hero.getTreasureData();
				TreasureModel treasureModel = treasureData.getTreasureMap().get(index);
				if (treasureModel==null) {
					ChatSender.sendCmd_482(hero.getId(), 1);
					return;
				}
				str=TreasureFunction.getIns().getTreasureStrengthByid(hero, index);
				msg.append(index).append("_").append(treasureModel.getStarLevel()).append("_").append(treasureData.getLevel()).append("_").append(str);
				break;
			case 3:
				//兵法 星级 等阶 战力 
				BingFa bingFa = hero.getBingfa();
				BingFaModel bingFaModel = bingFa.getBingfas().get(index);
				if (bingFaModel==null) {
					ChatSender.sendCmd_482(hero.getId(), 1);
					return;
				}
				str=BingFaFunction.getIns().getBingfaStrByid(hero, index);
				msg.append(index).append("_").append(bingFaModel.getStar()).append("_").append(bingFa.getJieLv()).append("_").append(str);
				break;
			case 4:
				//异宝 星级 等阶 战力 
				SpecialTreasure specialTreasure = hero.getSpecialTreasure();
				Integer star=specialTreasure.getTreasureStar().get(index);
				if (star==null) {
					ChatSender.sendCmd_482(hero.getId(), 1);
					return;
				}
				str=SpecialTreasureManager.getIns().getSpeTreasureStrengthByid(hero, index);
				msg.append(index).append("_").append(star).append("_").append(specialTreasure.getJieLv()).append("_").append(str);
				break;	
			case 5:
				//神剑 星级 等阶 战力 
				Excalibur excalibur = hero.getExcalibur();
				ExcaliburModel excaliburModel = excalibur.getExcaliburMap().get(index);
				if (excaliburModel==null) {
					ChatSender.sendCmd_482(hero.getId(), 1);
					return;
				}
				str=ExcaliburFunction.getIns().getExcaliburStrengthByIndex(hero, index);
				msg.append(index).append("_").append(excaliburModel.getStarLevel()).append("_").append(excalibur.getJieLv()).append("_").append(str);
				break;
			case 6:
				//战甲 星级 等阶 战力 
				ZhanJia zhanJia = hero.getZhanJia();
				ZhanJiaModel zhanJiaModel = zhanJia.getZhanjias().get(index);
				if (zhanJiaModel==null) {
					ChatSender.sendCmd_482(hero.getId(), 1);
					return;
				}
				str=ZhanJiaFunction.getIns().getZhanJiaStrByid(hero, index);
				msg.append(index).append("_").append(zhanJiaModel.getStar()).append("_").append(zhanJia.getJieLv()).append("_").append(str);
				break;
			case 7:
				//天书 星级 等阶 战力 
				GodBook godbook = hero.getGodbook();
				GodBookModel godBookModel = godbook.getHasBooks().get(index);
				if (godBookModel==null) {
					ChatSender.sendCmd_482(hero.getId(), 1);
					return;
				}
				str=GodBookFunction.getIns().getZhanJiaStrByid(hero, index);
				msg.append(index).append("_").append(godBookModel.getStar()).append("_").append(godbook.getLevel()).append("_").append(str);
				break;					
			case 8:
				//武将 时装 星级 等阶 战力 技能等级
				WuJiang wuJiang=hero.getWujiang();
			    WuJiangModel wuJiangModel = wuJiang.getWujiangs().get(index);
				if (wuJiangModel==null) {
					ChatSender.sendCmd_482(hero.getId(), 1);
					return;
				}
				FashionClothes fashionClothes=hero.getFashionClothes();
				Integer fashclothid = fashionClothes.getWujiangClothesId().get(index);
				str=WuJiangFunction.getIns().getWuJiangStrByid(hero, index);
				int killlv1=0;
				Map<Integer, SkillInfo> skillMap = hero.getSkill().getSkillMap();
				if(skillMap.containsKey(SkillConst.skiil_site_1)) {
					killlv1=skillMap.get(SkillConst.skiil_site_1).getLevel();
				}
				int killlv2=0;
				if(skillMap.containsKey(SkillConst.skiil_site_2)) {
					killlv2=skillMap.get(SkillConst.skiil_site_2).getLevel();
				}
				int killlv3=0;
				if(skillMap.containsKey(SkillConst.skiil_site_3)) {
					killlv3=skillMap.get(SkillConst.skiil_site_3).getLevel();
				}
				int starLv = wuJiangModel.getStar();
				Struct_hero_211 struct_hero_211=Config_hero_211.getIns().get(wuJiangModel.getType());
				if(struct_hero_211!=null && struct_hero_211.getGodhero()==1) {
					starLv = struct_hero_211.getPinzhi()*1000 + wuJiangModel.getXiulianLv();
				}
				
				msg.append(index).append("_").append(fashclothid).append("_").append(starLv).append("_").append(wuJiang.getJieLv()).append("_").append(str).
				append("_").append(killlv1).append("_").append(killlv2).append("_").append(killlv3).append("_").append(GodWeaponFunction.getIns().getNowGodWeapon(hero,index)).
						append("_").append(wuJiangModel.getTalentLv()).append("_")
						.append(wuJiangModel.getGodSkillLevel());
				break;
			case 9:
				//符文
				PersonalDestiny personalDestiny=hero.getPersonalDestiny();
				ConcurrentHashMap<Integer, DestinyBagData> personBodyData = personalDestiny.getBodyData().get(0);
				DestinyBagData destinyBagData = personBodyData.get(index);
				if (destinyBagData.getDestinyId()!=0) {
					msg.append(destinyBagData.getDestinyId()).append("_").append(destinyBagData.getLevel()).append("_").append(destinyBagData.getStar());
				}
				break;
			case 10:
				// 兽灵装备展示
				Map<Integer, MonsterSpiritInfo> monsterSpiritMap = hero.getMonsterSpiritModel().getMonsterSpiritMap();
				int msType = index / 1000;
				int site = index % 1000;
				MonsterSpiritInfo spiritInfo = monsterSpiritMap.get(msType);
				if (spiritInfo == null) {
					return;
				}
				MonsterSpiritEquip msEquip = spiritInfo.getMsEquipMap().get(site);
				if (msEquip == null) {
					return;
				}
				StringBuilder sb = new StringBuilder();
				Map<Integer, StampData> stampMap = msEquip.getStampMap();
				Iterator<Integer> msIter = stampMap.keySet().iterator();
				for (; msIter.hasNext();) {
					Integer stampSite = msIter.next();
					StampData stampData = stampMap.get(stampSite);
					sb.append(stampSite).append(",").append(stampData.getStampStarId()).append(",")
							.append(stampData.getStampType()).append("@");
				}
				if (sb.length() > 0) {
					sb.setLength(sb.length() - 1);
				}
				long equipStrenght = MonsterSpiritFunction.getIns().getMsEquipStrenght(hero, msType, site, msEquip);
				msg.append(hero.getNameZoneid()).append("_").append(msEquip.getEquipId()).append("_")
						.append(equipStrenght).append("_").append(sb.toString());
				break;
			case 11:
				//少主展示
				LittleLeader littleLeader = hero.getLittleLeader();
				LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(index);
				if (littleLeaderModel == null) {
					return;
				}
				long strenght=LittleLeaderFunction.getIns().getLittleLeaderStrenght(hero, index);
				int beiSkillId1=-1;
				int beiSkillId2=-1;
				int beiSkillId3=-1;
				int beiSkillId4=-1;
				int beiSkillId5=-1;
				for (int i = 0; i < littleLeaderModel.getOtherSkillLv().size(); i++) {
					switch (i) {
					case 0:
						beiSkillId1=littleLeaderModel.getOtherSkillLv().get(i);
						break;
					case 1:
						beiSkillId2=littleLeaderModel.getOtherSkillLv().get(i);
						break;
					case 2:
						beiSkillId3=littleLeaderModel.getOtherSkillLv().get(i);
						break;
					case 3:
						beiSkillId4=littleLeaderModel.getOtherSkillLv().get(i);
						break;
					case 4:
						beiSkillId5=littleLeaderModel.getOtherSkillLv().get(i);
						break;	
					default:
						break;
					}
				}
				//拥有者+少主序号+少主时装+亲密度等级+星级+主动技能等级+战力+被动技能0+被动技能1+被动技能2+被动技能3+被动技能4+潜能重数
                int fashid=littleLeaderModel.getNowFashId();
                int qiannengId = littleLeaderModel.getQiannengId();
				msg.append(hero.getNameZoneid()).append("_").append(index).append("_").append(fashid).append("_").append(littleLeaderModel.getQimiduLv())
				.append("_").append(littleLeaderModel.getStar()).append("_").append(littleLeaderModel.getActivityKillLv())
				.append("_").append(strenght).append("_").append(beiSkillId1).append("_").append(beiSkillId2).append("_").append(beiSkillId3)
				.append("_").append(beiSkillId4).append("_").append(beiSkillId5).append("_").append(qiannengId);
				break;
			case 12:
				// 专属神兵展示
				GodWeapon godWeapon = hero.getGodWeapon();
				GodWeaponInfo godWeaponInfo = godWeapon.getWeaponIdByWuJiang().get(index/1000);
				if(godWeaponInfo == null) {
					return;
				}
				msg.append(index).append("_").append(godWeaponInfo.getStar()).append("_").append(godWeaponInfo.getCuilianLevel()).append("_").append(GodWeaponManager.getIns().getGodWeaponStrengthByid(hero, godWeaponInfo));
				System.out.println(msg.toString());
				break;
			case 13:
				// 专属神兵皮肤展示
				GodWeapon godWeapon2 = hero.getGodWeapon();
				GodWeaponInfo godWeaponInfo2 = godWeapon2.getWeaponIdByWuJiang().get(index/1000);
				if(godWeaponInfo2 == null) {
					return;
				}
				msg.append(index).append("_").append(godWeaponInfo2.getStar()).append("_").append(godWeaponInfo2.getCuilianLevel()).append("_").append(GodWeaponManager.getIns().getGodWeaponStrengthByid(hero, godWeaponInfo2));
				System.out.println(msg.toString());
				break;
			case 14:
				// 异兽录展示
				SpecialAnimalDir specialAnimalDir = hero.getSpecialAnimalDir();
				Map<Integer, SpecialAnimalDirInfo> infoMap = specialAnimalDir.getInfoMap();
				SpecialAnimalDirInfo specialAnimalDirInfo = infoMap.get(index);
				if (specialAnimalDirInfo == null) {
					return;
				}
				int upId = specialAnimalDirInfo.getUpId();
				int strenght1 = SpecialAnimalDirFunction.getIns().getStrenght(hero, index);
				int suitId = specialAnimalDirInfo.getSuitId();
				int step = specialAnimalDirInfo.getStep();
				msg.append(hero.getNameZoneid()).append("_").append(index).append("_").append(upId)
						.append("_")
						.append(strenght1).append("_").append(suitId).append("_").append(step);
				break;
			case 15:
				// 奇策展示
				QiCe qiCe = hero.getQiCe();
				HashMap<Integer, QiCeModel> qiCeMap = qiCe.getQiCeMap();
				QiCeModel qiCeModel = qiCeMap.get(index);
				if (qiCeModel == null) {
					return;
				}
				str = QiCeFunction.getIns().getQiCeMaptrByid(hero, index);
				msg.append(index).append("_").append(qiCeModel.getStar()).append("_").append(qiCeModel.getJieLv())
						.append("_").append(str);
				break;
			case 16://坐骑展示
				Mount mount = hero.getMount();
				MountModel mountModel = mount.getMountModels().get(index);
				if (mountModel == null) {
					return;
				}
				//拥有者+坐骑id+战力+星级id+坐骑等级id
				long mountStrenght = MountFunction.getIns().getMountStrenght(hero, index);
				msg.append(hero.getNameZoneid()).append("_").append(index).append("_").append(mountStrenght).append("_").append(mountModel.getStarId()).append("_").append(mountModel.getUpgradeLv());
				break;
			case 17:
				// 侍女展示
				Maid maid = hero.getMaid();
				HashMap<Integer, MaidModel> maidMap = maid.getMaidMap();
				MaidModel maidModel = maidMap.get(index);
				if (maidModel == null) {
					return;
				}
				str = MaidFunction.getIns().getMaidMaptrByid(hero, index);
				msg.append(index).append("_").append(maidModel.getStar()).append("_").append(maidModel.getLevel())
						.append("_").append(str);
				break;
			case 18://幻化坐骑展示
				Mount mountHh = hero.getMount();
				MountModel mountModelHh = mountHh.getMountModels().get(index);
				if (mountModelHh == null) {
					return;
				}
				//玩家名称+坐骑id+战力+坐骑幻化培养id(阶级)
				long mountStrenghtHh = MountFunction.getIns().getMountStrenght(hero, index);
				msg.append(hero.getNameZoneid()).append("_").append(index).append("_").append(mountStrenghtHh).append("_").append(mountModelHh.getUnrealId());
				break;
			default:
				break;
			}
			long hid = hero.getId();
			int level=hero.getLevel();
			int reincarnationLevel=hero.getReincarnationLevel();
			long str=hero.getTotalStrength();
			int  promotionLv=0;
			if (hero.getPromotionModel()!=null) {
				 promotionLv=hero.getPromotionModel().getLevel();
			}
			int rebornType=hero.getRebornlv();
			int CountryType=hero.getCountryType();
			if (hero.getSettingData().getShowCountry()==1) {
				CountryType=0;
			}
			int titleId=hero.getTitleId();
			int official=hero.getOfficial();
			String name = hero.getNameZoneid();
			int vipLv = hero.getVipLv();
			int herdiceon =hero.getSettingData().getIcon();
			int frame=hero.getSettingData().getFrame();
			int job=hero.getJob();
			int godWeapon = GodWeaponFunction.getIns().getNowGodWeapon(hero);
			int mountId = hero.getMountId();
			if (hero.getIllegalState()!=0) {
				//被禁言了
				if(hero.getAdState() == AdMonitorConst.STATE_4){
					//广告号记录聊天内容，只能自己看到自己的发言
					//ChatSender.sendCmd_454(hero.getId(), 2);
					ChatSender.sendCmd_452(hero.getId(), 1, hid,herdiceon,frame,level,str , promotionLv, rebornType, CountryType, official,titleId, name, vipLv,job,godWeapon,type, msg.toString(),reincarnationLevel,mountId );
				}else {
					ChatSender.sendCmd_454(hero.getId(), 1);
				}
				return;
			}
			int now = TimeDateUtil.getCurrentTime();
			int maxNum=Config_xtcs_004.getIns().get(ChatConst.DAY_NUM).getNum();
			//聊天数量
			if (hero.getChat().getLocalCiShu()>=maxNum&&hero.getVipLv()<3) {
				ChatSender.sendCmd_458(hero.getId(), 5,0);
				return;
			}
			Channel channel = Client_2.getIns().getCrossChannel();
			boolean isActive = channel.isActive();
			if( !isActive){
				ChatSender.sendCmd_458(hero.getId(), 8,0);
				return;
			}
			int crossLenQueShiJian = hero.getTempVariables().getCrossLengQueShiJian();
			//聊天最小间隔
			if(now - crossLenQueShiJian<ChatConst.CROSS_TIME){
				int lastTime=ChatConst.CROSS_TIME- now + crossLenQueShiJian;
				if (lastTime<=0) {
					lastTime=0;
				}
				ChatSender.sendCmd_458(hero.getId(), 4,lastTime);
				return;
			}
			hero.getTempVariables().setCrossLengQueShiJian(now);
			//B:(1跨服,2本服,3国家4系统)L:玩家idI:等级L:战斗力I:晋升I:转生B:国家I:将衔U:名字B:vipU:内容
			ChatCrossModel chatCrossModel=new ChatCrossModel(hid,herdiceon,frame, level,reincarnationLevel, str, promotionLv, rebornType, CountryType, official, vipLv,titleId,job,godWeapon,type,name,msg.toString(),mountId);
			if (TimeDateUtil.serverOpenOverDays(7)) {
				//跨服
				ChatLocalIO.getIns().SGChat(chatCrossModel);
				/*//添加到聊天缓存
				ArrayList<ChatHistorys> chatHistory=ChatCache.getChaHistorys().get(ChatConst.CROSS);
				if (chatHistory==null) {
					chatHistory=new ArrayList<ChatHistorys>();
					ChatCache.getChaHistorys().put(ChatConst.CROSS, chatHistory);
					chatHistory.add(new ChatHistorys(chatCrossModel.getHid(),chatCrossModel));
				}else {
					if (chatHistory.size()>=ChatConst.WROLD_MAX_NUM) {
						chatHistory.remove(0);
					}
					chatHistory.add(new ChatHistorys(chatCrossModel.getHid(),chatCrossModel));
				}*/
				hero.getChat().setCrossCiShu(hero.getChat().getCrossCiShu()+1);
			}else {
				//添加到聊天缓存
				ArrayList<ChatHistorys> chatHistory=ChatCache.getChaHistorys().get(ChatConst.LOCAL);
				if (chatHistory==null) {
					chatHistory=new ArrayList<ChatHistorys>();
					ChatCache.getChaHistorys().put(ChatConst.LOCAL, chatHistory);
					chatHistory.add(new ChatHistorys(chatCrossModel.getHid(),chatCrossModel));
				}else {
					if (chatHistory.size()>=ChatConst.WROLD_MAX_NUM) {
						chatHistory.remove(0);
					}
					chatHistory.add(new ChatHistorys(chatCrossModel.getHid(),chatCrossModel));
				}
				//广播本地服
				Iterator<Long> iterator = HeroCache.getHeroMap().keySet().iterator();
				while(iterator.hasNext()){
					Long next = iterator.next();
					if(HeroFunction.getIns().isOnline(next)){
						Hero h= HeroCache.getHero(next);
						if (h.getChat()==null) {
							LogTool.warn("h.getChat()==null"+next, ChatManager.class);
							continue;
						}
						if (h.getChat().getBlackMap()==null) {
							LogTool.warn("h.getChat().getBlackMap()"+next, ChatManager.class);
							continue;
						}
						if(!h.getChat().getBlackMap().containsKey(chatCrossModel.getHid())){
							ChatSender.sendCmd_452(h.getId(), ChatConst.LOCAL, chatCrossModel.getHid(),chatCrossModel.getHerdid(),chatCrossModel.getHerdUi(),
									chatCrossModel.getLevel(),chatCrossModel.getStr() ,chatCrossModel.getPromotionLv(),chatCrossModel.getRebornType(),chatCrossModel.getCountryType(), chatCrossModel.getOfficial(),chatCrossModel.getTitleId(), chatCrossModel.getName(), chatCrossModel.getVipLv(),chatCrossModel.getJob(),chatCrossModel.getGodWeapon(),chatCrossModel.getIsShow(), chatCrossModel.getMsg(), chatCrossModel.getReincarnationLevel(),chatCrossModel.getMountId());
						}
					}
				}
				hero.getChat().setLocalCiShu(hero.getChat().getLocalCiShu()+1);
			}
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE7);
			ChatSender.sendCmd_482(hid, 0);
		} catch (Exception e) {
			LogTool.error(e, ChatManager.class, "chatshow has wrong type:"+type+" index:"+index);
		}
		
	}
}
