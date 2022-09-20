package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ysl_752;
public class Config_ysl_752 extends ConfigBase<Struct_ysl_752> {
    private static Config_ysl_752 ins = null;
    public static Config_ysl_752 getIns(){
        if(ins==null){
            ins = new Config_ysl_752();
        }
        return ins;
    }
    private Config_ysl_752(){
        put(1,new Struct_ysl_752(1,"[[1,444001,20]]",200));
        put(2,new Struct_ysl_752(2,"[[1,444002,20]]",200));
        put(3,new Struct_ysl_752(3,"[[1,444003,20]]",200));
        put(4,new Struct_ysl_752(4,"[[1,444004,20]]",200));
        put(5,new Struct_ysl_752(5,"[[1,444005,20]]",200));
        put(6,new Struct_ysl_752(6,"[[1,444006,20]]",200));
        put(7,new Struct_ysl_752(7,"[[1,444007,20]]",200));
        put(8,new Struct_ysl_752(8,"[[1,444008,20]]",200));
    }
    public void reset(){
        ins = null;
    }
}