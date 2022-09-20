package com.teamtop.system.event.backstage.events.backstage.flowAppraise;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.alibaba.fastjson.JSON;
import com.teamtop.system.event.backstage.AbsBackstageEvent;
import com.teamtop.system.event.backstage.dao.BackstageDao;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 鉴定流水
 * 
 * @author Administrator
 *
 */
public class FlowAppraiseEvent extends AbsBackstageEvent {
	@Override
	public void executeFiveMin(int currTime) {
		save();
	}

	@Override
	public void shutdownServer() {
		save();
	}

	private void save() {
		// 鉴定流水
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowAppraise>> flowappraiseMap = FlowAppraiseCache
				.getFlowappraiseMap();
		try {
			BackstageDao.insertBatch(flowappraiseMap);
		} catch (Exception e) {
			LogTool.error(e, FlowAppraiseEvent.class);
		}
	}

	public static void addM_RoleInfo(Hero hero, int addAppraiseTimes, List<int[]> awardList) {
		int zoneid = hero.getZoneid();
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowAppraise>> flowappraiseMap = FlowAppraiseCache
				.getFlowappraiseMap();
		ConcurrentLinkedQueue<B_FlowAppraise> queue = flowappraiseMap.get(zoneid);
		if (queue == null) {
			synchronized (flowappraiseMap) {
				queue = flowappraiseMap.get(zoneid);
				if (queue == null) {
					queue = new ConcurrentLinkedQueue<B_FlowAppraise>();
					flowappraiseMap.put(zoneid, queue);
				}
			}
		}
		B_FlowAppraise b_FlowAppraise = new B_FlowAppraise();
		b_FlowAppraise.setHid(hero.getId());
		b_FlowAppraise.setZoneid(zoneid);
		String pfCode = Optional.of(hero).map(hero1 -> hero1.getTempData()).map(tempData -> tempData.getAccount())
				.map(account -> account.getPfcode()).orElse("");
		b_FlowAppraise.setPfcode(pfCode);
		b_FlowAppraise.setAppraiseTimes(addAppraiseTimes);
		String awardStr = JSON.toJSONString(awardList);
		b_FlowAppraise.setAwardStr(awardStr);
		b_FlowAppraise.setOperateTime(TimeDateUtil.getCurrentTime());
		queue.add(b_FlowAppraise);
	}

}
