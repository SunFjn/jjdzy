package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xtwlbf_776;
public class Config_xtwlbf_776 extends ConfigBase<Struct_xtwlbf_776> {
    private static Config_xtwlbf_776 ins = null;
    public static Config_xtwlbf_776 getIns(){
        if(ins==null){
            ins = new Config_xtwlbf_776();
        }
        return ins;
    }
    private Config_xtwlbf_776(){
        put(1,new Struct_xtwlbf_776(1,1,"[[0,0,3]]",100001,2000,50000));
        put(2,new Struct_xtwlbf_776(2,2,"[[30000,0,5]]",100001,3000,100000));
        put(3,new Struct_xtwlbf_776(3,3,"[[0,10,0]]",100001,1000,40000));
        put(4,new Struct_xtwlbf_776(4,4,"[[50000,0,5]]",100001,3000,100000));
        put(5,new Struct_xtwlbf_776(5,5,"[[5000,0,10]]",100001,1000,50000));
    }
    public void reset(){
        ins = null;
    }
}