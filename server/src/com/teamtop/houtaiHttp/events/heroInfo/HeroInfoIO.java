package com.teamtop.houtaiHttp.events.heroInfo;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.archive.model.ArchiveData;
import com.teamtop.system.archive.model.ArchiveModel;
import com.teamtop.system.bingfa.BingFa;
import com.teamtop.system.bingfa.BingFaModel;
import com.teamtop.system.country.CountryType;
import com.teamtop.system.destiny.model.DestinyBagData;
import com.teamtop.system.destiny.model.PersonalDestiny;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.excalibur.model.ExcaliburModel;
import com.teamtop.system.fashionClothes.FashionClothes;
import com.teamtop.system.generalSoul.GeneralSoulSetEnum;
import com.teamtop.system.generalSoul.model.GeneralSoul;
import com.teamtop.system.generalSoul.model.GeneralSoulModel;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.godbook.GodBookModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.monsterSpirit.MonsterSpiritEnum;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritEquip;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritInfo;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.monsterSpirit.model.StampData;
import com.teamtop.system.privilegeCard.PrivilegeCardConst;
import com.teamtop.system.privilegeCard.PrivilegeCardFunction;
import com.teamtop.system.specialTreasure.SpecialTreasure;
import com.teamtop.system.starPicture.model.StarPictureModel;
import com.teamtop.system.title.TitleInfo;
import com.teamtop.system.title.TitleModel;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.system.zhanjia.ZhanJia;
import com.teamtop.system.zhanjia.ZhanJiaModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_bao_214;
import excel.config.Config_baolv_214;
import excel.config.Config_book_213;
import excel.config.Config_book_215;
import excel.config.Config_booklv_213;
import excel.config.Config_booklv_215;
import excel.config.Config_bztzf_261;
import excel.config.Config_chenghao_702;
import excel.config.Config_clothes_212;
import excel.config.Config_clotheslv_212;
import excel.config.Config_general_006;
import excel.config.Config_genlv_006;
import excel.config.Config_genteam_006;
import excel.config.Config_hero_211;
import excel.config.Config_herolv_211;
import excel.config.Config_picture_005;
import excel.config.Config_shjxstar_266;
import excel.config.Config_shoulin_704;
import excel.config.Config_sword_216;
import excel.config.Config_swordlv_216;
import excel.config.Config_sz_739;
import excel.config.Config_xingtujh_706;
import excel.config.Config_yb_217;
import excel.config.Config_yblv_217;
import excel.config.Config_zhuangbei_204;
import excel.config.Config_zhuansheng_705;
import excel.struct.Struct_bao_214;
import excel.struct.Struct_baolv_214;
import excel.struct.Struct_book_213;
import excel.struct.Struct_book_215;
import excel.struct.Struct_booklv_213;
import excel.struct.Struct_booklv_215;
import excel.struct.Struct_bztzf_261;
import excel.struct.Struct_chenghao_702;
import excel.struct.Struct_clothes_212;
import excel.struct.Struct_clotheslv_212;
import excel.struct.Struct_general_006;
import excel.struct.Struct_genlv_006;
import excel.struct.Struct_genteam_006;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_herolv_211;
import excel.struct.Struct_picture_005;
import excel.struct.Struct_shjxstar_266;
import excel.struct.Struct_shoulin_704;
import excel.struct.Struct_sword_216;
import excel.struct.Struct_swordlv_216;
import excel.struct.Struct_sz_739;
import excel.struct.Struct_xingtujh_706;
import excel.struct.Struct_yb_217;
import excel.struct.Struct_yblv_217;
import excel.struct.Struct_zhuangbei_204;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class HeroInfoIO {

	private static HeroInfoIO ins;

	private HeroInfoIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HeroInfoIO getIns() {
		if (ins == null) {
			ins = new HeroInfoIO();
		}
		return ins;
	}

	/**
	 * 中央服通知子服获取玩家数据
	 * @param cond
	 * @param zoneid
	 * @param playerType
	 */
	public void getHeroInfo(String cond, int zoneid, int playerType, ChannelHandlerContext ctx) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(HeroInfoEnum.target, cond);
			crossData.putObject(HeroInfoEnum.zoneid, zoneid);
			crossData.putObject(HeroInfoEnum.playerType, playerType);
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			Channel channel = zoneidToChannel.get(zoneid);
			if(channel!=null) {
				NettyWrite.writeXData(channel, CrossConst.GET_HERO_INFO, crossData, new Callback() {
					
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						int result = crossData.getObject(HeroInfoEnum.result, Integer.class);
						if (result == 1) {
							String message = "获取玩家信息详情成功";
							JSONObject heroInfo = crossData.getObject(HeroInfoEnum.heroInfo, JSONObject.class);
							HoutaiResponseUtil.responseSucc(ctx, message, heroInfo);
						} else {
							String message = "获取玩家信息详情失败";
							JSONObject data = new JSONObject();
							data.put("cond", cond);
							data.put("player", playerType);
							data.put("zoneid", zoneid);
							HoutaiResponseUtil.responseFail(true, HoutaiConst.SendBack_Code_5006, message, data, ctx);
						}
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, HeroInfoIO.class, "HeroInfoIO getHeroInfo fail, cond="+cond+" ,zoneid="+zoneid+", playerTyp="+playerType);
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

	/** 子服接收到通知获取玩家信息 */
	public void getHeroInfoHandle(Channel channel, CrossData crossData) {
		String target="";
		int zoneid = 0;
		int playerType = 0;
		try {
			target = crossData.getObject(HeroInfoEnum.target, String.class);
			zoneid = crossData.getObject(HeroInfoEnum.zoneid, Integer.class);
			playerType = crossData.getObject(HeroInfoEnum.playerType, Integer.class);
			JSONObject heroInfo = getHeroInfoObject(zoneid, playerType, target);
			int result = 0;
			if (heroInfo != null) {
				result = 1;
				crossData.putObject(HeroInfoEnum.heroInfo, heroInfo);
			}
			crossData.putObject(HeroInfoEnum.result, result);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, HeroInfoIO.class, "HeroInfoIO getHeroInfo fail, target="+target+" ,zoneid="+zoneid+", playerTyp="+playerType);
		}
	}

	public JSONObject getHeroInfoObject(int zoneid, int playerType, String target) throws Exception {
		Long hid = 0L;
		// 1角色名，2角色id，3平台账号
		if (playerType == 1) {
			hid = HeroDao.getIns().getHidByName(target, zoneid);
		}else if(playerType == 2) {
			hid = Long.parseLong(target);
		}else if(playerType == 3) {
			hid = HeroDao.getIns().findHidByOpenid(target, zoneid);
		}
		if(hid==null) {
			return null;
		}
		M_HeroInfo heroInfo = new M_HeroInfo();
		if (HeroFunction.getIns().isOnline(hid)) {
			heroInfo.setOnline(1);
		} else {
			heroInfo.setOnline(0);
		}
		Hero hero = HeroCache.getHero(hid);
		if (hero == null) {
			// 不在缓存
			HeroCache.removeTempHero(hid);
			hero = HeroCache.getHero(hid,  HeroConst.FIND_TYPE_HOUTAI);
			if (hero == null) {
				return null;
			}
		}

		// 组成roleInfo数据
		JSONObject heroData = new JSONObject();
		heroData.put("hid", hero.getId());// 角色id
		heroData.put("accountid", hero.getOpenid());// 玩家账号id
		heroData.put("openid", hero.getOpenid());// 平台账号
		heroData.put("name", hero.getName());// 角色名称
		heroData.put("level", hero.getLevel());// 等级
		heroData.put("yuanbao", hero.getYuanbao());// 元宝
		heroData.put("yuanbaoBind", hero.getIndoorGlod());// 绑定元宝
		heroData.put("forbidStatus", hero.getForbidState());// 封号状态
		heroData.put("silentStatus", hero.getIllegalState());// 禁言状态
		heroData.put("adStatus", hero.getAdState());// 广告号状态
		heroData.put("coin", hero.getCoin());// 铜钱
		heroData.put("vipLv", hero.getVipLv());// vip等级
		heroData.put("fv", hero.getTotalStrength());// 战斗力
		int countryType = hero.getCountryType();
		CountryType cType = CountryType.getCountryTypeEnum(countryType);
		String country = cType == null ? "" : cType.getCountryName();
		heroData.put("country", country);// 国家
		heroData.put("chongZhi", hero.getChongZhiYuan());// 总充值
		heroData.put("regIp", hero.getCreateIp());// 注册ip
		heroData.put("regTime", hero.getCreateTime());// 注册时间
		heroData.put("lastLoginTime", hero.getLoginTime());// 最后登录时间
		heroData.put("lastLoginIp", hero.getLoginIp());// 最后登录ip
		heroData.put("online", hero.isOnline());// 是否在线 (true 在线)
		heroData.put("lastLoginTime", hero.getLoginTime());// 最后登录时间
		String reborn=Config_zhuansheng_705.getIns().get(hero.getRebornlv()).getLv();
		heroData.put("rebornlv",reborn);//转生等级
		int VipTime1=PrivilegeCardFunction.getIns().leftTime(hero, PrivilegeCardConst.GOLDEN_CARD);
		int VipTime2=PrivilegeCardFunction.getIns().leftTime(hero, PrivilegeCardConst.PLATINUM_CARD);
		heroData.put("VipTime1",VipTime1);//超值黄金卡剩余时间
		heroData.put("VipTime2",VipTime2);//豪华铂金卡剩余时间
		//转生装备
		StringBuilder rebornEquip=new StringBuilder();
		for (int i = GameConst.INDEX_REBORN_0; i <=GameConst.INDEX_REBORN_3; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 rebornEquip.append(zhuangbei_602.getN()).append(",");
			}
		}
		heroData.put("rebornEquip", rebornEquip.toString());//转生装备
		//称号
		StringBuilder titleModelStr=new StringBuilder();
		TitleModel titleModel=hero.getTitleModel();
		Map<Integer, TitleInfo> titleMap = titleModel.getHasMap();
		for (int titleId:titleMap.keySet()) {
			TitleInfo titleInfo=titleMap.get(titleId);
			if (titleInfo.getState()==2) {
			    Struct_chenghao_702 title = Config_chenghao_702.getIns().get(titleId);
			    String name=title.getName();
				int level = titleInfo.getLevel();
				titleModelStr.append(name).append(level+"等级").append(",");
			}
		}
		heroData.put("title", titleModelStr.toString());//称号
		//进阶系统 （图鉴）
		ArchiveData archiveData=hero.getArchiveData();
		StringBuilder archiveDataStr=new StringBuilder();
		for (ArchiveModel archiveModel:archiveData.getArchiveMap().values()) {
			int level = archiveModel.getLevelIndex();
			int star=archiveModel.getStarLevelIndex();
			Struct_picture_005 struct_picture_005 = Config_picture_005.getIns().get(archiveModel.getId());
			String name=struct_picture_005.getName();
			archiveDataStr.append(name).append(level+"等级").append(star+"星").append(",");
		}
		heroData.put("archiveData", archiveDataStr.toString());//图鉴
		//进阶系统 （宝物）
		TreasureData treasureData=hero.getTreasureData();
		StringBuilder treasureDataStr=new StringBuilder();
		Struct_baolv_214 baolv_214 = Config_baolv_214.getIns().get(treasureData.getLevel());
		String jie = "0阶0级";
		if (baolv_214 != null) {
			jie = baolv_214.getJie();
		}
		treasureDataStr.append(jie+",");
		for (TreasureModel treasureModel:treasureData.getTreasureMap().values()) {
			if (treasureModel.getStarLevel()>0) {
				Struct_bao_214 struct_bao_214 = Config_bao_214.getIns().get(treasureModel.getId());
				treasureDataStr.append(struct_bao_214.getName()).append(treasureModel.getStarLevel()+"星级").append(",");
			}
		}
		for (int i = GameConst.INDEX_90; i <=GameConst.INDEX_93; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 treasureDataStr.append(zhuangbei_602.getN()).append(",");
			}
		}
		heroData.put("treasureData", treasureDataStr.toString());//宝物
		//进阶系统 （兵法）
		BingFa bingFa=hero.getBingfa();
		StringBuilder bingfaStr=new StringBuilder();
		Struct_booklv_213 booklv_213 = Config_booklv_213.getIns().get(bingFa.getJieLv());
		jie = "0阶0级";
		if (booklv_213 != null) {
			jie = booklv_213.getJie();
		}
		bingfaStr.append(jie+",");
		for (BingFaModel bingFaModel:bingFa.getBingfas().values()) {
			if (bingFaModel.getStar()>0) {
				Struct_book_213 struct_book_213 = Config_book_213.getIns().get(bingFaModel.getIndex());
				bingfaStr.append(struct_book_213.getName()).append(bingFaModel.getStar()+"星级").append(",");
			}
		}
		for (int i = GameConst.INDEX_80; i <=GameConst.INDEX_83; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 bingfaStr.append(zhuangbei_602.getN()).append(",");
			}
		}
		heroData.put("bingFa", bingfaStr.toString());//兵法
		//进阶系统 （异宝）
		SpecialTreasure specialTreasure=hero.getSpecialTreasure();
		StringBuilder specialTreasureStr=new StringBuilder();
		Struct_yblv_217 yblv_217 = Config_yblv_217.getIns().get(specialTreasure.getJieLv());
		jie = "0阶0级";
		if (yblv_217 != null) {
			jie = yblv_217.getJie();
		}
		specialTreasureStr.append(jie+",");
		for (Integer key:specialTreasure.getTreasureStar().keySet()) {
			Integer star = specialTreasure.getTreasureStar().get(key);
			if (star!=null&&star>0) {
				Struct_yb_217 struct_yb_217 = Config_yb_217.getIns().get(key);
				specialTreasureStr.append(struct_yb_217.getName()).append(star+"星级").append(",");
			}
		}
		for (int i = GameConst.INDEX_70; i <=GameConst.INDEX_73; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 specialTreasureStr.append(zhuangbei_602.getN()).append(",");
			}
		}
		heroData.put("specialTreasure", specialTreasureStr.toString());//异宝
		//进阶系统 （神剑）
	    Excalibur excalibur = hero.getExcalibur();
		StringBuilder excaliburStr=new StringBuilder();
		Struct_swordlv_216 swordlv_216 = Config_swordlv_216.getIns().get(excalibur.getJieLv());
		jie = "0阶0级";
		if (swordlv_216 != null) {
			jie = swordlv_216.getJie();
		}
		excaliburStr.append(jie+",");
		for (ExcaliburModel excaliburModel:excalibur.getExcaliburMap().values()) {
			if (excaliburModel.getStarLevel()>0) {
				Struct_sword_216 struct_sword_216 = Config_sword_216.getIns().get(excaliburModel.getId());
				excaliburStr.append(struct_sword_216.getName()).append(excaliburModel.getStarLevel()+"星级").append(",");
			}
		}
		for (int i = GameConst.INDEX_60; i <=GameConst.INDEX_63; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 excaliburStr.append(zhuangbei_602.getN()).append(",");
			}
		}
		heroData.put("excalibur", excaliburStr.toString());//神剑
		//进阶系统 （战甲）
		ZhanJia zhanJia = hero.getZhanJia();
		StringBuilder zhanJiaStr=new StringBuilder();
		Struct_clotheslv_212 clotheslv_212 = Config_clotheslv_212.getIns().get(zhanJia.getJieLv());
		jie = "0阶0级";
		if (clotheslv_212 != null) {
			jie = clotheslv_212.getJie();
		}
		zhanJiaStr.append(jie+",");
		for (ZhanJiaModel key:zhanJia.getZhanjias().values()) {
			if (key.getStar()>0) {
				Struct_clothes_212 struct_clothes_212 = Config_clothes_212.getIns().get(key.getType());
				zhanJiaStr.append(struct_clothes_212.getName()).append(key.getStar()+"星级").append(",");
			}
		}
		for (int i = GameConst.INDEX_50; i <=GameConst.INDEX_53; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 zhanJiaStr.append(zhuangbei_602.getN()).append(",");
			}
		}
		heroData.put("zhanJia", zhanJiaStr.toString());//战甲	
		//进阶系统 （天书）
		GodBook godBook=hero.getGodbook();
		StringBuilder godBookStr=new StringBuilder();
		Struct_booklv_215 booklv_215 = Config_booklv_215.getIns().get(godBook.getLevel());
		jie = "0阶0级";
		if (booklv_215 != null) {
			jie = booklv_215.getJie();
		}
		godBookStr.append(jie+",");
		for (GodBookModel bookModel:godBook.getHasBooks().values()) {
			if (bookModel.getStar()>0) {
				Struct_book_215 struct_book_215 = Config_book_215.getIns().get(bookModel.getId());
				godBookStr.append(struct_book_215.getName()).append(bookModel.getStar()+"星级").append(",");
			}
		}
		for (int i = GameConst.INDEX_100; i <=GameConst.INDEX_103; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 godBookStr.append(zhuangbei_602.getN()).append(",");
			}
		}
		heroData.put("godBook", godBookStr.toString());//天书	
		//武将
		WuJiang wuJiang=hero.getWujiang();
		StringBuilder wujangStr=new StringBuilder();
		Struct_herolv_211 herolv_211 = Config_herolv_211.getIns().get(wuJiang.getJieLv());
		jie = "0阶0级";
		if (herolv_211 != null) {
			jie = herolv_211.getJie();
		}
		wujangStr.append(jie+",");
		for (WuJiangModel wuJiangModel:wuJiang.getWujiangs().values()) {
			if (wuJiangModel.getStar()>0) {
				Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
				wujangStr.append(struct_hero_211.getName()).append(wuJiangModel.getStar()+"星级").append(",");
			}
		}
		for (int i = GameConst.INDEX_40; i <=GameConst.INDEX_43; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 wujangStr.append(zhuangbei_602.getN()).append(",");
			}
		}
		heroData.put("wuJiang", wujangStr.toString());//武将	
		//时装
		FashionClothes fashionClothes=hero.getFashionClothes();
		StringBuilder fashionClothesStr=new StringBuilder();
		if (fashionClothes != null) {
			for (Struct_sz_739 struct_sz_739 : Config_sz_739.getIns().getMap().values()) {
				if (fashionClothes.getClothesStar().containsKey(struct_sz_739.getID())) {
					Integer star = fashionClothes.getClothesStar().get(struct_sz_739.getID());
					fashionClothesStr.append(struct_sz_739.getMingcheng()).append(star + "星级").append(",");
				}
			}
		}
		heroData.put("fashionClothes", fashionClothesStr.toString());//时装	
		// 兽灵
		MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
		StringBuilder monsterSpiritStr = new StringBuilder();
		if (monsterSpiritModel != null) {
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			Iterator<Integer> msIterator = monsterSpiritMap.keySet().iterator();
			for (; msIterator.hasNext();) {
				int type = msIterator.next();
				MonsterSpiritInfo spiritInfo = monsterSpiritMap.get(type);
				int msId = spiritInfo.getId();
				Struct_shoulin_704 shoulin_704 = Config_shoulin_704.getIns().get(msId);
				String name = MonsterSpiritEnum.getNamebyType(type);
				int lv = shoulin_704.getLv();
				int starLevel = spiritInfo.getStarLevel();
				int grade = spiritInfo.getGrade();
				StringBuilder msEquipStr = new StringBuilder();
				msEquipStr.append("兽灵装备：");
				Map<Integer, MonsterSpiritEquip> msEquipMap = spiritInfo.getMsEquipMap();
				Iterator<Integer> iterator = msEquipMap.keySet().iterator();
				for (; iterator.hasNext();) {
					int index = iterator.next();
					MonsterSpiritEquip spiritEquip = msEquipMap.get(index);
					StringBuilder equipName = new StringBuilder();
					if (spiritEquip != null) {
						int equipId = spiritEquip.getEquipId();
						Struct_zhuangbei_204 zhuangbei_204 = Config_zhuangbei_204.getIns().get(equipId);
						if (zhuangbei_204 != null) {
							equipName.append(zhuangbei_204.getN()).append(", 印记：（");
						}
						Map<Integer, StampData> stampMap = spiritEquip.getStampMap();
						for (int i = 1; i <= 4; i++) {
							StampData stampData = stampMap.get(i);
							int stampId = stampData.getStampStarId();
							int stampType = stampData.getStampType();
							Struct_shjxstar_266 shjxstar_266 = Config_shjxstar_266.getIns().get(stampId);
							equipName.append(shjxstar_266.getStar()).append("星")
									.append(MonsterSpiritEnum.getNamebyType(stampType)).append("印,");
						}
						if (equipName.length() > 0) {
							equipName.setLength(equipName.length() - 1);
							equipName.append("）");
						}
					}
					msEquipStr.append("装备名：").append(equipName).append("<br/>");
				}
				monsterSpiritStr.append("兽灵：").append(name).append(", 等级：").append(lv).append(", 星宿阶数：").append(grade)
						.append(", 星宿等级：").append(starLevel).append("<br/>").append(msEquipStr).append(". ");
			}
		}
		heroData.put("monsterSpirit", monsterSpiritStr.toString());
		// 将魂
		GeneralSoul generalSoul = hero.getGeneralSoul();
		StringBuilder generalSoulStr = new StringBuilder();
		if (generalSoul != null) {
			Iterator<Entry<Integer, GeneralSoulModel>> iterator = generalSoul.getGeneralSoulMap().entrySet().iterator();
			Entry<Integer, GeneralSoulModel> entry = null;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				Integer id = entry.getKey();
				GeneralSoulModel model = entry.getValue();
				Struct_general_006 gsoul = Config_general_006.getIns().get(id);
				int levelIndex = model.getLevelIndex();
				Struct_genlv_006 struct_genlv_006 = Config_genlv_006.getIns().get(levelIndex);
				generalSoulStr.append(gsoul.getName()).append(", 等级：").append(struct_genlv_006.getLv()).append(". ");
			}
			if (generalSoulStr.length() > 0) {
				generalSoulStr.append("<br/>");
			}
			Set<Integer> setList = generalSoul.getSetList();
			for (int setid : setList) {
				Struct_genteam_006 genteam = Config_genteam_006.getIns().get(setid);
				String name = GeneralSoulSetEnum.getNameByType(genteam.getType());
				generalSoulStr.append(name).append(", 等级：").append(genteam.getLv()).append(". ");
			}
		}
		heroData.put("generalSoul", generalSoulStr.toString());
		// 星图
		Map<Integer, StarPictureModel> starPictureMap = hero.getStarPictureMap();
		StringBuilder spStr = new StringBuilder();
		if (starPictureMap != null) {
			Iterator<StarPictureModel> iterator = starPictureMap.values().iterator();
			for (; iterator.hasNext();) {
				StarPictureModel model = iterator.next();
				int type = model.getId() / 100000;
				if (type == 0) {
					continue;
				}
				Struct_xingtujh_706 xingtujh_706 = Config_xingtujh_706.getIns().get(type);
				spStr.append(xingtujh_706.getType()).append(", 等级：").append(model.getLevel()).append(". ");
			}
		}
		heroData.put("starPicture", spStr.toString());
		//神装
		StringBuilder shenEquipStr=new StringBuilder();
		for (int i = GameConst.INDEX_SHEN_BING_0; i <=GameConst.INDEX_SHEN_BING_9; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				shenEquipStr.append(zhuangbei_602.getN()).append(",");
			}
		}
		heroData.put("shenEquip", shenEquipStr.toString());//神装
		//符文
		StringBuilder fuwenStr=new StringBuilder();
		PersonalDestiny personalDestiny=hero.getPersonalDestiny();
		if (personalDestiny!=null) {
			ConcurrentHashMap<Integer, DestinyBagData> concurrentHashMap = personalDestiny.getBodyData().get(0);
			for (DestinyBagData  destinyBagData:concurrentHashMap.values()) {
				if (destinyBagData.getDestinyId()!=0) {
					Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(destinyBagData.getDestinyId());
					int pz = struct_bztzf_261.getPz();
					String pzStr=new String();
					switch (pz) {
					case 2:
						pzStr="(绿)";
						break;
					case 3:
						pzStr="(蓝)";
						break;
					case 4:
						pzStr="(紫)";
						break;
					case 5:
						pzStr="(橙色)";
						break;
					case 6:
						pzStr="(红)";
						break;						
					default:
						pzStr="";
						break;
					}
					fuwenStr.append(struct_bztzf_261.getName()).append(pzStr).append(",等级：").append(destinyBagData.getLevel()).append(",星级：").append(destinyBagData.getStar()).append(". ");
				}else {
					fuwenStr.append("空").append(",等级：").append(0).append(",星级：").append(0).append(". ");
				}
			}
		}
		heroData.put("fuwenStr", fuwenStr.toString());//符文
		return heroData;
	}

}
