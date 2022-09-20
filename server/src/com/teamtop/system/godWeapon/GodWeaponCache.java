package com.teamtop.system.godWeapon;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_sbcl_750;
import excel.config.Config_sbdz_750;
import excel.config.Config_sbdzmb_750;
import excel.struct.Struct_sbcl_750;
import excel.struct.Struct_sbdz_750;
import excel.struct.Struct_sbdzmb_750;



public class GodWeaponCache extends AbsServerEvent {
	
	/**
	 * 打造专属神兵  1工匠普通锤子/2工匠高级奖池/3神匠锤子——》普通掉落
	 */
	private static Map<Integer, List<ProbabilityEventModel>> GodWeaponDropMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	/**
	 * 
	 */
	private static Map<Integer, List<Struct_sbcl_750>> CuiLianLvByTypeMap=new ConcurrentHashMap<Integer, List<Struct_sbcl_750>>();
	
	
	private static Map<Integer, List<Struct_sbdzmb_750>> MakeWeaponMapByQs=new ConcurrentHashMap<Integer, List<Struct_sbdzmb_750>>();
	

	@Override
	public void startServer() throws RunServerException {
		
	}
	
	
	
	public static Map<Integer, List<ProbabilityEventModel>> getGodWeaponDropMap() {
		return GodWeaponDropMap;
	}


	public static void setGodWeaponDropMap(Map<Integer, List<ProbabilityEventModel>> godWeaponDropMap) {
		GodWeaponDropMap = godWeaponDropMap;
	}

	public static Map<Integer, List<Struct_sbcl_750>> getCuiLianLvByTypeMap() {
		return CuiLianLvByTypeMap;
	}

	public static void setCuiLianLvByTypeMap(Map<Integer, List<Struct_sbcl_750>> cuiLianLvByTypeMap) {
		CuiLianLvByTypeMap = cuiLianLvByTypeMap;
	}



	public static Map<Integer, List<Struct_sbdzmb_750>> getMakeWeaponMapByQs() {
		return MakeWeaponMapByQs;
	}



	public static void setMakeWeaponMapByQs(Map<Integer, List<Struct_sbdzmb_750>> makeWeaponMapByQs) {
		MakeWeaponMapByQs = makeWeaponMapByQs;
	}



	@Override
	public void initExcel() throws RunServerException{
		initWeaponDrop();
		initcuilianMap();
		initMakeGodWeapon();
	}
	
	
	public static void initcuilianMap() {
		List<Struct_sbcl_750> rewardList = Config_sbcl_750.getIns().getSortList();
		for (Struct_sbcl_750 rward: rewardList) {
			int lv = rward.getLv();
			int type=lv/10000;
			if (CuiLianLvByTypeMap.containsKey(type)) {
				List<Struct_sbcl_750> list = CuiLianLvByTypeMap.get(type);
				list.add(rward);
			}else {
				CuiLianLvByTypeMap.put(type, new ArrayList<Struct_sbcl_750>());
				List<Struct_sbcl_750> list = CuiLianLvByTypeMap.get(type);
				list.add(rward);
			}
		
			
		}
	}
	
	/**
	 * 随机锤子
	 */
	public static void initWeaponDrop(){
		GodWeaponDropMap.clear();
		List<Struct_sbdz_750> rewardList = Config_sbdz_750.getIns().getSortList();
		for (Struct_sbdz_750 rward: rewardList) {
			//1工匠普通锤子
			List<ProbabilityEventModel> Data = ExcelJsonUtils.getGeneralDropData(rward.getGjpt());
			GodWeaponDropMap.put(GodWeaponConst.MAKE_WEAPON_TYPE1,Data);
			//2工匠高级奖池
			Data = ExcelJsonUtils.getGeneralDropData(rward.getGjgj());
			GodWeaponDropMap.put(GodWeaponConst.MAKE_WEAPON_TYPE2,Data);
			//3工匠神匠锤子
			Data = ExcelJsonUtils.getGeneralDropData(rward.getSjjc());
			GodWeaponDropMap.put(GodWeaponConst.MAKE_WEAPON_TYPE3,Data);
		}
	}
	/**
	 * 必中奖励
	 */
	public static void initMakeGodWeapon() {
		MakeWeaponMapByQs.clear();
		List<Struct_sbdzmb_750> rewardList = Config_sbdzmb_750.getIns().getSortList();
		for (Struct_sbdzmb_750 rward: rewardList) {
			int qs = rward.getQs();
			if (MakeWeaponMapByQs.containsKey(qs)) {
				List<Struct_sbdzmb_750> list = MakeWeaponMapByQs.get(qs);
				list.add(rward);
			}else {
				List<Struct_sbdzmb_750> list =new ArrayList<Struct_sbdzmb_750>();
				list.add(rward);
				MakeWeaponMapByQs.put(qs, list);
			}
		}
	}
	
	

}
