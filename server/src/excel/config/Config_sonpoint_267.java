package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sonpoint_267;
public class Config_sonpoint_267 extends ConfigBase<Struct_sonpoint_267> {
    private static Config_sonpoint_267 ins = null;
    public static Config_sonpoint_267 getIns(){
        if(ins==null){
            ins = new Config_sonpoint_267();
        }
        return ins;
    }
    private Config_sonpoint_267(){
        put(1,new Struct_sonpoint_267(1,500,"[[1,410065,50]]"));
        put(2,new Struct_sonpoint_267(2,1000,"[[1,442001,1]]"));
        put(3,new Struct_sonpoint_267(3,2000,"[[1,442002,1]]"));
        put(4,new Struct_sonpoint_267(4,3000,"[[1,442003,1]]"));
    }
    public void reset(){
        ins = null;
    }
}