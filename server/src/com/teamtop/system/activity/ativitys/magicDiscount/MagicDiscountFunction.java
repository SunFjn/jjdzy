package com.teamtop.system.activity.ativitys.magicDiscount;

import java.util.List;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.magicDiscount.model.MagicDiscount;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sbzk_281;
import excel.struct.Struct_sbzk_281;

/**
 * 神兵折扣
 * @author jjjjyyyyouxi
 */
public class MagicDiscountFunction {
	private static MagicDiscountFunction ins;

	private MagicDiscountFunction() {
	}

	public static MagicDiscountFunction getIns() {
		if (ins == null) {
			ins = new MagicDiscountFunction();
		}
		return ins;
	}
	
	/**
	 * 神兵折扣
	 * @param hero
	 * @param price 原价格
	 * @param addNum 打造次数
	 * @return
	 */
	public int[][] magicDiscount(Hero hero,int[][] price,int addNum) {
		try {
			if (hero == null) return price;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_MAGICDISCOUNT)) return price;
			MagicDiscount magicDiscount = (MagicDiscount) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_MAGICDISCOUNT);
			int count = magicDiscount.getCount();
			List<Struct_sbzk_281> list = Config_sbzk_281.getIns().getSortList();
			int disPprice = 0;//最终折扣价
			int tempCount = count;//临时已打造次数
			int tempAddNum = addNum;//当前临时要打造次数
			for(Struct_sbzk_281 struct_sbzk_281 : list) {
				int[] n = struct_sbzk_281.getTime()[0];
				int num1 = n[0];
				int num2 = n[1];
				if(num2 == 0) {
					num2 = Integer.MAX_VALUE;
				}
				if(tempCount+1>=num1 && tempCount<=num2) {
					int p = price[0][2];
					int off = struct_sbzk_281.getOff();
					if(tempCount+tempAddNum > num2) {
						int beforeNum = num2-tempCount;//上一折扣次数
						int afterNum = tempAddNum - beforeNum;//下一折扣次数
						double p2 = 1.0*p*beforeNum/addNum*off/100;
						int p3 = (int)Math.ceil(p2);
						disPprice += p3;
						
						tempAddNum = afterNum;
						tempCount += beforeNum;
					}else {
						double p2 = 1.0*p*tempAddNum/addNum*off/100;
						int p3 = (int)Math.ceil(p2);
						disPprice += p3;
						break;
					}
				}
			}
			if(disPprice > 0) {
				int[] arr = new int[] {price[0][0],price[0][1],disPprice};
				int[][] newPrice = new int[][] {arr}; 
				magicDiscount.setCount(count+addNum);
				return newPrice;
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "MagicDiscountFunction magicDiscount 神兵折扣  异常");
		}
		return price;
	}
	
	/**
	 * 增加打造次数
	 * @param hero
	 * @param addNum
	 */
	public int addNum(Hero hero,int addNum) {
		int count = 0;
		try {
			if (hero == null) return count;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_MAGICDISCOUNT)) return count;
			MagicDiscount magicDiscount = (MagicDiscount) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_MAGICDISCOUNT);
			count = magicDiscount.getCount() + addNum;
			magicDiscount.setCount(count);
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "MagicDiscountFunction addNum 神兵折扣增加打造次数   异常");
		}
		return count;
	}
	
	/**
	 * 登录推送图标显示折扣
	 * @param hero
	 */
//	public void loginRed(Hero hero) {
//		try {
//			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_MAGICDISCOUNT, 2, RedPointConst.HAS_RED);
//		}catch (Exception e) {
//			LogTool.error(e, this, hero.getId(), hero.getName(), "MagicDiscountFunction loginRed 登录推送图标折扣  异常");
//		}
//	}
	
	
}
