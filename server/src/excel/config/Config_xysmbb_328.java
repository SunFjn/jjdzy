package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xysmbb_328;
public class Config_xysmbb_328 extends ConfigBase<Struct_xysmbb_328> {
    private static Config_xysmbb_328 ins = null;
    public static Config_xysmbb_328 getIns(){
        if(ins==null){
            ins = new Config_xysmbb_328();
        }
        return ins;
    }
    private Config_xysmbb_328(){
        put(1001,new Struct_xysmbb_328(1001,1,30,"[[1,411011,88]]"));
        put(1002,new Struct_xysmbb_328(1002,1,100,"[[1,410402,5]]"));
        put(1003,new Struct_xysmbb_328(1003,1,150,"[[1,411011,188]]"));
        put(1004,new Struct_xysmbb_328(1004,1,200,"[[1,401057,1]]"));
        put(2001,new Struct_xysmbb_328(2001,2,50,"[[1,411013,788]]"));
        put(2002,new Struct_xysmbb_328(2002,2,100,"[[1,411013,988]]"));
        put(2003,new Struct_xysmbb_328(2003,2,200,"[[1,402028,1]]"));
        put(2004,new Struct_xysmbb_328(2004,2,300,"[[1,402028,2]]"));
        put(3001,new Struct_xysmbb_328(3001,3,30,"[[1,411011,88]]"));
        put(3002,new Struct_xysmbb_328(3002,3,100,"[[1,410402,5]]"));
        put(3003,new Struct_xysmbb_328(3003,3,150,"[[1,411011,188]]"));
        put(3004,new Struct_xysmbb_328(3004,3,200,"[[1,401057,1]]"));
        put(4001,new Struct_xysmbb_328(4001,4,30,"[[1,411011,88]]"));
        put(4002,new Struct_xysmbb_328(4002,4,100,"[[1,410402,5]]"));
        put(4003,new Struct_xysmbb_328(4003,4,150,"[[1,411011,188]]"));
        put(4004,new Struct_xysmbb_328(4004,4,200,"[[1,401057,1]]"));
        put(11001,new Struct_xysmbb_328(11001,11,50,"[[1,411013,788]]"));
        put(11002,new Struct_xysmbb_328(11002,11,100,"[[1,411013,988]]"));
        put(11003,new Struct_xysmbb_328(11003,11,200,"[[1,402028,1]]"));
        put(11004,new Struct_xysmbb_328(11004,11,300,"[[1,402028,2]]"));
        put(21001,new Struct_xysmbb_328(21001,12,50,"[[1,411013,788]]"));
        put(21002,new Struct_xysmbb_328(21002,12,100,"[[1,411013,988]]"));
        put(21003,new Struct_xysmbb_328(21003,12,200,"[[1,402028,1]]"));
        put(21004,new Struct_xysmbb_328(21004,12,300,"[[1,402028,2]]"));
        put(31001,new Struct_xysmbb_328(31001,13,50,"[[1,411013,788]]"));
        put(31002,new Struct_xysmbb_328(31002,13,100,"[[1,411013,988]]"));
        put(31003,new Struct_xysmbb_328(31003,13,200,"[[1,402028,1]]"));
        put(31004,new Struct_xysmbb_328(31004,13,300,"[[1,402028,2]]"));
        put(41001,new Struct_xysmbb_328(41001,14,50,"[[1,411013,788]]"));
        put(41002,new Struct_xysmbb_328(41002,14,100,"[[1,411013,988]]"));
        put(41003,new Struct_xysmbb_328(41003,14,200,"[[1,402028,1]]"));
        put(41004,new Struct_xysmbb_328(41004,14,300,"[[1,402028,2]]"));
        put(51001,new Struct_xysmbb_328(51001,15,50,"[[1,411013,788]]"));
        put(51002,new Struct_xysmbb_328(51002,15,100,"[[1,411013,988]]"));
        put(51003,new Struct_xysmbb_328(51003,15,200,"[[1,402028,1]]"));
        put(51004,new Struct_xysmbb_328(51004,15,300,"[[1,402028,2]]"));
    }
    public void reset(){
        ins = null;
    }
}