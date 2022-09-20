package com.teamtop.system.event.backstage.events.flowTools;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.bag.GridTempData;
import com.teamtop.system.event.backstage.AbsBackstageEvent;
import com.teamtop.system.event.backstage.dao.BackstageDao;
import com.teamtop.system.event.backstage.events.flowJianKong.FlowJianKongEvent;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_daoju_204;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_zhuangbei_204;

/**
 * 道具流水
 * @author Administrator
 *
 */
public class FlowToolEvent extends AbsBackstageEvent{
	@Override
	public void executeFiveMin(int currTime) {
		save();
	}

	@Override
	public void shutdownServer() {
		save();
	}
	
	private void save(){
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowTool>> flowEquipMap = FlowToolCache.getFlowEquipMap();
		try {
			BackstageDao.insertBatch(flowEquipMap);
		} catch (Exception e) {
			LogTool.error(e, this, "save Exception!");
		}
	}
	
	/**
	 * 添加一条道具流水
	 * @param hid 角色id
	 * @param sysid 物品id
	 * @param num 数量
	 * @param isadd 添加或减少，0添加，1减少
	 * @param reason 操作原因
	 * @param zoneid 区号
	 * @param isTool 是道具 不是道具是装备
	 */
	public static void addFlow(long hid,int is_tool, int sysid, int num, int isadd, int reason, int zoneid, boolean isTool,String pfcode,String usesys){
		try {
			ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowTool>> flowEquipMap = FlowToolCache.getFlowEquipMap();
			ConcurrentLinkedQueue<B_FlowTool> queue = flowEquipMap.get(zoneid);
			if(queue == null){
				queue = new ConcurrentLinkedQueue<B_FlowTool>();
				flowEquipMap.put(zoneid, queue);
			}
			int totalNum = BagFunction.getIns().getGoodsNumBySysId(hid, sysid);
			String name=new String();
			if (isTool) {
				Struct_daoju_204 daoju=Config_daoju_204.getIns().get(sysid);
				if (daoju!=null) {
					name=daoju.getName();
				}
			}else {
				Struct_zhuangbei_204 zhuangbei = Config_zhuangbei_204.getIns().get(sysid);
				if (zhuangbei!=null) {
					name=zhuangbei.getN();
				}
			}
			B_FlowTool flow = new B_FlowTool();
			flow.setHid(hid);
			flow.setSysid(sysid);
			flow.setUseType(is_tool);
			flow.setNum(num);
			flow.setIsadd(isadd);
			flow.setReason(reason);
			flow.setZoneid(zoneid);
			flow.setOperateTime(TimeDateUtil.getCurrentTime());
			flow.setTotalNum(totalNum);
			flow.setName(name);
			flow.setPfcode(pfcode);
			flow.setUsesys(usesys);
			queue.add(flow);
			//流水的日志
			//LogFlowUtil.recordLog(flow);
			//物品监控
			FlowJianKongEvent.checkGood(hid, sysid, reason);
		} catch (Exception e) {
			LogTool.error(e, FlowToolEvent.class, "FlowToolEvent addFlow error!");
		}
	}
	
	/**
	 * 添加一条道具流水
	 * @param hid
	 * @param data
	 * @param isadd
	 * @param reason
	 * @param zoneid
	 */
	public static void addFlow(long hid, GridTempData[] data, int isadd, int reason, int zoneid,String pfcode,String usesys){
		for(GridTempData gridData : data){
			if(gridData == null) continue;
			if(gridData.getType() == GameConst.TOOL){
				addFlow(hid,GameConst.TOOL, gridData.getSysid(), gridData.getNum(), isadd, reason, zoneid,true,pfcode,usesys);
			}
		}
	}
}
