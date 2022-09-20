package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_gjbsgj_738;
public class Config_gjbsgj_738 extends ConfigBase<Struct_gjbsgj_738> {
    private static Config_gjbsgj_738 ins = null;
    public static Config_gjbsgj_738 getIns(){
        if(ins==null){
            ins = new Config_gjbsgj_738();
        }
        return ins;
    }
    private Config_gjbsgj_738(){
        put(1,new Struct_gjbsgj_738(1,"[[4,0,2500],[1,410005,4],[3,0,2000000]]"));
        put(2,new Struct_gjbsgj_738(2,"[[4,0,2000],[1,410005,3],[3,0,1500000]]"));
        put(3,new Struct_gjbsgj_738(3,"[[4,0,1500],[1,410005,2],[3,0,1000000]]"));
    }
    public void reset(){
        ins = null;
    }
}