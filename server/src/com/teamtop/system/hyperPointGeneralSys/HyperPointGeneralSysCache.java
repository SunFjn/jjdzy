package com.teamtop.system.hyperPointGeneralSys;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_cjdj_010;
import excel.struct.Struct_cjdj_010;

public class HyperPointGeneralSysCache extends AbsServerEvent {

//	private static List<ProbabilityEventModel> pmList = UC.reg("HPGPmList", new ArrayList<>());
//
//	public static List<ProbabilityEventModel> getPmList() {
//		return pmList;
//	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
//		pmList.clear();
//		List<Struct_cjdj_010> sortList = Config_cjdj_010.getIns().getSortList();
//		for (Struct_cjdj_010 struct_cjdj_010 : sortList) {
//			int[][] awardPros = struct_cjdj_010.getReward();
//			ProbabilityEventModel pm = ProbabilityEventFactory.getProbabilityEvent();
//			for (int[] awardPro : awardPros) {
//				int[] award = new int[3];
//				award[0] = awardPro[0];
//				award[1] = awardPro[1];
//				award[2] = awardPro[2];
//				pm.addProbabilityEvent(awardPro[3], new int[][] { award });
//			}
//			pmList.add(pm);
//		}
	}

}
