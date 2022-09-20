package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xsxsreward_283;
public class Config_xsxsreward_283 extends ConfigBase<Struct_xsxsreward_283> {
    private static Config_xsxsreward_283 ins = null;
    public static Config_xsxsreward_283 getIns(){
        if(ins==null){
            ins = new Config_xsxsreward_283();
        }
        return ins;
    }
    private Config_xsxsreward_283(){
        put(1,new Struct_xsxsreward_283(1,"[1,410092,18,26000,0;1,410092,48,20000,0;1,410092,88,10000,0;1,412001,2,5000,0;1,412005,2,5000,0;1,412003,2,5000,0;1,412007,2,5000,0;1,411006,10,5000,0;10,0,20,5000,0;1,444003,1,3500,0;1,444004,1,3500,0;1,444005,1,3500,0;1,444006,1,3500,0]","[1,410092,188,10000,1;1,444001,2,12500,1;1,444002,2,12500,1;1,444003,2,10000,1;1,444004,2,10000,1;1,444005,2,10000,1;1,444006,2,10000,1;1,444007,2,12500,1;1,444008,2,12500,1]","[[4,0,2500]]"));
    }
    public void reset(){
        ins = null;
    }
}