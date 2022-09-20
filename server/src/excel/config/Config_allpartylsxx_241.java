package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_allpartylsxx_241;
public class Config_allpartylsxx_241 extends ConfigBase<Struct_allpartylsxx_241> {
    private static Config_allpartylsxx_241 ins = null;
    public static Config_allpartylsxx_241 getIns(){
        if(ins==null){
            ins = new Config_allpartylsxx_241();
        }
        return ins;
    }
    private Config_allpartylsxx_241(){
        put(1,new Struct_allpartylsxx_241(1,2,"[[1,410023,1],[1,410003,1],[1,410018,20]]",3602,30001));
        put(2,new Struct_allpartylsxx_241(2,3,"[[1,410023,1],[1,410003,1],[1,410018,20]]",3602,30002));
        put(3,new Struct_allpartylsxx_241(3,4,"[[1,410023,1],[1,410003,1],[1,410018,40]]",3602,30003));
        put(4,new Struct_allpartylsxx_241(4,5,"[[1,410023,1],[1,410003,1],[1,410018,40]]",3602,30004));
        put(5,new Struct_allpartylsxx_241(5,6,"[[1,410023,2],[1,410003,2],[1,410018,50]]",3602,30005));
        put(6,new Struct_allpartylsxx_241(6,7,"[[1,410023,2],[1,410003,2],[1,410018,50]]",3602,30006));
        put(7,new Struct_allpartylsxx_241(7,8,"[[1,410023,2],[1,410003,3],[1,410018,70]]",3602,30007));
        put(8,new Struct_allpartylsxx_241(8,9,"[[1,410023,2],[1,410003,4],[1,410018,70]]",3602,30008));
        put(9,new Struct_allpartylsxx_241(9,10,"[[1,410023,3],[1,410003,4],[1,410018,100]]",3602,30009));
        put(10,new Struct_allpartylsxx_241(10,11,"[[1,410023,5],[1,410003,10],[1,410018,200]]",3602,30010));
    }
    public void reset(){
        ins = null;
    }
}