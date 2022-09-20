package com.teamtop.util.ProbabilityEvent;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
/**
 * 随机类工具
 * @author KyleCheng
 *
 */
public class RandomUtil {

	/**
	 * 计算两个区间的随机数 [A,B]
	 * @param minNum 最小值
	 * @param maxNum 最大值
	 * @return 随机数
	 */
	public static int getRandomNumInAreas(int minNum, int maxNum) {
		Random r = new Random();
		return r.nextInt(maxNum - minNum + 1) + minNum;
	}
	
	/**
	 * 获得区间内的多个随机数，每个随机数不一样，刷新次数必须小于区间
	 * @param minNum 最小值
	 * @param maxNum 最大值
	 * @param refreshNum 刷新次数
	 * @return 多个随机数
	 */
	public static List<Integer> getMultiRandomNumInArea(int minNum, int maxNum, int refreshNum) {
		if(maxNum - minNum <= 0 || maxNum - minNum + 1 < refreshNum){
			return null;
		}
		List<Integer> resultList = new ArrayList<Integer>();
		Random r = new Random();
		int i = 0;
		int temp = 0;
		while(i < refreshNum){
			temp = r.nextInt(maxNum - minNum + 1) + minNum;
			if(!resultList.contains(temp)){
				resultList.add(temp);
				i++;
			}
		}
		return resultList;
	}
}
