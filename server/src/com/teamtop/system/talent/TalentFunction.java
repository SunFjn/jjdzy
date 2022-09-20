package com.teamtop.system.talent;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.talent.model.ShowItem;
import com.teamtop.system.talent.model.Talent;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xltf_758;
import excel.struct.Struct_xltf_758;

public class TalentFunction {
	private static TalentFunction talentFunction;

	private TalentFunction() {
	}

	public static synchronized TalentFunction getIns() {
		if (talentFunction == null) {
			talentFunction = new TalentFunction();
		}
		return talentFunction;
	}
	
	//重置展示奖励
	public List<Object[]> resetShowItem(Talent talent) {
		List<Object[]> showItemArr = new ArrayList<>();
		List<ShowItem> showItemList = new ArrayList<ShowItem>();
		Struct_xltf_758 struct_xltf_758 = Config_xltf_758.getIns().getSortList().get(0);
		int[][] zs = struct_xltf_758.getZs();
		int size = zs.length;
		Set<Integer> set = new HashSet<Integer>();//只是判断去重
		Random r = new Random();
		int flag = 0;//防止配表数量少于随机固定数量特殊处理
		if(size >= TalentConst.SHOWNUM) {
			while(true) {
				flag++;
				if(flag >= 1000) {
					break;//超出上限,退出随机
				}
				int n = r.nextInt(size);
				int[] arr = zs[n];
				if(set.contains(arr[1])) {
					continue;
				}
				set.add(arr[1]);
				showItemArr.add(new Object[] {(byte)arr[0], arr[1], arr[2]});
				ShowItem showItem = ShowItem.valueOf((byte)arr[0], arr[1], arr[2]);
				showItemList.add(showItem);
				if(showItemList.size() >= TalentConst.SHOWNUM) {
					break;
				}
			}
		} 
		
		//配表道具少于固定展示数量,补齐
		if(showItemList.size() < TalentConst.SHOWNUM) {
			for(int i=0; i<TalentConst.SHOWNUM; i++) {
				int n = r.nextInt(size);
				int[] arr = zs[n];
				showItemArr.add(new Object[] {(byte)arr[0], arr[1], arr[2]});
				ShowItem showItem = ShowItem.valueOf((byte)arr[0], arr[1], arr[2]);
				showItemList.add(showItem);
				if(showItemList.size() >= TalentConst.SHOWNUM) {
					break;
				}
			}
		}
		
		talent.setShowItemList(showItemList);
		return showItemArr;
	}
	
	//获得展示奖励
	public List<Object[]> getShowItemArr(Talent talent){
		List<Object[]> showItemArr = new ArrayList<>();
		List<ShowItem> list = talent.getShowItemList();
		for(ShowItem si : list) {
			showItemArr.add(new Object[] {si.getType(), si.getId(), si.getNum()});
		}
		return showItemArr;
	}
	
	
	
	/**
	 * 登录推送图标显示红点
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, TalentConst.SysId)) return;
			Talent talent = hero.getTalent();
			if(talent == null) return;
			Map<Integer, Integer> awards = talent.getAwards();
			if(awards == null) return;
			for(Integer num : awards.values()) {
				if(num > 0) {
					RedPointFunction.getIns().addLoginRedPoint(hero,  TalentConst.SysId, TalentConst.RED_POINT, RedPointConst.HAS_RED);
					break;
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "TalentFunction loginRed 登录推送图标显示红点  异常");
		}
	}
}
