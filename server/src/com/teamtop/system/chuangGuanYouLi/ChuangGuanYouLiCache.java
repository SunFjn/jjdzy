package com.teamtop.system.chuangGuanYouLi;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_cgyl_262;
import excel.config.Config_cgylrw_262;
import excel.struct.Struct_cgyl_262;
import excel.struct.Struct_cgylrw_262;

public class ChuangGuanYouLiCache extends AbsServerEvent{
	private static ChuangGuanYouLiCache ins = null;

	public static  ChuangGuanYouLiCache getIns() {
		if (ins == null) {
			ins = new ChuangGuanYouLiCache();
		}
		return ins;
	}
	/**	 * 奖励关联缓存   key:目标ID  value:该目标对应的任务ID	 */
	private static Map<Integer, Set<Integer>> targetToTaskIDMap = new HashMap<Integer, Set<Integer>>();
	/**	 * 目标最小ID	 */
	private static int targetMinID = 9999;
	/**	 * 目标最大ID	 */
	private static int targetMaxID = 0;
	
	
	@Override
	public void startServer() throws RunServerException {
		
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_cgylrw_262> sortList = Config_cgylrw_262.getIns().getSortList();
		for(Struct_cgylrw_262 excel:sortList) {
			int id = excel.getId();
			int mb = excel.getMb();
			Struct_cgyl_262 mbExcel = Config_cgyl_262.getIns().get(mb);
			if(mbExcel==null) {
				System.err.println("闯关有礼目标不存在，表有问题？目标ID："+mb);
			}
			if(targetMinID>mb)
				setTargetMinID(mb);
			if(targetMaxID<mb)
				setTargetMaxID(mb);
			
			Set<Integer> taskSet = targetToTaskIDMap.get(mb);
			if(taskSet==null) {
				taskSet = new HashSet<>();
				targetToTaskIDMap.put(mb, taskSet);
			}
			taskSet.add(id);
		}
	}

	public static Map<Integer, Set<Integer>> getTargetToTaskIDMap() {
		return targetToTaskIDMap;
	}
	public static void setTargetToTaskIDMap(Map<Integer, Set<Integer>> targetToTaskIDMap) {
		ChuangGuanYouLiCache.targetToTaskIDMap = targetToTaskIDMap;
	}
	public static int getTargetMinID() {
		return targetMinID;
	}
	public static void setTargetMinID(int targetMinID) {
		ChuangGuanYouLiCache.targetMinID = targetMinID;
	}
	public static int getTargetMaxID() {
		return targetMaxID;
	}
	public static void setTargetMaxID(int targetMaxID) {
		ChuangGuanYouLiCache.targetMaxID = targetMaxID;
	}
}
