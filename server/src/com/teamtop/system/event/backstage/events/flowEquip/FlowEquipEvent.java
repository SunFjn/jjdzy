package com.teamtop.system.event.backstage.events.flowEquip;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.backstage.AbsBackstageEvent;
import com.teamtop.system.event.backstage.dao.BackstageDao;
import com.teamtop.system.event.backstage.events.flowTools.FlowToolEvent;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 装备流水
 * @author Administrator
 *
 */
public class FlowEquipEvent extends AbsBackstageEvent{
	@Override
	public void executeFiveMin(int currTime) {
		save();
	}

	@Override
	public void shutdownServer() {
		save();
	}
	
	private void save(){
		//装备状态流水
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowEquip>> flowEquipMap = FlowEquipCache.getFlowEquipMap();
		try {
			BackstageDao.insertBatch(flowEquipMap);
		} catch (Exception e) {
			LogTool.error(e, FlowEquipEvent.class);
		}
	}
	
	/**
	 * 添加一条装备状态流水
	 * @param hid 角色id
	 * @param job 职位
	 * @param equip 装备对象
	 * @param isadd 增加或减少，0减少，1增加，2不变
	 * @param reason 操作原因
	 * @param zoneid 区号
	 */
	public static void addEquipFlow(long hid, int job, Equip equip, int isadd, int reason, int zoneid,String pfcode,String usesys){
		try {
			if(equip == null) return;
			ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowEquip>> flowEquipMap = FlowEquipCache.getFlowEquipMap();
			ConcurrentLinkedQueue<B_FlowEquip> queue = flowEquipMap.get(zoneid);
			if(queue == null){
				queue = new ConcurrentLinkedQueue<B_FlowEquip>();
				flowEquipMap.put(zoneid, queue);
			}
			B_FlowEquip flow = new B_FlowEquip();
			flow.setHid(hid);
			flow.setJob(job);
			flow.setEquipId(equip.getId());
			flow.setSysId(equip.getSysId());
			flow.setState(equip.getState());
//			flow.setAttrAdd(equip.getAttrAdd());
			flow.setBodyIndex(equip.getBodyIndex());
			flow.setIsadd(isadd);
			flow.setReason(reason);
			flow.setZoneid(zoneid);
			flow.setOperateTime(TimeDateUtil.getCurrentTime());
			queue.add(flow);
			boolean isTool=false;
			FlowToolEvent.addFlow(hid,GameConst.EQUIP, equip.getSysId(), 1, isadd, reason, zoneid, isTool,pfcode,usesys);
		} catch (Exception e) {
			LogTool.error(e, FlowEquipEvent.class, "FlowEquipEvent addEquipFlow error!");
		}
	}
	
}
