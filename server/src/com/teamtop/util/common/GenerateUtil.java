package com.teamtop.util.common;

import java.util.List;
import java.util.Random;


public class GenerateUtil {

	/**
	 * 概率数组抽取
	 * 
	 * @param array
	 *            概率数组(和为1)
	 * @return 下标
	 */
	public static int getRandomArray(double[] array) {
		double random = Math.random();
		double rate = 0;
		for (int i = 0; i < array.length; i++) {
			rate += array[i];
			if (random <= rate) {
				return i;
			}
		}
		return 0;
	}
	
	/**
	 * 概率数组抽取
	 * 
	 * @param array
	 *            概率数组(和为1)
	 * @return 下标
	 */
	public static int getRandomArray(Double[] array) {
		double random = Math.random();
		double rate = 0;
		for (int i = 0; i < array.length; i++) {
			rate += array[i];
			if (random <= rate) {
				return i;
			}
		}
		return 0;
	}


	/**
	 * 生成n个small至big的不重复随机数字
	 * @param n 随机数字个数
	 * @param small 最小
	 * @param big 最大
	 * @return
	 */
	public static int[] generateDifNums(int n, int small, int big) {

		int length = big - small + 1;
		int[] seed = new int[length];
		for (int i = 0; i < length; i++) {
			seed[i] = small + i;
		}
		int[] ranArr = new int[n];
		Random ran = new Random();
		for (int i = 0; i < n; i++) {
			int j = ran.nextInt(length - i);
			ranArr[i] = seed[j];
			seed[j] = seed[length - 1 - i];

		}
		return ranArr;
	}

	/**
	 * 生成n个small至big的不重复随机数字
	 * @param n 随机数字个数
	 * @param small 最小
	 * @param big 最大
	 * @param existList 需要排除的集合
	 * @return
	 */
	public static int[] generateDifNums(int n, int small, int big, List<Integer> existList) {
		int length = big - small + 1;
		int[] seed = new int[length];
		int exitNum = 0;
		for (int i = 0; i < length; i++) {
			seed[i] = small + i;
		}
		int[] ranArr = new int[n-exitNum];
		Random ran = new Random();
		for (int i = 0; i < n; i++) {
			int j = ran.nextInt(length - i - exitNum);
			ranArr[i] = seed[j];
			seed[j] = seed[length - 1 - i - exitNum];

		}
		return ranArr;
	}
	
	/**
	 * 概率整数抽取
	 * 
	 * @param min
	 * @param max
	 * @return 范围整数
	 */
	public static int getRandomInteger(int min, int max) {
		return (int) ((max - min + 1) * Math.random() + min);
	}
	
	
	/**
	 * 根据array中值的比重进行抽取
	 * @param array
	 * @param count
	 * @return 返回对应下标数组
	 */
	public static Integer[] getRandomArray(Integer[] array,int count) {
		if(count>array.length||count<=0){
			return array;
		}
		Integer result[]=new Integer[count];
		for(int i=0;i<count;i++){
			int r=0;
			for (int j = 0; j < array.length; j++) {
				r=r+array[j];
			}
			int random =new Random().nextInt(r);
			int rate = 0;
			for (int k = 0; k < array.length; k++) {
				if(array[k]>0){
					rate += array[k];
					if (random <= rate) {
						array[k]=0;
						result[i]=k;
						break;
					}
				}
			}
			
		}
		
		return result;
	}

}
