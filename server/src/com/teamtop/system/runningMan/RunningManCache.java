package com.teamtop.system.runningMan;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_ggzj_008;
import excel.struct.Struct_ggzj_008;
/**
 * 过关斩将
 * @author jjjjyyy
 *
 */
public class RunningManCache extends AbsServerEvent{
	
	private static RunningManCache ins;
	public static RunningManCache getIns(){
		if(ins == null) {
			ins = new RunningManCache();
		}
		return ins;
	}
	/**
	 *  过关斩将难度-> 关卡id-> Struct_ggzj_008
	 */
	private static HashMap<Integer,HashMap<Integer, Struct_ggzj_008>> godEquipLvMap = UC.reg("ggzj008EquipMap", new HashMap<Integer,HashMap<Integer, Struct_ggzj_008>>());
	

	public static HashMap<Integer, HashMap<Integer, Struct_ggzj_008>> getGodEquipLvMap() {
		return godEquipLvMap;
	}
	/**
	 * 每个过关斩将boss掉落
	 */
	private static Map<Integer, List<ProbabilityEventModel>> bossDropMap = new HashMap<Integer, List<ProbabilityEventModel>>();

	
	public static Map<Integer, List<ProbabilityEventModel>> getBossDropMap() {
		return bossDropMap;
	}

	


	public void initDrop() {
		List<Struct_ggzj_008> bossList = Config_ggzj_008.getIns().getSortList();
		for (Struct_ggzj_008 boss : bossList) {
			List<ProbabilityEventModel> bossDropData = ExcelJsonUtils.getGeneralDropData(boss.getBd());
			bossDropMap.put(boss.getIndex(), bossDropData);
		}
		
	}


	@Override
	public void startServer() throws RunServerException {
		
		
	}

	public void initExcel() throws RunServerException{
		
		List<Struct_ggzj_008> list = Config_ggzj_008.getIns().getSortList();
		for(Struct_ggzj_008 excel : list){
			if (godEquipLvMap.containsKey(excel.getType())) {
				godEquipLvMap.get(excel.getType()).put(excel.getIndex(), excel);
			}else {
				godEquipLvMap.put(excel.getType(), new HashMap<Integer, Struct_ggzj_008>());
				godEquipLvMap.get(excel.getType()).put(excel.getIndex(), excel);
			}
		}
		
		initDrop();
	}
}
