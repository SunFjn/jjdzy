package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cailiaoxiaohao_709;
public class Config_cailiaoxiaohao_709 extends ConfigBase<Struct_cailiaoxiaohao_709> {
    private static Config_cailiaoxiaohao_709 ins = null;
    public static Config_cailiaoxiaohao_709 getIns(){
        if(ins==null){
            ins = new Config_cailiaoxiaohao_709();
        }
        return ins;
    }
    private Config_cailiaoxiaohao_709(){
        put(1,new Struct_cailiaoxiaohao_709(1,"[[4,0,1000]]"));
        put(2,new Struct_cailiaoxiaohao_709(2,"[[4,0,1500]]"));
    }
    public void reset(){
        ins = null;
    }
}