package com.teamtop.system.bag;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.mail.QQMailCache;
import com.teamtop.util.mail.QQMailEnum;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_daoju_204;
import excel.struct.Struct_daoju_204;

/**
 * 监控在线玩家背包 仓库 挂售 的物品数量
 * @author Administrator
 *
 */
public class BagCache extends AbsServerEvent{
	
	// private static ScheduledExecutorService executors =
	// ScheduleUtil.makeThread("bagCheckSchedule");
	//特殊名单
	public static Map<Integer,Integer> specialList = new HashMap<Integer,Integer>();
	//每个道具违法的次数 多于这个次数不会发送邮件
	public static int ILLEGAL_NUM = 3;
	
	static{
		specialList.put(40040002, 10000);
		specialList.put(40250001, 20000);
		specialList.put(40650001, 10000);
	}
	
	private static ConcurrentHashMap<Long, Map<Integer,Integer>> illegalMap = UC.reg("illegalMap", new ConcurrentHashMap<Long, Map<Integer,Integer>>());//违规记录名单
	private static ConcurrentLinkedQueue<BagBugItem> bagBugItem = UC.reg("bagBugItemMap", new ConcurrentLinkedQueue<BagBugItem>());//违规记录名单
	
	public static ConcurrentLinkedQueue<BagBugItem> getBagBugItemQueue(){
		return bagBugItem;
	}
	
	public static ConcurrentHashMap<Long, Map<Integer,Integer>> getIllegalMap(){
		return illegalMap;
	}
	
	public static void  addBagBugItem(BagBugItem bagBugItem){
		int sysId = bagBugItem.getSysId();
		Struct_daoju_204 daoju_601 = Config_daoju_204.getIns().get(sysId);
		String name = null;
		if(daoju_601!=null){
			name = "";
		}
		QQMailCache.sendWarn(QQMailEnum.BAG, "hid:"+bagBugItem.getRid()+",sysid:"+sysId+","+name+",num:"+bagBugItem.getNum());
//		getBagBugItemQueue().add(bagBugItem);
	}
	
	
	
	
	public static void startSchedule() {
//		executors.scheduleAtFixedRate(new Runnable() {
//			@Override
//			public void run() {
//					doCheck();
//			}
//		}, 0, 60, TimeUnit.SECONDS);
		
	}
	
	public static void doCheck() {
		//本来写在BagCache.startSchedule()
		Map<Long, Hero> allOnlineHero=HeroCache.getHeroMap();
		for (Hero hero:allOnlineHero.values()) {
			if(!HeroFunction.getIns().isOnline(hero.getId())) continue;
			Map<Integer, Integer>bugItemNum=BagFunction.getIns().checkBagNum(hero);
			if (bugItemNum!=null&&bugItemNum.size()>0) {
				Iterator<Entry<Integer, Integer>> it = bugItemNum.entrySet().iterator();
				while(it.hasNext()){
					Entry<Integer, Integer> entry = it.next();
					int itemId=entry.getKey();
					int num = entry.getValue();
					BagBugItem bagBugItem=new BagBugItem();
					bagBugItem.setRid(hero.getId());
					bagBugItem.setSysId(itemId);
					bagBugItem.setNum(num);
					bagBugItem.setTime(TimeDateUtil.getCurrentTime());
					boolean go = false;
					Map<Integer, Integer> map = illegalMap.get(bagBugItem.getRid());
					if(map==null){
						map = new ConcurrentHashMap<Integer,Integer>();
						illegalMap.put(bagBugItem.getRid(), map);
					}
					Integer count = map.get(itemId);
					if(count==null) count = 0;
					if(count<ILLEGAL_NUM){
						go = true;
						map.put(itemId, count+1);
					}else{
						continue;
					}
					if(go){
						addBagBugItem(bagBugItem);
					}
				}
			}
		}
		//检查完了之后缓存入库
	}
	
	
	@Override
	public void startServer() throws RunServerException {
		startSchedule();
	}

}
