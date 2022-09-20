package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cjxh_753;
public class Config_cjxh_753 extends ConfigBase<Struct_cjxh_753> {
    private static Config_cjxh_753 ins = null;
    public static Config_cjxh_753 getIns(){
        if(ins==null){
            ins = new Config_cjxh_753();
        }
        return ins;
    }
    private Config_cjxh_753(){
        put(1,new Struct_cjxh_753(1,"[[4,0,15000]]"));
        put(2,new Struct_cjxh_753(2,"[[4,0,25000]]"));
        put(3,new Struct_cjxh_753(3,"[[4,0,50000]]"));
        put(4,new Struct_cjxh_753(4,"[[4,0,100000]]"));
        put(5,new Struct_cjxh_753(5,"[[4,0,200000]]"));
        put(6,new Struct_cjxh_753(6,"[[4,0,250000]]"));
        put(7,new Struct_cjxh_753(7,"[[4,0,250000]]"));
        put(8,new Struct_cjxh_753(8,"[[4,0,400000]]"));
        put(9,new Struct_cjxh_753(9,"[[4,0,750000]]"));
    }
    public void reset(){
        ins = null;
    }
}