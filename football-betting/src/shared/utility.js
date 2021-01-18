import moment from 'moment'


export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getNextPlayDate=(daysOffset, hoursToGo)=>{

    const i = 6;
    var d = new Date();
    d.setTime(d.getTime() + (hoursToGo *60*60*1000));
    d.setDate(d.getDate() + (i + 7 - d.getDay()) % 7);
    d.setDate(d.getDate() + daysOffset);
    return moment(d).format("YYYY-MM-DD");
}


export function uuid() {
    let d = moment(Date.now()).format("SSSSS-MMssDD-HHYYYYmm");
    let str = Math.floor(Math.random() * 10000);
    d += "-" + str
    return d;
  }
