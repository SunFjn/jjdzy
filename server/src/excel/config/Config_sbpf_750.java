package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sbpf_750;
public class Config_sbpf_750 extends ConfigBase<Struct_sbpf_750> {
    private static Config_sbpf_750 ins = null;
    public static Config_sbpf_750 getIns(){
        if(ins==null){
            ins = new Config_sbpf_750();
        }
        return ins;
    }
    private Config_sbpf_750(){
        put(6001,new Struct_sbpf_750(6001,100));
        put(7001,new Struct_sbpf_750(7001,100));
        put(10001,new Struct_sbpf_750(10001,100));
        put(12001,new Struct_sbpf_750(12001,100));
        put(15001,new Struct_sbpf_750(15001,100));
        put(51001,new Struct_sbpf_750(51001,100));
        put(52001,new Struct_sbpf_750(52001,100));
        put(53001,new Struct_sbpf_750(53001,100));
        put(54001,new Struct_sbpf_750(54001,100));
    }
    public void reset(){
        ins = null;
    }
}