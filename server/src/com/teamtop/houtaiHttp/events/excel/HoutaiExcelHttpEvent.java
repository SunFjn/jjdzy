package com.teamtop.houtaiHttp.events.excel;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.FieldNotes;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.events.excel.model.ExcelAttribute;
import com.teamtop.houtaiHttp.events.excel.model.ExcelEconomy;
import com.teamtop.houtaiHttp.events.excel.model.ExcelEquip;
import com.teamtop.houtaiHttp.events.excel.model.ExcelStrength;
import com.teamtop.houtaiHttp.events.excel.model.ExcelSystem;
import com.teamtop.houtaiHttp.events.excel.model.ExcelTool;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.util.json.JsonUtils;
import com.teamtop.util.log.LogTool;

import excel.config.Config_daoju_204;
import excel.config.Config_jssx_002;
import excel.config.Config_xitong_001;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_jssx_002;
import excel.struct.Struct_xitong_001;
import excel.struct.Struct_zhuangbei_204;
import io.netty.channel.ChannelHandlerContext;

/**
 * 后台相关配置表更新传给后台系统
 * @author hepl
 *
 */
public class HoutaiExcelHttpEvent extends AbsHouTaiHttpEvent {
	private static HoutaiExcelHttpEvent ins = null;
	
	public static HoutaiExcelHttpEvent getIns(){
		if(ins == null){
			ins = new HoutaiExcelHttpEvent();
		}
		return ins;
	}
	
	private static Logger logger = LoggerFactory.getLogger(HoutaiExcelHttpEvent.class);

	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		try {
			String name = paramMap.get("name");
			if(name == null || "".equals(name)){
				HttpUtil.responseFail(ctx);
				return;
			}
			name = URLDecoder.decode(name, "utf-8");
			String json = null;
			if("tool".equals(name)){
				//道具表
				json = getExcelTool();
			}else if("equipment".equals(name)){
				//装备表
				json = getExcelEquip();
			}else if("attribute".equals(name)){
				//角色属性表
				json = getExcelAttribute();
			}else if("mall".equals(name)){
				//商城表
//				json = getExcelMall();
			}else if("money".equals(name)){
				//侠客行货币流水表
				json = getExcelMoney();
			}else if("store".equals(name)){
				//兑换商店表
//				json = getExcelStore();
			}else if("systemOperator".equals(name)){
				//系统开启表
				json = getExcelSystem();
			}else if("economy".equals(name)){
				//流水操作原因表
				json = getExcelEconomy();
			}else if("strength".equals(name)){
				//战力流水原因表
				json = getExcelStrength();
			}else if("dailyactivity".equals(name)){
				//日常活动状态配置表
//				json = getExcelDailyActivity();
			}else if("smallActConfig".equals(name)){
				//特殊活动表
//				json = getExcelActivity();
			}
			if(json == null){
				HttpUtil.responseFail(ctx);
				return;
			}
			HttpUtil.response(json, ctx);
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
	}
	
	/**
	 * 道具表的数据
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	private String getExcelTool() throws UnsupportedEncodingException{
		String json = null;
		List<Struct_daoju_204> list = Config_daoju_204.getIns().getSortList();
		List<ExcelTool> dataList = new ArrayList<ExcelTool>();
		for(int i=0; i<list.size(); i++){
			Struct_daoju_204 excel = list.get(i);
			ExcelTool data = new ExcelTool();
			data.setId(excel.getId()); //道具id
			data.setName(URLEncoder.encode(excel.getName(), "utf-8")); //道具名称
			data.setQuality(excel.getQuality()); //颜色
			dataList.add(data);
		}
		json = JsonUtils.toStr(dataList);
		return json;
	}
	
	/**
	 * 装备表的数据
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	private String getExcelEquip() throws UnsupportedEncodingException{
		String json = null;
		List<Struct_zhuangbei_204> list = Config_zhuangbei_204.getIns().getSortList();
		List<ExcelEquip> dataList = new ArrayList<ExcelEquip>();
		for(int i=0; i<list.size(); i++){
			Struct_zhuangbei_204 excel = list.get(i);
			ExcelEquip data = new ExcelEquip();
			data.setId(excel.getId()); //装备id
			data.setName(URLEncoder.encode(excel.getN(), "utf-8")); //装备名称
			data.setQuality(excel.getQ()); //装备品质
			dataList.add(data);
		}
		json = JsonUtils.toStr(dataList);
		return json;
	}
	
	/**
	 * 角色属性表的数据
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	private String getExcelAttribute() throws UnsupportedEncodingException{
		String json = null;
		List<Struct_jssx_002> list = Config_jssx_002.getIns().getSortList();
		List<ExcelAttribute> dataList = new ArrayList<ExcelAttribute>();
		for(int i=0; i<list.size(); i++){
			Struct_jssx_002 excel = list.get(i);
			ExcelAttribute data = new ExcelAttribute();
			data.setId(excel.getID()); //属性id
			data.setDesc(URLEncoder.encode(excel.getColor() + "", "utf-8")); // 属性颜色
			data.setType(excel.getType()); // 属性类型
			dataList.add(data);
		}
		json = JsonUtils.toStr(dataList);
		return json;
	}

	/**
	 * 商城表的数据
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	/*private String getExcelMall() throws UnsupportedEncodingException{
		String json = null;
		List<Struct_shopping_600> list = Config_shopping_600.getIns().getSortList();
		List<ExcelMall> dataList = new ArrayList<ExcelMall>();
		for(int i=0; i<list.size(); i++){
			Struct_shopping_600 excel = list.get(i);
			ExcelMall data = new ExcelMall();
			data.setId(excel.getLeixing()); //商城类型
			data.setName(URLEncoder.encode(excel.getMingcheng(), "utf-8")); //商店名称
			data.setGoodname(URLEncoder.encode(excel.getWupinming(), "utf-8")); //物品名称
			data.setGood(URLEncoder.encode(ExcelJsonUtils.toStr(excel.getChushoudaoju()), "utf-8")); //出售道具id
			data.setMoneytype(URLEncoder.encode(ExcelJsonUtils.toStr(excel.getDanjia()), "utf-8")); //货币价格
			dataList.add(data);
		}
		json = JsonUtils.toStr(dataList);
		return json;
	}*/
	
	/**
	 * 侠客行货币流水表的数据
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	private String getExcelMoney() throws UnsupportedEncodingException{
		String json = null;
	/*	List<Struct_houtai_313> list = Config_houtai_313.getIns().getSortList();
		List<ExcelMoneyFlow> dataList = new ArrayList<ExcelMoneyFlow>();
		for(int i=0; i<list.size(); i++){
			Struct_houtai_313 excel = list.get(i);
			ExcelMoneyFlow data = new ExcelMoneyFlow();
			data.setId(excel.getID()); //属性id
			data.setName(URLEncoder.encode(excel.getMC(), "utf-8")); //属性名称
			dataList.add(data);
		}
		json = JsonUtils.toStr(dataList);*/
		return json;
	}
	
	/**
	 * 兑换商店表的数据
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	/*private String getExcelStore() throws UnsupportedEncodingException{
		String json = null;
		List<Struct_duihuan_209> list = Config_duihuan_209.getIns().getSortList();
		List<ExcelStore> dataList = new ArrayList<ExcelStore>();
		for(int i=0; i<list.size(); i++){
			Struct_duihuan_209 excel = list.get(i);
			ExcelStore data = new ExcelStore();
			data.setId(excel.getLeixing()); //商店类型
			data.setName(URLEncoder.encode(excel.getShangpinbianhao(), "utf-8")); //商店名称
			data.setGood(URLEncoder.encode(ExcelJsonUtils.toStr(excel.getShangpin()), "utf-8")); //商品
			data.setMoneytype(excel.getSuoxu()[0][0]); //货币类型
			dataList.add(data);
		}
		json = JsonUtils.toStr(dataList);
		return json;
	}*/
	
	/**
	 * 系统开启表的数据
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	private String getExcelSystem() throws UnsupportedEncodingException{
		String json = null;
		List<Struct_xitong_001> list = Config_xitong_001.getIns().getSortList();
		List<ExcelSystem> dataList = new ArrayList<ExcelSystem>();
		for(int i=0; i<list.size(); i++){
			Struct_xitong_001 excel = list.get(i);
			ExcelSystem data = new ExcelSystem();
			data.setId(excel.getID()); //系统id
			//data.setDesc(URLEncoder.encode(excel.getName(), "utf-8")); //系统名称
			dataList.add(data);
		}
		json = JsonUtils.toStr(dataList);
		return json;
	}
	
	/**
	 * 流水操作原因表，来源SourceGoodConst
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	private String getExcelEconomy() throws UnsupportedEncodingException{
		String json = null;
		List<ExcelEconomy> dataList = new ArrayList<ExcelEconomy>();
		Class<SourceGoodConst> clazz = SourceGoodConst.class;
		Field[] fields = clazz.getFields();
		for(Field field : fields){
			FieldNotes notes = field.getAnnotation(FieldNotes.class);
			if(notes != null){
				String note = notes.notes();
				int value = notes.value();
				ExcelEconomy data = new ExcelEconomy();
				data.setId(value); //流水原因id
				data.setDesc(URLEncoder.encode(note, "utf-8")); //流水原因描述
				dataList.add(data);
			}
		}
		json = JsonUtils.toStr(dataList);
		return json;
	}
	
	/**
	 * 战力流水操作原因表，来源FightRecalcConst
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	private String getExcelStrength() throws UnsupportedEncodingException{
		String json = null;
		List<ExcelStrength> dataList = new ArrayList<ExcelStrength>();
		Class<FightCalcConst> clazz = FightCalcConst.class;
		Field[] fields = clazz.getFields();
		for(Field field : fields){
			FieldNotes notes = field.getAnnotation(FieldNotes.class);
			if(notes != null){
				String note = notes.notes();
				int value = notes.value();
				ExcelStrength data = new ExcelStrength();
				data.setId(value); //流水原因id
				data.setDesc(URLEncoder.encode(note, "utf-8")); //流水原因描述
				dataList.add(data);
			}
		}
		json = JsonUtils.toStr(dataList);
		return json;
	}
	
	/**
	 * 日常活动状态配置表的数据
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	/*private String getExcelDailyActivity() throws UnsupportedEncodingException{
		String json = null;
		List<Struct_dailyactivity_114> list = Config_dailyactivity_114.getIns().getSortList();
		List<ExcelDailyActivity> dataList = new ArrayList<ExcelDailyActivity>();
		for(int i=0; i<list.size(); i++){
			Struct_dailyactivity_114 excel = list.get(i);
			ExcelDailyActivity data = new ExcelDailyActivity();
			data.setId(URLEncoder.encode(excel.getId(), "utf-8")); //活动状态
			data.setSysid(excel.getSysid()); //系统id
			data.setName(URLEncoder.encode(excel.getName(), "utf-8")); //状态名称
			data.setDesc(URLEncoder.encode(excel.getDesc(), "utf-8")); //活动名称
			data.setKey1(URLEncoder.encode(excel.getKey1(), "utf-8"));
			data.setVal1(URLEncoder.encode(excel.getVal1(), "utf-8"));
			data.setKey2(URLEncoder.encode(excel.getKey2(), "utf-8"));
			data.setVal2(URLEncoder.encode(excel.getVal2(), "utf-8"));
			data.setKey3(URLEncoder.encode(excel.getKey3(), "utf-8"));
			data.setVal3(URLEncoder.encode(excel.getVal3(), "utf-8"));
			data.setKey4(URLEncoder.encode(excel.getKey4(), "utf-8"));
			data.setVal4(URLEncoder.encode(excel.getVal4(), "utf-8"));
			dataList.add(data);
		}
		json = JsonUtils.toStr(dataList);
		return json;
	}*/
	
	/**
	 * 特殊活动表的数据
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	/*private String getExcelActivity() throws UnsupportedEncodingException{
		String json = null;
		List<Struct_activity_114> list = Config_activity_114.getIns().getSortList();
		List<ExcelActivity> dataList = new ArrayList<ExcelActivity>();
		for(int i=0; i<list.size(); i++){
			Struct_activity_114 excel = list.get(i);
			ExcelActivity data = new ExcelActivity();
			data.setId(excel.getType()); //活动类型id
			data.setName(URLEncoder.encode(excel.getName(), "utf-8")); //活动名称
			dataList.add(data);
		}
		json = JsonUtils.toStr(dataList);
		return json;
	}*/
}
