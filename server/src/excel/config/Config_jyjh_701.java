package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_jyjh_701;
public class Config_jyjh_701 extends ConfigBase<Struct_jyjh_701> {
    private static Config_jyjh_701 ins = null;
    public static Config_jyjh_701 getIns(){
        if(ins==null){
            ins = new Config_jyjh_701();
        }
        return ins;
    }
    private Config_jyjh_701(){
        put(1,new Struct_jyjh_701(1,6,930170,0));
        put(2,new Struct_jyjh_701(2,6,930171,5));
        put(3,new Struct_jyjh_701(3,6,930172,8));
        put(4,new Struct_jyjh_701(4,6,930173,13));
        put(5,new Struct_jyjh_701(5,6,930174,16));
        put(6,new Struct_jyjh_701(6,6,930175,20));
        put(7,new Struct_jyjh_701(7,6,930176,25));
        put(8,new Struct_jyjh_701(8,6,930177,30));
        put(9,new Struct_jyjh_701(9,6,930178,35));
        put(10,new Struct_jyjh_701(10,6,930179,40));
    }
    public void reset(){
        ins = null;
    }
}