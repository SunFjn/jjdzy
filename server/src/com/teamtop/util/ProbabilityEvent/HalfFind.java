package com.teamtop.util.ProbabilityEvent;

import java.util.List;


public class HalfFind {

	
	public static void main(String[] args) {
		int[] d = new int[]{1, 3, 5, 6, 8, 9, 13, 18, 25, 50};
		int cv = 22;//23,24
		int pos = halfFindClose(d, cv);
		System.err.println(pos);
		
		
//		int[] recMinArr = new int[]{0,5,10,15,20,30,40,50,60,180,480};
//		for(int i=-10;i<1000;i++){
//			int pos = HalfFind.halfFindForBackstage(recMinArr, i);
//			System.err.println("i:"+i+",pos:"+pos);
//		}
		
	}
	
	public static int getValueByHalfFind(Integer[] d,int cv){
		int pos = halfFind(d, cv);
		return d[pos];
	}
	
	/**
	 * 二分算法找位置,需要排好序的数组,{1, 3, 5, 6, 8, 9, 13, 18, 20, 50} 位置从0开始,样式为[A,B)
	 */
	public static int halfFind(Integer[] arr, int cv) {
		if (arr == null || arr.length == 0) {
			return -1;
		}
		int find = -1;
		int s = 0;
		int e = arr.length - 1;
		int m = 0;
		int maxNum = arr[e];
		int minNum = arr[s];
		if (cv > maxNum || cv < minNum){
			//大于最大值或小于最小值
			return -1;
		}
		if (cv == maxNum){
			//控制最大
			return e;
		}
		if (cv == minNum) {
			//控制最小
			return s;
		}

		while (find == -1) {
			int r = (e - s + 1) / 2;
			if ((e - s + 1) % 2 == 0) {
				// 偶数
				m = s + r - 1;
			} else {
				// 奇数
				m = s + r;
			}
			int v = arr[m];
			if (cv == v) {
				// 找到
				find = m;
			} else if (cv > v) {
				if (e - s == 1) {
					// 找到
					find = s;
				} else {
					// 计算下一个m
					s = m;
				}
			} else {
				if (m == s) {
					// 找到
					find = m;
				} else {
					// 计算下一个m
					e = m;
				}
			}
		}
		return find;
	}
	/**
	 * 二分算法找位置,需要排好序的数组,{1, 3, 5, 6, 8, 9, 13, 18, 20, 50} 位置从0开始,样式为[A,B)
	 */
	public static int halfFind(int[] arr, int cv) {
		if (arr == null || arr.length == 0) {
			return -1;
		}
		int find = -1;
		int s = 0;
		int e = arr.length - 1;
		int m = 0;
		int maxNum = arr[e];
		int minNum = arr[s];
		if (cv > maxNum || cv < minNum){
			//大于最大值或小于最小值
			return -1;
		}
		if (cv == maxNum){
			//控制最大
			return e;
		}
		if (cv == minNum) {
			//控制最小
			return s;
		}
		
		while (find == -1) {
			int r = (e - s + 1) / 2;
			if ((e - s + 1) % 2 == 0) {
				// 偶数
				m = s + r - 1;
			} else {
				// 奇数
				m = s + r;
			}
			int v = arr[m];
			if (cv == v) {
				// 找到
				find = m;
			} else if (cv > v) {
				if (e - s == 1) {
					// 找到
					find = s;
				} else {
					// 计算下一个m
					s = m;
				}
			} else {
				if (m == s) {
					// 找到
					find = m;
				} else {
					// 计算下一个m
					e = m;
				}
			}
		}
		return find;
	}
	/**
	 * 二分算法找位置,需要排好序的数组,{1, 3, 5, 6, 8, 9, 13, 18, 20, 50} 位置从0开始,样式为[A,B)
	 * @param arr :排好序的数组
	 * @param cv 用于比较的数
	 * @return -1错误, -2比较值小于最小值, -3比较值大于最大值 ,其他返回值正常
	 */
	public static int halfFind(List<Integer> arr, int cv) {
		if (arr == null || arr.size() == 0) {
			return -1;
		}
		int find = -1;
		int s = 0;
		int e = arr.size() - 1;
		int m = 0;
		int maxNum = arr.get(e);
		int minNum = arr.get(s);
		if (cv < minNum){
			//小于最小值
			return -2;
		}
		if (cv >= maxNum){
			//大于等于最大值
			return -3;
		}
//		if (cv == maxNum){
//			//控制最大
//			return e;
//		}
//		if (cv == minNum) {
//			//控制最小
//			return s;
//		}
		
		while (find == -1) {
			int r = (e - s + 1) / 2;
			if ((e - s + 1) % 2 == 0) {
				// 偶数
				m = s + r - 1;
			} else {
				// 奇数
				m = s + r;
			}
			int v = arr.get(m);
			if (cv == v) {
				// 找到
				find = m;
			} else if (cv > v) {
				if (e - s == 1) {
					// 找到
					find = s;
				} else {
					// 计算下一个m
					s = m;
				}
			} else {
				if (m == s) {
					// 找到
					find = m;
				} else {
					// 计算下一个m
					e = m;
				}
			}
		}
		return find;
	}
	
	/**
	 * 二分算法找位置,需要排好序的数组,{1, 3, 5, 6, 8, 9, 13, 18, 20, 50} 位置从0开始,样式为[A,B]
	 * >=最大值,返回数组最后位置-1,小于最小值,返回-1
	 */
	public static int handleHeartBeat(int[] arr, int cv) {
		if (arr == null || arr.length == 0) {
			return -1;
		}
		int find = -1;
		int s = 0;
		int e = arr.length - 1;
		int m = 0;
		int maxNum = arr[e];
		int minNum = arr[s];
		if (cv < minNum){
			//大于最大值或小于最小值
			return -1;
		}
		if (cv >= maxNum){
			//控制最大
			return e;
		}
		if (cv == minNum) {
			//控制最小
			return s;
		}
		
		while (find == -1) {
			int r = (e - s + 1) / 2;
			if ((e - s + 1) % 2 == 0) {
				// 偶数
				m = s + r - 1;
			} else {
				// 奇数
				m = s + r;
			}
			int v = arr[m];
			if (cv == v) {
				// 找到
				find = m;
			} else if (cv > v) {
				if (e - s == 1) {
					// 找到
					find = s;
				} else {
					// 计算下一个m
					s = m;
				}
			} else {
				if (m == s) {
					// 找到
					find = m;
				} else {
					// 计算下一个m
					e = m;
				}
			}
		}
		return find;
	}
	
	/**
	 * 二分算法找位置,需要排好序的数组,{1, 3, 5, 6, 8, 9, 13, 18, 20, 50} 位置从0开始,样式为[A,B)
	 * @param arr :排好序的数组
	 * @param cv 用于比较的数
	 * @return -1错误, -2比较值小于最小值, -3比较值大于最大值 ,其他返回值正常
	 */
	public static int halfFindForBackstage(int[] arr, int cv) {
		if (arr == null || arr.length == 0) {
			return -1;
		}
		int find = -1;
		int s = 0;
		int e = arr.length - 1;
		int m = 0;
		int maxNum = arr[e];
		int minNum = arr[s];
		if (cv < minNum){
			//小于最小值
			return -2;
		}
		if (cv > maxNum){
			//大于最大值
			return -3;
		}
		if (cv == maxNum){
			//控制最大
			return e;
		}
		if (cv == minNum) {
			//控制最小
			return s;
		}
		
		while (find == -1) {
			int r = (e - s + 1) / 2;
			if ((e - s + 1) % 2 == 0) {
				// 偶数
				m = s + r - 1;
			} else {
				// 奇数
				m = s + r;
			}
			int v = arr[m];
			if (cv == v) {
				// 找到
				find = m;
			} else if (cv > v) {
				if (e - s == 1) {
					// 找到
					find = s;
				} else {
					// 计算下一个m
					s = m;
				}
			} else {
				if (m == s) {
					// 找到
					find = m;
				} else {
					// 计算下一个m
					e = m;
				}
			}
		}
		return find;
	}
	
	/**
	 * 二分算法找位置,需要排好序的数组,{1, 3, 5, 6, 8, 9, 13, 18, 20, 50} 位置从0开始,样式为[A,B]
	 * @param arr :排好序的数组
	 * @param cv 用于比较的数
	 * @returns m表示小于最小值  s表示 最小值	e表示最大值		其他返回值正常
	 */
	public static int halfFindClose(int[] arr, int cv) {
		if (arr == null || arr.length == 0) {
			return -1;
		}
		int find = -1;
		int s = 0;
		int e = arr.length - 1;
		int m = 0;
		int maxNum = arr[e];
		int minNum = arr[s];
		if (cv < minNum){
			//大于最大值或小于最小值
			return m;
		}
		if (cv >= maxNum){
			//控制最大
			return e;
		}
		if (cv == minNum) {
			//控制最小
			return s;
		}
		
		while (find == -1) {
			int r = (e - s + 1) / 2;
			if ((e - s + 1) % 2 == 0) {
				// 偶数
				m = s + r - 1;
			} else {
				// 奇数
				m = s + r;
			}
			int v = arr[m];
			if (cv == v) {
				// 找到
				find = m;
			} else if (cv > v) {
				if (e - s == 1) {
					// 找到
					find = s;
				} else {
					// 计算下一个m
					s = m;
				}
			} else {
				if (m == s) {
					// 找到
					find = m;
				} else {
					// 计算下一个m
					e = m;
				}
			}
		}
		return find;
	}
}
