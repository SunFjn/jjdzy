package com.teamtop.houtaiHttp.events.heroInfo;

import io.netty.channel.ChannelHandlerContext;

import java.util.Map;

import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.bag.Bag;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.bag.BagGrid;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.util.db.orm.AutoObjTableDao;
import com.teamtop.util.log.LogTool;

/**
 * 删除背包物品http处理类
 * @author kyle
 *
 */
public class BagDelGoodHttpEvent extends AbsHouTaiHttpEvent {
	private static BagDelGoodHttpEvent ins = null;
	
	public static BagDelGoodHttpEvent getIns(){
		if(ins == null){
			ins = new BagDelGoodHttpEvent();
		}
		return ins;
	}
	
	private static final Logger logger = LoggerFactory.getLogger(BagDelGoodHttpEvent.class);
	/**
	 * 背包修改接口：
	参数：
	类型 1：道具，2：装备
	hid：玩家hid
	id，道具时为系统id，装备时为唯一id
	num:删除数量
	返回值：操作成功后返回1，失败返回-1
	 * 
	 */
	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		long hid = NumberUtils.toLong(paramMap.get("hid"));//hid
		int type = Integer.parseInt(paramMap.get("type"));//类型 1：道具，2：装备
		int id = Integer.parseInt(paramMap.get("id"));//id，道具时为系统id，装备时为唯一id
		int num = Integer.parseInt(paramMap.get("num"));//删除数量，装备时常为1
		try {
			Hero hero = HeroCache.getHero(hid);
			boolean online = true;
			boolean update = false;
			if(hero==null){
				online = false;
				hero = HeroDao.getIns().find(hid,null);
			}
			if(hero==null){
				LogTool.warn("hero not found,hid"+hid, this);
				HttpUtil.responseFail(ctx);
				return;
			}
			Bag bag = hero.getBag();
			if(type==1){
				//1道具
				Map<Integer, BagGrid> itemData = bag.getItemData();
				BagGrid grid = itemData.get(id);
				if(grid != null && grid.getNum()>=num){
					int[][] data = new int[1][];
					data[0] = new int[]{id,num};
					grid.setNum(grid.getNum() - num);
					if(grid.getNum() <= 0) {
						grid.setNum(0);
						itemData.remove(id);
					}
					HttpUtil.responseSucc(ctx);
					update = true;
				}else{
					HttpUtil.responseFail(ctx);
				}
			}else if(type==2){
				//2装备
				Map<Long, BagGrid> equipData =BagFunction.getIns().getEquipData(hero);
				long findid = 0l;
				for(BagGrid grid:equipData.values()){
					if(grid.getSysId()==id){
						findid = grid.getUnitId();
						break;
					}
				}
				if(findid>0){
					equipData.remove(findid);
					HttpUtil.responseSucc(ctx);
					update = true;
				}else{
					HttpUtil.responseFail(ctx);
				}
			}else{
				HttpUtil.responseFail(ctx);
				return;
			}
			/*BagGrid grid = BagFunction.getIns().getBagGridByIndex(bagData, gridIndex);
			if(grid == null){
				HttpUtil.responseFail(ctx);
				return;
			}
			int sysId = grid.getSysId();
			if(sysId==0){
				logger.warn(LogFormat.rec(hid, hero.getNameZoneid(), "gridIndex has no good,gridIndex:"+gridIndex));
				HttpUtil.responseFail(ctx);
				return;
			}
			long equipuid = 0;
			if(grid.getType()==GameConst.EQUIP){
				//装备
				equipuid = grid.getUnitId();
			}
			GridTempData[] data = new GridTempData[]{new GridTempData(grid.getUnitId(), grid.getGridIndex(), num)};
			boolean flag = false;
			if(place==1){
				//1背包
				flag = BagFunction.getIns().takeOutGoodsByGridIndex(hero, data, SourceGoodConst.USE_HOUTAI);
			}else if(place == 2){
				//2仓库
				flag = BagFunction.getIns().takeOutGoodsByGridIndexFromStore(hero, data, SourceGoodConst.USE_HOUTAI);
			}
			if(!flag){
				logger.warn(LogFormat.rec(hid, hero.getNameZoneid(), "del fail,gridIndex:"+gridIndex));
				HttpUtil.responseFail(ctx);
				return;
			}
			if(!online){
				EquipDao.getIns().delete(equipuid, CommonUtil.getZoneIdById(hid));
				AutoObjTableDao.getIns().update(hero.getBag(), hid, hero.getZoneid());
			}*/
			if(!online && update){
				AutoObjTableDao.getIns().update(hero.getBag(), hid, hero.getZoneid());
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e,"hid:"+hid+",id:"+id+",num:"+num+",type:"+type));
			HttpUtil.responseFail(ctx);
		}
	}
}
