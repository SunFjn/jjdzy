package com.teamtop.system.activity.ativitys.pixiutreasure;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import excel.config.Config_pxsb_778;
import excel.config.Config_pxsbdj_778;
import excel.struct.Struct_pxsb_778;
import excel.struct.Struct_pxsbdj_778;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PiXiuTreasureCache extends AbsServerEvent {

    private static Map<Integer, Map<Integer, List<Struct_pxsb_778>>> awardConfigMap = new HashMap<>();

    private static Map<Integer, List<Struct_pxsbdj_778>> bigAwardConfigMap = new HashMap<>();

    public static Map<Integer, Map<Integer, List<Struct_pxsb_778>>> getAwardConfigMap() {
        return awardConfigMap;
    }

    public static Map<Integer, List<Struct_pxsbdj_778>> getBigAwardConfigMap() {
        return bigAwardConfigMap;
    }

    @Override
    public void startServer() throws RunServerException {
    }

    @Override
    public void initExcel() throws RunServerException {
        List<Struct_pxsb_778> sortList = Config_pxsb_778.getIns().getSortList();
        for (Struct_pxsb_778 struct_pxsb_778 : sortList) {
            int qs = struct_pxsb_778.getQs();
            Map<Integer, List<Struct_pxsb_778>> map = awardConfigMap.get(qs);
            if (map == null) {
                map = new HashMap<>();
                awardConfigMap.put(qs, map);
            }
            int dy = struct_pxsb_778.getDy();
            List<Struct_pxsb_778> list = map.get(dy);
            if (list == null) {
                list = new ArrayList<>();
                map.put(dy, list);
            }
            list.add(struct_pxsb_778);
        }

        List<Struct_pxsbdj_778> bigsortList = Config_pxsbdj_778.getIns().getSortList();
        for (Struct_pxsbdj_778 struct_pxsbdj_778 : bigsortList) {
            int qs = struct_pxsbdj_778.getQs();
            List<Struct_pxsbdj_778> list = bigAwardConfigMap.get(qs);
            if (list == null) {
                list = new ArrayList<>();
                bigAwardConfigMap.put(qs, list);
            }
            list.add(struct_pxsbdj_778);
        }
    }

}
