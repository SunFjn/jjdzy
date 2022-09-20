package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lsxxkf_232;
public class Config_lsxxkf_232 extends ConfigBase<Struct_lsxxkf_232> {
    private static Config_lsxxkf_232 ins = null;
    public static Config_lsxxkf_232 getIns(){
        if(ins==null){
            ins = new Config_lsxxkf_232();
        }
        return ins;
    }
    private Config_lsxxkf_232(){
        put(1,new Struct_lsxxkf_232(1,"[[1001,3003]]"));
        put(2,new Struct_lsxxkf_232(2,"[[4001,6003]]"));
        put(3,new Struct_lsxxkf_232(3,"[[7001,8003]]"));
        put(4,new Struct_lsxxkf_232(4,"[[9001,10003]]"));
        put(5,new Struct_lsxxkf_232(5,"[[11001,12003]]"));
    }
    public void reset(){
        ins = null;
    }
}