package com.teamtop.system.boss.qmboss;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_all_221;
import excel.struct.Struct_all_221;


/**
 * 全民boss
 * @author Administrator
 *
 */
public class QMBossCache extends AbsServerEvent{
	/**
	 * 全民boss缓存
	 */
	private static Map<Integer, QMBoss> qmbossMap = UC.reg("qmbossMap", new ConcurrentHashMap<Integer, QMBoss>());
	/**
	 * boss掉落
	 */
	private static Map<Integer, List<ProbabilityEventModel>> bossDropMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	
	public static Map<Integer, QMBoss> getQmbossMap() {
		return qmbossMap;
	}
	
	public static Map<Integer, List<ProbabilityEventModel>> getBossDropMap() {
		return bossDropMap;
	}

	@Override
	public void startServer() throws RunServerException {
		List<Struct_all_221> sortList = Config_all_221.getIns().getSortList();
		for(Struct_all_221 qm:sortList){
			QMBoss qmBoss = new QMBoss();
			qmbossMap.put(qm.getId(), qmBoss);
		}
	}
	
	@Override
	public void initExcel() throws RunServerException {
		initDrop();
	}
	/**
	 * 初始化单人boss副本掉落
	 */
	public static void initDrop(){
		List<Struct_all_221> bossList = Config_all_221.getIns().getSortList();
		for (Struct_all_221 boss : bossList) {
			List<ProbabilityEventModel> bossDropData = ExcelJsonUtils.getGeneralDropData(boss.getBd());
			bossDropMap.put(boss.getId(), bossDropData);
		}
	}
	
	public static void initLvToBoss(){
		
	}
	
	public static void syncKillRank(){
	
	}
}
