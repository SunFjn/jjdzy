package com.teamtop.system.crossBoss.cross;

import java.util.Comparator;

import com.teamtop.system.crossBoss.model.CrossBossRankModel;
/**
 * 转生boss排行榜比较器
 * @author Administrator
 *
 */
public class ZSBossComparator implements Comparator<CrossBossRankModel>{
	private static ZSBossComparator ins = null;

	public static ZSBossComparator getIns() {
		if (ins == null) {
			ins = new ZSBossComparator();
		}
		return ins;
	}

	@Override
	public int compare(CrossBossRankModel o1, CrossBossRankModel o2) {
		if(o1.getHurt()<o2.getHurt()){
			return 1;
		}else if(o1.getHurt()>o2.getHurt()){
			return -1;
		}else{
			if(o1.getId()<o2.getId()){
				return 1;
			}else if(o1.getId()>o2.getId()){
				return -1;
			}
		}
		return 0;
	}

}
