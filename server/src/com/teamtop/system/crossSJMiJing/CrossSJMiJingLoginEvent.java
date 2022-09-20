package com.teamtop.system.crossSJMiJing;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.system.activity.ativitys.doubleProduce.DoubleProduceFunction;
import com.teamtop.system.bingfa.BingFa;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJing;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.specialTreasure.SpecialTreasure;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.weekCard.model.WeekCardModel;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.zhanjia.ZhanJia;

import io.netty.channel.Channel;
/**
 * 客户端登陆事件
 */
public class CrossSJMiJingLoginEvent extends AbsCrossLoginEvent{
	private static CrossSJMiJingLoginEvent ins = null;

	public static CrossSJMiJingLoginEvent getIns() {
		if (ins == null) {
			ins = new CrossSJMiJingLoginEvent();
		}
		return ins;
	}

	@Override
	public Channel localAsk(Hero hero, int type, List<Object[]> param) {
		return Client_2.getIns().getCrossChannel();
	}

	@Override
	public CrossSelectRoom crossSelectRoom(int type, String param) {
		return new CrossSelectRoom(1, GameProperties.cross_domainName_2, GameProperties.serverPort);
	}
	
	@Override
	public void crossAfterLoginSucc(Hero hero, int crossLoginRoomId) {
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		int mjID = crossSJMiJing.getFristId();
		int teamID = crossSJMiJing.getTeamID();
		if(teamID == 0){
			CrossSJMiJingManager.getIns().getMiJingTeamData(hero, mjID);
		}else {
			CrossSJMiJingManager.getIns().getMiJingTeamData(hero, mjID);
			CrossSJMiJingManager.getIns().joinByTeamID(hero, teamID, mjID);
			CrossSJMiJingSender.sendCmd_3778(hero.getId(), 1);
		}
	}
	
	@Override
	public void localBeforeUpload(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		int fristId = crossSJMiJing.getFristId();
		Map<Integer, Integer> miJingIDMap = crossSJMiJing.getMiJingIDMap();
		int teamID = crossSJMiJing.getTeamID();
		int numHelpAwards = crossSJMiJing.getNumHelpAwards();
		Map<Integer, Integer> saoDangMap = crossSJMiJing.getSaoDangMap();
		crossData.putObject( CrossEnum.data1, fristId);
		crossData.putObject( CrossEnum.data2, miJingIDMap);
		crossData.putObject( CrossEnum.data3, teamID);
		crossData.putObject( CrossEnum.DATA4, numHelpAwards);
		
		WuJiang wujiang = hero.getWujiang();
		if(wujiang!=null)
			crossData.putObject( CrossEnum.DATA5, wujiang.getJieLv());
		ZhanJia zhanJia = hero.getZhanJia();
		if(zhanJia!=null)
			crossData.putObject( CrossEnum.DATA6, zhanJia.getJieLv());
		TreasureData treasureData = hero.getTreasureData();
		if(treasureData!=null)
			crossData.putObject( CrossEnum.DATA7, treasureData.getLevel());
		GodBook godbook = hero.getGodbook();
		if(godbook!=null)
			crossData.putObject( CrossEnum.DATA8, godbook.getLevel());
		Excalibur excalibur = hero.getExcalibur();
		if(excalibur!=null)
			crossData.putObject( CrossEnum.DATA9, excalibur.getJieLv());
		SpecialTreasure specialTreasure = hero.getSpecialTreasure();
		if(specialTreasure!=null)
			crossData.putObject( CrossEnum.DATA10, specialTreasure.getJieLv());
		BingFa bingfa = hero.getBingfa();
		if(bingfa!=null)
			crossData.putObject( CrossEnum.DATA11, bingfa.getJieLv());
		WeekCardModel weekCardModel = hero.getWeekCardModel();
		if (weekCardModel != null) {
			crossData.putObject(CrossEnum.DATA12, JSON.toJSONString(weekCardModel));
		}
		crossData.putObject( CrossEnum.DATA13, saoDangMap);
		
		crossData.putObject( CrossEnum.DATA14, DoubleProduceFunction.getIns().checkIsStart(hero));
		
		CrossSJMiJingManager.getIns().openUI(hero);
	}
	
	@Override
	public CrossData crossAfterReciSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		Integer fristId = crossData.getObject( CrossEnum.data1, Integer.class);
		Map<Integer, Integer> miJingIDMap = crossData.getObject( CrossEnum.data2, new TypeReference<Map<Integer, Integer>>(){}.getType());
		Map<Integer, Integer> saoDangMap = crossData.getObject( CrossEnum.DATA13, new TypeReference<Map<Integer, Integer>>(){}.getType());
		
		Integer teamID = crossData.getObject( CrossEnum.data3, Integer.class);
		Integer numHelpAwards = crossData.getObject( CrossEnum.DATA4, Integer.class);
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		if(crossSJMiJing==null){
			crossSJMiJing = new CrossSJMiJing();
			hero.setCrossSJMiJing(crossSJMiJing);
		}
		crossSJMiJing.setFristId(fristId);
		crossSJMiJing.setMiJingIDMap(miJingIDMap);
		crossSJMiJing.setTeamID(teamID);
		crossSJMiJing.setNumHelpAwards(numHelpAwards);
		crossSJMiJing.setSaoDangMap(saoDangMap);
		
		Integer data5 = crossData.getObject( CrossEnum.DATA5, Integer.class);
		WuJiang wujiang = new WuJiang(); 
		if(data5!=null) {
			wujiang.setJieLv(data5);
		}else {
			wujiang.setJieLv(0);
		}
		hero.setWujiang(wujiang);
		
		Integer data6 = crossData.getObject( CrossEnum.DATA6, Integer.class);
		ZhanJia zhanJia = new ZhanJia();
		if(data6!=null) {
			zhanJia.setJieLv(data6);
		}else {
			zhanJia.setJieLv(0);
		}
		hero.setZhanJia(zhanJia);
		
		Integer data7 = crossData.getObject( CrossEnum.DATA7, Integer.class);
		TreasureData treasureData = new TreasureData(); 
		if(data7!=null) {
			treasureData.setLevel(data7);
		}else {
			treasureData.setLevel(0);
		}
		hero.setTreasureData(treasureData);
		
		Integer data8 = crossData.getObject( CrossEnum.DATA8, Integer.class);
		GodBook godbook = new GodBook();
		if(data8!=null) {
			godbook.setLevel(data8);
		}else {
			godbook.setLevel(0);
		}
		hero.setGodbook(godbook);
		
		Integer data9 = crossData.getObject( CrossEnum.DATA9, Integer.class);
		Excalibur excalibur = new Excalibur();
		if(data9!=null) {
			excalibur.setJieLv(data9);
		}else {
			excalibur.setJieLv(0);
		}
		hero.setExcalibur(excalibur);
		
		Integer data10 = crossData.getObject( CrossEnum.DATA10, Integer.class);
		SpecialTreasure specialTreasure = new SpecialTreasure();
		if(data10!=null) {
			specialTreasure.setJieLv(data10);
		}else {
			specialTreasure.setJieLv(0);
		}
		hero.setSpecialTreasure(specialTreasure);
		
		Integer data11 = crossData.getObject( CrossEnum.DATA11, Integer.class);
		BingFa bingfa = new BingFa();
		if(data11!=null) {
			bingfa.setJieLv(data11);
		}else {
			bingfa.setJieLv(0);
		}
		hero.setBingfa(bingfa);
		
		String weekCardStr = crossData.getObject(CrossEnum.DATA12, String.class);
		WeekCardModel weekCardModel = new WeekCardModel();
		if (weekCardStr != null) {
			weekCardModel = JSONObject.parseObject(weekCardStr, WeekCardModel.class);
		}
		hero.setWeekCardModel(weekCardModel);
		
		Boolean isDouble = crossData.getObject( CrossEnum.DATA14, Boolean.class);
		crossSJMiJing.setDouble(isDouble);

		return super.crossAfterReciSucc(hero, channel, crossLoginParam, crossData);
	}
	
	@Override
	public void crossLogout(Hero hero, CrossData crossData) {
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		Map<Integer, Integer> miJingIDMap = crossSJMiJing.getMiJingIDMap();
		int numHelpAwards = crossSJMiJing.getNumHelpAwards();
		Map<Integer, Integer> saoDangMap = crossSJMiJing.getSaoDangMap();
		crossData.putObject( CrossEnum.data1, miJingIDMap);
		crossData.putObject( CrossEnum.data2, numHelpAwards);
		crossData.putObject( CrossEnum.data3, saoDangMap);
		
		CrossSJMiJingManager.getIns().leave(hero);
	}

	@Override
	public void localAfterLogout(Hero hero, CrossData crossData) {
//		Map<Integer, Integer> miJingIDMap = crossData.getObject( CrossEnum.data1, new TypeReference<Map<Integer, Integer>>(){}.getType());
//		Integer numHelpAwards = crossData.getObject( CrossEnum.data2, Integer.class);
//		Map<Integer, Integer> saoDangMap = crossData.getObject( CrossEnum.data3, new TypeReference<Map<Integer, Integer>>(){}.getType());
//		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
//		crossSJMiJing.setMiJingIDMap(miJingIDMap);
//		crossSJMiJing.setNumHelpAwards(numHelpAwards);
//		crossSJMiJing.setSaoDangMap(saoDangMap);
	}
	
}
