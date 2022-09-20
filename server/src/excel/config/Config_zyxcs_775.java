package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zyxcs_775;
public class Config_zyxcs_775 extends ConfigBase<Struct_zyxcs_775> {
    private static Config_zyxcs_775 ins = null;
    public static Config_zyxcs_775 getIns(){
        if(ins==null){
            ins = new Config_zyxcs_775();
        }
        return ins;
    }
    private Config_zyxcs_775(){
        put(1,new Struct_zyxcs_775(1,"[[4,0,500]]"));
        put(2,new Struct_zyxcs_775(2,"[[4,0,1000]]"));
        put(3,new Struct_zyxcs_775(3,"[[4,0,1000]]"));
        put(4,new Struct_zyxcs_775(4,"[[4,0,1500]]"));
        put(5,new Struct_zyxcs_775(5,"[[4,0,1500]]"));
        put(6,new Struct_zyxcs_775(6,"[[4,0,2000]]"));
        put(7,new Struct_zyxcs_775(7,"[[4,0,2000]]"));
        put(8,new Struct_zyxcs_775(8,"[[4,0,2000]]"));
        put(9,new Struct_zyxcs_775(9,"[[4,0,2000]]"));
        put(10,new Struct_zyxcs_775(10,"[[4,0,2500]]"));
    }
    public void reset(){
        ins = null;
    }
}