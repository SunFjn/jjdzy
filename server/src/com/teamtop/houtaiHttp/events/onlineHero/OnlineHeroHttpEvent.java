package com.teamtop.houtaiHttp.events.onlineHero;

import io.netty.channel.ChannelHandlerContext;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.event.backstage.events.backstage.dao.HoutaiDao;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.LightLoginHero;
import com.teamtop.util.json.JsonUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 在线玩家列表
 * @author hepl
 *
 */
public class OnlineHeroHttpEvent extends AbsHouTaiHttpEvent {
	private static OnlineHeroHttpEvent ins = null;
	
	public static OnlineHeroHttpEvent getIns(){
		if(ins == null){
			ins = new OnlineHeroHttpEvent();
		}
		return ins;
	}
	
	//http://192.168.7.115:9802/?key=4060f4a20ca7de5277ff7f77e89a1c73&cmd=4&randnum=1453433725&zoneid=1&page=1
	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		int page = 0;
		try {
			//page = Integer.parseInt(paramMap.get("page"));
			//String hidStr = paramMap.get("hid");
			String nameStr = paramMap.get("name");
			//String openidStr = paramMap.get("openid");
			String zoneidStr = paramMap.get("zoneid");
			
			Integer zoneid = null;
			if(zoneidStr != null){
				zoneid = Integer.parseInt(zoneidStr); //区号，没有则表示合服所有区的数据
			}
			Hero hero=null;
		    if(nameStr!=null){
				nameStr = URLDecoder.decode(nameStr, "utf-8");
				if(zoneid != null){
					hero = HeroDao.getIns().findHidByName(nameStr, zoneid);
				}
				if (hero!=null) {
					//转成json输出
					LightLoginHero lightHero = HeroDao.getIns().findHeroLoginBase(hero.getId());
					String resultStr = JsonUtils.toStr("id:"+hero.getId())+" openid:"+lightHero.getOpenid();
					HttpUtil.response(resultStr, ctx);
					return;
				}
			}
			
		} catch (Exception e){
			LogTool.error(e, OnlineHeroHttpEvent.class, "OnlineRoleHttpEvent error!");
		}
	}

	/**
	 * 获取页数信息
	 * @param numPerPage 每页显示多少条
	 * @param totalNum 总共有多少条
	 * @param page 当前页
	 * @return 开始数startNum,显示数showNum,总页数totalPage
	 */
	public Integer[] getPageInfo(int numPerPage,int totalNum,int page){
		int startNum = numPerPage *(page-1);
		int totalPage = totalNum/numPerPage;
		if(totalNum%numPerPage>0) totalPage++;
		if(startNum>totalNum){
			//开始数大于总数
			if(totalNum%numPerPage>0){
				//最后一页不够10条
				totalPage++;
			}
			startNum = numPerPage * (totalPage-1);
		}
		int showNum = numPerPage;
		if(startNum + numPerPage>totalNum){
			showNum = totalNum-startNum;
		}
		return new Integer[]{startNum,showNum,totalPage};
	}
}
