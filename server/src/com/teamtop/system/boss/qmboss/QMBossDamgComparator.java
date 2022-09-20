package com.teamtop.system.boss.qmboss;

import java.util.Comparator;

/**
 * 全民boss
 * @author Administrator
 *
 */
public class QMBossDamgComparator implements Comparator<QMBossDamgRankModel>{
	private static QMBossDamgComparator ins = null;

	public static QMBossDamgComparator getIns() {
		if (ins == null) {
			ins = new QMBossDamgComparator();
		}
		return ins;
	}

	@Override
	public int compare(QMBossDamgRankModel o1, QMBossDamgRankModel o2) {
		if(o1.getHurt()<o2.getHurt()){
			return 1;
		}else if(o1.getHurt()>o2.getHurt()){
			return -1;
		}else{
			if(o1.getHid()<o2.getHid()){
				return 1;
			}else if(o1.getHid()>o2.getHid()){
				return -1;
			}
		}
		return 0;
	}

}
