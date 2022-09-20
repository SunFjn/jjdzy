package com.teamtop.houtaiHttp.events.synDictionary;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.gameCommon.FieldNotes;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.shop.ShopEnum;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_daoju_204;
import excel.config.Config_guanxian_701;
import excel.config.Config_hero_211;
import excel.config.Config_huodong_009;
import excel.config.Config_list_218;
import excel.config.Config_up_231;
import excel.config.Config_xitong_001;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_guanxian_701;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_huodong_009;
import excel.struct.Struct_list_218;
import excel.struct.Struct_up_231;
import excel.struct.Struct_xitong_001;
import excel.struct.Struct_zhuangbei_204;
import io.netty.channel.ChannelHandlerContext;

public class SynDictionaryHttpEvent extends AbsHouTaiHttpEvent {

	private static SynDictionaryHttpEvent ins;

	private SynDictionaryHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SynDictionaryHttpEvent getIns() {
		if (ins == null) {
			ins = new SynDictionaryHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String name = paramMap.get("name");
			if (CommonUtil.isNull(name)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			JSONObject data = new JSONObject();
			data.put("name", name);
			List<JSONObject> list = new ArrayList<>();
			if ("equip".equals(name)) { // 装备字典
				List<Struct_zhuangbei_204> sortList = Config_zhuangbei_204.getIns().getSortList();
				int size = sortList.size();
				Struct_zhuangbei_204 equip = null;
				for(int i=0;i<size;i++) {
					equip = sortList.get(i);
					JSONObject equipObj = new JSONObject();
					equipObj.put("id", equip.getId());
					equipObj.put("name", equip.getN());
					list.add(equipObj);
				}
			} else if ("tool".equals(name)) { // 道具字典
				List<Struct_daoju_204> sortList = Config_daoju_204.getIns().getSortList();
				int size = sortList.size();
				Struct_daoju_204 tool = null;
				for (int i = 0; i < size; i++) {
					tool = sortList.get(i);
					JSONObject equipObj = new JSONObject();
					equipObj.put("id", tool.getId());
					equipObj.put("name", tool.getName());
					list.add(equipObj);
				}
			} else if ("currencyType".equals(name)) { // 货币类型
				Iterator<Entry<Integer, String>> iterator = GameConst.houtaiHuobiMap.entrySet().iterator();
				Entry<Integer, String> entry = null;
				for (; iterator.hasNext();) {
					entry = iterator.next();
					JSONObject obj = new JSONObject();
					obj.put("id", entry.getKey());
					obj.put("name", entry.getValue());
					list.add(obj);
				}
			} else if ("fightact".equals(name)) { // 战力变化操作类型
				getData(FightCalcConst.class, list);
			} else if ("toolact".equals(name)) { // 道具操作类型
				getData(SourceGoodConst.class, list);
			} else if ("shopId".equals(name)) {// 商店类型
				ShopEnum[] arr = ShopEnum.values();
				for (ShopEnum sType : arr) {
					JSONObject obj = new JSONObject();
					obj.put("id", sType.getType());
					obj.put("name", sType.getName());
					list.add(obj);
				}
			} else if ("restype".equals(name)) {// 物品流水消耗类型（大类型）
				Iterator<Entry<Integer, String>> iterator = GameConst.costMap.entrySet().iterator();
				Entry<Integer, String> entry = null;
				for (; iterator.hasNext();) {
					entry = iterator.next();
					JSONObject obj = new JSONObject();
					obj.put("id", entry.getKey());
					obj.put("name", entry.getValue());
					list.add(obj);
				}
			} else if ("goodsId".equals(name)) { // 商城商品字典
				List<Struct_list_218> sortList = Config_list_218.getIns().getSortList();
				int size = sortList.size();
				Struct_list_218 goods = null;
				for (int i = 0; i < size; i++) {
					goods = sortList.get(i);
					JSONObject obj = new JSONObject();
					obj.put("id", goods.getId());
					obj.put("name", goods.getName());
					list.add(obj);
				}
			} else if ("job".equals(name)) {
				List<Struct_hero_211> sortList = Config_hero_211.getIns().getSortList();
				int size = sortList.size();
				Struct_hero_211 hero_211 = null;
				for (int i = 0; i < size; i++) {
					hero_211 = sortList.get(i);
					int job = hero_211.getType();
					JSONObject obj = new JSONObject();
					obj.put("id", job);
					obj.put("name", hero_211.getName());
					list.add(obj);
				}
			} else if ("kuafuact".equals(name)) {
				CrossActEnum[] actEnums = CrossActEnum.values();
				for (CrossActEnum act : actEnums) {
					JSONObject obj = new JSONObject();
					obj.put("id", act.getSysId());
					obj.put("name", act.getName());
					list.add(obj);
				}
			} else if ("activityshield".equals(name)) {
				List<Struct_huodong_009> sortList = Config_huodong_009.getIns().getSortList();
				int size = sortList.size();
				Struct_huodong_009 huodong_009 = null;
				for (int i = 0; i < size; i++) {
					huodong_009 = sortList.get(i);
					JSONObject obj = new JSONObject();
					int id = huodong_009.getId();
					if (ActivityFunction.getIns().checkActOpen(id, huodong_009.getQs())) {
						obj.put("id", id);
						obj.put("name", huodong_009.getName());
						list.add(obj);
					}
				}
			} else if("officialTitle".equals(name)) {
				List<Struct_guanxian_701> sortList = Config_guanxian_701.getIns().getSortList();
				int size = sortList.size();
				for(int i=0;i<size;i++) {
					Struct_guanxian_701 guanxian_701 = sortList.get(i);
					int id = guanxian_701.getId();
					String gName = guanxian_701.getName();
					JSONObject obj = new JSONObject();
					obj.put("id", id);// 等级
					obj.put("name", gName);
					list.add(obj);
				}
			} else if ("promotion".equals(name)) {
				List<Struct_up_231> sortList = Config_up_231.getIns().getSortList();
				int size = sortList.size();
				for (int i = 0; i < size; i++) {
					Struct_up_231 up_231 = sortList.get(i);
					int id = up_231.getId();
					String gName = up_231.getPin();
					if ("无".equals(gName)) {
						gName = "十品";
					}
					JSONObject obj = new JSONObject();
					obj.put("id", id);// 等级
					obj.put("name", gName);
					list.add(obj);
				}
			} else if ("gameSystem".equals(name)) {
				List<Struct_xitong_001> sortList = Config_xitong_001.getIns().getSortList();
				int size = sortList.size();
				for (int i = 0; i < size; i++) {
					Struct_xitong_001 xitong_001 = sortList.get(i);
					int id = xitong_001.getID();
					String sysName = xitong_001.getName();
					JSONObject obj = new JSONObject();
					obj.put("id", id);// 系统id
					obj.put("name", sysName);
					list.add(obj);
				}
			}
			data.put("data", list);
			HoutaiResponseUtil.responseSucc(ctx, "", data);
		} catch (Exception e) {
			LogTool.error(e, SynDictionaryHttpEvent.class, "SynDictionaryHttpEvent fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

	private void getData(Class<?> clazz, List<JSONObject> list) {
		Field[] fields = clazz.getFields();
		for (Field field : fields) {
			FieldNotes notes = field.getAnnotation(FieldNotes.class);
			if (notes != null) {
				String note = notes.notes();
				int value = notes.value();
				JSONObject obj = new JSONObject();
				obj.put("id", value);
				obj.put("name", note);
				list.add(obj);
			}
		}
	}

}
