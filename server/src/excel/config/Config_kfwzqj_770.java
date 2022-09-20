package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_kfwzqj_770;
public class Config_kfwzqj_770 extends ConfigBase<Struct_kfwzqj_770> {
    private static Config_kfwzqj_770 ins = null;
    public static Config_kfwzqj_770 getIns(){
        if(ins==null){
            ins = new Config_kfwzqj_770();
        }
        return ins;
    }
    private Config_kfwzqj_770(){
        put(1,new Struct_kfwzqj_770(1,"[[1001,3003]]"));
        put(2,new Struct_kfwzqj_770(2,"[[4001,6003]]"));
        put(3,new Struct_kfwzqj_770(3,"[[7001,8003]]"));
        put(4,new Struct_kfwzqj_770(4,"[[9001,10003]]"));
        put(5,new Struct_kfwzqj_770(5,"[[11001,12003]]"));
    }
    public void reset(){
        ins = null;
    }
}