package com.teamtop.system.activity.ativitys.playBalloon;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;

import excel.config.Config_dqq_765;
import excel.struct.Struct_dqq_765;

public class PlayBalloonCache extends AbsServerEvent {
	/** 打气球配置表 <期数，<次数,打气球>> **/
	public static Map<Integer, Map<Integer, Struct_dqq_765>> playBalloonConfig = new HashMap<>();
	
	/** 奖励概率事件<期数，<次数, 概率事件>> **/
	public static Map<Integer, Map<Integer,ProbabilityEventModel>> awardMap = new HashMap<>();

	@Override
	public void startServer() throws RunServerException {
	}
	
	@Override
	public void initExcel() throws RunServerException{
		try {
			playBalloonConfig.clear();
			awardMap.clear();
			
			List<Struct_dqq_765> sortList = Config_dqq_765.getIns().getSortList();
			for(Struct_dqq_765 excel : sortList) {
				int qs = excel.getQs();
				Map<Integer, Struct_dqq_765> map = playBalloonConfig.get(qs);
				if(map == null) {
					map = new HashMap<Integer, Struct_dqq_765>();
					playBalloonConfig.put(qs, map);
				}
				map.put(excel.getCs(), excel);
				
				Map<Integer, ProbabilityEventModel> ptAward = awardMap.get(qs);
				if(ptAward == null) {
					ptAward = new HashMap<Integer,ProbabilityEventModel>();
					awardMap.put(qs, ptAward);
				}
				ProbabilityEventModel pm = ExcelJsonUtils.getGeneralDropData(excel.getReward()).get(0);
				ptAward.put(excel.getCs(), pm);
			}
		}catch (Exception e) {
			LogTool.error(e, this, "PlayBalloonCache initExcel has wrong");
		}
	}

}
