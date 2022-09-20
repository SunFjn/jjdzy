package com.teamtop.system.crossWenDingTianXia.cross;

import java.util.Map;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaSender;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXia;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaRoom;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaScoreRank;
import com.teamtop.system.event.sceneEvent.AbsSceneEvent;
import com.teamtop.system.event.sceneEvent.SceneEventFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.scene.Scene;
import com.teamtop.system.scene.SceneFunction;

import excel.config.Config_wdtx_260;
import excel.struct.Struct_wdtx_260;

/**
 * 问鼎天下地图场景事件
 */
public class CrossWenDingTianXiaSceneEvent extends AbsSceneEvent {
	private static CrossWenDingTianXiaSceneEvent ins = null;
	public static CrossWenDingTianXiaSceneEvent getIns(){
		if(ins==null){
			ins = new CrossWenDingTianXiaSceneEvent();
		}
		return ins;
	}
	@Override
	public int beforeIn(Hero hero, int newSceneSysId) {
		if(!CrossZone.isCrossServer()){
			return 1;
		}
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		if(wdtxData==null)
			return 1;
		
		CrossWenDingTianXiaScoreRank rankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
		int layerNew = wdtxData.getLayer();
		Struct_wdtx_260 excel = Config_wdtx_260.getIns().get(layerNew);
		if(excel!=null&& excel.getJoin()!=0) {//1-3层后端不验证
		}else {
			//验证楼层能不能进
			Struct_wdtx_260 excelBefore = Config_wdtx_260.getIns().get(layerNew-1);
			int scoreNeed = excelBefore.getNext();
			int scoreHero = rankData.getScore();
			if(scoreNeed> scoreHero) {
				//积分不足                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
				/*CrossWenDingTianXiaSender.sendCmd_4206(hero.getId(), 3, layerNew);
				return 1;*/
			}
		}
		//刷新层数数据
		CrossWenDingTianXiaCrossFunction.getIns().sendLayerAndYuXiHeroData(hero);
		
		CrossWenDingTianXiaRoom roomData = CrossWenDingTianXiaCrossFunction.getIns().getRoomData( hero.getId());
		Map<Integer, Integer> sceneUnitIdMap = roomData.getSceneUnitIdMap();
		int sceUnitID = sceneUnitIdMap.get( layerNew);
		return sceUnitID;
	}

	@Override
	public void in(Hero hero, int newSceneSysId, int newSceneUnitId) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		Scene scene = hero.getScene();
		int posX = scene.getPosX();
		int posY = scene.getPosY();
		
		//首次登陆刷新数据
		CrossWenDingTianXiaCrossFunction.getIns().sendTimeAndScore(hero);
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		if(wdtxData.getChangeXY()==0) {
			SceneEventFunction.changeToRandomPoint(hero, newSceneSysId, newSceneUnitId);//非战斗进入副本，随机坐标
		}else {
			wdtxData.setChangeXY(0);
			SceneEventFunction.changeToSpecialPoint(hero, newSceneSysId, newSceneUnitId, posX, posY);//跳层、战斗结束、掉层等等，固定坐标
		}
	}
	

	@Override
	public void afterIn(Hero hero) {
		CrossWenDingTianXiaCrossFunction.getIns().reflaseHeroState(hero.getId());
		//结算界面
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		if(wdtxData!=null&& wdtxData.getResultBattle()!=BattleConst.RESULT_ATT_NO) {
			CrossWenDingTianXiaSender.sendCmd_4234(hero.getId(), 1, wdtxData.getResultBattle(), wdtxData.getResultData());
			wdtxData.setResultBattle(0);
			wdtxData.setResultData(null);
		}
	}

	@Override
	public boolean afterOffline(Hero hero) {
		return false;
	}

	@Override
	public int beforeOut(Hero hero) {
		return 0;
	}
	
	@Override
	public void out(Hero hero) {
		SceneFunction.getIns().delHeroFromScene(hero);
		hero.getScene().setSceneSysId(0);
	}

}
