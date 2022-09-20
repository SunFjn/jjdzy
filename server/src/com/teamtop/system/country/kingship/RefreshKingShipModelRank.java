package com.teamtop.system.country.kingship;

import java.util.List;

import com.teamtop.synHandleCore.OpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.country.kingship.model.KingShipModel;

public class RefreshKingShipModelRank implements OpTaskRunnable {
	private KingShipModel kingShipModel;
	private List<KingShipModel> list;
	private int type;

	public RefreshKingShipModelRank(KingShipModel kingShipModel, List<KingShipModel> list, int type) {
		this.kingShipModel = kingShipModel;
		this.list = list;
		this.type = type;
	}

	@Override
	public void run() {
		int indexOf = list.indexOf(kingShipModel);
		if (type == 1) {
			if (indexOf >= 0) {
				KingShipModel kingShipModel2 = list.get(indexOf);
				kingShipModel2.setOnlyWinTimes(kingShipModel.getOnlyWinTimes());
				kingShipModel2.setTime(kingShipModel.getTime());
				kingShipModel2.setOfficial(kingShipModel.getOfficial());
				kingShipModel2.setTitleId(kingShipModel.getTitleId());
				kingShipModel2.setJob(kingShipModel.getJob());
				kingShipModel2.setBodyId(kingShipModel.getBodyId());
				kingShipModel2.setMountId(kingShipModel.getMountId());
			} else {
				list.add(kingShipModel);
			}
			KingShipFunction.getIns().sortKingShipModelMap(list);
		} else {// 更改名字 服装
			if (indexOf >= 0) {
				KingShipModel kingShipModel2 = list.get(indexOf);
				kingShipModel2.setName(kingShipModel.getName());
				kingShipModel2.setOfficial(kingShipModel.getOfficial());
				kingShipModel2.setIcon(kingShipModel.getIcon());
				kingShipModel2.setFrame(kingShipModel.getFrame());
				kingShipModel2.setTotalStrength(kingShipModel.getTotalStrength());
				kingShipModel2.setTitleId(kingShipModel.getTitleId());
				kingShipModel2.setJob(kingShipModel.getJob());
				kingShipModel2.setBodyId(kingShipModel.getBodyId());
				kingShipModel2.setMountId(kingShipModel.getMountId());
			}
		}

	}

	@Override
	public void beforeExecute(Thread thread) {

	}

	@Override
	public void afterExecute() {

	}

	@Override
	public void onError(Throwable t, ErrorFrom ef) {

	}

	@Override
	public Object getSession() {
		return OpTaskConst.KINGSHIP_KEY;
	}

}
