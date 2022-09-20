package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_juanxian_712;
public class Config_juanxian_712 extends ConfigBase<Struct_juanxian_712> {
    private static Config_juanxian_712 ins = null;
    public static Config_juanxian_712 getIns(){
        if(ins==null){
            ins = new Config_juanxian_712();
        }
        return ins;
    }
    private Config_juanxian_712(){
        put(1,new Struct_juanxian_712(1,"[[3,0,50000]]",10,"[[11,0,5],[7,0,5]]"));
        put(2,new Struct_juanxian_712(2,"[[4,0,500]]",20,"[[11,0,20],[7,0,10]]"));
    }
    public void reset(){
        ins = null;
    }
}