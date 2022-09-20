package com.teamtop.houtaiHttp.events.heroInfo;

import java.util.Map;

import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroMapper;
import com.teamtop.util.json.JsonUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.DaoUtil;

import io.netty.channel.ChannelHandlerContext;

/**
 * 货币修改http处理类
 * @author kyle
 *
 */
public class MoneySetHttpEvent extends AbsHouTaiHttpEvent {
	private static MoneySetHttpEvent ins = null;
	
	public static MoneySetHttpEvent getIns(){
		if(ins == null){
			ins = new MoneySetHttpEvent();
		}
		return ins;
	}
	
	private static final Logger logger = LoggerFactory.getLogger(MoneySetHttpEvent.class);
	/**
	 * 货币修改接口：
	参数：
	type：0：查询 1：元宝 2:铜币 3：功勋、4：贡献、5：修为、6：宝物点
	hid：玩家hid
	del:删除多少
	返回值：操作成功后返回1，失败返回-1
	 * 
	 */
	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		long hid = NumberUtils.toLong(paramMap.get("hid"));//hid
		int type = NumberUtils.toInt(paramMap.get("type"));
		long del = NumberUtils.toLong(paramMap.get("del"));
		try {
			boolean online = false;
			Hero hero = HeroCache.getHero(hid);
			if(HeroFunction.getIns().isOnline(hid)){
				online = true;
			}else{
				hero = HeroDao.getIns().find(hid,null);
			}
			if(type==0){
				M_MoneyInfo m_MoneyInfo = new M_MoneyInfo();
				m_MoneyInfo.setYuanbao(hero.getYuanbao());
				m_MoneyInfo.setCoin(hero.getCoin());
				m_MoneyInfo.setBanggong(0);
				m_MoneyInfo.setXiuwei(0);
				m_MoneyInfo.setGongxun(hero.getZhanGong());
				int baoWuNum = 0;
				m_MoneyInfo.setBaowuPoint(baoWuNum);
				
				String jsonEncode = JsonUtils.toStr(m_MoneyInfo);
				HttpUtil.response(jsonEncode, ctx);
			}else{
				int moneytype = 0;
				if(type==1){
					//1：元宝
					moneytype = GameConst.YUANBAO;
				}else if(type==2){
					//2:铜币 
					moneytype = GameConst.COIN;
				}else if(type==3){
					//3：功勋
					moneytype = GameConst.ZHANGONG;
				}else if(type==4){
					//4：贡献
					moneytype = GameConst.CONTRIBUTE;
				}else if(type==5){
					//5：修为
					//moneytype = GameConst.XIUWEI;
				}else if(type==6){
					//6：宝物点
					moneytype = GameConst.BAO_WU;
				} else if (type == 7) {
					// 7:星魂
					moneytype = GameConst.STARSOUL;
				} else if (type == 8) {
					// 8:魂火
					moneytype = GameConst.SOULFIRE;
				} else if (type == 9) {
					// 9:声望
					moneytype = GameConst.PRESTIGE;
				} else if (type == 10) {
					// 10:分享币
					moneytype = GameConst.SHARE_COIN;
				}
				if(UseAddUtil.canUseHuobi(hero, moneytype, del)){
					UseAddUtil.useHuobi(hero, moneytype, del, SourceGoodConst.USE_HOUTAI);
					if(moneytype==GameConst.BAO_WU){
						
					}else if(moneytype==GameConst.CONTRIBUTE){
						
					}else{
						if(!online){
							//update
							DaoUtil.update(hero, HeroMapper.class, hero.getZoneid());
						}
					}
				}else{
					HttpUtil.responseFail(ctx);
				}
			}
			HttpUtil.responseSucc(ctx);
		} catch (Exception e) {
			logger.error(LogTool.exception(e,"hid:"+hid+",type:"+type));
			HttpUtil.responseFail(ctx);
		}
	}
}
