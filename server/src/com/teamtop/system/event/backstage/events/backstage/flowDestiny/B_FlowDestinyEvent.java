package com.teamtop.system.event.backstage.events.backstage.flowDestiny;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.system.event.backstage.AbsBackstageEvent;
import com.teamtop.system.event.backstage.dao.BackstageDao;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_bztzf_261;
import excel.struct.Struct_bztzf_261;

public class B_FlowDestinyEvent extends AbsBackstageEvent{
	
	@Override
	public void executeFiveMin(int currTime) {
		save();
	}

	@Override
	public void shutdownServer() {
		save();
	}
	
	private void save(){
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowDestiny>> flowDestinyMap = FlowDestinyCache.getFlowDestinyMap();
		try {
			BackstageDao.insertBatch(flowDestinyMap);
		} catch (Exception e) {
			LogTool.error(e, this, "save Exception!");
		}
	}
	
	/**
	 * 添加一条符文流水
	 * @param hid
	 * @param useType  0增加，1减少 2升级 
	 * @param sysid
	 * @param zoneid
	 */
	public static void addFlow(long hid,int useType, int sysid,  int zoneid){
		try {
			ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowDestiny>> flowDestinyMap = FlowDestinyCache.getFlowDestinyMap();
			ConcurrentLinkedQueue<B_FlowDestiny> queue = flowDestinyMap.get(zoneid);
			
			if(queue == null){
				queue = new ConcurrentLinkedQueue<B_FlowDestiny>();
				flowDestinyMap.put(zoneid, queue);
			}
			
			String name=new String();
			Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(sysid);
			if (struct_bztzf_261!=null) {
				name=struct_bztzf_261.getName();
			}
			B_FlowDestiny flow = new B_FlowDestiny();
			flow.setHid(hid);
			flow.setSysid(sysid);
			flow.setUseType(useType);
			flow.setZoneid(zoneid);
			flow.setOperateTime(TimeDateUtil.getCurrentTime());
			flow.setName(name);
			queue.add(flow);
		} catch (Exception e) {
			LogTool.error(e, B_FlowDestinyEvent.class, "B_FlowDestinyEvent addFlow error!");
		}
	}
}
