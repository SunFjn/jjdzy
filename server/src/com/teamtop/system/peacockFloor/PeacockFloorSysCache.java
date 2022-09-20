package com.teamtop.system.peacockFloor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;

import excel.config.Config_tower_219;
import excel.struct.Struct_tower_219;


public class PeacockFloorSysCache extends AbsServerEvent {
	
	public static PeacockFloorSysCache ins;
	
	public static  PeacockFloorSysCache getIns() {
		if(ins == null){
			ins = new PeacockFloorSysCache();
		}
		return ins;
	}
	/**
	 * 每层掉落
	 */
	private static Map<Integer, List<ProbabilityEventModel>> bossDropMap = new HashMap<Integer, List<ProbabilityEventModel>>();
	/**
	 * 铜雀台公共缓存
	 */
	private static PeacockCache peacockCache=new PeacockCache();
	
	

	public static Map<Integer, List<ProbabilityEventModel>> getBossDropMap() {
		return bossDropMap;
	}

	public static void setBossDropMap(Map<Integer, List<ProbabilityEventModel>> bossDropMap) {
		PeacockFloorSysCache.bossDropMap = bossDropMap;
	}

	public static PeacockCache getPeacockCache() {
		return peacockCache;
	}

	public static void setPeacockCache(PeacockCache peacockCache) {
		PeacockFloorSysCache.peacockCache = peacockCache;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.PEACOCK);
			String content = globalData.getContent();
			if (content==null||content.equals("")||content.equals("{}")) {
				setPeacockCache(new PeacockCache());
			}else{
				setPeacockCache(ObjStrTransUtil.toObj(content, PeacockCache.class));
			}
		} catch (Exception e) {
			LogTool.error(e, PeacockFloorSysCache.class, "PeacockFloorSysCache has wrong");
		}
	}
	
	@Override
	public void shutdownServer(){
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.PEACOCK);
			globalData.setContent(ObjStrTransUtil.toStr(getPeacockCache()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "PeacockFloorSysCache shutdownServer has wrong");
		}
	}
	
	@Override
	public void initExcel() throws RunServerException {
		initDrop();
	}

	public void initDrop() {
		List<Struct_tower_219> bossList = Config_tower_219.getIns().getSortList();
		for (Struct_tower_219 boss : bossList) {
			List<ProbabilityEventModel> bossDropData = ExcelJsonUtils.getGeneralDropData(boss.getBd());
			bossDropMap.put(boss.getId(), bossDropData);
		}
		
	}
	
	

}
