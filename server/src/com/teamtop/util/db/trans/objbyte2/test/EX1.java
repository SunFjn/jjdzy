package com.teamtop.util.db.trans.objbyte2.test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.util.db.trans.objbyte2.ObjByteArr;

public class EX1 {
	public static void main(String[] args) {
		T2 t2 = new T2();
		t2.setId(1);
		t2.setName("abc");
		t2.setReward(new int[]{1,2,3,4});
		
		T2 t2_1 = new T2();
		t2_1.setId(2);
		t2_1.setName("fgh");
		t2_1.setReward(new int[]{4,5});
		
		
		T1 t1 = new T1();
		t1.setField1(100000);
		List<T2> list = new ArrayList<T2>();
		list.add(t2_1);
		list.add(t2);
		t1.setList(list);
		
		Map<Integer,Integer> map1 = new HashMap<Integer, Integer>();
		map1.put(1, 1);
		map1.put(2, 2);
		map1.put(3, 3);
		t1.setMap1(map1);
		
		
		Map<Integer,Map<Integer,String>> map2 = new HashMap<Integer,Map<Integer,String>>();
		Map<Integer,String> ms1 = new HashMap<Integer,String>();
		ms1.put(1, "kk1");
		ms1.put(2, "kk2");
		ms1.put(3, "kk3");
		Map<Integer,String> ms2 = new HashMap<Integer,String>();
		ms2.put(1, "mm1");
		ms2.put(2, "mm2");
		ms2.put(3, "mm3");
		
		map2.put(1, ms1);
		map2.put(2, ms2);
		
		t1.setMap2(map2);
		
		byte[] write = ObjByteArr.write(t1, T1.class);
		T1 read = ObjByteArr.read(write, T1.class);
		System.err.println(read);
	}
}
