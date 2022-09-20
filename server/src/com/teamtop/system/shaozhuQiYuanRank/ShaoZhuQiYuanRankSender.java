package com.teamtop.system.shaozhuQiYuanRank;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * ShaoZhuQiYuanRankSender.java
 * 少年英主-祈愿排名
 */
public class ShaoZhuQiYuanRankSender{
		/**
		 * 打开界面返回
		 * @param rankList 排行
		 * @param model 第一名职业时装（job*1000+时装id），没有则为0
		 * @param iconList 第二，第三名头像id，头像框，国家，vip等级
		 * @param myQiYuan 我的祈愿
		 * @param myRank 我的排名
		 * @param endTime 结束时间
		**/
		public static void sendCmd_7402(long hid  ,   Object[]  rankList  ,   int  model  ,   Object[]  iconList  ,   int  myQiYuan  ,   int  myRank  ,   int  endTime ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{rankList,model,iconList,myQiYuan,myRank,endTime};
			if(!hero.isCanSend(7402, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 7402);
		}
}