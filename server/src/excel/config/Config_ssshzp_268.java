package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ssshzp_268;
public class Config_ssshzp_268 extends ConfigBase<Struct_ssshzp_268> {
    private static Config_ssshzp_268 ins = null;
    public static Config_ssshzp_268 getIns(){
        if(ins==null){
            ins = new Config_ssshzp_268();
        }
        return ins;
    }
    private Config_ssshzp_268(){
        put(1,new Struct_ssshzp_268(1,"[[1,2]]","2,50000;4,50000"));
        put(2,new Struct_ssshzp_268(2,"[[3,4]]","3,50000;6,50000"));
        put(3,new Struct_ssshzp_268(3,"[[5,6]]","5,50000;7,50000"));
        put(4,new Struct_ssshzp_268(4,"[[7,8]]","1,50000;8,50000"));
    }
    public void reset(){
        ins = null;
    }
}