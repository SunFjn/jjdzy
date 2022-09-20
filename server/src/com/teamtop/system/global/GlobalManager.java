package com.teamtop.system.global;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.gm.event.ActivitySysGMEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.restrictedAccess.RestrictedAccessUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 系统全局功能逻辑类
 * @author lobbyer
 * @date 2017年4月13日
 */
public class GlobalManager {
	private static GlobalManager ins;
	public static GlobalManager getIns(){
		if(ins == null) {
			ins = new GlobalManager();
		}
		return ins;
	}
	
	
	/**
	 * 读取服务器时间信息
	 * @return
	 */
	public void getServerTime(Hero hero){
		if(hero==null || !HeroFunction.getIns().isOnline(hero.getId())){
			return;
		}
		GlobalSender.sendCmd_252(hero.getId(), TimeDateUtil.getCurrentTimeInMillis(), TimeDateUtil.serverTimezone.getDisplayName());
	}
	
	/**
	 * 读取服务器开服时间信息
	 * @return
	 */
	public void getKaiFuTime(Hero hero){
		if(hero==null || !HeroFunction.getIns().isOnline(hero.getId())){
			return;
		}
		GlobalSender.sendCmd_258(hero.getId(), GameProperties.serverOpenTime);
	}

	public void showSecret(Hero hero, String anHao, String param) {
		try {
			Hero heroOth = null;
			long hidOth = 0;
			String strData1 = "";//公共使用
			int intData1 = 0;//公共使用
			switch ( anHao) {
			case GlobalConst.AN_HAO_ACTIVITY_ALL_活动:
				//查看活动时间
				ActivitySysGMEvent.getActivityTimeGM(hero);
				break;
			case GlobalConst.AN_HAO_RESTRICTED_个人所有监控:
				//查看本人所有限制监控领取数据
				strData1 = RestrictedAccessUtil.gmGetAllData(hero);
				GlobalSender.sendCmd_260(hero.getId(), 4, strData1);
				break;
			case GlobalConst.AN_HAO_RESTRICTED_个人单个监控:
				//查看本人1个限制监控领取数据   
				int parseInt = Integer.parseInt( param);
				strData1 = RestrictedAccessUtil.gmGetDataByID(hero, parseInt, 1);
				GlobalSender.sendCmd_260(hero.getId(), 4, "      <font color='#58ff58'>玩家限制领取 </font>"+parseInt+"<font color='#58ff58'> 数据如下</font>： ٩(๑`v´๑)۶ YES!!\n"+strData1);
				break;
			case GlobalConst.AN_HAO_RESTRICTED_别人所有监控:
				//查看别人所有限制监控领取数据
				hidOth = Long.parseLong( param);
				heroOth = HeroCache.getHero(hidOth);
				if(heroOth==null) {
					GlobalSender.sendCmd_260(hero.getId(), 4, "玩家不在线");
					return;
				}
				strData1 = RestrictedAccessUtil.gmGetAllData(heroOth);
				GlobalSender.sendCmd_260(hero.getId(), 4, strData1);
				break;
			case GlobalConst.AN_HAO_RESTRICTED_别人单个监控:
				//查看别人1个限制监控领取数据
				String[] split = param.split("_");
				hidOth = Long.parseLong( split[0]);//玩家ID
				intData1 = Integer.parseInt( split[1]);//监控表ID
				heroOth = HeroCache.getHero(hidOth);
				if(heroOth==null) {
					GlobalSender.sendCmd_260(hero.getId(), 4, "玩家不在线");
					return;
				}
				strData1 = RestrictedAccessUtil.gmGetDataByID(heroOth, intData1, 1);
				GlobalSender.sendCmd_260(hero.getId(), 4, "      <font color='#58ff58'>玩家限制领取 </font>"+intData1+"<font color='#58ff58'> 数据如下</font>： ٩(๑`v´๑)۶ YES!!\n"+strData1);
				break;
			default:
				break;
			}
		} catch (Exception e) {
			LogTool.error(e, this, "ShowSecret.hid:"+hero.getId()+" anHao:"+anHao+" param:"+param);
			GlobalSender.sendCmd_260(hero.getId(), 4, "      <font color='#ff8f59'>参数错误啦 </font><font color='#ffff37'>欧耶 ٩(๑`v´๑)۶ YES!!</font>\n 参数1:"+ anHao+" \n 参数2:"+param);
		}
		LogTool.warn("正式服有人进来？！？！？hid:"+hero.getId()+" name:"+hero.getNameZoneid(), this);
	}
}
