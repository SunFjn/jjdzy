package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_general_006;
public class Config_general_006 extends ConfigBase<Struct_general_006> {
    private static Config_general_006 ins = null;
    public static Config_general_006 getIns(){
        if(ins==null){
            ins = new Config_general_006();
        }
        return ins;
    }
    private Config_general_006(){
        put(710001,new Struct_general_006(710001,"夏侯渊之魂",1,3,710001,"[[1,5]]"));
        put(710002,new Struct_general_006(710002,"夏侯惇之魂",1,3,710002,"[[1,10]]"));
        put(710003,new Struct_general_006(710003,"张辽之魂",1,3,710003,"[[1,15]]"));
        put(710004,new Struct_general_006(710004,"许褚之魂",1,4,710004,"[[1,25]]"));
        put(710005,new Struct_general_006(710005,"程昱之魂",1,4,710005,"[[1,35]]"));
        put(710006,new Struct_general_006(710006,"郭嘉之魂",1,4,710006,"[[1,45]]"));
        put(710007,new Struct_general_006(710007,"甄宓之魂",1,5,710007,"[[1,60]]"));
        put(710008,new Struct_general_006(710008,"司马懿之魂",1,5,710008,"[[1,75]]"));
        put(710009,new Struct_general_006(710009,"曹操之魂",1,6,710009,"[[1,90]]"));
        put(720001,new Struct_general_006(720001,"黄月英之魂",2,3,720001,"[[1,105]]"));
        put(720002,new Struct_general_006(720002,"魏延之魂",2,3,720002,"[[1,110]]"));
        put(720003,new Struct_general_006(720003,"黄忠之魂",2,3,720003,"[[1,115]]"));
        put(720004,new Struct_general_006(720004,"赵云之魂",2,4,720004,"[[1,125]]"));
        put(720005,new Struct_general_006(720005,"马超之魂",2,4,720005,"[[1,135]]"));
        put(720006,new Struct_general_006(720006,"张飞之魂",2,4,720006,"[[1,145]]"));
        put(720007,new Struct_general_006(720007,"关羽之魂",2,5,720007,"[[1,160]]"));
        put(720008,new Struct_general_006(720008,"诸葛亮之魂",2,5,720008,"[[1,175]]"));
        put(720009,new Struct_general_006(720009,"刘备之魂",2,6,720009,"[[1,190]]"));
        put(730001,new Struct_general_006(730001,"孙姬之魂",3,3,730001,"[[1,205]]"));
        put(730002,new Struct_general_006(730002,"陆逊之魂",3,3,730002,"[[1,210]]"));
        put(730003,new Struct_general_006(730003,"吕蒙之魂",3,3,730003,"[[1,215]]"));
        put(730004,new Struct_general_006(730004,"诸葛瑾之魂",3,4,730004,"[[1,225]]"));
        put(730005,new Struct_general_006(730005,"小乔之魂",3,4,730005,"[[1,235]]"));
        put(730006,new Struct_general_006(730006,"大乔之魂",3,4,730006,"[[1,245]]"));
        put(730007,new Struct_general_006(730007,"周瑜之魂",3,5,730007,"[[1,260]]"));
        put(730008,new Struct_general_006(730008,"孙策之魂",3,5,730008,"[[1,275]]"));
        put(730009,new Struct_general_006(730009,"孙权之魂",3,6,730009,"[[1,290]]"));
        put(740001,new Struct_general_006(740001,"袁术之魂",4,3,740001,"[[1,305]]"));
        put(740002,new Struct_general_006(740002,"袁绍之魂",4,3,740002,"[[1,310]]"));
        put(740003,new Struct_general_006(740003,"蔡文姬之魂",4,3,740003,"[[1,315]]"));
        put(740004,new Struct_general_006(740004,"贾诩之魂",4,4,740004,"[[1,325]]"));
        put(740005,new Struct_general_006(740005,"董卓之魂",4,4,740005,"[[1,335]]"));
        put(740006,new Struct_general_006(740006,"貂蝉之魂",4,4,740006,"[[1,345]]"));
        put(740007,new Struct_general_006(740007,"吕布之魂",4,5,740007,"[[1,360]]"));
        put(740008,new Struct_general_006(740008,"张角之魂",4,5,740008,"[[1,375]]"));
        put(740009,new Struct_general_006(740009,"左慈之魂",4,6,740009,"[[1,390]]"));
    }
    public void reset(){
        ins = null;
    }
}