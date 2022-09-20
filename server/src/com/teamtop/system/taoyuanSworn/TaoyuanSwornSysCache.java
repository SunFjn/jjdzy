package com.teamtop.system.taoyuanSworn;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.taoyuanSworn.dao.TaoyuanSwornDao;
import com.teamtop.system.taoyuanSworn.model.SortTemplate;
import com.teamtop.system.taoyuanSworn.model.TaoyuanBossModel;
import com.teamtop.system.taoyuanSworn.model.TaoyuanSworn;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.FieldOrder;
import com.teamtop.util.log.LogTool;

public class TaoyuanSwornSysCache extends AbsServerEvent {
	private static ConcurrentHashMap<Long, TaoyuanSworn> map = new ConcurrentHashMap<>();
	
	/**
	 * 正在打的桃园BOSS<桃园结义id,桃园BOSS>
	 */
	@FieldOrder(order = 1)
	private static ConcurrentHashMap<Long, TaoyuanBossModel> taoyuanSwornBossMap = UC.reg("taoyuanSwornBossMap", new ConcurrentHashMap<Long, TaoyuanBossModel>());
	
	
	@Override
	public void startServer() throws RunServerException {
		try {
			List<TaoyuanSworn> list = TaoyuanSwornDao.getDao().findAll();
			for(TaoyuanSworn taoyuanSworn : list) {
				addTaoyuanSworn(taoyuanSworn);
				//setTaoyuanBossModel(taoyuanSworn);
			}
		} catch (Exception e) {
			e.printStackTrace();
			LogTool.error(e, TaoyuanSwornSysCache.class, "TaoyuanSwornSysCache startServer err");
		}
	}
	
	@Override
	public void shutdownServer(){
		try {
			List<SortTemplate> list = TaoyuanSwornFunction.getIns().sortTaoyuanSwornList(0);
			for(SortTemplate sortTemplate : list) {
				long id = sortTemplate.getId();
				ConcurrentHashMap<Long, TaoyuanSworn> map = TaoyuanSwornSysCache.getMap();
				TaoyuanSworn taoyuanSworn = map.get(id);
				if(taoyuanSworn != null) {
					TaoyuanBossModel taoyuanBossModel = taoyuanSwornBossMap.get(id);
					if(taoyuanBossModel != null) {
						long curhp = (long)taoyuanBossModel.getCurhp();
						taoyuanSworn.setCurhp(curhp);//保存桃园boss剩余血量
					}
					TaoyuanSwornDao.getDao().update(taoyuanSworn);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, TaoyuanSwornSysCache.class, "TaoyuanSwornSysCache shutdownServer err");
		}
	}
	
	public static void addTaoyuanSworn(TaoyuanSworn taoyuanSworn) {
		map.put(taoyuanSworn.getId(), taoyuanSworn);
	}
	
	public static void removeTaoyuanSworn(long id) {
		map.remove(id);
	}

	public static ConcurrentHashMap<Long, TaoyuanSworn> getMap() {
		return map;
	}

	public static ConcurrentHashMap<Long, TaoyuanBossModel> getTaoyuanSwornBossMap() {
		return taoyuanSwornBossMap;
	}
	
	public static TaoyuanBossModel getTaoyuanBossModel(long taoyuanSwornId) {
		if(taoyuanSwornBossMap == null) return null;
		return taoyuanSwornBossMap.get(taoyuanSwornId);
	}

	public static void setTaoyuanSwornBossMap(ConcurrentHashMap<Long, TaoyuanBossModel> taoyuanSwornBossMap) {
		TaoyuanSwornSysCache.taoyuanSwornBossMap = taoyuanSwornBossMap;
	}
	
	/**设置桃园boss剩余血量*/
//	public static void setTaoyuanBossModel(TaoyuanSworn taoyuanSworn) {
//		int bossId = taoyuanSworn.getBossId();
//		if(bossId > 0 && taoyuanSworn.getDieState()==0 && taoyuanSworn.getCurhp()>0) {
//			Struct_NPC_200 struct_NPC_200 = Config_NPC_200.getIns().get(bossId);
//			long taoyuanSwornId = taoyuanSworn.getId(); 
//			TaoyuanBossModel taoyuanBossModel = new TaoyuanBossModel();
//			taoyuanBossModel.setBossId(bossId);
//			taoyuanBossModel.setTaoyuanSwornId(taoyuanSwornId);
//			long curhp = taoyuanSworn.getCurhp();
//			if(curhp <= 0) {
//				curhp = struct_NPC_200.getHp();
//			}
//			taoyuanBossModel.setCurhp(curhp);
//			taoyuanBossModel.setHpmax(struct_NPC_200.getHp());
//			taoyuanSworn.setCurhp(0);
//			taoyuanSwornBossMap.put(taoyuanSwornId, taoyuanBossModel);
//		}
//	}
}
