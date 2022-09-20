package com.teamtop.util.excel;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import com.teamtop.util.json.JsonUtils;

public class ExcelTest {
	public static void main(String[] args) throws JsonParseException, JsonMappingException, IOException {

	}
	public static void t1() throws JsonParseException, JsonMappingException, IOException{
		List<Integer> list = new ArrayList<Integer>();
		//73154_73156_73149_73144_73145_73167_73148_73152_73146_73136_73223_73190_73215_73216_73304_73349_73350_73358
		list.add(73154);
		list.add(73156);
		list.add(73149);
		list.add(73144);
		list.add(73145);
		list.add(73167);
		list.add(73148);
		list.add(73152);
		list.add(73146);
		list.add(73136);
		list.add(73223);
		list.add(73190);
		
		System.err.println(JsonUtils.toStr(list));
		
		Integer[] arr = new Integer[list.size()];
		list.toArray(arr);
		System.err.println(JsonUtils.toStr(arr));
		//[73154,73156,73149,73144,73145,73167,73148,73152,73146,73136,73223,73190]
		Integer[] jsonDecode = JsonUtils.toObj("[73154,73156,73149,73144,73145,73167,73148,73152,73146,73136,73223,73190]", Integer[].class);
		System.err.println(Arrays.toString(jsonDecode));
		
		Map<Integer,Integer> map = new HashMap<Integer,Integer>();
		map.put(2000, 5050);
		map.put(2001, 5050);
		map.put(2002, 5050);
		map.put(2003, 5050);
		
		String jsonEncode = JsonUtils.toStr(map);
		System.err.println(jsonEncode);
		//{"2002":5050,"2003":5050,"2000":5050,"2001":5050}
		//{"1":{"price":200000,"model":"camry","company":"toyota"},"2":{"price":190000,"model":"sprit","company":"honda"},"3":{"price":100000,"model":"sb","company":"dasauto"},"4":{"price":100000,"model":"xtairl","company":"nissian"}}
		HashMap<Integer, Integer> jsonTransForMap = JsonUtils.toMap(jsonEncode, Integer.class, Integer.class);
		System.err.println(jsonTransForMap);
		
/*		Map<Integer,Car> carMap = new HashMap<Integer,Car>();
		carMap.put(1, new Car(200000, "camry", "toyota"));
		carMap.put(2, new Car(190000, "sprit", "honda"));
		carMap.put(3, new Car(100000, "sb", "dasauto"));
		carMap.put(4, new Car(100000, "xtairl", "nissian"));
		String jsonEncode2 = JsonUtils.jsonEncode(carMap);
		System.err.println(jsonEncode2);
		HashMap<Integer, Car> jsonTransForMap2 = JsonUtils.jsonTransForMap(jsonEncode2, Integer.class, Car.class);
		System.err.println(jsonTransForMap2);
 */
		try {
			Class<?> forName = Class.forName("[Ljava.lang.Integer");
			Object newInstance = Array.newInstance(forName, 3);
			System.err.println(newInstance);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
