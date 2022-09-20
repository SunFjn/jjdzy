package com.teamtop.hefu;

import java.util.Iterator;
import java.util.List;

import com.teamtop.cross.CrossCache;
import com.teamtop.system.linglongge.LingLongCrossSysCache;
import com.teamtop.system.linglongge.model.LingLongGeRankZoneid;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

/**
 * 和服后的区
 * @author jjjjyyy
 *
 */
public class HefuCrossFunction {
	
	public static HefuCrossFunction ins;
	public static synchronized HefuCrossFunction getIns() {
		if(ins == null){
			ins = new HefuCrossFunction();
		}
		return ins;
	}
	/**
	 * 和服后的区 连接中央服的时候 检测那些系统需要处理和服数据
	 */
	public void hefuEffect(Channel channel) {
		try {
			List<Integer> list = CrossCache.getChannelToZoneid().get(channel);
		    if (list.size()>1) {
				//是和服区
		    	hefuForCrossXuBao(channel);
			}
		} catch (Exception e) {
			LogTool.error(e, HefuCrossFunction.class, "hefuEffect has wrong");
		}
	}
	
	/**
	 * 和服区 寻宝特殊处理
	 */
	public void hefuForCrossXuBao(Channel channel) {
		try {
			//玲珑阁（寻宝）
			List<Integer> hefuZoneidlist = CrossCache.getChannelToZoneid().get(channel);
			int partId = CrossCache.getPartId(channel);
			List<LingLongGeRankZoneid> zoneidRankList =LingLongCrossSysCache.getZoneidRankList(partId);
			if (zoneidRankList != null && hefuZoneidlist.size()>1) {
				//从列表里删除和服区首服以外的其他区服数据 并把积分计入和服区首服内
				int fristZoneid = hefuZoneidlist.get(0);
				Integer fristIndex=null;
				Integer addSource=0;
				for (int i = 0; i < zoneidRankList.size(); i++) {
					LingLongGeRankZoneid lingLongGeRankZoneid = zoneidRankList.get(i);
					int zoneid = lingLongGeRankZoneid.getZoneid();
					if (fristZoneid!=zoneid) {
						addSource=addSource+lingLongGeRankZoneid.getScore();
					}else {
						fristIndex=i;
					}
					
				}
				if (fristIndex!=null) {
					LingLongGeRankZoneid lingLongGeRankZoneid = zoneidRankList.get(fristIndex);
					lingLongGeRankZoneid.setScore(lingLongGeRankZoneid.getScore()+addSource);
				}
				//移除其他区
				Iterator<LingLongGeRankZoneid> it = zoneidRankList.iterator();
		        while(it.hasNext()){
		        	LingLongGeRankZoneid lingLongGeRankZoneid = it.next();
		            if(lingLongGeRankZoneid.getZoneid()!=fristZoneid&&hefuZoneidlist.contains(lingLongGeRankZoneid.getZoneid())){
		                it.remove();
		            }        
		        }
			}
		} catch (Exception e) {
			LogTool.error(e, HefuCrossFunction.class, "hefuForCrossXuBao has wrong");
		}
	}
	

}
