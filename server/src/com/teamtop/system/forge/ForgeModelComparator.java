package com.teamtop.system.forge;

import java.util.Comparator;

import com.teamtop.system.forge.model.ForgeModel;
/**
 * 装备部位强化排序
 * @author jjjjyyy
 *
 */
public class ForgeModelComparator implements Comparator<ForgeModel>{

	@Override
	public int compare(ForgeModel o1, ForgeModel o2) {
		//比较强化等级
		if(o1.getStrengthen() > o2.getStrengthen()){
			return 1;
		}else if(o1.getStrengthen() < o2.getStrengthen()){
			return -1;
		}else if(o1.getPart() > o2.getPart()){
			return 1;
		}else if(o1.getPart() < o2.getPart()){
			return -1;
		}else{
			return 0;
		}
	}

}
