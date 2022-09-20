package com.teamtop.system.crossBoss;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.crossBoss.cross.ZSBoss;
import com.teamtop.system.crossBoss.model.CrossBossAllGlobalData;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

/**
 * 跨服boss
 * @author Administrator
 *
 */
public class CrossBossCache extends AbsServerEvent{
	
	/**跨服boss活动状态  详见 CrossBossConst */
	public static int CROSS_STATE = 0;
	/**
	 * 开始时间
	 */
	public static int startTime;

	/**
	 * 跨服boss数据  分大区—》  {房号:minZoneid/20 ->bossid->:ZSBoss(转生boss)}
	 */
	private static  ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, ZSBoss>>> zsbossMap=UC.reg("zsbossMap", new ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,ZSBoss>>>());
	
	/**分大区—》最小区号映射 {所在区号zoneid:对应最小区minZoneid}*/
	private static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,Integer>> zsBossZoneidMap = new  ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, Integer>>();

	/**所有子服区*/
	private static ConcurrentHashMap<Integer,ConcurrentHashMap<Integer,Integer>> minZoneidMap = new ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, Integer>>();

	/**房间号(minZoneid/20)->跨服boss历史数据 */
	private static  CrossBossAllGlobalData crossBossAllGlobalData=new CrossBossAllGlobalData();
	
	

	
	public static ZSBoss getZSBoss(Hero hero,int bossid){
		int partId = CrossCache.getPartId(hero.getZoneid());
		int minZoneid = zsBossZoneidMap.get(partId).get(hero.getZoneid());
		int roomId=minZoneid/CrossBossConst.ZONEIDSIZE;
		if (zsbossMap.get(partId).get(roomId) == null) {
			LogTool.warn("!zsbossMap.containsKey(roomId)  roomId:"+roomId, CrossBossCache.class);
			return null;
		}
		return zsbossMap.get(partId).get(roomId).get(bossid);
	}
	
	public static Map<Integer, ConcurrentHashMap<Integer, ZSBoss>> getZsbossMap(int PartId) {
		if (!zsbossMap.containsKey(PartId)) {
			zsbossMap.put(PartId, new ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, ZSBoss>>());
		}
		return zsbossMap.get(PartId);
	}



	public static ConcurrentHashMap<Integer,Integer> getZsBossZoneidMap(int PartId) {
		if (!zsBossZoneidMap.containsKey(PartId)) {
			zsBossZoneidMap.put(PartId, new ConcurrentHashMap<Integer, Integer>());
		}
		return zsBossZoneidMap.get(PartId);
	}
	
	public static Map<Integer, Integer> getMinZoneidMap(int PartId) {
		if (!minZoneidMap.containsKey(PartId)) {
			minZoneidMap.put(PartId, new ConcurrentHashMap<Integer, Integer>());
		}
		return minZoneidMap.get(PartId);
	}

	public static CrossBossAllGlobalData getCrossBossAllGlobalData() {
		return crossBossAllGlobalData;
	}

	public static void setCrossBossAllGlobalData(CrossBossAllGlobalData crossBossAllGlobalData) {
		CrossBossCache.crossBossAllGlobalData = crossBossAllGlobalData;
	}

	@Override
	public void initExcel() throws RunServerException {
		
	}
	
	@Override
	public void startServer() throws RunServerException {
 		if(!CrossZone.isCrossServer()) return;
 		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.ZSBOSS_HIS);
			if(globalData!=null){
				String content = globalData.getContent();
				if(content!=null && !"".equals(content)){
					CrossBossAllGlobalData data = ObjStrTransUtil.toObj(content, CrossBossAllGlobalData.class);
					if(data!=null){
						CrossBossCache.crossBossAllGlobalData = data;
					}
				}
			}
			if(CrossBossCache.crossBossAllGlobalData==null){
				CrossBossCache.crossBossAllGlobalData = new CrossBossAllGlobalData();
			}
		} catch (Exception e) {
			LogTool.error(e, this, " startServer exception");
		}
	}
	
	public static void  updateGlobalData() {
		if(!CrossZone.isCrossServer()) return;
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.ZSBOSS_HIS);
			String dataStr = ObjStrTransUtil.toStr(CrossBossCache.crossBossAllGlobalData);
			globalData.setContent(dataStr);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, CrossBossCache.class, " updateGlobalData exception");
		}

	}
	
	@Override
	public void shutdownServer() {
		updateGlobalData();
	}
}
