package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_yscs_759;
public class Config_yscs_759 extends ConfigBase<Struct_yscs_759> {
    private static Config_yscs_759 ins = null;
    public static Config_yscs_759 getIns(){
        if(ins==null){
            ins = new Config_yscs_759();
        }
        return ins;
    }
    private Config_yscs_759(){
        put(1,new Struct_yscs_759(1,"[[4,0,2500]]"));
        put(2,new Struct_yscs_759(2,"[[4,0,5000]]"));
        put(3,new Struct_yscs_759(3,"[[4,0,5000]]"));
    }
    public void reset(){
        ins = null;
    }
}