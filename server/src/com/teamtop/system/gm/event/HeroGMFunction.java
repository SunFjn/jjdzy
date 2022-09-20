package com.teamtop.system.gm.event;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.godbook.GodBookConst;
import com.teamtop.system.guanqia.GuanqiaFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.skill.SkillConst;
import com.teamtop.system.skill.SkillManager;
import com.teamtop.system.title.TitleActivateType;
import com.teamtop.system.title.TitleConst;
import com.teamtop.system.treasure.TreasureConst;
import com.teamtop.system.wujiang.WuJiangConst;
import com.teamtop.system.zhanjia.ZhanJiaConst;

import excel.config.Config_bao_214;
import excel.config.Config_baolv_214;
import excel.config.Config_book_213;
import excel.config.Config_book_215;
import excel.config.Config_booklv_213;
import excel.config.Config_booklv_215;
import excel.config.Config_chenghao_702;
import excel.config.Config_clothes_212;
import excel.config.Config_clotheslv_212;
import excel.config.Config_clotheslvskill_212;
import excel.config.Config_daoju_204;
import excel.config.Config_hero_211;
import excel.config.Config_herolv_211;
import excel.config.Config_herolvskill_211;
import excel.config.Config_piclv_005;
import excel.config.Config_picstar_005;
import excel.config.Config_qc_760;
import excel.config.Config_sword_216;
import excel.config.Config_swordlv_216;
import excel.config.Config_xtcs_004;
import excel.config.Config_yb_217;
import excel.config.Config_yblv_217;
import excel.struct.Struct_bao_214;
import excel.struct.Struct_baolv_214;
import excel.struct.Struct_book_213;
import excel.struct.Struct_book_215;
import excel.struct.Struct_booklv_213;
import excel.struct.Struct_booklv_215;
import excel.struct.Struct_chenghao_702;
import excel.struct.Struct_clothes_212;
import excel.struct.Struct_clotheslv_212;
import excel.struct.Struct_clotheslvskill_212;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_herolv_211;
import excel.struct.Struct_herolvskill_211;
import excel.struct.Struct_piclv_005;
import excel.struct.Struct_picstar_005;
import excel.struct.Struct_qc_760;
import excel.struct.Struct_sword_216;
import excel.struct.Struct_swordlv_216;
import excel.struct.Struct_xtcs_004;
import excel.struct.Struct_yb_217;
import excel.struct.Struct_yblv_217;

public class HeroGMFunction {

	/**
	 * 获得所有系统用的道具
	 */
	public static void addSuperTool( Hero hero){
		if( hero.getRealLevel()<100){
			HeroFunction.getIns().addHeroLevel(hero, 100);
			SkillManager.getIns().useSkill(hero, SkillConst.skiil_site_4, 1803);
			hero.setRebornlv( 1001);
			HeroFunction.getIns().addHeroRebornLv(hero, hero.getRebornlv());
		}
		
		int numGuangQia = 100;
		GuanqiaFunction.getIns().GMGuanqia(hero, 14, new String[] { String.valueOf(numGuangQia) });
		
		//获取一套满级升阶消耗的道具
		List<int[]> toolList = new ArrayList<>();//全套
		
		int wuJiangShuXingDan = 0;//武将属性丹
		int wuJiangZiZhiDan = 0;//武将资质丹
		Iterator<Struct_hero_211> iterHero211 = Config_hero_211.getIns().getSortList().iterator();
		while( iterHero211.hasNext()){
			Struct_hero_211 temp = iterHero211.next();
			wuJiangShuXingDan = wuJiangShuXingDan + temp.getMax1()*WuJiangConst.MAX_STAR;
			wuJiangZiZhiDan = wuJiangZiZhiDan + temp.getMax2();
			if( temp.getActivation().length==0)
				continue;
			int[] jiHuo = temp.getActivation()[0];
			toolList.add( new int[]{jiHuo[0],jiHuo[1],jiHuo[2]*WuJiangConst.MAX_STAR});//战甲升星
		}
		int wuJiangPeiYangDan = 0;//武将培养丹
		Iterator<Struct_herolv_211> iterWuJianPeiYan = Config_herolv_211.getIns().getSortList().iterator();
		while( iterWuJianPeiYan.hasNext()){
			Struct_herolv_211 temp = iterWuJianPeiYan.next();
			wuJiangPeiYangDan = wuJiangPeiYangDan + temp.getExp();
		}
		wuJiangPeiYangDan = wuJiangPeiYangDan/WuJiangConst.UP_JIE_EXP;
		int wuJiangJiNengShu = 0;//武将技能书
		Iterator<Struct_herolvskill_211> iterWuJianJiNengShu = Config_herolvskill_211.getIns().getSortList().iterator();
		while( iterWuJianJiNengShu.hasNext()){
			Struct_herolvskill_211 temp = iterWuJianJiNengShu.next();
			if( temp.getConsume()==null)
				continue;
			int[] jiHuo = temp.getConsume()[0];
			wuJiangJiNengShu = wuJiangJiNengShu + jiHuo[2];
		}
		
		int zhanJiaShuXingDan = 0;//战甲属性丹
		int zhanJiaZiZhiDan = 0;//战甲资质丹
		Iterator<Struct_clothes_212> iterZhanJia212 = Config_clothes_212.getIns().getSortList().iterator();
		while(iterZhanJia212.hasNext()){
			Struct_clothes_212 temp = iterZhanJia212.next();
			zhanJiaShuXingDan = zhanJiaShuXingDan + temp.getMax1()*ZhanJiaConst.MAX_STAR;
			zhanJiaZiZhiDan = zhanJiaZiZhiDan + temp.getMax2()*ZhanJiaConst.MAX_STAR;
			if( temp.getItem()==null)
				continue;
			int[] jiHuo = temp.getItem()[0];
			toolList.add( new int[]{jiHuo[0],jiHuo[1],jiHuo[2]*ZhanJiaConst.MAX_STAR});//战甲升星
		}
		int zhanJiaPeiYangDan = 0;//战甲培养丹
		Iterator<Struct_clotheslv_212> iterZhanJiaPeiYan = Config_clotheslv_212.getIns().getSortList().iterator();
		while( iterZhanJiaPeiYan.hasNext()){
			Struct_clotheslv_212 temp = iterZhanJiaPeiYan.next();
			zhanJiaPeiYangDan = zhanJiaPeiYangDan + temp.getExp();
		}
		zhanJiaPeiYangDan = zhanJiaPeiYangDan/ZhanJiaConst.UP_JIE_EXP;
		int zhanJiaJiNengShu = 0;//战甲技能书
		Iterator<Struct_clotheslvskill_212> iterZhanJiaJiNengShu = Config_clotheslvskill_212.getIns().getSortList().iterator();
		while( iterZhanJiaJiNengShu.hasNext()){
			Struct_clotheslvskill_212 temp = iterZhanJiaJiNengShu.next();
			if( temp.getConsume()==null)
				continue;
			int[] jiHuo = temp.getConsume()[0];
			zhanJiaJiNengShu = zhanJiaJiNengShu + jiHuo[2];
		}
		
		int shenJianShuXingDan = 0;//神剑属性丹
		Iterator<Struct_sword_216> iterShenJian = Config_sword_216.getIns().getSortList().iterator();
		while( iterShenJian.hasNext()){
			Struct_sword_216 temp = iterShenJian.next();
			int maxDan = temp.getMax();
			int star = temp.getStar();
			shenJianShuXingDan = shenJianShuXingDan + maxDan*star;
			if( temp.getItem()==null)
				continue;
			int[] jiHuo = temp.getItem()[0];
			toolList.add( new int[]{jiHuo[0],jiHuo[1],jiHuo[2]*star});//神剑升星
		}
		int shenJianPeiYangDan = 0;//神剑培养丹
		Iterator<Struct_swordlv_216> iterShenJianPeiYan = Config_swordlv_216.getIns().getSortList().iterator();
		while( iterShenJianPeiYan.hasNext()){
			Struct_swordlv_216 temp = iterShenJianPeiYan.next();
			shenJianPeiYangDan = shenJianPeiYangDan + temp.getExp();
		}
		shenJianPeiYangDan = shenJianPeiYangDan/ZhanJiaConst.UP_JIE_EXP;
		
		int yiBaoShuXingDan = 0;//异宝属性丹
		Iterator<Struct_yb_217> iterYiBao = Config_yb_217.getIns().getSortList().iterator();
		while( iterYiBao.hasNext()){
			Struct_yb_217 temp = iterYiBao.next();
			int maxDan = temp.getMax();
			int star = temp.getStar();
			yiBaoShuXingDan = yiBaoShuXingDan + maxDan*star;
			if( temp.getItem()==null)
				continue;
			int[] jiHuo = temp.getItem()[0];
			toolList.add( new int[]{jiHuo[0],jiHuo[1],jiHuo[2]*star});//异宝升星
		}
		int yiBaoPeiYangDan = 0;//异宝培养丹
		Iterator<Struct_yblv_217> iterYiBaoPeiYan = Config_yblv_217.getIns().getSortList().iterator();
		while( iterYiBaoPeiYan.hasNext()){
			Struct_yblv_217 temp = iterYiBaoPeiYan.next();
			yiBaoPeiYangDan = yiBaoPeiYangDan + temp.getExp();
		}
		yiBaoPeiYangDan = yiBaoPeiYangDan/ZhanJiaConst.UP_JIE_EXP;
		
		int binFaShuXingDan = 0;//兵法属性丹
		Iterator<Struct_book_213> iterBinFa = Config_book_213.getIns().getSortList().iterator();
		while( iterBinFa.hasNext()){
			Struct_book_213 temp = iterBinFa.next();
			int maxDan = temp.getMax();
			int star = temp.getStar();
			binFaShuXingDan = binFaShuXingDan + maxDan*star;
			if( temp.getItem()==null)
				continue;
			int[] jiHuo = temp.getItem()[0];
			toolList.add( new int[]{jiHuo[0],jiHuo[1],jiHuo[2]*star});//兵法升星
		}
		int bingFaPeiYangDan = 0;//兵法培养丹
		Iterator<Struct_booklv_213> iterBingFaPeiYan = Config_booklv_213.getIns().getSortList().iterator();
		while( iterBingFaPeiYan.hasNext()){
			Struct_booklv_213 temp = iterBingFaPeiYan.next();
			bingFaPeiYangDan = bingFaPeiYangDan + temp.getExp();
		}
		bingFaPeiYangDan = bingFaPeiYangDan/ZhanJiaConst.UP_JIE_EXP;

		//图鉴升星
		Iterator<Struct_picstar_005> iterTuJianStar = Config_picstar_005.getIns().getSortList().iterator();
		while( iterTuJianStar.hasNext()){
			Struct_picstar_005 temp = iterTuJianStar.next();
			if( temp.getConsume()==null)
				continue;
			int[] jiHuo = temp.getConsume()[0];
			if( temp.getLv()==1)
				toolList.add( new int[]{jiHuo[0],jiHuo[1],jiHuo[2]+1});
			if( temp.getLv()!=1)
				toolList.add( new int[]{jiHuo[0],jiHuo[1],jiHuo[2]});
		}
		int tuJianPeiYanDan = 0;//图鉴培养丹
		int tuJianPeiYanDanID = 0;
		Iterator<Struct_piclv_005> iterTuJianPeiYan = Config_piclv_005.getIns().getSortList().iterator();
		while( iterTuJianPeiYan.hasNext()){
			Struct_piclv_005 temp = iterTuJianPeiYan.next();
			if( temp.getConsume()==null)
				continue;
			int[] jiHuo = temp.getConsume()[0];
			tuJianPeiYanDanID = jiHuo[1];
			tuJianPeiYanDan = tuJianPeiYanDan + jiHuo[2];
		}
		toolList.add( new int[]{GameConst.TOOL,tuJianPeiYanDanID,tuJianPeiYanDan});

		int baoWuShuXingDan = 0;//宝物属性丹
		Iterator<Struct_bao_214> iterBaoWu = Config_bao_214.getIns().getSortList().iterator();
		while( iterBaoWu.hasNext()){
			Struct_bao_214 temp = iterBaoWu.next();
			int maxDan = temp.getMax();
			int star = temp.getStar();
			baoWuShuXingDan = baoWuShuXingDan + maxDan*star;
			if( temp.getItem()==null)
				continue;
			int[] jiHuo = temp.getItem()[0];
			toolList.add( new int[]{jiHuo[0],jiHuo[1],jiHuo[2]*star});//宝物升星
		}
		int baoWuPeiYangDan = 0;//宝物培养丹
		Iterator<Struct_baolv_214> iterBaoWuPeiYan = Config_baolv_214.getIns().getSortList().iterator();
		while( iterBaoWuPeiYan.hasNext()){
			Struct_baolv_214 temp = iterBaoWuPeiYan.next();
			baoWuPeiYangDan = baoWuPeiYangDan + temp.getExp();
		}
		baoWuPeiYangDan = baoWuPeiYangDan/TreasureConst.One_Exp;

		int tianShuShuXingDan = 0;//天书属性丹
		Iterator<Struct_book_215> iterTianShu = Config_book_215.getIns().getSortList().iterator();
		while( iterTianShu.hasNext()){
			Struct_book_215 temp = iterTianShu.next();
			int maxDan = temp.getMax();
			int star = temp.getStar();
			tianShuShuXingDan = tianShuShuXingDan + maxDan*star;
			if( temp.getItem()==null)
				continue;
			int[] jiHuo = temp.getItem()[0];
			toolList.add( new int[]{jiHuo[0],jiHuo[1],jiHuo[2]*star});//天书升星
		}
		int tianShuPeiYangDan = 0;//天书培养丹
		Iterator<Struct_booklv_215> iterTianShuPeiYan = Config_booklv_215.getIns().getSortList().iterator();
		while( iterTianShuPeiYan.hasNext()){
			Struct_booklv_215 temp = iterTianShuPeiYan.next();
			tianShuPeiYangDan = tianShuPeiYangDan + temp.getExp();
		}
		tianShuPeiYangDan = tianShuPeiYangDan/GodBookConst.BOOK_ADDEXP;
		
		Object[][] needNum = new Object[][]{
//			{"武将·",WuJiangConst.MAX_STAR}//ok
			{"武将培养丹",wuJiangPeiYangDan}//ok
			,{"武将技能书",wuJiangJiNengShu}//en
			,{"武将属性丹",wuJiangShuXingDan}
			,{"武将资质丹",wuJiangZiZhiDan}
			,{"将印碎片",2000*10}//en
			,{"神装碎片",15555}//en
			,{"战甲培养丹",zhanJiaPeiYangDan}
			,{"战甲技能书",zhanJiaJiNengShu}//en
			,{"战甲属性丹",zhanJiaShuXingDan}
			,{"战甲资质丹",zhanJiaZiZhiDan}
			,{"战甲残篇",4444}//en
			,{"神剑属性丹",shenJianShuXingDan}
			,{"神剑培养丹",shenJianPeiYangDan}
			,{"异宝属性丹",yiBaoShuXingDan}
			,{"异宝培养丹",yiBaoPeiYangDan}
			,{"兵法属性丹",binFaShuXingDan}
			,{"兵法培养丹",bingFaPeiYangDan}
			,{"兵法残篇",3333}
//			,{"图鉴培养丹",58759*4}//ok
			,{"青龙之魂",6666},{"白虎之魂",6666},{"朱雀之魂",6666},{"玄武之魂",6666}//en
			,{"诛仙神雷",4444},{"戮神巽风",4444},{"屠魔业火",4444}
			,{"宝物属性丹",baoWuShuXingDan}
			,{"宝物培养丹",baoWuPeiYangDan}
			,{"天书属性丹",tianShuShuXingDan}
			,{"天书培养丹",tianShuPeiYangDan}//en
			,{"宝石",10}
			,{"升星石",15555*10}//ok
			,{"高级铸魂石",2901*10}//ok
			,{"两仪阵眼",100}//阵眼
			,{"九宫阵眼",100}//阵眼
			,{"天门阵眼",100}//阵眼
			,{"太极阵心",100}//阵眼
			,{"阵纹石",100000}//阵眼
			};
		List<Struct_daoju_204> sortList = Config_daoju_204.getIns().getSortList();
		for( Struct_daoju_204 excel:sortList){
			String name = excel.getName();
			int sizeOld = toolList.size();
			//上面的数组
			for( int i=0; i<needNum.length; i++){
				String nameTemp = (String) needNum[i][0];
				int numTemp = (int) needNum[i][1];
				Pattern friPattern = Pattern.compile(nameTemp);
				Matcher a = friPattern.matcher(name);
				if(a.find()){
					toolList.add( new int[]{ GameConst.TOOL, excel.getId(), numTemp});
					break;
				}
			}
			//加入原始就跳过本次循环
			if(sizeOld != toolList.size())
				continue;

			//称号
			Struct_xtcs_004 struct_changshu_101 = Config_xtcs_004.getIns().get(TitleConst.MIX_LEVEL_INDEX);
			int maxLevel = struct_changshu_101.getNum();
			List<Struct_chenghao_702> sortListTitle = Config_chenghao_702.getIns().getSortList();
			for( Struct_chenghao_702 excelTitle:sortListTitle){
				int[][] condtion = excelTitle.getCondtion();
				int[][] email = excelTitle.getEmail();
				if (condtion[0][0] != TitleActivateType.TOOL_ACT.getActivateType()&&email==null) {
					continue;
				}
				Pattern friPattern = Pattern.compile(excelTitle.getName());
				Matcher a = friPattern.matcher(name);
				if(a.find()){
					toolList.add(new int[] { GameConst.TOOL, excel.getId(), maxLevel });
					break;
				}
			}
			
			// 奇策
			for (Struct_qc_760 qc_760 : Config_qc_760.getIns().getSortList()) {
				int[][] dj = qc_760.getSxxh();
				Pattern friPattern = Pattern.compile(qc_760.getName());
				Matcher a = friPattern.matcher(name);
				if (a.find()) {
					toolList.add(new int[] { dj[0][0], dj[0][1], dj[0][2] * qc_760.getSx() });
					break;
				}
			}
		}
		// 不读表
		toolList.add(new int[] { 1, 410408, 100000 });
		toolList.add(new int[] { 1, 410409, 100000 });
		toolList.add(new int[] { 1, 411012, 100000 });
		toolList.add(new int[] { 1, 410011, 10000 });
		toolList.add(new int[] { 1, 410058, 500000 });
		toolList.add(new int[] { 1, 410059, 90000 });
		toolList.add(new int[] { 1, 410060, 90000 });
		toolList.add(new int[] { 1, 410061, 90000 });
		toolList.add(new int[] { 1, 410062, 90000 });
		toolList.add(new int[] { 1, 400920, 10 });
		toolList.add(new int[] { 1, 400921, 10 });
		toolList.add(new int[] { 1, 400922, 10 });
		toolList.add(new int[] { 1, 400923, 10 });
		toolList.add(new int[] { 1, 400924, 10 });
		toolList.add(new int[] { 1, 400925, 10 });
		toolList.add(new int[] { 1, 400926, 10 });
		toolList.add(new int[] { 1, 400927, 10 });
		toolList.add(new int[] { 1, 400911, 100 });
		toolList.add(new int[] { 1, 410049, 10000 });
		toolList.add(new int[] { 1, 410050, 10000 });
		toolList.add(new int[] { 1, 410053, 10000 });
		toolList.add(new int[] { 1, 442001, 50 });
		toolList.add(new int[] { 1, 442002, 50 });
		toolList.add(new int[] { 1, 442003, 50 });
		toolList.add(new int[] { 1, 410055, 10000 });
		toolList.add(new int[] { 1, 410056, 10000 });
		toolList.add(new int[] { 1, 410057, 10000 });
		toolList.add(new int[] { 1, 410065, 10000 });
		toolList.add(new int[] { 1, 400888, 300 });
		toolList.add(new int[] { 1, 400889, 300 });
		toolList.add(new int[] { 1, 400890, 300 });
		toolList.add(new int[] { 1, 400891, 300 });
		toolList.add(new int[] { 1, 400892, 300 });
		toolList.add(new int[] { 1, 400897, 100 });
		toolList.add(new int[] { 1, 444001, 100000 });
		toolList.add(new int[] { 1, 444002, 100000 });
		toolList.add(new int[] { 1, 444003, 100000 });
		toolList.add(new int[] { 1, 444004, 100000 });
		toolList.add(new int[] { 1, 444005, 100000 });
		toolList.add(new int[] { 1, 444006, 100000 });
		toolList.add(new int[] { 1, 444007, 100000 });
		toolList.add(new int[] { 1, 444008, 100000 });
		toolList.add(new int[] { 1, 410092, 3000000 });
		toolList.add(new int[] { 1, 471001, 20 });
		toolList.add(new int[] { 1, 471002, 20 });
		toolList.add(new int[] { 1, 471003, 20 });
		toolList.add(new int[] { 1, 471004, 20 });
		toolList.add(new int[] { 1, 471005, 20 });
		toolList.add(new int[] { 1, 471006, 20 });
		toolList.add(new int[] { 1, 471007, 20 });
		toolList.add(new int[] { 1, 471008, 20 });
		toolList.add(new int[] { 1, 471009, 20 });
		toolList.add(new int[] { 1, 471010, 20 });
		toolList.add(new int[] { 1, 443001, 20 });
		toolList.add(new int[] { 1, 443002, 20 });
		toolList.add(new int[] { 1, 443003, 20 });
		toolList.add(new int[] { 1, 443004, 20 });
		toolList.add(new int[] { 1, 443005, 20 });
		toolList.add(new int[] { 1, 443006, 20 });
		toolList.add(new int[] { 1, 443007, 20 });
		toolList.add(new int[] { 1, 443008, 20 });
		toolList.add(new int[] { 1, 443009, 20 });
		toolList.add(new int[] { 1, 443010, 20 });
		toolList.add(new int[] { 1, 443011, 20 });
		toolList.add(new int[] { 1, 443012, 20 });
		toolList.add(new int[] { 1, 410087, 10000 });
		toolList.add(new int[] { 1, 410088, 10000 });
		toolList.add(new int[] { 1, 410089, 10000 });
		toolList.add(new int[] { 1, 411010, 100000 });
		toolList.add(new int[] { 1, 411009, 10000 });
		toolList.add(new int[] { 1, 410009, 10000 });
		toolList.add(new int[] { 1, 410010, 10000 });
		toolList.add(new int[] { 1, 410011, 10000 });

		int[][] addArray = new int[toolList.size()][];
		toolList.toArray( addArray);
		UseAddUtil.add(hero, addArray, SourceGoodConst.USE_GM, UseAddUtil.getDefaultMail(), false);
		
		int[][] huoBiArray = new int[][]{ {GameConst.ZHANGONG, 0, 700000}//战功/功勋
			,{GameConst.STARSOUL, 0, 2002222222}//星魂
			};
		UseAddUtil.add(hero, huoBiArray, SourceGoodConst.USE_GM, UseAddUtil.getDefaultMail(), true);
	}
	
	public static void addSuperEquip(Hero hero){
		int[][] addArray = new int[][]{{GameConst.EQUIP, 911470, 1},{GameConst.EQUIP, 911471, 1},{GameConst.EQUIP, 911472, 1}
		,{GameConst.EQUIP, 911473, 1},{GameConst.EQUIP, 911474, 1},{GameConst.EQUIP, 911475, 1},{GameConst.EQUIP, 911476, 1}
		,{GameConst.EQUIP, 911477, 1},{GameConst.EQUIP, 911478, 1},{GameConst.EQUIP, 911479, 1}};

		UseAddUtil.add(hero, addArray, SourceGoodConst.USE_GM, UseAddUtil.getDefaultMail(), true);
	}
}
