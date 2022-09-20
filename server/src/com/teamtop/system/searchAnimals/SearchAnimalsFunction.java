package com.teamtop.system.searchAnimals;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.searchAnimals.model.Animals;
import com.teamtop.system.searchAnimals.model.SearchAnimals;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xsxs_283;
import excel.config.Config_xsxspoint_283;
import excel.config.Config_xsxsreward_283;
import excel.struct.Struct_xsxs_283;
import excel.struct.Struct_xsxspoint_283;
import excel.struct.Struct_xsxsreward_283;

public class SearchAnimalsFunction {
	private static SearchAnimalsFunction searchAnimalsFunction;

	private SearchAnimalsFunction() {
	}

	public static synchronized SearchAnimalsFunction getIns() {
		if (searchAnimalsFunction == null) {
			searchAnimalsFunction = new SearchAnimalsFunction();
		}
		return searchAnimalsFunction;
	}
	
	/**
	 * 初始化寻兽
	 * @param data
	 */
	public void initAnimals(SearchAnimals data) {
		Map<Integer, Animals> animals = new HashMap<Integer,Animals>();
		List<Struct_xsxs_283> sortList = Config_xsxs_283.getIns().getSortList();
		List<Struct_xsxsreward_283> rewardList = Config_xsxsreward_283.getIns().getSortList();
		Struct_xsxsreward_283 struct_xsxsreward_283 = rewardList.get(0);
		int size = Config_xsxs_283.getIns().size();
		Random r = new Random();
		int high = r.nextInt(size);
		for(int i=0; i<size; i++) {
			Struct_xsxs_283 struct_xsxs_283 = sortList.get(i);
			int id = struct_xsxs_283.getId();
			
			List<ProbabilityEventModel> list = null;
			List<List<ProbabilityEventModel>> bigList = SearchAnimalsSysCache.getAwardMap().get(struct_xsxsreward_283.getId());
			if(i == high) {
				list = bigList.get(SearchAnimalsConst.HIGHAWARD_GAILVEVENT_KEY);// 高级奖励
			}else {
				list = bigList.get(SearchAnimalsConst.GENAWARD_GAILVEVENT_KEY);// 普通奖励
			}
			
			int[] genAward = null;
			for (ProbabilityEventModel pm : list) {
				genAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
			}
			Animals a = new Animals();
			a.setType((byte)genAward[0]);
			a.setId(genAward[1]);
			a.setNum(genAward[2]);
			a.setState((byte)0);
			a.setRadio((byte)genAward[4]);
			animals.put(id, a);
		}
		
		data.setAnimals(animals);
	}
	
	public void initScoreAward(SearchAnimals data) {
		Map<Integer, Integer> award = data.getAwards();
		if(award == null) {
			award = new HashMap<Integer,Integer>();
			List<Struct_xsxspoint_283> list = Config_xsxspoint_283.getIns().getSortList();
			for(Struct_xsxspoint_283 struct_xsxspoint_283 : list) {
				int id = struct_xsxspoint_283.getId();
				award.put(id, 0);
			}
			data.setAwards(award);
		}
	}
	
	public Animals getAnimals(Map<Integer, Animals> map) {
		Animals a = new Animals();
		for(Animals as : map.values()) {
			if(as.getRadio() == 0) {
				a.setId(as.getId());
				a.setNum(as.getNum());
				a.setRadio(as.getRadio());
				a.setState(as.getState());
				a.setType(as.getType());
				return a;
			}
		}
		return a;
	}
	
	/**
	 * 登录推送图标显示红点
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SearchAnimalsConst.SysId)) return;
			SearchAnimals data = hero.getSearchAnimals();
			int firstTime = data.getFirstTime();
			if(firstTime == 0) {
				data.setFirstTime(1);
				RedPointFunction.getIns().addLoginRedPoint(hero,  SearchAnimalsConst.SysId, SearchAnimalsConst.RED_POINT, RedPointConst.HAS_RED);
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "SearchAnimalsFunction loginRed 登录推送图标显示红点  异常");
		}
	}
}
