package com.teamtop.system.restrictedAccess;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xzlq_743;
import excel.struct.Struct_xzlq_743;

public class RestrictedAccessUtil {

	/**
	 * 判断是否可领取
	 * @param	resID  不监控填0
	 */
	public static boolean canAdd(Hero hero, int resID, int num) {
//		RestrictedAccess restrictedAccess = hero.getRestrictedAccess();
//		if(restrictedAccess==null)
//			return false;
//		if(resID==0|| num==0)
//			return true;
//		Struct_xzlq_743 excel = Config_xzlq_743.getIns().get( resID);
//		if(excel==null) {
//			System.err.println("RestrictedAccessUtil.canAdd.限制领取表无id:"+resID);
//			return true;//无限制
//		}
//		int numCanGetExcel = excel.getJlcishu();
//		if( numCanGetExcel<num)
//			return false;
//		//检查重置
//		checkAndReset(hero, resID);
//		
//		Map<Integer, Integer> numBuyedMap = restrictedAccess.getNumBuyedMap();
//		Integer numBuyed = numBuyedMap.get( resID);
//		Map<Integer, Integer> timeBuyedMap = restrictedAccess.getTimeBuyedMap();
//		Integer timeBuyed = timeBuyedMap.get( resID);
//		if(numBuyed==null&& timeBuyed==null) {
//			return true;
//		}else if( numBuyed+num <=numCanGetExcel){
//			return true;
//		}
//		LogTool.warn("限制领取报警exception,CanGet.hid:"+hero.getId()+" resID:"+resID+" num:"+num+" numHero:"+numBuyed, RestrictedAccessUtil.class);
//		return false;
		return true;
	}
	
	public static void checkAndReset(Hero hero, int resID) {
		Struct_xzlq_743 excel = Config_xzlq_743.getIns().get( resID);
		if(excel==null)
			return;//无限制
		RestrictedAccess restrictedAccess = hero.getRestrictedAccess();
		Map<Integer, Integer> numBuyedMap = restrictedAccess.getNumBuyedMap();
		Integer numBuyed = numBuyedMap.get( resID);
		if( numBuyed==null)
			return;
		Map<Integer, Integer> timeBuyedMap = restrictedAccess.getTimeBuyedMap();
		Integer timeBuyed = timeBuyedMap.get( resID);
		if( timeBuyed==null)
			return;
		int typeExcel = excel.getLeixing();
		int timeResetExcel = excel.getZhouqi();
		
		if(typeExcel==RestrictedAccessConst.TYPE_1){
			 int timeDiffer = TimeDateUtil.getCurrentTime() - timeBuyed;
			 if(timeDiffer < timeResetExcel)
				 return;
			 numBuyedMap.remove( resID);
			 timeBuyedMap.remove( resID);
			 
		}else if(typeExcel==RestrictedAccessConst.TYPE_2){
			boolean sameDay = TimeDateUtil.isSameDay( timeBuyed*1000l, TimeDateUtil.getCurrentTimeInMillis());
			if(sameDay)
				return;
			numBuyedMap.remove( resID);
			timeBuyedMap.remove( resID);
			
		}else if(typeExcel==RestrictedAccessConst.TYPE_3){
			return;
		}
	}
	
	/**
	 * 领取，统计
	 * @param	resID  不监控填0
	 */
	public static void use(Hero hero, int resID, int num) {
		try {
			RestrictedAccess restrictedAccess = hero.getRestrictedAccess();
			if(restrictedAccess==null)
				return ;
			Struct_xzlq_743 excel = Config_xzlq_743.getIns().get( resID);
			if(excel==null)
				return ;//无限制
			int numCanGetExcel = excel.getJlcishu();
			if( numCanGetExcel<num)
				return ;
			int timeNow = TimeDateUtil.getCurrentTime();
			//检查重置
			checkAndReset(hero, resID);
			
			Map<Integer, Integer> numBuyedMap = restrictedAccess.getNumBuyedMap();
			Integer numBuyed = numBuyedMap.get( resID);
			Map<Integer, Integer> timeBuyedMap = restrictedAccess.getTimeBuyedMap();
			Integer timeBuyed = timeBuyedMap.get( resID);
			if(numBuyed==null&& timeBuyed==null) {
				numBuyedMap.put( resID, num);
				timeBuyedMap.put( resID, timeNow);
			}else if( numBuyed+num<= numCanGetExcel){
				numBuyedMap.put( resID, numBuyed+num);
				timeBuyedMap.put( resID, timeNow);
			}
		} catch (Exception e) {
			LogTool.error(e, RestrictedAccessUtil.class, "Use.hid:"+hero.getId()+" resID:"+resID+" num:"+num);
		}
	}
	
	/**
	 * 查看1条数据
	 * @param	type	1要中文抬头,较详细  2不要抬头
	 */
	public static String gmGetDataByID(Hero hero, int resID, int type) {
		RestrictedAccess restrictedAccess = hero.getRestrictedAccess();
		if(restrictedAccess==null)
			return "玩家数据restrictedAccess为空";
		Struct_xzlq_743 excel = Config_xzlq_743.getIns().get( resID);
		if(excel==null)
			return "限制领取表没有ID:"+resID;//无限制
		int numCanGetExcel = excel.getJlcishu();
		int typeExcel = excel.getLeixing();
		//检查重置
		checkAndReset(hero, resID);
		
		Map<Integer, Integer> numBuyedMap = restrictedAccess.getNumBuyedMap();
		Integer numBuyed = numBuyedMap.get( resID);
		Map<Integer, Integer> timeBuyedMap = restrictedAccess.getTimeBuyedMap();
		Integer timeBuyed = timeBuyedMap.get( resID);
		if(numBuyed==null&& timeBuyed==null) {
			return excel.getMingcheng()+" id:"+resID+" 无购买记录";

		}else if(typeExcel==RestrictedAccessConst.TYPE_1){
			int timeReset = timeBuyed + excel.getZhouqi();
			String timeStr = TimeDateUtil.printFormatIntTime2StrTime( timeReset, "yyyy-MM-dd HH");
			if(type==1)
				return excel.getMingcheng()+"\n    id:"+resID+" 类型:"+typeExcel+" 已购:"+numBuyed+" ,还可购:"+(numCanGetExcel-numBuyed)+" "+timeStr+"点重置";
			if(type==2)
				return "id:"+resID+" 已购:"+numBuyed+" 还可购:"+(numCanGetExcel-numBuyed)+" "+timeStr+"点重置";
		}else if(typeExcel==RestrictedAccessConst.TYPE_2){
			if(type==1)
				return excel.getMingcheng()+"\n    id:"+resID+" 类型:"+typeExcel+" 已购:"+numBuyed+" ,还可购:"+(numCanGetExcel-numBuyed) +" 0点重置";
			if(type==2)
				return "id:"+resID+" 已购:"+numBuyed+" 还可购:"+(numCanGetExcel-numBuyed) +" 0点重置";
		}else if(typeExcel==RestrictedAccessConst.TYPE_3){
			if(type==1)
				return excel.getMingcheng()+"\n    id:"+resID+" 类型:"+typeExcel+" 已购:"+numBuyed+" ,还可购:"+(numCanGetExcel-numBuyed)+" 永不重置";
			if(type==2)
				return "id:"+resID+" 已购:"+numBuyed+" 还可购:"+(numCanGetExcel-numBuyed)+" 永不重置";
		}else {
			if(type==1) {
				return excel.getMingcheng()+" \nid:"+resID+" 类型:"+typeExcel+"不存在  已购:"+numBuyed;
			}else {
				return "id:"+resID+"不存在  已购:"+numBuyed;
			}
		}
		return "不可能来这里的";
	}

	/**
	 * 查看所有数据
	 */
	public static String gmGetAllData(Hero hero) {
		RestrictedAccess restrictedAccess = hero.getRestrictedAccess();
		if(restrictedAccess==null)
			return "玩家数据restrictedAccess为空";
		StringBuilder logStr = new StringBuilder("        <font color='#4dffff'>玩家限制领取数据如下：</font> ♕♚♔ *⁺˚⁺ପ(๑･ω･)੭ु⁾⁾");
		Map<Integer, Integer> numBuyedMap = restrictedAccess.getNumBuyedMap();
		Iterator<Integer> iterator = numBuyedMap.keySet().iterator();
		while( iterator.hasNext()) {
			Integer resIDTemp = iterator.next();
			logStr.append("\n").append( gmGetDataByID(hero, resIDTemp, 2));
		}
		return logStr.toString();
	}
	
	/**
	 * GM修改值
	 */
	public static String setByGM(Hero hero, int resID, int num) {
		RestrictedAccess restrictedAccess = hero.getRestrictedAccess();
		if(restrictedAccess==null)
			return "玩家数据未初始化";
		Struct_xzlq_743 excel = Config_xzlq_743.getIns().get( resID);
		if(excel==null)
			return "配置表找不到id:"+resID;//无限制
		int timeNow = TimeDateUtil.getCurrentTime();
		//检查重置
		checkAndReset(hero, resID);
		
		Map<Integer, Integer> numBuyedMap = restrictedAccess.getNumBuyedMap();
		Map<Integer, Integer> timeBuyedMap = restrictedAccess.getTimeBuyedMap();
		numBuyedMap.put( resID, num);
		timeBuyedMap.put( resID, timeNow);
		String gmGetDataByID = gmGetDataByID(hero, resID, 1);
		return "        <font color='#4dffff'>限制领取数据修改如下：</font> ♕♚♔ *⁺˚⁺ପ(๑･ω･)੭ु⁾⁾\n "+gmGetDataByID;
	}
}
