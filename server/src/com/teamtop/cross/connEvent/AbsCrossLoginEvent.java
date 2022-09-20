package com.teamtop.cross.connEvent;

import java.util.List;

import com.teamtop.cross.CrossData;
import com.teamtop.system.hero.Hero;

import io.netty.channel.Channel;

/**
 * 客户端连接中央服的过程（跨服龙舟，跨服钓鱼等需要客户端连接的系统）
 * @author Administrator
 *
 */
public abstract class AbsCrossLoginEvent {
	/**
	 * 子服请求中央服分配房间
	 * @param hero
	 * @param type 系统类型
	 * @param param 自定义参数
	 * @return 中央服的连接channel
	 */
	public abstract Channel localAsk(Hero hero, int type, List<Object[]> param);
	/**
	 * 中央服分配房间
	 * @param type 系统类型
	 * @param param 自定义参数
	 * @return 房间model，包括是否匹配成功，房间所在的中央服的ip和端口,房间id
	 */
	public abstract CrossSelectRoom crossSelectRoom(int type,String param);
	/**
	 * 子服在上传数据前操作，一般set自身系统的数据
	 * @param hero
	 * @param channel
	 * @param crossLoginParam
	 * @param crossData
	 */
	public void localBeforeUpload(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		
	}
	/**
	 * 中央服在成功接收玩家数据后的操作，用于get自身系统在上传前封装的数据
	 * @param hero
	 * @param channel
	 * @param crossData
	 */
	public CrossData crossAfterReciSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		return null;
	};
	/**
	 * 子服在成功上传玩家数据后的操作
	 * @param hero
	 * @param channel
	 * @param crossData
	 */
	public void localAfterUploadSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		
	};
	/**
	 * 中央服在客户端登陆成功后的操作，可以在此让客户端进入场景或发送自定义协议
	 * @param hero
	 * @param 分配好的房间id
	 */
	public abstract void crossAfterLoginSucc(Hero hero,int crossLoginRoomId);
	/**
	 * 中央服退出
	 * @param hero
	 */
	public abstract void crossLogout(Hero hero,CrossData crossData);
	/**
	 * 子服在中央服退出后的处理，一般为hero的本系统对象从中央服传回
	 * @param hero
	 * @param crossData
	 */
	public void localAfterLogout(Hero hero,CrossData crossData){
		
	}
	/**
	 * 升级
	 * @param hero
	 */
	public void levelUp(Hero hero){
		
	}
}
