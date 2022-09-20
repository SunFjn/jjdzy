package com.teamtop.system.hero;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.switchOnOff.OnOffTypeEnum;
import com.teamtop.main.RunServerException;
import com.teamtop.system.equip.EquipEvent;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.LRUCache;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.MybatisUtil;
import com.teamtop.util.time.TimeDateUtil;
/**
 * 角色缓存类
 * @author kyle
 *
 */
public class HeroCache extends AbsServerEvent {
	/** 充值入口开关 true为可充值*/
	private static volatile boolean isCanRecharge = true;
	/**ios充值关卡数*/
	private static volatile int iosChargeGuanka=0;
	/** 通用掉落 key：组id，value：pe*/
	private static Map<Integer, ProbabilityEventModel> dropmap = UC.reg("dropmap", new HashMap<Integer, ProbabilityEventModel>());
	/**
	 * hero缓存，包括在线和离线但没删除的
	 */
	private static ConcurrentHashMap<Long,Hero> heroMap = UC.reg("heromap", new ConcurrentHashMap<Long,Hero>());//角色缓存
	private static ConcurrentHashMap<Integer, LRUCache<Long,Hero>> tempHeroMap =  UC.reg("tempHeroMap",new ConcurrentHashMap<Integer, LRUCache<Long,Hero>>());
	private static List<String> includeTbs = new ArrayList<String>();
	/**
	 * 缓存开关 1:微信分享开关->0关 1开 ，2:自定义修改名字开关->1开启 2关闭
	 */
	private static OnOffModel onOffModel = new OnOffModel();
	/**合服时间**/
	public static  int hefuTime=0;
	
	/**
	 * 基础属性
	 */
	private static Grow grow;
	
	/**
	 * cmd统计
	 */
	private static ConcurrentHashMap<Long,Map<Integer, int[]>> secondCmdCountMap = new ConcurrentHashMap<Long, Map<Integer,int[]>>();

	public static void countSecondCmd(int cmd, long hid) {
		Map<Integer, int[]> map = secondCmdCountMap.get(hid);
		if(map == null){
			map = new ConcurrentHashMap<Integer, int[]>();
			secondCmdCountMap.put(hid, map);
		}
		int[] info = map.get(cmd);
		int currentTime = TimeDateUtil.getCurrentTime();
		if(info == null) {
			info = new int[2];
			info[0] = currentTime;
			map.put(cmd, info);
		}
		if(info[0] == currentTime) {
			info[1] += 1;
			if(info[1] >= 1) {
				LogTool.info(hid, "", "countSecondCmd cmd="+cmd+", num="+info[1]+", currentTime="+currentTime, HeroCache.class);
			}
		}else {
			info[0] = currentTime;
			info[1] = 1;
		}
		int[] is = map.get(0);
		if(is == null) {
			is = new int[2];
			is[0] = currentTime;
			map.put(0, is);
		}
		if(is[0] == currentTime) {
			is[1] += 1;
			if(is[1] >= 1) {
				LogTool.info(hid, "", "countSecondCmd cmd="+0+", num="+is[1]+", currentTime="+currentTime, HeroCache.class);
			}
		}else {
			is[0] = currentTime;
			is[1] = 1;
		}
	}
	
	/**
	 * 获取掉落
	 */
	public static ProbabilityEventModel getDrop(int group) {
		return dropmap.get(group);
	}
	
	public static Map<Integer, ProbabilityEventModel> getDropmap() {
		return dropmap;
	}
	public static Grow getGrow() {
		return grow;
	}
	public static Map<Long,Hero> getHeroMap(){
		return heroMap;
	} 
	public static Hero getHero(Long hid){
		return heroMap.get(hid);
	}
	public static void removeHero(Long hid){
		heroMap.remove(hid);
	}
	public static void putHero(Hero hero){
		heroMap.put(hero.getId(), hero);
	}
	
	
	public static boolean isCanRecharge() {
		return isCanRecharge;
	}

	public static void setCanRecharge(boolean isCanRecharge) {
		HeroCache.isCanRecharge = isCanRecharge;
	}
	public static int getIosChargeGuanka() {
		return iosChargeGuanka;
	}

	public static void setIosChargeGuanka(int iosChargeGuanka) {
		HeroCache.iosChargeGuanka = iosChargeGuanka;
	}

	public static OnOffModel getOnOffModel() {
		return onOffModel;
	}

	public static void setOnOffModel(OnOffModel onOffModel) {
		HeroCache.onOffModel = onOffModel;
	}
	
	

	public static int getHefuTime() {
		return hefuTime;
	}

	public static void setHefuTime(int hefuTime) {
		HeroCache.hefuTime = hefuTime;
	}

	/**
	 * 查找离线角色时初始化需要查看的数据表
	 */
	private static void initIncludeTbs(){
		includeTbs.add("skill");//技能
		includeTbs.add("shenbing");//神兵
		includeTbs.add("forge");//锻造
		includeTbs.add("equipData");//装备
		includeTbs.add("crossKing");//（乱世枭雄）跨服王者
	}
	/**
	 * 
	 * @param hid
	 * @param findType HeroConst.FIND_TYPE_BASIC
	 * @return
	 */
	public static Hero getHero(long hid, int findType) {
		//长度验证
		if(String.valueOf(hid).length() < 16){
			return null;
		}
		int zid = MybatisUtil.getZoneid(hid);
		if(GameProperties.zoneids!=null && !GameProperties.zoneids.contains(zid) && !CrossZone.isCrossServer()){
			return null;
		}
		Hero hero = getHero(hid);
		if(hero != null) return hero;
		if(findType==HeroConst.FIND_TYPE_FRIEND){
			return getFriendHero(hid);
		}
		if (hero == null) {
			LRUCache<Long, Hero> lruCache = tempHeroMap.get(findType);
			if(lruCache==null){
				lruCache = new LRUCache<Long,Hero>("test",100);
				tempHeroMap.put(findType, lruCache);
			}
			hero = lruCache.get(hid);
			if(hero==null){
				try {
					if (findType == HeroConst.FIND_TYPE_ALL) {
						//查找角色信息
						hero = HeroDao.getIns().findWithInclude(hid, includeTbs);
						//初始化部分系统
						//initHeroForFind(hero);
					}else if (findType == HeroConst.FIND_TYPE_BASIC) {
						// 查找基本信息
						List<String> tempTbs = new ArrayList<String>();
						hero = HeroDao.getIns().findWithInclude(hid, tempTbs);
						if(hero==null) return null;
					}else if(findType == HeroConst.FIND_TYPE_BATTLE){
						List<String> tempTbs = new ArrayList<String>();
						//（宝物1id）1（宝物1星级）2（宝物2）3（宝物2星级）4（天书id）5（天书星级）6（武将星级）
						tempTbs.add("skill");
						tempTbs.add("shenbing");
						tempTbs.add("crossKing");
						tempTbs.add("treasureData");
						tempTbs.add("godbook");
						tempTbs.add("wujiang");
						tempTbs.add("godweapon");
						hero = HeroDao.getIns().findWithInclude(hid, tempTbs);
						if(hero==null) return null;
					}else if(findType == HeroConst.FIND_TYPE_COUNTRYDATA) {
						List<String> tempTbs = new ArrayList<String>();
						tempTbs.add("countryData");
						hero = HeroDao.getIns().findWithInclude(hid, tempTbs);
						if(hero==null) return null;
					}else if(findType == HeroConst.FIND_TYPE_BAG) {
						List<String> tempTbs = new ArrayList<String>();
						tempTbs.add("bag");
						hero = HeroDao.getIns().findWithInclude(hid, tempTbs);
						if(hero==null) return null;
					}else if(findType == HeroConst.FIND_TYPE_TITLE) {
						List<String> tempTbs = new ArrayList<String>();
						tempTbs.add("titleModel");
						hero = HeroDao.getIns().findWithInclude(hid, tempTbs);
						if(hero==null) return null;
					}else if(findType == HeroConst.FIND_TYPE_CHAT) {
						List<String> tempTbs = new ArrayList<String>();
						tempTbs.add("chat");
						hero = HeroDao.getIns().findWithInclude(hid, tempTbs);
						if(hero==null) return null;
					}else if(findType == HeroConst.FIND_TYPE_HOUTAI) {
						//后台查询:人物基础属性+7系统+武将+时装+称号（1图鉴2宝物3兵法4异宝5神剑6战甲7天书）
						List<String> tempTbs = new ArrayList<String>();
						tempTbs.add("archiveData");
						tempTbs.add("treasureData");
						tempTbs.add("bingfa");
						tempTbs.add("specialTreasure");
						tempTbs.add("excalibur");
						tempTbs.add("zhanJia");
						tempTbs.add("godbook");
						tempTbs.add("wujiang");
						tempTbs.add("fashionClothes");
						tempTbs.add("titleModel");
						tempTbs.add("equipData");
						tempTbs.add("generalSoul");
						tempTbs.add("monsterSpiritModel");
						tempTbs.add("personalDestiny");
						hero = HeroDao.getIns().findWithInclude(hid, tempTbs);
						EquipEvent.getIns().init(hero);
						if(hero==null) return null;
					} else if (findType == HeroConst.FIND_TYPE_SHAOZHU_ESCORT) {
						List<String> tempTbs = new ArrayList<String>();
						tempTbs.add("shaozhuEscort");
						tempTbs.add("monsterSpiritModel");
						tempTbs.add("wujiang");
						tempTbs.add("skill");
						hero = HeroDao.getIns().findWithInclude(hid, tempTbs);
						if (hero == null)
							return null;
					}else if(findType == HeroConst.FIND_TYPE_WEI_XIN_SHARE) {
						List<String> tempTbs = new ArrayList<String>();
						tempTbs.add("weixinshare");
						hero = HeroDao.getIns().findWithInclude(hid, tempTbs);
						if(hero==null) return null;
					}
				} catch (Exception e) {
					LogTool.error(e,HeroCache.class, "getHero err,findType:" + findType + ",hid:" + hid);
				}
				if(hero!=null){
					lruCache.put(hid, hero);
						
				}
			}
		}
		return hero;
	}
	/**
	 * 获取好友
	 * @param hid
	 * @return
	 */
	private static Hero getFriendHero(long hid){
//		Hero hero = FriendCache.getFriendHeroMap().get(hid);
		Hero hero =null;
//		if(hero==null){
		try {
			List<String> tempTbs = new ArrayList<String>();
			tempTbs.add("friend");
//			tempTbs.add("vip");
//				tempTbs.add("workShop");
			hero = HeroDao.getIns().findWithInclude(hid, tempTbs);
			if(hero==null){
				return null;
			}
//				if(hero != null) {
//					Gang gang = GangCache.getGang(hero.getGangId());
//					if(gang!=null){
//						hero.setGangName(gang.getName());
//					}
//				}
//				FriendCache.putFriend(hero);
		} catch (Exception e) {
			LogTool.error(e,HeroCache.class, "getHero Friend err,hid:" + hid);
		}
//		}
		return hero;
	}
	/**
	 * 移除临时hero缓存
	 * @param hid
	 */
	public static void removeTempHero(Long hid){
		try {
			Collection<LRUCache<Long, Hero>> values = tempHeroMap.values();
			Iterator<LRUCache<Long, Hero>> it = values.iterator();
			while(it.hasNext()){
				LRUCache<Long, Hero> next = it.next();
				next.get().remove(hid);
			}
		} catch (Exception e) {
			LogTool.error(e,HeroCache.class, "removeTempHero err,hid:" + hid);
		}
	}
	/**
	 * 查找离线角色时初始化部分系统
	 * @param hero
	 */
	private static void initHeroForFind(Hero hero){
		try {
//			EquipEvent.getIns().initForOffline(hero);//初始化装备
			EquipEvent.getIns().init(hero);
		} catch (Exception e) {
			LogTool.error(e, HeroCache.class,"initHeroForFind err, hid:" + hero.getId());
		}
	}
	@Override
	public void startServer() throws RunServerException {
		grow = new Grow(1000, 0, 200, 100, 100, 0, 0, 0, 0, 0, 200);
		initIncludeTbs();
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.IOS_RECHARGENUM);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				iosChargeGuanka=0;
			} else {
				iosChargeGuanka = Integer.parseInt(content);
			}
		} catch (Exception e) {
			LogTool.error(e, HeroCache.class, "HeroCache startServer GlobalConst.IOS_RECHARGENUM");
		}
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.ON_OFF);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				OnOffModel onOffModel=new OnOffModel();
				onOffModel.setOnOffCache(new ConcurrentHashMap<Integer, Integer>());
				onOffModel.getOnOffCache().put(OnOffTypeEnum.WEIXIN_SHARE_ONOFF.getCountryType(), 0);
				setOnOffModel(onOffModel);
			} else {
				setOnOffModel(ObjStrTransUtil.toObj(content, OnOffModel.class));
			}
		} catch (Exception e) {
			LogTool.error(e, HeroCache.class, "HeroCache startServer GlobalConst.IOS_RECHARGENUM");
		}
		
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.HE_FU_TIME);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			} else {
				setHefuTime(Integer.parseInt(content));
			}
		} catch (Exception e) {
			LogTool.error(e, HeroCache.class, "HefuActivitySysCache startServer");
			throw new RunServerException(e, "");
		}
		
		//修复玩家充值次数 牵扯充值订单表
		/*try {
			List<B_PayAccount> selectAllB_PayAccount = HoutaiDao.getIns().selectAllB_PayAccount();
			HashMap<String, List<B_PayAccount>> B_PayAccountMapByHid=new HashMap<String, List<B_PayAccount>>();
			if (selectAllB_PayAccount!=null) {
				for (int i = 0; i < selectAllB_PayAccount.size(); i++) {
					B_PayAccount b_PayAccount = selectAllB_PayAccount.get(i);
					if (b_PayAccount.getPayState()==1) {
						String openid = b_PayAccount.getOpenid();
						if (B_PayAccountMapByHid.containsKey(openid)) {
							List<B_PayAccount> list = B_PayAccountMapByHid.get(openid);
							list.add(b_PayAccount);
						}else {
							B_PayAccountMapByHid.put(openid, new ArrayList<B_PayAccount>());
							List<B_PayAccount> list = B_PayAccountMapByHid.get(openid);
							list.add(b_PayAccount);
						}
					}
				}
				if (B_PayAccountMapByHid.size()>0) {
					for (String keystr:B_PayAccountMapByHid.keySet()) {
						List<B_PayAccount> list = B_PayAccountMapByHid.get(keystr);
						Collections.sort(list, new B_PayAccountComparator());
						for (int i = 0; i <list.size(); i++) {
							B_PayAccount b_PayAccount = list.get(i);
							b_PayAccount.setSuccessPayNum(i+1);
						}
						int firstZoneId = GameProperties.getFirstZoneId();
						HeroDao.getIns().updateHeroPayNum(keystr, list.size());
						BackstageDao.replaceIntoBatchHasId(list, firstZoneId);
					}
					
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, HeroCache.class, "HoutaiDao.getIns().selectAllB_PayAccount();");
		}*/
		
	}
	
	@Override
	public void initExcel() throws RunServerException {
		initDrop();
	}
	@Override
	public void shutdownServer(){
		try {
			upDate();
			upDateOnOffModel();
		} catch (Exception e) {
			LogTool.error(e, HeroCache.class, "shutdownServer startServer");
		}
		for (Hero hero:HeroCache.getHeroMap().values()) {
			if (HeroFunction.getIns().isOnline(hero.getId())) {
				HeroSender.sendCmd_140(hero.getId(), 1);
			}
		}
	
	}
	/**
	 * 初始化通用掉落
	 */
	public static void initDrop(){
		dropmap.clear();
	}
	
	public static void upDate() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.IOS_RECHARGENUM);
		StringBuilder sb = new StringBuilder();
		sb.append(iosChargeGuanka);
		globalData.setContent(sb.toString());
		GlobalCache.doSync(globalData);
	}
	
	public static void upDateOnOffModel() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.ON_OFF);
			globalData.setContent(ObjStrTransUtil.toStr(getOnOffModel()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, HeroCache.class, "upDateOnOffModel has wrong");
			
		}
	}
}
