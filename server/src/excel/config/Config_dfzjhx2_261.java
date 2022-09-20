package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_dfzjhx2_261;
public class Config_dfzjhx2_261 extends ConfigBase<Struct_dfzjhx2_261> {
    private static Config_dfzjhx2_261 ins = null;
    public static Config_dfzjhx2_261 getIns(){
        if(ins==null){
            ins = new Config_dfzjhx2_261();
        }
        return ins;
    }
    private Config_dfzjhx2_261(){
        put(1,new Struct_dfzjhx2_261(1,20,"[[1,411006,20],[1,410065,2]]"));
        put(2,new Struct_dfzjhx2_261(2,50,"[[1,411006,20],[1,410065,3]]"));
        put(3,new Struct_dfzjhx2_261(3,90,"[[1,410058,40],[4,0,1000]]"));
        put(4,new Struct_dfzjhx2_261(4,120,"[[1,410058,40],[1,410065,5]]"));
        put(5,new Struct_dfzjhx2_261(5,180,"[[1,410055,4],[4,0,1000]]"));
        put(6,new Struct_dfzjhx2_261(6,250,"[[1,410055,4],[4,0,1500]]"));
        put(7,new Struct_dfzjhx2_261(7,300,"[[1,411006,50],[1,410065,10]]"));
        put(8,new Struct_dfzjhx2_261(8,350,"[[1,411006,50],[1,410065,10]]"));
        put(9,new Struct_dfzjhx2_261(9,400,"[[1,410058,70],[4,0,1500]]"));
        put(10,new Struct_dfzjhx2_261(10,500,"[[1,410058,70],[1,410065,15]]"));
        put(11,new Struct_dfzjhx2_261(11,550,"[[1,410055,8],[4,0,2000]]"));
        put(12,new Struct_dfzjhx2_261(12,600,"[[1,410055,8],[1,416036,1]]"));
        put(13,new Struct_dfzjhx2_261(13,650,"[[1,411006,100],[4,0,2000]]"));
        put(14,new Struct_dfzjhx2_261(14,700,"[[1,411006,100],[1,410065,15]]"));
        put(15,new Struct_dfzjhx2_261(15,750,"[[1,410058,120],[1,410065,20]]"));
        put(16,new Struct_dfzjhx2_261(16,800,"[[1,410058,120],[4,0,2500]]"));
        put(17,new Struct_dfzjhx2_261(17,900,"[[1,410055,12],[1,410065,25]]"));
        put(18,new Struct_dfzjhx2_261(18,1000,"[[1,410055,12],[4,0,2500]]"));
        put(19,new Struct_dfzjhx2_261(19,1100,"[[1,411006,200],[1,410065,25]]"));
        put(20,new Struct_dfzjhx2_261(20,1200,"[[1,411006,200],[1,416036,1]]"));
        put(21,new Struct_dfzjhx2_261(21,1300,"[[1,410058,150],[4,0,3000]]"));
        put(22,new Struct_dfzjhx2_261(22,1400,"[[1,410058,150],[1,410065,30]]"));
        put(23,new Struct_dfzjhx2_261(23,1500,"[[1,410055,16],[4,0,3000]]"));
        put(24,new Struct_dfzjhx2_261(24,1600,"[[1,410055,16],[4,0,3000]]"));
        put(25,new Struct_dfzjhx2_261(25,1700,"[[1,410058,200],[1,410065,40]]"));
        put(26,new Struct_dfzjhx2_261(26,1800,"[[1,410058,200],[4,0,4000]]"));
        put(27,new Struct_dfzjhx2_261(27,1900,"[[1,410055,20],[1,416036,2]]"));
        put(28,new Struct_dfzjhx2_261(28,2000,"[[1,410055,20],[1,410065,50]]"));
        put(29,new Struct_dfzjhx2_261(29,2100,"[[1,410058,250],[1,410306,1]]"));
        put(30,new Struct_dfzjhx2_261(30,2200,"[[1,410058,250],[1,416036,2]]"));
        put(31,new Struct_dfzjhx2_261(31,2300,"[[1,410055,25],[4,0,5000]]"));
        put(32,new Struct_dfzjhx2_261(32,2400,"[[1,410055,25],[1,416036,2]]"));
        put(33,new Struct_dfzjhx2_261(33,2500,"[[1,410058,300],[1,410306,2]]"));
        put(34,new Struct_dfzjhx2_261(34,2600,"[[1,410058,300],[1,416036,3]]"));
        put(35,new Struct_dfzjhx2_261(35,2700,"[[1,410055,30],[4,0,6000]]"));
        put(36,new Struct_dfzjhx2_261(36,2800,"[[1,410055,30],[1,416036,3]]"));
        put(37,new Struct_dfzjhx2_261(37,2900,"[[1,410058,500],[1,410306,3]]"));
        put(38,new Struct_dfzjhx2_261(38,3000,"[[1,410055,50],[4,0,7500]]"));
    }
    public void reset(){
        ins = null;
    }
}