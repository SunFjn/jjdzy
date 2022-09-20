package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_jbpbuy_718;
public class Config_jbpbuy_718 extends ConfigBase<Struct_jbpbuy_718> {
    private static Config_jbpbuy_718 ins = null;
    public static Config_jbpbuy_718 getIns(){
        if(ins==null){
            ins = new Config_jbpbuy_718();
        }
        return ins;
    }
    private Config_jbpbuy_718(){
        put(1,new Struct_jbpbuy_718(1,3200,4,0,0));
        put(2,new Struct_jbpbuy_718(2,9500,5,0,0));
        put(3,new Struct_jbpbuy_718(3,0,9,53,648));
        put(4,new Struct_jbpbuy_718(4,0,7,52,198));
    }
    public void reset(){
        ins = null;
    }
}