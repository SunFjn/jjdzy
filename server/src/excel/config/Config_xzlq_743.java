package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xzlq_743;
public class Config_xzlq_743 extends ConfigBase<Struct_xzlq_743> {
    private static Config_xzlq_743 ins = null;
    public static Config_xzlq_743 getIns(){
        if(ins==null){
            ins = new Config_xzlq_743();
        }
        return ins;
    }
    
    public void reset(){
        ins = null;
    }
}