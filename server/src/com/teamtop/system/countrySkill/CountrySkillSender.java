package com.teamtop.system.countrySkill;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * CountrySkillSender.java
 * 国家技能
 */
public class CountrySkillSender{
		/**
		 * 打开界面返回
		 * @param skillList 技能列表
		 * @param countryPrestige 国家声望
		 * @param kingshipOpenState 王位之争活动开启状态，0：未开启，1：已开启
		**/
		public static void sendCmd_6002(long hid  ,   Object[]  skillList  ,   long  countryPrestige  ,  int  kingshipOpenState ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{skillList,countryPrestige,kingshipOpenState};
			if(!hero.isCanSend(6002, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 6002);
		}
		/**
		 * 激活或升级返回
		 * @param state 状态：0：失败，1：成功，2：未满足条件，3：国家声望不足，4：已满级
		 * @param skillId 技能id
		 * @param countryPrestige 国家声望
		**/
		public static void sendCmd_6004(long hid  ,  int  state  ,   int  skillId  ,   long  countryPrestige ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{state,skillId,countryPrestige};
			if(!hero.isCanSend(6004, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 6004);
		}
}