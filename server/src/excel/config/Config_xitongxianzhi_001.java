package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xitongxianzhi_001;
public class Config_xitongxianzhi_001 extends ConfigBase<Struct_xitongxianzhi_001> {
    private static Config_xitongxianzhi_001 ins = null;
    public static Config_xitongxianzhi_001 getIns(){
        if(ins==null){
            ins = new Config_xitongxianzhi_001();
        }
        return ins;
    }
    private Config_xitongxianzhi_001(){
        put(3703,new Struct_xitongxianzhi_001(3703));
        put(3605,new Struct_xitongxianzhi_001(3605));
        put(6211,new Struct_xitongxianzhi_001(6211));
        put(6212,new Struct_xitongxianzhi_001(6212));
        put(3101,new Struct_xitongxianzhi_001(3101));
        put(1052,new Struct_xitongxianzhi_001(1052));
        put(3607,new Struct_xitongxianzhi_001(3607));
        put(3706,new Struct_xitongxianzhi_001(3706));
        put(3707,new Struct_xitongxianzhi_001(3707));
        put(4702,new Struct_xitongxianzhi_001(4702));
        put(4705,new Struct_xitongxianzhi_001(4705));
        put(6903,new Struct_xitongxianzhi_001(6903));
    }
    public void reset(){
        ins = null;
    }
}