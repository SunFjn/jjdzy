package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_dzstarsuit_209;
public class Config_dzstarsuit_209 extends ConfigBase<Struct_dzstarsuit_209> {
    private static Config_dzstarsuit_209 ins = null;
    public static Config_dzstarsuit_209 getIns(){
        if(ins==null){
            ins = new Config_dzstarsuit_209();
        }
        return ins;
    }
    private Config_dzstarsuit_209(){
        put(1,new Struct_dzstarsuit_209(1,3,"[[102,20000],[103,1000],[104,500]]",12500));
        put(2,new Struct_dzstarsuit_209(2,7,"[[102,70000],[103,3500],[104,1750]]",43750));
        put(3,new Struct_dzstarsuit_209(3,15,"[[102,170000],[103,8500],[104,4250]]",106250));
        put(4,new Struct_dzstarsuit_209(4,20,"[[102,370000],[103,18500],[104,9250]]",231250));
        put(5,new Struct_dzstarsuit_209(5,25,"[[102,770000],[103,38500],[104,19250]]",481250));
        put(6,new Struct_dzstarsuit_209(6,30,"[[102,1370000],[103,68500],[104,34250]]",856250));
        put(7,new Struct_dzstarsuit_209(7,35,"[[102,2170000],[103,108500],[104,54250]]",1356250));
        put(8,new Struct_dzstarsuit_209(8,40,"[[102,3170000],[103,158500],[104,79250]]",1981250));
        put(9,new Struct_dzstarsuit_209(9,45,"[[102,4370000],[103,218500],[104,109250]]",2731250));
        put(10,new Struct_dzstarsuit_209(10,50,"[[102,5920000],[103,296000],[104,148000]]",3700000));
        put(11,new Struct_dzstarsuit_209(11,55,"[[102,7400000],[103,370000],[104,185000]]",4625000));
        put(12,new Struct_dzstarsuit_209(12,60,"[[102,8880000],[103,444000],[104,222000]]",5550000));
    }
    public void reset(){
        ins = null;
    }
}